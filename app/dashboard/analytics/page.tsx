import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { AnalyticsClient } from "./AnalyticsClient"


type MonthlyRevenue = {
  month: string
  revenue: number
}

type ClientRevenue = {
  name: string
  revenue: number
}

export default async function AnalyticsPage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) redirect("/login")

  const userId = session.user.id

  const invoices = await prisma.invoice.findMany({
    where: { userId },
    select: {
      total: true,
      status: true,
      createdAt: true,
      clientId: true,
    },
  })

  
  const monthlyRevenue: MonthlyRevenue[] = Object.values(
    invoices.reduce<Record<string, MonthlyRevenue>>((acc, inv) => {
      const month = inv.createdAt.toLocaleString("default", {
        month: "short",
        year: "numeric",
      })

      if (!acc[month]) {
        acc[month] = { month, revenue: 0 }
      }

      if (inv.status === "PAID") {
        acc[month].revenue += inv.total
      }

      return acc
    }, {})
  )

  // Count paid and unpaid invoices
  const paidCount = invoices.filter((i) => i.status === "PAID").length
  const unpaidCount = invoices.filter((i) => i.status === "UNPAID").length

  // Aggregate revenue by client
  const clientRevenueRaw = await prisma.invoice.groupBy({
    by: ["clientId"],
    where: {
      userId,
      status: "PAID",
    },
    _sum: {
      total: true,
    },
  })

  // Fetch client names
  const clients = await prisma.client.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
    },
  })

  // Merge client names with revenue
  const clientRevenueData: ClientRevenue[] = clientRevenueRaw.map((entry) => {
    const client = clients.find((c) => c.id === entry.clientId)
    return {
      name: client?.name ?? "Unknown",
      revenue: entry._sum.total ?? 0,
    }
  })

  // Render analytics component
  return (
    <AnalyticsClient
      monthlyRevenue={monthlyRevenue}
      paidCount={paidCount}
      unpaidCount={unpaidCount}
      clientRevenue={clientRevenueData}
    />
  )
}