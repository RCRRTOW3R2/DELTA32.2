import React from 'react'
import { ExternalLinkIcon } from 'lucide-react'
interface PortfolioItem {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
}
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Market Volatility Analysis',
    description:
      'Research on volatility patterns during economic uncertainty periods.',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    tags: ['Volatility', 'Risk Analysis', 'Market Trends'],
  },
  {
    id: 2,
    title: 'Sector Rotation Strategy',
    description:
      'Quantitative approach to sector allocation based on economic cycles.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    tags: ['Sectors', 'Asset Allocation', 'Economic Cycles'],
  },
  {
    id: 3,
    title: 'Options Pricing Model',
    description:
      'Proprietary model for options valuation in low liquidity environments.',
    image:
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    tags: ['Options', 'Derivatives', 'Pricing Models'],
  },
  {
    id: 4,
    title: 'Algorithmic Trading System',
    description:
      'High-frequency trading algorithm with focus on market microstructure.',
    image:
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    tags: ['Algorithms', 'Trading Systems', 'HFT'],
  },
  {
    id: 5,
    title: 'ESG Factor Analysis',
    description:
      'Impact of environmental, social, and governance factors on long-term returns.',
    image:
      'https://images.unsplash.com/photo-1623227866882-c005c26dfe41?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    tags: ['ESG', 'Sustainable Investing', 'Factor Analysis'],
  },
  {
    id: 6,
    title: 'Fixed Income Yield Curve Strategies',
    description:
      'Research on yield curve dynamics and implications for fixed income portfolios.',
    image:
      'https://images.unsplash.com/photo-1638913662295-9630035ef770?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    tags: ['Fixed Income', 'Yield Curve', 'Interest Rates'],
  },
]
const PortfolioCard: React.FC<{
  item: PortfolioItem
}> = ({ item }) => {
  return (
    <div className="bg-primary-light rounded-lg overflow-hidden transition-transform hover:transform hover:scale-[1.02]">
      <div className="h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
        <p className="text-slate-light mb-4">{item.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-primary px-2 py-1 text-xs rounded text-slate-light"
            >
              {tag}
            </span>
          ))}
        </div>
        <button className="flex items-center text-secondary hover:text-secondary-light transition-colors">
          View Research <ExternalLinkIcon size={16} className="ml-1" />
        </button>
      </div>
    </div>
  )
}
const Portfolio = () => {
  return (
    <div className="bg-primary w-full px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Research Portfolio</h1>
          <p className="text-slate-light max-w-3xl">
            Our quantitative research spans various market segments and
            strategies. Below are some of our recent projects and analyses.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Portfolio
