# Fireplexity

An AI-powered search engine that combines web scraping, news aggregation, and image search with intelligent AI responses. Built with Next.js, Firecrawl, and Groq AI.

## Features

- **Multi-Source Search**: Simultaneously searches web pages, news articles, and images
- **AI-Powered Answers**: Uses Groq's Kimi K2 Instruct model to generate comprehensive, cited responses
- **Real-Time Streaming**: Streams search results and AI responses in real-time
- **Smart Content Selection**: Intelligently extracts and summarizes relevant content from sources
- **Stock Chart Integration**: Automatically detects company mentions and displays stock charts
- **Follow-Up Questions**: Generates contextual follow-up questions to deepen exploration
- **Dark Mode Support**: Full theme support with smooth transitions
- **Conversational Interface**: Maintains context across multiple queries in a chat-like experience
- **Citation System**: Inline citations linking AI responses to source materials

## How It Works

1. **User Query**: Enter a search query in the search interface
2. **Multi-Source Search**: The app uses Firecrawl's v2 API to search across:
   - Web pages (with markdown extraction)
   - News articles (with publication dates and images)
   - Images (with thumbnails and metadata)
3. **Content Processing**:
   - Extracts and formats content from up to 6 web sources
   - Intelligently selects relevant content sections (up to 2000 chars per source)
   - Detects company tickers for stock chart display
4. **AI Response Generation**:
   - Sends processed content to Groq's Kimi K2 Instruct model
   - Streams the AI-generated response with inline citations
   - Maintains conversation context for follow-up queries
5. **Follow-Up Generation**: Automatically generates 5 relevant follow-up questions
6. **Interactive Results**: Display search results, news, images, and AI answers with smooth animations

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **AI**: Groq API (Kimi K2 Instruct model)
- **Search & Scraping**: Firecrawl v2 API
- **UI Components**: Radix UI, Lucide Icons
- **Streaming**: Vercel AI SDK
- **Markdown**: React Markdown with syntax highlighting (Shiki)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/mendableai/fireplexity.git
cd fireplexity
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env.local
```

3. Add your API keys to `.env.local`:

```env
FIRECRAWL_API_KEY=fc-your-api-key
GROQ_API_KEY=gsk_your-groq-api-key
```

## Get API Keys

- **Firecrawl**: Sign up at [firecrawl.dev](https://firecrawl.dev) for web scraping and search
- **Groq**: Get your API key from [console.groq.com](https://console.groq.com/keys) for AI responses

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Make sure to add your environment variables in the Vercel project settings.

## API Routes

- `POST /api/fireplexity/search` - Main search endpoint that handles queries and streams responses
- `GET /api/fireplexity/check-env` - Checks if Firecrawl API key is configured

## Project Structure

```
app/
├── api/fireplexity/          # API routes
│   ├── search/               # Main search endpoint
│   └── check-env/            # Environment check
├── chat-interface.tsx        # Main chat UI component
├── search.tsx                # Search input component
├── markdown-renderer.tsx     # Markdown display with citations
├── search-results.tsx        # Web search results display
├── news-results.tsx          # News articles display
├── image-results.tsx         # Image results display
├── stock-chart.tsx           # Stock chart widget
└── types.ts                  # TypeScript interfaces

components/
├── ui/                       # Reusable UI components
└── theme-toggle-advanced.tsx # Theme switcher

lib/
├── company-ticker-map.ts     # Company name to ticker mapping
└── content-selection.ts      # Smart content extraction
```

## Features in Detail

### Search Capabilities

- Searches up to 6 web sources per query
- Extracts clean markdown content from web pages
- Filters content to most relevant sections (max 2000 chars per source)
- Caches results for 24 hours to improve performance

### AI Response

- Uses Groq's Kimi K2 Instruct (120B parameter model)
- Streams responses in real-time
- Includes inline citations [1], [2], etc.
- Maintains conversation context for follow-ups
- Temperature: 0.7 for balanced creativity and accuracy

### User Experience

- Responsive design for mobile and desktop
- Smooth animations and transitions
- Loading skeletons for better perceived performance
- Error handling with user-friendly messages
- Copy and regenerate response options

