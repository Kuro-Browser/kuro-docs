import type { IconName } from "@/components/icons/icons";

export interface NavItem {
  slug: string;
  title: string;
  icon: IconName;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/**
 * The one definition of documentation structure. Sidebar, mobile drawer,
 * previous/next links, search grouping and static routes are all derived from it.
 */
export const navGroups: NavGroup[] = [
  {
    label: "Introduction",
    items: [
      { slug: "about", title: "About Kuro", icon: "book" },
      { slug: "getting-started", title: "Getting Started", icon: "compass" },
    ],
  },
  {
    label: "Installation & Usage",
    items: [
      { slug: "installation", title: "Installation", icon: "download" },
      { slug: "features", title: "Features", icon: "grid" },
      { slug: "settings", title: "Settings", icon: "sliders" },
    ],
  },
  {
    label: "AI & Privacy",
    items: [
      { slug: "ai-features", title: "AI Features", icon: "sparkle" },
      { slug: "privacy-security", title: "Privacy & Security", icon: "shield" },
    ],
  },
  {
    label: "Help",
    items: [
      { slug: "faq", title: "FAQ", icon: "help" },
      { slug: "troubleshooting", title: "Troubleshooting", icon: "lifebuoy" },
    ],
  },
  {
    label: "Community",
    items: [{ slug: "contributing", title: "Contributing", icon: "branch" }],
  },
];

export const flatNav: (NavItem & { group: string })[] = navGroups.flatMap((g) =>
  g.items.map((item) => ({ ...item, group: g.label })),
);

export const docHref = (slug: string) => `/docs/${slug}`;

export function getNavNeighbours(slug: string) {
  const i = flatNav.findIndex((n) => n.slug === slug);
  return {
    prev: i > 0 ? flatNav[i - 1] : undefined,
    next: i >= 0 && i < flatNav.length - 1 ? flatNav[i + 1] : undefined,
  };
}
