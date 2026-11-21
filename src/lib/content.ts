export type Tone = "cv" | "hm" | "cp" | "mj";

export type Block =
  | { kind: "prose"; title: string; lead?: string; body: string[] }
  | { kind: "steps"; title: string; items: { t: string; d: string }[] }
  | { kind: "cards"; title: string; items: { t: string; d: string }[] }
  | { kind: "notes"; title: string; body: string; chips: { hex?: string; label: string }[] };

export type Project = {
  slug: string;
  index: string;
  title: string;
  kind: string;
  tone: Tone;
  tagline: string;
  summary: string;
  description: string;
  tags: string[];
  stack: string[];
  facts: { k: string; v: string }[];
  badge?: string;
  links: { href: string; label: string }[];
  thumb: string;
  thumbAlt: string;
  fit: "cover" | "contain";
  media:
    | { kind: "image"; src: string; alt: string; ratio: "wide" | "portrait" | "poster"; fit: "cover" | "contain" }
    | { kind: "video"; id: string; title: string };
  caption?: string;
  blocks: Block[];
};

export const EMAIL = "chixemmy@gmail.com";

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/404chixnotfound" },
  { label: "CreatorVerse", href: "https://www.creatorverse.com.ng/profile/chix" },
  { label: "LinkedIn", href: "https://linkedin.com/in/chixnotfound" },
  { label: "X", href: "https://x.com/chixnotfound" },
] as const;

export const SKILLS: { title: string; items: string[] }[] = [
  { title: "Frontend", items: ["React / Next.js", "TypeScript", "Tailwind CSS", "HTML"] },
  { title: "Backend", items: ["Supabase / Postgres", "MongoDB", "Lua", "Python"] },
  { title: "Infrastructure", items: ["Vercel", "Netlify", "Resend"] },
  { title: "Practices", items: ["System design", "Threat modelling", "Code review"] },
  { title: "Currently learning", items: ["Rust", "Ethical hacking", "Blockchain dev"] },
  { title: "Tools", items: ["Git / GitHub", "Figma", "LÖVE2D", "Claude"] },
];

