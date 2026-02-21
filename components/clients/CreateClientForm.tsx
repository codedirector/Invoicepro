"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { clientSchema, ClientInput } from "@/lib/validators/client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { UpgradeModal } from "../UpgradeModal"

export function CreateClientForm({
  onCreated,
}: {
  onCreated: () => void
}) {
  const form = useForm<ClientInput>({
    resolver: zodResolver(clientSchema),
  })

  const [showUpgrade, setShowUpgrade] = useState(false)

  async function onSubmit(values: ClientInput) {
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    if (res.ok) {
      form.reset()
      onCreated()
      return
    }

    const err = await res.json()
    if (res.status === 403) {
      setShowUpgrade(true)
    } else {
      alert(err.error)
    }
  }

  return (
    <>
      {showUpgrade && (
        <UpgradeModal
          open={showUpgrade}
          onClose={() => setShowUpgrade(false)}
        />
      )}

      {!showUpgrade && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <input
            placeholder="Client name"
            {...form.register("name")}
            className="border rounded px-3 py-2 w-full"
          />

          <input
            placeholder="Email"
            {...form.register("email")}
            className="border rounded px-3 py-2 w-full"
          />

          <input
            placeholder="Company"
            {...form.register("company")}
            className="border rounded px-3 py-2 w-full"
          />

          <Button type="submit">Add client</Button>
        </form>
      )}
    </>
  )
}
