---
"@arcevo/facet-components": minor
---

feat: animation family - text animations + card/button micro-interactions

New zero-dependency animation components, all SSR-safe (final state renders
server-side, effects run after mount):

Text animations (text-animations.tsx):
- BlurText: characters fade in from a blur, staggered.
- WaveText: characters bob in a continuous wave.
- FlipText: characters flip in sequentially (rotateX).
- SplitText: words (or chars) rise into place.
- FadeUpText: the whole block fades + slides up on mount.
- ShimmerText: a light sheen sweeps across the text.
- GradientText: an animated gradient fills the text.
- LetterSpacingText: letters expand on hover (or loop).
- CountUpText: counts from `from` to `to` with an ease-out curve.

Card/button micro-interactions (micro-interactions.tsx):
- TiltCard: 3D tilt toward the cursor with optional glare.
- GlowCard: cursor-following radial glow on a card surface.
- RippleButton: ink-burst ripple on click at the pointer position.
- MagneticButton: button gravitates toward the cursor.
- ShineButton: light sweep across on hover.
- ScrollReveal: IntersectionObserver scroll-triggered fade/slide-up wrapper.

Docs: new dedicated "Animation" sidebar section grouping text animations
under a "Text" parent plus surfaces (Aurora/Beams/GridPattern/Spotlight/
SparkleButton) and micro-interactions as top-level items. Keyframes added
to @arcevo/facet-tokens (facet-text-blur, facet-text-wave, facet-shimmer,
facet-gradient-shift, facet-flip, facet-fade-up, facet-glow-pulse).
