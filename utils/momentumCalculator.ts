// Momentum calculation utilities for DELTA32
export interface MomentumData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  
  // Momentum indicators (using your formula: MOM = P(t) - P(t-n))
  mom21: number;
  mom42: number;
  mom63: number;
  momentumScore: number;
  momentumRank: number;
  
  // Technical indicators
  rsi14: number;
  atr14: number;
  macdHist: number;
  
  // Momentum grading
  momentumGrade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F';
  trendStrength: 'Very Strong' | 'Strong' | 'Moderate' | 'Weak' | 'Very Weak';
  
  // Breakout analysis
  isBreakout: boolean;
  breakoutType: 'bullish' | 'bearish' | 'none';
  
  // Metadata
  lastUpdated: string;
}

// Your TOP 50 tickers from CSV
export const TOP_50_SYMBOLS = [
  'SOFI', 'RBLX', 'LGND', 'MAGS', 'STX', 'CRDO', 'TSLA', 'MP', 'TPR', 'B',
  'ALAB', 'NMRK', 'MCHI', 'AFK', 'LIT', 'NLR', 'TSEM', 'XME', 'DAPP', 'SNDK',
  'EVR', 'IDCC', 'AMG', 'APP', 'BITQ', 'PFSI', 'BKCH', 'HOOD', 'AXON', 'PLTR',
  'PVLA', 'TREE', 'ENS', 'SHOP', 'NET', 'HIMS', 'CRWV', 'FLEX', 'JBL', 'RYCEY',
  'CLS', 'DASH', 'WBD', 'ILF', 'SLVP', 'OKLO', 'NEM'
];

// Generate consistent "random" data using symbol hash (prevents hydration issues)
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

export const calculateMomentumScore = (mom21: number, mom42: number, mom63: number): number => {
  // Weighted average: shorter periods get more weight for responsiveness
  return (mom21 * 0.5) + (mom42 * 0.3) + (mom63 * 0.2);
};

export const assignMomentumGrade = (momentumScore: number, rsi: number): MomentumData['momentumGrade'] => {
  const absScore = Math.abs(momentumScore);
  
  if (absScore > 15 && rsi > 60 && momentumScore > 0) return 'A+';
  if (absScore > 10 && momentumScore > 0) return 'A';
  if (absScore > 7) return 'B+';
  if (absScore > 4) return 'B';
  if (absScore > 2) return 'C+';
  if (absScore > 1) return 'C';
  if (absScore > 0.5) return 'D';
  return 'F';
};

export const assessTrendStrength = (momentumScore: number, rsi: number): MomentumData['trendStrength'] => {
  const combinedStrength = Math.abs(momentumScore) + (Math.abs(rsi - 50) / 10);
  
  if (combinedStrength > 20) return 'Very Strong';
  if (combinedStrength > 12) return 'Strong';
  if (combinedStrength > 6) return 'Moderate';
  if (combinedStrength > 3) return 'Weak';
  return 'Very Weak';
};

export const detectBreakout = (momentumScore: number, atr: number): {
  isBreakout: boolean;
  breakoutType: 'bullish' | 'bearish' | 'none';
} => {
  const threshold = atr * 1.5;
  const isBreakout = Math.abs(momentumScore) > threshold;
  
  if (!isBreakout) return { isBreakout: false, breakoutType: 'none' };
  
  return {
    isBreakout: true,
    breakoutType: momentumScore > 0 ? 'bullish' : 'bearish'
  };
};

