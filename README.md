# 🖥️ My very own WebOS

A premium, interactive web-based Operating System (WebOS) built to run entirely inside a web browser.

---

## 🎯 Project Overview

The goal of this project is to build a sleek, futuristic, and high-fidelity desktop experience on the web. It will serve as a personal hub, portfolio, and showcase of web development capabilities, styled with a modern glassmorphic look and smooth, responsive micro-animations.

---

## ⚡ Core Features to Build

1. **Draggable & Resizable Window Manager**
   - Floating window modals (e.g. "About Me", "Projects", "Terminal", "Settings").
   - Header control buttons: Minimize, Maximize/Restore, and Close.
   - Dynamic z-index handling: clicking any window brings it to the foreground.

2. **Interactive Terminal App**
   - A fully functional terminal emulator window.
   - Support for commands like:
     - `help` - List available commands.
     - `neofetch` - Display simulated OS system info (SujayOS v1.0.0, uptime, CPU, Memory) alongside cool ASCII art.
     - `ls` / `dir` - List directory files.
     - `clear` - Clear the terminal output.
     - `date` - Display current date and time.

3. **System Settings App**
   - Background Wallpaper Switcher (select from preset ambient glow, space, or cyberpunk gradient patterns).
   - Theme Toggler (toggle dark/light themes and glass opacity sliders).

4. **Taskbar & Start Menu**
   - **Start Button:** Opens a menu with shortcuts to all apps, help docs, and social links.
   - **Active Apps Tray:** Displays icons for running apps with light indicators beneath them showing active state.
   - **System Tray:** Live Clock & Date display updating in real-time.

---

## 🎨 Design & Aesthetic Points to Consider

* **Glassmorphism:** Use frosted glass elements featuring a strong backdrop blur, semi-transparent backgrounds, and thin white borders.
  ```css
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  ```
* **Futuristic Typography:** Use clean modern typography such as Google Fonts (e.g., **Space Grotesk** or **Outfit** for system text, and **Orbitron** or **Share Tech Mono** for the terminal/clock).
* **Color Scheme:** Primary dark palette with vibrant accent highlights (e.g., neon cyan, emerald green, and hot magenta glows).
* **Responsive Layout:**
  - Designed for desktop, but must gracefully scale on mobile.
  - On mobile screens, windows should maximize into full-screen tab views or panels for ease of use.

---

## 🛠️ Technology Stack

* **Structure:** Semantic HTML5 elements (`<header>`, `<main>`, `<nav>`).
* **Styling:** Vanilla CSS3 featuring custom properties (variables) for fast, real-time theme swapping.
* **Logic:** Vanilla JavaScript (ES6+) for desktop windows handling, cursor dragging, and terminal emulation. No complex bundlers needed to start, ensuring lightweight loading times.
