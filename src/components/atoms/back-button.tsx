import { ArrowLeft } from 'lucide-react';
import { TransitionLink } from './transition-link';

interface BackButtonProps {
    className?: string;
}

export const BackButton = ({ className }: BackButtonProps) => {
    return (
        <TransitionLink
            href="/"
            className={`group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all duration-300 pointer-events-auto ${className}`}
        >
            <div className="relative flex items-center justify-center w-[45px] h-[12px]">
                {/* Base Arrow (Default Color) */}
                <div 
                    className="absolute inset-0 bg-muted-foreground transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-0"
                    style={{
                        maskImage: 'url(/icons/back-arrow.svg)',
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskImage: 'url(/icons/back-arrow.svg)',
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                    }}
                />

                {/* Gradient Arrow (Hover) */}
                <div 
                    className="absolute inset-0 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 bg-[image:var(--background-image-playgrade-light)] dark:bg-[image:var(--background-image-playgrade)]"
                    style={{
                        maskImage: 'url(/icons/back-arrow.svg)',
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskImage: 'url(/icons/back-arrow.svg)',
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                    }}
                />
            </div>
            <span className="text-sm font-medium tracking-wide uppercase">BACK</span>
        </TransitionLink>
    );
};
