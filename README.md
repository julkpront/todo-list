# TODO List con React

Aplicación de lista de tareas hecha con **React** y **Vite**, desarrollada paso a paso para practicar `useState`, `useEffect`, props, formularios controlados y organización por componentes.

| | |
|---|---|
| **Web publicada** | https://todo-list-ztz5.netlify.app |
| **Repositorio** | https://github.com/julkpront/todo-list |

---

## Índice

1. [Qué hace la aplicación](#1-qué-hace-la-aplicación)
2. [Tecnologías](#2-tecnologías)
3. [Estructura del proyecto](#3-estructura-del-proyecto)
4. [Cómo está construida, paso a paso](#4-cómo-está-construida-paso-a-paso)
5. [Componentes y props](#5-componentes-y-props)
6. [Estado y efectos](#6-estado-y-efectos)
7. [Estilos](#7-estilos)
8. [Ejecutar en local](#8-ejecutar-en-local)
9. [Despliegue en Netlify](#9-despliegue-en-netlify)

---

## 1. Qué hace la aplicación

### Fase 1: funcionalidad básica

- Formulario con un input y un botón **ADD** para añadir tareas.
- Al añadir una tarea, el input se vacía.
- Lista de tareas que se recorre con `.map`, con una `key` única (`uuid`) por cada una.
- Botón **BORRAR** en cada tarea para eliminarla de forma independiente.
- Botón **CLEAR** para borrar todas las tareas.
- Botón **RESET** para volver a mostrar solo las tareas de la precarga inicial.
- Precarga de tareas desde un archivo JSON.

### Fase 2: validaciones y ciclo de vida

- El botón ADD **no aparece** hasta que hay texto escrito.
- **Validación**: el título debe tener al menos 6 caracteres; si no, se muestra un mensaje de error y no se añade.
- La precarga de datos se hace con `useEffect`, al montar el componente.
- Si pasan **20 segundos** sin enviar lo escrito, el formulario se vacía y ADD desaparece.
- Al añadir una tarea, se muestra el mensaje "Tarea añadida" durante **5 segundos**.

### Fase 3: edición y organización

- **Editar**: el botón EDITAR rellena el formulario con el título y la descripción de la tarea. Se guarda con GUARDAR o se descarta con CANCELAR.
- **Tachar**: una casilla en cada tarea la marca como completada y tacha el título.
- Cada tarea es un objeto con `id`, `title`, `desc` e `isDone`.
- La aplicación está dividida en componentes pequeños y reutilizables.
- Desplegada en Netlify desde la rama `main`.

---

## 2. Tecnologías

- **React 19** (hooks `useState` y `useEffect`)
- **Vite** como herramienta de desarrollo y empaquetado
- **uuid** para generar identificadores únicos
- **CSS** con variables, flexbox y `media queries`
- **Netlify** para el despliegue

---

## 3. Estructura del proyecto

```
├── public/
├── src/
│   ├── components/
│   │   ├── Form/          # Formulario de añadir y editar
│   │   ├── List/          # Recorre las tareas
│   │   └── Item/          # Pinta una tarea
│   ├── data/
│   │   └── tasks.json     # Tareas de la precarga
│   ├── App.jsx            # Componente raíz: guarda el estado
│   ├── App.css
│   ├── index.css          # Estilos globales y variables de color
│   └── main.jsx           # Punto de entrada
├── index.html
└── package.json
```

Cada componente vive en su propia carpeta, con su `.jsx`, su `.css` y un `index.js` que permite importarlo con `import Form from './components/Form'`.

---

## 4. Cómo está construida, paso a paso

1. **Proyecto base**: creado con `npm create vite@latest` y la plantilla de React. Se limpió el contenido de ejemplo.
2. **Estado de las tareas**: `useState` guarda el array de tareas y `.map` las dibuja. Cada elemento lleva una `key`.
3. **Input controlado**: el texto del input vive en el estado, y cada pulsación de tecla lo actualiza con `onChange`.
4. **Botón ADD**: crea una tarea nueva y la añade con `setTasks([...tasks, newTask])`. Siempre se crea un array nuevo, nunca se modifica el existente, para que React detecte el cambio.
5. **CLEAR y BORRAR**: CLEAR sustituye el array por uno vacío. BORRAR usa `.filter` para quedarse con todas las tareas menos la que tiene ese `id`.
6. **RESET y JSON**: los datos iniciales se importan de `tasks.json`. RESET vuelve a cargarlos en el estado. El JSON original nunca se modifica.
7. **`uuid`**: cada tarea nueva recibe un identificador único, que se usa como `key` y para localizarla al borrar, editar o tachar.
8. **División en componentes**: `Form`, `List` e `Item`. El estado se queda en `App` y se pasa a los hijos por props.
9. **Fase 2**: ADD condicionado con `&&`, validación de 6 caracteres, y tres `useEffect` (precarga, mensaje de 5 segundos y limpieza a los 20 segundos).
10. **Fase 3**: tareas con título, descripción e `isDone`. `handleToggle` cambia `isDone` con `.map`, y la edición reutiliza el formulario con un estado `editingId`.
11. **Estilos**: variables CSS, un archivo por componente y diseño adaptable a móvil.
12. **Despliegue**: repositorio en GitHub y publicación en Netlify.

---

## 5. Componentes y props

| Componente | Responsabilidad | Props que recibe |
|---|---|---|
| `App` | Guarda el estado y las funciones. Compone `Form` y `List` | (ninguna) |
| `Form` | Dos inputs (título y descripción), botón ADD o GUARDAR, CANCELAR y error | `values`, `error`, `submitText`, `isEditing`, `onChange`, `onSubmit`, `onCancel` |
| `List` | Recorre las tareas y pinta un `Item` por cada una | `tasks`, `onDelete`, `onToggle`, `onEdit` |
| `Item` | Una tarea: casilla, título, descripción, EDITAR y BORRAR | `task`, `onDelete`, `onToggle`, `onEdit` |

El estado vive en `App`, el padre común de `Form` y `List`. Los datos bajan por props y los hijos avisan al padre llamando a las funciones que reciben (*elevar el estado*).

---

## 6. Estado y efectos

**Estados en `App`**

| Estado | Para qué sirve |
|---|---|
| `tasks` | Array de tareas: `{ id, title, desc, isDone }` |
| `values` | Contenido del formulario: `{ title, desc }` |
| `error` | Mensaje de validación |
| `message` | Mensaje "Tarea añadida" o "Tarea actualizada" |
| `editingId` | `id` de la tarea que se edita, o `null` si no se edita ninguna |

**Efectos (`useEffect`)**

| Efecto | Se ejecuta cuando | Qué hace |
|---|---|---|
| Precarga | Al montar el componente (`[]`) | Carga las tareas de `tasks.json` |
| Mensaje | Cambia `message` | Lo borra a los 5 segundos |
| Inactividad | Cambia el formulario | Lo vacía tras 20 segundos sin enviar (no mientras se edita) |

Los dos temporizadores devuelven `clearTimeout` en la función de limpieza, para cancelar el anterior cada vez que el efecto se repite.

---

## 7. Estilos

- Tema navideño con variables CSS (`--green`, `--red`, `--gold`, `--cream`) definidas en `:root`.
- Estilos globales en `index.css` y un archivo CSS por componente.
- Clases con el patrón `bloque__elemento` (por ejemplo, `form__error`) en lugar de selectores de etiqueta, para que cada regla afecte solo a lo que debe.
- Efectos `:hover` y `:focus`, y una `media query` para pantallas pequeñas.

---

## 8. Ejecutar en local

Requisitos: Node.js 22 o superior y npm.

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173`. Para generar la versión de producción:

```bash
npm run build
```

---

## 9. Despliegue en Netlify

La aplicación está publicada en:

### https://todo-list-ztz5.netlify.app

Pasos seguidos:

1. Subir el proyecto a GitHub, en la rama `main`.
2. En Netlify, elegir **Import from Git** y seleccionar el repositorio `todo-list`.
3. Netlify detecta que es un proyecto Vite y propone esta configuración:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Branch:** `main`
4. Pulsar **Start building** y esperar a que termine la compilación.

Cada `git push` a `main` vuelve a compilar y publicar la web automáticamente.
