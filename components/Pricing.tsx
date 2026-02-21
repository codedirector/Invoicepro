import { Button } from "@/components/ui/button"
import Link from "next/link"
const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For individuals trying InvoicePro",
    features: [
      "Up to 5 clients",
      "20 invoices per month",
      "Basic analytics",
      "InvoicePro branding on PDFs",
      "Community support",
    ],
    highlighted: false,
  },
  {
    name: "Starter",
    price: "$12",
    description: "Perfect for freelancers & solo founders",
    features: [
      "Up to 50 clients",
      "Unlimited invoices",
      "Full analytics dashboard",
      "Remove InvoicePro branding",
      "Email support",
      "Custom logo on invoices",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    price: "$24",
    description: "For growing teams and agencies",
    features: [
      "Unlimited clients",
      "Unlimited invoices",
      "Advanced analytics & reports",
      "Team access (up to 5 members)",
      "Priority support",
      "White-label invoices",
    ],
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section className="max-w-6xl mx-auto  border border-black/5 rounded-3xl p-12 shadow-sm space-y-10">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight">
          Flexible Plans That Scale With You
        </h2>
        <p className="text-muted-foreground mt-2 text-lg">
          Choose the plan that's right for your business.
        </p>
      </div>

      {/* Pricing grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-8 space-y-6 ${
              plan.highlighted
                ? "bg-black text-white border-black"
                : "bg-white border-black/5"
            }`}
          >
            {/* Badge */}
            {plan.highlighted && (
              <span className="absolute -top-3 right-6 bg-[#FFD84D] text-black text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            {/* Title */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p
                className={`text-sm ${
                  plan.highlighted
                    ? "text-white/70"
                    : "text-muted-foreground"
                }`}
              >
                {plan.description}
              </p>
            </div>

            {/* Price */}
            <div>
              <p className="text-5xl font-bold">{plan.price}</p>
              <p
                className={`text-sm mt-1 ${
                  plan.highlighted
                    ? "text-white/60"
                    : "text-muted-foreground"
                }`}
              >
                per month
              </p>
            </div>

            {/* Features */}
            <ul
              className={`space-y-3 text-sm ${
                plan.highlighted
                  ? "text-white/80"
                  : "text-muted-foreground"
              }`}
            >
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="text-[#FFD84D]">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}

            <Link href='/signup'>
            <Button
              className={`w-full ${
                plan.highlighted
                  ? "bg-[#FFD84D] text-black hover:bg-[#F4C430]"
                  : ""
              }`}
              variant={plan.highlighted ? "default" : "outline"}
            >
              Get Started
            </Button></Link>
          </div>
        ))}
      </div>
    </section>
  )
}
