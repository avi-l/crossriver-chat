import { loginRequest } from '@/auth/msalConfig';
import { useMsal } from '@azure/msal-react';
import { Button } from './ui/button';

export const LoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
  };

  return <Button onClick={handleLogin}>Login with Microsoft</Button>;
};
