// Google Sheets API integration for stock data
export interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  marketCap: number
  volume: number
}

// Google Sheets configuration
const GOOGLE_SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || ''
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || ''
const SHEET_RANGE = 'STOCKS!A:G' // Matches your STOCKS tab structure

export const fetchGoogleSheetsData = async (): Promise<StockData[]> => {
  try {
    if (!GOOGLE_SHEETS_API_KEY || !SHEET_ID) {
      console.warn('Google Sheets API credentials not configured. Using mock data.')
      return fetchMockStockData()
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_RANGE}?key=${GOOGLE_SHEETS_API_KEY}`
    
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch Google Sheets data')
    
    const data = await response.json()
    const rows = data.values

    // Skip header row and map to StockData based on your sheet structure
    return rows.slice(1)
      .filter((row: string[]) => row[0] && row[0].trim()) // Only include rows with symbols
      .map((row: string[]) => ({
        symbol: row[0] || '',
        name: row[1] || '',
        price: parseFloat(row[4]) || 0, // Column E (CURRENT PRICE)
        change: parseFloat(row[5]) || 0, // Column F (CHANGE)
        changePercent: parseFloat(row[6]) || 0, // Column G (CHANGE %)
        marketCap: 0, // Not in your current sheet, could add if needed
        volume: 0 // Not in your current sheet, could add if needed
      }))
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error)
    return fetchMockStockData()
  }
}

// Mock data fallback
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
    // ... other stocks
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