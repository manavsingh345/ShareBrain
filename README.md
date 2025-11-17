📘 SecondBrain — AI Visual Board & Knowledge Base

SecondBrain is an AI-powered personal knowledge management system that helps users collect, organize, visualize, and interact with information from multiple sources in one unified workspace.
Users can upload PDFs, YouTube videos, website links, tweets, documents, and notes — and instantly generate AI-powered insights using Retrieval-Augmented Generation (RAG).

🚀 Features
🔹 AI Visual Board (Interactive Workspace)

Drag-and-drop nodes

Create and link knowledge blocks

Manage custom pages visually

Real-time context-aware AI suggestions

🔹 Multi-Source Content Ingestion

PDF uploads

YouTube video transcript extraction

Website scraping

Tweets / X text

Plain text & documents

All stored as structured knowledge blocks

🔹 Vector Search & AI Retrieval

Qdrant Vector DB (Dockerized)

LangChain text-chunking pipeline

Embeddings generated using Gemini Flash 2.5 Lite

Fast and accurate semantic search

🔹 Scalable Background Job System

BullMQ + Redis for queue processing

Background workers for:

Text extraction

Transcription

Content chunking

Embedding generation

Improves reliability and performance

🔹 RAG Chat Interface

Chat with your own uploaded knowledge

Zero hallucination (answers only from your content)

Citation support for transparency

🔹 Browser Extension (Optional)

Save articles, posts, and links directly to SecondBrain

One-click knowledge capture

🛠️ Tech Stack
Frontend

Next.js

React.js

Tailwind CSS

React Flow (for visual board)

Backend

Node.js

Express.js

BullMQ (job queues)

Redis (worker store)

Docker (containerization)

AI / LLM / RAG

LangChain

Qdrant Vector DB

Gemini Flash 2.5 Lite (embeddings + LLM)

Others

YouTube Data API

Web scrapers (Cheerio / Puppeteer)

PDF parsers

📂 Project Structure
/backend
  /routes
  /controllers
  /workers
  /queues
  /utils
  docker-compose.yml

/frontend
  /components
  /pages
  /hooks
  /context
  /visual-board

/extensions
  /chrome-extension

README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/secondbrain.git
cd secondbrain

2️⃣ Start Qdrant + Redis using Docker
docker-compose up -d

3️⃣ Install backend dependencies
cd backend
npm install
npm run dev

4️⃣ Install frontend dependencies
cd ../frontend
npm install
npm run dev

🔄 How It Works

User uploads a file or link

A BullMQ job is created

Worker extracts text → chunks → embeddings

Embeddings are stored in Qdrant

User interacts with Visual Board

RAG Chat retrieves relevant chunks and generates responses

📌 Key Highlights

Fully containerized backend

Real RAG pipeline with Gemini embeddings

Scalable ingestion system

Interactive AI-powered workspace

MERN + LLM hybrid architecture

🧪 Future Enhancements

Audio ingestion (speech-to-text)

Cross-page knowledge graph

Multi-model support (Claude, GPT, Grok)

Team collaboration & shared spaces

🤝 Contributions

Pull requests, issues, and suggestions are welcome!

📜 License

MIT License
