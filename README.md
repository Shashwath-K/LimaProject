# Lima Intro Animation

A **dynamic and visually engaging introductory loading screen** for a React web application. Designed to precede the main content, it showcases an animated transformation of the **"Lima" logo**, leaving a polished and memorable first impression.

---

## ✨ Features

- **Dynamic Logo Introduction**  
  Multi-stage animation introduces the "Lima" logo, where abstract energy elements coalesce into the final form.

- **Precise SVG Path Drawing**  
  Each letter is rendered using SVG path animations, producing a clean, professional drawing effect.

- **"Red Bull Commercial"-Style Background**  
  Energetic, abstract geometric shapes continuously animate in the background for a high-production feel.

- **Clean Aesthetic**  
  A minimalist white background with black elements keeps the animation crisp and modern.

- **Smooth Transitions**  
  Seamlessly choreographed animations using **Framer Motion** provide fluid entrance and exit sequences.

- **Configurable Duration**  
  The total animation time can be adjusted easily to fit different use cases.

---

## 🛠️ Technologies Used

- **React** – For building the UI components
- **Framer Motion** – Animation library for declarative motion
- **Tailwind CSS** – Utility-first CSS for layout and styling
- **SVG** – Used for rendering the scalable, path-based logo

---

## ⚙️ Setup Instructions

### 1. Clone or Copy the Component

If this is part of a larger React project, simply integrate the `WelcomeLoader.jsx` file.

### 2. Install Dependencies

```bash
npm install react react-dom framer-motion react-router-dom
```

If Tailwind CSS isn't already set up:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Make sure your `tailwind.config.js` is configured to scan your JSX files:

```js
content: [
  "./src/**/*.{js,jsx,ts,tsx}",
],
```

### 3. Add Dummy Background Image

Create a `public/` directory in your project root (if it doesn’t exist), and place a file named:

```
public/dummy-bg.png
```

> 🔹 _This image is used for subtle motion effects. You can remove it by deleting the `motion.img` element in `WelcomeLoader.jsx`._

### 4. Integrate the Loader

In your main application file (e.g., `App.jsx`), render the loader on first load.

#### 🧩 Example `App.jsx`

```jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import WelcomeLoader from "./WelcomeLoader";
import HomePage from "./HomePage";

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {showLoader ? (
          <WelcomeLoader key="loader" />
        ) : (
          <Routes key="content">
            <Route path="/" element={<HomePage />} />
            {/* Add additional routes here */}
          </Routes>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
```

### 5. Start the Development Server

```bash
npm start
```

---

## 🧪 Usage

The `WelcomeLoader` component is designed as a **standalone, full-screen animation** to be displayed before your main app loads. It uses a `useEffect` hook internally to trigger automatic navigation after a set duration.

---

## 🎛️ Customization

### ⏱️ Animation Timings

Modify the **delay** and **duration** values in the Framer Motion `variants` to control the pace of the sequence.

### ✏️ Logo Paths

Replace the `limaLogoPaths` array with your **exact SVG path data** for a precise reproduction of your brand/logo.

### 🌌 Energy Elements

Edit the `energyPaths` and associated `motion.path` elements to customize the abstract introductory motion.

### 🌀 Background Shapes

Control the background energy effect by adjusting `abstractShapeVariants` and their shape properties (number, size, motion).

### 🖼️ Dummy Background Image

Swap `dummy-bg.png` with your own asset — or remove it if you don’t need a background image.

### 🎨 Colors

Use Tailwind utility classes to modify colors:

```html
bg-white text-black stroke="black" fill="black"
```

---

## 📌 Notes

```css
@media print {
  .ms-editor-squiggler {
    display: none !important;
  }
}
.ms-editor-squiggler {
  all: initial;
  display: block !important;
  height: 0px !important;
  width: 0px !important;
}
```
