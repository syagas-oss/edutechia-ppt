# Nestle PPT Clone Engine - Especificacion Ejecutable de Replica (React + Vite + TS)

## 1) Objetivo
Crear una nueva presentacion con contenido y estilo diferentes, manteniendo **igual** el motor base:
- Navegacion
- Librerias
- Flujo de render
- Contrato de datos
- Export PDF

Resultado esperado: mismo comportamiento funcional que `nestle-ppt-main`, con otra identidad visual y otro `content.json`.

## 2) Stack y librerias (obligatorio mantener)
Usar estas dependencias (mismas familias/roles):
- `react` 18.x
- `react-dom` 18.x
- `vite` 5.x
- `typescript` 5.x
- `tailwindcss` 3.x
- `framer-motion` 11.x
- `@react-three/fiber` 8.x
- `@react-three/drei` 9.x
- `three` 0.162.x
- `lucide-react` 0.344.x
- `html2canvas` 1.4.x
- `jspdf` 2.5.x

## 3) Arquitectura base 1:1
Mantener esta estructura conceptual minima:
- `App.tsx`: orquestador de estado, carga de contenido, navegacion, hotkeys, overlays, export PDF.
- `components/SlideRenderer.tsx`: renderiza UI segun `slide.type`.
- `components/Scene3D.tsx`: fondo 3D reactivo al indice de slide.
- `types.ts`: contrato tipado de contenido.
- `public/content/content.json`: fuente de verdad del deck.

Regla de carga de datos (obligatoria):
- Cargar JSON usando `import.meta.env.BASE_URL`.
- Ruta final: `${baseUrl}content/content.json`.
- Esto evita roturas en deploy en subcarpetas (ejemplo GitHub Pages).

## 4) Comportamiento funcional que debe quedar identico

### 4.1 Estado de navegacion
Conservar estados equivalentes:
- `currentSlideIndex`
- `currentBuildIndex`
- `direction`
- `showOverview`
- `showNotes`
- `isFullscreen`
- `isGeneratingPDF`

### 4.2 Reglas de avance/retroceso (builds)
- Si la slide actual tiene `builds`, primero avanzar build por build.
- Solo cuando termina `builds`, avanzar a la siguiente slide.
- Al retroceder:
  - Si hay build activo, retrocede build.
  - Si no, vuelve a slide anterior y posiciona en su ultimo build.

### 4.3 Hotkeys (obligatorias)
Mantener exactamente:
- `ArrowRight`, `ArrowDown`, `Space`: avanzar
- `ArrowLeft`, `ArrowUp`: retroceder
- `Escape`: toggle de overview
- `F`: toggle fullscreen
- `N`: toggle speaker notes
- `P`: export PDF

Comportamiento adicional:
- Si `showOverview` o `isGeneratingPDF` estan activos, bloquear navegacion (excepto `Escape`).

### 4.4 UI funcional obligatoria
- Barra de progreso superior por porcentaje de slide.
- Botonera de control (prev/next, overview, notes, pdf, fullscreen).
- Overlay de loading/export.
- Overview modal con grilla de slides clickeables.
- Panel de speaker notes por slide.

### 4.5 Export PDF (obligatorio)
- Usar `html2canvas` + `jsPDF`.
- Renderizar todas las slides en contenedor offscreen.
- Formato PDF: landscape `1920x1080`.
- Una pagina por slide.
- Fondo consistente (ej. `#050810`) para evitar transparencias.

### 4.6 Fondo 3D
- Mantener `Canvas` de `@react-three/fiber` + `Scene3D`.
- Reaccionar al indice de slide (formacion/color/animacion).
- No bloquear interaccion de la capa principal.

## 5) Contrato de datos (source of truth)

