import { Footer as FacetFooter } from "@arcevo/facet-components";
import type { FooterSocial } from "@arcevo/facet-components";
import { LightIcon } from "@arcevo/facet-components/light";
import { CONTACT } from "../lib/socials.js";
import { getDocsUrl } from "../lib/docs-url.js";

const SOCIALS: FooterSocial[] = [
  { label: "LinkedIn", href: CONTACT.linkedin, icon: "linkedin" },
  { label: "Instagram", href: CONTACT.instagram, icon: "instagram" },
  { label: "Facebook", href: CONTACT.facebook, icon: "facebook" },
  { label: "TikTok", href: CONTACT.tiktok, icon: "tiktok" },
];

const FOOTER_LINKS = [
  { label: "Feedback", href: "/feedback", icon: "mail" },
  { label: "GitHub", href: "https://github.com/arcevodev/facet", icon: "github", external: true },
  { label: "Documentation", href: getDocsUrl(), icon: "book-open", external: true },
];

export function Footer() {
  return (
    <FacetFooter
      variant="minimal"
      brand={{ name: "facet" }}
      legal={`© ${new Date().getFullYear()} facet. MIT License.`}
      socialArea={
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <LightIcon name={link.icon} size={14} />
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Feedback:{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-foreground"
              >
                {CONTACT.email}
              </a>
              {" "}· WhatsApp:{" "}
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                <LightIcon name="whatsapp" size={12} className="inline" /> Chat
              </a>
            </p>
            <div className="flex items-center gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <LightIcon name={social.icon} size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}
