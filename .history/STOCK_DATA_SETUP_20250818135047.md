# Stock Data Setup Guide

## Option 1: Google Sheets + GOOGLEFINANCE (Recommended)

This is the easiest and most reliable way to get real-time stock data for your Delta32 platform.

### Step 1: Create Your Google Sheet

1. **Create a new Google Sheet**: https://sheets.google.com
2. **Name it**: "Delta32 Stock Watchlist"
3. **Set up columns** in Row 1 (headers):
   ```
   A1: Symbol
   B1: Name  
   C1: Price
   D1: Change
   E1: Change %
   F1: Market Cap
   G1: Volume
   ```

### Step 2: Add Stock Symbols and GOOGLEFINANCE Formulas

Starting from Row 2, add your stocks:

**Row 2 (AAPL example):**
- A2: `AAPL`
- B2: `=GOOGLEFINANCE("AAPL","name")`
- C2: `=GOOGLEFINANCE("AAPL","price")`
- D2: `=GOOGLEFINANCE("AAPL","change")`
- E2: `=GOOGLEFINANCE("AAPL","changepct")`
- F2: `=GOOGLEFINANCE("AAPL","marketcap")`
- G2: `=GOOGLEFINANCE("AAPL","volume")`

**Copy this pattern for all your stocks:**
```
Row 3: MSFT
Row 4: NVDA  
Row 5: AMZN
Row 6: GOOGL
Row 7: META
Row 8: TSLA
Row 9: JPM
Row 10: V
Row 11: WMT
```

### Step 3: Make Sheet Public

1. **Click "Share"** (top-right corner)
2. **Change access**: "Anyone with the link can view"
3. **Copy the Share Link**
4. **Extract Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit...
   ```

### Step 4: Get Google Sheets API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google Sheets API"
4. Create credentials → API Key
5. Copy your API key

### Step 5: Configure Your App

Create a `.env` file in your Delta32 project:
```env
REACT_APP_GOOGLE_SHEETS_API_KEY=your_api_key_here
REACT_APP_GOOGLE_SHEET_ID=your_sheet_id_here
```

---

## Option 2: Yahoo Finance API

### Free APIs Available:

1. **RapidAPI Yahoo Finance** (Recommended)
   - URL: https://rapidapi.com/sparior/api/yahoo-finance15
   - Free tier: 500 requests/month
   - Setup: Sign up, get API key

2. **Alpha Vantage** 
   - URL: https://www.alphavantage.co/
   - Free tier: 25 requests/day
   - Setup: Sign up, get API key

### Configure API Keys

Add to your `.env` file:
```env
REACT_APP_YAHOO_API_KEY=your_rapidapi_key_here
REACT_APP_ALPHA_VANTAGE_KEY=your_alpha_vantage_key_here
```

---

## Option 3: Manual Data Entry

If you prefer full control, you can manually update the stock data in:
- `utils/api.ts` (current mock data)
- Update prices periodically

---

## Implementation

### Update Watchlist Component

Choose your data source in `pages/watchlist.tsx`:

```typescript
// Option 1: Google Sheets
import { fetchGoogleSheetsData } from '../utils/googleSheetsApi'
const data = await fetchGoogleSheetsData()

// Option 2: Yahoo Finance
import { fetchRealStockData } from '../utils/yahooFinanceApi'  
const data = await fetchRealStockData()

// Option 3: Mock Data (current)
import { fetchStockData } from '../utils/api'
const data = await fetchStockData()
```

---

## Recommended Approach: Google Sheets

**Why Google Sheets is best:**
- ✅ **Free** - No API limits or costs
- ✅ **Real-time** - GOOGLEFINANCE updates automatically
- ✅ **Reliable** - Google's data is accurate
- ✅ **Flexible** - Easy to add/remove stocks
- ✅ **No coding** - Pure spreadsheet functions
- ✅ **Visual** - You can see your data in the sheet

**Sample Google Sheet Layout:**
```
| Symbol | Name           | Price  | Change | Change % | Market Cap | Volume    |
|--------|----------------|--------|--------|----------|------------|-----------|
| AAPL   | Apple Inc.     | 172.62 | 2.35   | 1.38%    | 2.75T      | 58,432,100|
| MSFT   | Microsoft Corp.| 337.20 | 3.14   | 0.94%    | 2.51T      | 23,145,600|
| NVDA   | NVIDIA Corp.   | 437.53 | 15.32  | 3.63%    | 1.08T      | 42,367,800|
```

The GOOGLEFINANCE formulas will automatically update throughout the trading day! 