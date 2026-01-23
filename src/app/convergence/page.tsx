'use client';

import { ComparisonView } from "@/components/templates/comparison-view";
import { CornerImage } from "@/components/atoms/corner-image";

export default function ConvergencePage() {
    return (
        <div className="relative min-h-screen">
            <CornerImage src="/images/convergence-corner.jpg" />

            <div className="relative z-10">
                <ComparisonView defaultView="problems" />
            </div>
        </div>
    );
}
