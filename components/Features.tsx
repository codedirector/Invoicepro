import { Button } from "@/components/ui/button"
import {
  FileText,
  CheckCircle2,
  Layers,
  BarChart2,
} from "lucide-react"

export function Features() {
  const features = [
    {
      title: ["Easy", "Invoice", "Management"],
      desc: "Organize and manage all your clients in one place.",
      icon: FileText,
    },
    {
      title: ["Automated", "Payment", "Reminders"],
      desc: "Send smart reminders and get paid on time.",
      icon: CheckCircle2,
    },
    {
      title: ["Beautiful", "Invoice", "Designs"],
      desc: "Create professional invoices that impress clients.",
      icon: Layers,
    },
    {
      title: ["Real-time", "Revenue", "Insights"],
      desc: "Track income and understand business performance.",
      icon: BarChart2,
    },
  ]

  return (
    <section className="max-w-6xl mx-auto border border-black/5 rounded-3xl p-12 shadow-sm space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight">
          Why Choose InvoicePro?
        </h2>
        <p className="text-muted-foreground mt-2 text-lg">
          Your invoicing process, simplified.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid md:grid-cols-2 gap-12">
        {features.map(({ title, desc, icon: Icon }, i) => (
          <div
            key={i}
            className="flex flex-col mx-auto border border-black/30 rounded-2xl p-6 max-w-sm"
          >
            <div className="flex items-center gap-4">
              <div className="space-y-1 font-semibold leading-tight text-lg">
                {title.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="ml-auto w-12 h-12 rounded-lg bg-white/50 flex items-center justify-center">
                <Icon className="w-6 h-6 text-yellow-700" />
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
