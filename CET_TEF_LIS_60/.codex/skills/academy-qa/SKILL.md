---
name: academy-qa
description: Validate ACADEMY changes: JSON banks, exam invariants, shared assets, links, mobile flows and PWA precache paths.
---

# Workflow
Read docs/RELEASE_CHECKLIST.md.
Parse changed JSON; validate bank invariants; inspect HTML asset refs; detect stale renamed paths; verify shared JS supports multi-bank PEVS and single-bank PEDEx/CF; verify SW precache paths. Report file + exact invariant for failures.
