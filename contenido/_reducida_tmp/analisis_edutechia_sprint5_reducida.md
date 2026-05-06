# Análisis de la presentación reducida - eduTechIA / Sprint 5

**Fuente analizada:** `PROPUESTA FINAL Reto IA de Personalización Educativa Sprint 5.pdf`  
**Versión:** presentación reducida de 23 diapositivas  
**Objetivo del análisis:** revisar contenido, narrativa, diseño, consistencia, cobertura del reto y posibles mejoras para una presentación final más clara, memorable y defendible.

---

## 1. Lectura general

La versión reducida mejora claramente en foco y ritmo respecto de una presentación más extensa. Ahora el relato se concentra en cinco grandes bloques:

1. **Problema y reto:** aula con muchos alumnos, poco tiempo docente y necesidad de adaptación.
2. **Solución propuesta:** eduTechIA como asistente/c copiloto pedagógico para generar actividades adaptadas.
3. **Valor de IA y PoC:** qué aporta la IA, benchmark, North Star, arquitectura funcional/técnica y demo.
4. **Viabilidad, métricas y seguridad:** validación, diferencial, marco regulatorio y guardarraíles.
5. **Escalado y negocio:** equipo, stack, horizontes, pricing, inversión y cierre.

La historia es más lineal y defendible: **problema → solución → validación → control/seguridad → escalabilidad**. El principal riesgo de esta reducción es que se eliminaron varias diapositivas que antes daban más respaldo al problema, al alcance de la PoC y al protocolo de riesgos. Eso hace que la presentación sea más ágil, pero también más vulnerable si el jurado pregunta “¿cómo saben que este problema es real?”, “¿qué entra y qué no entra en la PoC?” o “¿qué pasa si la IA falla?”.

---

## 2. Diagnóstico ejecutivo

### Lo que funciona muy bien

- **La propuesta queda más clara:** eduTechIA no intenta ser una plataforma educativa completa, sino una herramienta concreta para ayudar al docente a adaptar actividades de matemáticas.
- **La reducción mejora el ritmo:** se eliminaron duplicidades y la presentación va más rápido al producto, a la demo y al plan de escalado.
- **El principio de control humano aparece varias veces:** esto es clave porque trabajan con IA, educación y menores.
- **El diferencial está bien resumido:** no solo genera ejercicios; adapta según criterios pedagógicos como nivel, ritmo, carga cognitiva, pasos guiados y refuerzo positivo.
- **La PoC queda conectada con una evolución producto:** se distingue entre lo validado ahora y lo que vendría después.

### Lo que quedó débil por la reducción

- **Falta una slide fuerte de evidencia del problema.** La versión reducida pasa de “30 alumnos, 1 docente” directamente al reto. Funciona emocionalmente, pero queda algo liviano si necesitan justificar la oportunidad con datos.
- **El alcance de la PoC quedó menos explícito.** Antes había una slide de “dentro/fuera del alcance”; ahora parte de esa claridad queda dispersa.
- **La regulación está, pero comprimida.** La slide regulatoria es potente, aunque densa y con texto pequeño.
- **El riesgo operativo quedó menos accionable.** Hay guardarraíles, pero se perdió el protocolo de respuesta por niveles crítico/alto/medio.
- **La parte financiera tiene una inconsistencia potencial:** en “Los 3 Horizontes” se indica Año 3 con 1,81M€ ingresos y +361k€ EBITDA, margen 20%. Ese margen cuadra aproximadamente, pero en versiones previas aparecía 1,45M€. Conviene verificar que todos los números de ingresos, costes, EBITDA e inversión estén alineados con la tabla financiera.

---

## 3. Recomendación global de narrativa

La estructura actual debería presentarse así:

> “No venimos a vender una IA que reemplaza al docente. Venimos a resolver una fricción muy concreta: preparar actividades adaptadas lleva demasiado tiempo. eduTechIA genera una primera versión de actividad de matemáticas adaptada a un perfil pedagógico, pero el docente siempre revisa y decide. La PoC valida si esto ahorra tiempo, mantiene calidad pedagógica y no aumenta carga de trabajo. Y, si funciona, el producto escala con trazabilidad, seguridad, métricas y cumplimiento regulatorio.”

Esta frase debería funcionar como brújula de todo el deck. Si una diapositiva no ayuda a sostener esa idea, debería simplificarse o integrarse con otra.

---

## 4. Análisis slide por slide

---

## Slide 1 - Portada

### Contenido textual

- Personalización Educativa con IA
- eduTechIA
- Para ver la presentación live ingresa en: https://syagas-oss.github.io/edutechia-ppt/

### Función narrativa

Presenta el proyecto y deja un enlace a la versión live. Es una portada simple, correcta y directa.

### Diseño observado

La portada mantiene una estética educativa, colorida y amigable. El texto principal funciona como título institucional del proyecto. La presencia del enlace live suma valor práctico, especialmente si quieren mostrar una versión interactiva o una demo.

### Riesgos / mejoras

- El link live en portada puede ser útil, pero también puede distraer si el jurado no debe abrir nada durante la exposición.
- Conviene usarlo como recurso secundario: “queda disponible para consulta” y no como parte necesaria del speech.
- Si la presentación se proyecta, el enlace debería verse con suficiente contraste y tamaño.

### Recomendación concreta

Agregar una línea de posicionamiento debajo de “eduTechIA”:

> Copiloto pedagógico para generar actividades de matemáticas adaptadas, con revisión docente obligatoria.

Esto ayuda a que desde la primera slide se entienda qué es el producto.

---

## Slide 2 - Problema en el aula

### Contenido textual

- 30 alumnos
- 1 docente
- múltiples necesidades
- poco tiempo de adaptación

### Elementos visuales

- Fondo cálido amarillo/naranja.
- Texto grande azul a la izquierda.
- Ilustración de aula digital a la derecha, con alumnos usando tablets y una pantalla con información.
- Formas orgánicas decorativas en naranja y verde.

### Función narrativa

Es una slide de impacto emocional. Resume la tensión principal: mucha diversidad en el aula y poco tiempo para adaptar.

### Lo que funciona

- Es memorable por su simplicidad.
- La imagen comunica educación, tecnología y aula diversa.
- El ritmo de cuatro frases cortas funciona muy bien para abrir el problema.

### Riesgos / mejoras

- La frase se repite en el texto extraído, pero visualmente aparece una sola vez. Revisar que no haya duplicación oculta en la PPT.
- Falta una conexión explícita con “matemáticas” y “dificultades de atención”.
- La slide es fuerte emocionalmente, pero no tiene evidencia. Si no hay otra slide de datos, el problema puede quedar demasiado intuitivo.

