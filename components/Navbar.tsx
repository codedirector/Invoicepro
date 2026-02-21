'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { authClient } from "@/lib/auth-client"
import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"
export function Navbar() {
   const [loggedin,setLoggedin]=useState(false);
   const router=useRouter();
   const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession() 
 
 useEffect(() => {
    if(session?.session)
       setLoggedin(true);
}, [session]);
    //  console.log(session)
    //   if(isPending)
    //  return <>hhh</>
 
//   const handleLogout=async()=>{
//     await authClient.signOut({
//   fetchOptions: {
//     onSuccess: () => {
//       setLoggedin(false);
//       router.push("/login"); // redirect to login page
//     },
//   },
// });
//   }
  return (
    <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-6">
      <div className="font-bold text-xl">
       <Link href='/'>InvoicePro</Link> </div>

      <div className="hidden md:flex cursor-pointer gap-8 text-sm ">
       <Link href='/features'>Features</Link> 
       <Link href='/pricing'>Pricing</Link> 
       <Link href='/about'>About</Link> 
        {/* <a>Pricing</a>
        <a>FAQ</a>
        <a>Blog</a> */}
        {/* <a>Contact</a> */}
      </div>
          {loggedin?(<>  <Link href='/dashboard'>Dashboard</Link> </>):
     ( <div className="flex gap-3">
        <Link href='/login'><Button variant="ghost">Login</Button></Link>
        <Link href='/signup'>
        <Button className="bg-yellow-400 text-black hover:bg-yellow-300">
          Get Started
        </Button>
        </Link>
        
      </div>)
}
    </nav>
  )
}
