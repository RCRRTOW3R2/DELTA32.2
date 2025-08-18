// Mock API for stock data
// In a real implementation, this would connect to Yahoo Finance or similar API
export interface StockData {
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
    marketCap: number
    volume: number
  }
  const mockStockData: StockData[] = [
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
    },
  ]
  export const fetchStockData = (): Promise<StockData[]> => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        resolve(mockStockData)
      }, 500)
    })
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
  