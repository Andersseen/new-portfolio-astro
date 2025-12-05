import type { PortfolioItem } from "../components/PortfolioGrid";

export const getPortfolioItems = (
  tr: (key: string) => string
): PortfolioItem[] => [
  {
    id: "card-1",
    type: "projects",
    title: tr("portfolio.projects.title"),
    description: tr("portfolio.projects.description"),
    details: {
      description:
        "Here you will find a selection of projects developed for clients in various industries.",
      items: [
        {
          title: "E-commerce Platform",
          category: "Retail",
          description:
            "High-performance headless e-commerce built with Astro and Shopify.",
          tech: ["Astro", "React", "Tailwind"],
        },
        {
          title: "Fintech Dashboard",
          category: "Finance",
          description:
            "Real-time data visualization and transaction management system.",
          tech: ["Next.js", "D3.js", "Supabase"],
        },
        {
          title: "Real Estate CRM",
          category: "SaaS",
          description:
            "Comprehensive property management solution for agencies.",
          tech: ["Vue", "Firebase", "Node.js"],
        },
      ],
    },
    colSpan: "col-span-2",
  },
  {
    id: "card-2",
    type: "community",
    title: "Community",
    description: "Open source contributions and community work.",
    details: {
      description:
        "I believe in giving back. I actively contribute to the developer ecosystem.",
      items: [
        {
          title: "Astro Portfolio Template",
          description:
            "A highly performant, accessible, and SEO-friendly portfolio starter theme.",
          stats: [
            { label: "stars", value: "2.5k" },
            { label: "forks", value: "500" },
          ],
        },
        {
          title: "React UI Kit",
          description:
            "Accessible component library focusing on developer experience and bundle size.",
          stats: [{ label: "downloads/mo", value: "1.2k" }],
        },
      ],
    },
    colSpan: "col-span-1",
  },
  {
    id: "card-5",
    type: "design",
    title: tr("portfolio.design.title"),
    description: tr("portfolio.design.description"),
    details: {
      items: [
        {
          image:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
          title: "Abstract 3D Art",
        },
        {
          image:
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
          title: "Modern UI/UX",
        },
        {
          image:
            "https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=600&auto=format&fit=crop",
          title: "Brand Identity",
        },
        {
          image:
            "https://images.unsplash.com/photo-1614850523060-8da1d56ae160?q=80&w=600&auto=format&fit=crop",
          title: "Motion Graphics",
        },
      ],
    },
    colSpan: "col-span-1",
  },
  {
    id: "card-6",
    type: "social",
    title: tr("portfolio.social.title"),
    colSpan: "col-span-1",
    content: [
      {
        icon: "github",
        url: "https://github.com",
        color: "primary",
        label: "GitHub",
      },
      {
        icon: "gitlab",
        url: "https://gitlab.com",
        color: "secondary",
        label: "GitLab",
      },
      {
        icon: "medium",
        url: "https://medium.com",
        color: "accent",
        label: "Medium",
      },
    ],
  },
  {
    id: "card-7",
    type: "services",
    title: tr("portfolio.services.title"),
    colSpan: "col-span-1",
    content: [
      {
        text: tr("portfolio.services.uiux"),
        gradient: "from-primary to-secondary",
      },
      {
        text: tr("portfolio.services.web"),
        gradient: "from-secondary to-accent",
      },
      {
        text: tr("portfolio.services.desktop"),
        gradient: "from-accent to-primary",
      },
      {
        text: tr("portfolio.services.devops"),
        gradient: "from-success to-primary",
      },
    ],
    details: {
      description: "Comprehensive technical services tailored to your needs.",
      items: [
        {
          text: tr("portfolio.services.uiux"),
          gradient: "from-primary to-secondary",
          details:
            "Creating intuitive, accessible, and beautiful user interfaces that delight users.",
        },
        {
          text: tr("portfolio.services.web"),
          gradient: "from-secondary to-accent",
          details:
            "End-to-end full-stack web development using modern frameworks like React, Astro, and Node.js.",
        },
        {
          text: tr("portfolio.services.desktop"),
          gradient: "from-accent to-primary",
          details:
            "Building performant cross-platform desktop applications using Electron and Tauri.",
        },
        {
          text: tr("portfolio.services.devops"),
          gradient: "from-success to-primary",
          details:
            "Setting up robust CI/CD pipelines, Docker containerization, and cloud infrastructure management.",
        },
      ],
    },
  },
  {
    id: "card-3",
    type: "stack",
    title: tr("portfolio.stack.title"),
    colSpan: "col-span-1",
    content: [
      { name: "TS", icon: "ts", color: "primary" },
      { name: "React", icon: "react", color: "accent" },
      { name: "Astro", icon: "astro", color: "secondary" },
      { name: "Node", icon: "node", color: "success" },
    ],
    details: {
      categories: [
        {
          title: "Frontend Core",
          color: "primary",
          items: [
            "React",
            "TypeScript",
            "Astro",
            "Next.js",
            "Tailwind CSS",
            "Framer Motion",
          ],
        },
        {
          title: "Backend & Data",
          color: "secondary",
          items: [
            "Node.js",
            "Express",
            "PostgreSQL",
            "Supabase",
            "Redis",
            "Prisma",
          ],
        },
        {
          title: "Tools & DevOps",
          color: "accent",
          items: ["Docker", "GitLab CI", "NX Monorepo", "Figma"],
        },
      ],
    },
  },
  {
    id: "card-4",
    type: "articles",
    title: tr("portfolio.articles.title"),
    description: tr("portfolio.articles.description"),
    details: {
      articles: [
        {
          title: "The Future of Astro Islands",
          description: "Deep dive into partial hydration architecture.",
          url: "#",
        },
        {
          title: "Understanding TypeScript Generics",
          description: "A practical guide to writing reusable code.",
          url: "#",
        },
        {
          title: "Effective State Management",
          description: "Comparing Redux, Zustand, and Nano Stores.",
          url: "#",
        },
        {
          title: "Building Accessible UIs",
          description: "Tips for WCAG compliance.",
          url: "#",
        },
      ],
    },
    colSpan: "col-span-2",
  },
];

export const aboutMeData = (tr: (key: string) => string): PortfolioItem => ({
  id: "about-me-modal",
  type: "about",
  title: tr("portfolio.aboutMe.title"),
  description: tr("portfolio.aboutMe.description"),
  details: {
    title: "Hello, I'm Andersseen",
    bio: [
      "I am a passionate Full Stack Developer and UI/UX enthusiast based in [Your Location].",
      "With over 5 years of experience, I specialize in building digital experiences that follow the intersection of design and technology.",
    ],
    philosophy:
      "I believe that code should be as beautiful as the design it implements. Clean, maintainable, and efficient code is my trademark.",
    goal: "To help businesses transform their ideas into powerful, user-friendly applications that solve real-world problems.",
    social: [
      { label: "LinkedIn", url: "#", color: "primary" },
      { label: "Twitter", url: "#", color: "secondary" },
      {
        label: "hello@example.com",
        url: "mailto:hello@example.com",
        color: "accent",
      },
    ],
  },
  colSpan: "col-span-1",
});
