import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
// import { Logos } from "@/components/Logos"
import { Features } from "@/components/Features"
import { HowItWorks } from "@/components/HowItWorks"
// import { Testimonials } from "@/components/Testimonials"
import { Pricing } from "@/components/Pricing"
import { Footer } from "@/components/Footer"
import { TechnologiesCarouselGSAP } from "@/components/tech"
export default function Home() {
  return (
    <main  className="hero  text-black  relative">
      
      <Hero />
     
      <div className=" space-y-16 px-6 pb-20">
          
           <Features />
          <HowItWorks />
       
        <Pricing />
      </div>
      <TechnologiesCarouselGSAP/>
    </main>
  )
}
