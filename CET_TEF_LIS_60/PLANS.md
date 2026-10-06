# ExecPlans

Create a plan under plans/ when a task:
- touches 3+ files;
- changes shared CSS/JS;
- changes service-worker caching;
- adds a UC;
- changes question-bank schema;
- migrates architecture.

Template:

# <task>
## Goal
## Current state
## Constraints
## Plan
1. ...
## Validation
## Progress
- [ ] ...
## Decisions
## Result

Principles: inspect first; prefer incremental migrations; keep URLs stable; keep UC-specific config outside shared engines; validate after each checkpoint.
