# Prueba técnica: Maquetador Web Responsive para Avoris

Maquetación de la home de un site ficticio de viajes a partir de un diseño en Figma.

**Demo:** https://victortoyos.github.io/prueba-avoris/

## Requisitos

- Node.js: el repositorio incluye `.nvmrc` (v26.10.0) y `engines` pide `>=20.0.0`. 
- npm 10 o superior.

## Instalación y arranque

```bash
git clone https://github.com/victortoyos/prueba-avoris
cd prueba-avoris
npm install
npm run dev
```

## Decisiones técnicas

- **Vite + TypeScript:** Se ha decidido no utilizar un framework, como Angular, para no complicar la prueba ya que el foco estaba en la maquetación, aunque los componentes creados se podrían integrar en un framework sin problemas.
- **Tailwind v3 + Sass :** Como la versión 4 de Tailwind lleva su propio preprocesador, decidí usar la v3 para poder combinarlo con Sass, ya que ambos son los utilizados en Avoris y he intentado aportar algo con ambos
- **Fuentes:** Syne (títulos) y Nunito (texto), con Fontsource e importando solo el alfabeto latino y los pesos necesarios, para no depender de servidores externos y reducir carga.
- **Preferencia por lo nativo:** Se ha intentado usar todo lo que ofrece HTML/CSS nativamente (`details`, `dialog`, `scroll-snap`, `:checked`, `:modal`, `:popover-open`), en lugar de reimplementarlo con JavaScript.
- **Despliegue:** GitHub Pages con el paquete `gh-pages`. Incluye metadatos Open Graph y Twitter para la vista previa al compartir el enlace.

## Estilos

- **Tailwind en el HTML y SCSS con BEM:** Para mostrar el uso de ambas, se ha usado Tailwind para el layout y responsive, y luego scss con nomenclatura BEM para el aspecto y estados de los componentes.

- *Detalles:* 
 - Los estados nativos del HTML (`[open]`, `:checked`, `:popover-open`, `:modal`, `[aria-current]`) se estilan por sus atributos o pseudoclases.
 - Los botones compensan el borde en el padding, para que midan lo mismo que en Figma, donde el trazo es interior. 
 - Los iconos que aparecen varias veces se reutilizan con un mixin reduciendo el tamaño del bundle. Los SVG además usan el `currentColor` para heredar el color.
 - Las variables css de color y tamaños se definen en `:root`, no se han usado todas las que vienen en el Figma ya que no lo consideré necesario de cara a una prueba técnica, ya que es fácilmente escalable en un entorno real de producción.
 - Se usan también variables para las transiciones y las sombras. 
 - Se ha usado `clamp` en diversas ocasiones para no llenar el código de breakpoints y hacer que se acercaran lo máximo posible al figma.
 - Se ha priorizado usar rem para los espaciados y tamaños.
 - Los breakpoints están definidos en `tailwind.config.js` (`tablet`, `desktop`) y en un mixin de SCSS (`base/_breakpoints.scss`).
 - Estructura: `header`, `main` (con el hero, la intro y el catálogo) y `footer`.
 - Un solo `h1`: el título de la intro. Los textos de los slides del hero son `p`, para no meter títulos promocionales antes del `h1`.
 - Desglose de precios: lista de definición (`dl`/`dt`/`dd`) para los pares etiqueta-importe.
 - Se ha pasado la web por un checkeador de semántica para comprobar errores, sin resultados.

## Maquetación: Flex y Grid

- Se han utilizado ambos métodos combinados dependiendo de la situación: por ejemplo en las cards de resultados, teniendo además un panel de filtros, siendo bidimensional, he optado por un grid donde todo encaja de forma más limpia.
- Donde no ha sido necesario por tener que alinear solo en un eje, se ha usado flex. 
- En ciertos lugares de los componentes como el pie de la card, que variaba de desktop a mobile en cuanto a disposición, también se usa grid ya que es más sencillo para mover elementos de posición respecto a flex.

## Componentes destacados

### Menú mobile

- Aunque en el figma no había un menú mobile, he decidido añadirlo como un "plus" utilizando para ello un `dialog` que en escritorio se queda fijo, no teniendo que duplicarlo, y añadiendo animación de entrada y salida. Si está la modal abierta y se pasa a una resolución superior, se cierra automáticamente.

### Filtros

- Se han usado componentes nativos como `details` y `summary` ya que dan todo lo que necesitábamos sin necesidad de añadir lógica.
- Los tooltips se han realizado con css para poder estilarlos de acorde al figma.
- En tablet y mobile, al igual que el menú mobile, se convierte en un `dialog`, así podemos además cerrar con Esc y mantener el foco sin necesidad de javascript adicional. 
- Los filtros carecen de funcionalidad ya que no lo consideré imprescindible para una prueba de maquetación, aunque con una lógica entendible detrás basada en `[datas]` se podría realizar fácilmente.
- Si se pasa de tablet a desktop, la modal se cierra automáticamente.

### Desglose de precios

- A diferencia del `dialog` se ha usado `popover` nativo ya que no hay interacción y simplemente se muestra información, y nos otorga las mismas ventajas de cerrar con Esc y foco sin javascript.
- Se recoloca además dependiendo del espacio disponible gracias a las reglas modernas de css.

### Carrusel del hero

- Se ha creado un slider de 3 imágenes siguiendo, en la medida de lo posible, el diseño del Figma, aunque las imágenes son de stock. 
- Se usa `srcset` para primar el tamaño de la carga de las imágenes a lo que sea necesario, además de aplicar `loading="lazy"`a las imágenes del hero excepto un `fetchpriority="high"`a la primera.
- No se ha usado una librería por no añadir kb al proyecto, aunque `swiper` sería mi primera opción. 
- Se añade un overlay con opacidad para garantizar la lectura del texto blanco. 
- Como limitación, no está implementado que el slider funcione como bucle infinito. 

### Transiciones y movimiento

- Transiciones cortas en propiedades de color, y entradas y salidas de los modales con `@starting-style` y `transition-behavior: allow-discrete`. En navegadores sin soporte no hay animación (pero no rompe nada)
- Todo el movimiento se desactiva globalmente con `prefers-reduced-motion` (es el único sitio donde se usa `!important`, a propósito)

## Accesibilidad

- Se han utilizado diferentes aria en todo el html, tanto en botones como textos y labels, como para aplicar estilos o apuntar a dichos elementos por javascript.
- Usando un checkeador para contrastes teniendo en cuenta el WCAG, hay ligeros problemas en algunos colores como en los `badges` y en el botón de `más información` que no llegan al contraste mínimo requerido, pero opté por dejarlos como en el Figma, sabiendo que se puede arreglar fácilmente en un entorno real.
- Usando Lighthouse la puntuación ha sido de 100
- Usando Axe, realizando 72 test de WCAG 2.1 AA, la nota ha sido de 92/100

## Comentarios adicionales

- Posibles mejoras: no duplicar breakpoints, utilizar Tailwind o SASS de forma más uniforme, aplicar un filtrado real aunque sea con datos inventados y revisar la accesibilidad y el contraste para obtener una nota perfecta.
