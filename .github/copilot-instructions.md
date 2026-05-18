# Copilot Instructions

## Running the prototype

```bash
npm start        # runs on http://localhost:3000
```

Node.js v22 or v24 required.

## Architecture

This is an **NHS Prototype Kit** project — a thin wrapper around the kit that handles routing, Nunjucks templating, and NHS.UK frontend components. The entry point is `app.js`, which initialises the kit with config from `app/`:

| File/Dir | Purpose |
|---|---|
| `app/config.js` | Service name and port |
| `app/routes.js` | All custom Express POST routes and branching logic |
| `app/views/` | Nunjucks page templates |
| `app/views/layout.html` | Base layout — extends `prototype-kit-template.njk` |
| `app/data/session-data-defaults.js` | Default values pre-populated into session |
| `app/filters.js` | Custom Nunjucks filters |
| `app/locals.js` | Variables exposed to all templates |
| `app/assets/sass/main.scss` | Custom styles |
| `app/assets/javascript/` | Custom client-side JS |

### User journey (current flow)

```
index → /symptoms → [POST /symptoms-answer] → /details (Yes)
                                             → /ineligible (No)
                                             → /super-powers (I have no idea)

/super-powers → [POST /super-powers-answer] → /details (powers detected)
                                            → /ineligible (no powers)

/details → /date-of-birth → /super-powers → /check-answers → [POST /confirmation] → /confirmation
```

## Key conventions

**Routing pattern:** Form pages POST to a sibling `-answer` route (e.g. `symptoms` → `/symptoms-answer`). The route reads from `req.session.data` and calls `res.redirect()` for branching. Route handlers live entirely in `app/routes.js`.

**Session data in templates:** All session data is available as `data` in Nunjucks (e.g. `data.Doyouhavesymptoms`, `data.SuperPowers`). Pre-populate defaults in `app/data/session-data-defaults.js`.

**Nunjucks components:** NHS.UK macros are imported per-page at the top of each template:
```nunjucks
{% from "radios/macro.njk" import radios %}
{{ radios({ name: "fieldName", ... }) }}
```
All available components are at https://service-manual.nhs.uk/design-system/components

**CSS classes:** Use `nhsuk-` prefixed classes from nhsuk-frontend (e.g. `nhsuk-grid-row`, `nhsuk-heading-xl`, `nhsuk-list--bullet`).

**`formatDate` filter:** Used in `check-answers.html` as `data.dateOfBirth | formatDate` — this is provided by the prototype kit, not a custom filter.

**Checkbox arrays:** Multi-select checkboxes (e.g. `SuperPowers`) come through as arrays in `req.session.data`. Use `.includes()` to check values in route logic.
