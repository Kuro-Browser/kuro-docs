/**
 * Single source of truth for every external destination used by the docs.
 * Each URL here comes from information the project owner supplied or from the
 * public repository itself. Do not add a link without verifying it.
 */
const GITHUB = "https://github.com/Kuro-Browser/Kuro-Desktop";
const WEBSITE = "https://kuro-browser.vercel.app";

export const site = {
  name: "Kuro",
  docsName: "Kuro Docs",
  description:
    "Official documentation for Kuro Browser — an open-source desktop browser built on Firefox, focused on privacy, customization and a polished browsing experience.",
  links: {
    website: WEBSITE,
    releases: `${WEBSITE}/releases`,
    privacyPolicy: `${WEBSITE}/privacy`,
    github: GITHUB,
    gitClone: `${GITHUB}.git`,
    issues: `${GITHUB}/issues`,
    license: `${GITHUB}/blob/dev/LICENSE`,
    codeOfConduct: `${GITHUB}/blob/dev/CODE_OF_CONDUCT.md`,
    contributeGuide: `${GITHUB}/blob/dev/docs/contribute.md`,
    discord: "https://discord.gg/RuaJ3pqaEJ",
    privacyEmail: "mailto:KuroBrowser@emailthing.xyz",
    // Referenced by the repository's own contribution guide for build setup.
    upstreamBuildGuide: "https://docs.zen-browser.app/guides/building",
  },
  email: "KuroBrowser@emailthing.xyz",
} as const;
