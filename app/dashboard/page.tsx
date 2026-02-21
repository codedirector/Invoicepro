import { redirect } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

export default async function DashboardPage() {
   const session = await auth.api.getSession({
     headers: await headers() // you need to pass the headers object.
 })
  if (!session) redirect("/login")
  //  console.log(session)
  const userId = session.user.id;
const plan=await prisma.user.findUnique({
    where:{id:userId}
   })
  const [clientsCount, invoicesCount, revenue] = await Promise.all([
    prisma.client.count({ where: { userId } }),
    prisma.invoice.count({ where: { userId } }),
    prisma.invoice.aggregate({
      where: { userId, status: "PAID" },
      _sum: { total: true },
    }),
  ])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {session.user.name ?? "there"}
          </h1>
          <p className="text-muted-foreground">
            Here’s what’s happening with your business.
          </p>
        </div>

        <Link href="/dashboard/invoices">
          <Button>Create Invoice</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Clients" value={clientsCount} />
        <StatCard title="Invoices" value={invoicesCount} />
        <StatCard
          title="Revenue"
          value={`$${revenue._sum.total ?? 0}`}
        />
      </div>

      {/* Upgrade Banner */}
      <UpgradeBanner plan={plan?.plan} />

      {/* Recent invoices */}
      <RecentInvoices userId={userId} />
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: number | string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
async function RecentInvoices({ userId }: { userId: string|undefined }) {
  const invoices = await prisma.invoice.findMany({
    where: { userId },
    include: { client: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent invoices</CardTitle>
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No invoices yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {invoices.map((inv) => (
              <li
                key={inv.id}
                className="flex justify-between text-sm"
              >
                <div>
                  <p className="font-medium">{inv.number}</p>
                  <p className="text-muted-foreground">
                    {inv.client.name}
                  </p>
                </div>
                <div className="text-right">
                  <p>${inv.total}</p>
                  <p className="text-muted-foreground">
                    {inv.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
function UpgradeBanner({ plan }: { plan: string |undefined}) {
  if (plan !== "FREE") return null

  return (
    <Card className="border-yellow-300 bg-yellow-50">
      <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
        <div>
          <p className="font-medium">Free plan limit reached soon</p>
          <p className="text-sm text-muted-foreground">
            Upgrade to unlock more clients, invoices, and analytics.
          </p>
        </div>
        <Button className="bg-[#FFD84D] text-black hover:bg-[#F4C430]">
          Upgrade
        </Button>
      </CardContent>
    </Card>
  )
}
