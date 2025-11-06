import { Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './components/theme-provider';

import { useAccount, useMsal } from '@azure/msal-react';

import Chat from './pages/Chat';
import Landing from './pages/Landing';
import Header from './components/Header';
import Profile from './pages/Profile';

export const App = () => {
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Header />
      {!account ? (
        <Landing />
      ) : (
        <Routes>
          <Route path='/profile' element={<Profile />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/' element={<Landing />} />
        </Routes>
      )}
    </ThemeProvider>
  );
};

export default App;
