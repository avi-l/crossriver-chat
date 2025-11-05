import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Chat from './pages/Chat';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/ModeToggle';
import { LoginButton } from './components/LoginButton';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ModeToggle />
      <LoginButton />
      <Routes>
        {/* <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} /> */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
