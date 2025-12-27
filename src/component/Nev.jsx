import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { CgProfile } from "react-icons/cg";
import logo from '/logo.png'

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
    <nav className={`w-full h-[60px] sm:h-[70px] md:h-[80px] fixed top-0 left-0 z-[999] shadow-md transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#05021A]/30 backdrop-blur-md' 
        : 'bg-[#05021A]'
    }`}>
      <div className='max-w-[1400px] h-full mx-auto px-[15px] sm:px-[20px] md:px-[30px] flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center cursor-pointer'>
          <img src={logo} alt="Logo" className='h-[35px] sm:h-[40px] md:h-[50px] w-auto' />
        </div>

        {/* Desktop Navigation Links */}
        <div className='hidden lg:flex items-center gap-[20px] xl:gap-[40px]'>
          <button className='text-[#B9E0FF] text-[16px] lg:text-[18px] xl:text-[20px] font-roboto hover:text-[#A5FF46] transition-colors duration-200'>
            Home
          </button>
          <button className='text-[#B9E0FF] text-[16px] lg:text-[18px] xl:text-[20px] font-roboto hover:text-[#A5FF46] transition-colors duration-200'>
            About us
          </button>
          <button className='text-[#B9E0FF] text-[16px] lg:text-[18px] xl:text-[20px] font-roboto hover:text-[#A5FF46] transition-colors duration-200'>
            Contact us
          </button>
          <button className='text-[#B9E0FF] text-[16px] lg:text-[18px] xl:text-[20px] font-roboto hover:text-[#A5FF46] transition-colors duration-200'>
            Our products
          </button>
        </div>

        {/* Sign Up Button & Hamburger Menu */}
       <div className='flex items-center gap-[10px] md:gap-[15px]'>
  <button className='hidden md:flex items-center gap-[6px] lg:gap-[8px] px-[15px] lg:px-[20px] py-[6px] lg:py-[8px] border-[2px] border-[#83B9E3] rounded-[6px] text-white text-[12px] lg:text-[14px] font-normal hover:border-[#5FD068] transition-all duration-200'>
    <CgProfile  className='w-[18px] h-[18px] lg:w-[23px] lg:h-[23px]' />
    
    <span className='hidden lg:inline'>Sign Up</span>
    <span className='lg:hidden'>Sign</span>
  </button>

          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='text-white hover:text-[#5FD068] transition-colors duration-200 p-1 lg:hidden'
          >
            {isMenuOpen ? (
              <X className='w-[24px] h-[24px] sm:w-[26px] sm:h-[26px]' />
            ) : (
              <Menu className='w-[24px] h-[24px] sm:w-[26px] sm:h-[26px]' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className='absolute top-[60px] sm:top-[70px] md:top-[80px] left-0 w-full bg-[#05021A] border-t border-[#1e3a5f] shadow-lg'>
          <div className='flex flex-col py-[15px] sm:py-[20px] px-[20px] sm:px-[30px] gap-[15px] sm:gap-[20px]'>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className='text-[#B9E0FF] text-[14px] sm:text-[15px] font-normal text-left hover:text-[#A5FF46] transition-colors duration-200 py-2'
            >
              Home
            </button>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className='text-[#B9E0FF] text-[14px] sm:text-[15px] font-normal text-left hover:text-[#A5FF46] transition-colors duration-200 py-2'
            >
              About us
            </button>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className='text-[#B9E0FF] text-[14px] sm:text-[15px] font-normal text-left hover:text-[#A5FF46] transition-colors duration-200 py-2'
            >
              Contact us
            </button>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className='text-[#B9E0FF] text-[14px] sm:text-[15px] font-normal text-left hover:text-[#A5FF46] transition-colors duration-200 py-2'
            >
              Our products
            </button>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className='flex items-center gap-[10px] px-[15px] sm:px-[20px] py-[8px] border-[1.5px] border-[#83B9E3] rounded-[6px] text-[#B9E0FF] text-[14px] font-normal hover:border-[#A5FF46] transition-all duration-200 w-fit mt-2'
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

export default Nav