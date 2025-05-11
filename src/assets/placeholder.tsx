
// Placeholder components for when we don't have real images

export const PerfumeBottlePlaceholder = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-1/2 h-1/2 text-gray-400"
    >
      <path d="M9 2v2m-4.02 3L6 10l2 1v10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V11l2-1 1.02-3M9 22V12m6 10V12" />
      <rect x="9" y="2" width="6" height="2" />
    </svg>
  </div>
);

export const LogoPlaceholder = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <span className="font-serif tracking-widest text-gold text-2xl font-bold">
      BeautyTime
    </span>
  </div>
);