### Recomendación concreta

Mantenerla, pero al presentarla sumar una frase oral:

> El reto no es que el docente no sepa adaptar; el reto es que no tiene tiempo material para hacerlo bien para todos.

---

## Slide 3 - Reto seleccionado

### Contenido textual

**Título:** Reto Seleccionado

**Cuerpo:**

Los docentes necesitan adaptar actividades a distintos ritmos, niveles y perfiles de atención, pero preparar materiales personalizados sigue siendo un proceso manual, lento y difícil de escalar.

**Abordaje preliminar:** Crear un copiloto pedagógico con IA que ayude al docente a generar actividades adaptadas, revisarlas y decidir si están listas para usar en clase.

**Público objetivo:** alumnos con dificultades de atención.

**Etiquetas visuales:**

- Docentes de primaria
- Asignatura: Matemáticas
- alumnos con dificultades de atención
- Comunidad de Madrid
- 3º y 4º de primaria (8-10 años)

### Elementos visuales

- Imagen vertical a la izquierda con dos docentes/personas en entorno educativo.
- Gran título en violeta/azul.
- Caja central lila con borde redondeado.
- Bloque “Público Objetivo” en verde en la parte inferior izquierda.
- Chips naranjas con etiquetas de segmentación.
- Formas decorativas orgánicas y líneas finas.

### Función narrativa

Define con claridad qué reto abordan, a quién y en qué contexto educativo inicial.

### Lo que funciona

- La segmentación es mucho más concreta que decir solo “educación”.
- Matemáticas + primaria + Madrid + dificultades de atención acota bien la PoC.
- El concepto de “copiloto pedagógico” es adecuado porque no reemplaza al docente.

### Riesgos / mejoras

- “Alumnos con dificultades de atención” puede interpretarse como una categoría clínica. Más adelante se aclara que no usan diagnósticos, pero acá conviene cuidar el lenguaje.
- El bloque de público objetivo está visualmente algo cargado por los chips pequeños.
- El “abordaje preliminar” podría decir “solución propuesta” si ya están presentando una propuesta final.

### Recomendación concreta

Cambiar “alumnos con dificultades de atención” por:

> alumnos que necesitan actividades más breves, guiadas y con menor carga cognitiva

Y, si necesitan mantener el concepto original, decirlo oralmente sin convertirlo en etiqueta fija.

---

## Slide 4 - ¿Qué propone eduTechIA?

### Contenido textual

**Título:** ¿Qué propone eduTechIA?

EduTechIA es un asistente de IA que ayuda a docentes a generar actividades de matemáticas adaptadas a perfiles de atención, nivel y ritmo de aprendizaje.

- Ejercicios cortos y enfocados en un solo objetivo.
- Pasos guiados que reducen la carga cognitiva.
- Sugerencia de feedback con refuerzo positivo para que el docente lo revise antes de usarlo.
- Busca mejorar la adecuación pedagógica de la actividad.
- Busca reducir el tiempo de preparación sin quitar control pedagógico al docente.

**Frase de cierre:**

La IA trabaja como apoyo, permitiendo que el docente mantenga siempre el control pedagógico.

### Elementos visuales

- Fondo naranja/amarillo.
- Tarjeta blanca grande con borde negro redondeado.
- Título en una etiqueta inclinada color lila con borde negro.
- Ilustración circular superior derecha de niño con robot y números.
- Elementos decorativos tipo rayos y líneas.

### Función narrativa

Explica el producto en términos funcionales y pedagógicos.

### Lo que funciona

- Es una de las slides más importantes porque traduce el reto en solución.
- La frase final de control pedagógico es excelente y debería repetirse oralmente.
- Los bullets son concretos y entendibles.

### Riesgos / mejoras

- Hay demasiados bullets para una slide que debería ser demo-oriented.
- “Busca mejorar” aparece dos veces y suena menos contundente que “mejora” o “ayuda a mejorar”.
- Podría conectar mejor con el input/output: qué mete el docente y qué recibe.

### Recomendación concreta

Convertir la explicación en fórmula simple:

> Input docente: curso + tema + duración + perfil pedagógico.  
> Output eduTechIA: actividad breve + pasos guiados + adaptación + feedback revisable.

Esto haría la slide más concreta y más fácil de recordar.

---

## Slide 5 - Beneficios esperados

### Contenido textual

**Título:** Beneficios Esperados

1. **Ahorro de tiempo docente**  
   El docente puede generar una primera versión de actividad adaptada en minutos, en lugar de partir de cero.

2. **Mejor adaptación pedagógica**  
   La solución podrá ajustar actividades según nivel, ritmo, perfil de atención, historial y respuesta del alumno.

3. **Escalabilidad Educativa**  
   El centro podrá ofrecer materiales más adaptados sin exigir al docente rediseñar manualmente cada actividad.

### Elementos visuales

- Estructura en tres franjas horizontales a la derecha.
- Numeración vertical en círculos verde lima.
- Imagen de estudiantes usando ordenadores en la parte inferior izquierda.
- Título grande azul/violeta.
- Acentos naranjas decorativos.

### Función narrativa

Resume el valor esperado desde la perspectiva del docente y del centro educativo.

### Lo que funciona

- Los tres beneficios están bien jerarquizados: tiempo, calidad/adaptación, escalabilidad.
- La estructura visual de timeline vertical es clara.

### Riesgos / mejoras

- “La solución podrá ajustar” suena a promesa futura; en una PoC conviene separar lo que ya hace de lo que hará.
- El segundo beneficio menciona “historial y respuesta del alumno”, pero más adelante se aclara que eso es fase futura. Puede generar una expectativa incorrecta.

### Recomendación concreta

Reformular el beneficio 2 así:

> En la PoC, adapta según nivel, ritmo y perfil pedagógico indicado por el docente. En fases futuras, incorporará historial y respuesta del alumno.

Así evitan parecer que la PoC ya hace seguimiento longitudinal.

---

## Slide 6 - ¿Qué valor REAL aporta la IA?

### Contenido textual

**Título:** ¿Qué valor REAL aporta la IA?

**Generación pedagógica asistida**  
Produce actividades, pasos guiados, adaptaciones y sugerencias de feedback para que el docente revise y apruebe.

**Perfilado pedagógico flexible**  
Permite interpretar contexto docente, nivel, dificultad e intereses para adaptar la actividad sin usar etiquetas clínicas.

