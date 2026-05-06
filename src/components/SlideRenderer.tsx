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

type VisualEntry = {
  t: string;
  d: string;
  icon?: string;
};

function VisualIcon({ name, index, className }: { name?: string; index: number; className: string }) {
  const fallback = ['teacher', 'settings', 'check', 'target', 'shield', 'pin', 'brain', 'file', 'student', 'chart', 'compass'];
  const key = (name && !name.includes('?') ? name : fallback[index % fallback.length]).toLowerCase();
  const Icon = ({
    teacher: Icons.UserRoundCheck,
    settings: Icons.Settings,
    check: Icons.CheckCircle2,
    target: Icons.Target,
    shield: Icons.ShieldCheck,
    pin: Icons.Pin,
    brain: Icons.Brain,
    file: Icons.FileText,
    student: Icons.GraduationCap,
    chart: Icons.BarChart3,
    compass: Icons.Compass,
    privacy: Icons.EyeOff,
    ban: Icons.Ban,
    ruler: Icons.Ruler,
    tag: Icons.Tags,
    refresh: Icons.RefreshCw,
    spark: Icons.Sparkles,
    puzzle: Icons.Puzzle,
    rocket: Icons.Rocket,
  } as Record<string, Icons.LucideIcon>)[key] ?? Icons.Sparkles;

  return (
    <span className={className} aria-hidden>
      <Icon strokeWidth={2.5} />
    </span>
  );
}

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

function SlideNumber({ n }: { n: number }) {
  return <span className="big-step-number">{String(n).padStart(2, '0')}</span>;
}

function CoverEditorial({ slide }: LayoutProps) {
  return (
    <div className="scene-wrap cover-editorial">
      <div className="cover-copy">
        <p className="cover-kicker">Copiloto pedagogico</p>
        <h1>{slide.title}</h1>
        {slide.highlight ? <p className="cover-highlight">{slide.highlight}</p> : null}
        {slide.callout ? <p className="cover-callout">{slide.callout}</p> : null}
      </div>
      {renderImage(slide.image, 'cover-image')}
    </div>
  );
}

function ThreeLineHero({ slide }: LayoutProps) {
  const lines = slide.subtitle.split('|').map((line) => line.trim()).filter(Boolean);
  return (
    <div className="scene-wrap three-line-hero">
      <div className="hero-claim-card">
        <h1>{slide.title}</h1>
        <div>
          {lines.map((line, i) => <p key={`${line}-${i}`}>{line}</p>)}
        </div>
        {slide.callout ? <strong>{slide.callout}</strong> : null}
      </div>
      {renderImage(slide.image, 'hero-media')}
    </div>
  );
}

