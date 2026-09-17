# ✨ Interactive Birthday Surprise Experience

An enchanting, interactive, multi-step birthday web experience built with **React 19**, **Vite 6**, **Tailwind CSS v4**, and **Framer Motion**.

Designed as a playful digital birthday surprise with smooth animations, custom glassmorphism, dynamic particle canvas effects, browser-synthesized Web Audio sound effects, and customizable celebration elements.

---

## 🌟 Features

* **Personalized Entry Flow** — Prompts the recipient for their name when unconfigured and persists user state in `localStorage`.
* **Cinematic Teaser** — Multi-stage animated intro sequence setting a warm, anticipatory tone.
* **Interactive Quiz** — Playful questions with immediate witty reactions and a custom completion recap.
* **Birthday Mood Generator** — Slot-machine style personality shuffle with reroll counter limits and animated badges.
* **"You Deserve..." Affirmations** — Animated glass cards with staggered reveals and interactive hover physics.
* **Secret Gift Vault** — Locked mystery box with particle bursts and unlock sound effects.
* **Interactive Birthday Cake** — Blow out individual candles or extinguish all flames simultaneously with animated smoke and confetti bursts.
* **Live Countdown Timer** — Configurable target countdown that automatically switches to full celebration mode on the birthday date.
* **Synthesized Web Audio SFX** — Browser-generated pops, chimes, unlock sounds, wind blowing, and celebration fireworks with zero external audio dependencies.
* **Background Music** — Optional lofi soundtrack with floating audio controls and mute toggles.
* **Hidden Easter Eggs** — Secret keyboard cheat codes (`BIRTHDAY`, `PARTY`, `HBD`) and interactive clickable secret stars.

---

## 🛠️ Tech Stack

* **Framework:** React 19 (`react`, `react-dom`)
* **Build Tool:** Vite 6 (`vite`, `@vitejs/plugin-react`)
* **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`, `tailwindcss`)
* **Animations:** Framer Motion 12 (`framer-motion`)
* **Icons:** Lucide React (`lucide-react`)
* **Celebration Effects:** Canvas Confetti (`canvas-confetti`)
* **Audio:** Web Audio API + HTML5 Audio

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18.0 or newer
* npm, pnpm, or yarn

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/yawarabbassss/birthday.git
cd birthday
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

Open the local URL shown in your terminal.

---

## 📦 Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## ⚙️ Customization

The experience can be customized for a specific birthday recipient.

You can modify:

* Recipient name
* Birthday date
* Countdown settings
* Quiz questions and answers
* Birthday mood results
* Affirmation messages
* Gift vault content
* Celebration messages
* Background music
* Visual content
* Easter eggs
* Interactive elements

---

## 🎵 Audio

The interactive sound effects use the browser's **Web Audio API**.

This allows the application to generate effects such as:

* Pops
* Chimes
* Unlock sounds
* Wind effects
* Celebration sounds
* Firework-style effects

The main interactive sound effects do not require external audio files.

The project can also use HTML5 Audio for optional background music.

---

## 🎂 Interactive Experience

This project is designed around discovery and interaction rather than being a traditional static webpage.

The recipient moves through multiple stages, interacts with different elements, discovers hidden features, and eventually reaches the final birthday celebration.

---

## 🎁 Hidden Easter Eggs

The experience contains hidden interactions for additional surprises.

Supported keyboard codes include:

```text
BIRTHDAY
PARTY
HBD
```

There are also interactive discovery points, including clickable secret stars.

---

## 💾 Local Storage

The application uses browser `localStorage` to persist certain user-specific information, such as the recipient's name.

This allows the experience to remember the recipient during future visits on the same browser.

---

## 📁 Project Structure

```text
birthday/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

The exact structure may change as the project develops.

---

## 🌐 GitHub Repository

https://github.com/yawarabbassss/birthday

---

## 📄 License

This project was created as a personal interactive birthday experience.

You are welcome to use the project as inspiration for creating your own interactive web experiences.