**Recomendación progresiva de contenido**  
En la PoC sugiere actividad y feedback. En fases futuras podrá recomendar el siguiente paso combinando rendimiento, dificultad y progreso.

### Elementos visuales

- Fondo blanco con formas decorativas suaves en amarillo, verde, azul y naranja.
- Tres columnas con título, imagen y descripción.
- Imágenes educativas: estudiantes/personas, aula colaborativa y docente con panel digital.
- Título negro grande con énfasis en “REAL”.

### Función narrativa

Justifica por qué el uso de IA no es cosmético. Explica el valor diferencial de la inteligencia artificial dentro del flujo.

### Lo que funciona

- Excelente pregunta: obliga a justificar el rol real de la IA.
- Los tres ejes están bien elegidos: generación, interpretación pedagógica y recomendación futura.
- La aclaración “sin usar etiquetas clínicas” es muy importante.

### Riesgos / mejoras

- La tercera columna mezcla PoC y futuro, pero lo hace bien. Aun así, conviene marcar visualmente “PoC actual” vs “futuro”.
- “Perfilado pedagógico flexible” puede sonar abstracto. Conviene dar un ejemplo en el speech.

### Recomendación concreta

Ejemplo oral recomendado:

> No le decimos a la herramienta “este alumno tiene X diagnóstico”. Le decimos “necesita pasos cortos, apoyo visual y refuerzo positivo”. Ese cambio de enfoque es clave para reducir riesgo y aumentar utilidad pedagógica.

---

## Slide 7 - Comparativa de Benchmark

### Contenido textual

Analizamos soluciones de IA educativa según dos criterios:

- **Facilidad de uso para el docente:** Qué tan rápido puede convertir una necesidad de aula en una actividad concreta.
- **Nivel de personalización pedagógico:** Qué tan bien permite adaptar la actividad a nivel, ritmo, perfil de atención y contexto del alumno.
- **Opportunity Space:** soluciones simples para el docente, pero con mayor adaptación pedagógica y control humano.

**Texto inferior:**

eduTechIA se posiciona como una solución enfocada en el docente: no busca sustituir plataformas educativas completas, sino acelerar la preparación de actividades adaptadas.

**Ejes del gráfico:**

- Facilidad de uso para el docente
- Nivel de personalización del aprendizaje

**Soluciones visibles:**

- eduTechIA
- Khanmigo
- SchoolAI
- Pearson
- Squirrel AI Learning
- MagicSchool
- Ignite Copilot
- Moodle
- EducaMadrid

### Elementos visuales

- A la izquierda, caja lila con borde negro y etiqueta verde inclinada.
- A la derecha, matriz 2x2 dibujada con estilo manual.
- eduTechIA aparece en el cuadrante superior derecho como Opportunity Space.
- Logos de competidores distribuidos en distintos niveles.
- Estética informal, educativa y tipo sketch.

### Función narrativa

Ubica eduTechIA en el mercado y explica que el diferencial está en combinar facilidad docente, personalización y control humano.

### Lo que funciona

- La matriz es fácil de explicar.
- El posicionamiento evita competir frontalmente con LMS completos.
- La frase inferior es muy buena y debería decirse de forma clara.

### Riesgos / mejoras

- Puede ser cuestionada si no se explica con qué evidencia ubicaron cada competidor.
- Algunas marcas son muy distintas entre sí: LMS, copilotos, plataformas adaptativas y soluciones institucionales. Conviene aclarar que es un benchmark conceptual, no una comparación funcional exhaustiva.
- “Nivel de personalización del aprendizaje” podría confundirse con personalización automática del alumno; en eduTechIA la personalización inicial depende del input docente.

### Recomendación concreta

Agregar una nota pequeña:

> Benchmark cualitativo basado en propuesta funcional, foco de usuario y grado de adaptación pedagógica declarada.

---

## Slide 8 - North Star: Nuestra Visión

### Contenido textual

**Título:** North Star: Nuestra Visión

Reducir el tiempo que necesita un docente para preparar actividades adaptadas, manteniendo calidad pedagógica, control humano y seguridad en el uso de IA.

**KPI 1:** Tiempo medio para generar y revisar una actividad adaptada.

**KPI 2:** Calidad pedagógica percibida por el docente: claridad, nivel, pasos guiados y adecuación al perfil.

**KPI 3:** Satisfacción docente y percepción de control sobre la actividad generada.

### Elementos visuales

- Fondo verde lima.
- Imagen a la izquierda de niños mirando hacia arriba con luz intensa, asociada a visión/futuro.
- Título negro grande.
- Caja blanca con texto central.
- Tres KPIs en la parte inferior derecha.
- Formas naranjas decorativas.

### Función narrativa

Define la métrica guía y alinea la PoC con resultados medibles.

### Lo que funciona

- La North Star está bien formulada: tiempo + calidad + control + seguridad.
- Los KPIs son coherentes con la hipótesis de validación.

### Riesgos / mejoras

- KPI 2 y KPI 3 son perceptivos. Está bien para PoC, pero conviene reconocer que luego deberían complementarse con métricas de uso y calidad más objetivas.
- “North Star” puede sonar startup; si el público es académico, explicar brevemente que es la métrica guía.

### Recomendación concreta

Decir oralmente:

> No medimos solo si la IA genera algo. Medimos si el docente ahorra tiempo, si lo generado tiene calidad pedagógica y si siente que conserva el control.

---

## Slide 9 - Arquitectura funcional objetivo

### Contenido textual

**Título:** Arquitectura funcional objetivo

1) **Docente:** Define necesidad pedagógica, tema, nivel y perfil.

2) **Motor de adaptación IA:** Interpreta la necesidad docente y aplica criterios pedagógicos.

3) **Generación IA:** Crea actividad, pasos guiados, adaptaciones y sugerencia de feedback.

4) **Alumno:** En fase futura, realiza la actividad dentro de la herramienta.

5) **Análisis de respuesta:** En fase futura, analiza aciertos, errores y dificultades.

6) **Nueva recomendación:** Sugiere repetir, simplificar o avanzar según progreso.

7) **Docente valida:** La decisión final sigue siendo humana.

**Nota inferior:**

La PoC actual valida los pasos 1, 2, 3 y 7. Los pasos 4, 5 y 6 pertenecen a la evolución del producto.

### Elementos visuales

- Flujo horizontal de izquierda a derecha con iconos/personas/IA.
- Flechas que conectan docente → motor IA → generación → alumno → validación.
- Elementos de fase futura con ramificaciones hacia análisis y recomendación.
- Título en etiqueta verde lima inclinada con texto naranja.
- Fondo claro con formas decorativas.

