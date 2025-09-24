// Reddit sentiment analysis for DELTA32
export interface RedditSentimentData {
  symbol: string;
  rank: number;
  mentions: number;
  avgScore: number;
  sentiment: 'Very Positive' | 'Positive' | 'Neutral' | 'Negative' | 'Very Negative';
  trend: 'Rising' | 'Falling' | 'Stable';
  strength: number;
  recentPosts: {
    title: string;
    score: number;
    url: string;
    subreddit: string;
    timestamp: string;
  }[];
  lastUpdated: string;
}

// Simple hash function for consistent pseudo-random data
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const seededRandom = (min: number, max: number, seed: string): number => {
  const hash = hashCode(seed);
  const pseudoRandom = (hash % 1000) / 1000;
  return min + pseudoRandom * (max - min);
};

// Generate Reddit sentiment data for your TOP 50 symbols
export const generateRedditSentimentData = (symbols: string[]): RedditSentimentData[] => {
  const subreddits = ['wallstreetbets', 'stocks', 'investing', 'SecurityAnalysis', 'ValueInvesting'];
  
  const data = symbols.map((symbol, index) => {
    // Generate consistent data using symbol as seed
    const mentions = Math.floor(seededRandom(5, 300, symbol + '_mentions'));
    const avgScore = seededRandom(-0.8, 0.8, symbol + '_sentiment');
    
    // Map avgScore to sentiment labels
    let sentiment: RedditSentimentData['sentiment'] = 'Neutral';
    if (avgScore > 0.4) sentiment = 'Very Positive';
    else if (avgScore > 0.1) sentiment = 'Positive';
    else if (avgScore < -0.4) sentiment = 'Very Negative';
    else if (avgScore < -0.1) sentiment = 'Negative';
    
    // Determine trend
    const trendSeed = seededRandom(0, 1, symbol + '_trend');
    let trend: RedditSentimentData['trend'] = 'Stable';
    if (trendSeed > 0.6) trend = 'Rising';
    else if (trendSeed < 0.3) trend = 'Falling';
    
    // Calculate strength based on mentions and sentiment consistency
    const strength = Math.min(100, Math.max(10, 
      Math.floor((mentions / 5) + (Math.abs(avgScore) * 50) + seededRandom(0, 20, symbol + '_strength'))
    ));
    
    // Generate recent posts
    const recentPosts = Array.from({ length: 3 }, (_, i) => {
      const postSentiment = avgScore > 0 ? 'bullish' : avgScore < 0 ? 'bearish' : 'neutral';
      const titles = {
        bullish: [
          `${symbol} to the moon! 🚀 DD inside`,
          `Why ${symbol} is my top pick for 2024`,
          `${symbol} breakout confirmed - massive potential`,
          `${symbol} earnings beat expectations - bullish`,
          `${symbol} technical analysis - strong buy signal`
        ],
        bearish: [
          `${symbol} warning signs - time to exit?`,
          `${symbol} disappointing results - bearish outlook`,
          `Why I'm shorting ${symbol} - DD`,
          `${symbol} overvalued - sell signal`,
          `${symbol} technical breakdown - avoid`
        ],
        neutral: [
          `${symbol} weekly discussion thread`,
          `${symbol} earnings preview - what to expect`,
          `${symbol} chart analysis - sideways movement`,
          `${symbol} vs competitors - comparison`,
          `${symbol} long-term outlook discussion`
        ]
      };
      
      const titleOptions = titles[postSentiment];
      const titleIndex = Math.floor(seededRandom(0, titleOptions.length, symbol + '_title_' + i));
      
      return {
        title: titleOptions[titleIndex],
        score: Math.floor(seededRandom(10, 2000, symbol + '_score_' + i)),
        url: `https://reddit.com/r/${subreddits[i % subreddits.length]}/post_${symbol}_${i}`,
        subreddit: subreddits[i % subreddits.length],
        timestamp: new Date(Date.now() - Math.floor(seededRandom(1, 24, symbol + '_time_' + i)) * 60 * 60 * 1000).toISOString()
      };
    });
    
    return {
      symbol,
      rank: index + 1, // Will be re-ranked by mentions
      mentions,
      avgScore,
      sentiment,
      trend,
      strength,
      recentPosts,
      lastUpdated: new Date().toISOString()
    };
  });
  
  // Sort by mentions (descending) and assign ranks
  return data
    .sort((a, b) => b.mentions - a.mentions)
    .map((item, index) => ({
      ...item,
      rank: index + 1
    }));
};

// Format utilities for Reddit data
export const formatMentions = (mentions: number): string => {
  if (mentions >= 1000) {
    return `${(mentions / 1000).toFixed(1)}k`;
  }
  return mentions.toString();
};

export const getSentimentColor = (sentiment: string): string => {
  switch (sentiment) {
    case 'Very Positive': return 'text-green-400 bg-green-400/10';
    case 'Positive': return 'text-green-300 bg-green-300/10';
    case 'Neutral': return 'text-slate-light bg-slate/10';
    case 'Negative': return 'text-red-300 bg-red-300/10';
    case 'Very Negative': return 'text-red-400 bg-red-400/10';
    default: return 'text-slate-light bg-slate/10';
  }
};

export const getTrendIcon = (trend: string): string => {
  switch (trend) {
    case 'Rising': return '📈';
    case 'Falling': return '📉';
    case 'Stable': return '➡️';
    default: return '➡️';
  }
};

export const getStrengthColor = (strength: number): string => {
  if (strength >= 80) return 'text-green-400';
  if (strength >= 60) return 'text-blue-400';
  if (strength >= 40) return 'text-yellow-400';
  return 'text-red-400';
};

export const getMentionsColor = (mentions: number): string => {
  if (mentions >= 200) return 'text-orange-400 font-bold';
  if (mentions >= 100) return 'text-blue-400 font-semibold';
  if (mentions >= 50) return 'text-slate-light';
  return 'text-slate';
};

export const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const postTime = new Date(timestamp);
  const diffMs = now.getTime() - postTime.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}; 