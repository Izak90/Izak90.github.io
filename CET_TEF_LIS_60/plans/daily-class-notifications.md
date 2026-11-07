# Daily class notifications
## Goal
Notify the user with the day's scheduled events at 07:00 Europe/Lisbon, using the existing daily schedule.

## Current state
The schedule is embedded in `index.html`; the app is hosted as a static PWA with a service worker and has no push backend. Browser notifications require an explicit permission request.

## Constraints
- Keep the static HTML/vanilla JS/PWA architecture.
- Do not claim delivery while the app is closed; local browser timers are best-effort and may be throttled.
- Do not notify on `furo` (no-class) events.
- Preserve the network-first service-worker strategy and update its cache version for changed app behavior.

## Plan
1. Add an explicit notification opt-in to the Agenda's daily summary.
2. Send a single daily notification at/after 07:00 Lisbon time while the app is open, or when it is opened later that day.
3. Use service-worker notifications and make notification clicks open the Agenda.
4. Document the delivery limitation and validate the app and service worker.

## Validation
- Run repository validation and focused Node tests.
- Check HTML/inline JavaScript syntax, service-worker precache paths, and changed-file diff.

## Progress
- [x] Inspect schedule, Agenda rendering, service-worker strategy, and validation tools.
- [x] Implement opt-in, daily scheduling, and notification-click navigation.
- [x] Update PWA documentation and cache version.
- [x] Run validation and review the final diff.

## Decisions
- The user chose local best-effort notifications rather than setting up a push backend.
- Use `Europe/Lisbon` consistently with the schedule's existing date helpers.
- Include all scheduled daily events except `furo`; send at most once per Lisbon calendar day.

## Result
Opt-in notification at/after 07:00 Europe/Lisbon is implemented in the Agenda. It sends once per day when the app is running or reopened and navigates to `#agenda` when clicked. Repository validation and focused tests pass.
