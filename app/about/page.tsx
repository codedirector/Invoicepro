import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex justify-center items-center">
    <div className="container max-w-6xl py-16 space-y-20">
      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Built to simplify invoicing <br className="hidden md:block" />
          for modern businesses
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground">
          InvoicePro helps freelancers, startups, and small teams create
          professional invoices, track payments, and understand their
          revenue — without complexity.
        </p>
      </section>

      {/* VALUES */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Simple by default</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            No bloated features. No confusing workflows.
            Just what you need to invoice clients and get paid.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Built for clarity</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Clear invoices, clear analytics, and clear insights
            into your business performance.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Designed to scale</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Whether you manage 5 clients or 500,
            InvoicePro grows with your business.
          </CardContent>
        </Card>
      </section>

      {/* WHY INVOICEPRO */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">
            Why InvoicePro?
          </h2>

          <p className="text-muted-foreground">
            Most invoicing tools are either too basic or painfully complex.
            InvoicePro was created to strike the right balance —
            powerful enough for real businesses, simple enough to use daily.
          </p>

          <p className="text-muted-foreground">
            From client management to revenue analytics,
            everything is designed to save time and reduce friction.
          </p>
        </div>

        <Card className="bg-muted/50">
          <CardContent className="p-6 space-y-3 text-sm text-muted-foreground">
            <p>✔ Professional invoices & PDFs</p>
            <p>✔ Payment tracking (paid / unpaid)</p>
            <p>✔ Client-wise revenue insights</p>
            <p>✔ Simple plans that scale</p>
          </CardContent>
        </Card>
      </section>

      {/* FOUNDER / VISION */}
      <section className="max-w-3xl space-y-4">
        <h2 className="text-3xl font-semibold">
          Our vision
        </h2>

        <p className="text-muted-foreground">
          InvoicePro was built with a simple belief:
          business tools should feel empowering, not overwhelming.
        </p>

        <p className="text-muted-foreground">
          We focus on thoughtful design, reliable technology,
          and features that genuinely help you run your business better.
        </p>
      </section>

      {/* CTA */}
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t pt-10">
        <div>
          <h3 className="text-2xl font-semibold">
            Ready to simplify your invoicing?
          </h3>
          <p className="text-muted-foreground">
            Get started in minutes. No credit card required.
          </p>
        </div>

       <Link href="/signup"> <Button size="lg">
          Get Started with InvoicePro
        </Button></Link>
      </section>
    </div>
     </div>
  )
}
