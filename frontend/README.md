# 🧠 Chat Buddy — Frontend

This is the **frontend** for Chat Buddy — a context-aware AI chat app powered by the latest LLMs.  
It uses **React**, **Vite**, **TypeScript**, **Zustand**, and **ShadCN UI** with MSAL authentication.

---

## 🚀 Getting Started (Local Development)

### 1️⃣ Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- [npm](https://www.npmjs.com/) (comes with Node)
- MSAL: Your MSAL client and tenant ids from your Azure account

---

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the **frontend** root with the following values:

```env
VITE_API_URL=http://localhost:3000/api
VITE_MSAL_CLIENT_ID=your-azure-client-id
VITE_MSAL_TENANT_ID=your-tenant-id
```

Example tenant id:

```env
 VITE_MSAL_TENANT_ID=https://login.microsoftonline.com/consumers
```

### 4️⃣ Run the App

```bash
npm run dev
```

The frontend should now be available at:

```bash
http://localhost:5173
```
