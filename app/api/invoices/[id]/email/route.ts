import { authClient } from "@/lib/auth-client"
import { prisma } from "@/lib/prisma"
import { resend } from "@/lib/email"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params; // ✅ unwrap params

  // console.log(id);
  const session = await authClient.getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  // console.log(session.data?.user)
  const invoice = await prisma.invoice.findFirst({
    where: { id: id, userId: session.data?.user.id },
    include: { items: true, client: true },
  })

  if (!invoice || !invoice.client.email) {
    return NextResponse.json({ error: "Missing client email" }, { status: 400 })
  }


  // console.log(invoice.client.email)
  
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: 'invoice.client.email',
    //  to: 'sacredsower@gmail.com',
    subject: `Invoice ${invoice.number}`,
    text: `Hi ${invoice.client.name},\n\nPlease find your invoice attached.\n\nThanks.`,
    
  })

  return NextResponse.json({ success: true })
}
