import { Box } from '@mui/material'
import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const layout = async ({ children }: { children: React.ReactNode}) => {
  return (
    <Box className='bg-slate-50 h-full flex flex-col justify-between items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
        <Navbar />
        {children}
        <Footer />
    </Box>
  )
}

export default layout