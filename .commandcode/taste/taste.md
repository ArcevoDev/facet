# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# cli

See [cli/taste.md](cli/taste.md)

- Planning/tracker artifacts (the priority list in output.txt, the session log in logs.txt) must be kept current during execution: cross out completed items as work proceeds, update the log after each milestone, and sync docs once the priority list is fully done — the user expects the tracker to always reflect what is being done or what needs doing, not just at session end. Re-affirmed when the user explicitly asked to "ensure to always track progress in/to the necessary files" while handing over a large feature backlog. Confidence: 0.7
- After an IDE/process crash, expects the assistant to reconstruct what was in flight from persisted artifacts (the .agent tracker, git log/status/diff) and answer "what went on last session" with a definitive pick-up point — the user's "or i should redrop the prompts???" signals that re-dropping prompts is the fallback they want to avoid, not the default; a confident "no need to redrop, here's what was in flight and the outstanding action" is the expected outcome. Re-affirmed when the user reported another crash with only the in-flight topic named ("our last session crashed mid process... we were working on the console layout display...") and expected pickup from persisted state, not a redo. Re-affirmed yet again when the user resumed crash-recovery work with a bare "continue.." (only an IDE file context attached) and expected reconstruction from the .agent tracker plus git state rather than re-dropping the prompts. Confidence: 0.7
- When handing over a large list of component/feature ideas, expects a verify-first workflow: check each item against existing component code to separate "already supported" from "needs work" (e.g., Breadcrumb already had an ellipsis variant), then execute based on priority — not blind implementation of the whole list. Confidence: 0.6

# architecture

See [architecture/taste.md](architecture/taste.md)

# Communication
See [communication/taste.md](communication/taste.md)
