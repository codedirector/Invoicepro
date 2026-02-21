export function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto  border border-black/5 rounded-3xl p-12 shadow-sm space-y-14">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold tracking-tight">
          Supercharge Your <br /> Invoicing Process
        </h2>
        <p className="text-muted-foreground mt-3 text-lg">
          Work best, get paid faster.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-10 max-w-2xl">
        {[
          {
            num: "01",
            title: "Add Your Clients",
            desc: "Create and organize client information effortlessly.",
          },
          {
            num: "02",
            title: "Create Invoices",
            desc: "Build professional invoices in just a few clicks.",
          },
          {
            num: "03",
            title: "Send Instantly",
            desc: "Share invoices with clients via email or PDF.",
          },
          {
            num: "04",
            title: "Track Payments",
            desc: "Monitor invoice status and stay on top of cash flow.",
          },
          {
            num: "05",
            title: "Analyze Revenue",
            desc: "Understand trends and make smarter business decisions.",
          },
        ].map((step) => (
          <div key={step.num} className="space-y-2">
            <div className="flex items-center gap-3">
              <p className="font-bold text-xl">{step.num}</p>
              <p className="font-semibold text-xl">{step.title}</p>
            </div>
            <p className="text-sm text-muted-foreground ml-10 max-w-md">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
