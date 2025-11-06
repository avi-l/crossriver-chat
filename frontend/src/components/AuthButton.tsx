import { useMsal } from '@azure/msal-react';
import { Button } from './ui/button';
import { loginRequest } from '@/auth/authConfig';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '@/hooks/useLogout';

export const AuthButton = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const isAuthenticated = accounts.length > 0;

  const logout = useLogout();
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

  return (
    <Button type='button' onClick={isAuthenticated ? logout : handleLogin}>
      {isAuthenticated ? 'Sign Out' : 'Sign In'}
    </Button>
  );
};
