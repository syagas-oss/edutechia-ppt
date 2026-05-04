import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { Card, Slide, SlideImage, SlideSection } from '../types';

type Props = {
  slide: Slide;
  buildIndex: number;
  staticMode?: boolean;
  fadeIn?: boolean;
};

type LayoutProps = {
  slide: Slide;
  buildIndex: number;
  countCards: number;
  countItems: number;
};

const PRESET_MOTION = {
  reveal: {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: 'easeOut' },
  },
  parallax: {
    initial: { opacity: 0, scale: 0.985, y: 16 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.52, ease: [0.2, 0.7, 0.2, 1] },
  },
  spotlight: {
    initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.56, ease: 'easeOut' },
  },
  'sequence-build': {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.42, ease: 'easeOut' },
  },
  'axis-draw': {
    initial: { opacity: 0, scaleX: 0.97 },
    animate: { opacity: 1, scaleX: 1 },
    transition: { duration: 0.48, ease: 'easeOut' },
  },
} as const;

const FADE_MOTION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.66, ease: [0.2, 0.7, 0.2, 1] as const },
} as const;

const DENSE_TYPES = new Set(['ALERT', 'LIST', 'TIMELINE', 'ROADMAP']);

const TYPE_LABELS: Record<string, string> = {
  BENTO_GRID: 'Matriz',
  BENTO_DATA: 'Datos clave',
  BENTO_MARKET: 'Mercado',
  CARDS_CHOICE: 'Opciones',
  HERO_GLOW: 'Portada',
  HERO_FINAL: 'Cierre',
  KINETIC_BRIDGE: 'Transicion',
};

const TYPE_LAYOUT_FALLBACK: Record<string, string> = {
  HERO_GLOW: 'problem-split',
  HERO: 'problem-split',
  HERO_FINAL: 'problem-split',
  LIST: 'editorial-image-box',
  STEPS: 'editorial-image-box',
  TIMELINE: 'roadmap-horizon',
  ALERT: 'regulatory-table',
  QUADRANT: 'benchmark-map',
  VIDEO: 'demo-stage-dark',
  ROADMAP: 'roadmap-horizon',
};

function getTypeLabel(type: string) {
  return TYPE_LABELS[type] ?? type.replace(/_/g, ' ');
}

function isCompactSlide(slide: Slide) {
  return slide.density === 'compact'
    || (slide.sections?.length ?? 0) >= 4
    || (slide.items?.length ?? 0) >= 4
    || (slide.cards?.length ?? 0) >= 3;
}

function visibleCount(total: number, buildIndex: number, builds?: string[]) {
  if (!builds || builds.length === 0) return total;
  return Math.max(1, Math.min(total, buildIndex + 1));
}

