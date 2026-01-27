
export function MissingLinkSection() {
    return (
        <section>
            <div className="mt-24 flex flex-col md:flex-row gap-8 md:gap-12 md:-mx-[25%] items-start">
                <div className="md:flex-1 space-y-6">
                    <div className="w-full h-32 bg-muted/20 rounded-lg" />
                    <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">The Missing Link</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Intelligence is the ability to process information; Awareness is the ability to perceive the reality from which that information comes. You cannot solve human problems if you cannot perceive the human condition.
                        </p>
                    </div>
                </div>

                <div className="md:flex-1 space-y-6">
                    <div className="w-full h-32 bg-muted/20 rounded-lg" />
                    <div>
                        <h4 className="text-lg font-bold text-foreground mb-1">The Source Role</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Source creates the sensory organs for the global AI brain. By capturing the "True Record of Reality," we provide the necessary context, the <strong className="text-foreground">SuperAwareness</strong>, that allows SuperIntelligence to function not just as a calculator, but as a benevolent, fully aligned agent of civilization.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
