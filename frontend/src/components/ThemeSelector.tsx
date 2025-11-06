import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check } from 'lucide-react';

const COLOR_THEMES = [
  { name: 'Blue', value: 'blue', color: '#3b82f6' },
  { name: 'Rose', value: 'rose', color: '#f43f5e' },
  { name: 'Green', value: 'green', color: '#5ea500' },
  { name: 'Default', value: 'default', color: '#0f172b' },
];

export const ColorThemePicker = () => {
  const { theme: currentTheme, setTheme } = useTheme(); // theme is a string like 'blue-light' etc.

  const handleChange = (colorTheme: string) => {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    const mode = isDark ? 'dark' : 'light';

    // Keep the dark/light class intact
    html.setAttribute('data-color-theme', colorTheme); // for your CSS variable sets

    // Construct new combined theme name
    const newTheme = `${colorTheme}-${mode}` as any;

    // Only update the stored theme name — don’t reset the class list
    localStorage.setItem('vite-ui-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>🎨 Theme</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-36'>
        {COLOR_THEMES.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            className='flex items-center justify-between'
            onClick={() => handleChange(theme.value)}
          >
            <span className='flex items-center gap-2'>
              <span
                className='w-4 h-4 rounded-full border border-border'
                style={{ backgroundColor: theme.color }}
              />
              {theme.name}
            </span>
            {currentTheme.startsWith(theme.value) && (
              <Check className='w-4 h-4 text-primary' />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
