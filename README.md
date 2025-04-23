# 🧠 Visualizador de Mapas Mentales Interactivos (D3.js + GSAP)

Este proyecto permite representar mapas mentales en forma de árbol interactivo, cargados desde archivos `.json`, con animaciones suaves y control visual de expansión de nodos. Está diseñado especialmente para explorar estructuras de conocimiento profundo como el **Pensamiento Aumentado v3**, pero puede adaptarse a cualquier tema jerárquico.

## ✨ Características

- Visualización dinámica en estructura de árbol
- Diseño limpio y adaptable a cualquier jerarquía de ideas
- Carga de datos desde archivo `JSON` externo
- Nodos colapsables/expandibles al hacer clic
- Animaciones suaves con GSAP
- Narración hablada opcional al hacer doble clic sobre un nodo (Web Speech API)
- Perfecto para enseñanza, presentaciones, visualización de pensamiento o construcción de conocimiento colectivo

---

## 📁 Estructura del Proyecto


---

## 🧠 ¿Cómo debe ser el JSON?

El archivo debe tener una estructura jerárquica clara como esta:

json
{
  "title": "Raíz del mapa",
  "children": [
    {
      "title": "Nodo hijo",
      "children": [
        { "title": "Subnodo" }
      ]
    }
  ]
}

## ✨ Características

## Clona o descarga este repositorio
Coloca tu archivo .json en la carpeta data/
Abre index.html en un navegador moderno (no requiere servidor)
Haz clic en cada nodo para expandir ideas
Haz doble clic para escuchar el nodo narrado (voz automática en español)


🔧 Tecnologías utilizadas
D3.js — para el layout jerárquico

GSAP — para animaciones suaves

Web Speech API — para voz narrativa (opcional)


🙌 Autores y agradecimientos
Desarrollado por DeiCode como parte del proyecto Pensamiento Aumentado v3.
Inspirado por metodologías como Design Thinking, Kaizen y la inteligencia colectiva.