import { site } from "@/config/site";
import type { DocPage } from "../types";

export const gettingStarted: DocPage = {
  slug: "getting-started",
  title: "Getting Started",
  description:
    "A short path from curious to using Kuro: learn, install, explore, and get help.",
  blocks: [
    {
      type: "p",
      text: "Kuro is a desktop browser in beta. Whether you are brand new or just want to get set up, this page points you to the right place.",
    },
    {
      type: "steps",
      items: [
        {
          title: "Learn what Kuro is",
          text: "Read [About Kuro](/docs/about) for the goals, principles and how Kuro relates to Firefox and Zen.",
        },
        {
          title: "Install Kuro",
          text: `Windows is the first release platform. Follow [Installation](/docs/installation) and download from the [official website](${site.links.website}).`,
        },
        {
          title: "Explore what's available",
          text: "The [Features](/docs/features) page lists what the project says Kuro offers, and labels what is experimental or still planned.",
        },
        {
          title: "Make it yours",
          text: "Customization is a core goal. See [Settings](/docs/settings) for how it is meant to work.",
        },
        {
          title: "Get help or get involved",
          text: "Check the [FAQ](/docs/faq) and [Troubleshooting](/docs/troubleshooting), or read how to [contribute](/docs/contributing).",
        },
      ],
    },

    { type: "h2", text: "Before you start" },
    {
      type: "ul",
      items: [
        "**Operating system.** Windows is the first release platform. macOS and Linux are planned for later.",
        `**Where to download.** Use the [official Kuro website](${site.links.website}).`,
        `**Beta software.** Expect rough edges, and please report what you find on [GitHub Issues](${site.links.issues}).`,
      ],
    },
    {
      type: "callout",
      tone: "placeholder",
      title: "System requirements",
      text: "Minimum Windows version, memory and disk space have not been published yet. They will be listed here once confirmed.",
    },

    { type: "h2", text: "First launch" },
    {
      type: "p",
      text: "The project's design is for onboarding to let you choose whether to turn on Kuro AI, and for you to be able to change that choice later in Settings. Nothing about it is required to use the browser.",
    },
    {
      type: "callout",
      tone: "placeholder",
      title: "First-run walkthrough",
      text: "Exact onboarding steps and screenshots will be added once the first-run flow is confirmed for the current beta.",
    },

    { type: "h2", text: "Finding things in these docs" },
    {
      type: "p",
      text: "Press `Ctrl` + `K` (`⌘` + `K` on macOS) on any page to search. The sidebar groups pages by topic, and each page ends with links to the previous and next one.",
    },
  ],
};
