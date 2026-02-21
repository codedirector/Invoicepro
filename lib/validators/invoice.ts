import { z } from "zod"

export const invoiceSchema = z.object({
  clientId: z.string(),
  items: z.array(
    z.object({
      name: z.string().min(1),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ).min(1),
})

export type InvoiceInput = z.infer<typeof invoiceSchema>
