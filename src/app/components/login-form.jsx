"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { signIn } from "next-auth/react"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Icons } from './Icons'

export default function LoginForm({ origin = "signIn" }) {
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const router = useRouter()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      if (origin === "signIn") {
        const callback = await signIn("credentials", {
          ...data,
          redirect: false
        })

        if (callback?.ok) {
          router.push("/") // change as needed
        } else {
          throw new Error(callback?.error || "Login failed")
        }
      } else {
        // Register user
        await axios.post("/api/auth/register", data)

        // Auto-login after registration
        const callback = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false
        })

        if (callback?.ok) {
          router.push("/dashboard")
        } else {
          throw new Error(callback?.error || "Login failed after registration")
        }
      }
    } catch (error) {
      console.error("Error:", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='space-y-4 w-full sm:w-1/2 flex flex-col items-center'>
        {origin === "signUp" && (
          <Input
            {...register('name')}
            placeholder="Your name"
            type="text"
            disabled={loading}
          />
        )}

        <Input
          {...register('email')}
          placeholder="Your email"
          type="email"
          disabled={loading}
        />

        <Input
          {...register('password')}
          placeholder="Your password"
          type="password"
          disabled={loading}
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-full"
          disabled={loading}
        >
          {loading ? "Please wait..." : origin === "signUp" ? "Sign up" : "Sign in"}
        </Button>

        <Button
          onClick={() => signIn("google")}
          className="w-full"
          type="button"
          disabled={loading}
        >
          <Icons.google className="mr-2 h-4 w-4" />
          {origin === "signUp" ? "Sign up with Google" : "Sign in with Google"}
        </Button>

        {origin === "signUp" ? (
          <span className='mx-auto'>
            Already have an account?{" "}
            <Link className="font-semibold underline" href="/sign-in">
              Sign in
            </Link>
          </span>
        ) : (
          <span className='mx-auto'>
            New to Bnbly?{" "}
            <Link className="font-semibold underline" href="/sign-up">
              Sign up
            </Link>
          </span>
        )}
      </div>
    </div>
  )
}
