import { ModeToggle } from '@/components/ModeToggle';
import { AuthButton } from '@/components/AuthButton';
import { MessageCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className='flex justify-between items-center w-full px-6 py-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50'>
      <div className='flex items-center gap-2'>
        <MessageCircle className='w-6 h-6 text-primary' />
        <span className='font-bold text-lg'>Chat Buddy</span>
      </div>

      <div className='flex items-center gap-2'>
        <ModeToggle />
        <AuthButton />
      </div>
    </header>
  );
};

export default Header;
