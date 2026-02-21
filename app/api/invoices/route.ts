import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {  const session = await auth.api.getSession({
     headers: await headers() // you need to pass the headers object.
 })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // console.log(session.user)
  const invoices = await prisma.invoice.findMany({
    where: { userId: session.user.id },
    include: { client: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(invoices)
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({
     headers: await headers() // you need to pass the headers object.
 })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
    const items = body.items.map((item: any) => ({
  ...item,
  quantity: parseInt(item.quantity, 10), // Int
  price: parseFloat(item.price),         // Float
}));

  const total = body.items.reduce(
    (sum: number, item: any) => sum + item.quantity * item.price,
    0
  )

  const invoice = await prisma.invoice.create({
    data: {
      number: `INV-${Date.now()}`,
      total,
      userId: session.user.id,
      clientId: body.clientId,
      items: {
        create: items,
      },
    },
  })

  return NextResponse.json(invoice)
}
