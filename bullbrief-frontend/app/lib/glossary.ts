export type GlossaryCategory =
  | "Valuation"
  | "Profitability"
  | "Risk & Ownership"
  | "Growth"
  | "Income"
  | "Market Concepts";

export interface GlossaryTerm {
  id: string;
  name: string;
  abbreviation?: string;
  category: GlossaryCategory;
  tagline: string;           // ≤ 12 words — shown on the card header
  definition: string;        // plain-English paragraph
  formula?: string;          // e.g. "Stock Price ÷ EPS"
  example?: string;          // concrete, numbers-based
  signal?: {                 // what a high/low value means
    high: string;
    low: string;
  };
  typical?: string;          // "15–25x for large-caps"
  keyTakeaway: string;       // one-liner for investors
}

export const GLOSSARY: GlossaryTerm[] = [
  // ── Valuation ─────────────────────────────────────────────────────────────
  {
    id: "pe-ratio",
    name: "P/E Ratio",
    abbreviation: "P/E",
    category: "Valuation",
    tagline: "How much investors pay per $1 of earnings",
    definition:
      "The Price-to-Earnings ratio tells you how many dollars the market is paying for every dollar of profit a company generates. It's the single most-watched valuation metric on Wall Street. A higher P/E means investors expect strong future growth — they're willing to pay a premium today. A lower P/E can mean the stock is cheap relative to earnings, or that the business is struggling.",
    formula: "Current Stock Price ÷ Earnings Per Share (EPS, trailing 12 months)",
    example:
      "If AAPL trades at $200 and earned $6.50/share in the past year, its P/E is 200 ÷ 6.50 = 30.8x. Investors pay $30.80 for every $1 of Apple's earnings.",
    signal: {
      high: "Market expects high future growth — or the stock may be overvalued.",
      low: "Stock may be undervalued, or the business faces challenges.",
    },
    typical: "15–25x for S&P 500 large-caps; tech stocks often trade 30–60x",
    keyTakeaway:
      "Compare P/E to peers in the same industry — a 'high' or 'low' P/E only makes sense in context.",
  },
  {
    id: "forward-pe",
    name: "Forward P/E",
    abbreviation: "Fwd P/E",
    category: "Valuation",
    tagline: "P/E based on next year's expected earnings",
    definition:
      "Forward P/E uses analysts' consensus earnings estimates for the next 12 months instead of historical earnings. Because it's forward-looking, it better reflects where the company is heading. If Forward P/E is meaningfully lower than trailing P/E, the company is expected to grow earnings quickly — which justifies a high current multiple.",
    formula: "Current Stock Price ÷ Estimated EPS (next 12 months)",
    example:
      "If NVDA trades at $900 and analysts expect $25 EPS next year, Forward P/E = 900 ÷ 25 = 36x. Much lower than trailing P/E of 65x signals strong expected earnings growth.",
    signal: {
      high: "Market is paying a large premium relative to expected future earnings.",
      low: "Stock may be cheap relative to near-term expected profits.",
    },
    typical: "Forward P/E < trailing P/E usually indicates expected earnings growth",
    keyTakeaway:
      "A rapidly falling Forward P/E (price stays flat, earnings estimates rise) is often a bullish sign.",
  },
  {
    id: "peg-ratio",
    name: "PEG Ratio",
    category: "Valuation",
    tagline: "P/E ratio adjusted for growth — a fairer comparison",
    definition:
      "The PEG ratio solves one of the P/E ratio's biggest limitations: it adjusts for earnings growth. A high-growth company deserves a higher P/E, so comparing raw P/E across different growth rates is misleading. PEG brings them to the same footing. A PEG under 1.0 is generally considered undervalued — you're getting more growth than you're paying for.",
    formula: "P/E Ratio ÷ Earnings Growth Rate (%)",
    example:
      "Company A has P/E of 40 and grows earnings at 40%/yr → PEG = 1.0. Company B has P/E of 20 but only grows at 5%/yr → PEG = 4.0. Company A is actually cheaper on a growth-adjusted basis.",
    signal: {
      high: "Overpaying for the growth you're getting — potentially overvalued.",
      low: "Getting significant growth at a reasonable price — potentially undervalued.",
    },
    typical: "< 1.0 often considered attractive; > 2.0 suggests elevated valuation",
    keyTakeaway:
      "PEG is most useful for comparing growth stocks — it levels the playing field between slow and fast growers.",
  },
  {
    id: "price-to-book",
    name: "Price / Book",
    abbreviation: "P/B",
    category: "Valuation",
    tagline: "What you pay vs. what the company owns on paper",
    definition:
      "The Price-to-Book ratio compares a stock's market value to the company's net assets (assets minus liabilities) as recorded on its balance sheet. A P/B below 1.0 means you can theoretically buy the company for less than its accounting value of assets. It's most meaningful for asset-heavy industries like banks, real estate, and manufacturing.",
    formula: "Stock Price ÷ Book Value Per Share",
    example:
      "A bank stock at $40 with book value of $50/share has P/B = 0.8x — the market values it below its stated net assets, which could signal undervaluation or investor concerns about asset quality.",
    signal: {
      high: "Market values intangibles (brand, IP, growth) heavily above balance sheet.",
      low: "Stock may be cheap, or assets may be impaired. Common in mature/declining sectors.",
    },
    typical: "1–3x for most industries; banks often trade at 0.8–1.5x",
    keyTakeaway:
      "P/B is less useful for tech and services companies whose main assets are intangible (software, talent, brand).",
  },
  {
    id: "price-to-sales",
    name: "Price / Sales",
    abbreviation: "P/S",
    category: "Valuation",
    tagline: "Valuation relative to revenue — useful when profits are thin",
    definition:
      "Price-to-Sales compares a company's market cap to its total annual revenue. It's especially useful for companies that aren't yet profitable (many early-stage tech or biotech companies) where P/E can't be computed. It shows how much investors are paying per dollar of revenue.",
    formula: "Market Cap ÷ Total Revenue (trailing 12 months)",
    example:
      "A SaaS startup with $500M revenue and $5B market cap has P/S = 10x. A legacy retailer with $10B revenue and $8B market cap has P/S = 0.8x. Very different investor expectations.",
    signal: {
      high: "Investors expect substantial revenue growth — or stock may be speculative.",
      low: "Revenue is cheap relative to market value — may be a value opportunity.",
    },
    typical: "< 2x for value stocks; 5–15x+ common for high-growth tech",
    keyTakeaway:
      "P/S ignores profitability — a company with great revenue but terrible margins can still be a bad investment.",
  },
  {
    id: "market-cap",
    name: "Market Cap",
    category: "Valuation",
    tagline: "The total dollar value the market puts on a company",
    definition:
      "Market capitalization is simply the total market value of all a company's outstanding shares. It represents what it would cost to buy the entire company at the current share price. Companies are often classified by size: Mega-cap ($200B+), Large-cap ($10B–$200B), Mid-cap ($2B–$10B), Small-cap ($300M–$2B), and Micro-cap (< $300M).",
    formula: "Share Price × Total Shares Outstanding",
    example:
      "Apple at $200/share with 15.4B shares outstanding → Market Cap = $3.08 trillion. It would cost roughly $3 trillion to acquire all of Apple at today's price.",
    signal: {
      high: "Mega/large-caps offer more stability and liquidity, but less growth upside.",
      low: "Small-caps carry higher risk but can offer explosive growth potential.",
    },
    typical: "S&P 500 minimum is roughly $15B market cap",
    keyTakeaway:
      "Market cap tells you size, not value. A $1T company can still be a bargain — or a $1B company can be wildly overvalued.",
  },

  // ── Profitability ──────────────────────────────────────────────────────────
  {
    id: "eps",
    name: "EPS (TTM)",
    abbreviation: "EPS",
    category: "Profitability",
    tagline: "Profit per share — the foundation of valuation",
    definition:
      "Earnings Per Share (EPS) is the company's total net profit divided by the number of shares outstanding. TTM stands for Trailing Twelve Months, meaning the actual earnings over the past year. EPS is the denominator of the P/E ratio and is arguably the most important fundamental metric for evaluating a company's profitability.",
    formula: "Net Income ÷ Diluted Shares Outstanding",
    example:
      "If Microsoft earns $75B in net income with 7.5B shares outstanding, EPS = $10.00. If the stock trades at $420, the P/E is 42x.",
    signal: {
      high: "Strong profits relative to share count. Positive EPS = profitable company.",
      low: "Negative EPS means the company is losing money on a per-share basis.",
    },
    typical: "Varies wildly by sector — compare to prior year and to peers",
    keyTakeaway:
      "Trending EPS matters more than a single number — look for consistent year-over-year growth.",
  },
  {
    id: "roe",
    name: "ROE",
    abbreviation: "ROE",
    category: "Profitability",
    tagline: "How efficiently a company uses shareholders' money to earn profits",
    definition:
      "Return on Equity measures how much profit a company generates for every dollar of shareholders' equity (money shareholders have invested). It's a key indicator of management efficiency. Warren Buffett considers ROE one of the most important metrics when evaluating a business. A consistently high ROE suggests a durable competitive advantage.",
    formula: "Net Income ÷ Average Shareholders' Equity × 100",
    example:
      "If a company earns $5B in net income and shareholders have $25B of equity invested, ROE = 20%. For every $100 shareholders have in the business, the company earns $20 in profit.",
    signal: {
      high: "Strong profitability and efficient use of equity — competitive advantage.",
      low: "May indicate poor management efficiency or a capital-intensive business.",
    },
    typical: "15–25%+ considered strong; < 10% generally weak",
    keyTakeaway:
      "Be cautious of very high ROE driven by heavy debt (leverage artificially inflates it). Check debt levels alongside ROE.",
  },
  {
    id: "profit-margin",
    name: "Profit Margin",
    category: "Profitability",
    tagline: "How many cents of profit per dollar of revenue",
    definition:
      "Net profit margin shows what percentage of revenue actually becomes profit after all costs — including cost of goods, operating expenses, interest, and taxes. It's a core measure of business efficiency. High margins signal pricing power and operational excellence; thin margins mean the business is a grind.",
    formula: "Net Income ÷ Total Revenue × 100",
    example:
      "Apple's revenue is $400B and net income is $100B → profit margin = 25%. They keep $0.25 of every dollar they bring in. A typical grocery store margins around 2–3%.",
    signal: {
      high: "Strong pricing power, low costs, or both. Business is very efficient.",
      low: "Commodity-like product, high competition, or poor cost control.",
    },
    typical: "SaaS: 20–30%+; retail: 2–5%; banking: 20–30%; industrials: 5–12%",
    keyTakeaway:
      "Compare profit margins within the same industry — a 5% margin is great for a retailer but terrible for a software company.",
  },
  {
    id: "free-cash-flow",
    name: "Free Cash Flow",
    abbreviation: "FCF",
    category: "Profitability",
    tagline: "Real cash left over after running and maintaining the business",
    definition:
      "Free cash flow is arguably the purest measure of financial health. Unlike earnings (which can be manipulated with accounting), FCF is actual cash generated after paying for operations and capital expenditures (equipment, buildings, infrastructure). Companies use FCF to pay dividends, buy back stock, pay down debt, or reinvest in growth.",
    formula: "Operating Cash Flow − Capital Expenditures",
    example:
      "If a company generates $10B from operations and spends $2B on factories and equipment, FCF = $8B. That $8B can be returned to shareholders or reinvested.",
    signal: {
      high: "Business generates real cash — can self-fund growth, return capital, or weather downturns.",
      low: "Negative FCF may mean heavy investment phase — acceptable for growth companies, concerning for mature ones.",
    },
    typical: "Positive FCF is the key threshold; FCF yield (FCF ÷ Market Cap) > 4% is attractive",
    keyTakeaway:
      "\"Cash is king\" — FCF is what pays dividends and buybacks. Earnings can be an illusion; FCF is real.",
  },
  {
    id: "debt-to-equity",
    name: "Debt / Equity",
    abbreviation: "D/E",
    category: "Profitability",
    tagline: "How much debt the company carries vs. shareholder value",
    definition:
      "The Debt-to-Equity ratio shows how leveraged a company is — how much it relies on borrowed money versus shareholder capital to fund its operations. High leverage amplifies both gains and losses: it can boost returns in good times but make companies fragile in downturns when interest payments become a burden.",
    formula: "Total Debt ÷ Total Shareholders' Equity",
    example:
      "D/E of 0.5 means for every $1 of equity, the company has $0.50 in debt — relatively conservative. D/E of 3.0 means $3 in debt for every $1 of equity — highly leveraged.",
    signal: {
      high: "Heavy reliance on debt — interest payments can strain cash flow if revenue dips.",
      low: "Conservative capital structure — lower risk but may not be optimizing growth.",
    },
    typical: "0–1.0 conservative; 1–2.0 moderate; > 2.0 aggressive (fine for banks, concerning for others)",
    keyTakeaway:
      "Context matters: utilities and banks naturally carry high D/E, while tech companies typically run low.",
  },

  // ── Risk & Ownership ───────────────────────────────────────────────────────
  {
    id: "beta",
    name: "Beta",
    category: "Risk & Ownership",
    tagline: "How volatile a stock is compared to the overall market",
    definition:
      "Beta measures a stock's price sensitivity relative to the broader market (typically the S&P 500, which has a Beta of 1.0). A Beta of 1.5 means the stock tends to move 50% more than the market — up 15% when the market rises 10%, and down 15% when it falls 10%. Beta only measures historical price volatility, not business or financial risk.",
    formula: "Calculated from regression of stock returns vs. market returns",
    example:
      "A utility stock with Beta of 0.4 barely moves when markets swing. NVDA with Beta of 1.8 amplifies market moves by 80%. During a 20% market crash, NVDA would be expected to fall ~36%.",
    signal: {
      high: "High volatility — amplified gains in bull markets, amplified losses in bear markets.",
      low: "Defensive, stable stock — moves less than the market in both directions.",
    },
    typical: "< 0.8: defensive; 0.8–1.2: market-like; > 1.5: high volatility",
    keyTakeaway:
      "Beta is a tool for risk management, not stock picking. Low-Beta stocks aren't automatically better investments.",
  },
  {
    id: "short-interest",
    name: "Short % of Float",
    category: "Risk & Ownership",
    tagline: "How many investors are betting the stock will fall",
    definition:
      "Short interest shows the percentage of tradeable shares that have been borrowed and sold short — meaning investors who sold them are betting the price will fall so they can buy back cheaper. High short interest can be bearish (many smart investors skeptical of the company) or contrarian — if the stock rises, a short squeeze can cause rapid price appreciation.",
    formula: "Shares Sold Short ÷ Float (tradeable shares) × 100",
    example:
      "GameStop had ~140% short interest in early 2021. When retail investors bought aggressively, shorts had to buy shares to cover losses, sending the stock from $20 to $500 in weeks — a historic short squeeze.",
    signal: {
      high: "> 20% is considered very high short interest. Can signal major concern — or a squeeze setup.",
      low: "Most investors are not betting against the stock.",
    },
    typical: "< 5% normal; 5–15% elevated; > 20% very high",
    keyTakeaway:
      "High short interest isn't automatically bearish — a strong earnings surprise can trigger a short squeeze and rocket the price.",
  },
  {
    id: "institutional-ownership",
    name: "Institutional Ownership",
    category: "Risk & Ownership",
    tagline: "How much of the stock is held by major investment firms",
    definition:
      "Institutional ownership shows the percentage of shares held by large professional investors: mutual funds, pension funds, hedge funds, insurance companies, and ETF providers. High institutional ownership means the stock is well-researched and trusted by professionals. However, if institutions all decide to sell at once, the selling pressure can be severe.",
    formula: "Shares held by institutions ÷ Total shares outstanding × 100",
    example:
      "Apple has ~65% institutional ownership — the majority of its shares are held by funds like Vanguard, BlackRock, and Fidelity. This signals broad professional confidence.",
    signal: {
      high: "Broad institutional confidence — typically positive. Also means more stability.",
      low: "Less analyst coverage or interest — common in small-caps and underfollowed stocks.",
    },
    typical: "Large-caps: 60–80%; small-caps: 20–50%",
    keyTakeaway:
      "Rising institutional ownership over time can signal growing conviction. Watch SEC 13F filings for institutional moves.",
  },
  {
    id: "52w-range",
    name: "52-Week Range",
    category: "Risk & Ownership",
    tagline: "The stock's highest and lowest price over the past year",
    definition:
      "The 52-week range shows the lowest and highest prices a stock has traded at during the past year. It provides context for where the current price sits relative to its recent history — near the bottom of its range might suggest opportunity or continued weakness; near the top might indicate momentum or overextension.",
    formula: "52W Low — 52W High (no calculation needed — this is market data)",
    example:
      "NVDA's 52-week range is $460 – $974. If today's price is $850, it's trading 85% of the way up its range — near its highs, suggesting strong momentum.",
    signal: {
      high: "Trading near 52W high often signals strong momentum — but may mean less upside.",
      low: "Trading near 52W low can mean trouble — or a buying opportunity at a discount.",
    },
    typical: "Most investors prefer a stock not already at its 52W high unless momentum is strong",
    keyTakeaway:
      "The 52W range provides context, not a buy/sell signal by itself. Always pair with fundamentals.",
  },

  // ── Growth ─────────────────────────────────────────────────────────────────
  {
    id: "revenue-growth",
    name: "Revenue Growth",
    category: "Growth",
    tagline: "How fast the company's sales are expanding year-over-year",
    definition:
      "Revenue growth measures the percentage increase in a company's top-line sales from one period to the next (usually year-over-year). It's the clearest signal of business demand and market expansion. High revenue growth is especially important for companies not yet profitable — it shows the business is gaining traction even before margins improve.",
    formula: "(Current Revenue − Prior Year Revenue) ÷ Prior Year Revenue × 100",
    example:
      "If revenue was $10B last year and $13B this year, growth = 30%. That's exceptional for a large company. A 5% growth rate might be healthy for a mature business but disappointing for a startup.",
    signal: {
      high: "Business is winning customers and expanding — very bullish signal.",
      low: "Business may be maturing, losing market share, or facing headwinds.",
    },
    typical: "Mature large-caps: 3–8%; growth companies: 15–50%+",
    keyTakeaway:
      "Decelerating revenue growth (e.g., from 50% to 25% to 10%) is often a warning sign even if growth is still positive.",
  },
  {
    id: "earnings-growth",
    name: "Earnings Growth",
    category: "Growth",
    tagline: "How fast profits are growing year-over-year",
    definition:
      "Earnings growth measures the percentage increase in net income or EPS from one period to the next. While revenue growth shows the top line, earnings growth shows whether the company is translating sales into actual profit growth. Companies can grow revenue without growing earnings if costs rise faster than sales.",
    formula: "(Current EPS − Prior Year EPS) ÷ |Prior Year EPS| × 100",
    example:
      "If EPS was $2.00 last year and $2.60 this year, earnings growth = 30%. Strong earnings growth + revenue growth together is the gold standard for quality growth stocks.",
    signal: {
      high: "Company is not only growing revenue but converting it into profit efficiently.",
      low: "Revenue may be growing but costs are consuming the gains — margin compression.",
    },
    typical: "S&P 500 average: 8–10%/yr; strong growth stocks: 20–50%+",
    keyTakeaway:
      "Long-run stock prices tend to track earnings growth. A company that grows EPS at 15%/yr will likely see its stock appreciate similarly over time.",
  },

  // ── Income ─────────────────────────────────────────────────────────────────
  {
    id: "dividend-yield",
    name: "Dividend Yield",
    category: "Income",
    tagline: "Annual cash payout as a percentage of the stock price",
    definition:
      "Dividend yield tells you how much annual income you receive in dividends for every dollar invested. It's like an interest rate on your investment from the company's cash distributions. High dividend yield can signal an income-rich stock — or a stock whose price has fallen sharply (yield = dividend ÷ price, so a falling price inflates yield).",
    formula: "Annual Dividends Per Share ÷ Stock Price × 100",
    example:
      "If a stock pays $4/year in dividends and trades at $100, yield = 4%. If the stock falls to $50 (and dividend is unchanged), yield jumps to 8% — but that high yield might be a \"yield trap\" if the business is deteriorating.",
    signal: {
      high: "Attractive income, but verify the dividend is sustainable (check payout ratio).",
      low: "Company may be reinvesting profits for growth rather than paying them out.",
    },
    typical: "< 1%: growth-focused; 1–3%: balanced; 3–6%: income-oriented; > 6%: potentially risky",
    keyTakeaway:
      "A high, sustainable dividend yield with a growing payout history is a hallmark of quality income investments.",
  },

  // ── Market Concepts ────────────────────────────────────────────────────────
  {
    id: "bull-market",
    name: "Bull Market",
    category: "Market Concepts",
    tagline: "A sustained period of rising stock prices and investor optimism",
    definition:
      "A bull market is a prolonged period where stock prices are rising or are expected to rise, typically defined as a 20%+ gain from recent lows sustained over months. Bull markets are fueled by strong economic growth, low unemployment, rising corporate profits, and investor confidence. They can last months to years.",
    formula: "Typically defined as 20%+ rise from a recent low over at least 2 months",
    example:
      "The bull market from March 2009 to February 2020 lasted 11 years — the longest in U.S. history — as the S&P 500 rose over 400% from its financial crisis lows.",
    signal: {
      high: "Market rises 20%+ from lows → confirmed bull market.",
      low: "Market drops 20%+ from highs → confirmed bear market.",
    },
    typical: "Average bull market lasts ~4–5 years with ~170% total gains",
    keyTakeaway:
      "\"The trend is your friend.\" In a bull market, broadly diversified stock exposure tends to outperform most active strategies.",
  },
  {
    id: "bear-market",
    name: "Bear Market",
    category: "Market Concepts",
    tagline: "A sustained decline of 20%+ in stock prices from recent highs",
    definition:
      "A bear market occurs when a major index falls 20% or more from its recent peak, accompanied by widespread pessimism and negative investor sentiment. Bear markets are typically triggered by economic recessions, financial crises, or geopolitical shocks. Though painful, they create buying opportunities for long-term investors.",
    formula: "A decline of ≥ 20% from the most recent high, sustained over at least 2 months",
    example:
      "The 2008 financial crisis saw the S&P 500 fall ~57% peak to trough. The COVID bear market in early 2020 was the fastest ever — a 34% crash in just 33 days — followed by an equally fast recovery.",
    signal: {
      high: "Bear markets often end when fear peaks and valuations become extremely attractive.",
      low: "\"Buying the dip\" too early in a bear market can mean catching a falling knife.",
    },
    typical: "Average bear market lasts ~10 months with ~36% average decline",
    keyTakeaway:
      "Every bear market in U.S. history has been followed by a bull market that reached new all-time highs. Long-term investors stay the course.",
  },
  {
    id: "sector",
    name: "Sector",
    category: "Market Concepts",
    tagline: "A broad industry classification grouping similar companies",
    definition:
      "The stock market is divided into 11 official sectors by GICS (Global Industry Classification Standard): Technology, Healthcare, Financials, Consumer Discretionary, Consumer Staples, Energy, Materials, Industrials, Real Estate, Communication Services, and Utilities. Sectors help investors understand a company's business and compare it to true peers. They also move differently depending on the economic cycle.",
    example:
      "Apple (AAPL) is in Technology. JPMorgan (JPM) is in Financials. ExxonMobil (XOM) is in Energy. Each sector performs differently based on interest rates, economic growth, and inflation.",
    signal: {
      high: "Cyclical sectors (Energy, Financials, Industrials) outperform in economic expansions.",
      low: "Defensive sectors (Utilities, Consumer Staples, Healthcare) hold up better in recessions.",
    },
    typical: "S&P 500 sector weights shift over time — Technology is currently ~30%+",
    keyTakeaway:
      "Diversifying across sectors reduces the risk that one industry's downturn wipes out your portfolio.",
  },
  {
    id: "swot",
    name: "SWOT Analysis",
    category: "Market Concepts",
    tagline: "A structured framework to evaluate a company's position",
    definition:
      "SWOT stands for Strengths, Weaknesses, Opportunities, and Threats. It's a strategic analysis framework used by investors and business executives to assess a company's competitive position. Strengths and Weaknesses are internal (things the company controls), while Opportunities and Threats are external (market forces).",
    example:
      "Apple's SWOT might include: Strength (loyal customer base, massive cash reserves), Weakness (dependence on iPhone revenue), Opportunity (India market expansion), Threat (regulatory scrutiny in the EU and China).",
    signal: {
      high: "Dominant strengths + compelling opportunities = high-quality business.",
      low: "Significant threats + unaddressed weaknesses = caution warranted.",
    },
    keyTakeaway:
      "SWOT is a starting point, not a verdict. Use it to frame questions: Is management capitalizing on opportunities? Are the threats existential or manageable?",
  },
  {
    id: "dca",
    name: "Dollar-Cost Averaging",
    abbreviation: "DCA",
    category: "Market Concepts",
    tagline: "Investing fixed amounts regularly — regardless of price",
    definition:
      "Dollar-cost averaging is the strategy of investing a fixed dollar amount at regular intervals (weekly, monthly) regardless of what the market is doing. When prices are low, you buy more shares; when prices are high, you buy fewer. Over time, this produces an average cost per share that is lower than if you tried to time the market.",
    formula: "Fixed $ invested ÷ Share price at each interval = shares purchased",
    example:
      "Investing $500/month in an S&P 500 index fund. In a month when shares cost $50, you get 10 shares. When they drop to $40, you get 12.5 shares. Your average cost per share falls below the average market price.",
    signal: {
      high: "Particularly valuable in bear markets — you accumulate more shares as prices fall.",
      low: "In a steadily rising market, lump-sum investing historically outperforms DCA ~66% of the time.",
    },
    keyTakeaway:
      "DCA removes the pressure of timing the market. It's the strategy most financial advisors recommend for long-term investors building wealth.",
  },
  {
    id: "diversification",
    name: "Diversification",
    category: "Market Concepts",
    tagline: "Spreading investments to reduce the impact of any single failure",
    definition:
      "Diversification is the practice of spreading investments across different assets, sectors, geographies, and asset classes so that a single bad outcome doesn't devastate your portfolio. The core idea: different investments tend not to fall at the same time, so losses in one area are offset by stability or gains in another.",
    example:
      "An investor with 100% in tech stocks suffered enormous losses in 2022. An investor split between tech, healthcare, bonds, and international stocks experienced a much smoother ride — the other assets cushioned the tech decline.",
    signal: {
      high: "Broadly diversified portfolios consistently outperform concentrated ones on a risk-adjusted basis.",
      low: "Over-diversification (owning 100+ stocks) can dilute returns without proportional risk reduction.",
    },
    keyTakeaway:
      "As the saying goes: don't put all your eggs in one basket. True diversification means assets that genuinely behave differently — not 20 tech stocks.",
  },
];

