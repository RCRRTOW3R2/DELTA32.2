import React, { useEffect, useState } from 'react'
import { ArrowUpIcon, ArrowDownIcon, MessageSquareIcon, TrendingUpIcon, ActivityIcon } from 'lucide-react'
import {
  RedditSentimentData,
  generateRedditSentimentData,
  formatMentions,
  getSentimentColor,
  getTrendIcon,
  getStrengthColor,
  getMentionsColor,
  formatRelativeTime
} from '../utils/redditSentiment'
import { TOP_50_SYMBOLS } from '../utils/momentumCalculator'

const Reddit = () => {
  const [sentimentData, setSentimentData] = useState<RedditSentimentData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RedditSentimentData
    direction: 'ascending' | 'descending'
  }>({ key: 'rank', direction: 'ascending' })

  useEffect(() => {
    const loadRedditData = () => {
      try {
        const data = generateRedditSentimentData(TOP_50_SYMBOLS)
        setSentimentData(data)
        setLastUpdate(new Date())
        setLoading(false)
      } catch (error) {
        console.error('Error generating Reddit sentiment data:', error)
        setLoading(false)
      }
    }
    loadRedditData()
  }, [])

  const requestSort = (key: keyof RedditSentimentData) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const getSortedData = () => {
    if (!sortConfig) return sentimentData
    return [...sentimentData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }

  const sortedData = getSortedData()
  
  // Statistics for overview
  const stats = {
    totalSymbols: sentimentData.length,
    bullishSentiment: sentimentData.filter(s => ['Very Positive', 'Positive'].includes(s.sentiment)).length,
    bearishSentiment: sentimentData.filter(s => ['Very Negative', 'Negative'].includes(s.sentiment)).length,
    highActivity: sentimentData.filter(s => s.mentions >= 100).length,
    risingTrends: sentimentData.filter(s => s.trend === 'Rising').length,
    totalMentions: sentimentData.reduce((sum, s) => sum + s.mentions, 0)
  }

  const handleRefresh = () => {
    setLoading(true)
    const data = generateRedditSentimentData(TOP_50_SYMBOLS)
    setSentimentData(data)
    setLastUpdate(new Date())
    setLoading(false)
  }

  const timeUntilNextUpdate = () => {
    const now = new Date()
    const nextUpdate = new Date(lastUpdate)
    nextUpdate.setHours(nextUpdate.getHours() + 12)
    const diffMs = nextUpdate.getTime() - now.getTime()
    const diffHours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)))
    const diffMinutes = Math.max(0, Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)))
    
    if (diffHours === 0 && diffMinutes === 0) return 'Update available'
    return `Next update in ${diffHours}h ${diffMinutes}m`
  }

  return (
    <div className="bg-primary w-full px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-4">🔥 Reddit Sentiment Analysis</h1>
              <p className="text-slate-light max-w-3xl">
                Live sentiment tracking from WallStreetBets, r/stocks, and other investment subreddits.
                Updates every 12 hours with mentions, sentiment scores, and trending discussions.
              </p>
            </div>
            <div className="text-right">
              <button
                onClick={handleRefresh}
                className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition-colors mb-2"
              >
                Refresh Data
              </button>
              <div className="text-sm text-slate-light">
                {timeUntilNextUpdate()}
              </div>
            </div>
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
              <span className="text-lg">😊</span>
              <span className="text-sm text-slate-light">Bullish</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{stats.bullishSentiment}</div>
          </div>
          
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">😔</span>
              <span className="text-sm text-slate-light">Bearish</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{stats.bearishSentiment}</div>
          </div>
          
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquareIcon size={20} className="text-orange-400" />
              <span className="text-sm text-slate-light">High Activity</span>
            </div>
            <div className="text-2xl font-bold text-orange-400">{stats.highActivity}</div>
          </div>
          
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUpIcon size={20} className="text-blue-400" />
              <span className="text-sm text-slate-light">Rising</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{stats.risingTrends}</div>
          </div>
          
          <div className="bg-primary-light p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💬</span>
              <span className="text-sm text-slate-light">Total Mentions</span>
            </div>
            <div className="text-xl font-bold text-secondary">{formatMentions(stats.totalMentions)}</div>
          </div>
        </div>

        {/* Main Reddit Sentiment Table */}
        <div className="bg-primary-light rounded-lg overflow-hidden shadow-lg">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <ActivityIcon className="animate-spin text-secondary" size={32} />
              <span className="ml-2 text-slate-light">Loading Reddit sentiment data...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-left">
                    <th
                      className="px-4 py-4 cursor-pointer hover:bg-primary-dark"
                      onClick={() => requestSort('rank')}
                    >
                      <div className="flex items-center">
                        Rank
                        {sortConfig?.key === 'rank' &&
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
                    <th
                      className="px-4 py-4 cursor-pointer hover:bg-primary-dark"
                      onClick={() => requestSort('mentions')}
                    >
                      <div className="flex items-center">
                        Mentions
                        {sortConfig?.key === 'mentions' &&
                          (sortConfig.direction === 'ascending' ? (
                            <ArrowUpIcon size={16} className="ml-1" />
                          ) : (
                            <ArrowDownIcon size={16} className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-4 py-4 cursor-pointer hover:bg-primary-dark"
                      onClick={() => requestSort('avgScore')}
                    >
                      <div className="flex items-center">
                        Avg Score
                        {sortConfig?.key === 'avgScore' &&
                          (sortConfig.direction === 'ascending' ? (
                            <ArrowUpIcon size={16} className="ml-1" />
                          ) : (
                            <ArrowDownIcon size={16} className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th className="px-4 py-4">Sentiment</th>
                    <th className="px-4 py-4">Trend</th>
                    <th
                      className="px-4 py-4 cursor-pointer hover:bg-primary-dark"
                      onClick={() => requestSort('strength')}
                    >
                      <div className="flex items-center">
                        Strength
                        {sortConfig?.key === 'strength' &&
                          (sortConfig.direction === 'ascending' ? (
                            <ArrowUpIcon size={16} className="ml-1" />
                          ) : (
                            <ArrowDownIcon size={16} className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th className="px-4 py-4">Recent Posts</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((item) => (
                    <tr
                      key={item.symbol}
                      className="border-t border-slate-dark/20 hover:bg-primary/50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          item.rank <= 5 ? 'bg-orange-500/20 text-orange-400' : 
                          item.rank <= 15 ? 'bg-blue-500/20 text-blue-400' :
                          item.rank <= 30 ? 'bg-slate-500/20 text-slate-light' :
                          'bg-slate-600/20 text-slate'
                        }`}>
                          #{item.rank}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-medium">{item.symbol}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <MessageSquareIcon size={16} className="text-slate" />
                          <span className={getMentionsColor(item.mentions)}>
                            {formatMentions(item.mentions)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={item.avgScore >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {item.avgScore > 0 ? '+' : ''}{item.avgScore.toFixed(3)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getSentimentColor(item.sentiment)}`}>
                          {item.sentiment}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getTrendIcon(item.trend)}</span>
                          <span className="text-slate-light">{item.trend}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            item.strength >= 80 ? 'bg-green-400' :
                            item.strength >= 60 ? 'bg-blue-400' :
                            item.strength >= 40 ? 'bg-yellow-400' :
                            'bg-red-400'
                          }`} />
                          <span className={getStrengthColor(item.strength)}>
                            {Math.round(item.strength)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          {item.recentPosts.slice(0, 2).map((post, index) => (
                            <div key={index} className="text-xs">
                              <a 
                                href={post.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-secondary hover:text-secondary-light truncate block max-w-[200px]"
                              >
                                {post.title}
                              </a>
                              <div className="text-slate text-xs">
                                r/{post.subreddit} • {post.score} upvotes • {formatRelativeTime(post.timestamp)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Trending Discussions Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">🔥 Trending Discussions</h2>
          <div className="grid gap-4">
            {sortedData.slice(0, 5).map((item) => (
              <div
                key={`trending-${item.symbol}`}
                className="bg-primary-light p-4 rounded-lg border border-slate-dark/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold">{item.symbol}</span>
                    <span className={getMentionsColor(item.mentions)}>
                      {formatMentions(item.mentions)} mentions
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSentimentColor(item.sentiment)}`}>
                      {item.sentiment}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTrendIcon(item.trend)}</span>
                    <span className={getStrengthColor(item.strength)}>
                      {Math.round(item.strength)}%
                    </span>
                  </div>
                </div>
                <div className="text-sm text-slate-light">
                  Top post: <span className="text-secondary">{item.recentPosts[0].title}</span>
                </div>
                <div className="text-xs text-slate mt-1">
                  r/{item.recentPosts[0].subreddit} • {item.recentPosts[0].score} upvotes • {formatRelativeTime(item.recentPosts[0].timestamp)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-sm text-slate flex justify-between items-center">
          <p>
            Data from r/wallstreetbets, r/stocks, r/investing • Updates every 12 hours • Last updated: {lastUpdate.toLocaleString()}
          </p>
          <p className="text-secondary">
            {stats.bullishSentiment} Bullish • {stats.bearishSentiment} Bearish • {stats.risingTrends} Rising
          </p>
        </div>
      </div>
    </div>
  )
}

export default Reddit 