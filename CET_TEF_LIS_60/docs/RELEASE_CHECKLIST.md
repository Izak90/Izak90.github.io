# Release checklist

HTML/UI
- page opens with no console errors
- local links resolve
- Resumo/Treino/Simulações links correct
- no body horizontal overflow
- sticky elements do not overlap
- search does not break offsets
- light/dark readable
- mobile controls tappable

Training
- intended bank/difficulty loads
- 10/20 random works
- topic training works
- wrong answer enters correct error queue
- corrected error can leave queue
- no answer reveal before confirmation

Simulator
- correct bank/exam loads
- 40 Q
- 60:00 timer
- auto-submit
- returning from background/suspension respects the original deadline
- expiry during an open submission confirmation still auto-submits
- responses cannot change after submission (including Workbook controls)
- prev/next/q-nav
- unanswered warning
- score /20 correct
- pass >=9.5
- detailed correction from active bank
- repeat preserves same difficulty/exam

Question banks
- valid JSON
- 80 unique questions
- four options
- valid answer indices
- 40/40 disjoint exams
- union = all questions
- both exams cover required themes
- randomized stored answer positions
- coverage audit current

PWA
- new/renamed offline files in precache
- cache version bumped when precache membership changes
- precache paths exist
- old caches deleted
- online load then offline reload works
- after SW activation, clear HTTP cache and open unvisited precached study pages offline
- CDN styles/scripts and requested fonts remain available offline
- old-to-new cache update preserves unrelated caches and works under the hosting subpath

P0 automated browser checks: scripts/p0-smoke.cjs (Node + optional Playwright installation; no application build step). Device emulation does not replace a check on real Android/iOS hardware.
