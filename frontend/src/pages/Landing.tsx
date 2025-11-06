import { Card, CardContent } from '@/components/ui/card';
import { AuthButton } from '@/components/AuthButton';
import { useAccount, useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const navigate = useNavigate();
  return (
    <div className='min-h-screen flex flex-col bg-background text-foreground'>
      {/* Hero Section */}
      <main className='flex flex-col items-center justify-center flex-1 text-center px-6'>
        <h1 className='text-4xl sm:text-5xl font-bold mb-4'>
          Welcome to <span className='text-primary'>Chat Buddy</span>
        </h1>
        <p className='text-muted-foreground max-w-md mb-8'>
          Chat Buddy lets you have intelligent, context-aware conversations with
          your own AI assistant — powered by the latest LLMs.{' '}
          {!account && 'Sign in to start chatting!'}
        </p>

        <div className='flex flex-col sm:flex-row gap-4'>
          {!account ? (
            <AuthButton />
          ) : (
            <Button onClick={() => navigate('/chat')}>Start Chatting!</Button>
          )}
        </div>
      </main>

      {/* Feature Highlights */}
      <section className='grid sm:grid-cols-3 gap-6 px-6 py-12 border-t border-border bg-muted/30'>
        {[
          {
            title: '🧠 Smart Conversations',
            text: 'Built on top of powerful AI to understand your questions and context.',
          },
          {
            title: '💬 Real-Time Chat',
            text: 'Instant replies with context awareness using state-of-the-art LLMs.',
          },
          {
            title: '🎨 Beautiful UI',
            text: 'Dark/light mode, smooth animations, and modern responsive design.',
          },
        ].map((feature) => (
          <Card key={feature.title}>
            <CardContent className='pt-6 text-center'>
              <h3 className='font-semibold text-lg mb-2'>{feature.title}</h3>
              <p className='text-sm text-muted-foreground'>{feature.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Footer */}
      <footer className='py-4 text-center text-sm text-muted-foreground border-t border-border'>
        © {new Date().getFullYear()} Chat Buddy — Built with ❤️ and TypeScript.
      </footer>
    </div>
  );
};

export default Landing;
