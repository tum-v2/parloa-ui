import { z } from 'zod';
import { AgentSchema } from './agent';

export const MessageSchema = z.object({
  _id: z.string(),
  sender: AgentSchema,
  text: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const ConversationSchema = z.object({
  _id: z.string(),
  messages: MessageSchema.array(),
  startTime: z.string(),
  status: z.string(),
  usedEndpoints: z.array(z.string())
});

export type Conversation = z.infer<typeof ConversationSchema>;

export type Message = z.infer<typeof MessageSchema>;
