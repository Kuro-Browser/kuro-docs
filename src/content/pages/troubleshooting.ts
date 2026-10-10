import { site } from "@/config/site";
import type { DocPage } from "../types";

export const troubleshooting: DocPage = {
  slug: "troubleshooting",
  title: "Troubleshooting",
  description:
    "Where to start when something goes wrong, and how to report it so it can be fixed.",
  blocks: [
    {
      type: "callout",
      tone: "note",
      text: "Kuro is in beta and no verified troubleshooting guide exists yet. This page deliberately lists no workaround that hasn't been confirmed. It covers how to gather information and report a problem, and marks the sections still to be written.",
    },

    { type: "h2", text: "Before you report a problem" },
    {
      type: "ol",
      items: [
        `Check that you downloaded Kuro from the [official website](${site.links.website}).`,
        `Search the [existing issues](${site.links.issues}) someone may have reported it already.`,
        "Work out the exact steps that make the problem happen.",
        "Note your Kuro version and your operating system version.",
      ],
    },

    { type: "h2", text: "Installation problems" },
    {
      type: "callout",
      tone: "placeholder",
      title: "To be written",
      text: "Needed: common installer errors and the fixes that have been confirmed to work.",
    },

    { type: "h2", text: "Startup issues" },
    {
      type: "callout",
      tone: "placeholder",
      title: "To be written",
      text: "Needed: what to do when Kuro does not start or closes immediately, including where to find the version number and any logs.",
    },

    { type: "h2", text: "Configuration mistakes" },
    {
      type: "callout",
      tone: "placeholder",
      title: "To be written",
      text: "Needed: settings that commonly cause confusion, once the [Settings](/docs/settings) reference is confirmed.",
    },

    { type: "h2", text: "Build errors" },
    {
      type: "p",
      text: `If you are building Kuro from source, read the [building guidelines](${site.links.upstreamBuildGuide}) that the repository's contribution guide points to first. Skipping them can lead to avoidable build errors.`,
    },
    {
      type: "callout",
      tone: "placeholder",
      title: "To be written",
      text: "Needed: errors specific to building Kuro, with confirmed fixes.",
    },

    { type: "h2", text: "Known issues" },
    {
      type: "figure",
      name: "empty-issues",
      caption: "No known issues have been published here yet.",
    },
    {
      type: "p",
      text: `The most current list is the repository's [issues page](${site.links.issues}).`,
    },

    { type: "h2", text: "Reporting a bug" },
    {
      type: "p",
      text: `Open an issue on [GitHub](${site.links.issues}) and include:`,
    },
    {
      type: "ul",
      items: [
        "A short description of what happened and what you expected instead.",
        "The steps to reproduce it.",
        "Your Kuro version and operating system version.",
        "A screenshot or screen recording if it helps. Remove passwords and personal information first.",
      ],
    },
    {
      type: "callout",
      tone: "warning",
      text: "Do not post security vulnerabilities in a public issue. See [Privacy & Security](/docs/privacy-security).",
    },
  ],
};
