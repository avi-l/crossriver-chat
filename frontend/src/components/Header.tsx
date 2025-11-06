import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/state/userStore';
import { ModeToggle } from '@/components/ModeToggle';
import { AuthButton } from '@/components/AuthButton';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useMsal } from '@azure/msal-react';
import { useLogout } from '@/hooks/useLogout';

const Header = () => {
  const navigate = useNavigate();
  const { avatar, displayName } = useUserStore();
  const { accounts } = useMsal();
  const logout = useLogout();
  const isAuthenticated = accounts.length > 0;

  return (
    <header className='flex justify-between items-center w-full px-6 py-4 border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50'>
      {/* Logo */}
      <div
        className='flex items-center gap-2 cursor-pointer'
        onClick={() => navigate('/')}
      >
        <MessageCircle className='w-6 h-6 text-primary' />
        <span className='font-bold text-lg'>Chat Buddy</span>
      </div>

      {/* Right side controls */}
      <div className='flex items-center gap-4'>
        {/* Dropdown Menu for User */}
        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='flex items-center gap-2 cursor-pointer select-none'>
                <div className='w-10 h-10 rounded-full overflow-hidden border border-border'>
                  {avatar ? (
                    <img
                      src={avatar}
                      alt='Profile'
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center bg-muted text-muted-foreground font-semibold'>
                      {displayName?.[0] || '?'}
                    </div>
                  )}
                </div>
                <span className='hidden sm:inline font-medium'>
                  {displayName}
                </span>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/chat')}>
                Chat
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
