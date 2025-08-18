# Delta32 Investment Research Platform

A professional investment research and portfolio tracking platform built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Platform
- **Professional Dashboard** - Clean, modern interface for investment research
- **Stock Watchlist** - Real-time stock tracking with sortable data tables
- **Portfolio Management** - Research portfolio with detailed project cards
- **Contact System** - Professional contact forms and information

### Technical Highlights
- **React 18** with TypeScript for type safety
- **React Router** for seamless navigation
- **Tailwind CSS** with custom Delta32 branding
- **Lucide Icons** for consistent iconography
- **Responsive Design** - Mobile-first approach
- **Vite** for fast development and optimized builds

## 🎯 Live Demo

Your application is currently running at: **http://localhost:3000**

## 📁 Project Structure

```
delta32/
├── components/           # Reusable UI components
│   ├── navbar.tsx       # Navigation bar with mobile support
│   ├── footer.tsx       # Footer with contact info
│   └── logo.tsx         # Delta32 logo SVG component
├── pages/               # Main application pages
│   ├── home.tsx         # Landing page with features
│   ├── portfolio.tsx    # Research portfolio showcase
│   ├── watchlist.tsx    # Stock tracking table
│   └── contact.tsx      # Contact information
├── utils/               # Utility functions
│   └── api.ts           # Mock API for stock data
├── App.tsx              # Main app component
├── AppRouter.tsx        # Routing configuration
├── index.tsx            # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## 🛠️ Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎨 Design System

### Colors
- **Primary**: `#0b1120` (Dark navy blue)
- **Secondary**: `#4f46e5` (Indigo accent)
- **Slate**: Various shades for text and borders

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 📊 Current Features

### Home Page
- Hero section with Delta32 branding
- Feature cards (Quantitative Analysis, Market Research, Risk Management)
- Call-to-action sections

### Portfolio Page
- Research project showcase
- Interactive cards with hover effects
- Tag-based categorization
- Mock research projects:
  - Market Volatility Analysis
  - Sector Rotation Strategy
  - Options Pricing Model
  - Algorithmic Trading System
  - ESG Factor Analysis
  - Fixed Income Yield Curve Strategies

### Watchlist Page
- Sortable stock data table
- Real-time market data simulation
- Key metrics: Price, Change, Market Cap, Volume
- Loading states and error handling

### Contact Page
- Professional contact forms
- Company information
- Social media links

## 🔄 Next Steps

### Immediate Enhancements
1. **Real API Integration**
   - Replace mock data with live market feeds
   - Add authentication for premium features
   - Implement real-time data updates

2. **Advanced Features**
   - Interactive charts and graphs
   - Portfolio analytics dashboard
   - Research note publishing system
   - User authentication and profiles

3. **Performance Optimizations**
   - Lazy loading for components
   - Data caching strategies
   - SEO optimization

### Deployment Options
1. **Vercel** (Recommended)
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify**
   - Connect GitHub repository
   - Auto-deploy on commits

3. **Traditional Hosting**
   - Build static files: `npm run build`
   - Deploy `dist/` folder

## 🎯 Business Value

This platform positions Delta32 as a professional, technology-forward investment research firm:

- **Professional Branding** - Clean, modern design that conveys expertise
- **Scalable Architecture** - Built to handle real data and user growth  
- **Mobile Responsive** - Accessible across all devices
- **Fast Performance** - Optimized for speed and user experience

## 📞 Support

For questions or contributions, contact the Delta32 team through the platform's contact page.

---

**Delta32** - Data, discipline, and market edge. 