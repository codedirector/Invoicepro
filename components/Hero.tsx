import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
export function Hero() {
  return (
    <section  className="max-w-7xl mx-auto mb-5 px-6 pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-5xl font-bold leading-tight tracking-tight">
          Smarter Invoicing, <br /> Faster Payments
        </h1>

        <p className="mt-6 text-muted-foreground text-lg">
          Streamline your invoicing process and get paid quickly with InvoicePro’s
          powerful, easy-to-use invoicing platform.
        </p>

        <div className="mt-8 flex gap-4">
         <Link href='/signup'> <Button className="bg-yellow-400 text-black hover:bg-yellow-300" size="lg">
            Get Started for Free
          </Button></Link>
          <Button size="lg" variant="outline">
            Book a Demo
          </Button>
        </div>
      </div>

     
      <div className="bg-white border rounded-2xl shadow-lg p-6">
         <Image
    src="/dash1.png"
    alt="Dashboard preview"
    width={600}
    height={400}
    className="rounded-xl"
  />
      </div>
    </section>
  )
}
