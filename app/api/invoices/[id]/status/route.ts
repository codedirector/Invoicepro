import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } ) {
  const { id } = await context.params 

  const session = await auth.api.getSession({
    headers: request.headers, 
  })

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const invoice = await prisma.invoice.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  })

  if (!invoice) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const updated = await prisma.invoice.update({
    where: { id: invoice.id },
    data: {
      status: invoice.status === "PAID" ? "UNPAID" : "PAID",
    },
  })

  return NextResponse.json(updated)
}