### 5.1 Esquema base
```ts
interface ContentData {
  slides: Slide[];
}

interface Slide {
  id: number;
  type:
    | 'HERO' | 'HERO_GLOW' | 'HERO_FINAL'
    | 'BENTO_DATA' | 'BENTO_MARKET' | 'BENTO_GRID'
    | 'ALERT' | 'LIST' | 'STEPS'
    | 'TIMELINE' | 'KINETIC_BRIDGE' | 'VIDEO'
    | 'PYRAMID' | 'FUNNEL' | 'CIRCULAR' | 'ROADMAP'
    | 'SQUADS' | 'ECONOMIC' | 'CARDS_CHOICE' | 'QUADRANT'
    | 'EXECUTIVE_SUMMARY';
  title: string;
  subtitle: string;
  description?: string;
  highlight?: string;
  stats?: Stat[];
  items?: any[];
  cards?: Card[];
  bentoItems?: BentoItem[];
  tableData?: TableCol[];
  timeline?: TimelineItem[];
  speakerNotes?: string;
  builds?: string[];
}
```

### 5.2 Campos auxiliares
```ts
interface Stat {
  v: string;
  l: string;
  icon?: string;
  trend?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface TableCol {
  h: string;
  items: string[];
  icon: string;
}

interface Card {
  t: string;
  d: string;
  icon?: string;
  highlight?: boolean;
}

interface BentoItem {
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

interface TimelineItem {
  year: string;
  event: string;
  description?: string;
  icon?: string;
  highlight?: boolean;
}
```

### 5.3 Mapa de tipo -> propiedades esperadas
- `HERO`, `HERO_GLOW`, `HERO_FINAL`: `title`, `subtitle`, opcional `highlight`.
- `BENTO_DATA`, `BENTO_GRID`: `stats` o `bentoItems`.
- `BENTO_MARKET`: `tableData`.
- `ALERT`, `STEPS`: `cards` o `items` con pares `t/d`.
- `TIMELINE`: `timeline`.
- `KINETIC_BRIDGE`: `title`, opcional `highlight`.
- `VIDEO`: placeholders de video/demo.
- `PYRAMID`, `FUNNEL`, `CIRCULAR`, `ROADMAP`, `SQUADS`, `QUADRANT`: `bentoItems` o `items` segun layout.
- `ECONOMIC`: contenido textual/metricas internas del renderer.
- `CARDS_CHOICE`: `items` con `t/d/icon`.
- `EXECUTIVE_SUMMARY`: `bentoItems` (resumen final).

## 6) Reglas de compatibilidad (no romper engine)
- No remover ni renombrar keys del contrato sin fallback.
- Si falta un campo opcional, el renderer debe degradar sin crash.
- Si `icon` no existe en `lucide-react`, renderizar sin icono (null-safe).
- `slide.type` desconocido debe caer en renderer fallback (hero generico) sin romper navegacion.
- Mantener `buildIndex` y `staticMode` como API entre `App` y `SlideRenderer`.

## 7) Guia de tematizacion (skin nueva, engine igual)

### 7.1 Se puede cambiar libremente
- Paleta de color
- Tipografia
- Espaciado, bordes, sombras
- Tokens CSS/Tailwind
- Microanimaciones (sin tocar semantica de navegacion)
- Copy y estructura de contenido en `content.json`

### 7.2 No se debe cambiar
- Flujo de navegacion y hotkeys
- Contrato JSON base
- Mecanismo de carga de `content/content.json`
- API `SlideRenderer(slide, buildIndex, staticMode)`
- Pipeline de export PDF

### 7.3 Estrategia recomendada de skinning
1. Congelar engine funcional.
2. Centralizar tokens visuales (`TOKENS`, colores, clases glass, tipografias).
3. Re-estilar por capas: base -> componentes -> animaciones.
4. Revalidar checklist funcional completo despues de cada bloque visual.

## 8) Pipeline sugerido: PDF -> content.json

### Paso 1: Extraccion por pagina
- Extraer texto por pagina del PDF (OCR si es escaneado).
- Preservar orden de bloques y encabezados.

### Paso 2: Segmentacion
- Regla inicial: 1 pagina PDF = 1 slide candidata.
- Si una pagina tiene multiples secciones, dividir en subslides solo si supera densidad legible.

