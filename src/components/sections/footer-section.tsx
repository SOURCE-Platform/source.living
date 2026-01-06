export function FooterSection() {
    return (
        <section className="mt-12 space-y-6 border-t border-border pt-8">
            <p className="text-lg font-semibold text-foreground">
                Ready to invest in the future of AI and human civilization?
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
                <a
                    href="mailto:contact@source.living"
                    className="inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                    Get in touch
                </a>
                <a
                    href="/software"
                    className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                    Explore the platform
                </a>
            </div>
        </section>
    );
}
