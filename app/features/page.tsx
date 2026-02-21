import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FeaturesPage() {
  return (
    <div className="flex items-center justify-center">
    <div className="container  max-w-6xl py-16 space-y-24">
      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Everything you need to <br className="hidden md:block" />
          invoice smarter
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground">
          InvoicePro brings together invoicing, client management,
          payments, and analytics — all in one simple platform.
        </p>
      </section>

      {/* CORE INVOICING */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">
          Professional invoicing
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Create invoices fast"
            desc="Generate professional invoices in seconds with automatic invoice numbers."
          />
          <FeatureCard
            title="PDF invoices"
            desc="Download or email clean, professional PDFs your clients can trust."
          />
          <FeatureCard
            title="Paid / unpaid tracking"
            desc="Easily track which invoices are paid and which need follow-up."
          />
        </div>
      </section>

      {/* CLIENT MANAGEMENT */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">
          Client & payment management
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Client management"
            desc="Store client details, contact info, and invoice history in one place."
          />
          <FeatureCard
            title="Invoice email delivery"
            desc="Send invoices directly to clients with a single click."
          />
          <FeatureCard
            title="Plan-based limits"
            desc="Free, Starter, and Business plans designed to grow with you."
          />
        </div>
      </section>

      {/* ANALYTICS */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">
          Revenue insights & analytics
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Monthly revenue"
            desc="Visualize your income over time with clear, simple charts."
          />
          <FeatureCard
            title="Client-wise revenue"
            desc="See which clients contribute the most to your business."
          />
          <FeatureCard
            title="Paid vs unpaid overview"
            desc="Instantly understand outstanding payments and cash flow."
          />
        </div>
      </section>

      {/* SECURITY */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold">
          Built for reliability & security
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Secure authentication"
            desc="Modern authentication with secure sessions and role-based access."
          />
          <FeatureCard
            title="Stripe-powered billing"
            desc="Safe and reliable subscription payments handled by Stripe."
          />
          <FeatureCard
            title="Scalable architecture"
            desc="Built with Next.js, Prisma, and PostgreSQL for performance and scale."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t pt-10">
        <div>
          <h3 className="text-2xl font-semibold">
            Start invoicing with confidence
          </h3>
          <p className="text-muted-foreground">
            Create your first invoice in minutes — no credit card required.
          </p>
        </div>

        <Button size="lg">
          Get Started with InvoicePro
        </Button>
      </section>
    </div>
    </div>
  )
}

/* Reusable Feature Card */
function FeatureCard({
  title,
  desc,
}: {
  title: string
  desc: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        {desc}
      </CardContent>
    </Card>
  )
}
