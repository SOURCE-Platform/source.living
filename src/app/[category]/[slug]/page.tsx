import Link from "next/link";
import { notFound } from "next/navigation";

import {
  findCategoryBySlug,
  findSubPageBySlugs,
  getAllSubPageParams,
} from "@/lib/navigation";

type SubPageProps = {
  params: {
    category: string;
    slug: string;
  };
};

export async function generateStaticParams() {
  return getAllSubPageParams();
}

export default function SubPage({ params }: SubPageProps) {
  const category = findCategoryBySlug(params.category);
  const page = findSubPageBySlugs(params.category, params.slug);

  if (!category || !page) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16 sm:px-12 lg:px-20">
      <nav>
        <Link
          href={`/${params.category}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <span aria-hidden="true">←</span>
          Back to {category.label}
        </Link>
      </nav>
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">Subpage</p>
        <h1 className="text-4xl font-semibold">{page.label}</h1>
      </header>
      <section className="space-y-4 text-base leading-relaxed text-muted-foreground">
        <p>
          This page is reserved for content describing the {page.label} offering within the {category.label} category.
        </p>
        <p>
          Use this template to highlight product details, implementation steps, and supporting resources tailored to this
          focus area.
        </p>
      </section>
    </div>
  );
}
