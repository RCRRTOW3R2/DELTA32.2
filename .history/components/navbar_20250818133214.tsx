import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MenuIcon, XIcon } from 'lucide-react'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navItems = [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Portfolio',
      path: '/portfolio',
    },
    {
      name: 'Watchlist',
      path: '/watchlist',
    },
    {
      name: 'Contact',
      path: '/contact',
    },
  ]
  const toggleMenu = () => setIsOpen(!isOpen)
  return (
    <nav className="bg-primary-light py-4 px-6 md:px-12 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo className="h-8 w-auto" />
          <span className="ml-2 text-xl font-semibold">Delta32</span>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-colors hover:text-secondary-light ${location.pathname === item.path ? 'text-secondary font-medium' : 'text-slate-light'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-slate-light hover:text-white"
          >
            {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-primary-light py-4 px-6 shadow-lg">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors hover:text-secondary-light ${location.pathname === item.path ? 'text-secondary font-medium' : 'text-slate-light'}`}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
export default Navbar
