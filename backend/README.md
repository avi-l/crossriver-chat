# Backend - Chat API

This is the backend for the Chat Buddy app. It provides an API endpoint to interact with the Groq AI API for chat completions.

---

## Requirements

- Node.js >= 20
- npm

---

## Setup

1. Clone the repository (if not already):

```bash
git clone <your-repo-url>
cd <backend-folder>
```

2. Install Dependencies:

```bash
npm install
```

3. Create a .env file in the root of the backend with the following:

```bash
PORT=3000
GROQ_API_KEY=your-groq-api-key
```

## Running Locally

Start the backend server

```bash
npx ts-node index.ts
```

Or better if you have nodemon, use it!

```bash
nodemon start
```
