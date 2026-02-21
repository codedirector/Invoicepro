"use client"

import {motion } from 'motion/react'


const TECH = [
  "./next.png",
  // "TypeScript",
 
  "./postgres.png",
  
  // "Prisma",
  "./better.png",
  "./supabase.jpeg",
  "./shadcn.png",
]

export function TechnologiesCarouselGSAP() {

  return (
    <section className="py-24 overflow-hidden">
      
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Built with modern technologies
        </h2>
        <p className="mt-3 text-muted-foreground">
          A carefully chosen stack for performance, security, and scale
        </p>
      </div>
       <motion.div className='flex  justify-center items-center gap-5'>
          {TECH.map((item,key)=>{
           return  <div  key={key}>
            <img className='h-24 w-24  border-2 border-amber-300 rounded-full bg-contain bg-center bg-no-repeat  ' src={item} alt="logo" />
           </div>
          })}
       </motion.div>
    </section>
  )
}
