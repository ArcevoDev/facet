---
"@arcevo/facet-components": minor
---

Export individual brand icon components (GithubIcon, LinkedinIcon, InstagramIcon,
FacebookIcon, TiktokIcon, WhatsappIcon, XIcon, TwitterIcon, YoutubeIcon, SlackIcon,
DiscordIcon, TelegramIcon, FigmaIcon, SpotifyIcon) from the main barrel so consuming
apps can import them directly without duplicating the SVGs. These components already
power the icon registry's `brandIcons` map and `LightIcon` — they were simply not
re-exported as named exports from the package entry point.
