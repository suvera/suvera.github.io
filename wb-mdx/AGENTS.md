## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Framework-Docs Sync

Any noticeable change to the Winter Boot framework (new `application.yml` keys, new attributes/annotations, behaviour changes, new modules) must also update the respective doc file under `src/content/docs/` in this repo in the same change: concept pages for behaviour (`core/`, `web/`, `data/`, `async/`, `ops/`, `building/`, `advanced/`, `modules/`), plus `reference/application-yml.mdx` for every new or changed configuration key. Verify with `./build.sh` (produces the shippable compressed output in `../winter-boot`; `--pretty` is inspect-only, not for deploy — never use bare `astro build`). Docs stay in lockstep with the framework — never land a user-visible framework change with docs missing.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
