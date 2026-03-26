// ============================================================
// PERSONAL INFO
// ============================================================
export const PERSONAL_INFO = {
  firstName: 'Aditya',
  lastName: 'Shinde',
  name: 'Aditya Shinde',
  role: 'App Development Associate',
  company: 'Accenture',
  taglines: [
    'AI/ML Enthusiast',
    'App Development Associate',
  ],
  bio: "Software Engineer with hands-on experience designing and deploying agentic AI systems, RAG pipelines, and LLM-powered document intelligence platforms. Proven track record benchmarking foundation models, building MLOps-ready inference APIs, and shipping end-to-end AI solutions on cloud infrastructure (GCP, Azure). Proficient in Python, LangChain, PyTorch, and production NLP — with the full-stack depth to own delivery from model evaluation to deployment.",
  bioShort: 'AI/ML Engineer & Full-stack developer building intelligent applications.',
  shortDescription: 'Building things that matter.',
  location: 'Bengaluru, Karnataka, India',
  email: 'shindeaditya07@gmail.com',
  github: 'https://github.com/shindeaditya07',
  githubUsername: 'shindeaditya07',
  linkedin: 'https://www.linkedin.com/in/aditya-shinde-342b71273/',
  linkedinUsername: 'shindeaditya07',
  resume: '/resume.pdf',
  resumeFileName: 'Aditya_Shinde_Resume.pdf',
  education: {
    degree: 'B.Tech Computer Science & Engineering',
    university: 'SRM Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    gpa: '8.4',
    year: '2024',
  },
}

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/publications', label: 'Publications' },
  { path: '/contact', label: 'Contact' },
]

// ============================================================
// EXPERIENCE (static fallback / seed data)
// ============================================================
export const EXPERIENCES = [
  {
    company: 'Accenture',
    role: 'Software Engineer – AI/ML',
    duration: 'Oct 2025 – Present',
    location: 'Bengaluru, India',
    type: 'Full Time',
    current: true,
    description: [
      'Benchmarked rule-based, ML, and LLM-based foundation model pipelines for a production Whitemail Intent Classification Agent — evaluating 3 architectures across accuracy, latency, and cost, and identifying an agentic AI workflow that improved classification F1-score by ~18% over the rule-based baseline.',
      'Designed a structured MLOps evaluation framework tracking precision, recall, and inference latency across model iterations, reducing evaluation cycle time by ~30% and enabling the team to ship a production-ready pipeline 2 weeks ahead of schedule.',
      'Architected and shipped a Human-in-the-Loop (HITL) feedback interface for the agentic classification pipeline, enabling real-time intent correction that fed a continuous retraining loop — reducing model error rate by ~22% over 3 months of production operation.',
    ],
    logo: '/assets/icons/AccentureLogo.webp',
    order: 1,
  },
  {
    company: 'Accenture',
    role: 'Software Engineer – AI/ML Intern',
    duration: 'Feb 2025 – Jun 2025',
    location: 'Bengaluru, India',
    type: 'Internship',
    current: false,
    description: [
      'Designed and deployed a RAG-based document intelligence system using Google Gemini Pro API for PDF summarisation and context-aware Q&A — processing documents up to 200 pages with end-to-end latency under 4 seconds per query.',
      'Built a semantic search layer using FAISS vector embeddings and Google Gemini API, enabling natural-language Q&A over enterprise document corpora — achieving 90%+ answer relevance across a 500-query evaluation set.',
      'Engineered RESTful inference APIs via FastAPI serving AI model predictions with p95 latency under 2 seconds, integrated with a Node.js frontend and monitored via structured request/response logging.',
      'Deployed the full-stack AI system on Vercel and GitHub for containerised inference serving, with MongoDB Atlas for document metadata — sustaining concurrent multi-user access with 99%+ uptime over the deployment period.',
    ],
    logo: '/assets/icons/AccentureLogo.webp',
    order: 2,
  },
  {
    company: 'Infosys',
    role: 'AI/ML Intern',
    duration: 'Jun 2024 – Aug 2024',
    location: 'Chennai, India (Remote)',
    type: 'Internship',
    current: false,
    description: [
      'Built InfoFetch, an agentic AI platform for autonomous company intelligence gathering — orchestrating multistep LangChain agent workflows using OpenAI GPT and SerpAPI to plan, search, and synthesise insights across 20+ data sources without manual intervention.',
      'Automated entity extraction, NLP-based summarisation, and insight generation across 20+ sources using LLM pipelines — reducing analyst manual research time by 40% (verified against a 3-week pre-automation baseline).',
      'Optimised LangChain agent execution through async processing and prompt caching, achieving p95 response times under 2 seconds.',
    ],
    logo: '/assets/icons/InfosysLogo.webp',
    order: 3,
  },
]

