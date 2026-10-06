---
name: academy-pwa-release
description: Update ACADEMY service-worker caching and offline support after files are added or renamed.
---

# Workflow
Read docs/ARCHITECTURE.md and docs/RELEASE_CHECKLIST.md.
Diff paths; verify files exist; add offline-required assets; preserve network-first; bump cache version when precache membership changes; preserve old-cache cleanup; test online then offline reload. Report exact paths changed.
