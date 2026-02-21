export const dynamic = "force-dynamic"

import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/dashboard/DashboardNav/page"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await authClient.getSession()

  if (!session) redirect("/login")

  return (
    <div className="min-h-screen bg-muted/40 flex">
      <DashboardNav user={session.data?.user} />
      <main className="flex-1 p-10">{children}</main>
    </div>
  )
}