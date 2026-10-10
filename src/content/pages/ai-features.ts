import { site } from "@/config/site";
import type { DocPage } from "../types";

export const aiFeatures: DocPage = {
  slug: "ai-features",
  title: "AI Features",
  description:
    "What Kuro AI is meant to be, how it is designed to work, and what is not yet confirmed.",
  blocks: [
    {
      type: "callout",
      tone: "warning",
      title: "Experimental",
      text: "Kuro AI is under development. This page describes the project's design and direction. It does not list supported models, and it does not promise that any particular capability is available in the current beta.",
    },

    { type: "h2", text: "What Kuro AI is" },
    {
      type: "p",
      text: "Kuro AI is an optional system. The design is for you to choose whether to enable it during onboarding, and to be able to change that choice later in Settings. It is built as a separate module so that turning it off does not affect the rest of the browser.",
    },

    { type: "h2", text: "Local-first by design" },
    {
      type: "p",
      text: "The project's priority is to process things locally where possible. The planned architecture sends requests through a local interface to Ollama, which runs a model on your own computer.",
    },
    {
      type: "flow",
      label: "Planned architecture of Kuro AI",
      steps: [
        { title: "Kuro", text: "The browser" },
        { title: "Local AI interface", text: "Kuro's connection to the model runner" },
        { title: "Ollama", text: "Runs models on your computer" },
        { title: "Local model", text: "Generates the responses" },
      ],
    },
    {
      type: "callout",
      tone: "note",
      title: "A design goal, not a guarantee",
      text: `Local-first describes the intent. Until each AI feature has been verified, don't assume that everything it does stays on your device. The [Privacy Policy](${site.links.privacyPolicy}) is the authoritative statement on data handling, and it refers to Kuro's AI features as Kuro Intelligence.`,
    },

    { type: "h2", text: "Capabilities the project is exploring" },
    {
      type: "p",
      text: "None of these should be assumed to be available yet.",
    },
    {
      type: "features",
      items: [
        { name: "Page understanding", status: "planned", text: "Help making sense of the page you are viewing." },
        { name: "Selected-text analysis", status: "planned", text: "Explain or analyze text you select." },
        { name: "Summarization", status: "planned", text: "Summaries of pages and other content." },
        { name: "Research assistance", status: "planned", text: "Help gathering and comparing information." },
        { name: "Tab organization", status: "planned", text: "Help sorting and organizing open tabs." },
        { name: "History assistance", status: "planned", text: "Help finding things you have visited before." },
        { name: "Writing assistance", status: "planned", text: "Help drafting and editing text." },
        { name: "Local browser search", status: "planned", text: "Searching browser content using local processing." },
        { name: "Context-aware assistance", status: "planned", text: "Assistance that takes what you are doing into account." },
        { name: "Browser automation", status: "planned", text: "Having the assistant carry out browser tasks for you." },
      ],
    },

    { type: "h2", text: "Current status" },
    {
      type: "p",
      text: "Early prototype work has used a small local model through Ollama. There is no list of supported models yet and no user-facing setup guide.",
    },
    {
      type: "callout",
      tone: "placeholder",
      title: "Setup instructions",
      text: "Needed: how Kuro AI is enabled in the beta, whether Ollama must be installed separately, which models are supported, and hardware recommendations.",
    },
  ],
};
