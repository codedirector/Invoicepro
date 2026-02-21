import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { headers } from "next/headers"
export async function PATCH(
  _: Request,
  { params }: { params: { id: string } }
) {
   const session = await auth.api.getSession({
     headers: await headers() // you need to pass the headers object.
 })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const invoice = await prisma.invoice.findFirst({
    where: {
      id: params.id,
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
