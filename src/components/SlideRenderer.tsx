import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { Card, Slide, TimelineItem } from '../types';

type Props = {
  slide: Slide;
  buildIndex: number;
  staticMode?: boolean;
};

const DATA_TYPES = new Set(['BENTO_DATA', 'ECONOMIC', 'BENTO_GRID']);
const PROCESS_TYPES = new Set(['STEPS', 'SQUADS', 'ROADMAP']);
const RISK_TYPES = new Set(['ALERT', 'BENTO_MARKET']);
const TIME_TYPES = new Set(['TIMELINE']);
const HERO_TYPES = new Set(['HERO', 'HERO_GLOW', 'HERO_FINAL', 'KINETIC_BRIDGE']);
const VIDEO_TYPES = new Set(['VIDEO']);
const QUADRANT_TYPES = new Set(['QUADRANT']);

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
      {items.map((item, i) => {
        if (typeof item === 'string') {
          return (
            <li key={i}>
              <span className="dot" />
              <span>{item}</span>
            </li>
          );
        }
        return (
          <li key={`${item.t}-${i}`}>
            <span className="dot" />
            <span>
              <strong>{item.t}</strong>
              <small>{item.d}</small>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function BaseSlideFrame({ slide, children }: { slide: Slide; children: React.ReactNode }) {
  return (
    <section className={`slide-shell slide-${String(slide.type).toLowerCase()}`}>
      <div className="slide-topline">
        <p className="brand-tag">eduTechIA</p>
        <span className="type-pill">{String(slide.type).replace(/_/g, ' ')}</span>
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
        {slide.description ? <p className="slide-description">{slide.description}</p> : null}
      </div>
      <div className="hero-side-panel">
        <p>Personalización educativa con evidencia y control docente.</p>
      </div>
    </div>
  );
}

function StatChart({ values }: { values: string[] }) {
  const nums = values
    .map((v) => Number((v.match(/\d+(?:\.\d+)?/) ?? ['0'])[0]))
    .map((v) => (Number.isFinite(v) ? v : 0));
  const max = Math.max(...nums, 1);

  return (
    <div className="chart-shell" aria-hidden>
      {nums.map((n, i) => (
        <div key={`${n}-${i}`} className="bar-wrap">
          <div className="bar" style={{ height: `${Math.max(20, (n / max) * 100)}%` }} />
        </div>
      ))}
    </div>
  );
}

function DataLayout({ slide, countCards, countItems }: { slide: Slide; countCards: number; countItems: number }) {
  const cards = slide.cards?.slice(0, countCards) ?? [];
  const items = slide.items?.slice(0, countItems) ?? [];

  return (
    <div className="data-layout">
      <div>
        <h1 className="slide-title">{slide.title}</h1>
        <p className="slide-subtitle">{slide.subtitle}</p>
        {slide.stats?.length ? (
          <div className="stats-grid">
            {slide.stats.map((s, i) => (
              <article key={`${s.l}-${i}`} className="panel metric-card">
                <p className="metric-value">{s.v}</p>
                <p className="metric-label">{s.l}</p>
              </article>
            ))}
          </div>
        ) : null}

        {slide.bentoItems?.length ? (
          <div className="bento-premium">
            {slide.bentoItems.map((item, i) => (
              <article key={item.id ?? `${item.title}-${i}`} className={`panel bento-card ${item.variant ?? 'glass'}`}>
                <div className="bento-heading">
                  <DynamicIcon name={item.icon} />
                  <h3>{item.title ?? item.subtitle ?? 'Elemento'}</h3>
                </div>
                {item.value ? <p className="metric-value">{item.value}</p> : null}
                {item.description ? <p className="muted">{item.description}</p> : null}
              </article>
            ))}
          </div>
        ) : null}

        {cards.length ? (
          <div className="cards-premium">
            {cards.map((c, i) => (
              <article key={`${c.t}-${i}`} className={`panel ${c.highlight ? 'card-emphasis' : ''}`}>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </article>
            ))}
          </div>
        ) : null}

        {items.length ? renderListItems(items) : null}
      </div>

      <div className="data-aside">
        <StatChart values={(slide.stats ?? []).map((s) => s.v)} />
        <p className="muted">Lectura visual rápida del impacto esperado y la prioridad de intervención.</p>
      </div>
    </div>
  );
}

function ProcessLayout({ slide, countItems }: { slide: Slide; countItems: number }) {
  const items = (slide.items?.slice(0, countItems) ?? []).map((x) =>
    typeof x === 'string' ? { t: x, d: '' } : x,
  );

  return (
    <div>
      <h1 className="slide-title">{slide.title}</h1>
      <p className="slide-subtitle">{slide.subtitle}</p>
      <div className="flow-grid">
        {items.map((item, i) => (
          <article key={`${item.t}-${i}`} className="panel flow-step">
            <span className="step-index">{String(i + 1).padStart(2, '0')}</span>
            <h3>{item.t}</h3>
            <p>{item.d}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function RiskLayout({ slide, countCards }: { slide: Slide; countCards: number }) {
  const cards = slide.cards?.slice(0, countCards) ?? [];
  return (
    <div>
      <h1 className="slide-title">{slide.title}</h1>
      <p className="slide-subtitle">{slide.subtitle}</p>

      {slide.tableData?.length ? (
        <div className="market-grid">
          {slide.tableData.map((col, i) => (
            <article key={`${col.h}-${i}`} className="panel market-col">
              <div className="market-heading">
                <DynamicIcon name={col.icon} />
                <h3>{col.h}</h3>
              </div>
              <ul>
                {col.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : null}

      {cards.length ? (
        <div className="risk-grid">
          {cards.map((c: Card, i) => (
            <article key={`${c.t}-${i}`} className={`panel risk-card ${c.highlight ? 'risk-critical' : ''}`}>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TimelineLayout({ slide }: { slide: Slide }) {
  const timeline = slide.timeline ?? [];
  return (
    <div>
      <h1 className="slide-title">{slide.title}</h1>
      <p className="slide-subtitle">{slide.subtitle}</p>
      <div className="timeline-shell">
        {timeline.map((step: TimelineItem, i) => (
          <article key={`${step.year}-${i}`} className="timeline-item">
            <span className="year-pill">{step.year}</span>
            <h3>{step.event}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function QuadrantLayout({ slide }: { slide: Slide }) {
  return (
    <div>
      <h1 className="slide-title">{slide.title}</h1>
      <p className="slide-subtitle">{slide.subtitle}</p>
      <div className="quadrant-shell">
        <span className="axis axis-x">Mayor personalización</span>
        <span className="axis axis-y">Mayor facilidad docente</span>
        <div className="quad-grid">
          <div className="qcell"><small>Baja personalización</small></div>
          <div className="qcell"><small>Alta personalización</small></div>
          <div className="qcell"><small>Baja adopción</small></div>
          <div className="qcell opportunity"><strong>Opportunity Space - eduTechIA</strong></div>
        </div>
      </div>
      {slide.items ? renderListItems(slide.items) : null}
    </div>
  );
}

function VideoLayout({ slide }: { slide: Slide }) {
  return (
    <div>
      <h1 className="slide-title">{slide.title}</h1>
      <p className="slide-subtitle">{slide.subtitle}</p>
      <div className="video-stage panel">
        <div className="video-frame">
          <Icons.PlayCircle className="icon-lg" />
          <p>Demo Preview</p>
        </div>
        <div className="video-callouts">
          <p>Entrada docente</p>
          <p>Generación IA</p>
          <p>Validación + feedback</p>
        </div>
      </div>
    </div>
  );
}

function ListLayout({ slide, countItems }: { slide: Slide; countItems: number }) {
  return (
    <div>
      <h1 className="slide-title">{slide.title}</h1>
      <p className="slide-subtitle">{slide.subtitle}</p>
      {renderListItems(slide.items?.slice(0, countItems))}
    </div>
  );
}

export default function SlideRenderer({ slide, buildIndex, staticMode = false }: Props) {
  const Motion = staticMode ? 'div' : motion.div;
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

  return (
    <Motion
      key={slide.id}
      className="slide-motion"
      initial={staticMode ? undefined : { opacity: 0, y: 20 }}
      animate={staticMode ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <BaseSlideFrame slide={slide}>{content}</BaseSlideFrame>
    </Motion>
  );
}

