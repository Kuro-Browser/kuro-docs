import { site } from "@/config/site";
import type { DocPage } from "../types";

export const privacySecurity: DocPage = {
  slug: "privacy-security",
  title: "Privacy & Security",
  description:
    "Kuro's privacy commitments, how the project intends to honor them, and what is still to be verified.",
  blocks: [
    {
      type: "callout",
      tone: "note",
      text: "This page separates **commitments** the project has made from **verified behavior**. A commitment is a promise about direction and design. It is not the result of an audit.",
    },

    { type: "h2", text: "Privacy commitments" },
    {
      type: "p",
      text: "Privacy is a core principle of Kuro, and the project has committed that Kuro will never:",
    },
    {
      type: "ul",
      items: [
        "Charge users just to use the browser, or require payment for basic functionality.",
        "Use advertisements as part of the browser experience.",
        "Sell user data.",
        "Collect unnecessary user data.",
        "Put monetization ahead of user privacy, or sacrifice privacy simply to make money.",
        "Intentionally create unnecessary lock-in.",
      ],
    },

    { type: "h2", text: "How privacy is built into the design" },
    {
      type: "ul",
      items: [
        "Kuro's core functionality should not depend on collecting your browsing data.",
        "Browser data is meant to stay primarily on your device and under your control. The project avoids building centralized storage of user data.",
        "Sync, if it is offered, will be optional, user-controlled, clearly explained and separate from basic browser functionality.",
        "Kuro AI is optional and designed to be local-first. See [AI Features](/docs/ai-features).",
        "Kuro is open source, so anyone can inspect how it works.",
      ],
    },

    { type: "h2", text: "What has not been verified yet" },
    {
      type: "p",
      text: "Kuro is built on Firefox, so its network behavior starts from the upstream foundation. Documenting exactly what the current beta does — and does not — send over the network is still to be done.",
    },
    {
      type: "callout",
      tone: "placeholder",
      title: "Verified data-handling details",
      text: "Needed: which upstream Firefox telemetry, update-check and service connections are active or disabled in the Kuro build; what, if anything, Kuro itself sends; and where each setting that controls them lives.",
    },

    { type: "h2", text: "Privacy Policy and contact" },
    {
      type: "p",
      text: `The [Privacy Policy](${site.links.privacyPolicy}) is the authoritative description of how data is handled. For privacy questions, write to [${site.email}](${site.links.privacyEmail}).`,
    },

    { type: "h2", text: "Security" },
    {
      type: "p",
      text: `Kuro is open source under the Mozilla Public License 2.0, so its code can be inspected by anyone. That helps, but it is not a guarantee. No browser can promise perfect security or complete anonymity, and Kuro does not claim to.`,
    },
    { type: "h3", text: "Reporting a vulnerability" },
    {
      type: "callout",
      tone: "placeholder",
      title: "Private disclosure channel",
      text: "Needed: the address or form where security issues should be reported privately. Until it is published here, please do not post exploit details in a public issue.",
    },
    { type: "h3", text: "Staying safe" },
    {
      type: "ul",
      items: [
        "Download Kuro only from the [official website](" + site.links.website + ").",
        "Install extensions only from sources you trust.",
        "Read permission prompts, such as camera, microphone and location, before you allow them.",
      ],
    },
  ],
};
