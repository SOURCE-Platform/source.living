export interface NavLinkItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavSection {
  title: string;
  items: NavLinkItem[];
}

export interface MainNavItem {
  label: string;
  href: string;
  sections: NavSection[];
}

export const MAIN_NAV_ITEMS: MainNavItem[] = [
  {
    label: "Software",
    href: "/software",
    sections: [
      {
        title: "APPS",
        items: [
          { label: "0", href: "/software/0", description: "OS level user behaviour understander" },
          { label: "CAST", href: "/software/cast", description: "Open-source trustless social network" },
          { label: "Prover", href: "/software/prover", description: "Cryptographic infra for proof generation" },
          { label: "Non-Ad Platform", href: "/software/non-ad-platform", description: "The ad platform that doesn't exist" },
          { label: "SOURCE ID", href: "/software/source-id", description: "Mutlimodal ID system to prove humanity" },
        ],
      },
      {
        title: "OPEN-SOURCE",
        items: [
          { label: "Paranoid R&D Process", href: "/open-source/process", description: "Our collaborative & strictly paranoid development approach" },
          { label: "Transparency", href: "/open-source/transparency", description: "Public audits and verification" },
          { label: "Trustless Trust", href: "/open-source/trustless-trust", description: "MP-ZKP trustless commits" },
        ],
      },
    ],
  },
  {
    label: "Hardware",
    href: "/hardware",
    sections: [
      {
        title: "HARDWARE",
        items: [
          { label: "SOURCE Monitor", href: "/hardware/monitor", description: "Eyes, ears, and voice for civic spaces" },
          { label: "SOURCE Compute", href: "/hardware/computer", description: "Distributed edge computing and processing" },
          { label: "Public Infra", href: "/hardware/public-infrastructure", description: "Civic nervous system architecture" },
        ],
      },
      {
        title: "INSTALLATION",
        items: [
          { label: "Teams", href: "/installation/teams", description: "Deployment and integration teams" },
          { label: "Robots", href: "/installation/robots", description: "Autonomous installation systems" },
        ],
      },
    ],
  },
  {
    label: "Timeline",
    href: "/timeline",
    sections: [
      {
        title: "R&D",
        items: [
          {
            label: "HQ Manufacturing & Lab",
            href: "/timeline/hq-manufacturing-lab",
            description: "Advanced research and manufacturing facilities",
          },
          {
            label: "AI Research Lab",
            href: "/timeline/ai-research-lab",
            description: "Cutting-edge artificial intelligence research",
          },
          {
            label: "Test Demo Site",
            href: "/timeline/demo-sites",
            description: "Showcase installations and live deployments",
          },
        ],
      },
      {
        title: "GTM",
        items: [
          {
            label: "GTM : Elderly, Streamers, Early Adopters",
            href: "/timeline/gtm-elderly-streamers-early-adopters",
            description: "Community and early adoption strategy",
          },
          {
            label: "GTM : Smart Cities & Gov Contracts",
            href: "/timeline/gtm-smart-cities-gov-contracts",
            description: "Municipal and government partnerships",
          },
        ],
      },
      {
        title: "Scale",
        items: [
          {
            label: "Sales for Gov Civic Space Contracts",
            href: "/timeline/sales-gov-civic-space-contracts",
            description: "Government contracting and civic partnerships",
          },
          {
            label: "Marketing for Consumers",
            href: "/timeline/marketing-consumers",
            description: "Consumer marketing and public engagement",
          },
        ],
      },
    ],
  },
];

export function getCategorySlugFromHref(href: string): string {
  return href.replace(/^\//, "");
}

export function findCategoryBySlug(slug: string): MainNavItem | undefined {
  return MAIN_NAV_ITEMS.find(
    (item) => getCategorySlugFromHref(item.href) === slug
  );
}

export function findSubPageBySlugs(
  categorySlug: string,
  subPageSlug: string
): NavLinkItem | undefined {
  const category = findCategoryBySlug(categorySlug);

  if (!category) {
    return undefined;
  }

  return category.sections
    .flatMap((section) => section.items)
    .find((item) => getCategorySlugFromHref(item.href) === `${categorySlug}/${subPageSlug}`);
}

export function getAllCategoryParams(): { category: string }[] {
  return MAIN_NAV_ITEMS.map((item) => ({
    category: getCategorySlugFromHref(item.href),
  }));
}

export function getAllSubPageParams(): { category: string; slug: string }[] {
  const params: { category: string; slug: string }[] = [];

  for (const item of MAIN_NAV_ITEMS) {
    const categorySlug = getCategorySlugFromHref(item.href);

    for (const section of item.sections) {
      for (const subItem of section.items) {
        const [, slug] = getCategorySlugFromHref(subItem.href).split("/", 2);

        if (slug) {
          params.push({ category: categorySlug, slug });
        }
      }
    }
  }

  return params;
}
