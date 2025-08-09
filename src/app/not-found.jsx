import Link from 'next/link'
import React from 'react'

export default function Customer404Page() {
  return (
    <section className='h-screen grid place-items-center'>
        <div className='text-center '>
        <h1 className='font-bold text-xl sm:text-2xl md:text-5xl lg:text-7xl '>404</h1>
        <Link className='underline' href="/">Go to Homepage</Link>
        </div>
        </section>
  )
}