### Función narrativa

Explica el funcionamiento objetivo y separa muy bien PoC actual de evolución futura.

### Lo que funciona

- La nota inferior es clave y debería mantenerse sí o sí.
- El flujo deja claro que el docente abre y cierra el proceso.
- Visualmente se entiende que hay un loop futuro de aprendizaje y recomendación.

### Riesgos / mejoras

- La slide tiene muchos elementos pequeños. En proyección puede costar leer descripciones.
- Falta resaltar más visualmente qué pasos son PoC y qué pasos son futuro.

### Recomendación concreta

Usar color para fases:

- Verde: PoC actual, pasos 1, 2, 3 y 7.
- Gris o punteado: evolución futura, pasos 4, 5 y 6.

Esto reduce el riesgo de confusión.

---

## Slide 10 - Arquitectura tecnológica: PoC actual y escalado

### Contenido textual

**Título:** Arquitectura tecnológica: PoC actual y escalado

**Para fases posteriores:** ElevenLabs (accesibilidad auditiva) y Pinecone (búsqueda semántica) se incorporan cuando el flujo base esté validado.

**Capa 1 - Frontend React**  
Interfaz docente para introducir necesidad pedagógica, visualizar actividad generada, revisar resultados y acceder al laboratorio de análisis.

**Capa 2 - Orquestación n8n**  
Recibe el input docente, valida la solicitud, construye prompts, llama al proveedor IA, normaliza la respuesta y gestiona fallback si la salida no es válida.

**Capa 3 - Motor IA + lógica pedagógica**  
Genera actividades, adaptaciones, explicaciones, sugerencias de feedback y criterios de revisión docente. En fases futuras incorporará seguimiento de progreso y recomendación dinámica.

**Proveedor IA vía n8n:**  
OpenRouter / modelo compatible / fallback controlado.

**Capa 4 - Datos y trazabilidad**  
PoC actual: persistencia local de sesión e historial. Escalado: Supabase para perfiles, actividades, trazabilidad, métricas, auditoría y seguimiento.

### Función narrativa

Explica cómo está construida la PoC y hacia dónde puede evolucionar técnicamente.

### Lo que funciona

- La separación en capas está bien planteada.
- n8n aparece como orquestador, no como producto final rígido.
- Supabase queda para escalado, trazabilidad y métricas, lo cual es coherente.

### Riesgos / mejoras

- Hay mucho texto técnico y puede resultar denso.
- “Laboratorio de análisis” aparece sin haber sido explicado antes; puede generar dudas.
- ElevenLabs está escrito en el PDF como “EleventLabs”. Conviene corregir a “ElevenLabs” si se refieren a la herramienta real.
- Pinecone y ElevenLabs pueden sonar agregados decorativos si no explican por qué son fase posterior.

### Recomendación concreta

Reducir esta slide a una arquitectura de 4 bloques:

> React → n8n → IA/modelo → datos/trazabilidad

Y dejar ElevenLabs/Pinecone como nota pequeña de evolución, no como elemento protagonista.

---

## Slide 11 - PoC Demo

### Contenido textual

- Link POC
- POC DEMO

### Elementos visuales

- Fondo negro.
- Formas grandes decorativas en celeste, verde lima y naranja.
- Etiqueta inclinada verde con texto naranja “POC DEMO”.
- Captura central oscura del frontend eduTechIA.
- Botón lateral “Link POC”.
- En la captura se ve la pregunta “¿Qué vamos a enseñar hoy?” y un selector de opciones/inputs.

### Función narrativa

Marca el momento de demostración del prototipo.

### Lo que funciona

- Es visualmente distinta del resto, por lo que señala bien el cambio de modo: de explicación a demo.
- La captura ayuda a entender que existe una interfaz real.

### Riesgos / mejoras

- Si el link no es clicable o no se abre en presentación, puede quedar débil.
- La captura está bastante oscura; en proyector podría costar ver detalles.
- Sería útil incluir una frase de demo: “Input docente → actividad adaptada generada”.

### Recomendación concreta

Añadir una mini-secuencia en la misma slide:

> 1. El docente define tema y perfil.  
> 2. eduTechIA genera actividad.  
> 3. El docente revisa y decide.

Esto ayuda si la demo falla o si el tiempo aprieta.

---

## Slide 12 - Viabilidad de la solución

### Contenido textual

**Título:** Viabilidad de la solución

La viabilidad de eduTechIA se apoya en tres decisiones de diseño que permiten empezar con una PoC controlada y evolucionar hacia un producto escalable:

- **IA como apoyo, no sustitución**  
  La IA acelera la preparación de actividades, pero no reemplaza el criterio pedagógico.

- **Supervisión humana**  
  El docente revisa y decide antes de que cualquier actividad se use con alumnado.

- **PoC con datos ficticios o anonimizados**  
  La validación inicial evita datos reales de menores y reduce riesgos legales y éticos.

### Elementos visuales

- Fondo lila claro.
- Imagen vertical a la izquierda de una docente con robot en entorno escolar.
- Tarjeta blanca a la derecha con borde redondeado y sombra.
- Título dentro de etiqueta verde inclinada con texto naranja.
- Formas decorativas grandes en naranja, amarillo y verde.

### Función narrativa

Defiende que la solución puede probarse sin exponerse a riesgos excesivos.

### Lo que funciona

- Los tres argumentos son muy sólidos para una PoC educativa con IA.
- Refuerza la idea de control humano.
- Buen puente entre demo y métricas.

### Riesgos / mejoras

- Podría confundirse “viabilidad” con “factibilidad técnica”, cuando la slide habla más de viabilidad ética/operativa.
- Falta mencionar coste o complejidad técnica mínima para PoC.

### Recomendación concreta

Cambiar el título o subtítulo a:

> Viabilidad operativa y ética de la PoC

Así queda más preciso.

---

## Slide 13 - Métricas para validar PoC y piloto

### Contenido textual

**Título:** Métricas para validar PoC y piloto

**Calidad Pedagógica**  
Evaluación del docente en 4 criterios: claridad, nivel, estructura paso a paso y adecuación al perfil.  
Meta: >= 3,5 sobre 5.

**Tiempo del docente**  
Flujo completo: introducir necesidad + generar actividad + revisar + decidir uso.  
Meta: <= 5' por ejercicio.

**Satisfacción docente**  
Encuesta al final de cada sesión: satisfacción general, percepción de ahorro de tiempo y control pedagógico.  
Meta: >= 4 sobre 5.

**Hipótesis central que validamos**

