import { site } from "@/config/site";
import type { DocPage } from "../types";

export const about: DocPage = {
  slug: "about",
  title: "About Kuro",
  description:
    "What Kuro is, what it is trying to do, and how it relates to Firefox and Zen Browser.",
  blocks: [
    {
      type: "p",
      text: "**Kuro** is a free, open-source desktop web browser built on Firefox. It is inspired by modern browsers such as Zen, and focuses on customization, productivity, privacy and the overall browsing experience.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Kuro is currently in beta. These docs separate what the project has said is available from what is still planned look for the **Listed**, **Experimental** and **Planned** labels on the [Features](/docs/features) page.",
    },

    { type: "h2", text: "What Kuro is trying to do" },
    {
      type: "p",
      text: "Some browsers have bugs, poor performance, confusing interfaces, or features that don't work as well as they should. Kuro's goal is to take what works, improve what doesn't, and ship a browser that feels polished and modern. Features are meant to be useful, reliable and well integrated — not added for the sake of having more of them.",
    },
    {
      type: "ul",
      items: [
        "Fix bugs and improve reliability and stability.",
        "Provide a modern, clean and consistent interface.",
        "Give users more control and customization.",
        "Keep privacy at the centre of the browser.",
        "Stay open source, so the community can inspect, contribute to and improve it.",
      ],
    },

    { type: "h2", text: "Who Kuro is for" },
    {
      type: "p",
      text: "Everyone. Kuro should work well for casual users while giving people who want more control the tools to customize and extend their browser. It is not designed around a single type of user.",
    },

    { type: "h2", text: "Relationship to Firefox and Zen Browser" },
    {
      type: "p",
      text: "Kuro is built on Firefox and starts from the Zen/Firefox ecosystem. Websites are rendered by Firefox's Gecko engine, and Kuro tracks upstream Firefox releases. On top of that foundation Kuro adds its own interface, systems and privacy-focused features.",
    },
    {
      type: "p",
      text: "Kuro-specific code is kept separate from upstream code wherever practical. That keeps upstream updates and debugging manageable, and leaves the door open to a longer-term engine of Kuro's own.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Kuro is an independent project and is not affiliated with or endorsed by Mozilla or Zen Browser.",
    },

    { type: "h2", text: "How Kuro is organized" },
    {
      type: "figure",
      name: "layers",
      caption: "Kuro's layering: an engine foundation, Kuro-specific core systems, and the interface on top.",
    },
    {
      type: "ul",
      items: [
        "**Browser engine**: renders websites and handles networking, web standards, security isolation and hardware acceleration. Provided today by the Firefox foundation.",
        "**Kuro Core**: the systems specific to Kuro: tabs, windows, workspaces, profiles, sessions, bookmarks, history, downloads, settings, search, permissions and privacy controls.",
        "**User interface**: the tab interface, sidebar, address bar, menus, panels, themes, onboarding and accessibility features that give Kuro its identity.",
      ],
    },

    { type: "h2", text: "Today and what comes next" },
    {
      type: "table",
      head: ["Area", "Current direction", "Longer term"],
      rows: [
        [
          "Foundation",
          "Built on Firefox (Gecko) through the Zen/Firefox ecosystem.",
          "A Kuro-owned engine is a long-term goal. It is not required for the first release and would happen gradually, not as a rewrite.",
        ],
        [
          "Platforms",
          "Windows is the first release platform.",
          "macOS and Linux follow after Windows.",
        ],
        [
          "AI",
          "Optional and experimental. See [AI Features](/docs/ai-features).",
          "Local-first processing where possible.",
        ],
        [
          "Sync",
          "Not required to use Kuro.",
          "Optional, user-controlled synchronization may be offered eventually.",
        ],
      ],
    },

    { type: "h2", text: "Where to find Kuro" },
    {
      type: "ul",
      items: [
        `[Official website](${site.links.website}) downloads and news.`,
        `[Release notes](${site.links.releases})  what changed in each version.`,
        `[GitHub repository](${site.links.github})  source code, issues and contributions.`,
        `[Discord](${site.links.discord})  community and discussion.`,
      ],
    },
  ],
};