export const CATEGORIES: GlossaryCategory[] = [
  "Valuation",
  "Profitability",
  "Risk & Ownership",
  "Growth",
  "Income",
  "Market Concepts",
];

export const CATEGORY_COLOR: Record<GlossaryCategory, { text: string; bg: string; border: string }> = {
  "Valuation":        { text: "#38bdf8", bg: "rgba(56,189,248,0.08)",   border: "rgba(56,189,248,0.2)" },
  "Profitability":    { text: "#10b981", bg: "rgba(16,185,129,0.08)",   border: "rgba(16,185,129,0.2)" },
  "Risk & Ownership": { text: "#f59e0b", bg: "rgba(245,158,11,0.08)",   border: "rgba(245,158,11,0.2)" },
  "Growth":           { text: "#818cf8", bg: "rgba(129,140,248,0.08)",  border: "rgba(129,140,248,0.2)" },
  "Income":           { text: "#a78bfa", bg: "rgba(167,139,250,0.08)",  border: "rgba(167,139,250,0.2)" },
  "Market Concepts":  { text: "#94a3b8", bg: "rgba(148,163,184,0.08)",  border: "rgba(148,163,184,0.2)" },
};

export function searchGlossary(query: string, category?: GlossaryCategory): GlossaryTerm[] {
  const q = query.toLowerCase().trim();
  return GLOSSARY.filter((t) => {
    const matchesCategory = !category || t.category === category;
    const matchesSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.abbreviation?.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
}
