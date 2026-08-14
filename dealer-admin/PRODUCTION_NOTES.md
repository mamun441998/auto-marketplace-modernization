# Dealer Admin — Production Status

The dealer dashboard is **~90% production-real**. Almost every page is wired to
the Laravel API (Bearer token from `localStorage["motohave_token"]`, base
`NEXT_PUBLIC_API_URL`). This note records what is real, what was finished in this
pass, and the few items that still need a backend endpoint.

## Real & working (wired to the backend)

Dashboard (stats, leads-source chart, top inventory, recent leads, trial
banner), Inventory (list / add / edit / detail CRUD + image upload), Leads
(pipeline + status + delete), Team (invite/list/role/remove via `/team`),
Billing (`/plans`, `/subscription`, `/dealer/subscription/checkout|confirm`),
Payments (gateway settings + transactions), Support (tickets + replies),
Marketing (campaigns, WhatsApp, email, templates, contacts, promo codes),
Inbox (real polling conversations), Website builder editor
(`/dealer/website` load/save/publish), Analytics (`/dealer/analytics`),
Settings (profile, domain, notifications, password, plan/usage), Onboarding.

## Finished in this pass

| Item | Change |
|---|---|
| **Plan gating** | `getCurrentDealerPlan()` no longer hardcoded to Professional. `refreshDealerPlan()` (in `lib/planConfig.ts`) fetches the real plan from `GET /api/subscription` (`plan_config` name + limits) on app load and caches it. AI tools, website builder, and inventory limits now gate on the dealer's **actual** plan. |
| **AI tools** (`ai-tools` page + the "Generate with AI" button in AddVehicleForm) | No longer `setTimeout` mocks. They call a real backend via `lib/ai.ts` with loading/error states, and show a clear "AI not configured yet" message until the endpoint + key exist. Fixed the `inputs.inputsCondition` bug that broke `next build`. |
| **Settings fake buttons** | The "Choose plan / upgrade / update payment method" `alert()`s in `PlanUsageSettings`, `BillingSettings`, and `UpdatePaymentMethodModal` now route to the real `/billing` checkout flow instead of faking success. |

Verified: `next build` succeeds; all routes compile.

## Backend endpoints still needed (next phase)

```
POST /api/dealer/ai/description   body { title, condition, tone, include_features }
     → { success, description }               # backend calls Claude API server-side
POST /api/dealer/ai/pricing       body { model, mileage, condition }
     → { success, report: { market_demand, liquidity_score, days_to_turn,
          pricing: { quick_turn, optimal, max_gross }, competitor_count } }
```
(Add an Anthropic key server-side to enable these; the frontend is ready.)

## Remaining polish (small, need backend data or infra)

- **Dashboard `SalesChart`** still renders mock `salesOverviewData` — needs a real
  sales time-series endpoint (analytics already returns `leads_over_time`; add a
  sales equivalent, then point the chart at it).
- **Website builder → Domain tab (`DomainConnect`)** is a simulated DNS/verify
  flow and duplicates the real custom-domain field already saved via
  `/dealer/website` + Settings. Consolidate on the real one; real DNS/SSL
  verification is deploy-side infra.
- **Topbar `NotificationsDropdown` and `GlobalSearch`** render mock data on every
  page — wire to real notifications/search endpoints or hide until built.
- **Orphaned mock components** (old `analytics/*`, `team/*`, `marketing/*` sets)
  are unused and can be deleted to avoid confusion.
- Minor: `OnboardingChecklist` steps 3–5 and `PlanUsageSettings` team count are
  hardcoded even though `/team` returns real usage.

## Environment

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_PLAN=Professional   # pre-load fallback only; real plan overrides it
```
