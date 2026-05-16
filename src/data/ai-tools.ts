export interface AiTool {
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  url: string;
  pricing: string;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  alternatives: string[];
  keywords: string[];
  faq: { question: string; answer: string }[];
}

export const aiTools: AiTool[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    category: "AI Chatbots",
    description:
      "OpenAI's conversational AI. Great for writing, coding, analysis, and brainstorming.",
    longDescription:
      "ChatGPT is OpenAI's flagship conversational AI assistant. Launched in November 2022, it quickly became the fastest-growing consumer application in history. Built on the GPT architecture, ChatGPT can understand and generate human-like text, write code, analyze data, create images (via DALL-E), and much more. It's the most widely used AI assistant with over 200 million weekly active users.",
    url: "https://chat.openai.com",
    pricing: "Free / $20/mo (Plus) / $200/mo (Pro)",
    features: [
      "Natural language conversation",
      "Code generation and debugging",
      "Image generation with DALL-E",
      "File and document analysis",
      "Web browsing (Plus/Pro)",
      "Custom GPTs and plugins",
      "Voice conversation",
      "Data analysis with Code Interpreter",
      "Memory across conversations",
      "Mobile app (iOS/Android)",
    ],
    pros: [
      "Most versatile AI assistant available",
      "Excellent free tier with strong capabilities",
      "Massive plugin and integration ecosystem",
      "Regularly updated with new features",
      "Strong at both creative and analytical tasks",
      "Large community and learning resources",
    ],
    cons: [
      "Free tier has usage limits during peak hours",
      "Can 'hallucinate' incorrect information",
      "Responses can be verbose without specific prompting",
      "Privacy concerns for sensitive data",
      "Plus subscription is $20/mo with no middle tier",
    ],
    bestFor: [
      "General-purpose AI assistance",
      "Quick brainstorming and ideation",
      "Writing drafts and editing",
      "Learning new concepts",
      "Code prototyping",
      "Image generation",
    ],
    alternatives: ["Claude", "Gemini", "Copilot"],
    keywords: [
      "ChatGPT",
      "OpenAI AI",
      "AI chatbot",
      "ChatGPT free",
      "ChatGPT Plus",
      "best AI assistant",
      "AI writing tool",
    ],
    faq: [
      {
        question: "Is ChatGPT free?",
        answer:
          "Yes, ChatGPT has a free tier that uses GPT-4o mini. The Plus plan ($20/mo) gives access to GPT-4o, DALL-E, web browsing, and advanced features.",
      },
      {
        question: "Can ChatGPT write code?",
        answer:
          "Yes, ChatGPT is excellent at writing, debugging, and explaining code in virtually any programming language. It can also run Python code in a sandbox with Code Interpreter.",
      },
      {
        question: "Is ChatGPT safe to use?",
        answer:
          "ChatGPT is generally safe for everyday use. Avoid sharing sensitive personal or business data. OpenAI offers enterprise plans with stronger privacy guarantees.",
      },
      {
        question: "How does ChatGPT compare to Claude?",
        answer:
          "ChatGPT is more versatile with plugins and image generation, while Claude excels at long-form writing and careful analysis. Both have capable free tiers.",
      },
    ],
  },
  {
    slug: "claude",
    name: "Claude",
    category: "AI Chatbots",
    description:
      "Anthropic's AI assistant. Excellent for long-form writing, coding, and nuanced analysis.",
    longDescription:
      "Claude is an AI assistant made by Anthropic, an AI safety company founded by former OpenAI researchers. Claude is known for its thoughtful, careful responses and excels at tasks requiring nuance and long-context understanding. With a 200K token context window, it can process entire books and large codebases in a single conversation.",
    url: "https://claude.ai",
    pricing: "Free / $20/mo (Pro) / $30/mo (Max)",
    features: [
      "200K token context window",
      "Document and PDF analysis",
      "Code generation and review",
      "Artifacts (interactive content creation)",
      "Projects (persistent context)",
      "Computer use (beta)",
      "Web search",
      "Image analysis",
      "API access",
      "Team and enterprise plans",
    ],
    pros: [
      "Best long-form writing quality among AI assistants",
      "Largest context window (200K tokens)",
      "Excellent at nuanced, careful analysis",
      "Strong safety and privacy focus",
      "Great at understanding complex documents",
      "Artifacts feature for interactive content",
    ],
    cons: [
      "No image generation capability",
      "Can be overly cautious in responses",
      "Smaller plugin ecosystem than ChatGPT",
      "Free tier has stricter usage limits",
      "Less name recognition than ChatGPT",
    ],
    bestFor: [
      "Long-form writing and editing",
      "Research and document analysis",
      "Code review and refactoring",
      "Professional and business writing",
      "Careful reasoning tasks",
      "Processing large documents",
    ],
    alternatives: ["ChatGPT", "Gemini", "Perplexity"],
    keywords: [
      "Claude AI",
      "Anthropic Claude",
      "Claude vs ChatGPT",
      "AI assistant",
      "Claude Pro",
      "best AI for writing",
      "long context AI",
    ],
    faq: [
      {
        question: "Is Claude free?",
        answer:
          "Yes, Claude has a free tier. The Pro plan ($20/mo) offers more usage, priority access during peak times, and early access to new features.",
      },
      {
        question: "How is Claude different from ChatGPT?",
        answer:
          "Claude excels at long-form writing and careful analysis with its 200K context window. ChatGPT has more plugins and can generate images. Both are excellent for coding.",
      },
      {
        question: "Can Claude read PDFs?",
        answer:
          "Yes, Claude can analyze PDFs, documents, and images. Upload a file directly in the conversation and ask questions about its content.",
      },
      {
        question: "Is Claude safe?",
        answer:
          "Anthropic has a strong focus on AI safety. Claude is designed to be helpful, harmless, and honest. Enterprise plans offer additional privacy protections.",
      },
    ],
  },
  {
    slug: "midjourney",
    name: "Midjourney",
    category: "AI Image",
    description:
      "Create stunning AI-generated images from text prompts. Top-tier quality.",
    longDescription:
      "Midjourney is an AI image generation tool that creates stunning, artistic images from text descriptions. Known for its distinctive aesthetic quality, Midjourney consistently produces some of the most visually impressive AI-generated images. It operates through Discord and a web interface, making it accessible to both casual users and professional designers.",
    url: "https://midjourney.com",
    pricing: "From $10/mo (Basic) / $30/mo (Standard) / $60/mo (Pro)",
    features: [
      "Text-to-image generation",
      "Image variation and remix",
      "Style mixing and blending",
      "Upscaling and enhancement",
      "Pan and zoom (outpainting)",
      "Describe (image-to-text)",
      "Multi-prompt support",
      "Aspect ratio control",
      "Seed control for reproducibility",
      "Web editor interface",
    ],
    pros: [
      "Best-in-class image quality and aesthetics",
      "Excellent at artistic and creative styles",
      "Active community for inspiration",
      "Regularly improved models",
      "Good at understanding complex prompts",
      "Strong at photorealistic and fantasy styles",
    ],
    cons: [
      "No free tier available",
      "Discord-based workflow can be confusing",
      "Limited control over specific details",
      "Can struggle with text in images",
      "No API for developers (currently)",
      "Learning curve for effective prompting",
    ],
    bestFor: [
      "Creating artistic and creative images",
      "Concept art and illustration",
      "Social media visuals",
      "Marketing and advertising imagery",
      "Book covers and album art",
      "Personal creative projects",
    ],
    alternatives: ["DALL-E", "Stable Diffusion", "Leonardo.ai", "Adobe Firefly"],
    keywords: [
      "Midjourney",
      "AI image generator",
      "AI art",
      "text to image",
      "Midjourney alternative",
      "AI art generator",
      "best AI images",
    ],
    faq: [
      {
        question: "Is Midjourney free?",
        answer:
          "No, Midjourney no longer offers a free tier. Plans start at $10/mo for the Basic plan with ~200 images/month.",
      },
      {
        question: "How do I use Midjourney?",
        answer:
          "Sign up at midjourney.com and use the web interface, or join the Midjourney Discord server and use the /imagine command with your text prompt.",
      },
      {
        question: "Can I use Midjourney images commercially?",
        answer:
          "Yes, paid subscribers own the images they create and can use them commercially. Free tier users grant Midjourney a license to use their images.",
      },
      {
        question: "Is Midjourney better than DALL-E?",
        answer:
          "Midjourney generally produces more artistic, aesthetically pleasing images. DALL-E (via ChatGPT) is better at following specific instructions and rendering text. Both are excellent choices.",
      },
    ],
  },
  {
    slug: "cursor",
    name: "Cursor",
    category: "AI Code",
    description:
      "AI-first code editor. Built on VS Code with integrated AI coding assistant.",
    longDescription:
      "Cursor is an AI-first code editor built on top of VS Code. Unlike other AI coding tools that are extensions, Cursor is designed from the ground up for AI-assisted development. It combines code editing, AI chat, and intelligent code completion in a seamless experience. With features like codebase-aware chat and multi-file editing, Cursor has become the preferred editor for many professional developers.",
    url: "https://cursor.sh",
    pricing: "Free / $20/mo (Pro) / $40/mo (Business)",
    features: [
      "AI-powered code completion",
      "Codebase-aware chat",
      "Multi-file editing with Composer",
      "Terminal integration with AI",
      "Codebase indexing",
      "Custom AI rules",
      "VS Code extension compatibility",
      "Pair programming mode",
      "Bug finder",
      "MCP support",
    ],
    pros: [
      "Best overall AI coding experience",
      "Understands entire codebase context",
      "Seamless VS Code compatibility",
      "Excellent at debugging and refactoring",
      "Fast and responsive AI suggestions",
      "Regular updates with new AI features",
    ],
    cons: [
      "Requires switching from your current editor",
      "Pro plan needed for heavy usage",
      "Can be resource-intensive",
      "AI features sometimes get in the way",
      "Learning curve for advanced features",
    ],
    bestFor: [
      "Professional developers",
      "Full-stack development",
      "Large codebase work",
      "Debugging complex issues",
      "Code refactoring",
      "Learning new frameworks",
    ],
    alternatives: ["GitHub Copilot", "Windsurf", "VS Code + Copilot"],
    keywords: [
      "Cursor AI",
      "AI code editor",
      "Cursor vs Copilot",
      "AI programming",
      "best AI coding tool",
      "Cursor IDE",
      "AI pair programming",
    ],
    faq: [
      {
        question: "Is Cursor free?",
        answer:
          "Yes, Cursor has a free tier with limited AI completions and chat messages. The Pro plan ($20/mo) offers unlimited usage and advanced features.",
      },
      {
        question: "Is Cursor better than VS Code with Copilot?",
        answer:
          "Many developers prefer Cursor for its deeper AI integration. It understands your codebase better and offers more AI features. However, VS Code + Copilot is a solid combination too.",
      },
      {
        question: "Can I use my VS Code extensions in Cursor?",
        answer:
          "Yes, Cursor is built on VS Code and supports almost all VS Code extensions, themes, and settings. You can import your existing VS Code configuration.",
      },
      {
        question: "Does Cursor work offline?",
        answer:
          "The editor works offline, but AI features require an internet connection. Code completion and chat need to reach Cursor's AI servers.",
      },
    ],
  },
  {
    slug: "runway",
    name: "Runway",
    category: "AI Video",
    description:
      "AI-powered video generation and editing. Gen-3 model for realistic video creation.",
    longDescription:
      "Runway is a leading AI video generation and editing platform. Its Gen-3 Alpha model can create realistic video clips from text prompts or images. Beyond generation, Runway offers a suite of AI-powered video editing tools including background removal, motion tracking, and style transfer. It's used by filmmakers, content creators, and marketing professionals.",
    url: "https://runwayml.com",
    pricing: "Free trial / $12/mo (Standard) / $28/mo (Pro) / $76/mo (Unlimited)",
    features: [
      "Text-to-video generation (Gen-3 Alpha)",
      "Image-to-video generation",
      "Video-to-video style transfer",
      "Background removal (green screen)",
      "Motion tracking",
      "Inpainting (remove objects)",
      "Slow motion",
      "Color grading",
      "Audio generation",
      "Collaboration tools",
    ],
    pros: [
      "Best-in-class AI video generation",
      "Comprehensive video editing toolkit",
      "Regular model improvements",
      "Good for both generation and editing",
      "Professional-grade output quality",
      "Active development and new features",
    ],
    cons: [
      "Free trial is very limited",
      "Video generation can be slow",
      "Results can be unpredictable",
      "Expensive for heavy usage",
      "Short clip lengths (4-16 seconds)",
      "Requires credits for generation",
    ],
    bestFor: [
      "Short-form video content",
      "Social media videos",
      "Concept visualization",
      "Music videos and artistic projects",
      "Marketing content",
      "Film pre-visualization",
    ],
    alternatives: ["Pika", "Stable Video Diffusion", "Kling", "Sora"],
    keywords: [
      "Runway AI",
      "AI video generator",
      "text to video",
      "AI video editing",
      "Gen-3 Alpha",
      "AI video creator",
      "best AI video tool",
    ],
    faq: [
      {
        question: "Is Runway free?",
        answer:
          "Runway offers a limited free trial with a small number of credits. Paid plans start at $12/mo with more credits and features.",
      },
      {
        question: "How long can AI-generated videos be?",
        answer:
          "Currently, Runway's Gen-3 Alpha generates clips of 4-16 seconds. You can extend by stitching multiple clips together.",
      },
      {
        question: "Can I use Runway videos commercially?",
        answer:
          "Yes, paid subscribers can use generated videos commercially. Check the terms of service for specific usage rights.",
      },
      {
        question: "Is Runway better than Sora?",
        answer:
          "Both have strengths. Runway is currently more accessible with a working product. Sora (by OpenAI) promises longer, more coherent videos but has limited availability.",
      },
    ],
  },
  {
    slug: "elevenlabs",
    name: "ElevenLabs",
    category: "AI Audio",
    description:
      "Realistic AI voice generation and text-to-speech. Clone voices, create narration.",
    longDescription:
      "ElevenLabs is the leading AI voice generation platform, offering incredibly realistic text-to-speech, voice cloning, and audio generation. Its technology can clone a voice from just a few seconds of audio and generate speech that's nearly indistinguishable from human recordings. It's widely used for audiobooks, podcasts, video narration, and accessibility.",
    url: "https://elevenlabs.io",
    pricing: "Free / $5/mo (Starter) / $22/mo (Creator) / $99/mo (Pro)",
    features: [
      "Text-to-speech with 30+ languages",
      "Voice cloning (instant and professional)",
      "AI voice library (100+ voices)",
      "Dubbing and translation",
      "Sound effects generation",
      "Audio editing tools",
      "API access",
      "Projects (long-form content)",
      "Voice design (create custom voices)",
      "Conversational AI",
    ],
    pros: [
      "Most realistic AI voices available",
      "Excellent voice cloning quality",
      "Supports 30+ languages",
      "Generous free tier",
      "Great for content creators",
      "Active development and new features",
    ],
    cons: [
      "Voice cloning raises ethical concerns",
      "Premium features are expensive",
      "Can sound robotic with certain voices",
      "Limited emotional range in some voices",
      "Free tier has character limits",
    ],
    bestFor: [
      "Audiobook narration",
      "Podcast production",
      "Video voiceovers",
      "Content localization",
      "Accessibility tools",
      "Game and app voice acting",
    ],
    alternatives: ["Murf.ai", "Play.ht", "Amazon Polly", "Google TTS"],
    keywords: [
      "ElevenLabs",
      "AI voice generator",
      "text to speech AI",
      "voice cloning",
      "AI narration",
      "best AI voice",
      "realistic AI speech",
    ],
    faq: [
      {
        question: "Is ElevenLabs free?",
        answer:
          "Yes, ElevenLabs has a free tier with 10,000 characters/month. Paid plans start at $5/mo with more characters and features.",
      },
      {
        question: "Can I clone my own voice?",
        answer:
          "Yes, ElevenLabs offers instant voice cloning from a short audio sample. Professional cloning (higher quality) requires a longer sample and a paid plan.",
      },
      {
        question: "Is it legal to clone someone's voice?",
        answer:
          "Voice cloning laws vary by jurisdiction. Generally, you need consent from the person whose voice you're cloning. ElevenLabs requires users to have rights to clone voices.",
      },
      {
        question: "How many languages does ElevenLabs support?",
        answer:
          "ElevenLabs supports 30+ languages including English, Spanish, French, German, Japanese, Chinese, and many more.",
      },
    ],
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    category: "AI Code",
    description:
      "AI pair programmer. Autocompletes code, suggests functions, writes tests.",
    longDescription:
      "GitHub Copilot is an AI-powered code completion tool developed by GitHub and OpenAI. It suggests code completions as you type, can generate entire functions from comments, and helps write tests. Integrated directly into popular IDEs like VS Code and JetBrains, Copilot has become the most widely used AI coding assistant with millions of developers.",
    url: "https://github.com/features/copilot",
    pricing: "$10/mo (Individual) / $19/mo (Business) / $39/mo (Enterprise)",
    features: [
      "Inline code suggestions",
      "Chat in IDE",
      "Code explanation",
      "Test generation",
      "CLI assistance",
      "Pull request summaries",
      "Code review suggestions",
      "Multiple IDE support",
      "Organization policies",
      "Fine-tuned models",
    ],
    pros: [
      "Works in your existing IDE",
      "Excellent code completion quality",
      "Backed by GitHub's code corpus",
      "Strong privacy controls for businesses",
      "Works with virtually all languages",
      "Deep GitHub integration",
    ],
    cons: [
      "No free tier (except students/OSS)",
      "Less capable for complex reasoning",
      "Chat features lag behind Cursor",
      "Can suggest insecure code patterns",
      "Subscription required for all users",
    ],
    bestFor: [
      "Daily coding productivity",
      "Writing boilerplate code",
      "Learning new languages",
      "Test generation",
      "Code documentation",
      "Team development",
    ],
    alternatives: ["Cursor", "Cody", "Tabnine", "Codeium"],
    keywords: [
      "GitHub Copilot",
      "AI code completion",
      "Copilot vs Cursor",
      "AI programming assistant",
      "code autocomplete",
      "GitHub AI",
      "best code AI",
    ],
    faq: [
      {
        question: "Is GitHub Copilot free?",
        answer:
          "Copilot is free for verified students and open-source maintainers. Individual plans are $10/mo. There's no general free tier.",
      },
      {
        question: "Is Copilot better than Cursor?",
        answer:
          "Copilot excels at inline code completion and integrates with existing IDEs. Cursor offers a more comprehensive AI-first editing experience. Many developers use both.",
      },
      {
        question: "Is my code safe with Copilot?",
        answer:
          "GitHub Business and Enterprise plans don't retain your code. Individual plans may use code snippets for model improvement (opt-out available).",
      },
      {
        question: "Which IDEs support Copilot?",
        answer:
          "Copilot works in VS Code, JetBrains IDEs, Neovim, Visual Studio, Xcode, and more. It's also available in GitHub.com for web-based coding.",
      },
    ],
  },
  {
    slug: "perplexity",
    name: "Perplexity AI",
    category: "AI Search",
    description:
      "AI-powered search engine. Get cited answers instead of blue links.",
    longDescription:
      "Perplexity AI is an AI-powered search engine that provides direct, cited answers to questions. Unlike traditional search engines that return a list of links, Perplexity synthesizes information from multiple sources into a coherent response with inline citations. It combines the capabilities of a large language model with real-time web search.",
    url: "https://perplexity.ai",
    pricing: "Free / $20/mo (Pro)",
    features: [
      "AI-powered search with citations",
      "Follow-up questions",
      "Focus modes (Academic, Writing, etc.)",
      "File upload and analysis",
      "Image generation",
      "Collections (organized research)",
      "API access",
      "Chrome extension",
      "Mobile app",
      "Pro Search (deeper analysis)",
    ],
    pros: [
      "Best AI search experience available",
      "Always provides source citations",
      "Excellent for research and fact-checking",
      "Free tier is very capable",
      "Combines search with AI analysis",
      "Clean, focused interface",
    ],
    cons: [
      "Pro Search is limited on free tier",
      "Can sometimes misinterpret sources",
      "Less capable for creative writing",
      "No plugin ecosystem",
      "May miss niche or recent information",
    ],
    bestFor: [
      "Research and fact-checking",
      "Academic work",
      "Quick answers with sources",
      "Comparing products or services",
      "Current events and news",
      "Technical documentation lookup",
    ],
    alternatives: ["ChatGPT", "Google Gemini", "You.com", "Phind"],
    keywords: [
      "Perplexity AI",
      "AI search engine",
      "AI research tool",
      "Perplexity vs Google",
      "cited answers",
      "best AI search",
      "AI knowledge tool",
    ],
    faq: [
      {
        question: "Is Perplexity free?",
        answer:
          "Yes, Perplexity has a generous free tier with unlimited basic searches. Pro Search (deeper analysis) is limited on the free plan. Pro plan ($20/mo) offers unlimited Pro Search.",
      },
      {
        question: "Is Perplexity better than Google?",
        answer:
          "For research and quick answers, Perplexity is often better because it synthesizes information and provides citations. Google is better for finding specific websites and navigating the web.",
      },
      {
        question: "Can I trust Perplexity's answers?",
        answer:
          "Perplexity cites its sources, so you can verify information. Always check the citations for important decisions. It's generally reliable but not infallible.",
      },
      {
        question: "Does Perplexity use GPT-4?",
        answer:
          "Perplexity uses its own models and can also leverage GPT-4 and Claude for Pro Search. The specific model depends on the query type and your plan.",
      },
    ],
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    category: "AI Productivity",
    description:
      "AI writing and organization inside Notion. Summarize, draft, brainstorm.",
    longDescription:
      "Notion AI brings artificial intelligence directly into the Notion workspace. It can summarize documents, draft content, brainstorm ideas, translate text, and help organize information — all within your existing Notion workspace. It's perfect for teams already using Notion who want AI capabilities without switching tools.",
    url: "https://notion.so",
    pricing: "Add-on $10/mo per member (on any Notion plan)",
    features: [
      "Content summarization",
      "Writing and drafting",
      "Brainstorming and ideation",
      "Translation (30+ languages)",
      "Meeting notes extraction",
      "Action item generation",
      "Q&A over your workspace",
      "Template generation",
      "Grammar and style editing",
      "Custom AI prompts",
    ],
    pros: [
      "Seamlessly integrated into Notion",
      "Works with your existing workspace data",
      "Great for team collaboration",
      "Q&A over all your Notion content",
      "No context switching needed",
      "Reasonable pricing as an add-on",
    ],
    cons: [
      "Requires a Notion subscription",
      "Less powerful than standalone AI tools",
      "Only works within Notion",
      "Can be slow on large workspaces",
      "Limited customization options",
    ],
    bestFor: [
      "Notion power users",
      "Team knowledge management",
      "Meeting notes and summaries",
      "Content drafting in Notion",
      "Project documentation",
      "Internal Q&A systems",
    ],
    alternatives: ["ChatGPT", "Microsoft Copilot", "Google Duet AI"],
    keywords: [
      "Notion AI",
      "AI in Notion",
      "Notion AI features",
      "AI productivity tool",
      "Notion AI pricing",
      "AI workspace assistant",
      "Notion AI review",
    ],
    faq: [
      {
        question: "Is Notion AI free?",
        answer:
          "Notion AI is an add-on that costs $10/mo per member. You need a Notion account (which has a free tier) plus the AI add-on.",
      },
      {
        question: "Can Notion AI access all my pages?",
        answer:
          "Notion AI can access pages you have permission to view. It uses your workspace content for Q&A and summarization. You can control access at the page level.",
      },
      {
        question: "Is Notion AI worth it?",
        answer:
          "If you're already a heavy Notion user, absolutely. The AI features integrate seamlessly and save time. If you don't use Notion regularly, standalone AI tools may be better.",
      },
      {
        question: "How does Notion AI compare to ChatGPT?",
        answer:
          "Notion AI is less powerful than ChatGPT for general tasks, but it's deeply integrated into your workspace. ChatGPT is better for standalone writing and analysis.",
      },
    ],
  },
];

export function getAiTool(slug: string): AiTool | undefined {
  return aiTools.find((t) => t.slug === slug);
}

export function getAllToolSlugs(): string[] {
  return aiTools.map((t) => t.slug);
}
