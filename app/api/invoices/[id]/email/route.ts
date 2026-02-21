import { authClient } from "@/lib/auth-client"
import { prisma } from "@/lib/prisma"
import { resend } from "@/lib/email"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const session = await authClient.getSession()

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const invoice = await prisma.invoice.findFirst({
    where: {
      id,
      userId: session.data?.user.id,
    },
    include: {
      items: true,
      client: true,
    },
  })

  if (!invoice || !invoice.client.email) {
    return NextResponse.json(
      { error: "Missing client email" },
      { status: 400 }
    )
  }

  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: invoice.client.email, 
    subject: `Invoice ${invoice.number}`,
    text: `Hi ${invoice.client.name},

Please find your invoice attached.

Thanks.`,
  })

  return NextResponse.json({ success: true })
}