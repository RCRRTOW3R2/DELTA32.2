// Real Yahoo Finance API integration
export interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  marketCap: number
  volume: number
}

// Your stock symbols to track
const WATCHLIST_SYMBOLS = [
  'AAPL', 'MSFT', 'NVDA', 'AMZN', 'GOOGL', 
  'META', 'TSLA', 'JPM', 'V', 'WMT'
]

// Using Yahoo Finance API through RapidAPI (free tier available)
const YAHOO_FINANCE_API_KEY = process.env.REACT_APP_YAHOO_API_KEY || ''
const YAHOO_API_BASE = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo'

export const fetchRealStockData = async (): Promise<StockData[]> => {
  try {
    // If no API key, fall back to mock data
    if (!YAHOO_FINANCE_API_KEY) {
      console.warn('No Yahoo Finance API key found. Using mock data.')
      return fetchMockStockData()
    }

    const stockPromises = WATCHLIST_SYMBOLS.map(async (symbol) => {
      const response = await fetch(`${YAHOO_API_BASE}/qu/quote/${symbol}`, {
        headers: {
          'X-RapidAPI-Key': YAHOO_FINANCE_API_KEY,
          'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
      })
      
      if (!response.ok) throw new Error(`Failed to fetch ${symbol}`)
      
      const data = await response.json()
      return {
        symbol: data.symbol,
        name: data.longName || data.shortName,
        price: data.regularMarketPrice,
        change: data.regularMarketChange,
        changePercent: data.regularMarketChangePercent,
        marketCap: data.marketCap,
        volume: data.regularMarketVolume
      }
    })

    return await Promise.all(stockPromises)
  } catch (error) {
    console.error('Error fetching real stock data:', error)
    // Fall back to mock data if API fails
    return fetchMockStockData()
  }
}

// Alternative: Alpha Vantage API (also free)
const ALPHA_VANTAGE_API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_KEY || ''
const ALPHA_VANTAGE_BASE = 'https://www.alphavantage.co/query'

export const fetchAlphaVantageData = async (): Promise<StockData[]> => {
  try {
    if (!ALPHA_VANTAGE_API_KEY) {
      console.warn('No Alpha Vantage API key found. Using mock data.')
      return fetchMockStockData()
    }

    const stockPromises = WATCHLIST_SYMBOLS.map(async (symbol) => {
      const response = await fetch(
        `${ALPHA_VANTAGE_BASE}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      )
      
      const data = await response.json()
      const quote = data['Global Quote']
      
      return {
        symbol: quote['01. symbol'],
        name: symbol, // Alpha Vantage doesn't provide company names in this endpoint
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        marketCap: 0, // Would need separate API call
        volume: parseInt(quote['06. volume'])
      }
    })

    return await Promise.all(stockPromises)
  } catch (error) {
    console.error('Error fetching Alpha Vantage data:', error)
    return fetchMockStockData()
  }
}

// Mock data fallback (keeping your current data)
const fetchMockStockData = (): Promise<StockData[]> => {
  const mockData: StockData[] = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 172.62,
      change: 2.35,
      changePercent: 1.38,
      marketCap: 2750000000000,
      volume: 58432100,
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      price: 337.2,
      change: 3.14,
      changePercent: 0.94,
      marketCap: 2510000000000,
      volume: 23145600,
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      price: 437.53,
      change: 15.32,
      changePercent: 3.63,
      marketCap: 1080000000000,
      volume: 42367800,
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 130.25,
      change: -0.43,
      changePercent: -0.33,
      marketCap: 1340000000000,
      volume: 35721900,
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 125.3,
      change: 1.25,
      changePercent: 1.01,
      marketCap: 1580000000000,
      volume: 19876500,
    },
    {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: 297.48,
      change: 4.23,
      changePercent: 1.44,
      marketCap: 763000000000,
      volume: 21345600,
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 243.84,
      change: -5.62,
      changePercent: -2.25,
      marketCap: 774000000000,
      volume: 32156700,
    },
    {
      symbol: 'JPM',
      name: 'JPMorgan Chase & Co.',
      price: 138.24,
      change: 0.87,
      changePercent: 0.63,
      marketCap: 403000000000,
      volume: 8765400,
    },
    {
      symbol: 'V',
      name: 'Visa Inc.',
      price: 235.45,
      change: 1.23,
      changePercent: 0.53,
      marketCap: 485000000000,
      volume: 6543200,
    },
    {
      symbol: 'WMT',
      name: 'Walmart Inc.',
      price: 155.32,
      change: 2.15,
      changePercent: 1.4,
      marketCap: 418000000000,
      volume: 7654300,
    }
  ]

  return Promise.resolve(mockData)
}

export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1000000000000) {
    return `$${(marketCap / 1000000000000).toFixed(2)}T`
  } else if (marketCap >= 1000000000) {
    return `$${(marketCap / 1000000000).toFixed(2)}B`
  } else if (marketCap >= 1000000) {
    return `$${(marketCap / 1000000).toFixed(2)}M`
  } else {
    return `$${marketCap.toLocaleString()}`
  }
}

export const formatLargeNumber = (num: number): string => {
  return num.toLocaleString()
} 