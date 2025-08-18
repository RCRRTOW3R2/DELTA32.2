import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRightIcon,
  LineChartIcon,
  SearchIcon,
  ShieldIcon,
} from 'lucide-react'
const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-primary px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <Logo className="h-20 w-20 mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-secondary">Δ</span>32
            </h1>
            <h2 className="text-2xl md:text-3xl font-light mb-8">
              Data, discipline, and market edge.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="bg-secondary hover:bg-secondary-light text-white px-8 py-3 rounded-md transition-colors font-medium"
              >
                Contact Us
              </Link>
              <Link
                to="/portfolio"
                className="border border-slate-light hover:border-white text-white px-8 py-3 rounded-md transition-colors font-medium"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="bg-primary-light px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About Delta32</h2>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-8 text-slate-light leading-relaxed">
              Delta32 is an independent quantitative research lab focused on
              disciplined market analysis and data-driven insights. We leverage
              advanced statistical methods and proprietary models to identify
              market inefficiencies and trading opportunities.
            </p>
            <p className="text-lg text-slate-light leading-relaxed">
              Our approach combines rigorous quantitative analysis with deep
              market understanding, providing a unique edge in today's complex
              financial landscape.
            </p>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-primary px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary-light p-8 rounded-lg">
              <LineChartIcon className="text-secondary mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3">Quantitative Analysis</h3>
              <p className="text-slate-light">
                Data-driven research and statistical modeling to identify market
                patterns and anomalies.
              </p>
            </div>
            <div className="bg-primary-light p-8 rounded-lg">
              <SearchIcon className="text-secondary mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3">Market Research</h3>
              <p className="text-slate-light">
                In-depth analysis of market trends, sectors, and individual
                securities.
              </p>
            </div>
            <div className="bg-primary-light p-8 rounded-lg">
              <ShieldIcon className="text-secondary mb-4" size={32} />
              <h3 className="text-xl font-bold mb-3">Risk Management</h3>
              <p className="text-slate-light">
                Sophisticated risk assessment frameworks to protect capital and
                optimize returns.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-secondary px-6 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to gain a market edge?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Explore our research portfolio or get in touch to learn more about
            our quantitative approach.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/watchlist"
              className="bg-white text-secondary hover:bg-slate-100 px-8 py-3 rounded-md transition-colors font-medium flex items-center justify-center"
            >
              View Watchlist <ArrowRightIcon size={16} className="ml-2" />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3 rounded-md transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Home

