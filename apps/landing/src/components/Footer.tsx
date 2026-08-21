import { Link } from "react-router-dom";
import { Separator } from "@arcevo/facet-components";
import { LightIcon } from "@arcevo/facet-components/light";
import { getDocsUrl } from "../lib/docs-url.js";
import { CONTACT } from "../lib/socials.js";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TikTokIcon,
} from "./BrandIcons.js";

const SOCIALS = [
  { label: "LinkedIn", href: CONTACT.linkedin, icon: LinkedinIcon },
  { label: "Instagram", href: CONTACT.instagram, icon: InstagramIcon },
  { label: "Facebook", href: CONTACT.facebook, icon: FacebookIcon },
  { label: "TikTok", href: CONTACT.tiktok, icon: TikTokIcon },
];

export function Footer() {
  return (
    <div className="mx-auto max-w-7xl px-8 py-12">
      <Separator className="mb-8" />
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} facet. MIT License.
        </p>
        <div className="flex items-center gap-6">
          <Link
            to="/feedback"
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <LightIcon name="mail" size={14} />
            Feedback
          </Link>
          <a
            href="https://github.com/arcevodev/facet"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon size={14} />
            GitHub
          </a>
          <a
            href={getDocsUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <LightIcon name="book-open" size={14} />
            Documentation
          </a>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          Feedback: <a href={`mailto:${CONTACT.email}`} className="hover:text-foreground">{CONTACT.email}</a>
          {" "}· WhatsApp:{" "}
          <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="hover:text-foreground">
                <LightIcon name="message-circle" size={12} className="inline" /> Chat
          </a>
        </p>
        <div className="flex items-center gap-4">
          {SOCIALS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
