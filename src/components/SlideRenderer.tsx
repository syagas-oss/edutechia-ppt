import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { BentoItem, Slide } from '../types';

type Props = {
  slide: Slide;
  buildIndex: number;
  staticMode?: boolean;
};

function DynamicIcon({ name }: { name?: string }) {
  if (!name) return null;
  const key = name as keyof typeof Icons;
  const Comp = Icons[key] as React.ComponentType<{ className?: string }> | undefined;
  return Comp ? <Comp className="h-5 w-5 text-cyan-300" /> : null;
}

function visibleCount(total: number, buildIndex: number, builds?: string[]) {
  if (!builds || builds.length === 0) return total;
  return Math.max(1, Math.min(total, buildIndex + 1));
}

function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, i) => (
        <div key={item.id ?? `${item.title}-${i}`} className="glass-card p-5">
          <div className="mb-3 flex items-center gap-2">
            <DynamicIcon name={item.icon} />
            <h3 className="text-lg font-semibold">{item.title ?? item.subtitle ?? 'Elemento'}</h3>
          </div>
          {item.value ? <p className="text-3xl font-bold text-cyan-200">{item.value}</p> : null}
          {item.description ? <p className="mt-2 text-sm text-slate-200">{item.description}</p> : null}
        </div>
      ))}
    </div>
  );
}

export default function SlideRenderer({ slide, buildIndex, staticMode = false }: Props) {
  const Motion = staticMode ? 'div' : motion.div;
  const countCards = visibleCount(slide.cards?.length ?? 0, buildIndex, slide.builds);
  const countItems = visibleCount(slide.items?.length ?? 0, buildIndex, slide.builds);

  return (
    <Motion
      key={slide.id}
      className="slide-shell"
      initial={staticMode ? undefined : { opacity: 0, y: 16 }}
      animate={staticMode ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="tracking-[0.18em] uppercase text-cyan-300 text-sm">eduTechIA</p>
      <h1 className="mt-2 text-3xl font-bold md:text-5xl">{slide.title}</h1>
      <p className="mt-3 max-w-4xl text-lg text-slate-200">{slide.subtitle}</p>
      {slide.highlight ? <p className="mt-4 inline-block rounded-full bg-cyan-500/20 px-4 py-1 text-sm text-cyan-100">{slide.highlight}</p> : null}
      {slide.description ? <p className="mt-4 max-w-4xl text-slate-300">{slide.description}</p> : null}

      <div className="mt-8 space-y-5">
        {slide.stats?.length ? (
          <div className="grid gap-4 md:grid-cols-3">
            {slide.stats.map((s, i) => (
              <div key={`${s.l}-${i}`} className="glass-card p-4">
                <p className="text-3xl font-bold text-cyan-200">{s.v}</p>
                <p className="text-sm text-slate-200">{s.l}</p>
              </div>
            ))}
          </div>
        ) : null}

        {slide.cards?.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {slide.cards.slice(0, countCards).map((c, i) => (
              <div key={`${c.t}-${i}`} className={`glass-card p-5 ${c.highlight ? 'ring-1 ring-cyan-400/60' : ''}`}>
                <div className="mb-2 flex items-center gap-2"><DynamicIcon name={c.icon} /><h3 className="text-xl font-semibold">{c.t}</h3></div>
                <p className="text-slate-200">{c.d}</p>
              </div>
            ))}
          </div>
        ) : null}

        {slide.items?.length ? (
          <ul className="grid gap-3 md:grid-cols-2">
            {slide.items.slice(0, countItems).map((item, i) => {
              if (typeof item === 'string') return <li key={i} className="glass-card p-4">{item}</li>;
              return <li key={`${item.t}-${i}`} className="glass-card p-4"><p className="font-semibold">{item.t}</p><p className="text-slate-200">{item.d}</p></li>;
            })}
          </ul>
        ) : null}

        {slide.bentoItems?.length ? <BentoGrid items={slide.bentoItems} /> : null}

        {slide.timeline?.length ? (
          <div className="space-y-3">
            {slide.timeline.map((t, i) => (
              <div key={`${t.year}-${i}`} className="glass-card p-4"><p className="text-cyan-200 font-semibold">{t.year} - {t.event}</p><p className="text-slate-200">{t.description}</p></div>
            ))}
          </div>
        ) : null}

        {slide.tableData?.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {slide.tableData.map((c, i) => (
              <div key={`${c.h}-${i}`} className="glass-card p-4"><p className="mb-2 font-semibold text-cyan-100">{c.h}</p><ul className="space-y-1 text-sm text-slate-200">{c.items.map((x,j)=><li key={j}>• {x}</li>)}</ul></div>
            ))}
          </div>
        ) : null}
      </div>
    </Motion>
  );
}
