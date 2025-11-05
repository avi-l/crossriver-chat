import type { FormEvent } from 'react';
import { useChatStore } from '../state/chatStore';
import { useSendMessage } from '../api/chatApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

const Chat = () => {
  const { messages, input, setInput, addMessage } = useChatStore();
  const sendMessage = useSendMessage();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user' as const,
      content: input.trim(),
    };

    addMessage(userMessage);
    setInput('');

    sendMessage.mutate(
      { message: userMessage.content },
      {
        onSuccess: (response) => addMessage(response),
      }
    );
  };

  return (
    <div className='flex h-[calc(100vh-4rem)] justify-center items-center p-4'>
      <Card className='w-full max-w-2xl h-full flex flex-col'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>Chat with AI</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col flex-1 overflow-hidden'>
          <ScrollArea className='flex-1 pr-2 mb-3 space-y-3'>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-[80%] mb-3 ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground self-end ml-auto'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {msg.content}
              </div>
            ))}

            {sendMessage.isPending && (
              <div className='flex justify-start items-center text-sm text-muted-foreground'>
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                AI is typing...
              </div>
            )}
          </ScrollArea>

          <form onSubmit={handleSubmit} className='flex space-x-2'>
            <Input
              placeholder='Type a message...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type='submit' disabled={sendMessage.isPending}>
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
