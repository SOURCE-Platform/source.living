'use client';

import { ComparisonView } from "@/components/templates/comparison-view";
import { CornerImage } from "@/components/atoms/corner-image";
import { SideNoiseShader } from "@/components/visuals/SideNoiseShader";

export default function ConvergencePage() {
    return (
        <div className="relative min-h-screen">
            <CornerImage src="/images/convergence-corner.jpg" />

            <SideNoiseShader side="left" className="hidden lg:block" />
            <SideNoiseShader side="right" className="hidden lg:block" />

            <div className="relative z-10">
                <ComparisonView defaultView="problems" />
            </div>
        </div>
    );
}
