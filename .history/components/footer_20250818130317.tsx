import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
const Footer = () => {
  return (
    <footer className="bg-primary-dark py-8 px-6 md:px-12 border-t border-slate-dark/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <Logo className="h-6 w-auto" />
            <span className="ml-2 text-lg font-semibold">Delta32</span>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <Link
              to="/"
              className="text-slate-light hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/portfolio"
              className="text-slate-light hover:text-white transition-colors"
            >
              Portfolio
            </Link>
            <Link
              to="/watchlist"
              className="text-slate-light hover:text-white transition-colors"
            >
              Watchlist
            </Link>
            <Link
              to="/contact"
              className="text-slate-light hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="border-t border-slate-dark/20 pt-6 text-sm text-slate">
          <p className="mb-2">
            Educational purposes only. Not investment advice. Delta32 does not
            manage external capital.
          </p>
          <p>© {new Date().getFullYear()} Delta32. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
