type SvgCircleProps = {
  className?: string;
};

export function SvgCircle({
  className = "h-[40vh] w-[40vh] text-white dark:text-black",
}: SvgCircleProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Circle"
    >
      <circle cx="50" cy="50" r="50" fill="currentColor" />
    </svg>
  );
}
