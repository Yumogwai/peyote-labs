import { z } from 'zod'

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(1000),
})

export const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(10),
})

const plainText = z.string().trim().min(1).max(1200).refine((value) => !/[<>]/.test(value), {
  message: 'HTML-like characters are not allowed.',
})

export const chatReplySchema = z.object({
  answer: plainText,
  detectedNeed: z
    .enum(['Website', 'SEO', 'Audit', 'Creatives', 'Ads', 'Product partnership', 'Other'])
    .nullable(),
  shouldHandoff: z.boolean(),
  handoffSummary: z
    .string()
    .trim()
    .max(500)
    .refine((value) => !/[<>]/.test(value), { message: 'HTML-like characters are not allowed.' })
    .nullable(),
})

export type ChatRequest = z.infer<typeof chatRequestSchema>
export type ChatReply = z.infer<typeof chatReplySchema>
