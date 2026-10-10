import { site } from "@/config/site";
import type { DocPage } from "../types";

export const contributing: DocPage = {
  slug: "contributing",
  title: "Contributing",
  description:
    "How to report bugs, propose features and contribute code to Kuro.",
  blocks: [
    {
      type: "p",
      text: "Kuro is open source and built with community contributions in mind. You can help by reporting bugs, suggesting ideas, improving the code or just sharing feedback.",
    },

    { type: "h2", text: "Ways to contribute" },
    {
      type: "ul",
      items: [
        `**Report bugs** on [GitHub Issues](${site.links.issues}). See [Troubleshooting](/docs/troubleshooting) for what to include.`,
        "**Propose features.** Feature requests and larger ideas go to a discussion before implementation.",
        `**Contribute code** through the [repository](${site.links.github}).`,
        `**Join the community** on [Discord](${site.links.discord}) to ask questions and give feedback.`,
      ],
    },

    { type: "h2", text: "Before you start" },
    {
      type: "ul",
      items: [
        `Read the [Code of Conduct](${site.links.codeOfConduct}).`,
        `Read the repository's [contribution guide](${site.links.contributeGuide}).`,
        "Talk through larger ideas before you write the code.",
      ],
    },

    { type: "h2", text: "Branch structure" },
    {
      type: "p",
      text: `\`dev\` is the main branch and the repository's default branch. \`stable\` is the release branch. Urgent fixes, such as security patches, can go directly to \`stable\`. The [contribution guide](${site.links.contributeGuide}) has the full branch diagram.`,
    },

    { type: "h2", text: "Set up a development environment" },
    {
      type: "code",
      lang: "bash",
      title: "Get the source",
      code: `git clone ${site.links.gitClone}`,
    },
    {
      type: "p",
      text: `Before setting up a development environment, read the [building guidelines](${site.links.upstreamBuildGuide}) that the contribution guide points to. Skipping them can lead to avoidable build errors.`,
    },
    {
      type: "callout",
      tone: "placeholder",
      title: "Kuro development setup",
      text: "Needed: the toolchain versions, build and run commands, and how to test a change for Kuro itself.",
    },

    { type: "h2", text: "Architecture expectations" },
    {
      type: "p",
      text: "Kuro is organized into independent systems, so a feature can evolve without affecting unrelated parts. When you contribute:",
    },
    {
      type: "ul",
      items: [
        "Keep Kuro-specific code separate from upstream code wherever practical, and make it clear which code is upstream, which is a Kuro modification, which is Kuro-exclusive and which is platform-specific.",
        "Keep systems modular. Avoid putting large amounts of unrelated logic in a single file.",
        "Avoid unnecessary platform-specific code, so macOS and Linux can follow Windows without major restructuring.",
        "Prefer quality over quantity. Every system should prioritize reliability, security, privacy and performance, followed by maintainability, modularity, accessibility and user control.",
      ],
    },

    { type: "h2", text: "Pull requests, code style and testing" },
    {
      type: "callout",
      tone: "placeholder",
      title: "Contribution rules",
      text: "The repository's contribution guide does not yet define commit-message conventions, code style, testing requirements or the pull request review process. Until it does, check with the maintainers on Discord or on the related issue before investing in a large change.",
    },

    { type: "h2", text: "License" },
    {
      type: "p",
      text: `Kuro is distributed under the Mozilla Public License 2.0 unless otherwise specified. See the [LICENSE](${site.links.license}) file.`,
    },
  ],
};