// ============================================================
// PROJECTS — GitHub Pinned (Featured)
// ============================================================
export interface Project {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  category: string
  order: number
}

export const PROJECTS: Project[] = [
  {
    title: 'AgenticBlogGenerator',
    description:
      'Autonomous multi-agent system that researches any topic and generates structured, publication-ready blog posts using LangGraph orchestration.',
    techStack: ['Python', 'LangGraph', 'LangChain', 'OpenAI', 'FastAPI'],
    githubUrl: 'https://github.com/shindeaditya07/AgenticBlogGenerator',
    featured: true,
    category: 'AI/ML',
    order: 1,
  },
  {
    title: 'RAG Doc QA',
    description:
      'Retrieval-Augmented Generation system for intelligent document Q&A — upload PDFs and query them with natural language using FAISS vector search.',
    techStack: ['Python', 'LangChain', 'FAISS', 'OpenAI', 'Streamlit'],
    githubUrl: 'https://github.com/shindeaditya07/RAG_Doc_QA',
    featured: true,
    category: 'AI/ML',
    order: 2,
  },
  {
    title: 'CodeGenerator',
    description:
      'LLM-powered tool that takes natural language descriptions and generates clean, documented code across multiple programming languages.',
    techStack: ['Python', 'OpenAI', 'FastAPI', 'React', 'TypeScript'],
    githubUrl: 'https://github.com/shindeaditya07/CodeGenerator',
    featured: false,
    category: 'AI/ML',
    order: 3,
  },
  {
    title: 'BriefTube',
    description:
      'YouTube video summarizer that extracts transcripts and uses LLMs to generate concise, structured summaries — saving hours of watch time.',
    techStack: ['Python', 'YouTube API', 'OpenAI', 'Streamlit'],
    githubUrl: 'https://github.com/shindeaditya07/BriefTube',
    featured: false,
    category: 'AI/ML',
    order: 4,
  },
  {
    title: 'Gemini QA Summary',
    description:
      'Q&A and summarization platform powered by Google Gemini for intelligent document processing and knowledge extraction from unstructured content.',
    techStack: ['Python', 'Google Gemini', 'LangChain', 'Streamlit'],
    githubUrl: 'https://github.com/shindeaditya07/Gemini_QA_Summary',
    featured: false,
    category: 'AI/ML',
    order: 5,
  },
  {
    title: 'NodeJS GenAI Practice',
    description:
      'Hands-on implementations of Generative AI concepts using Node.js — covering prompt chaining, tool use, and API integration with modern LLM providers.',
    techStack: ['Node.js', 'JavaScript', 'OpenAI', 'LangChain.js'],
    githubUrl: 'https://github.com/shindeaditya07/NodeJS_GenAI_Practice',
    featured: false,
    category: 'AI/ML',
    order: 6,
  },
]

// ============================================================
// TECH STACK — Technologies I work with
// ============================================================
export const TECH_STACK = [
  { name: 'Python', icon: 'SiPython', color: '#3776AB' },
  { name: 'JavaScript', icon: 'SiJavascript', color: '#F7DF1E' },
  { name: 'TypeScript', icon: 'SiTypescript', color: '#3178C6' },
  { name: 'React.js', icon: 'SiReact', color: '#61DAFB' },
  { name: 'Node.js', icon: 'SiNodedotjs', color: '#339933' },
  { name: 'FastAPI', icon: 'SiFastapi', color: '#009688' },
  { name: 'Flask', icon: 'SiFlask', color: '#FFFFFF' },
  { name: 'PyTorch', icon: 'SiPytorch', color: '#EE4C2C' },
  { name: 'TensorFlow', icon: 'SiTensorflow', color: '#FF6F00' },
  { name: 'MongoDB', icon: 'SiMongodb', color: '#47A248' },
  { name: 'SQL', icon: 'SiPostgresql', color: '#4169E1' },
  { name: 'Git', icon: 'SiGit', color: '#F05032' },
  { name: 'FAISS', icon: 'SiMeta', color: '#0082FB' },
  { name: 'GitHub Copilot', icon: 'SiGithub', color: '#FFFFFF' },
]

// ============================================================
// PROJECT CATEGORIES
// ============================================================
export const PROJECT_CATEGORIES = ['All', 'AI/ML', 'Full Stack']

// ============================================================
// SOCIAL LINKS
// ============================================================
export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/shindeaditya07', icon: 'FaGithub' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aditya-shinde-342b71273/', icon: 'FaLinkedin' },
  { name: 'Email', url: 'mailto:shindeaditya07@gmail.com', icon: 'FaEnvelope' },
]

// ============================================================
// API BASE URL
// ============================================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api'

