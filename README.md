# 🕹️ Tetris JS - Gameboy Edition

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Una recreación nostálgica del clásico **Tetris (1989)** desarrollada enteramente con JavaScript Vanilla. Este proyecto replica la estética visual de la Gameboy original (paleta de verdes y grises oscuros), las mecánicas clásicas y efectos de sonido retro.

![Title Screen](img/Screenshot_5.png)

## 🚀 Características

* **Motor de Juego Propio:** Lógica completa de movimiento, rotación de piezas (Tetrominos) y detección de colisiones programada desde cero.
* **Estética Retro:** Diseño visual fiel a la pantalla LCD de la Gameboy, utilizando una paleta de colores personalizada (`#C6CFA2`, `#202020`).
* **Persistencia de Datos:** El juego guarda tu **Puntuación Máxima (High Score)** automáticamente en el navegador usando `localStorage`.
* **Audio FX:** Efectos de sonido integrados para rotación, completar líneas, game over y música de fondo.
* **Responsive & Mobile:** Detecta si estás en un dispositivo móvil y muestra controles táctiles en pantalla automáticamente.
* **Dificultad Progresiva:** La velocidad de caída aumenta a medida que consigues más puntos.

## 🎮 Controles

### 💻 Teclado (PC)

| Tecla | Acción |
| :--- | :--- |
| **⬅️ Flecha Izq / A** | Mover izquierda |
| **➡️ Flecha Der / D** | Mover derecha |
| **⬇️ Flecha Abajo / S** | Caída rápida |
| **⬆️ Flecha Arriba / Espacio** | Rotar pieza |
| **Enter** | Iniciar juego |
| **P** | Pausar |

### 📱 Móvil (Táctil)
El juego incluye una interfaz táctil que se activa en pantallas pequeñas (< 450px), con botones dedicados para mover, rotar y bajar las piezas.

## 🛠️ Tecnologías

* **HTML5:** Estructura semántica del juego.
* **CSS3:** Uso de **CSS Grid** para la matriz del tablero y **Flexbox** para la interfaz. Estilización retro con sombras `box-shadow` para dar volumen a los botones y piezas.
* **JavaScript (ES6):**
    * Manipulación del DOM para renderizar los bloques.
    * Matrices multidimensionales para gestionar la lógica de las piezas.
    * `setInterval` para el control del Game Loop.
    * Gestión de Eventos de teclado y ratón/touch.

## 📂 Estructura del Proyecto

```text
/
├── index.html          # Punto de entrada
├── README.md           # Documentación
├── img/                # Imágenes y Favicon
│   ├── gameoverphrase.jpg
│   ├── title_screen.jpg
│   └── icons8-tetris-60.png
├── song/               # Efectos de sonido y música
│   ├── principal.mp3
│   ├── game-over.mp3
│   └── ...
└── tetris/             # Código fuente
    ├── script.js       # Lógica del juego
    └── style.css       # Estilos visuales
````
## 🔧 Instalación y Uso

Este es un proyecto estático, por lo que no necesitas instalar dependencias de Node.js.

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/xni0/tetris-js](https://github.com/xni0/tetris-js)
    ```

2.  **Ejecutar:**
    Simplemente abre el archivo `index.html` en tu navegador web favorito (Chrome, Firefox, Edge).

    > **Nota:** Para asegurar que las fuentes y audios carguen correctamente, se recomienda usar una extensión como **Live Server** en VS Code.

## 📸 Créditos

Desarrollado con ❤️ por **Lucilene Vidal Lima**.
Inspirado en el clásico de Nintendo.
