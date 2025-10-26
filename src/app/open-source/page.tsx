import Link from "next/link";

import { findCategoryBySlug } from "@/lib/navigation";

export default function OpenSourcePage() {
  const category = findCategoryBySlug("open-source");

  if (!category) {
    throw new Error("Open-Source category definition is missing.");
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16 sm:px-12 lg:px-20">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-muted-foreground">Category</p>
        <h1 className="text-4xl font-semibold">{category.label}</h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          SOURCE is built in the open. Explore the initiatives, repositories, and governance patterns that keep the project
          transparent.
        </p>
      </header>
      <div className="grid gap-8 sm:grid-cols-2">
        {category.sections.map((section) => (
          <section
            key={section.title}
            className="space-y-4 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur"
          >
            {section.title ? (
              <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
            ) : null}
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex w-full items-center justify-between rounded-xl bg-background/80 px-5 py-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    {item.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
