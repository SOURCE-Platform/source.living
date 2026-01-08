export function FooterSection() {
    return (
        <section className="mt-12 space-y-6 border-t border-border pt-8">
            <p className="text-lg font-semibold text-foreground">
                Fund the new frontier.
            </p>
            <div className="flex flex-col gap-6 sm:flex-row">
                <a
                    href="mailto:contact@source.living"
                    className="group relative inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-white dark:text-gray-900 transition-all duration-200 bg-[image:var(--blue-button)] dark:bg-[image:var(--background-image-playgrade)] shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] playgrade-glow-shadow"
                >
                    <span className="relative z-10">Get in touch</span>
                    <div className="absolute inset-0 rounded-md bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-25"></div>
                </a>
                <a
                    href="/software"
                    className="group relative inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-foreground transition-all duration-200 playgrade-border hover:text-foreground hover:scale-[1.01] active:scale-[0.99]"
                >
                    <span className="relative z-10">Explore the platform</span>
                    <div className="absolute inset-0 rounded-md bg-[image:var(--blue-button)] dark:bg-[image:var(--background-image-playgrade)] opacity-0 transition-opacity duration-200 group-hover:opacity-20 z-0"></div>
                </a>
            </div>
        </section>
    );
}
