import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { Card, Slide, TimelineItem } from '../types';

type Props = {
  slide: Slide;
  buildIndex: number;
  staticMode?: boolean;
};

type LayoutProps = {
  slide: Slide;
  buildIndex: number;
  countCards: number;
  countItems: number;
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

const TYPE_LABELS: Record<string, string> = {
  BENTO_GRID: 'Matriz',
  BENTO_DATA: 'Datos clave',
  BENTO_MARKET: 'Mercado',
  CARDS_CHOICE: 'Opciones',
  HERO_GLOW: 'Portada',
  HERO_FINAL: 'Cierre',
  KINETIC_BRIDGE: 'Transicion',
};

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

function SlideStage({ slide, children }: { slide: Slide; children: React.ReactNode }) {
  return (
    <section className={`slide-shell slide-${String(slide.type).toLowerCase()} theme-${slide.themeVariant ?? 'act1'} layout-${slide.layoutVariant ?? 'default'} ${slide.emphasis === 'signature' ? 'signature' : ''} cue-${slide.visualCue ?? 'grid-waves'}`}>
      <div className="atmo-layer" aria-hidden />
      <div className="kinetic-layer" aria-hidden />
      <div className="fx-parallax-layer depth-z2" aria-hidden />
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
    </div>
  );
}

function HeroCinematicV2({ slide }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="hero-side-panel fx-beam-sweep"><p>Personalizacion cognitiva y control docente en tiempo real.</p></div></div>; }
function AgendaOrbitMap({ slide }: LayoutProps) { const items=(slide.items??[]).map((x)=>typeof x==='string'?{t:x,d:''}:x); return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="scene-orbit"><svg viewBox="0 0 900 360" className="scene-svg"><path d="M40 180 C 240 20, 660 340, 860 180" className="path-line" />{items.map((item,i)=>{const x=90+i*190;const y=180+Math.sin(i*0.9)*70;return <g key={`${item.t}-${i}`}><circle cx={x} cy={y} r={24} className="orbit-node" /><text x={x} y={y+5} textAnchor="middle" className="orbit-index">{i+1}</text><text x={x} y={y+48} textAnchor="middle" className="orbit-label">{item.t}</text></g>;})}</svg></div></div>; }
function LearnerConstellation({ slide }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="scene-constellation">{Array.from({length:30}).map((_,i)=><motion.span key={i} className="constellation-dot" style={{left:`${10+(i*3)%80}%`,top:`${15+(i*7)%70}%`}} initial={{opacity:0,scale:0.3}} animate={{opacity:1,scale:1}} transition={{delay:i*0.03}} />)}<div className="constellation-center">Docente</div></div></div>; }
function RadialMetricCluster({ slide }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="metric-gauge-cluster">{(slide.stats??[]).map((s,i)=><article key={`${s.l}-${i}`} className="gauge"><div className="gauge-ring" /><p className="metric-value">{s.v}</p><p className="metric-label">{s.l}</p></article>)}</div>{renderListItems(slide.items)}</div>; }
function DecisionFunnel({ slide }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="scene-funnel"><div className="funnel-lines" /><div className="funnel-core">{slide.subtitle}</div><div className="funnel-sources">{(slide.cards??[]).map((c,i)=><p key={`${c.t}-${i}`}>{c.t}</p>)}</div></div></div>; }
function FlowPathStage({ slide, countItems }: LayoutProps) { const items=(slide.items?.slice(0,countItems)??[]).map((x)=>typeof x==='string'?{t:x,d:''}:x); return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="scene-flow-path">{items.map((item,i)=><motion.article key={`${item.t}-${i}`} className="flow-node" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.12}}><span className="step-index">{String(i+1).padStart(2,'0')}</span><h3>{item.t}</h3><p>{item.d}</p></motion.article>)}</div></div>; }
function OrbitNarrative({ slide }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="orbit-triad">{(slide.bentoItems??[]).map((item,i)=><article key={`${item.title}-${i}`} className="orbit-pill"><DynamicIcon name={item.icon} /><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div>; }
function AIDecisionCore({ slide }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="scene-core-engine"><div className="core-center">IA</div>{(slide.bentoItems??[]).map((item,i)=><article key={`${item.title}-${i}`} className={`core-arm arm-${i+1}`}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div>; }
function CompetitiveLandscapeMap({ slide }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="landscape-map"><div className="axis-x">Mayor personalizacion</div><div className="axis-y">Mayor facilidad docente</div><div className="opportunity-zone">Opportunity Space - eduTechIA</div></div>{renderListItems(slide.items)}</div>; }
function NorthStarCompass({ slide }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="northstar-compass"><div className="compass-ring"><div className="compass-needle" /></div><div className="compass-kpis">{(slide.stats??[]).map((s,i)=><p key={`${s.l}-${i}`}><strong>{s.v}</strong> {s.l}</p>)}</div></div></div>; }
function LayerStackScene({ slide }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="layer-stack-scene">{(slide.bentoItems??[]).map((item,i)=><article key={`${item.title}-${i}`} className="layer-plane" style={{transform:`translateY(${i*12}px) translateX(${i*8}px)`}}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div>; }
function RiskCockpit({ slide, countCards }: LayoutProps) { const cards=slide.cards?.slice(0,countCards)??[]; return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="scene-cockpit"><div className="risk-matrix" /><div className="risk-list">{cards.map((c:Card,i)=><article key={`${c.t}-${i}`} className={`risk-item ${c.highlight?'risk-critical':''}`}><h3>{c.t}</h3><p>{c.d}</p></article>)}</div></div></div>; }
function ComplianceShieldRings({ slide }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="compliance-shield"><div className="shield-center">Compliance</div>{(slide.tableData??[]).map((col,i)=><article key={`${col.h}-${i}`} className="shield-ring"><h3>{col.h}</h3><ul>{col.items.map((it,j)=><li key={j}>{it}</li>)}</ul></article>)}</div></div>; }
function TimelineOrbit({ slide }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="timeline-orbit-v2">{(slide.timeline??[]).map((step:TimelineItem,i)=><motion.article key={`${step.year}-${i}`} className="timeline-orbit-node" initial={{opacity:0,x:-18}} animate={{opacity:1,x:0}} transition={{delay:i*0.14}}><span className="year-pill">{step.year}</span><h3>{step.event}</h3><p>{step.description}</p></motion.article>)}</div></div>; }
function EconomicArcChart({ slide }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="chart-arc-profit"><svg viewBox="0 0 900 300" className="scene-svg"><path d="M20 250 C 250 260, 450 280, 620 160 S 840 60, 880 40" className="profit-arc" /><line x1="0" y1="180" x2="900" y2="180" className="break-line" /></svg><div className="metric-inline">{(slide.stats??[]).map((s,i)=><p key={`${s.l}-${i}`}><strong>{s.v}</strong> {s.l}</p>)}</div></div></div>; }
function RoadmapJourneyPath({ slide, countItems }: LayoutProps) { const items=(slide.items?.slice(0,countItems)??[]).map((x)=>typeof x==='string'?{t:x,d:''}:x); return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="roadmap-journey">{items.map((item,i)=><article key={`${item.t}-${i}`} className="journey-stop"><span>{String(i+1).padStart(2,'0')}</span><p>{item.t}</p></article>)}</div></div>; }
function DemoStageFrame({ slide }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} /><div className="video-stage-pro"><div className="video-device"><Icons.PlayCircle className="icon-lg" /><p>Demo Preview</p></div><div className="video-callouts"><p>Entrada docente</p><p>Generacion IA</p><p>Validacion + feedback</p></div></div></div>; }
function GenericData({ slide, countCards, countItems }: LayoutProps) { return <div className="scene-wrap"><SlideHeading slide={slide} />{slide.stats?.length ? <div className="stats-grid">{slide.stats.map((s, i) => <article key={`${s.l}-${i}`} className="panel metric-card"><p className="metric-value">{s.v}</p><p className="metric-label">{s.l}</p></article>)}</div> : null}{(slide.cards?.slice(0, countCards) ?? []).length ? <div className="cards-premium">{(slide.cards?.slice(0, countCards) ?? []).map((c, i) => <article key={`${c.t}-${i}`} className={`panel ${c.highlight ? 'card-emphasis' : ''}`}><h3>{c.t}</h3><p>{c.d}</p></article>)}</div> : null}{(slide.items?.slice(0, countItems) ?? []).length ? renderListItems(slide.items?.slice(0, countItems)) : null}</div>; }

const LAYOUT_REGISTRY: Record<string, (props: LayoutProps) => JSX.Element> = {
  'hero-cinematic': HeroCinematicV2, 'hero-cinematic-v2': HeroCinematicV2, 'journey-map': AgendaOrbitMap,
  'emotional-constellation': LearnerConstellation, 'data-spotlight': RadialMetricCluster, 'funnel-decision': DecisionFunnel,
  'process-flow': FlowPathStage, 'orbit-triad': OrbitNarrative, 'core-engine': AIDecisionCore, 'market-topography': CompetitiveLandscapeMap,
  'northstar-compass': NorthStarCompass, 'pipeline-architecture': FlowPathStage, 'layer-stack': LayerStackScene,
  'risk-cockpit': RiskCockpit, 'compliance-shield': ComplianceShieldRings, 'timeline-orbit-v2': TimelineOrbit,
  'economic-arc': EconomicArcChart, 'roadmap-journey': RoadmapJourneyPath, 'stage-demo-pro': DemoStageFrame,
  'workflow-stage': DemoStageFrame, 'hero-final-impact': HeroCinematicV2,
};

export default function SlideRenderer({ slide, buildIndex, staticMode = false }: Props) {
  const preset = PRESET_MOTION[(slide.motionPreset as keyof typeof PRESET_MOTION) ?? 'reveal'] ?? PRESET_MOTION.reveal;
  const countCards = visibleCount(slide.cards?.length ?? 0, buildIndex, slide.builds);
  const countItems = visibleCount(slide.items?.length ?? 0, buildIndex, slide.builds);
  const layoutKey = slide.layoutVariant ?? 'default';
  const LayoutComp = LAYOUT_REGISTRY[layoutKey] ?? GenericData;

  return <motion.div key={slide.id} className="slide-motion" initial={staticMode ? undefined : preset.initial} animate={staticMode ? undefined : preset.animate} transition={preset.transition}><SlideStage slide={slide}><LayoutComp slide={slide} buildIndex={buildIndex} countCards={countCards} countItems={countItems} /></SlideStage></motion.div>;
}