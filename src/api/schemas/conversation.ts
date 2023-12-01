import { z } from 'zod';

export const MessageSchema = z.object({
  _id: z.number(),
  message: z.string(),
  position: z.string()
});

export const ConversationSchema = z.object({
  _id: z.number(),
  messages: MessageSchema.array()
});

export type Conversation = z.infer<typeof ConversationSchema>;

export type Message = z.infer<typeof MessageSchema>;