¿Puede la IA ayudar al docente de primaria a generar ejercicios de matemáticas adaptados a alumnos con dificultades de atención, de forma más rápida y con calidad suficiente, sin aumentar su carga de trabajo?

**Criterios de parada inmediata**

- Errores graves en más del 30% de actividades.
- Tiempo medio superior a 10 minutos.
- Entrada de datos reales no autorizados.
- Fallo de seguridad o acceso indebido a perfiles.

### Función narrativa

Es una slide central porque transforma la propuesta en una validación medible.

### Lo que funciona

- Métricas claras, simples y defendibles.
- Los criterios de parada inmediata muestran madurez y responsabilidad.
- La hipótesis está bien redactada y conecta con el reto.

### Riesgos / mejoras

- “Alumnos con dificultades de atención” vuelve a aparecer. Conviene mantener lenguaje pedagógico no clínico.
- >= 3,5 en calidad puede parecer bajo. Si lo justifican como umbral mínimo para PoC, está bien; si no, puede sonar poco ambicioso.
- “Errores graves” debería definirse con ejemplos.

### Recomendación concreta

Cambiar la meta de calidad a una fórmula más defendible:

> >= 3,5/5 como umbral mínimo de continuidad; objetivo deseado >= 4/5.

Y definir “error grave”:

> contenido incorrecto, inadecuado para edad/nivel, instrucciones confusas o propuesta no alineada con el perfil pedagógico.

---

## Slide 14 - Diferencial clave de eduTechIA

### Contenido textual

**Título:** Diferencial clave de eduTechIA

No solo genera ejercicios: adapta la actividad a criterios pedagógicos concretos, como nivel, ritmo, carga cognitiva, necesidad de pasos guiados y refuerzo positivo.

### Elementos visuales

- Fondo verde lima.
- Imagen a la izquierda de niños en aula con portátil y un icono de bombilla sobre una estudiante.
- Título grande negro a la derecha.
- Caja blanca inferior derecha con borde negro y texto explicativo.
- Divisor vertical fino entre imagen y contenido.
- Formas decorativas naranjas.

### Función narrativa

Sintetiza el posicionamiento diferencial de la solución.

### Lo que funciona

- Es una frase potente y entendible.
- Resume todo el producto en una sola idea.
- Visualmente tiene buen impacto.

### Riesgos / mejoras

- Esta slide debería ser más memorable aún, porque es casi el “claim” del proyecto.
- Podría incluir una comparación breve: “generador genérico” vs “adaptador pedagógico”.

### Recomendación concreta

Agregar una línea visual tipo contraste:

> No es: “dame 10 ejercicios”.  
> Es: “dame una actividad adecuada para este grupo, con estos apoyos y este objetivo”.

---

## Slide 15 - Marco regulatorio

### Contenido textual

**Título:** Marco regulatorio

eduTechIA opera en uno de los entornos más regulados de la UE.

| Normativa | Impacto | Plazo crítico | Aplicación en PoC |
|---|---:|---|---|
| AI Act (UE) 2024/1689 | MUY ALTO | Agosto 2026 | Potencial encaje como sistema de alto riesgo si influye en evaluación, trayectoria educativa o decisiones sobre alumnado. La PoC evita decisión automática y usa perfiles ficticios. |
| RGPD (UE) 2016/679 | MUY ALTO | Ya vigente | PoC con perfiles ficticios: minimiza riesgos de protección de datos. Piloto real: requiere análisis de base legal, minimización, información a familias/centro y evaluación de impacto si aplica. |
| LOPDGDD 3/2018 | ALTO | Ya vigente | En uso real con menores: revisar base jurídica, información a familias, rol del centro educativo y participación del DPD si corresponde. |
| LOE 2/2006 | MEDIO | Ya vigente | Marco educativo relevante para justificar finalidad pedagógica, siempre sujeto a protección de datos y normativa del centro. |
| Normativa CM Educación | MEDIO | Antes del piloto | Notificar al orientador del centro antes de cualquier piloto real. |

**Decisión de diseño crítica:**

El sistema no almacena diagnósticos clínicos. Trabaja con perfiles pedagógicos definidos por el docente, como “necesita pasos cortos”, “requiere apoyo visual” o “se beneficia de refuerzo positivo”. Esto reduce el riesgo de tratar datos especialmente sensibles.

### Función narrativa

Demuestra conocimiento del contexto legal y justifica decisiones de diseño para reducir riesgo.

### Lo que funciona

- Muy buena slide para jurado: muestra seriedad y madurez.
- La decisión de no almacenar diagnósticos clínicos es crítica y debería destacarse más.
- Conecta directamente con IA, menores y educación.

### Riesgos / mejoras

- Está demasiado densa para leer en pantalla.
- Algunos puntos son jurídicamente delicados y pueden abrir preguntas. Por ejemplo, “notificar al orientador” puede ser insuficiente según el tipo de piloto real; probablemente también haría falta dirección del centro, DPD/responsable de protección de datos y consentimiento/información según el caso.
- “AI Act alto riesgo” debe explicarse con cuidado: depende de si el sistema se usa para evaluar, decidir acceso, progreso o trayectoria educativa.

### Recomendación concreta

Visualmente, convertir la tabla en tres bloques:

1. **IA educativa:** AI Act.
2. **Datos personales y menores:** RGPD + LOPDGDD.
3. **Contexto escolar:** LOE + normativa Comunidad de Madrid.

Y destacar en grande:

> Decisión clave: perfiles pedagógicos, no diagnósticos clínicos.

---

## Slide 16 - Los 6 Guardarraíles

### Contenido textual

**Título:** Los 6 Guardarraíles

Protecciones activas del sistema eduTechIA para garantizar uso ético y seguro de la IA educativa.

1. **Supervisión Humana**  
   En la PoC, el docente revisa antes de usar. En producto, aprobación activa obligatoria antes de enviar al alumno.

2. **Anonimización estructural**  
   PoC con perfiles ficticios. En piloto, uso de identificadores y minimización de datos personales.

3. **Sin diagnósticos médicos**  
   Solo perfiles pedagógicos, nunca etiquetas clínicas. Elimina datos de categoría especial.

4. **Control de calidad**  
   Si más del 30% de actividades son rechazadas, se revisa prompt, criterios pedagógicos y proveedor IA.

5. **Transparencia ante familias**  
   Todo ejercicio llevará: “Generado con IA, revisado por docente”.

6. **Sin etiquetado permanente**  
   Los perfiles deberán revisarse periódicamente y no convertirse en etiquetas fijas del alumno.

### Función narrativa

Explica cómo se controlan los riesgos principales.

