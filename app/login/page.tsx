"use client"

import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
    const router=useRouter()
  async function handleLogin() {
  const { data, error } = await authClient.signIn.email({
        email,
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/dashboard",
        rememberMe: false
}, {
     onSuccess: (ctx) => {
              router.push('/dashboard')
            },
            onError: (ctx) => {
                alert(ctx.error.message);
            },
})
  }
const login = async () => {
    await authClient.signIn.social({
      provider: "google",
       callbackURL: "/dashboard",
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border p-8 rounded-xl w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          placeholder="Email"
          className="border w-full px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="border w-full px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded"
        >
          Login
        </button>
         <Button
      onClick={login}
      variant="outline"
      className="w-full"
    >
      Continue with Google
    </Button>
      </div>
    </div>
  )
}
