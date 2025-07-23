import React from 'react'
import Hero from './_components/LandingPage/Hero'
import About from './_components/LandingPage/About'
import Testimonials from './_components/LandingPage/Testimonial'
import PreviewSection from './_components/LandingPage/Preview'

const HomePage = () => {
  return (
    <main>
        <Hero />
        <About />
        <Testimonials />
        <PreviewSection />
    </main>
  )
}

export default HomePage