### Lo que funciona

- Es una slide muy necesaria.
- Los seis guardarraíles cubren bien riesgos humanos, pedagógicos, legales y técnicos.
- La frase “Generado con IA, revisado por docente” es simple y potente.

### Riesgos / mejoras

- “Elimina datos de categoría especial” puede ser demasiado absoluto. Mejor decir “reduce el riesgo de tratar datos de categoría especial”, porque depende de cómo se use el sistema en un piloto real.
- “Si más del 30% de actividades son rechazadas” está bien, pero también debería haber parada inmediata para errores graves aunque sean menos del 30%.

### Recomendación concreta

Cambiar:

> Elimina datos de categoría especial.

Por:

> Reduce el riesgo de tratar datos especialmente sensibles.

Y agregar en control de calidad:

> Ante errores graves, pausa inmediata aunque no se alcance el 30%.

---

## Slide 17 - Equipo y Stack Tecnológico

### Contenido textual

**Título:** Equipo y Stack Tecnológico

**Crecimiento Equipo**

- Año 1: 6 FTE
- Año 2: 9 FTE
- Año 3: 14 FTE

**Stack Tecnológico**

- Año 1: n8n + Supabase + React + OpenRouter
- Año 2: Azure OpenAI + Kubernetes
- Año 3: Modelo IA propio fine-tuned

**Roles Clave**

- CTO+Dev
- CEO/Comercial
- Pedagogo
- Customer Success
- Data Scientist
- DPO

**Evolución Tech**

- Año 1: Producto certificado RGPD + AI Act
- Año 2: ENS Alto → acceso sector público
- Año 3: APIs LMS + integración Google Classroom

También aparece la etiqueta “roadmap”.

### Función narrativa

Resume la capacidad organizativa y tecnológica necesaria para escalar.

### Lo que funciona

- Presenta roles clave y roadmap técnico en una sola slide.
- Introduce DPO, lo cual es coherente con educación y menores.
- ENS Alto y APIs LMS ayudan a pensar en sector público e integración.

### Riesgos / mejoras

- “Producto certificado RGPD + AI Act” suena técnicamente impreciso. RGPD no funciona como una certificación simple de producto en sentido general. Conviene decir “producto diseñado para cumplimiento RGPD y AI Act” o “evaluación de cumplimiento”.
- “Modelo IA propio fine-tuned” en Año 3 puede sonar caro y ambicioso. Hay que justificarlo por volumen, control, privacidad o coste.
- Kubernetes en Año 2 puede parecer sobredimensionado si no se explica por escalabilidad, resiliencia o clientes institucionales.

### Recomendación concreta

Cambiar:

> Producto certificado RGPD + AI Act

Por:

> Producto con evaluación de cumplimiento RGPD + AI Act y documentación de riesgos.

Esto evita una afirmación difícil de defender.

---

## Slide 18 - Equipo

### Contenido textual visible

**Título:** Equipo

La slide muestra una planificación por semestres y roles. En la tabla se observan columnas temporales:

- H1 Y1
- H2 Y1
- H1 Y2
- H2 Y2
- H1 Y3
- H2 Y3

Roles visibles:

- CTO / Arquitecto
- Dev Frontend
- Dev Backend / IA
- Pedagogo (SME)
- CEO - Comercial
- Director Comercial
- Customer Success (x4)
- Resp. Partnerships
- Data Scientist / ML
- DPO in-house

Total FTE visible por periodo:

- 5
- 6
- 8
- 9
- 12
- 14

### Elementos visuales

- Fondo beige/rosado.
- Etiqueta amarilla superior izquierda “Equipo”.
- Tabla tipo Gantt con barras horizontales naranjas.
- Formas decorativas verdes en laterales y líneas naranjas inferiores.

### Función narrativa

Profundiza el plan de crecimiento del equipo.

### Lo que funciona

- La tabla Gantt da sensación de planificación real.
- Permite justificar la evolución de costes y capacidad.
- Refuerza que no es solo una idea de producto, sino un plan operativo.

### Riesgos / mejoras

- Hay una pequeña inconsistencia con la slide anterior: slide 17 dice Año 1: 6 FTE, pero la tabla muestra 5 en H1 Y1 y 6 en H2 Y1. No es grave, pero conviene explicar que Año 1 cierra con 6 FTE o que el promedio es distinto.
- La lectura de la tabla puede ser difícil en proyección.
- Customer Success aparece como x4, pero no queda claro en qué año se activa.

### Recomendación concreta

En el speech, decir:

> Empezamos con un equipo mínimo de producto, tecnología, pedagogía y comercial; y escalamos Customer Success, partnerships, data y DPO a medida que crecen pilotos y exigencias regulatorias.

---

## Slide 19 - Stack Tecnológico

### Contenido textual visible

**Título:** Stack Tecnológico

La slide muestra una hoja de ruta técnica por semestres:

Columnas:

- H1 Y1
- H2 Y1
- H1 Y2
- H2 Y2
- H1 Y3
- H2 Y3

Elementos del stack visibles:

- React + Vite + Tailwind
- n8n Cloud / self-hosted
- OpenAI 2.5 / OpenRouter
- Supabase Pro
- SOC Educación
- Azure OpenAI
- Infra self-hosted local
- Postgres on Azure
- Cloudflare WAF + Datadog
- Inferencia regional
- Modelo IA fine-tuned
- Multi-idioma

Leyenda:

- En producción
- En expansión / fallback

Bloque inferior de evolución por fases:

- MVP / POC
- ENS Medio en colegios
- IA Act / ENS Alto en colegios
- LatAm compliance / APIs colegios

### Elementos visuales

- Fondo beige/rosado.
- Etiqueta amarilla superior izquierda “Stack Tecnológico”.
- Tabla Gantt con barras verdes, algunas sólidas y otras tramadas.
- Formas decorativas verdes en laterales.

### Función narrativa

Detalla el camino técnico de la PoC al producto escalado.

### Lo que funciona

- Muestra una evolución progresiva, no un salto mágico.
- Diferencia entre producción y expansión/fallback.
- Incluye seguridad, observabilidad, infraestructura y compliance.

### Riesgos / mejoras

- Algunos términos son confusos o posiblemente incorrectos:
  - “OpenAI 2.5 / OpenRouter” debería revisarse. Puede que quisieran decir “OpenRouter / modelo compatible” o “GPT-4.1/4o/5.x según disponibilidad”.
  - “SOC Educación” no queda claro: ¿Security Operations Center? ¿Certificación? ¿Servicio?
  - “IA Act” debería ser “AI Act” o “Reglamento de IA de la UE”.
