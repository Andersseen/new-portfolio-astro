import type { PortfolioItem } from "../components/PortfolioGrid";

export const getPortfolioItems = (
  tr: (key: string) => string
): PortfolioItem[] => [
  {
    id: "projects",
    type: "projects",
    title: tr("portfolio.projects.title"),
    description: tr("portfolio.projects.description"),
    details: [
      {
        title: "E-Commerce Platform",
        role: "Lead Developer",
        description:
          "A high-performance e-commerce solution with advanced filtering and real-time inventory.",
        tech: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
        link: "#",
        image: "",
      },
      {
        title: "Fintech Dashboard",
        role: "Frontend Architect",
        description:
          "Real-time financial analytics dashboard handling millions of transactions.",
        tech: ["React", "D3.js", "TypeScript", "WebSocket"],
        link: "#",
        image: "",
      },
    ],
    colSpan: "col-span-2",
  },
  {
    id: "community",
    type: "community",
    title: tr("portfolio.community.title"),
    description: tr("portfolio.community.description"),
    details: [
      {
        role: "Core Contributor",
        organization: "Open Source Lib",
        description:
          "Maintained core components and improved accessibility for thousands of users.",
        link: "#",
      },
      {
        role: "Community Lead",
        organization: "Tech Meetup Group",
        description:
          "Organized monthly meetups and mentored junior developers.",
        link: "#",
      },
    ],
    colSpan: "col-span-1",
  },
  {
    id: "design",
    type: "design",
    title: tr("portfolio.design.title"),
    description: tr("portfolio.design.description"),
    details: [
      {
        title: "Mobile App UI",
        description: "Clean and intuitive interface for a wellness app.",
        image:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Brand Identity",
        description: "Complete rebranding for a tech startup.",
        image:
          "https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=600&auto=format&fit=crop",
      },
    ],
    colSpan: "col-span-1",
  },
  {
    id: "social",
    type: "social",
    title: tr("portfolio.social.title"),
    description: "Connect with me",
    content: [
      {
        label: "GitHub",
        url: "https://github.com/andersseen",
        icon: "github",
        color: "primary",
      },
      {
        label: "GitLab",
        url: "https://gitlab.com/Andersseen",
        icon: "gitlab",
        color: "warning",
      },
      {
        label: "Medium",
        url: "https://medium.com/@andriipap",
        icon: "medium",
        color: "accent",
      },
    ],
    colSpan: "col-span-1",
  },
  {
    id: "services",
    type: "services",
    title: tr("portfolio.services.title"),
    description: tr("portfolio.services.description"),
    content: [
      {
        text: "Frontend Development",
        gradient: "from-primary to-secondary",
        details:
          "Building responsive, accessible, and performant user interfaces.",
      },
      {
        text: "Backend Systems",
        gradient: "from-secondary to-accent",
        details:
          "Scalable API design, database management, and cloud architecture.",
      },
      {
        text: "UI/UX Design",
        gradient: "from-accent to-warning",
        details:
          "Creating intuitive and visually appealing digital experiences.",
      },
    ],
    details: [
      {
        text: "Frontend Development",
        gradient: "from-primary to-secondary",
        details:
          "Building responsive, accessible, and performant user interfaces with modern frameworks.",
      },
      {
        text: "Backend Systems",
        gradient: "from-secondary to-accent",
        details:
          "Scalable API design, database architecture (SQL/NoSQL), and secure authentication systems.",
      },
      {
        text: "UI/UX Design",
        gradient: "from-accent to-warning",
        details:
          "Creating intuitive, user-centric designs with focus on usability and visual hierarchy.",
      },
    ],
    colSpan: "col-span-1",
  },
  {
    id: "stack",
    type: "stack",
    title: tr("portfolio.stack.title"),
    description: tr("portfolio.stack.description"),
    details: {
      categories: [
        {
          name: "Frontend",
          items: [
            { name: "React", slug: "react" },
            { name: "TypeScript", slug: "typescript" },
            { name: "Tailwind", slug: "tailwindcss" },
            { name: "Astro", slug: "astro" },
          ],
        },
        {
          name: "Backend",
          items: [
            { name: "Node.js", slug: "nodedotjs" },
            { name: "Python", slug: "python" },
            { name: "PostgreSQL", slug: "postgresql" },
            { name: "Redis", slug: "redis" },
          ],
        },
        {
          name: "DevOps",
          items: [
            { name: "Docker", slug: "docker" },
            { name: "AWS", slug: "amazonaws" },
            { name: "Git", slug: "git" },
          ],
        },
      ],
    },
    colSpan: "col-span-1",
  },
  {
    id: "articles",
    type: "articles",
    title: tr("portfolio.articles.title"),
    description: tr("portfolio.articles.description"),
    details: [
      {
        title: "Understanding Astro Islands",
        description:
          "How partial hydration can significantly improve your website performance.",
        url: "#",
      },
      {
        title: "Mastering Tailwind CSS",
        description:
          "Best practices for maintaining scalable styles in large applications.",
        url: "#",
      },
      {
        title: "The Future of Web Development",
        description: "Trends and technologies to watch in 2025 and beyond.",
        url: "#",
      },
    ],
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
      "I am a passionate Full Stack Developer with over 5 years of experience in building scalable web applications.",
      "My expertise spans across the entire stack, from crafting pixel-perfect user interfaces with React and Tailwind to architecting robust backend systems with Node.js and Go.",
    ],
    philosophy:
      "I believe that code should be as beautiful as the design it implements. Clean, maintainable, and efficient code is my trademark.",
    goal: "To help businesses transform their ideas into powerful, user-friendly applications that solve real-world problems.",
    social: [
      {
        label: "GitHub",
        url: "https://github.com/andersseen",
        icon: "github",
        color: "primary",
      },
      {
        label: "GitLab",
        url: "https://gitlab.com/Andersseen",
        icon: "gitlab",
        color: "warning",
      },
      {
        label: "Medium",
        url: "https://medium.com/@andriipap",
        icon: "medium",
        color: "accent",
      },
    ],
  },
  colSpan: "col-span-1",
});
