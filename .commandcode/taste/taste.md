# Taste (Continuously Learned by [CommandCode][cmd])

[cmd]: https://commandcode.ai/

# cli

See [cli/taste.md](cli/taste.md)

- Planning/tracker artifacts (the priority list in output.txt, the session log in logs.txt) must be kept current during execution: cross out completed items as work proceeds, update the log after each milestone, and sync docs once the priority list is fully done — the user expects the tracker to always reflect what is being done or what needs doing, not just at session end. Confidence: 0.6
- After an IDE/process crash, expects the assistant to reconstruct what was in flight from persisted artifacts (the .agent tracker, git log/status/diff) and answer "what went on last session" with a definitive pick-up point — the user's "or i should redrop the prompts???" signals that re-dropping prompts is the fallback they want to avoid, not the default; a confident "no need to redrop, here's what was in flight and the outstanding action" is the expected outcome. Confidence: 0.55

# architecture

See [architecture/taste.md](architecture/taste.md)

# Communication
See [communication/taste.md](communication/taste.md)
