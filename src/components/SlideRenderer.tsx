import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { Card, Slide, TimelineItem } from '../types';

type Props = {
  slide: Slide;
  buildIndex: number;
  staticMode?: boolean;
};

const DATA_TYPES = new Set(['BENTO_DATA', 'ECONOMIC', 'BENTO_GRID', 'PYRAMID']);
const PROCESS_TYPES = new Set(['STEPS', 'SQUADS', 'ROADMAP']);
const RISK_TYPES = new Set(['ALERT', 'BENTO_MARKET']);
const TIME_TYPES = new Set(['TIMELINE']);
const HERO_TYPES = new Set(['HERO', 'HERO_GLOW', 'HERO_FINAL', 'KINETIC_BRIDGE']);
const VIDEO_TYPES = new Set(['VIDEO']);
const QUADRANT_TYPES = new Set(['QUADRANT']);

const TYPE_LABELS: Record<string, string> = {
  BENTO_GRID: 'Matriz',
  BENTO_DATA: 'Datos clave',
  BENTO_MARKET: 'Mercado',
  CARDS_CHOICE: 'Opciones',
  HERO_GLOW: 'Portada',
  HERO_FINAL: 'Cierre',
  KINETIC_BRIDGE: 'Transicion',
};

const PRESET_MOTION = {
  reveal: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: 'easeOut' },
  },
  parallax: {
    initial: { opacity: 0, scale: 0.97, y: 22 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] },
  },
  spotlight: {
    initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.7, ease: 'easeOut' },
  },
  'sequence-build': {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  'axis-draw': {
    initial: { opacity: 0, scaleX: 0.95 },
    animate: { opacity: 1, scaleX: 1 },
    transition: { duration: 0.58, ease: 'easeOut' },
  },
} as const;

function getTypeLabel(type: string) {
  return TYPE_LABELS[type] ?? type.replace(/_/g, ' ');
}

