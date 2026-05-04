import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

type Props = {
  slideIndex: number;
  phase?: 'intro' | 'deck';
};

type ExtraFlower = {
  id: string;
  bornAt: number;
  left: string;
  top: string;
  size: number;
  path: string;
  colors: [string, string, string];
  scale: number;
  opacity: number;
  saturation: number;
  contrast: number;
  rotate: number;
  life: number;
};

const palette = [
  ['#f26a24', '#d0f156', '#d8d7f7'],
  ['#f5b041', '#f26a24', '#fff8ea'],
  ['#d0f156', '#58a98f', '#f8d894'],
  ['#d8d7f7', '#f26a24', '#f6efdd'],
];

const deckAnchors = [
  [2, 8],
  [18, 92],
  [78, 4],
  [96, 76],
  [6, 62],
  [88, 34],
  [46, 96],
  [58, 10],
];

const introAnchors = [
  [12, 16],
  [83, 13],
  [16, 76],
  [86, 78],
  [50, 50],
  [45, 23],
  [55, 76],
  [34, 48],
  [66, 44],
  [50, 14],
];

export default function Scene3D({ slideIndex, phase = 'deck' }: Props) {
  const [extras, setExtras] = useState<ExtraFlower[]>([]);
  const anchors = phase === 'intro' ? introAnchors : deckAnchors;
  const count = phase === 'intro' ? 10 : 7;

  const motifs = useMemo(
    () => Array.from({ length: count }, (_, i) => {
      const base = anchors[(i + slideIndex + anchors.length) % anchors.length];
      const offsetX = (((slideIndex + i) % 3) - 1) * (phase === 'intro' ? 5 : 3);
      const offsetY = (((slideIndex + i * 2) % 3) - 1) * (phase === 'intro' ? 5 : 3);
      return {
        id: i,
        left: `${base[0] + offsetX}%`,
        top: `${base[1] + offsetY}%`,
        size: phase === 'intro'
          ? 250 + ((i * 61 + Math.max(slideIndex, 0) * 23) % 240)
          : 220 + ((i * 47 + Math.max(slideIndex, 0) * 17) % 170),
        delay: `${-(i * (phase === 'intro' ? 1.5 : 2.1))}s`,
        duration: `${phase === 'intro' ? 14 + (i % 4) * 3 : 24 + (i % 4) * 7}s`,
        colors: palette[(Math.max(slideIndex, 0) + i) % palette.length],
        scale: phase === 'intro' ? 1.14 + (i % 3) * 0.05 : 1,
        opacity: phase === 'intro' ? 0.46 : 0.29,
        saturation: phase === 'intro' ? 1.5 : 1.28,
        contrast: phase === 'intro' ? 1.14 : 1.06,
      };
    }),
    [anchors, count, phase, slideIndex],
  );

  useEffect(() => {
    if (phase !== 'intro') {
      setExtras([]);
      return undefined;
    }

    const makeExtra = (): ExtraFlower => {
      const life = 5200 + Math.floor(Math.random() * 2800);
      const bornAt = Date.now();
      const startX = -180 + Math.random() * 360;
      const startY = -140 + Math.random() * 280;
      const c1x = startX + (-140 + Math.random() * 280);
      const c1y = startY + (-160 + Math.random() * 320);
      const c2x = startX + (-160 + Math.random() * 320);
      const c2y = startY + (-180 + Math.random() * 360);
      const endX = startX + (-220 + Math.random() * 440);
      const endY = startY + (-200 + Math.random() * 400);
      return {
        id: `${bornAt}-${Math.random().toString(16).slice(2)}`,
        bornAt,
        left: `${8 + Math.random() * 84}%`,
        top: `${8 + Math.random() * 84}%`,
        size: 90 + Math.floor(Math.random() * 170),
        path: `path("M 0 0 C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}")`,
        colors: palette[Math.floor(Math.random() * palette.length)] as [string, string, string],
        scale: 0.7 + Math.random() * 0.65,
        opacity: 0.22 + Math.random() * 0.26,
        saturation: 1.2 + Math.random() * 0.55,
        contrast: 1.04 + Math.random() * 0.12,
        rotate: -70 + Math.random() * 140,
        life,
      };
    };

    const spawn = () => {
      const now = Date.now();
      setExtras((current) => {
        const next = current.filter((flower) => flower.bornAt + flower.life > now);
        return [...next.slice(-10), makeExtra()];
      });
    };

    spawn();
    const timer = window.setInterval(spawn, 700);
    return () => window.clearInterval(timer);
  }, [phase]);

  return (
    <div className={`scene-root ${phase === 'intro' ? 'phase-intro' : 'phase-deck'}`} aria-hidden>
      {motifs.map((motif) => (
        <span
          key={motif.id}
          className={`background-flower ${phase === 'intro' ? 'is-intro' : 'is-deck'}`}
          style={{
            left: motif.left,
            top: motif.top,
            width: motif.size,
            height: motif.size,
            animationDelay: motif.delay,
            animationDuration: motif.duration,
            '--flower-a': motif.colors[0],
            '--flower-b': motif.colors[1],
            '--flower-c': motif.colors[2],
            '--flower-scale': motif.scale,
            '--flower-opacity': motif.opacity,
            '--flower-sat': motif.saturation,
            '--flower-contrast': motif.contrast,
          } as CSSProperties}
        />
      ))}
      {extras.map((flower) => (
        <span
          key={flower.id}
          className="background-flower background-flower--extra"
          style={{
            left: flower.left,
            top: flower.top,
            width: flower.size,
            height: flower.size,
            '--flower-life': `${flower.life}ms`,
            offsetPath: flower.path,
            offsetRotate: 'auto 90deg',
            '--flower-a': flower.colors[0],
            '--flower-b': flower.colors[1],
            '--flower-c': flower.colors[2],
            '--flower-scale': flower.scale,
            '--flower-opacity': flower.opacity,
            '--flower-sat': flower.saturation,
            '--flower-contrast': flower.contrast,
            '--flower-rotate': `${flower.rotate}deg`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
