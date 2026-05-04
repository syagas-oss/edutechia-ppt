import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Expand, FileDown, Grid2X2, ChevronLeft, ChevronRight, StickyNote } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';
import SlideRenderer from './components/SlideRenderer';
import Scene3D from './components/Scene3D';
import type { ContentData, Slide } from './types';

const CONTENT_PATH = `${import.meta.env.BASE_URL}content/content.json`;
const PHASE_FADE = { duration: 0.68, ease: [0.2, 0.7, 0.2, 1] as const };

function IntroScreen({ onStart }: { onStart: () => void }) {
  const shards = [
    { left: '13%', top: '26%', width: '21vw', rotate: '-18deg', delay: '0s' },
    { left: '80%', top: '18%', width: '17vw', rotate: '14deg', delay: '0.05s' },
    { left: '9%', top: '66%', width: '18vw', rotate: '22deg', delay: '0.1s' },
    { left: '84%', top: '74%', width: '20vw', rotate: '-12deg', delay: '0.15s' },
    { left: '43%', top: '10%', width: '14vw', rotate: '-7deg', delay: '0.2s' },
    { left: '31%', top: '82%', width: '15vw', rotate: '17deg', delay: '0.25s' },
  ];

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onStart();
    }
  };

  return (
    <motion.div
      className="intro-screen"
      role="button"
      tabIndex={0}
      aria-label="Start presentation"
      onClick={onStart}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, scale: 1.012 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.996 }}
      transition={PHASE_FADE}
    >
      <div className="intro-grid" aria-hidden />
      <div className="intro-core" aria-hidden>
        <span className="intro-core-bar bar-a" />
        <span className="intro-core-bar bar-b" />
        <span className="intro-core-bar bar-c" />
        <span className="intro-core-ring ring-a" />
        <span className="intro-core-ring ring-b" />
      </div>
      <div className="intro-shards" aria-hidden>
        {shards.map((shard, i) => (
            <span
              key={`${shard.left}-${i}`}
              className="intro-shard"
              style={{
                left: shard.left,
                top: shard.top,
                width: shard.width,
                '--shard-rotate': shard.rotate,
                animationDelay: shard.delay,
              } as CSSProperties}
            />
          ))}
      </div>
    </motion.div>
  );
}

