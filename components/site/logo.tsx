/** The app's mark: a tilted photo frame. It takes the text colour. */
export function Logo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        transform="rotate(-8 12 12)"
        d="M6.6 2.5h10.8a2.6 2.6 0 0 1 2.6 2.6v13.8a2.6 2.6 0 0 1-2.6 2.6H6.6A2.6 2.6 0 0 1 4 18.9V5.1a2.6 2.6 0 0 1 2.6-2.6zM7.3 4.8a1 1 0 0 0-1 1v9.6a1 1 0 0 0 1 1h9.4a1 1 0 0 0 1-1V5.8a1 1 0 0 0-1-1z"
      />
    </svg>
  );
}