function VerticalColorCards({ slide, countCards }: LayoutProps) {
  const cards = slide.cards?.slice(0, countCards) ?? [];
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className="vertical-color-cards">
        {cards.map((card, i) => (
          <article key={`${card.t}-${i}`} className={`color-card color-card-${i + 1}`}>
            <SlideNumber n={i + 1} />
            <div>
              <h3>{card.t}</h3>
              <p>{card.d}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function EmojiGridCards({ slide, countItems }: LayoutProps) {
  const source = slide.items?.slice(0, countItems) ?? slide.sections ?? [];
  const entries: VisualEntry[] = source.map((x) => (
    typeof x === 'string'
      ? { t: x, d: '' }
      : 't' in x
        ? x
        : { t: x.title ?? '', d: x.body ?? '', icon: (x as SlideSection & { icon?: string }).icon }
  ));
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className={`emoji-grid-cards count-${entries.length}`}>
        {entries.map((item, i) => (
          <article key={`${item.t}-${i}`} className="emoji-card">
            <VisualIcon name={item.icon} index={i} className="emoji-badge" />
            <h3>{item.t}</h3>
            <p>{item.d}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function TallMediaCards({ slide, countItems }: LayoutProps) {
  const items = (slide.items?.slice(0, countItems) ?? slide.sections ?? []).map((x) => (
    typeof x === 'string' ? { t: x, d: '' } : 't' in x ? x : { t: x.title ?? '', d: x.body ?? '' }
  ));
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className="tall-media-layout">
        {renderImage(slide.image, 'tall-reference-image')}
        <div className="tall-card-stack">
          {items.map((item, i) => (
            <article key={`${item.t}-${i}`} className={`tall-card tall-card-${i + 1}`}>
              <h3>{item.t}</h3>
              <p>{item.d}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ThreeBigColumns({ slide }: LayoutProps) {
  const entries = (slide.sections ?? slide.cards ?? []).map((x) => (
    'body' in x ? { t: x.title ?? '', d: x.body ?? '' } : { t: x.t, d: x.d, icon: x.icon }
  ));
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className="three-big-columns">
        {entries.slice(0, 3).map((item, i) => (
          <article key={`${item.t}-${i}`}>
            <VisualIcon name={item.icon} index={i} className="column-icon" />
            <h3>{item.t}</h3>
            <p>{item.d}</p>
          </article>
        ))}
      </div>
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
    { label: 'A', x: 20, y: 62, title: 'Worksheets / fichas', desc: 'Recursos estaticos: Twinkl, Liveworksheets.' },
    { label: 'B', x: 34, y: 46, title: 'Practica gamificada', desc: 'Kahoot!, Quizizz, Wordwall.' },
    { label: 'C', x: 48, y: 58, title: 'LMS / aula digital', desc: 'Google Classroom, Moodle, Teams.' },
    { label: 'D', x: 59, y: 40, title: 'Tutoria adaptativa', desc: 'Khan Academy, Matific, Smartick.' },
    { label: 'E', x: 72, y: 52, title: 'IA generativa educativa', desc: 'MagicSchool, Diffit, Eduaide.' },
  ];
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className="benchmark-layout">
        <div className="benchmark-left">
          <div className="landscape-map">
            <div className="axis-x">Mayor personalizacion</div>
            <div className="axis-y">Mayor facilidad docente</div>
            <div className="grid-markers" />
            {points.map((p) => <span key={p.label} className="market-point" style={{ left: `${p.x}%`, top: `${p.y}%` }}>{p.label}</span>)}
            <div className="opportunity-zone">eduTechIA</div>
          </div>
          <div className="benchmark-legend">
            {points.map((p) => (
              <article key={p.label}>
                <strong>{p.label}</strong>
                <span>{p.title}</span>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="benchmark-insight">
          <span>Lo importante</span>
          <h3>El hueco no es otra plataforma completa.</h3>
          <p>eduTechIA se enfoca en convertir una necesidad docente en una actividad adaptada, facil de revisar y con control humano.</p>
          {renderListItems(slide.items)}
        </div>
      </div>
    </div>
  );
}

function NorthStarHero({ slide }: LayoutProps) {
  return (
    <div className="scene-wrap north-star-layout">
      <div className="north-star-symbol" aria-hidden>★</div>
      <div className="north-star-copy">
        <p>North Star</p>
        <h1>{slide.subtitle}</h1>
      </div>
      {renderStats(slide.stats)}
    </div>
  );
}

function ArrowFlow({ slide, countItems }: LayoutProps) {
  const items = (slide.items?.slice(0, countItems) ?? []).map((x) => (typeof x === 'string' ? { t: x, d: '' } : x));
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className="arrow-flow">
        {items.map((item, i) => (
          <article key={`${item.t}-${i}`}>
            <VisualIcon name={item.icon} index={i} className="flow-emoji" />
            <h3>{item.t}</h3>
            <p>{item.d}</p>
            {i < items.length - 1 ? <span className="flow-arrow">→</span> : null}
          </article>
        ))}
      </div>
    </div>
  );
}

function LayerStackVertical({ slide }: LayoutProps) {
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className="layer-stack-vertical">
        {(slide.sections ?? []).map((section, i) => (
          <article key={`${section.title}-${i}`}>
            <SlideNumber n={i + 1} />
            <div>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </div>
            {i < (slide.sections?.length ?? 0) - 1 ? <span className="layer-arrow">↓</span> : null}
          </article>
        ))}
      </div>
    </div>
  );
}

function JourneySteps({ slide }: LayoutProps) {
  return (
    <div className="scene-wrap">
      <SlideHeading slide={slide} />
      <div className="journey-layout">
        <div className="journey-steps">
          {(slide.sections ?? []).map((section, i) => (
            <article key={`${section.title}-${i}`}>
              <SlideNumber n={i + 1} />
              <h3>{section.title}</h3>
              <p>{section.body}</p>
              {i < (slide.sections?.length ?? 0) - 1 ? <span>→</span> : null}
            </article>
          ))}
        </div>
        {slide.callout ? (
          <a className="demo-link-cta" href={slide.callout} target="_blank" rel="noreferrer">
            <span>Probar demo</span>
            <strong>{slide.callout}</strong>
          </a>
        ) : null}
      </div>
    </div>
  );
}

function DisruptiveHero({ slide }: LayoutProps) {
  return (
    <div className="scene-wrap disruptive-hero">
      <div className="impact-orbit" aria-hidden />
      <div className="impact-copy">
        <p>{slide.title}</p>
        <h1>{slide.subtitle}</h1>
        {slide.highlight ? <strong>{slide.highlight}</strong> : null}
      </div>
      {slide.callout ? <div className="impact-callout">{slide.callout}</div> : null}
    </div>
  );
}

function ComplianceMatrix({ slide }: LayoutProps) {
  const rows = slide.sections ?? [];
  return (
    <div className="scene-wrap compliance-matrix-layout">
      <SlideHeading slide={slide} />
      <div className="compliance-table">
        <div className="compliance-head"><b>Normativa</b><b>Impacto</b><b>Plazo critico</b><b>Aplicacion en PoC</b></div>
        {rows.map((row, i) => {
          const parts = (row.body ?? '').split('|').map((x) => x.trim());
          return (
            <div className="compliance-row" key={`${row.title}-${i}`}>
              <strong>{row.title}</strong>
              <b className={`impact impact-${i}`}>{parts[0]}</b>
              <span>{parts[1]}</span>
              <p>{parts[2]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FullImageSlide({ slide }: LayoutProps) {
  return (
    <div className="scene-wrap full-image-layout">
      <SlideHeading slide={slide} />
      {renderImage(slide.image, 'full-bleed-image')}
    </div>
  );
}

function PricingReplica({ slide }: LayoutProps) {
  const cards = slide.cards ?? [];
  return (
    <div className="scene-wrap pricing-replica">
      <SlideHeading slide={slide} />
      <div className="pricing-body">
        <div className="pricing-device">
          <div className="phone-frame">
            <div className="phone-notch" />
            <div className="phone-card dark">Plan<br /><b>Centro</b></div>
            <div className="phone-card orange">IA<br /><b>Activa</b></div>
            <div className="phone-list" />
            <div className="phone-list short" />
          </div>
          <div className="brand-ribbon">eduTechIA</div>
        </div>
        <div className="pricing-list">
          {cards.map((card, i) => (
            <article key={`${card.t}-${i}`} className={card.highlight ? 'featured' : ''}>
              <SlideNumber n={i + 1} />
              <div>
                <h3>{card.t}</h3>
                <p>{card.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinanceBars({ slide }: LayoutProps) {
  const rows = [
    { label: 'Ano 1', ingresos: '115k', costes: '478k', ingresosH: 7, costesH: 24 },
    { label: 'Ano 2', ingresos: '428k', costes: '948k', ingresosH: 21, costesH: 47 },
    { label: 'Ano 3', ingresos: '1.81M', costes: '1.449M', ingresosH: 90, costesH: 72 },
  ];
  return (
    <div className="scene-wrap finance-bars-layout">
      <SlideHeading slide={slide} />
      <div className="finance-content">
        <div className="finance-stat-row">{renderStats(slide.stats)}</div>
        <div className="bar-chart-panel">
          <div className="bar-legend">
            <span><i className="legend-income" />Ingresos (€)</span>
            <span><i className="legend-cost" />Costes (€)</span>
          </div>
          <div className="chart-gridlines" aria-hidden />
          {rows.map((row) => (
            <article key={row.label}>
              <div className="bar-pair">
                <div className="bar bar-income" style={{ height: `${row.ingresosH}%` }}><strong>{row.ingresos}</strong></div>
                <div className="bar bar-cost" style={{ height: `${row.costesH}%` }}><strong>{row.costes}</strong></div>
              </div>
              <span>{row.label}</span>
            </article>
          ))}
        </div>
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
  'cover-editorial': CoverEditorial,
  'agenda-cards': AgendaCards,
  'problem-split': ProblemSplit,
  'editorial-image-box': EditorialImageBox,
  'benefits-timeline': BenefitsTimeline,
  'benchmark-map': BenchmarkMap,
  'regulatory-table': RegulatoryTable,
  'demo-stage-dark': DemoStageDark,
  'roadmap-horizon': RoadmapHorizon,
  'roadmap-wow': RoadmapWow,
  'three-line-hero': ThreeLineHero,
  'vertical-color-cards': VerticalColorCards,
  'emoji-grid-cards': EmojiGridCards,
  'tall-media-cards': TallMediaCards,
  'three-big-columns': ThreeBigColumns,
  'north-star-hero': NorthStarHero,
  'arrow-flow': ArrowFlow,
  'layer-stack-vertical': LayerStackVertical,
  'journey-steps': JourneySteps,
  'disruptive-hero': DisruptiveHero,
  'compliance-matrix': ComplianceMatrix,
  'full-image-slide': FullImageSlide,
  'pricing-replica': PricingReplica,
  'finance-bars': FinanceBars,
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
