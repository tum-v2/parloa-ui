import { z } from 'zod';
import { Position } from '@/components/chat-bubble/ChatBubble';

const BasicMessageSchema = z.object({
  _id: z.string(),
  sender: z.string(),
  text: z.string(),
  type: z.string(),
  timestamp: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number()
});

const ToolInputSchema = z
  .union([z.object({}).passthrough(), z.null()])
  .optional();

const MessageSchema = BasicMessageSchema.extend({
  intermediateMsg: z.string().optional().nullable(),
  action: z.string().optional().nullable(),
  toolInput: ToolInputSchema
});

const DisplayedMessageSchema = z.object({
  _id: z.string(),
  message: z.string(),
  position: z.nativeEnum(Position)
});

export const ConversationSchema = z.object({
  _id: z.string(),
  messages: MessageSchema.array(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  status: z.string(),
  usedEndpoints: z.string().array(),
  __v: z.number()
});

export type Conversation = z.infer<typeof ConversationSchema>;

export type Message = z.infer<typeof MessageSchema>;

export type DisplayedMessage = z.infer<typeof DisplayedMessageSchema>;
