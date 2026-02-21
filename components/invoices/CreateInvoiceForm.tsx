"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"

export function CreateInvoiceForm({ clients, onCreated }: any) {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      clientId: "",
      items: [{ name: "", quantity: 1, price: 0 }],
    },
  })

  const { fields, append } = useFieldArray({
    control,
    name: "items",
  })

  async function onSubmit(values: any) {
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    if (res.ok) onCreated()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <select {...register("clientId")} className="border p-2 rounded w-full">
        <option value="">Select client</option>
        {clients.map((c: any) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {fields.map((_, i) => (
        <div key={i} className="flex gap-2">
          <input {...register(`items.${i}.name`)} placeholder="Item" className="border p-2 rounded w-full" />
          <input type="number" {...register(`items.${i}.quantity`)} className="border p-2 rounded w-20" />
          <input type="number" {...register(`items.${i}.price`)} className="border p-2 rounded w-24" />
        </div>
      ))}

      <Button type="button" variant="outline" onClick={() => append({ name: "", quantity: 1, price: 0 })}>
        Add item
      </Button>

      <Button type="submit">Create invoice</Button>
    </form>
  )
}
