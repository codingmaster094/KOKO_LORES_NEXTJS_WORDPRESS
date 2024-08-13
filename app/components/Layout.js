import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { SpeedInsights } from "@vercel/speed-insights/next"

const Layout = ({ children}) => {
  return (
    <>
    <Header/>
    <main> 
       {children}
    </main>
    <Footer/>
    <SpeedInsights/>
    </>
  )
}

export default Layout