export interface NavLinkItem {
  label: string;
  href: string;
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
        title: "Software",
        items: [
          { label: "0", href: "/software/0" },
          { label: "CAST", href: "/software/cast" },
          { label: "Prover", href: "/software/prover" },
          { label: "Non-Ad Platform", href: "/software/non-ad-platform" },
          { label: "SOURCE ID", href: "/software/source-id" },
        ],
      },
    ],
  },
  {
    label: "Hardware",
    href: "/hardware",
    sections: [
      {
        title: "Hardware",
        items: [
          { label: "Monitor", href: "/hardware/monitor" },
          { label: "Computer", href: "/hardware/computer" },
          { label: "Poles", href: "/hardware/poles" },
        ],
      },
    ],
  },
  {
    label: "Open-Source",
    href: "/open-source",
    sections: [
      {
        title: "Open-Source",
        items: [
          { label: "Process", href: "/open-source/process" },
          { label: "Transparency", href: "/open-source/transparency" },
          { label: "Trustless Trust", href: "/open-source/trustless-trust" },
        ],
      },
    ],
  },
  {
    label: "Installation",
    href: "/installation",
    sections: [
      {
        title: "Installation",
        items: [
          { label: "Teams", href: "/installation/teams" },
          { label: "Robots", href: "/installation/robots" },
        ],
      },
    ],
  },
  {
    label: "Timeline",
    href: "/timeline",
    sections: [
      {
        title: "Timeline",
        items: [
          {
            label: "Demo sites",
            href: "/timeline/demo-sites",
          },
          {
            label: "GTM : Elderly, Streamers, Early Adopters",
            href: "/timeline/gtm-elderly-streamers-early-adopters",
          },
          {
            label: "GTM : Smart Cities & Gov Contracts",
            href: "/timeline/gtm-smart-cities-gov-contracts",
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
