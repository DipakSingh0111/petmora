export function OrangeBrushBadge({ label }: { label: string }) {
  return (
    <span className="relative inline-flex items-center justify-center px-1 py-1">
      <svg
        className="absolute -inset-x-3 -inset-y-1 h-[calc(100%+10px)] w-[calc(100%+28px)]"
        viewBox="0 0 140 44"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M8 22 C18 6 42 2 70 8 C98 2 122 6 132 22 C122 38 98 42 70 36 C42 42 18 38 8 22 Z"
          fill="#f58834"
        />
        <path
          d="M12 22 C22 10 44 8 70 12 C96 8 118 10 128 22 C118 34 96 36 70 32 C44 36 22 34 12 22 Z"
          fill="#f79a4d"
          opacity="0.85"
        />
      </svg>
      <span className="relative z-[1] px-2.5 text-base font-bold tracking-wide text-white sm:text-lg">
        {label}
      </span>
    </span>
  );
}
