import { site } from "@/config/site";
import type { DocPage } from "../types";

export const settings: DocPage = {
  slug: "settings",
  title: "Settings",
  description:
    "How customization is meant to work in Kuro, and where the settings reference will live.",
  blocks: [
    {
      type: "p",
      text: "Customization is one of Kuro's core goals: approachable defaults for new users, with deeper controls for people who want them.",
    },
    {
      type: "callout",
      tone: "placeholder",
      title: "Settings reference",
      text: "Needed: the real list of settings in the current build — their names, where to find them, their defaults and what they change. Nothing is listed as a setting below unless the project has described it, so this page never documents an option that doesn't exist.",
    },
    {
      type: "figure",
      name: "empty-settings",
      caption: "The settings reference will appear here once it is confirmed against the build.",
    },

    { type: "h2", text: "What the project has said about settings" },
    {
      type: "p",
      text: "These are design intentions from the project's architecture notes, not a list of options you can find today.",
    },
    {
      type: "features",
      items: [
        {
          name: "Kuro AI on/off",
          status: "planned",
          text: "Choose whether to enable Kuro AI during onboarding, and change that choice later in Settings.",
          href: "/docs/ai-features",
        },
        {
          name: "Memory modes",
          status: "planned",
          text: "A user-selectable RAM Saver mode: Balanced, Memory Saver or Maximum Saver.",
        },
        {
          name: "Sync",
          status: "planned",
          text: "Optional and clearly explained. It will be separate from basic browser functionality.",
        },
        {
          name: "Permissions and advanced settings",
          status: "planned",
          text: "Management of site permissions, plus advanced settings for people who want more control.",
        },
      ],
    },

    { type: "h2", text: "Missing a setting?" },
    {
      type: "p",
      text: `If there is a setting you'd like Kuro to have, start a conversation on [Discord](${site.links.discord}) or the [repository](${site.links.github}) before opening a pull request. See [Contributing](/docs/contributing).`,
    },
  ],
};
