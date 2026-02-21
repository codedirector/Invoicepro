"use client"

import { useQuery } from "@tanstack/react-query"
import { CreateInvoiceForm } from "@/components/invoices/CreateInvoiceForm"
import { Button } from "@/components/ui/button"
export default function InvoicesPage() {
  const invoicesQuery = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const res = await fetch("/api/invoices")
      return res.json()
    },
  })

  const clientsQuery = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await fetch("/api/clients")
      return res.json()
    },
  })

  if (clientsQuery.isLoading || invoicesQuery.isLoading) return <p>Loading...</p>

  return (
    <div className="p-10 max-w-4xl space-y-8">
      <h1 className="text-2xl font-bold">Invoices</h1>

      <CreateInvoiceForm
        clients={clientsQuery.data}
        onCreated={invoicesQuery.refetch}
      />

      <div className="space-y-3">
        {invoicesQuery.data.map((inv: any) => (
          <div key={inv.id} className="border rounded p-4">
            <p className="font-medium">
              {inv.number} — {inv.client.name}
            </p>
            <p className="text-sm text-muted-foreground">
              ${inv.total} • {inv.status}
            </p>
            <Button
  size="sm"
  variant="outline"
  onClick={async () => {
    await fetch(`/api/invoices/${inv.id}/status`, {
      method: "PATCH",
    })
    invoicesQuery.refetch()
  }}
>
  Mark as {inv.status === "PAID" ? "Unpaid" : "Paid"}
</Button>
<Button
  size="sm"
  variant="outline"
  onClick={async () => {
    await fetch(`/api/invoices/${inv.id}/email`, { method: "POST" })
    alert("Invoice emailed successfully")
  }}
>
  Email Invoice
</Button>


          </div>
          
        ))}
      </div>
    </div>
  )
}