// ============================================================
// PUBLICATIONS
// ============================================================
export interface Publication {
  title: string
  type: string
  conference?: string
  journal?: string
  date: string
  authors: string[]
  abstract?: string
  link?: string
}

export const PUBLICATIONS: Publication[] = [
  {
    title: 'Advanced Detection and Classification of Bell Pepper Leaf Diseases Using Vision Transformers',
    type: 'Book Chapter',
    conference: 'Intelligent and Sustainable Systems: AI, Green IoT, and Adaptive Automation in Electrical and Communication Technologies (PEACE-2025)',
    date: '2025',
    authors: ['Aastha Patil', 'Aditya Shinde', 'A. Pandian'],
    abstract:
      'Applies Vision Transformer (ViT) models to accurately detect and classify bell pepper leaf diseases, achieving high-precision results using deep learning on plant image datasets.',
    link: 'https://www.routledge.com/Intelligent-and-Sustainable-Systems-AI-Green-IoT-and-Adaptive-Automation-in-Electrical-and-Communication-Technologies/Punitha-Syedakbar-Jeyasudha/p/book/9781041302919',
  },
]

// ============================================================
// CERTIFICATIONS
// ============================================================
export interface Certification {
  name: string
  issuer: string
  date: string
  category: string
  credentialUrl?: string
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Oracle Cloud Infrastructure 2024 Generative AI Certified Professional',
    issuer: 'Oracle',
    date: 'Jun 2024',
    category: 'Cloud / AI',
  },
  {
    name: 'Oracle Cloud Infrastructure 2024 Certified Foundations Associate',
    issuer: 'Oracle',
    date: 'Jul 2024',
    category: 'Cloud',
  },
  {
    name: 'AWS Academy Graduate – Machine Learning Foundations',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Apr 2023',
    category: 'Cloud / AI',
  },
  {
    name: 'Artificial Intelligence Primer Certification',
    issuer: 'Infosys',
    date: 'Feb 2024',
    category: 'AI/ML',
  },
  {
    name: 'Big Data Analysis Deep Dive',
    issuer: 'Alibaba Cloud',
    date: 'Nov 2023',
    category: 'Data',
  },
  {
    name: 'Python Data Structures',
    issuer: 'University of Michigan / Coursera',
    date: 'May 2024',
    category: 'Programming',
  },
  {
    name: 'Networking Basics',
    issuer: 'Cisco',
    date: 'Apr 2023',
    category: 'Networking',
  },
  {
    name: 'Introduction to Cyber Security',
    issuer: 'Cisco',
    date: 'Apr 2023',
    category: 'Security',
  },
]

// ============================================================
// ORBIT ANIMATION ITEMS
// ============================================================
export interface OrbitItem {
  icon: string
  label: string
  orbit: 1 | 2 | 3
  duration: number
  offset?: number
}

export const ORBIT_RADII: Record<1 | 2 | 3, number> = { 1: 90, 2: 145, 3: 200 }

export const ORBIT_ITEMS: OrbitItem[] = [
  { icon: '⚛️', label: 'React', orbit: 1, duration: 18 },
  { icon: '🐍', label: 'Python', orbit: 1, duration: 18, offset: 180 },
  { icon: '🔷', label: 'TypeScript', orbit: 2, duration: 28 },
  { icon: '🍃', label: 'MongoDB', orbit: 2, duration: 28, offset: 90 },
  { icon: '⚡', label: 'FastAPI', orbit: 2, duration: 28, offset: 180 },
  { icon: '🤖', label: 'LangChain', orbit: 2, duration: 28, offset: 270 },
  { icon: '🐳', label: 'Docker', orbit: 3, duration: 40 },
  { icon: '🔥', label: 'TensorFlow', orbit: 3, duration: 40, offset: 72 },
  { icon: '🌐', label: 'Node.js', orbit: 3, duration: 40, offset: 144 },
  { icon: '💾', label: 'PostgreSQL', orbit: 3, duration: 40, offset: 216 },
  { icon: '🎨', label: 'Tailwind', orbit: 3, duration: 40, offset: 288 },
]

// ============================================================
// HOME PAGE CONFIG
// ============================================================
export const HOME_CONFIG = {
  heroBadge: "👋 Hello, I'm",
  techSectionLabel: 'My tech universe',
  featuredLabel: 'Featured Work',
  featuredHeading: "Things I've Built",
  featuredProjectBadge: 'Featured Project',
  ctaHeading: "Let's Build Something Together",
  ctaSubtext: "I'm currently open to exciting opportunities and interesting projects.",
  ctaButtonText: 'Get In Touch ✨',
  ctaButtonHref: '/contact',
  scrollIndicatorLabel: 'Scroll',
  techStackSectionLabel: 'Technologies I work with',
}
