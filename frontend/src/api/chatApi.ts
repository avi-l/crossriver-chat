import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import axios from 'axios';

const ChatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string().min(1),
    })
  ),
  model: z.string().optional(),
});

type TChatRequest = z.infer<typeof ChatRequestSchema>;
type TChatMessage = {
  id: string;
  role: 'assistant';
  content: string;
};

export const useSendMessage = () =>
  useMutation<TChatMessage, Error, TChatRequest>({
    mutationFn: async (data) => {
      const validated = ChatRequestSchema.parse(data);
      try {
        const response = await axios.post('/api/chat', validated, {
          headers: { 'Content-Type': 'application/json' },
        });

        const reply = response.data;

        return {
          id: crypto.randomUUID(),
          role: 'assistant' as const,
          content: reply.content,
        };
      } catch (error: any) {
        console.error(
          'Error sending message:',
          error.response || error.message
        );
        throw new Error(
          error.response?.data?.error || 'Failed to fetch AI response'
        );
      }
    },
  });
