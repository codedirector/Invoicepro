"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
export default  function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name,setName]=useState("")
    const router=useRouter()
  const handleSignup=async()=>{
  const { data, error } = await authClient.signUp.email({
        name,
        email, 
        password, 
        callbackURL: "/dashboard" 
    }, {
        onRequest: (ctx) => {
            
        },
        onSuccess: (ctx) => {
          router.push('/dashboard')
        },
        onError: (ctx) => {
            alert(ctx.error.message);
        },
});}


  const signUp = async () => {
    await authClient.signIn.social({
      provider: "google",
       callbackURL: "/dashboard",
    })
  }



  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border p-8 rounded-xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Create account</h1>

        <input
          placeholder="Email"
          className="border w-full px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <input
          placeholder="Name"
          className="border w-full px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className="border w-full px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-black text-white py-2 rounded"
        >
          Sign up
        </button>

          <Button
      onClick={signUp}
      variant="outline"
      className="w-full"
    >
      Continue with Google
    </Button>
      </div>
    </div>
  )
}
