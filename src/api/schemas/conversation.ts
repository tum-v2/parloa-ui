import { z } from 'zod';

export const MessageSchema = z.object({
  sender: z.enum(['AGENT', 'USER']),
  text: z.string(),
  timestamp: z.string().datetime(),
  userCanReply: z.boolean()
});

export const ConversationSchema = z.object({
  _id: z.string(),
  messages: MessageSchema.array(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  status: z.string()
});

export type Conversation = z.infer<typeof ConversationSchema>;

export type Message = z.infer<typeof MessageSchema>;
