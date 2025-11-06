import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '@/state/chatStore';
import { useUserStore } from '@/state/userStore';

export const useLogout = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const { clearMessages } = useChatStore();
  const { setAvatar, setDisplayName } = useUserStore();

  const logout = async () => {
    try {
      if (accounts.length === 0) return;

      await instance.logoutPopup({
        account: accounts[0],
        postLogoutRedirectUri: window.location.origin,
      });

      // Clear all app state
      clearMessages();
      setAvatar(null);
      setDisplayName('');

      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return logout;
};
