import { z } from 'zod'

const safeText = z
  .string()
  .trim()
  .min(1)
  .max(1000)
  .refine((value) => !/[<>]/.test(value), { message: 'HTML-like characters are not allowed.' })
  .refine((value) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value), {
    message: 'Control characters are not allowed.',
  })
  .refine((value) => !/javascript:/i.test(value), { message: 'Unsafe content is not allowed.' })

export const chatRequestSchema = z
  .object({
    message: safeText.optional(),
    messages: z
      .array(
        z.object({
          role: z.literal('user'),
          content: safeText,
        }),
      )
      .max(1)
      .optional(),
  })
  .refine((value) => Boolean(value.message) || Boolean(value.messages?.length), {
    message: 'A single message is required.',
  })
  .transform((value) => value.message ?? value.messages![0].content)

const plainText = z
  .string()
  .trim()
  .min(1)
  .max(1200)
  .refine((value) => !/[<>]/.test(value), {
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
