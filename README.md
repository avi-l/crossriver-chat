# 🧠 AI Chat App

A modern, responsive AI chat interface built with **React (Vite + TypeScript)**, **shadcn/ui**, and **Tailwind CSS**, powered by **Groq’s Llama models**.

### ✨ Features

- Persistent chat history (Zustand)
- Markdown rendering with syntax highlighting
- Floating copy button for code blocks
- “Try again” and “Copy” actions for assistant messages
- Dark/light mode + independent color themes (OKLCH variables)
- MSAL authentication integration

---

## 🚀 Tech Stack

- **Framework:** React (Vite + TypeScript)
- **UI Library:** shadcn/ui (Radix + Tailwind)
- **State Management:** Zustand
- **Data-fetching / Mutations:** React Query (tanstack/query)
- **AI Backend:** Groq API (Llama models)
- **Markdown:** react-markdown + rehype-highlight
- **Icons:** lucide-react
- **Styling:** Tailwind CSS with CSS variables (OKLCH-based theme files)
- **Auth:** MSAL (Azure AD)

---

---

## 🧠 Architectural Overview

### Chat Flow

1. User submits message in `Chat.tsx`.
2. Message added to Zustand store (`chatStore`).
3. `useSendMessage` mutation sends payload to **Groq** backend.
4. Response is added to the store and rendered in the UI.
5. Auto-scroll to latest message, markdown rendered with syntax highlighting.
6. Code blocks include copy buttons and assistant messages include “Try again.”

### State Separation

- `chatStore`: messages + input
- `userStore`: avatar + display name
- `ThemeProvider`: mode + color theme (persisted to localStorage)

---

## 🎨 Theming System

- **Mode**: `.light` / `.dark` classes applied to `<html>`
- **Color Theme**: applied via `data-color-theme="blue"` (or `rose`, `emerald`, etc.)
- Each color theme has both light and dark variants defined in `themes.css`
- Tailwind uses these OKLCH-based variables via config mapping

**Example:**

```css
:root[data-color-theme='blue'] {
  --primary: oklch(0.577 0.245 27.325);
  --primary-foreground: oklch(0.971 0.013 17.38);
}

.dark[data-color-theme='blue'] {
  --primary: oklch(0.637 0.237 25.331);
  --primary-foreground: oklch(0.971 0.013 17.38);
}
```

## 🔐 Authentication & Logout

- **MSAL** handles login/logout
- After login → navigate to `/chat`
- **`useLogout` hook:**
  - Calls `instance.logoutPopup()`
  - Clears Zustand stores (`chatStore`, `userStore`)
  - Redirects to `/`

## 🏎️ Running the app

Find the readme instructions in both frontend and backend subdirectories for how to run the app locally
