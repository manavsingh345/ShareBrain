SecondBrain – AI Visual Board & Knowledge Base

A modern AI-powered personal knowledge OS built with Next.js, LangChain, Qdrant, BullMQ, Redis, and Gemini Flash 2.5 Lite.
SecondBrain lets you capture, organize, visualize, and chat with your knowledge — including PDFs, YouTube videos, tweets, website links, documents, and text notes — all in one unified and intelligent workspace.

🚀 Live Demo

Coming Soon…

🧩 Features
🗃️ Multi-Source Knowledge Ingestion

Supports uploading and processing:

📄 PDFs

🔗 Website URLs

🎥 YouTube videos (auto transcript extraction)

🐦 Tweets / X posts

📝 Plain text & document files

All content is cleaned, chunked, embedded, and stored automatically.

🧬 AI-Powered Semantic Search

Powered by:

Qdrant (Vector DB)

LangChain pipelines

Gemini Flash 2.5 Lite embeddings

This enables fast, accurate, context-aware search across all stored knowledge.

⚙️ Scalable Background Job System

Using BullMQ + Redis:

🔄 Text extraction

📝 Chunking

🧩 Embedding generation

🎙️ Transcription (for YouTube inputs)

Workers run independently for high throughput and zero lag.

🗺️ AI Visual Board

A Notion-like AI canvas where users can:

🟦 Drag & drop visual nodes

🔗 Link knowledge blocks

🗂️ Create multi-page workspaces

✨ Get AI suggestions directly on the board

Built using React + React Flow.

🤖 RAG Chat Interface

Ask AI questions about your stored content:

Answers strictly from your uploads

Zero hallucination

Cited references from retrieved chunks

Uses a full RAG (Retrieval-Augmented Generation) pipeline

🏗️ Tech Stack
🎨 Frontend

Next.js

React.js

Tailwind CSS

React Flow (Visual Board)

🧠 AI & RAG Pipeline

LangChain

Gemini Flash 2.5 Lite

Qdrant (Dockerized)

Vector Embeddings + Semantic Search

🛠️ Backend

Node.js

Express.js

BullMQ

Redis

Docker Compose

📡 APIs & Tools

YouTube Transcript API

Cheerio / Puppeteer (Web scraping)

PDF Parsers
