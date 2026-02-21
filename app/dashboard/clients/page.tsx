"use client"

import { useQuery } from "@tanstack/react-query"
import { CreateClientForm } from "@/components/clients/CreateClientForm"

export default function ClientsPage() {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await fetch("/api/clients")
      return res.json()
    },
  })

  return (
    <div className="p-10 max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">Clients</h1>

      <CreateClientForm onCreated={refetch} />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {data?.map((c: any) => (
            <li key={c.id} className="border rounded p-3">
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-muted-foreground">{c.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
