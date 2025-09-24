import React, { useEffect, useState } from 'react'
import { ArrowUpIcon, ArrowDownIcon, Loader2Icon } from 'lucide-react'
import {
  StockData,
  fetchGoogleSheetsData,
  formatMarketCap,
  formatLargeNumber,
} from '../utils/googleSheetsApi'
const Watchlist = () => {
  const [stocks, setStocks] = useState<StockData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof StockData
    direction: 'ascending' | 'descending'
  } | null>(null)
  useEffect(() => {
    const loadStocks = async () => {
      try {
        const data = await fetchGoogleSheetsData()
        setStocks(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching stock data:', error)
        setLoading(false)
      }
    }
    loadStocks()
  }, [])
  const requestSort = (key: keyof StockData) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({
      key,
      direction,
    })
  }
  const getSortedStocks = () => {
    if (!sortConfig) return stocks
    return [...stocks].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }
  const sortedStocks = getSortedStocks()
  return (
    <div className="bg-primary w-full px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Delta32 Watchlist</h1>
          <p className="text-slate-light max-w-3xl">
            Our current top 10 stocks of interest. This watchlist is updated
            regularly based on our quantitative research and market analysis.
          </p>
        </div>
        <div className="bg-primary-light rounded-lg overflow-hidden shadow-lg">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2Icon className="animate-spin text-secondary" size={32} />
              <span className="ml-2 text-slate-light">
                Loading stock data...
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-left">
                    <th
                      className="px-6 py-4 cursor-pointer hover:bg-primary-dark"
                      onClick={() => requestSort('symbol')}
                    >
                      <div className="flex items-center">
                        Symbol
                        {sortConfig?.key === 'symbol' &&
                          (sortConfig.direction === 'ascending' ? (
                            <ArrowUpIcon size={16} className="ml-1" />
                          ) : (
                            <ArrowDownIcon size={16} className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th className="px-6 py-4">Name</th>
                    <th
                      className="px-6 py-4 cursor-pointer hover:bg-primary-dark"
                      onClick={() => requestSort('price')}
                    >
                      <div className="flex items-center">
                        Price
                        {sortConfig?.key === 'price' &&
                          (sortConfig.direction === 'ascending' ? (
                            <ArrowUpIcon size={16} className="ml-1" />
                          ) : (
                            <ArrowDownIcon size={16} className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 cursor-pointer hover:bg-primary-dark"
                      onClick={() => requestSort('changePercent')}
                    >
                      <div className="flex items-center">
                        Change %
                        {sortConfig?.key === 'changePercent' &&
                          (sortConfig.direction === 'ascending' ? (
                            <ArrowUpIcon size={16} className="ml-1" />
                          ) : (
                            <ArrowDownIcon size={16} className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 cursor-pointer hover:bg-primary-dark"
                      onClick={() => requestSort('marketCap')}
                    >
                      <div className="flex items-center">
                        Market Cap
                        {sortConfig?.key === 'marketCap' &&
                          (sortConfig.direction === 'ascending' ? (
                            <ArrowUpIcon size={16} className="ml-1" />
                          ) : (
                            <ArrowDownIcon size={16} className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 cursor-pointer hover:bg-primary-dark"
                      onClick={() => requestSort('volume')}
                    >
                      <div className="flex items-center">
                        Volume
                        {sortConfig?.key === 'volume' &&
                          (sortConfig.direction === 'ascending' ? (
                            <ArrowUpIcon size={16} className="ml-1" />
                          ) : (
                            <ArrowDownIcon size={16} className="ml-1" />
                          ))}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStocks.map((stock) => (
                    <tr
                      key={stock.symbol}
                      className="border-t border-slate-dark/20 hover:bg-primary/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium">{stock.symbol}</td>
                      <td className="px-6 py-4 text-slate-light">
                        {stock.name}
                      </td>
                      <td className="px-6 py-4">${stock.price.toFixed(2)}</td>
                      <td
                        className={`px-6 py-4 ${stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}
                      >
                        <div className="flex items-center">
                          {stock.changePercent >= 0 ? (
                            <ArrowUpIcon size={16} className="mr-1" />
                          ) : (
                            <ArrowDownIcon size={16} className="mr-1" />
                          )}
                          {stock.changePercent.toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-light">
                        {formatMarketCap(stock.marketCap)}
                      </td>
                      <td className="px-6 py-4 text-slate-light">
                        {formatLargeNumber(stock.volume)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="mt-6 text-sm text-slate">
          <p>
            Data is for demonstration purposes only. Last updated:{' '}
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
export default Watchlist
