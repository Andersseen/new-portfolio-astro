import type { PortfolioItem } from "../components/PortfolioGrid";

export const getPortfolioItems = (
  tr: (key: string) => string,
  articles?: any[]
): PortfolioItem[] => [
  {
    id: "projects",
    type: "projects",
    title: tr("portfolio.projects.title"),
    description: tr("portfolio.projects.description"),
    actionLabel: tr("portfolio.actions.featuredWork"),
    content: [],
    details: [
      {
        title: tr("portfolio.projects.falcotech.title"),
        role: "Full Stack Developer",
        description: tr("portfolio.projects.falcotech.description"),
        tech: ["Web Development", "IT Solutions"],
        link: "https://www.falcotech.es/",
        image: "",
      },
      {
        title: tr("portfolio.projects.beautyline.title"),
        role: "Frontend Developer",
        description: tr("portfolio.projects.beautyline.description"),
        tech: ["Web Design", "UX/UI"],
        link: "https://www.beauty-line-esthetic.es/",
        image: "",
      },
      {
        title: tr("portfolio.projects.palomamolero.title"),
        role: "Web Developer",
        description: tr("portfolio.projects.palomamolero.description"),
        tech: ["Portfolio", "Gallery"],
        link: "https://www.palomamolero.com/",
        image: "",
      },
      {
        title: tr("portfolio.projects.soulalegria.title"),
        role: "Lead Developer",
        description: tr("portfolio.projects.soulalegria.description"),
        tech: ["Wellness", "E-commerce"],
        link: "https://www.soulalegria.com/",
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
    actionLabel: tr("portfolio.actions.viewContributions"),
    details: [
      // Maintained / Useful Projects
      {
        role: "Creator & Maintainer",
        organization: tr("portfolio.community.gsap.title"),
        description: tr("portfolio.community.gsap.description"),
        repoUrl: "https://github.com/Andersseen/gsap-blocker",
        demoUrl: "https://gsap-blocker.vercel.app/",
        category: "projects",
      },
      {
        role: "Creator & Maintainer",
        organization: tr("portfolio.community.material.title"),
        description: tr("portfolio.community.material.description"),
        repoUrl: "https://github.com/Andersseen/material-blocks",
        demoUrl: "https://material-blocks.vercel.app/",
        category: "projects",
      },
      {
        role: "Creator & Maintainer",
        organization: tr("portfolio.community.palette.title"),
        description: tr("portfolio.community.palette.description"),
        repoUrl: "https://github.com/Andersseen/palette-forge",
        demoUrl: "https://palette-crafter.vercel.app/",
        category: "projects",
      },

      // Templates / Boilerplates
      {
        role: "Creator",
        organization: "Next.js Web Landing Boilerplate",
        description:
          "A comprehensive boilerplate for high-performance landing pages.",
        repoUrl: "", // User provided demo, assuming repo helps or just demo
        demoUrl: "https://web-landing-boilerplate.vercel.app/",
        category: "templates",
      },
      // New Maintained/Demo Project
      {
        role: "Creator",
        organization: "Angular Portfolio Experiments",
        description:
          "Exploring new limits in Angular with Three.js integration.",
        repoUrl: "", // User didn't provide repo, only demo
        demoUrl: "https://angular-portfolio-tawny.vercel.app",
        category: "templates",
      },
    ],
    colSpan: "col-span-1",
  },
  {
    id: "design",
    type: "design",
    title: tr("portfolio.design.title"),
    description: tr("portfolio.design.description"),
    actionLabel: tr("portfolio.actions.gallery"),
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
    description: tr("portfolio.actions.moveCursor"),
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
        text: tr("portfolio.services.web"),
        gradient: "from-primary to-secondary",
        details:
          "Building responsive, accessible, and performant user interfaces.",
      },
      {
        text: tr("portfolio.services.desktop"),
        gradient: "from-secondary to-accent",
        details:
          "Scalable API design, database management, and cloud architecture.",
      },
      {
        text: tr("portfolio.services.uiux"),
        gradient: "from-accent to-warning",
        details:
          "Creating intuitive and visually appealing digital experiences.",
      },
      {
        text: tr("portfolio.services.devops"),
        gradient: "from-warning to-primary",
        details:
          "Deployment automation, infrastructure management, and performance optimization.",
      },
    ],
    details: [
      {
        text: tr("portfolio.services.web"),
        gradient: "from-primary to-secondary",
        details:
          "Building responsive, accessible, and performant user interfaces with modern frameworks.",
      },
      {
        text: tr("portfolio.services.desktop"),
        gradient: "from-secondary to-accent",
        details:
          "Scalable API design, database architecture (SQL/NoSQL), and secure authentication systems.",
      },
      {
        text: tr("portfolio.services.uiux"),
        gradient: "from-accent to-warning",
        details:
          "Creating intuitive, user-centric designs with focus on usability and visual hierarchy.",
      },
      {
        text: tr("portfolio.services.devops"),
        gradient: "from-warning to-primary",
        details:
          "Deployment automation, infrastructure management, and performance optimization.",
      },
    ],
    colSpan: "col-span-1",
  },
  {
    id: "stack",
    type: "stack",
    title: tr("portfolio.stack.title"),
    description: tr("portfolio.stack.description"),
    content: [
      { name: "Angular", icon: "angular", color: "error" },
      { name: "React", icon: "react", color: "primary" },
      { name: "Tailwind", icon: "tailwindcss", color: "secondary" },
      { name: "NestJS", icon: "nestjs", color: "error" },
    ],
    details: {
      categories: [
        {
          name: "Frontend",
          items: [
            { name: "Astro", slug: "astro" },
            { name: "Next.js", slug: "nextdotjs" },
            { name: "Angular", slug: "angular" },
            { name: "Nx", slug: "nx" },
            { name: "Lit", slug: "lit" },
            { name: "TypeScript", slug: "typescript" },
            { name: "Tailwind", slug: "tailwindcss" },
          ],
        },
        {
          name: "Backend",
          items: [
            { name: "NestJS", slug: "nestjs" },
            { name: "Express", slug: "express" },
            { name: "Node.js", slug: "nodedotjs" },
            { name: "PostgreSQL", slug: "postgresql" },
            { name: "Redis", slug: "redis" },
          ],
        },
        {
          name: "DevOps",
          items: [
            { name: "Cloudflare", slug: "cloudflare" },
            { name: "Kubernetes", slug: "kubernetes" },
            { name: "Nginx", slug: "nginx" },
            { name: "Docker", slug: "docker" },
            { name: "CI/CD", slug: "githubactions" }, // Using githubactions icon as proxy for CI/CD
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
    actionLabel: tr("portfolio.actions.latestPosts"),
    details:
      articles && articles.length > 0
        ? articles
        : [
            {
              title: tr("portfolio.articles.material_blocks"),
              description: tr("portfolio.articles.material_desc"),
              url: "https://medium.com/@andriipap",
            },
            {
              title: tr("portfolio.articles.switch_map"),
              description: tr("portfolio.articles.switch_desc"),
              url: "https://medium.com/@andriipap",
            },
            {
              title: tr("portfolio.articles.textarea"),
              description: tr("portfolio.articles.textarea_desc"),
              url: "https://medium.com/@andriipap",
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
  lang:
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[1] || "en"
      : "en",
  details: {
    title: tr("portfolio.aboutMe.hello"),
    bio: [tr("portfolio.aboutMe.bio1"), tr("portfolio.aboutMe.bio2")],
    philosophy: tr("portfolio.aboutMe.philosophy"),
    goal: tr("portfolio.aboutMe.goal"),
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
