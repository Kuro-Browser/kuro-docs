import type { DocPage } from "../types";

export const features: DocPage = {
  slug: "features",
  title: "Features",
  description:
    "What Kuro offers, grouped by area, with an honest status for each feature.",
  blocks: [
    {
      type: "p",
      text: "Features are grouped by area below. Each one carries a status so you can tell what the project has announced from what is still being built.",
    },
    { type: "legend" },
    {
      type: "callout",
      tone: "note",
      text: "Statuses come from the project's own documents. They are not the result of testing each feature in a particular build. Hands-on guides are added as features are confirmed.",
    },

    { type: "h2", text: "Tabs and organization" },
    {
      type: "features",
      items: [
        {
          name: "Vertical tabs and advanced tab management",
          status: "listed",
          text: "Tabs arranged vertically, with tools for managing many tabs at once.",
        },
        {
          name: "Pinned tabs and tab groups",
          status: "listed",
          text: "Keep important tabs in place and group related ones together.",
        },
        {
          name: "Workspaces",
          status: "listed",
          text: "Separate sets of tabs for different contexts, such as work and personal browsing.",
        },
        {
          name: "Split views",
          status: "listed",
          text: "View more than one page side by side in a single window.",
        },
      ],
    },

    { type: "h2", text: "Customization" },
    {
      type: "features",
      items: [
        {
          name: "Extensive customization",
          status: "listed",
          text: "Control over how the browser looks and behaves.",
          href: "/docs/settings",
        },
        {
          name: "Keyboard shortcuts",
          status: "listed",
          text: "Powerful shortcuts for common actions.",
        },
        {
          name: "Themes",
          status: "planned",
          text: "Visual themes for the interface.",
        },
        {
          name: "Profiles",
          status: "planned",
          text: "Separate browsing profiles.",
        },
      ],
    },

    { type: "h2", text: "Privacy and performance" },
    {
      type: "features",
      items: [
        {
          name: "Privacy-focused browsing",
          status: "listed",
          text: "Privacy is a core design requirement, not an add-on.",
          href: "/docs/privacy-security",
        },
        {
          name: "Performance-focused design",
          status: "listed",
          text: "Kuro aims to keep resource use low and the browser responsive.",
        },
        {
          name: "Tracking protection",
          status: "planned",
          text: "Built-in tools to limit tracking.",
        },
        {
          name: "RAM Saver",
          status: "planned",
          text: "Sleeping or discarding inactive tabs when appropriate, with user-selectable modes: Balanced, Memory Saver and Maximum Saver. It is meant never to destroy active work or unexpectedly close sessions.",
        },
      ],
    },

    { type: "h2", text: "Productivity and extensions" },
    {
      type: "features",
      items: [
        {
          name: "Notes and productivity tools",
          status: "listed",
          text: "Tools for getting things done without leaving the browser.",
        },
        {
          name: "Web app support",
          status: "listed",
          text: "Use websites as web apps.",
        },
        {
          name: "Extension support",
          status: "listed",
          text: "Add functionality with browser extensions.",
        },
        {
          name: "Screenshots",
          status: "planned",
          text: "Capture pages from within the browser.",
        },
      ],
    },

    { type: "h2", text: "AI" },
    {
      type: "features",
      items: [
        {
          name: "Kuro AI",
          status: "planned",
          text: "Optional, local-first assistance. You choose whether to enable it.",
          href: "/docs/ai-features",
        },
      ],
    },

    { type: "h2", text: "Sync and sessions" },
    {
      type: "features",
      items: [
        {
          name: "Optional sync",
          status: "planned",
          text: "User-controlled synchronization, kept separate from basic browser functionality. You will not need sync to use Kuro.",
        },
        {
          name: "Session management",
          status: "planned",
          text: "Tools for saving and restoring browsing sessions.",
        },
      ],
    },

    { type: "h2", text: "Guides for each feature" },
    {
      type: "callout",
      tone: "placeholder",
      title: "Per-feature guides",
      text: "How-to guides for individual features will be linked here as each one is confirmed in a release. Related controls are covered in [Settings](/docs/settings).",
    },
  ],
};
