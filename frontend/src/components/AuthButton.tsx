import { useMsal } from '@azure/msal-react';
import { Button } from './ui/button';
import { loginRequest } from '@/auth/authConfig';

export const AuthButton = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
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
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button onClick={isAuthenticated ? handleLogout : handleLogin}>
      {isAuthenticated ? 'Sign Out' : 'Sign In'}
    </Button>
  );
};
