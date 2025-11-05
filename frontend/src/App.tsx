import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Chat from './pages/Chat';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/ModeToggle';
import { AuthButton } from './components/AuthButton';

import { useAccount, useMsal } from '@azure/msal-react';
import { Profile } from './components/Profile';
import Chat from './pages/Chat';

export const App = () => {
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <ModeToggle />
      <AuthButton />
      {!account ? (
        <div>Please Log In</div>
      ) : (
        <Routes>
          <Route path='/profile' element={<Profile />} />
          {/* <Route path="/" element={<Home />} />*/}
          <Route path='/chat' element={<Chat />} />
        </Routes>
      )}
    </ThemeProvider>
  );
};

export default App;