- Hay demasiadas piezas técnicas; si el jurado no es técnico, puede parecer overengineering.

### Recomendación concreta

En presentación oral, agrupar en cuatro ejes:

1. **Frontend:** React + Vite + Tailwind.
2. **Orquestación:** n8n.
3. **IA:** OpenRouter/Azure OpenAI/modelo propio futuro.
4. **Datos y seguridad:** Supabase/Postgres, Cloudflare, Datadog, cumplimiento.

---

## Slide 20 - Los 3 Horizontes

### Contenido textual

**Título:** Los 3 Horizontes

**Año 1 · Madrid**

- 35 colegios
- 115k€ ingresos
- -363€ EBITDA
- Invertir 358k€

**Año 2 · España**

- 100 colegios
- 428k€ ingresos
- -520k€ EBITDA
- Invertir 345k€

**Año 3 · Internacional**

- 260 colegios
- 1,81M€ ingresos
- +361k€ EBITDA
- Margen 20%

También aparece la etiqueta “roadmap”.

### Elementos visuales

- Fondo beige con formas orgánicas amarillas, naranjas y violetas.
- Tres tarjetas verticales blancas con iconos superiores:
  - Ciudad/Madrid.
  - Mapa de España.
  - Globo/internacional.
- Título grande negro dentro de una cápsula blanca.

### Función narrativa

Explica el plan de crecimiento en tres etapas geográficas y financieras.

### Lo que funciona

- La progresión Madrid → España → Internacional es clara.
- Permite entender inversión inicial, pérdidas controladas y rentabilidad en Año 3.
- El formato de tres horizontes es fácil de contar.

### Riesgos / mejoras

- “-363€ EBITDA” probablemente debería ser “-363k€ EBITDA”. En la slide se lee “-363€ EBITDA”, lo cual parece un error de unidad. Lo mismo debe revisarse en todo el modelo.
- “260colegios” aparece sin espacio. Corregir a “260 colegios”.
- Hay que verificar coherencia entre 1,81M€ ingresos y el pricing de la slide 21. Con 260 colegios, el ingreso medio anual por colegio sería aproximadamente 6.961€, unos 580€/mes, consistente si muchos están en plan Centro Completo. Pero conviene tenerlo calculado.

### Recomendación concreta

Corregir:

- “-363€ EBITDA” → “-363k€ EBITDA”
- “260colegios” → “260 colegios”
- “1,81M€ ingresos” → mantener solo si coincide con el financiero final.

---

## Slide 21 - Pricing / planes

### Contenido textual

**eduTechIA**

01. **Centro Básico**  
299€/mes · Hasta 10 docentes. Ideal para centros pequeños que inician con IA educativa.

02. **Centro Completo**  
599€/mes · Hasta 30 docentes. Funcionalidades completas y soporte prioritario.

03. **Red/Corporativo**  
2.000€/mes · 30+ docentes. Redes educativas y corporaciones con necesidades avanzadas.

### Elementos visuales

- Fondo beige.
- Mockup de smartphone a la izquierda con pantalla de suscripción.
- Logo eduTechIA en tarjeta naranja inferior izquierda.
- Tres tarjetas blancas a la derecha con numeración naranja.
- Tipografía negra gruesa para nombres de plan.

### Función narrativa

Presenta el modelo de ingresos y empaquetado comercial.

### Lo que funciona

- Pricing simple y fácil de entender.
- Los tres planes cubren colegio pequeño, colegio grande y red/corporativo.
- El rango de precios ayuda a explicar los ingresos de los tres horizontes.

### Riesgos / mejoras

- Falta decir si el precio es por centro, por sede o por licencia institucional.
- “Hasta 10 docentes” y “Hasta 30 docentes” está claro, pero no se indica qué pasa con alumnos, actividades o volumen de uso IA.
- El mockup de smartphone parece de app de suscripciones genérica y no conecta del todo con un producto B2B escolar.

### Recomendación concreta

Añadir una nota pequeña:

> Precio mensual por centro educativo. Incluye generación de actividades, revisión docente, trazabilidad básica y soporte según plan.

---

## Slide 22 - Inversión / EBITDA / gráfico financiero

### Contenido textual

01. **Inversión Inicial**  
700k€ requeridos. Negocio autofinanciado desde Año 3.

02. **EBITDA Año 2**  
-520K€ con 100 colegios en España.

03. **EBITDA Año 3**  
+361K€ con 260 colegios. Margen 20%.

Gráfico:

- Ingresos (€)
- Costes (€)
- Año 1
- Año 2
- Año 3
- Eje vertical: €0, €500000, €1000000, €1500000, €2000000

### Función narrativa

Cierra la lógica económica: inversión inicial, pérdidas esperadas y rentabilidad proyectada.

### Lo que funciona

- Los tres números principales son claros.
- El gráfico ayuda a visualizar cruce entre ingresos y costes.
- Refuerza que el negocio requiere inversión, pero busca autofinanciarse en Año 3.

### Riesgos / mejoras

- El gráfico extraído no muestra valores exactos por barra/línea; en proyección puede ser difícil leerlo.
- Hay que verificar si 700k€ = 358k€ + 345k€ + otros ajustes. La suma da 703k€, cercano a 700k€, pero conviene explicarlo como redondeo.
- “-520K€” usa K mayúscula; en otras slides aparece k minúscula. Unificar estilo.

### Recomendación concreta

Usar estos tres bullets orales:

> Año 1: validación y entrada en Madrid.  
> Año 2: expansión nacional con inversión comercial y técnica.  
> Año 3: escala internacional y punto de autofinanciación.

---

## Slide 23 - Cierre

### Contenido textual

**Frase superior:**

SEGURIDAD · VIABLE · RENTABLE · ESCALABLE

**Título:**

eduTechIA está lista para el siguiente paso

**Contacto:**

- www.edutechIA.com
- contacto@edutechIA.com
- @edutechIA

### Elementos visuales

- Fondo amarillo claro.
- Título grande naranja con borde/blanco o sombra.
- Imagen circular superior derecha de mujer saludando.
- Imagen circular inferior izquierda de hombre con pulgar arriba.
- Iconos de web, correo y usuario/red social.
- Formas orgánicas naranjas y líneas decorativas.

### Función narrativa

Cierre emocional y comercial.

### Lo que funciona

- La frase “está lista para el siguiente paso” cierra bien porque conecta con PoC → piloto → escalado.
- Los cuatro atributos superiores resumen muy bien la defensa: seguridad, viabilidad, rentabilidad y escalabilidad.

