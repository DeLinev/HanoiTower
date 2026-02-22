---
sidebar_position: 1
---

# Introduction

**Tower of Hanoi** is a browser-based implementation of the classic Tower of Hanoi puzzle, built with **React**, **TypeScript**, **Zustand**, and **Vite**.

The player moves disks between three pegs following the rule: a larger disk cannot be placed on top of a smaller one. The goal is to move the entire stack from the first peg to the last one.

## Features

- **Custom difficulty** - choose the number of disks (3–10)
- **Timer** - optional countdown timer with configurable time limit
- **Scoreboard** - player statistics persisted in `localStorage`
- **Results screen** - post-game summary with achievements
- **Responsive UI** - works on desktop and mobile screens

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** package manager

### Installation

```bash
git clone <repository-url>
cd hanoitower
npm install
```

### Running in Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## License

This project is licensed under the **MIT License**. See the [LICENSE](https://github.com/DeLinev/HanoiTower/blob/main/LICENSE) file for details.

A full dependency license report is available in `LICENSE_REPORT.md`.

## Privacy Policy

The application includes a GDPR-compliant Privacy Policy. See `PRIVACY_POLICY.md` in the project root for the full document.

## Author

**Denys Linevych**