### Paso 3: Clasificacion de tipo de slide
Heuristicas recomendadas:
- Titulo grande + subtitulo corto -> `HERO`/`HERO_GLOW`.
- 3-6 metricas numericas -> `BENTO_DATA`.
- Columna comparativa -> `BENTO_MARKET` o `QUADRANT`.
- Fechas/hitos -> `TIMELINE`.
- 3 opciones comparadas -> `CARDS_CHOICE`.
- Roadmap por fases -> `ROADMAP`.

### Paso 4: Mapeo al contrato
- Mapear cada pagina a objeto `Slide` valido.
- Completar `id` secuencial, `type`, `title`, `subtitle` minimo.
- Enriquecer `speakerNotes` con resumen de la pagina para presenter mode.

### Paso 5: Validacion automatica + fallback manual
- Validar JSON con esquema TS/JSON Schema.
- Reglas:
  - `slides` no vacio
  - `id` unico
  - `type` permitido
  - `title/subtitle` presentes
- Si falla clasificacion, fallback a `HERO` + `highlight`.

## 9) Prompt maestro para otra IA (copiar/pegar)
```md
Tarea: replicar el motor de presentaciones del proyecto base en React + Vite + TypeScript.
Objetivo: cambiar contenido y estilo, pero mantener navegacion, librerias y funcionamiento general.

Requisitos duros:
1) Mantener dependencias: react, vite, typescript, tailwindcss, framer-motion, @react-three/fiber, @react-three/drei, three, lucide-react, html2canvas, jspdf.
2) Mantener arquitectura: App orquestador, SlideRenderer por type, Scene3D fondo, types.ts contrato.
3) Cargar contenido desde public/content/content.json usando import.meta.env.BASE_URL.
4) Mantener hotkeys: Right/Down/Space next, Left/Up prev, Escape overview, F fullscreen, N notes, P pdf.
5) Mantener logica de builds incremental por slide.
6) Mantener overview modal, notes panel, progress bar y export PDF 1920x1080 multipagina.
7) Mantener compatibilidad del contrato Slide/ContentData y fallback robusto ante campos faltantes.

Entrada:
- PDF fuente con contenido.

Proceso:
- Extrae texto por pagina.
- Clasifica cada pagina a slide.type.
- Mapea a content.json valido segun contrato.
- Implementa tema visual nuevo sin tocar la semantica funcional.

Salida esperada:
- Proyecto runnable con npm install + npm run dev.
- content.json generado desde PDF.
- Navegacion y comportamiento funcional equivalentes al engine base.
- Checklist de validacion funcional pasado.
```

## 10) Plan de validacion (obligatorio ejecutar)

### 10.1 Checklist funcional
- [ ] Carga correcta de `public/content/content.json`.
- [ ] Navegacion por teclado completa.
- [ ] Navegacion por botones completa.
- [ ] Builds avanzan/retroceden correctamente.
- [ ] Overview abre, lista slides y permite saltar a una slide.
- [ ] Speaker notes muestran contenido por slide.
- [ ] Fullscreen funciona con toggle.
- [ ] Export PDF genera todas las paginas en 1920x1080.
- [ ] Fondo 3D se renderiza y responde al slide index.
- [ ] Transiciones entre slides se mantienen fluidas.

### 10.2 Casos borde
- [ ] Slide sin `speakerNotes` (mostrar fallback).
- [ ] Slide sin `builds` (navegacion normal).
- [ ] `builds` vacio.
- [ ] `icon` invalido/no existente (no crashea).
- [ ] `bentoItems` o `items` con texto largo (sin romper layout gravemente).
- [ ] `slide.type` no soportado (fallback renderer).

### 10.3 Criterio de aceptacion
Se acepta solo si:
- El comportamiento es funcionalmente equivalente al proyecto base.
- El contenido y estilo pueden variar sin romper el engine.
- El pipeline PDF -> `content.json` es reproducible.

## 11) Supuestos y defaults
- Proyecto destino: SPA estatica (sin SSR).
- Fuente de contenido: PDF.
- Salida obligatoria de contenido: `public/content/content.json`.
- La IA implementadora debe seguir esta especificacion sin redefinir arquitectura.