export const PROJECTS: Project[] = [
  {
    slug: "creatorverse",
    index: "01",
    title: "CreatorVerse NG",
    kind: "Web platform",
    tone: "cv",
    tagline: "Build. Showcase. Collaborate.",
    summary: "A home for creators to show what they're building, find collaborators, and share milestones.",
    description:
      "A home for indie creators to show what they're building — and find the people who can help finish it.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Vercel"],
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase (Postgres, Auth, RLS)", "Vercel"],
    facts: [
      { k: "Type", v: "Web platform" },
      { k: "Status", v: "Live" },
      { k: "Audience", v: "Creators" },
      { k: "Sign-in", v: "Email OTP · X" },
    ],
    links: [
      { href: "https://www.creatorverse.com.ng", label: "Visit live site" },
      { href: "https://x.com/creatorverse_ng", label: "Follow on X" },
    ],
    thumb: "https://www.creatorverse.com.ng/og-image.jpg",
    thumbAlt: "CreatorVerse NG",
    fit: "cover",
    media: {
      kind: "image",
      src: "https://www.creatorverse.com.ng/og-image.jpg",
      alt: "CreatorVerse NG — Build. Showcase. Collaborate.",
      ratio: "wide",
      fit: "cover",
    },
    blocks: [
      {
        kind: "prose",
        title: "Overview",
        lead: "A home for creators to show what they're building, and find the people who can help finish it. Built around one idea: the project, not the profile.",
        body: [
          "Indie developers and creators post what they're building, list the exact roles they still need, and find collaborators to finish it. It replaces scattered X threads and WhatsApp groups with one searchable place to showcase work, discover builders and team up.",
        ],
      },
      {
        kind: "prose",
        title: "The problem",
        body: [
          "Indie builders share projects across X threads, WhatsApp groups and personal sites. There's no central place to showcase work, no lightweight signal of who has shipped what, and finding a co-founder or a designer usually depends on personal networks. Global tools weren't designed around the local scene.",
        ],
      },
      {
        kind: "steps",
        title: "How it works",
        items: [
          { t: "Discover", d: "See what people are building." },
          { t: "Connect", d: "Find who you need." },
          { t: "Collaborate", d: "Agree on the work." },
          { t: "Build", d: "Ship it together." },
          { t: "Showcase", d: "Prove what you made." },
        ],
      },
      {
        kind: "cards",
        title: "Highlights",
        items: [
          {
            t: "Roles, not vague collabs",
            d: "Projects list the specific roles they're missing. When a request for a role is accepted, the role marks itself filled.",
          },
          {
            t: "Structured discovery",
            d: "A curated keyword system — 77 tech-stack terms, 50+ skills and roles, and 6 opportunity tags — with autocomplete only, so search stays clean.",
          },
          {
            t: "Stage badges",
            d: "Idea, In Development or Completed, so people know whether you're pitching or already building.",
          },
          {
            t: "Requests with real statuses",
            d: "Pending, accepted or moved on — with an optional portfolio link and a thread for each request.",
          },
          {
            t: "A workspace per project",
            d: "Overview, Collab and Milestones tabs, with active builders shown alongside the owner.",
          },
          {
            t: "Profiles that show work",
            d: "Cover, tabs, skills from the shared vocabulary and a short bio preview.",
          },
          {
            t: "Onboarding and moderation",
            d: "A 3-step onboarding wizard, and moderator tools to curate the keyword list.",
          },
          {
            t: "Safe by default",
            d: "Row-level security in Postgres; deleting a project means typing your own username; image uploads capped at 3MB.",
          },
        ],
      },
      {
        kind: "notes",
        title: "Design — Cyber Neon",
        body: "A locked design system for a builder audience: liquid-glass surfaces, film grain, atmospheric glows and full reduced-motion support. Mobile-first, with a bottom nav and no top header for signed-in users.",
        chips: [
          { hex: "#0D0D0D", label: "#0D0D0D · Background" },
          { hex: "#0066FF", label: "#0066FF · Primary" },
          { label: "Aa · Outfit + JetBrains Mono" },
        ],
      },
      {
        kind: "prose",
        title: "What's next",
        body: ["Version 1.1 with more features, including 2FA and social engagement."],
      },
    ],
  },
  {
    slug: "hangman-go",
    index: "02",
    title: "HangMan GO!",
    kind: "2D game",
    tone: "hm",
    tagline: "A classic word game, behind the screen.",
    summary: "A 2D indie educational game that brings the classic pen-and-paper word-guessing game behind the screen.",
    description:
      "A 2D indie educational game that brings the classic pen-and-paper word-guessing game behind the screen.",
    tags: ["LÖVE2D", "Lua", "OpenAL"],
    stack: ["LÖVE2D", "Lua", "OpenAL"],
    facts: [
      { k: "Type", v: "2D game" },
      { k: "Genre", v: "Educational word game" },
      { k: "Engine", v: "LÖVE2D" },
      { k: "Language", v: "Lua" },
    ],
    links: [{ href: "https://www.youtube.com/watch?v=tHtHFlCDyFY", label: "Watch gameplay" }],
    thumb: "https://i.ytimg.com/vi/tHtHFlCDyFY/hqdefault.jpg",
    thumbAlt: "HangMan GO! gameplay",
    fit: "cover",
    media: { kind: "video", id: "tHtHFlCDyFY", title: "HangMan GO! gameplay" },
    blocks: [
      {
        kind: "prose",
        title: "Overview",
        lead: "A 2D indie educational video game that takes the classic word-guessing game — usually played with pen and paper — and brings it behind the screen.",
        body: [
          "HangMan GO! keeps the concept of the original game: guess the hidden word one letter at a time before you run out of tries. The difference is that it now lives in a game, with the presentation that comes with one.",
        ],
      },
      {
        kind: "cards",
        title: "Highlights",
        items: [
          { t: "The classic, reimagined", d: "The familiar pen-and-paper word game, rebuilt as a proper 2D video game." },
          { t: "Educational by design", d: "An indie educational game — word-guessing as a way to learn and practise." },
          { t: "Engine", d: "Made with LÖVE2D and Lua." },
        ],
      },
    ],
  },
  {
    slug: "campuspredict",
    index: "03",
    title: "CampusPredict",
    kind: "Web3 dApp",
    tone: "cp",
    tagline: "A prediction market for campus life.",
    summary: "A decentralized prediction market for campus life — built on Monad.",
    description: "A decentralized prediction market for campus life — built on Monad.",
    tags: ["Solidity", "Monad", "Web3.js", "MetaMask"],
    stack: ["Solidity", "Monad Testnet", "Web3.js", "MetaMask"],
    facts: [
      { k: "Type", v: "Web3 dApp" },
      { k: "Network", v: "Monad Testnet" },
      { k: "Wallet", v: "MetaMask" },
      { k: "Contracts", v: "Solidity" },
    ],
    badge: "Monad Testnet",
    links: [{ href: "https://campuspredict.netlify.app", label: "Open the app" }],
    thumb: "/work/campuspredict.png",
    thumbAlt: "CampusPredict app screenshot",
    fit: "contain",
    media: {
      kind: "image",
      src: "/work/campuspredict.png",
      alt: "CampusPredict — post a question, everyone votes, the chain settles it",
      ratio: "portrait",
      fit: "contain",
    },
    blocks: [
      {
        kind: "prose",
        title: "Overview",
        lead: "A decentralized prediction market for campus life, running on the Monad testnet. Ask a question, let people call it, and settle it on-chain.",
        body: [
          "Anyone can create a market, anyone can vote, and every action is on-chain and verifiable — no middleman deciding what counts.",
        ],
      },
      {
        kind: "steps",
        title: "How it works",
        items: [
          { t: "Create", d: "Anyone opens a market with a question and a deadline." },
          { t: "Vote", d: "Yes or No, one vote per wallet." },
          { t: "Settle", d: "The creator resolves the outcome after the deadline." },
          { t: "Verify", d: "Every action is on-chain and checkable." },
        ],
      },
      {
        kind: "cards",
        title: "Highlights",
        items: [
          { t: "Open market creation", d: "Anyone can create a market with a question and a deadline." },
          { t: "One wallet, one vote", d: "Vote Yes or No; each wallet counts once." },
          { t: "Creator settles", d: "After the deadline the creator settles the outcome." },
          { t: "Verifiable on-chain", d: "All actions are recorded on-chain so anyone can check them." },
        ],
      },
    ],
  },
  {
    slug: "melon-jelly",
    index: "04",
    title: "Melon Jelly",
    kind: "WebGPU toy",
    tone: "mj",
    tagline: "A slice of summer. A little wobble.",
    summary: "An interactive 3D watermelon jelly you can grab, stretch and wobble — a real-time soft-body simulation.",
    description:
      "An interactive 3D watermelon jelly slice you can grab, stretch and wobble — a real-time soft-body simulation in WebGPU.",
    tags: ["WebGPU", "WGSL", "JavaScript", "XPBD"],
    stack: ["WebGPU", "WGSL", "JavaScript", "XPBD"],
    facts: [
      { k: "Type", v: "WebGPU toy" },
      { k: "Series", v: "Material Studies No. 009" },
      { k: "Physics", v: "XPBD, CPU" },
      { k: "Needs", v: "A WebGPU browser" },
    ],
    badge: "Runs in your browser",
    links: [{ href: "https://chixjelly.vercel.app", label: "Open the demo" }],
    thumb: "/work/melon-jelly-still.jpg",
    thumbAlt: "A translucent watermelon jelly slice",
    fit: "cover",
    media: {
      kind: "image",
      src: "/work/melon-jelly.jpg",
      alt: "Melon Jelly — translucent ruby watermelon jelly slice with a glossy green rind",
      ratio: "poster",
      fit: "cover",
    },
    caption: "Material Studies No. 009",
    blocks: [
      {
        kind: "prose",
        title: "Overview",
        lead: "A thick, translucent watermelon jelly slice you can pick up, pull, twist and drop — rendered live with WebGPU and simulated as a real soft body.",
        body: [
          "Grab the tip, a corner, the flesh or the rind. Let go and it wobbles, then settles back to its shape. The look is aimed at expensive gummy candy shot in a studio: glossy rind, ruby flesh you can see into, and seeds suspended inside.",
        ],
      },
      {
        kind: "steps",
        title: "How it works",
        items: [
          { t: "Simulate", d: "A tetrahedral XPBD soft body with volume preservation and a firmer rind." },
          { t: "Skin", d: "A smooth render mesh is bound to the tetrahedra, with seeds riding along." },
          { t: "Render", d: "WGSL shaders do depth absorption, refraction, Fresnel and soft contact shadows." },
          { t: "Interact", d: "Mouse and touch, with sliders for firmness and damping." },
        ],
      },
      {
        kind: "cards",
        title: "Highlights",
        items: [
          { t: "Real soft body", d: "Stable under hard drops and stretches, with no inversion or explosions." },
          { t: "Genuine WebGPU", d: "Native WGSL pipelines, with no fake fallback renderer." },
          { t: "Looks like candy", d: "Translucent flesh, pale layer, glossy striped rind and individually modeled seeds." },
          { t: "One file", d: "The whole experiment is a single self-contained HTML file." },
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export function nextProject(slug: string) {
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  if (index < 0) return PROJECTS[0];
  return PROJECTS[(index + 1) % PROJECTS.length];
}
