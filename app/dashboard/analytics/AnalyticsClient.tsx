"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
   BarChart,
  Bar,
  Cell,
} from "recharts"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

export function AnalyticsClient({
  monthlyRevenue,
  paidCount,
  unpaidCount,
  clientRevenue,
}: {
  monthlyRevenue: { month: string; revenue: number }[]
  paidCount: number
  unpaidCount: number
  clientRevenue: { name: string; revenue: number }[]
}) 
 {
  const pieData = [
    { name: "Paid", value: paidCount },
    { name: "Unpaid", value: unpaidCount },
  ]

  const COLORS = ["#22c55e", "#facc15"]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="status">Invoice Status</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>

        </TabsList>

        {/* 📊 Revenue */}
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#22c55e"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 🥧 Status */}
        <TabsContent value="status">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Invoice Status</CardTitle>
            </CardHeader>
            <CardContent className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="clients">
  <Card>
    <CardHeader>
      <CardTitle>Revenue by Client</CardTitle>
    </CardHeader>

    <CardContent className="h-[360px]">
      {clientRevenue.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No paid invoices yet.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={clientRevenue}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="revenue"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </CardContent>
  </Card>
</TabsContent>

      </Tabs>
    </div>
  )
}
