export type SlideType =
  | 'HERO'
  | 'HERO_GLOW'
  | 'HERO_FINAL'
  | 'BENTO_DATA'
  | 'BENTO_MARKET'
  | 'BENTO_GRID'
  | 'ALERT'
  | 'LIST'
  | 'STEPS'
  | 'TIMELINE'
  | 'KINETIC_BRIDGE'
  | 'VIDEO'
  | 'PYRAMID'
  | 'FUNNEL'
  | 'CIRCULAR'
  | 'ROADMAP'
  | 'SQUADS'
  | 'ECONOMIC'
  | 'CARDS_CHOICE'
  | 'QUADRANT'
  | 'EXECUTIVE_SUMMARY';

export interface ContentData {
  slides: Slide[];
}

export interface Slide {
  id: number;
  type: SlideType | string;
  title: string;
  subtitle: string;
  themeVariant?: 'act1' | 'act2' | 'act3' | 'act4' | 'act5' | string;
  layoutVariant?:
    | 'hero-cinematic'
    | 'hero-cinematic-v2'
    | 'journey-map'
    | 'emotional-constellation'
    | 'data-spotlight'
    | 'funnel-decision'
    | 'process-flow'
    | 'orbit-triad'
    | 'core-engine'
    | 'market-topography'
    | 'northstar-compass'
    | 'pipeline-architecture'
    | 'layer-stack'
    | 'risk-cockpit'
    | 'compliance-shield'
    | 'timeline-orbit-v2'
    | 'economic-arc'
    | 'roadmap-journey'
    | 'stage-demo-pro'
    | 'workflow-stage'
    | 'hero-final-impact'
    | 'default'
    | string;
  motionPreset?: 'reveal' | 'parallax' | 'spotlight' | 'sequence-build' | 'axis-draw' | string;
  emphasis?: 'standard' | 'signature' | string;
  visualCue?: 'spotlight-beam' | 'alert-pulse' | 'grid-waves' | string;
  description?: string;
  highlight?: string;
  stats?: Stat[];
  items?: Array<string | { t: string; d: string; icon?: string }>;
  cards?: Card[];
  bentoItems?: BentoItem[];
  tableData?: TableCol[];
  timeline?: TimelineItem[];
  speakerNotes?: string;
  builds?: string[];
  sceneProps?: Record<string, unknown>;
}

export interface Stat {
  v: string;
  l: string;
  icon?: string;
  trend?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface TableCol {
  h: string;
  items: string[];
  icon: string;
}

export interface Card {
  t: string;
  d: string;
  icon?: string;
  highlight?: boolean;
}

export interface BentoItem {
  id?: string;
  title?: string;
  value?: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  span?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'glass' | 'glassStrong' | 'accent' | 'outline' | 'media';
  image?: string;
}

export interface TimelineItem {
  year: string;
  event: string;
  description?: string;
  icon?: string;
  highlight?: boolean;
}