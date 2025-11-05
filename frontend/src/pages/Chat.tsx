import { useChatStore, type IChatMessage } from '../state/chatStore';
import { useSendMessage } from '../api/chatApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

const MAX_HISTORY = 10;

const Chat = () => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const { messages, input, setInput, addMessage, clearMessages } =
    useChatStore();
  const sendMessage = useSendMessage();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: IChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
    };

    addMessage(userMessage);
    setInput('');

    // Take the last MAX_HISTORY messages from the store
    const recentMessages = messages.slice(-MAX_HISTORY);

    const messagesToSend = [
      { role: 'system' as const, content: 'You are a helpful AI assistant.' },
      ...recentMessages.map((m) => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content,
      })),
      { role: 'user' as const, content: userMessage.content },
    ];

    sendMessage.mutate(
      { messages: messagesToSend, model: 'llama-3.3-70b-versatile' },
      { onSuccess: (response) => addMessage(response) }
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
            {messages.length === 0 ? (
              <div className='text-sm text-muted-foreground'>
                💬 Start the conversation by typing a message below.
              </div>
            ) : (
              messages.map((msg) => (
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
              ))
            )}
            {sendMessage.isPending && (
              <div className='flex justify-start items-center text-sm text-muted-foreground'>
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                AI is typing...
              </div>
            )}
            <div ref={chatEndRef} />
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant='destructive'
                  className='flex items-center gap-1'
                >
                  <Trash2 />
                  Clear
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Chat?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove all messages and the AI will forget the
                    conversation.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className='flex justify-end gap-2 mt-4'>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearMessages}>
                    Confirm
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
