import { getAuthSession } from '@/utils/auth'
import React from 'react'
import BecomeHostComponent from '../components/BecomeHostComponent'

export default async function BecomeHost() {
  const session=await getAuthSession()
  if(!session){
  return <section className='w-full h-screen grid place-items-center'>
    <div className='space-y-2 text-center'>
   <h1 className='text-xl md:text-2xl font-bold '>Not Authorized</h1>
   <span>To add Your property,<Link className="underline" href="/sign-in">Sign in</Link></span>
   </div>
    </section>
  }
    return (
    <div>
        <BecomeHostComponent/>
    </div>
  )
}