// Generate enhanced momentum data for your TOP 50 symbols
export const generateMomentumData = (): MomentumData[] => {
  const stockNames: { [key: string]: string } = {
    'SOFI': 'SoFi Technologies Inc',
    'RBLX': 'Roblox Corporation',
    'LGND': 'Ligand Pharmaceuticals',
    'MAGS': 'Magnet Forensics Inc',
    'STX': 'Seagate Technology',
    'CRDO': 'Credo Technology Group',
    'TSLA': 'Tesla Inc',
    'MP': 'MP Materials Corp',
    'TPR': 'Tapestry Inc',
    'B': 'Barnes Group Inc',
    'ALAB': 'Astera Labs Inc',
    'NMRK': 'Newmark Group Inc',
    'MCHI': 'iShares MSCI China ETF',
    'AFK': 'VanEck Africa Index ETF',
    'LIT': 'Global X Lithium & Battery Tech ETF',
    'NLR': 'VanEck Uranium+Nuclear Energy ETF',
    'TSEM': 'Tower Semiconductor Ltd',
    'XME': 'SPDR S&P Metals & Mining ETF',
    'DAPP': 'VanEck Digital Transformation ETF',
    'SNDK': 'SandRidge Energy Inc',
    'EVR': 'Evercore Inc',
    'IDCC': 'InterDigital Inc',
    'AMG': 'Affiliated Managers Group',
    'APP': 'AppLovin Corporation',
    'BITQ': 'Bitwise Crypto Industry Innovators ETF',
    'PFSI': 'PennyMac Financial Services',
    'BKCH': 'Global X Blockchain ETF',
    'HOOD': 'Robinhood Markets Inc',
    'AXON': 'Axon Enterprise Inc',
    'PLTR': 'Palantir Technologies Inc',
    'PVLA': 'Privata Inc',
    'TREE': 'LendingTree Inc',
    'ENS': 'EnerSys',
    'SHOP': 'Shopify Inc',
    'NET': 'Cloudflare Inc',
    'HIMS': 'Hims & Hers Health Inc',
    'CRWV': 'Crown Electrokinetics Corp',
    'FLEX': 'Flex Ltd',
    'JBL': 'Jabil Inc',
    'RYCEY': 'Rolls-Royce Holdings plc',
    'CLS': 'Celestica Inc',
    'DASH': 'DoorDash Inc',
    'WBD': 'Warner Bros. Discovery Inc',
    'ILF': 'iShares Latin America 40 ETF',
    'SLVP': 'iShares MSCI Global Silver Miners ETF',
    'OKLO': 'Oklo Inc',
    'NEM': 'Newmont Corporation'
  };

  const data = TOP_50_SYMBOLS.map((symbol) => {
    // Generate consistent data using symbol as seed
    const price = seededRandom(10, 500, symbol);
    const change = seededRandom(-15, 15, symbol + '_change');
    const changePercent = (change / price) * 100;
    
    // Technical indicators with your momentum formula: MOM = P(t) - P(t-n)
    const mom21 = seededRandom(-20, 30, symbol + '_mom21');
    const mom42 = seededRandom(-25, 40, symbol + '_mom42');
    const mom63 = seededRandom(-30, 50, symbol + '_mom63');
    const rsi14 = seededRandom(20, 80, symbol + '_rsi');
    const atr14 = seededRandom(1, 8, symbol + '_atr');
    const macdHist = seededRandom(-2, 2, symbol + '_macd');
    
    // Calculate composite momentum score
    const momentumScore = calculateMomentumScore(mom21, mom42, mom63);
    
    // Breakout analysis
    const breakout = detectBreakout(momentumScore, atr14);
    
    // Grading
    const momentumGrade = assignMomentumGrade(momentumScore, rsi14);
    const trendStrength = assessTrendStrength(momentumScore, rsi14);
    
    return {
      symbol,
      name: stockNames[symbol] || symbol,
      price,
      change,
      changePercent,
      mom21,
      mom42,
      mom63,
      momentumScore,
      momentumRank: 0, // Will be assigned after sorting
      rsi14,
      atr14,
      macdHist,
      momentumGrade,
      trendStrength,
      isBreakout: breakout.isBreakout,
      breakoutType: breakout.breakoutType,
      lastUpdated: new Date().toISOString()
    };
  });

  // Sort by momentum score and assign ranks (1-47)
  return data
    .sort((a, b) => b.momentumScore - a.momentumScore)
    .map((item, index) => ({
      ...item,
      momentumRank: index + 1
    }));
};

// Format utilities
export const formatMomentumScore = (score: number): string => {
  return score > 0 ? `+${score.toFixed(2)}` : score.toFixed(2);
};

export const getMomentumColor = (score: number): string => {
  if (score > 10) return 'text-green-400';
  if (score > 5) return 'text-green-300';
  if (score > 0) return 'text-slate-light';
  if (score > -5) return 'text-red-300';
  return 'text-red-400';
};

export const getGradeColor = (grade: string): string => {
  if (grade.startsWith('A')) return 'text-green-400 bg-green-400/10';
  if (grade.startsWith('B')) return 'text-blue-400 bg-blue-400/10';
  if (grade.startsWith('C')) return 'text-yellow-400 bg-yellow-400/10';
  return 'text-red-400 bg-red-400/10';
};

export const getRankColor = (rank: number): string => {
  if (rank <= 5) return 'bg-green-500/20 text-green-400';
  if (rank <= 15) return 'bg-blue-500/20 text-blue-400';
  if (rank <= 30) return 'bg-yellow-500/20 text-yellow-400';
  return 'bg-slate-500/20 text-slate-light';
}; 