import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

const FREE_CLIENT_LIMIT = 5

export async function GET() {
  const requestHeaders = await headers()
  const session = await auth.api.getSession({
    headers: requestHeaders,
  })

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const clients = await prisma.client.findMany({
    where: {
      userId: session.user.id, // 🔒 tenant isolation
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(clients)
}

export async function POST(req: Request) {
   const requestHeaders = await headers()
  const session = await auth.api.getSession({
    headers: requestHeaders,
  })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const userId = session.user.id
  const plan= await prisma.user.findFirst({
    where:{id:userId},
  })
  // 🔒 Enforce plan limit on server
  if ( plan?.plan=== "FREE") {
    const count = await prisma.client.count({
      where: { userId },
    })

    if (count >= FREE_CLIENT_LIMIT) {
      return NextResponse.json(
        { error: "Free plan allows only 5 clients" },
        { status: 403 }
      )
    }
  }

  const client = await prisma.client.create({
    data: {
      name: body.name,
      email: body.email,
      company: body.company,
      userId,
    },
  })

  return NextResponse.json(client)
}
