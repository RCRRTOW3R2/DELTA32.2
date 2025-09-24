import React, { useEffect, useState } from 'react'
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, TrendingDownIcon, ActivityIcon, TargetIcon } from 'lucide-react'
import {
  MomentumData,
  generateMomentumData,
  formatMomentumScore,
  getMomentumColor,
  getGradeColor,
  getRankColor,
  TOP_50_SYMBOLS
} from '../utils/momentumCalculator'

const Momentum = () => {
  const [stocks, setStocks] = useState<MomentumData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [sortConfig, setSortConfig] = useState<{
    key: keyof MomentumData
    direction: 'ascending' | 'descending'
  }>({ key: 'momentumRank', direction: 'ascending' })

  useEffect(() => {
    const loadMomentumData = () => {
      try {
        const data = generateMomentumData()
        setStocks(data)
        setLastUpdate(new Date())
        setLoading(false)
      } catch (error) {
        console.error('Error generating momentum data:', error)
        setLoading(false)
      }
    }
    loadMomentumData()
  }, [])

  const requestSort = (key: keyof MomentumData) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
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
  
  // Statistics for the overview cards
  const stats = {
    totalSymbols: stocks.length,
    bullishMomentum: stocks.filter(s => s.momentumScore > 0).length,
    bearishMomentum: stocks.filter(s => s.momentumScore < 0).length,
    activeBreakouts: stocks.filter(s => s.isBreakout).length,
    highGrades: stocks.filter(s => ['A+', 'A', 'B+'].includes(s.momentumGrade)).length,
    strongTrends: stocks.filter(s => ['Very Strong', 'Strong'].includes(s.trendStrength)).length
  }

  const handleRefresh = () => {
    setLoading(true)
    const data = generateMomentumData()
    setStocks(data)
    setLastUpdate(new Date())
    setLoading(false)
  }

  return (
    <div className="bg-primary w-full px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-4">📊 Momentum Rankings</h1>
              <p className="text-slate-light max-w-3xl">
                Live momentum analysis of your TOP {TOP_50_SYMBOLS.length} stocks using MOM = P(t) - P(t-n) formula.
                Ranked 1-{TOP_50_SYMBOLS.length} by composite momentum score with technical indicators and breakout analysis.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition-colors"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ActivityIcon size={20} className="text-secondary" />
              <span className="text-sm text-slate-light">Total Symbols</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalSymbols}</div>
          </div>
          
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUpIcon size={20} className="text-green-400" />
              <span className="text-sm text-slate-light">Bullish</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{stats.bullishMomentum}</div>
          </div>
          
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDownIcon size={20} className="text-red-400" />
              <span className="text-sm text-slate-light">Bearish</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{stats.bearishMomentum}</div>
          </div>
          
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TargetIcon size={20} className="text-orange-400" />
              <span className="text-sm text-slate-light">Breakouts</span>
            </div>
            <div className="text-2xl font-bold text-orange-400">{stats.activeBreakouts}</div>
          </div>
          
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-green-400">A/B+</span>
              <span className="text-sm text-slate-light">Grades</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{stats.highGrades}</div>
          </div>
          
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-blue-400">💪</span>
              <span className="text-sm text-slate-light">Strong Trends</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{stats.strongTrends}</div>
          </div>
        </div>

        {/* Main Momentum Table */}
        <div className="bg-primary-light rounded-lg overflow-hidden shadow-lg">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <ActivityIcon className="animate-spin text-secondary" size={32} />
              <span className="ml-2 text-slate-light">Loading momentum data...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-left">
                    <th
                      className="px-4 py-4 cursor-pointer hover:bg-primary-dark"
                      onClick={() => requestSort('momentumRank')}
                    >
                      <div className="flex items-center">
                        Rank
                        {sortConfig?.key === 'momentumRank' &&
                          (sortConfig.direction === 'ascending' ? (
                            <ArrowUpIcon size={16} className="ml-1" />
                          ) : (
                            <ArrowDownIcon size={16} className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-4 py-4 cursor-pointer hover:bg-primary-dark"
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
                    <th className="px-4 py-4">Price</th>
                    <th
                      className="px-4 py-4 cursor-pointer hover:bg-primary-dark"
                      onClick={() => requestSort('momentumScore')}
                    >
                      <div className="flex items-center">
                        Momentum Score
                        {sortConfig?.key === 'momentumScore' &&
                          (sortConfig.direction === 'ascending' ? (
                            <ArrowUpIcon size={16} className="ml-1" />
                          ) : (
                            <ArrowDownIcon size={16} className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th className="px-4 py-4">MOM21</th>
                    <th className="px-4 py-4">MOM42</th>
                    <th className="px-4 py-4">MOM63</th>
                    <th className="px-4 py-4">RSI14</th>
                    <th className="px-4 py-4">Grade</th>
                    <th className="px-4 py-4">Trend</th>
                    <th className="px-4 py-4">Breakout</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStocks.map((stock) => (
                    <tr
                      key={stock.symbol}
                      className="border-t border-slate-dark/20 hover:bg-primary/50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getRankColor(stock.momentumRank)}`}>
                          #{stock.momentumRank}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-xs text-slate-light truncate max-w-[120px]">
                            {stock.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div>${stock.price.toFixed(2)}</div>
                          <div className={`text-xs flex items-center ${stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {stock.changePercent >= 0 ? (
                              <ArrowUpIcon size={12} className="mr-1" />
                            ) : (
                              <ArrowDownIcon size={12} className="mr-1" />
                            )}
                            {stock.changePercent.toFixed(2)}%
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          {stock.momentumScore > 0 ? (
                            <TrendingUpIcon size={16} className="mr-1 text-green-400" />
                          ) : (
                            <TrendingDownIcon size={16} className="mr-1 text-red-400" />
                          )}
                          <span className={`font-medium ${getMomentumColor(stock.momentumScore)}`}>
                            {formatMomentumScore(stock.momentumScore)}
                          </span>
                        </div>
                      </td>
                      <td className={`px-4 py-4 ${getMomentumColor(stock.mom21)}`}>
                        {formatMomentumScore(stock.mom21)}
                      </td>
                      <td className={`px-4 py-4 ${getMomentumColor(stock.mom42)}`}>
                        {formatMomentumScore(stock.mom42)}
                      </td>
                      <td className={`px-4 py-4 ${getMomentumColor(stock.mom63)}`}>
                        {formatMomentumScore(stock.mom63)}
                      </td>
                      <td className={`px-4 py-4 ${stock.rsi14 > 70 ? 'text-red-400' : stock.rsi14 < 30 ? 'text-green-400' : 'text-slate-light'}`}>
                        {stock.rsi14.toFixed(1)}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getGradeColor(stock.momentumGrade)}`}>
                          {stock.momentumGrade}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          stock.trendStrength === 'Very Strong' ? 'bg-green-500/20 text-green-400' :
                          stock.trendStrength === 'Strong' ? 'bg-green-400/20 text-green-300' :
                          stock.trendStrength === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {stock.trendStrength}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {stock.isBreakout ? (
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            stock.breakoutType === 'bullish' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {stock.breakoutType === 'bullish' ? '🚀 Bull' : '📉 Bear'}
                          </span>
                        ) : (
                          <span className="text-slate-light text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-sm text-slate flex justify-between items-center">
          <p>
            Momentum formula: MOM = P(t) - P(t-n) | Updates every 6 hours | Last updated: {lastUpdate.toLocaleString()}
          </p>
          <p className="text-secondary">
            {stocks.filter(s => s.momentumScore > 0).length} Bullish • {stocks.filter(s => s.isBreakout).length} Breakouts
          </p>
        </div>
      </div>
    </div>
  )
}

export default Momentum 