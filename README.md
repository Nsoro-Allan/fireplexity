# Fireplexity

AI-powered search engine combining web scraping, news, images, and real-time stock data with conversational AI.

## Features

- 🔍 **Multi-source Search** - Web scraping with Firecrawl, news aggregation, and image search
- 💬 **Conversational Interface** - Chat-based search with follow-up questions and context retention
- 📊 **Stock Charts** - Real-time TradingView charts for stock queries
- 🎨 **Modern UI** - Dark/light mode with animated gradients and smooth transitions
- 📱 **Responsive Design** - Optimized for desktop and mobile
- 🔗 **Citation System** - Inline citations with source tooltips
- 📝 **Markdown Rendering** - Rich text formatting with syntax highlighting
- ⚡ **Streaming Responses** - Real-time AI responses with status updates

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **AI**: Groq API with streaming support
- **Web Scraping**: Firecrawl for content extraction
- **Styling**: Tailwind CSS 4 with custom animations
- **UI Components**: Radix UI primitives
- **Markdown**: react-markdown with remark-gfm and Shiki syntax highlighting
- **Charts**: TradingView widgets for stock data

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Nsoro-Allan/fireplexity.git
cd fireplexity
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env.local
```

Add your API keys to `.env.local`:

```env
FIRECRAWL_API_KEY=fc-your-api-key
GROQ_API_KEY=gsk_your-groq-api-key
```

## Run

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Keys

- **Firecrawl**: Get your API key at [firecrawl.dev](https://firecrawl.dev)
- **Groq**: Get your API key at [console.groq.com](https://console.groq.com/keys)

Note: If you don't have API keys in your environment, the app will prompt you to enter a Firecrawl API key via a modal dialog.

## Project Structure

```
app/
├── api/fireplexity/          # API routes
│   ├── search/               # Main search endpoint
│   └── check-env/            # Environment check endpoint
├── chat-interface.tsx        # Main chat UI component
├── search.tsx                # Initial search component
├── markdown-renderer.tsx     # Markdown with citations
├── stock-chart.tsx           # TradingView integration
├── news-results.tsx          # News display component
├── image-results.tsx         # Image gallery component
└── types.ts                  # TypeScript interfaces

components/
├── ui/                       # Reusable UI components
├── theme-provider.tsx        # Dark mode support
└── theme-toggle.tsx          # Theme switcher

lib/
├── company-ticker-map.ts     # Stock ticker mappings
├── content-selection.ts      # Content processing utilities
└── error-messages.ts         # Error handling
```

