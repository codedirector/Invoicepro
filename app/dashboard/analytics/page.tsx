import { authClient } from "@/lib/auth-client"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { AnalyticsClient } from "./AnalyticsClient"

export default async function AnalyticsPage() {
const session = await auth.api.getSession({
     headers: await headers() // you need to pass the headers object.
 })
  if (!session) redirect("/login")

  const userId = session.user.id

  const invoices = await prisma.invoice.findMany({
    where: { userId },
    select: {
      total: true,
      status: true,
      createdAt: true,
    },
  })

  // 📊 Monthly revenue
  const monthlyRevenue = Object.values(
    invoices.reduce((acc:any, inv) => {
      const month = inv.createdAt.toLocaleString("default", {
        month: "short",
        year: "numeric",
      })

      acc[month] ??= { month, revenue: 0 }
      if (inv.status === "PAID") {
        acc[month].revenue += inv.total
      }

      return acc
    }, {})
  )

  const paidCount = invoices.filter(i => i.status === "PAID").length
  const unpaidCount = invoices.filter(i => i.status === "UNPAID").length
const clientRevenue = await prisma.invoice.groupBy({
  by: ["clientId"],
  where: {
    userId,
    status: "PAID",
  },
  _sum: {
    total: true,
  },
})

const clients = await prisma.client.findMany({
  where: { userId },
  select: {
    id: true,
    name: true,
  },
})

// Merge client names with revenue
const clientRevenueData = clientRevenue.map((entry) => {
  const client = clients.find((c) => c.id === entry.clientId)

  return {
    name: client?.name ?? "Unknown",
    revenue: entry._sum.total ?? 0,
  }
})

  return (
    <AnalyticsClient
      monthlyRevenue={monthlyRevenue}
      paidCount={paidCount}
      unpaidCount={unpaidCount}
        clientRevenue={clientRevenueData}
    />
  )
}