function DynamicIcon({ name, className = 'icon-base' }: { name?: string; className?: string }) {
  if (!name) return null;
  const key = name as keyof typeof Icons;
  const Comp = Icons[key] as React.ComponentType<{ className?: string }> | undefined;
  return Comp ? <Comp className={className} /> : null;
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
        <motion.li key={typeof item === 'string' ? i : `${item.t}-${i}`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
          <span className="dot" />
          <span>
            {typeof item === 'string' ? item : <><strong>{item.t}</strong><small>{item.d}</small></>}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

function BaseSlideFrame({ slide, children }: { slide: Slide; children: React.ReactNode }) {
  return (
    <section className={`slide-shell slide-${String(slide.type).toLowerCase()} theme-${slide.themeVariant ?? 'act1'} layout-${slide.layoutVariant ?? 'default'} ${slide.emphasis === 'signature' ? 'signature' : ''} cue-${slide.visualCue ?? 'grid-waves'}`}>
      <div className="atmo-layer" aria-hidden />
      <div className="kinetic-layer" aria-hidden />
      <div className="slide-topline">
        <p className="brand-tag">eduTechIA</p>
        <span className="type-pill">{getTypeLabel(String(slide.type))}</span>
      </div>
      <div className="accent-rule" />
      {children}
    </section>
  );
}

function HeroLayout({ slide }: { slide: Slide }) {
  return (
    <div className="hero-layout">
      <div>
        <h1 className="slide-title">{slide.title}</h1>
        <p className="slide-subtitle">{slide.subtitle}</p>
        {slide.highlight ? <p className="highlight-chip">{slide.highlight}</p> : null}
      </div>
      <div className="hero-side-panel"><p>Personalización cognitiva y control docente en tiempo real.</p></div>
    </div>
  );
}

function DataLayout({ slide, countCards, countItems }: { slide: Slide; countCards: number; countItems: number }) {
  return (
    <div className="data-layout">
      <div>
        <h1 className="slide-title">{slide.title}</h1>
        <p className="slide-subtitle">{slide.subtitle}</p>
        {slide.stats?.length ? <div className="stats-grid">{slide.stats.map((s, i) => <motion.article key={`${s.l}-${i}`} className="panel metric-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><p className="metric-value">{s.v}</p><p className="metric-label">{s.l}</p></motion.article>)}</div> : null}
        {slide.bentoItems?.length ? <div className="bento-premium">{slide.bentoItems.map((item, i) => <motion.article key={item.id ?? `${item.title}-${i}`} className={`panel bento-card ${item.variant ?? 'glass'}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}><div className="bento-heading"><DynamicIcon name={item.icon} /><h3>{item.title ?? item.subtitle ?? 'Elemento'}</h3></div>{item.description ? <p className="muted">{item.description}</p> : null}</motion.article>)}</div> : null}
        {(slide.cards?.slice(0, countCards) ?? []).length ? <div className="cards-premium">{(slide.cards?.slice(0, countCards) ?? []).map((c, i) => <article key={`${c.t}-${i}`} className={`panel ${c.highlight ? 'card-emphasis' : ''}`}><h3>{c.t}</h3><p>{c.d}</p></article>)}</div> : null}
        {(slide.items?.slice(0, countItems) ?? []).length ? renderListItems(slide.items?.slice(0, countItems)) : null}
      </div>
    </div>
  );
}

function ProcessLayout({ slide, countItems }: { slide: Slide; countItems: number }) {
  const items = (slide.items?.slice(0, countItems) ?? []).map((x) => (typeof x === 'string' ? { t: x, d: '' } : x));
  return <div><h1 className="slide-title">{slide.title}</h1><p className="slide-subtitle">{slide.subtitle}</p><div className="flow-grid">{items.map((item, i) => <motion.article key={`${item.t}-${i}`} className="panel flow-step" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}><span className="step-index">{String(i + 1).padStart(2, '0')}</span><h3>{item.t}</h3><p>{item.d}</p></motion.article>)}</div></div>;
}

function RiskLayout({ slide, countCards }: { slide: Slide; countCards: number }) { const cards = slide.cards?.slice(0, countCards) ?? []; return <div><h1 className="slide-title">{slide.title}</h1><p className="slide-subtitle">{slide.subtitle}</p>{slide.tableData?.length ? <div className="market-grid">{slide.tableData.map((col, i) => <article key={`${col.h}-${i}`} className="panel market-col"><div className="market-heading"><DynamicIcon name={col.icon} /><h3>{col.h}</h3></div><ul>{col.items.map((it, j) => <li key={j}>{it}</li>)}</ul></article>)}</div> : null}{cards.length ? <div className="risk-grid">{cards.map((c: Card, i) => <article key={`${c.t}-${i}`} className={`panel risk-card ${c.highlight ? 'risk-critical' : ''}`}><h3>{c.t}</h3><p>{c.d}</p></article>)}</div> : null}</div>; }
function TimelineLayout({ slide }: { slide: Slide }) { return <div><h1 className="slide-title">{slide.title}</h1><p className="slide-subtitle">{slide.subtitle}</p><div className="timeline-shell">{(slide.timeline ?? []).map((step: TimelineItem, i) => <motion.article key={`${step.year}-${i}`} className="timeline-item" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}><span className="year-pill">{step.year}</span><h3>{step.event}</h3><p>{step.description}</p></motion.article>)}</div></div>; }
function QuadrantLayout({ slide }: { slide: Slide }) { return <div><h1 className="slide-title">{slide.title}</h1><p className="slide-subtitle">{slide.subtitle}</p><div className="quadrant-shell"><span className="axis axis-x">Mayor personalización</span><span className="axis axis-y">Mayor facilidad docente</span><div className="quad-grid"><div className="qcell"><small>Baja personalización</small></div><div className="qcell"><small>Alta personalización</small></div><div className="qcell"><small>Baja adopción</small></div><div className="qcell opportunity"><strong>Opportunity Space - eduTechIA</strong></div></div></div>{slide.items ? renderListItems(slide.items) : null}</div>; }
function VideoLayout({ slide }: { slide: Slide }) { return <div><h1 className="slide-title">{slide.title}</h1><p className="slide-subtitle">{slide.subtitle}</p><div className="video-stage panel"><div className="video-frame"><Icons.PlayCircle className="icon-lg" /><p>Demo Preview</p></div><div className="video-callouts"><p>Entrada docente</p><p>Generación IA</p><p>Validación + feedback</p></div></div></div>; }
function ListLayout({ slide, countItems }: { slide: Slide; countItems: number }) { return <div><h1 className="slide-title">{slide.title}</h1><p className="slide-subtitle">{slide.subtitle}</p>{renderListItems(slide.items?.slice(0, countItems))}</div>; }

export default function SlideRenderer({ slide, buildIndex, staticMode = false }: Props) {
  const preset = PRESET_MOTION[(slide.motionPreset as keyof typeof PRESET_MOTION) ?? 'reveal'] ?? PRESET_MOTION.reveal;
  const countCards = visibleCount(slide.cards?.length ?? 0, buildIndex, slide.builds);
  const countItems = visibleCount(slide.items?.length ?? 0, buildIndex, slide.builds);

  const content = (() => {
    if (HERO_TYPES.has(slide.type)) return <HeroLayout slide={slide} />;
    if (DATA_TYPES.has(slide.type)) return <DataLayout slide={slide} countCards={countCards} countItems={countItems} />;
    if (PROCESS_TYPES.has(slide.type)) return <ProcessLayout slide={slide} countItems={countItems} />;
    if (RISK_TYPES.has(slide.type)) return <RiskLayout slide={slide} countCards={countCards} />;
    if (TIME_TYPES.has(slide.type)) return <TimelineLayout slide={slide} />;
    if (QUADRANT_TYPES.has(slide.type)) return <QuadrantLayout slide={slide} />;
    if (VIDEO_TYPES.has(slide.type)) return <VideoLayout slide={slide} />;
    if (slide.type === 'LIST') return <ListLayout slide={slide} countItems={countItems} />;
    return <HeroLayout slide={slide} />;
  })();

  return <motion.div key={slide.id} className="slide-motion" initial={staticMode ? undefined : preset.initial} animate={staticMode ? undefined : preset.animate} transition={preset.transition}><BaseSlideFrame slide={slide}>{content}</BaseSlideFrame></motion.div>;
}
