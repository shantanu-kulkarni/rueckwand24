# Rueckwand 24 Online Task

A modern minimalist configuration layout inspired by Apple's product page and built with **React** and **Tailwind CSS**.  

---

## Features

- Minimalist UI: Rounded corners, subtle shadows, clean typography, and beautiful animations.
- Responsive Design: Works perfectly on desktop and mobile.
- Draggable Circles: Mark custom points on the image, drag to reposition, and prevent overlaps.
- Sidebar Configuration:
  - Dimensions: Edit X/Y for each point, add/remove points, and see live mapping.
  - Material Selection: Choose from premium materials, with badges and selection animation.
  - Submit: Review your configuration and see a summary table.
  - Toasts & Feedback: Get instant feedback for errors and successful actions.
  - Accessible & Intuitive: Keyboard-friendly, clear focus states, and easy to use.

----

## Demo

> **[Live Demo](https://rueckwand24.vercel.app/)**  
Deployed on Vercel with automated deployments from the main branch

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone [https://github.com/your-username/kitchen-backwall-configurator.git](https://github.com/shantanu-kulkarni/rueckwand24.git)
cd rueckwand24
```

### 2. Install dependencies

```bash
npm install --force or npm install --legacy-peer-deps
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

---

## Project Structure

```
src/
  components/         # Reusable UI components (buttons, cards, tooltips, etc.)
  features/
    image/            # Image canvas and draggable circles
    sidebar/          # Sidebar with dimensions, materials, and submit
  layout/             # Main layout
  assets/             # Images and static assets
  index.css           # Global styles (Tailwind)
```

---

## Tech Stack

- **React** (with hooks)
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui** (for beautiful, accessible UI primitives)
- **Lucide Icons**

---

## Screenshots

> ![image](https://github.com/user-attachments/assets/49d86d57-6117-4a88-9822-6eda895723a5)

---

## Requirements Met

- Apple-inspired, modern, responsive UI
- Draggable, non-overlapping circles on image
- Sidebar with step-by-step configuration
- Material selection with animation
- Submit with a summary and toasts
- Fully responsive and accessible

---

## Deployment

The application is currently deployed on [Vercel](https://vercel.com/), where I have set an automated pipeline which triggers deployment as soon as the dev branch is merged into the main.

---

## Contact

In case of any issues regarding this repository, please contact shantanukulkarni73@gmail.com 

## License

MIT
