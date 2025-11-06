import { useMsal } from '@azure/msal-react';
import { Button } from './ui/button';
import { loginRequest } from '@/auth/authConfig';
import { useNavigate } from 'react-router-dom';

export const AuthButton = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const isAuthenticated = accounts.length > 0;

  const handleLogin = async () => {
    try {
      const result = await instance.loginPopup(loginRequest);
      if (result.account) {
        navigate('/chat');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await instance.logoutPopup({
        account: accounts[0],
        postLogoutRedirectUri: window.location.origin,
      });
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button
      type='button'
      onClick={isAuthenticated ? handleLogout : handleLogin}
    >
      {isAuthenticated ? 'Sign Out' : 'Sign In'}
    </Button>
  );
};
