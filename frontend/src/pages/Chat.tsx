import { useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Trash2, Copy, RefreshCw } from 'lucide-react';
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

import { useChatStore, type IChatMessage } from '../state/chatStore';
import { useSendMessage } from '../api/chatApi';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { useTheme } from '@/components/theme-provider';
import { ChartBlock } from '@/components/chat/ChartBlock';

const SYSTEM_PROMPT =
  'You are a helpful AI assistant that can explain concepts clearly. When a user asks for a data visualization, respond with normal Markdown plus a chart block using this format: ```chart { "type": "line" | "bar" | "pie" | "doughnut", "title": "optional title", "data": { "labels": ["Label 1"], "datasets": [{ "label": "Series A", "data": [100], "backgroundColor": "#93c5fd" }] } } ```. The JSON must be valid and include labels and numeric data arrays. If no chart is required, skip the chart block.';

const MAX_HISTORY = 10;

const Chat = () => {
  const { theme } = useTheme(); // 'light' | 'dark'
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const { messages, input, setInput, addMessage, clearMessages } =
    useChatStore();
  const sendMessage = useSendMessage();

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const head = document.head;
    let link = document.getElementById('hljs-theme') as HTMLLinkElement;

    if (!link) {
      link = document.createElement('link');
      link.id = 'hljs-theme';
      link.rel = 'stylesheet';
      head.appendChild(link);
    }

    link.href = theme === 'dark' ? '/hljs/github-dark.css' : '/hljs/github.css';
  }, [theme]);

  // Build payload for AI
  const buildMessagesToSend = (userContent: string) => {
    const recentMessages = messages.slice(-MAX_HISTORY);
    return [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...recentMessages.map((m) => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content,
      })),
      { role: 'user' as const, content: userContent },
    ];
  };

  // Send a message to AI
  const sendUserMessage = (userMessage: IChatMessage) => {
    addMessage(userMessage);

    sendMessage.mutate(
      {
        messages: buildMessagesToSend(userMessage.content),
        model: 'llama-3.3-70b-versatile',
      },
      { onSuccess: (response) => addMessage(response) }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: IChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
    };

    setInput('');
    sendUserMessage(userMessage);
  };

  const handleTryAgain = (assistantMsg: IChatMessage) => {
    // Find the last user message before this AI response
    const aiIndex = messages.findIndex((m) => m.id === assistantMsg.id);
    if (aiIndex === -1) return;

    const lastUserMsg = [...messages]
      .slice(0, aiIndex)
      .reverse()
      .find((m) => m.role === 'user');

    if (!lastUserMsg) return;

    // Send a new message using the content from the original user message
    sendUserMessage({ ...lastUserMsg, id: crypto.randomUUID() });
  };

  return (
    <div className='flex h-[calc(100vh-4rem)] justify-center items-center p-4'>
      <Card className='w-full max-w-5xl h-full flex flex-col'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>
            Chat with your AI Buddy!
          </CardTitle>
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
                  className={`flex mb-3 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`group relative prose p-3 rounded-lg w-[90%] ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground max-w-[80%]'
                        : 'bg-muted text-muted-foreground mb-6'
                    }`}
                  >
                    <div className={`prose ${theme === 'dark' ? 'dark' : ''}`}>
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                    {msg.chart && <ChartBlock payload={msg.chart} />}

                    {/* AI bubble actions */}
                    {msg.role === 'assistant' && (
                      <div className='absolute top-full mt-1 left-2 flex gap-2'>
                        <button
                          className='p-1 hover:bg-muted/50 rounded'
                          onClick={() =>
                            navigator.clipboard.writeText(msg.content)
                          }
                          title='Copy'
                        >
                          <Copy className='w-4 h-4' />
                        </button>

                        <button
                          className='p-1 hover:bg-muted/50 rounded'
                          onClick={() => handleTryAgain(msg)}
                          title='Try Again'
                        >
                          <RefreshCw className='w-4 h-4' />
                        </button>
                      </div>
                    )}
                  </div>
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
