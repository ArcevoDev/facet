// Brand icons (GitHub, LinkedIn, Instagram, Facebook, TikTok) as inline SVGs.
// lucide-react marks brand/social icons deprecated; these keep the landing
// page links working without relying on them.

interface BrandIconProps {
  size?: number;
  className?: string;
}

function BrandIcon({
  size = 16,
  className,
  children,
  label,
}: BrandIconProps & { children: React.ReactNode; label: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
      className={className}
    >
      {children}
    </svg>
  );
}

export function GithubIcon({ size, className }: BrandIconProps) {
  return (
    <BrandIcon size={size} className={className} label="GitHub">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </BrandIcon>
  );
}

export function LinkedinIcon({ size, className }: BrandIconProps) {
  return (
    <BrandIcon size={size} className={className} label="LinkedIn">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </BrandIcon>
  );
}

export function InstagramIcon({ size, className }: BrandIconProps) {
  return (
    <BrandIcon size={size} className={className} label="Instagram">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </BrandIcon>
  );
}

export function FacebookIcon({ size, className }: BrandIconProps) {
  return (
    <BrandIcon size={size} className={className} label="Facebook">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </BrandIcon>
  );
}

export function TikTokIcon({ size, className }: BrandIconProps) {
  return (
    <BrandIcon size={size} className={className} label="TikTok">
      <path d="M9 12a4 4 0 1 0 4 4V4c.5 2.5 2.5 4 5 4" />
    </BrandIcon>
  );
}
