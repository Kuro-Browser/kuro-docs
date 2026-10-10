import { site } from "@/config/site";
import type { DocPage } from "../types";

export const installation: DocPage = {
  slug: "installation",
  title: "Installation",
  description:
    "Supported platforms, where to download Kuro, and how to get the source code.",
  blocks: [
    {
      type: "callout",
      tone: "note",
      text: "Kuro is in beta. This page will grow as the install experience is finalized, and it only describes what the project has confirmed.",
    },

    { type: "h2", text: "Supported platforms" },
    {
      type: "table",
      head: ["Platform", "Status", "Notes"],
      rows: [
        ["Windows", "First release platform", "The primary target of Kuro's first releases."],
        ["macOS", "Planned", "Follows Windows."],
        ["Linux", "Planned", "Follows macOS."],
      ],
    },
    {
      type: "p",
      text: "This table reflects the project's platform priorities. It is not a tested compatibility matrix.",
    },

    { type: "h2", text: "Download Kuro" },
    {
      type: "p",
      text: `Use the Download button on the [official Kuro website](${site.links.website}). Release notes for each version are published on the [releases page](${site.links.releases}).`,
    },
    {
      type: "callout",
      tone: "warning",
      text: "Download Kuro only from the official website. The project cannot vouch for installers from anywhere else.",
    },

    { type: "h2", text: "Install on Windows" },
    {
      type: "callout",
      tone: "placeholder",
      title: "Windows installation steps",
      text: [
        "Step-by-step instructions are not written yet. To document them accurately this page needs:",
        "the installer type and file name; whether the installer is code-signed (this affects Windows SmartScreen prompts); the default install location; and how updates are delivered and how to uninstall.",
      ],
    },

    { type: "h2", text: "macOS and Linux" },
    {
      type: "p",
      text: `Not available yet. Both are planned after Windows. Announcements will appear on the [official website](${site.links.website}) and the project's [Discord](${site.links.discord}).`,
    },

    { type: "h2", text: "Build from source" },
    {
      type: "p",
      text: `Kuro's source code is open and lives in the [Kuro-Desktop repository](${site.links.github}). Its default branch is \`dev\`.`,
    },
    {
      type: "code",
      lang: "bash",
      title: "Get the source",
      code: `git clone ${site.links.gitClone}`,
    },
    {
      type: "p",
      text: `Kuro-specific build instructions have not been published. The repository's contribution guide tells contributors to read the upstream building guidelines before setting up a development environment, because skipping them can lead to avoidable build errors: [Building guidelines](${site.links.upstreamBuildGuide}) (Zen Browser docs).`,
    },
    {
      type: "callout",
      tone: "placeholder",
      title: "Kuro build instructions",
      text: "Needed: required toolchain versions, the commands to build and run Kuro itself, and the expected disk space and build time.",
    },
    {
      type: "p",
      text: "Planning to contribute? See [Contributing](/docs/contributing).",
    },
  ],
};