function renderListItems(items: Slide['items']) {
  if (!items?.length) return null;
  return (
    <ul className="list-premium">
      {items.map((item, i) => (
        <motion.li key={typeof item === 'string' ? i : `${item.t}-${i}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
          <span className="dot" />
          <span>
            {typeof item === 'string' ? item : <><strong>{item.t}</strong><small>{item.d}</small></>}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

function renderSections(sections?: SlideSection[], compact = false) {
  if (!sections?.length) return null;
  return (
    <div className={`sections-stack ${compact ? 'fit-grid' : ''}`}>
      {sections.map((section, i) => (
        <article key={`${section.title ?? 'section'}-${i}`} className="section-card">
          {section.title ? <h3>{section.title}</h3> : null}
          {section.body ? <p>{section.body}</p> : null}
          {section.bullets?.length ? (
            <ul>
              {section.bullets.map((bullet, j) => <li key={`${bullet}-${j}`}>{bullet}</li>)}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function renderImage(image?: SlideImage, fallbackClass = '') {
  if (!image?.src) return null;
  const src = image.src.startsWith('/')
    ? `${import.meta.env.BASE_URL}${image.src.slice(1)}`
    : image.src;
  return <ResolvedImage src={src} alt={image.alt ?? 'Slide reference'} className={fallbackClass} />;
}

function ResolvedImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [hasError, setHasError] = useState(false);
  if (hasError) return null;
  return (
    <figure className={`media-frame ${className}`}>
      <img src={src} alt={alt} loading="lazy" onError={() => setHasError(true)} />
    </figure>
  );
}

function renderStats(stats: Slide['stats']) {
  if (!stats?.length) return null;
  return (
    <div className="stats-grid">
      {stats.map((s, i) => (
        <article key={`${s.l}-${i}`} className="panel metric-card">
          <p className="metric-value">{s.v}</p>
          <p className="metric-label">{s.l}</p>
        </article>
      ))}
    </div>
  );
}

function renderCards(cards?: Card[], compact = false) {
  if (!cards?.length) return null;
  return (
    <div className={`cards-premium ${compact ? 'fit-grid' : ''}`}>
      {cards.map((c, i) => (
        <article key={`${c.t}-${i}`} className={`panel ${c.highlight ? 'card-emphasis' : ''}`}>
          <h3>{c.t}</h3>
          <p>{c.d}</p>
        </article>
      ))}
    </div>
  );
}

function SlideStage({ slide, children }: { slide: Slide; children: React.ReactNode }) {
  const decorationClass = (slide.decorations ?? []).map((x) => `dec-${x}`).join(' ');
  const densityClass = isCompactSlide(slide) ? 'dense-slide' : '';
  return (
    <section className={`slide-shell slide-${String(slide.type).toLowerCase()} theme-${slide.themeVariant ?? 'act1'} layout-${slide.layoutVariant ?? 'default'} ${slide.emphasis === 'signature' ? 'signature' : ''} cue-${slide.visualCue ?? 'grid-waves'} style-${slide.visualStyle ?? 'pastel-cream'} ${decorationClass} ${densityClass}`}>
      <div className="atmo-layer" aria-hidden />
      <div className="kinetic-layer" aria-hidden />
      <header className="slide-topline">
        <p className="brand-tag">eduTechIA</p>
        <span className="type-pill">{getTypeLabel(String(slide.type))}</span>
      </header>
      <div className="accent-rule" />
      <div className="slide-stage">{children}</div>
    </section>
  );
}

function SlideHeading({ slide }: { slide: Slide }) {
  return (
    <div className="slide-heading">
      <h1 className="slide-title">{slide.title}</h1>
      <p className="slide-subtitle">{slide.subtitle}</p>
      {slide.highlight ? <p className="highlight-chip">{slide.highlight}</p> : null}
      {slide.callout ? <p className="slide-callout">{slide.callout}</p> : null}
    </div>
  );
}

function HeroCinematicV2({ slide }: LayoutProps) {
  return (
    <div className="scene-wrap layout-problem-split">
      <div>
        <SlideHeading slide={slide} />
      </div>
      <div>{renderImage(slide.image, 'hero-media') ?? <div className="hero-side-panel"><p>Personalizacion cognitiva y control docente en tiempo real.</p></div>}</div>
    </div>
  );
}

function AgendaCards({ slide, countItems }: LayoutProps) {
  const items = (slide.items?.slice(0, countItems) ?? []).map((x) => (typeof x === 'string' ? { t: x, d: '' } : x));
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className="agenda-grid">
        <div className="agenda-cards">
          {items.map((item, i) => (
            <article className="agenda-card" key={`${item.t}-${i}`}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <p>{item.t}</p>
            </article>
          ))}
        </div>
        {renderImage(slide.image)}
      </div>
    </div>
  );
}

function ProblemSplit({ slide }: LayoutProps) {
  return (
    <div className="scene-wrap layout-problem-split">
      <SlideHeading slide={slide} />
      {renderImage(slide.image) ?? <div className="hero-side-panel"><p>{slide.callout ?? 'Contexto educativo actual y necesidad de personalizacion.'}</p></div>}
    </div>
  );
}

function EditorialImageBox({ slide, countItems }: LayoutProps) {
  const items = slide.items?.slice(0, countItems);
  const hasImage = Boolean(slide.image?.src);
  const compact = isCompactSlide(slide);
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className={`editorial-grid ${hasImage ? '' : 'no-media'} ${compact ? 'compact-grid' : ''}`}>
        {slide.image?.position === 'right' ? null : renderImage(slide.image)}
        <div className="editorial-copy">
          {renderSections(slide.sections, compact)}
          {renderStats(slide.stats)}
          {renderCards(slide.cards, compact)}
          {items?.length ? renderListItems(items) : null}
        </div>
        {slide.image?.position === 'right' ? renderImage(slide.image) : null}
      </div>
    </div>
  );
}

function BenefitsTimeline({ slide, countItems }: LayoutProps) {
  const items = (slide.items?.slice(0, countItems) ?? []).map((x) => (typeof x === 'string' ? { t: x, d: '' } : x));
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className="benefits-layout">
        {renderImage(slide.image)}
        <div className="benefits-timeline">
          {items.map((item, i) => (
            <article key={`${item.t}-${i}`}>
              <span>{i + 1}</span>
              <div>
                <h3>{item.t}</h3>
                <p>{item.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function BenchmarkMap({ slide }: LayoutProps) {
  const points = [
    { label: 'A', x: 20, y: 62 },
    { label: 'B', x: 34, y: 46 },
    { label: 'C', x: 48, y: 58 },
    { label: 'D', x: 59, y: 40 },
    { label: 'E', x: 72, y: 52 },
  ];
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className="benchmark-layout">
        <div className="landscape-map">
          <div className="axis-x">Mayor personalizacion</div>
          <div className="axis-y">Mayor facilidad docente</div>
          <div className="grid-markers" />
          {points.map((p) => <span key={p.label} className="market-point" style={{ left: `${p.x}%`, top: `${p.y}%` }}>{p.label}</span>)}
          <div className="opportunity-zone">Opportunity Space - eduTechIA</div>
        </div>
        <div>{renderSections(slide.sections)}{renderListItems(slide.items)}</div>
      </div>
    </div>
  );
}

function RegulatoryTable({ slide, countCards }: LayoutProps) {
  const cards = slide.cards?.slice(0, countCards) ?? [];
  const compact = isCompactSlide(slide);
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className="regulatory-grid">
        <div className="table-like">
          {(slide.sections ?? []).map((section, i) => (
            <div className="table-row" key={`${section.title ?? 'row'}-${i}`}>
              <h3>{section.title ?? 'Bloque'}</h3>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
        <div className={`risk-list ${compact ? 'fit-grid' : ''}`}>
          {cards.map((c: Card, i) => (
            <article key={`${c.t}-${i}`} className={`risk-item ${c.highlight ? 'risk-critical' : ''}`}>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function DemoStageDark({ slide }: LayoutProps) {
  return (
    <div className="scene-wrap demo-layout">
      <SlideHeading slide={slide} />
      <div className="video-stage-pro">
        <div className="video-device">
          {renderImage(slide.image, 'demo-image') ?? <><Icons.PlayCircle className="icon-lg" /><p>Demo Preview</p></>}
        </div>
        <div className="video-callouts">{renderSections(slide.sections, true) ?? <><p>Entrada docente</p><p>Generacion IA</p><p>Validacion y feedback</p></>}</div>
      </div>
    </div>
  );
}

function RoadmapHorizon({ slide, countItems }: LayoutProps) {
  const items = (slide.items?.slice(0, countItems) ?? []).map((x) => (typeof x === 'string' ? { t: x, d: '' } : x));
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className="roadmap-horizon">
        {items.map((item, i) => (
          <article key={`${item.t}-${i}`}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <h3>{item.t}</h3>
            <p>{item.d}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function RoadmapWow({ slide, countItems }: LayoutProps) {
  const items = (slide.items?.slice(0, countItems) ?? []).map((x) => (typeof x === 'string' ? { t: x, d: '' } : x));
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className="roadmap-wow">
        <div className="roadmap-curve" aria-hidden />
        {items.map((item, i) => (
          <article key={`${item.t}-${i}`} className={`roadmap-stop stop-${i + 1}`}>
            <span>{item.t}</span>
            <h3>{item.d}</h3>
          </article>
        ))}
      </div>
    </div>
  );
}

function GenericData({ slide, countCards, countItems }: LayoutProps) {
  const cards = slide.cards?.slice(0, countCards);
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      {renderStats(slide.stats)}
      {renderCards(cards, isCompactSlide(slide))}
      {renderSections(slide.sections, isCompactSlide(slide))}
      {(slide.items?.slice(0, countItems) ?? []).length ? renderListItems(slide.items?.slice(0, countItems)) : null}
    </div>
  );
}

const LAYOUT_REGISTRY: Record<string, (props: LayoutProps) => JSX.Element> = {
  'hero-cinematic': HeroCinematicV2,
  'hero-cinematic-v2': HeroCinematicV2,
  'agenda-cards': AgendaCards,
  'problem-split': ProblemSplit,
  'editorial-image-box': EditorialImageBox,
  'benefits-timeline': BenefitsTimeline,
  'benchmark-map': BenchmarkMap,
  'regulatory-table': RegulatoryTable,
  'demo-stage-dark': DemoStageDark,
  'roadmap-horizon': RoadmapHorizon,
  'roadmap-wow': RoadmapWow,
};

export default function SlideRenderer({ slide, buildIndex, staticMode = false, fadeIn = false }: Props) {
  const preset = fadeIn
    ? FADE_MOTION
    : PRESET_MOTION[(slide.motionPreset as keyof typeof PRESET_MOTION) ?? 'reveal'] ?? PRESET_MOTION.reveal;
  const countCards = visibleCount(slide.cards?.length ?? 0, buildIndex, slide.builds);
  const countItems = visibleCount(slide.items?.length ?? 0, buildIndex, slide.builds);
  const resolvedLayout = slide.layoutVariant ?? TYPE_LAYOUT_FALLBACK[String(slide.type)] ?? 'default';
  const LayoutComp = LAYOUT_REGISTRY[resolvedLayout] ?? GenericData;
  const compactTransition = DENSE_TYPES.has(String(slide.type))
    ? { ...preset.transition, duration: Math.max(0.35, (preset.transition.duration ?? 0.45) - 0.1) }
    : preset.transition;

  return (
    <motion.div key={slide.id} className="slide-motion" initial={staticMode ? undefined : preset.initial} animate={staticMode ? undefined : preset.animate} transition={compactTransition}>
      <SlideStage slide={slide}>
        <LayoutComp slide={slide} buildIndex={buildIndex} countCards={countCards} countItems={countItems} />
      </SlideStage>
    </motion.div>
  );
}
