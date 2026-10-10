import { site } from "@/config/site";
import type { DocPage } from "../types";

export const faq: DocPage = {
  slug: "faq",
  title: "FAQ",
  description: "Short answers to common questions about Kuro.",
  blocks: [
    {
      type: "faq",
      items: [
        {
          q: "What is Kuro Browser?",
          a: [
            "Kuro is a free, open-source desktop web browser built on Firefox. It is inspired by modern browsers such as Zen and focuses on customization, productivity, privacy and a polished browsing experience. See [About Kuro](/docs/about).",
          ],
        },
        {
          q: "How is Kuro related to Zen Browser and Firefox?",
          a: [
            "Kuro is built on Firefox and starts from the Zen/Firefox ecosystem, so websites are rendered by Firefox's Gecko engine. Kuro adds its own interface, systems and features on top.",
            "Kuro is an independent project. It is not affiliated with or endorsed by Mozilla or Zen Browser.",
          ],
        },
        {
          q: "Is Kuro free?",
          a: [
            "Yes. The project has committed that Kuro will remain free to use and open source, and that it will never charge for the browser or its basic functionality.",
          ],
        },
        {
          q: "Which platforms are supported?",
          a: [
            "Windows is the first release platform. macOS and Linux are planned after Windows. See [Installation](/docs/installation).",
          ],
        },
        {
          q: "How do I install Kuro?",
          a: [
            `Download it from the [official website](${site.links.website}). Detailed install steps are still being written; follow progress on the [Installation](/docs/installation) page.`,
          ],
        },
        {
          q: "Where can I report a bug?",
          a: [
            `On the repository's [GitHub Issues](${site.links.issues}) page. [Troubleshooting](/docs/troubleshooting) explains what to include so the bug can be fixed.`,
            "If you have found a security problem, please do not post details in a public issue. See [Privacy & Security](/docs/privacy-security).",
          ],
        },
        {
          q: "How can I contribute?",
          a: [
            "Bug reports, feature ideas and code are all welcome. For larger ideas, start a discussion before implementing. The full picture is on the [Contributing](/docs/contributing) page.",
          ],
        },
        {
          q: "Which features are experimental or planned?",
          a: [
            "The [Features](/docs/features) page labels every feature as Listed, Experimental or Planned. Kuro AI is currently experimental.",
          ],
        },
        {
          q: "Is Kuro AI required?",
          a: [
            "No. Kuro AI is optional. The design is for you to choose whether to enable it during onboarding and to change that choice later in Settings. See [AI Features](/docs/ai-features).",
          ],
        },
        {
          q: "Does Kuro collect my data?",
          a: [
            `The project's commitment is that Kuro will not collect unnecessary data and will never sell it. Verified, build-level details are still being documented, so see [Privacy & Security](/docs/privacy-security) and the [Privacy Policy](${site.links.privacyPolicy}).`,
          ],
        },
        {
          q: "Will Kuro get its own browser engine?",
          a: [
            "That is a long-term goal, but it is not part of the first release. Kuro currently relies on the Firefox foundation, and any move toward its own engine would happen gradually rather than as a rewrite.",
          ],
        },
      ],
    },
  ],
};
