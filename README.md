<div align="center">

  <h1>ProAct-IT</h1>
  
  <p>
    <strong>A modern, proactive web application scaffold.</strong>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      <img src="https://img.shields.io/badge/Vite-B73C92?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    </a>
    <a href="https://react.dev/" target="_blank">
      <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
    <a href="https://tailwindcss.com/" target="_blank">
      <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    </a>
    <a href="https://supabase.com/" target="_blank">
      <img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E" alt="Supabase" />
    </a>
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#project-structure">Structure</a> •
    <a href="#deployment">Deployment</a>
  </p>

</div>

---

## 📖 About The Project

**ProAct-IT** is a robust web application built for performance and scalability. It leverages the speed of Vite with the type safety of TypeScript and React. The UI is crafted using **shadcn-ui** components styled with Tailwind CSS, ensuring a modern, accessible, and responsive design.

The backend is powered by **Supabase**, providing instant APIs, authentication, and real-time database capabilities out of the box.

## ✨ Features

- ⚡ **Lightning Fast:** Powered by Vite for instant server start and hot module replacement (HMR).
- 🛡️ **Type Safe:** Built with TypeScript for better developer experience and fewer runtime errors.
- 🎨 **Modern UI:** Utility-first styling with Tailwind CSS and accessible components via shadcn-ui.
- 🔐 **Backend Ready:** Integrated Supabase client for Authentication, Database, and Storage.
- 🛠️ **Developer Friendly:** Pre-configured with ESLint, PostCSS, and robust routing.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Core** | React 18, TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS, PostCSS |
| **Components** | shadcn-ui, Lucide React (Icons) |
| **Backend / DB** | Supabase |
| **Package Manager** | npm / bun |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* **Node.js** (v18 or higher)
* **npm** or **Bun**

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/ProAct-IT.git](https://github.com/your-username/ProAct-IT.git)
    cd ProAct-IT
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or if using bun
    bun install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory. You can duplicate the example file if it exists, or add the following keys:
    
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Start the development server**
    ```bash
    npm run dev
    # or
    bun dev
    ```

5.  Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## 📂 Project Structure

```text
ProAct-IT/
├── public/              # Static assets (favicons, robots.txt)
├── src/
│   ├── components/      # Reusable UI components (shadcn-ui)
│   ├── lib/             # Utility functions (supabase client, utils)
│   ├── pages/           # Page-level components/routes
│   ├── styles/          # Global styles (globals.css)
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── supabase/            # Supabase config and type definitions
├── .env                 # Environment variables (do not commit)
├── components.json      # shadcn-ui configuration
├── tailwind.config.ts   # Tailwind configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Project dependencies and scripts