export default function App() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isIntro, setIsIntro] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentBuildIndex, setCurrentBuildIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [transitionMode, setTransitionMode] = useState<'fade' | 'slide'>('fade');
  const [showOverview, setShowOverview] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const baseTitle = '🚀 eduTechIA - Copiloto Pedagógico';
    const spinner = `${baseTitle}   `;
    let offset = 0;

    const tick = () => {
      document.title = spinner.slice(offset) + spinner.slice(0, offset);
      offset = (offset + 1) % spinner.length;
    };

    tick();
    const timer = window.setInterval(tick, 180);

    return () => {
      window.clearInterval(timer);
      document.title = baseTitle;
    };
  }, []);

  useEffect(() => {
    fetch(CONTENT_PATH)
      .then((r) => r.json())
      .then((data: ContentData) => setSlides(Array.isArray(data.slides) ? data.slides : []));
  }, []);

  const current = slides[currentSlideIndex];
  const maxBuild = Math.max(0, (current?.builds?.length ?? 0) - 1);
  const progress = slides.length && !isIntro ? ((currentSlideIndex + 1) / slides.length) * 100 : 0;

  const startDeck = () => {
    if (!slides.length) return;
    setShowOverview(false);
    setShowNotes(false);
    setIsIntro(false);
    setTransitionMode('fade');
    setCurrentSlideIndex(0);
    setCurrentBuildIndex(0);
  };

  const next = () => {
    if (isIntro) {
      startDeck();
      return;
    }
    if (!current) return;
    if (current.builds && currentBuildIndex < maxBuild) {
      setCurrentBuildIndex((v) => v + 1);
      return;
    }
    if (currentSlideIndex < slides.length - 1) {
      setDirection(1);
      setTransitionMode('slide');
      setCurrentSlideIndex((v) => v + 1);
      setCurrentBuildIndex(0);
    }
  };

  const prev = () => {
    if (isIntro) return;
    if (!current) return;
    if (current.builds && currentBuildIndex > 0) {
      setCurrentBuildIndex((v) => v - 1);
      return;
    }
    if (currentSlideIndex === 0) {
      setShowOverview(false);
      setShowNotes(false);
      setTransitionMode('fade');
      setIsIntro(true);
      return;
    }
    const nextIdx = currentSlideIndex - 1;
    setDirection(-1);
    setTransitionMode('slide');
    setCurrentSlideIndex(nextIdx);
    setCurrentBuildIndex(Math.max(0, (slides[nextIdx].builds?.length ?? 1) - 1));
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
    offscreen.style.background = '#f1f6fd';
    document.body.appendChild(offscreen);

    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1920, 1080] });

    for (let i = 0; i < slides.length; i += 1) {
      const node = document.createElement('div');
      node.className = 'pdf-slide';
      offscreen.appendChild(node);
      const reactRoot = createRoot(node);
      reactRoot.render(<SlideRenderer slide={slides[i]} buildIndex={Math.max(0, (slides[i].builds?.length ?? 1) - 1)} staticMode />);
      await new Promise((resolve) => setTimeout(resolve, 140));

      const canvas = await html2canvas(node, { backgroundColor: '#f1f6fd', scale: 2, useCORS: true });
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

      if (isGeneratingPDF) return;

      if (isIntro && ['arrowright', 'arrowdown', ' ', 'enter'].includes(key)) {
        e.preventDefault();
        startDeck();
        return;
      }

      if (e.key === 'Escape' && !isIntro) {
        setShowOverview((v) => !v);
        return;
      }

      if (isIntro) {
        if (key === 'f') void toggleFullscreen();
        if (key === 'p') void generatePDF();
        return;
      }

      if (showOverview) return;

      if (['arrowright', 'arrowdown', 'pagedown', ' '].includes(key)) {
        e.preventDefault();
        next();
      }
      if (['arrowleft', 'arrowup', 'pageup'].includes(key)) {
        e.preventDefault();
        prev();
      }
      if (key === 'f') void toggleFullscreen();
      if (key === 'n') setShowNotes((v) => !v);
      if (key === 'p') void generatePDF();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentBuildIndex, currentSlideIndex, isGeneratingPDF, isIntro, showOverview, slides]);

  const controls = useMemo(
    () => [
      { icon: ChevronLeft, action: prev, label: 'Prev' },
      { icon: ChevronRight, action: next, label: 'Next' },
      { icon: Grid2X2, action: () => setShowOverview((v) => !v), label: 'Overview' },
      { icon: StickyNote, action: () => setShowNotes((v) => !v), label: 'Notes' },
      { icon: FileDown, action: () => void generatePDF(), label: 'PDF' },
      { icon: Expand, action: () => void toggleFullscreen(), label: 'Full' },
    ],
    [currentBuildIndex, currentSlideIndex, isIntro, slides],
  );

  if (!slides.length) return <div className="loading">Loading content...</div>;

  return (
    <main className="app-root">
      <Scene3D slideIndex={isIntro ? -1 : currentSlideIndex} phase={isIntro ? 'intro' : 'deck'} />
      <div className={`overlay ${isIntro ? 'intro' : ''}`} />
      <div className={`progress ${isIntro ? 'intro' : ''}`} style={{ width: `${progress}%` }} />

      <section className={`content-wrap ${isIntro ? 'intro-mode' : ''}`}>
        <AnimatePresence mode="wait">
          {isIntro ? (
            <IntroScreen key="intro" onStart={startDeck} />
          ) : (
            <motion.div
              key={current.id}
              initial={transitionMode === 'fade' ? { opacity: 0 } : { x: direction > 0 ? 40 : -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={transitionMode === 'fade' ? { opacity: 0 } : { x: direction > 0 ? -40 : 40, opacity: 0 }}
              transition={transitionMode === 'fade' ? PHASE_FADE : { duration: 0.52, ease: [0.2, 0.7, 0.2, 1] as const }}
            >
              <SlideRenderer slide={current} buildIndex={currentBuildIndex} fadeIn={transitionMode === 'fade'} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {!isIntro ? (
        <div className="controls-dock">
          <div className="controls">
            {controls.map(({ icon: Icon, action, label }) => (
              <button key={label} onClick={action} className="ctrl-btn" type="button">
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {showNotes && !isIntro ? (
        <aside className="notes">
          <p className="text-xs uppercase tracking-[0.12em] text-cyan-300">Speaker Notes</p>
          <p>{current.speakerNotes ?? 'Sin notas para esta slide.'}</p>
        </aside>
      ) : null}

      {showOverview && !isIntro ? (
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
                    setDirection(i >= currentSlideIndex ? 1 : -1);
                    setTransitionMode('slide');
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
