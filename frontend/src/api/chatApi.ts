import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import axios from 'axios';
import { extractChartPayload } from '@/utils/chartParser';
import type { ChartPayload } from '@/types/chart';

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
  chart?: ChartPayload;
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

        const { text, chart } = extractChartPayload(reply.content);

        return {
          id: crypto.randomUUID(),
          role: 'assistant' as const,
          content: text,
          chart,
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
