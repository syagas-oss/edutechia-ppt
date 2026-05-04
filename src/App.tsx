import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Expand, FileDown, Grid2X2, ChevronLeft, ChevronRight, StickyNote } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';
import SlideRenderer from './components/SlideRenderer';
import Scene3D from './components/Scene3D';
import type { ContentData, Slide } from './types';

const CONTENT_PATH = `${import.meta.env.BASE_URL}content/content.json`;

export default function App() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentBuildIndex, setCurrentBuildIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showOverview, setShowOverview] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    fetch(CONTENT_PATH)
      .then((r) => r.json())
      .then((data: ContentData) => setSlides(Array.isArray(data.slides) ? data.slides : []));
  }, []);

  const current = slides[currentSlideIndex];
  const maxBuild = Math.max(0, (current?.builds?.length ?? 0) - 1);
  const progress = slides.length ? ((currentSlideIndex + 1) / slides.length) * 100 : 0;

  const next = () => {
    if (!current) return;
    if (current.builds && currentBuildIndex < maxBuild) {
      setCurrentBuildIndex((v) => v + 1);
      return;
    }
    if (currentSlideIndex < slides.length - 1) {
      setDirection(1);
      setCurrentSlideIndex((v) => v + 1);
      setCurrentBuildIndex(0);
    }
  };

  const prev = () => {
    if (!current) return;
    if (current.builds && currentBuildIndex > 0) {
      setCurrentBuildIndex((v) => v - 1);
      return;
    }
    if (currentSlideIndex > 0) {
      const nextIdx = currentSlideIndex - 1;
      setDirection(-1);
      setCurrentSlideIndex(nextIdx);
      setCurrentBuildIndex(Math.max(0, (slides[nextIdx].builds?.length ?? 1) - 1));
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const generatePDF = async () => {
    if (!slides.length) return;
    setIsGeneratingPDF(true);
    const offscreen = document.createElement('div');
    offscreen.style.position = 'fixed';
    offscreen.style.left = '-100000px';
    offscreen.style.top = '0';
    offscreen.style.width = '1920px';
    offscreen.style.background = '#050810';
    document.body.appendChild(offscreen);

    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1920, 1080] });

    for (let i = 0; i < slides.length; i += 1) {
      const node = document.createElement('div');
      node.className = 'pdf-slide';
      offscreen.appendChild(node);
      const reactRoot = createRoot(node);
      reactRoot.render(<SlideRenderer slide={slides[i]} buildIndex={Math.max(0, (slides[i].builds?.length ?? 1) - 1)} staticMode />);
      await new Promise((resolve) => setTimeout(resolve, 80));

      const canvas = await html2canvas(node, { backgroundColor: '#050810', scale: 2, useCORS: true });
      const img = canvas.toDataURL('image/png');
      if (i > 0) pdf.addPage();
      pdf.addImage(img, 'PNG', 0, 0, 1920, 1080);
      reactRoot.unmount();
      offscreen.removeChild(node);
    }

    document.body.removeChild(offscreen);
    pdf.save('edutechia-deck.pdf');
    setIsGeneratingPDF(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (e.key === 'Escape') {
        setShowOverview((v) => !v);
        return;
      }
      if (isGeneratingPDF || showOverview) return;
      if (['arrowright', 'arrowdown', ' '].includes(key)) {
        e.preventDefault();
        next();
      }
      if (['arrowleft', 'arrowup'].includes(key)) {
        e.preventDefault();
        prev();
      }
      if (key === 'f') void toggleFullscreen();
      if (key === 'n') setShowNotes((v) => !v);
      if (key === 'p') void generatePDF();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentBuildIndex, currentSlideIndex, isGeneratingPDF, showOverview, slides]);

  const controls = useMemo(
    () => [
      { icon: ChevronLeft, action: prev, label: 'Prev' },
      { icon: ChevronRight, action: next, label: 'Next' },
      { icon: Grid2X2, action: () => setShowOverview((v) => !v), label: 'Overview' },
      { icon: StickyNote, action: () => setShowNotes((v) => !v), label: 'Notes' },
      { icon: FileDown, action: () => void generatePDF(), label: 'PDF' },
      { icon: Expand, action: () => void toggleFullscreen(), label: 'Full' },
    ],
    [currentBuildIndex, currentSlideIndex, slides],
  );

  if (!current) return <div className="loading">Loading content...</div>;

  return (
    <main className="app-root">
      <Scene3D slideIndex={currentSlideIndex} />
      <div className="overlay" />
      <div className="progress" style={{ width: `${progress}%` }} />

      <section className="content-wrap">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -40 : 40, opacity: 0 }}
          >
            <SlideRenderer slide={current} buildIndex={currentBuildIndex} />
          </motion.div>
        </AnimatePresence>
      </section>

      <div className="controls">
        {controls.map(({ icon: Icon, action, label }) => (
          <button key={label} onClick={action} className="ctrl-btn" type="button"><Icon size={16} /> {label}</button>
        ))}
      </div>

      {showNotes ? <aside className="notes"><p className="text-xs uppercase tracking-[0.12em] text-cyan-300">Speaker Notes</p><p>{current.speakerNotes ?? 'Sin notas para esta slide.'}</p></aside> : null}

      {showOverview ? (
        <div className="overview">
          <div className="overview-panel">
            <h2>Overview</h2>
            <div className="overview-grid">
              {slides.map((s, i) => (
                <button
                  type="button"
                  key={s.id}
                  className={`ov-item ${i === currentSlideIndex ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentSlideIndex(i);
                    setCurrentBuildIndex(0);
                    setShowOverview(false);
                  }}
                >
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <p>{s.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {isGeneratingPDF ? <div className="loading">Generando PDF...</div> : null}
    </main>
  );
}

