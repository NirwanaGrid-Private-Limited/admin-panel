import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { CgProfile } from "react-icons/cg";
import logo from '/logo.png'
import { Link } from 'react-router-dom';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`w-full h-15 sm:h-17.5 md:h-20 fixed top-0 left-0 z-999 shadow-md transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/70 backdrop-blur-md' 
        : 'bg-white'
    }`}>
      <div className='max-w-350 h-full mx-auto px-3.75 sm:px-5 md:px-7.5 flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center cursor-pointer'>
          <img src={logo} alt="Logo" className='h-8.75 sm:h-10 md:h-12.5 w-auto' />
        </div>

        {/* Desktop Navigation Links */}
        <div className='hidden lg:flex items-center gap-5 xl:gap-10'>
          <Link to='/' className='text-slate-700 text-[16px] lg:text-[18px] xl:text-[20px] font-roboto hover:text-[#A5FF46] transition-colors duration-200'>
            Home
          </Link>
          <button className='text-slate-700 text-[16px] lg:text-[18px] xl:text-[20px] font-roboto hover:text-[#A5FF46] transition-colors duration-200'>
            About us
          </button>
          <Link to="/contact" className='text-slate-700 text-[16px] lg:text-[18px] xl:text-[20px] font-roboto hover:text-[#A5FF46] transition-colors duration-200'>
            Contact us
          </Link>
          <Link to='/product' className='text-slate-700 text-[16px] lg:text-[18px] xl:text-[20px] font-roboto hover:text-[#A5FF46] transition-colors duration-200'>
            Our products
          </Link>
        </div>

        {/* Sign Up Button & Hamburger Menu */}
      <div className='flex items-center gap-2.5 md:gap-3.75'>
  <button className='hidden md:flex items-center gap-1.5 lg:gap-2 px-3.75 lg:px-5 py-1.5 lg:py-2 border-2 border-black rounded-md text-slate-700 text-[12px] lg:text-[14px] font-normal hover:border-black transition-all duration-200 bg-white hover:bg-[#E5E5E5]'>
    <CgProfile  className='w-4.5 h-4.5 lg:w-5.75 lg:h-5.75' />
    
    <span className='hidden lg:inline'>Sign Up</span>
    <span className='lg:hidden'>Sign</span>
  </button>

          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='text-slate-900 hover:text-[#5FD068] transition-colors duration-200 p-1 lg:hidden'
          >
            {isMenuOpen ? (
              <X className='w-6 h-6 sm:w-6.5 sm:h-6.5' />
            ) : (
              <Menu className='w-6 h-6 sm:w-6.5 sm:h-6.5' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className='absolute top-15 sm:top-17.5 md:top-20 left-0 w-full bg-white border-t border-black shadow-lg'>
          <div className='flex flex-col py-3.75 sm:py-5 px-5 sm:px-7.5 gap-3.75 sm:gap-5'>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className='text-slate-700 text-[14px] sm:text-[15px] font-normal text-left hover:text-[#A5FF46] transition-colors duration-200 py-2 border-b border-black'
            >
              Home
            </button>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className='text-slate-700 text-[14px] sm:text-[15px] font-normal text-left hover:text-[#A5FF46] transition-colors duration-200 py-2 border-b border-black'
            >
              About us
            </button>
            <Link 
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className='text-slate-700 text-[14px] sm:text-[15px] font-normal text-left hover:text-[#A5FF46] transition-colors duration-200 py-2 border-b border-black'
            >
              Contact us
            </Link>
            <Link 
              to='/product'
              onClick={() => setIsMenuOpen(false)}
              className='text-slate-700 text-[14px] sm:text-[15px] font-normal text-left hover:text-[#A5FF46] transition-colors duration-200 py-2 border-b border-black'
            >
              Our products
            </Link>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className='flex items-center gap-2.5 px-3.75 sm:px-5 py-2 border-black rounded-md text-slate-700 text-[14px] font-normal hover:border-black transition-all duration-200 w-fit mt-2'
            >
              <CgProfile  className='w-[20px] h-[20px] sm:w-[23px] sm:h-[23px]' />
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav;