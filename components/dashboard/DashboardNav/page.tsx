"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function DashboardNav({ user }: any) {
  const router = useRouter()

  async function logout() {
    await authClient.signOut()
    router.replace("/login")
  }

  return (
    <aside className="w-64 border-r bg-background p-6 flex flex-col">
      <div className="mb-10">
        <h2 className="text-xl font-bold">InvoicePro</h2>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>

      <nav className="flex flex-col gap-2 gap-y-3 text-sm">
        <a href="/dashboard">Dashboard</a>
        <a href="/dashboard/clients">Clients</a>
        <a href="/dashboard/invoices">Invoices</a>
        <a href="/dashboard/analytics">Analytics</a>
      </nav>

      <div className="mt-auto">
        <Button variant="outline" className="w-full" onClick={logout}>
          Logout
        </Button>
      </div>
    </aside>
  )
}