### Riesgos / mejoras

- En el texto extraído aparece duplicado “eduTechIA está lista...” con letras dobles. Visualmente parece correcto, pero conviene revisar la PPT por capas duplicadas.
- “Viable” debería concordar si la lista usa sustantivos/adjetivos. Podría ser “SEGURA · VIABLE · RENTABLE · ESCALABLE” o “SEGURIDAD · VIABILIDAD · RENTABILIDAD · ESCALABILIDAD”.
- Si el dominio/correo no existen, el jurado podría probarlos. Validar antes.

### Recomendación concreta

Cambiar la línea superior a una de estas dos opciones:

> SEGURA · VIABLE · RENTABLE · ESCALABLE

O:

> SEGURIDAD · VIABILIDAD · RENTABILIDAD · ESCALABILIDAD

---

## 5. Problemas concretos detectados

### 1. Posibles errores de unidad financiera

En la slide 20 aparece “-363€ EBITDA”. Lo más probable es que deba decir “-363k€ EBITDA”. Revisar también si en todas las slides financieras usan k€, K€, M€ de forma consistente.

### 2. Inconsistencia de ingresos Año 3

La versión reducida muestra 1,81M€ de ingresos en Año 3. Si en documentos anteriores aparecía 1,45M€, hay que unificar el número definitivo en todos los materiales, incluyendo speech, tabla financiera y gráfico.

### 3. Duplicaciones invisibles o capas repetidas

En varias páginas el texto extraído aparece duplicado o con letras dobles, por ejemplo:

- Slide 2: el texto del problema aparece duplicado en extracción.
- Slide 9: “Arquitectura funcional” aparece repetido.
- Slide 23: “eduTechIA está lista...” aparece también en versión con letras duplicadas.

Puede ser un problema de capas, sombras, duplicados o efectos exportados. Visualmente no siempre molesta, pero conviene revisar la PPT para evitar problemas de accesibilidad, exportación o lectura por herramientas.

### 4. Lenguaje clínico sensible

Aparece varias veces “alumnos con dificultades de atención”. Es entendible, pero debe cuidarse para no sonar a diagnóstico. La defensa más sólida es hablar de **perfiles pedagógicos**:

- necesita pasos cortos
- requiere apoyo visual
- se beneficia de refuerzo positivo
- necesita baja carga cognitiva
- trabaja mejor con consignas breves

### 5. Marco regulatorio demasiado denso

La slide 15 es relevante, pero tiene mucho texto. Si se presenta con poco tiempo, conviene explicar solo tres ideas:

1. Educación + IA + menores = entorno de alto cuidado.
2. La PoC reduce riesgo usando perfiles ficticios o anonimizados.
3. El producto evita diagnósticos clínicos y mantiene decisión humana.

### 6. Falta de alcance explícito de la PoC

La versión reducida ya no tiene una slide clara de “dentro/fuera del alcance”. Esto puede complicar la defensa. Si no quieren reincorporar una slide, deberían decirlo en la demo o en métricas:

> En esta PoC no validamos seguimiento longitudinal ni interacción directa del alumno; validamos generación de actividad adaptada, revisión docente, calidad percibida y tiempo de preparación.

---

## 6. Slides que convendría ajustar sí o sí

### Prioridad alta

1. **Slide 20 - Los 3 Horizontes**  
   Corregir unidades: -363€ probablemente debe ser -363k€.

2. **Slide 15 - Marco regulatorio**  
   Simplificar visualmente o preparar explicación oral muy clara. Ajustar “notificar al orientador” para no parecer insuficiente.

3. **Slide 13 - Métricas**  
   Definir qué es “error grave” y revisar el umbral >= 3,5/5.

4. **Slide 10 - Arquitectura tecnológica**  
   Corregir “EleventLabs” si corresponde a “ElevenLabs”. Revisar “laboratorio de análisis”.

5. **Slide 17 - Equipo y Stack**  
   Cambiar “Producto certificado RGPD + AI Act” por “Producto con evaluación/documentación de cumplimiento RGPD + AI Act”.

### Prioridad media

6. **Slide 3 - Reto seleccionado**  
   Suavizar lenguaje clínico y reforzar perfiles pedagógicos.

7. **Slide 5 - Beneficios esperados**  
   Separar PoC actual de funciones futuras.

8. **Slide 7 - Benchmark**  
   Añadir nota de benchmark cualitativo.

9. **Slide 11 - Demo**  
   Agregar mini flujo fallback por si la demo no se ve bien.

10. **Slide 23 - Cierre**  
   Unificar frase: “SEGURA · VIABLE · RENTABLE · ESCALABLE”.

---

## 7. Mini speech recomendado para defender la versión reducida

> El problema que abordamos es muy concreto: en un aula con 25 o 30 alumnos, un docente necesita adaptar actividades a distintos ritmos y necesidades, pero hacerlo manualmente consume demasiado tiempo.
>
> eduTechIA propone un copiloto pedagógico con IA para generar una primera versión de actividades de matemáticas adaptadas. No sustituye al docente: le entrega una propuesta estructurada, con pasos guiados, adaptación pedagógica y feedback sugerido, pero la decisión final siempre queda en manos del profesor.
>
> La PoC valida si el sistema realmente ahorra tiempo, mantiene calidad pedagógica y conserva la sensación de control docente. Por eso medimos tiempo de preparación, calidad percibida y satisfacción/control.
>
> Como trabajamos en educación, IA y potencialmente menores, diseñamos desde el inicio con guardarraíles: perfiles ficticios o anonimizados, sin diagnósticos clínicos, aprobación humana obligatoria, transparencia ante familias y criterios de parada si la calidad o la seguridad fallan.
>
> Si la PoC confirma la hipótesis, el producto puede escalar desde Madrid hacia España e internacionalmente, con un modelo B2B por centro educativo, un stack progresivo y un equipo que incorpora perfiles pedagógicos, tecnológicos, comerciales, de datos y protección de datos.

---

## 8. Veredicto final

La versión reducida es mejor para presentar: tiene menos dispersión, menos slides de relleno y más foco en el producto. La historia se entiende y el hilo es defendible.

El trabajo pendiente no es agregar muchas slides, sino **hacer quirúrgicos algunos ajustes**:

- corregir unidades financieras,
- aclarar PoC actual vs futuro,
- suavizar lenguaje clínico,
- simplificar la parte regulatoria,
- reforzar que el docente siempre decide,
- y preparar una frase sólida para la demo.

Con esos cambios, la presentación puede quedar mucho más profesional sin perder la estética visual amigable que ya tiene.
