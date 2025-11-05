import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

const ChatRequestSchema = z.object({
  message: z.string().min(1),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;

export const useSendMessage = () =>
  useMutation({
    mutationFn: async (data: z.infer<typeof ChatRequestSchema>) => {
      const validated = ChatRequestSchema.parse(data);

      console.log('Sending to backend:', validated); // <-- debug

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!response.ok) throw new Error('Failed to fetch AI response');

      const reply = await response.json();

      return {
        id: crypto.randomUUID(),
        role: 'assistant' as const,
        content: reply.content,
      };
    },
  });
