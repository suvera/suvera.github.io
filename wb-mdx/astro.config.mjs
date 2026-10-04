// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    // 1. Specify your root GitHub Pages domain
    site: 'https://suvera.github.io',

    // 2. Specify the target folder path (must begin and end with a slash)
    base: '/winter-boot/',

    outDir: '../winter-boot',

    build: {
        // Keep styles in the shared, cached _astro/*.css file instead of
        // repeating ~8 KB of identical inline <style> on every page.
        inlineStylesheets: 'never',
    },

    vite: {
        build: {
            rolldownOptions: {
                // Silence known upstream noise: Astro injects a
                // "use astro:head-inject" marker into every content page's
                // propagated-assets module and Rolldown warns about it.
                // See https://github.com/withastro/astro/issues/18087
                onLog(level, log, defaultHandler) {
                    if (
                        log.code === 'MODULE_LEVEL_DIRECTIVE' &&
                        typeof log.message === 'string' &&
                        log.message.includes('use astro:head-inject')
                    ) {
                        return;
                    }
                    defaultHandler(level, log);
                },
            },
        },
    },

    integrations: [
        starlight({
            title: 'Winter Boot: PHP Microservices Framework',
            credits: false,
            components: {
                Footer: './src/components/CustomFooter.astro',
            },
            customCss: ['/src/styles/custom.css'],
            social: [
                {
                    icon: 'github',
                    label: 'GitHub',
                    href: 'https://github.com/suvera/winter-boot'
                }
            ],
            sidebar: [
                {
                    label: 'Start Here',
                    items: ['introduction', 'quickstart', 'configuration'],
                },
                { label: 'Core', items: [{ autogenerate: { directory: 'core' } }] },
                { label: 'Web', items: [{ autogenerate: { directory: 'web' } }] },
                { label: 'Data', items: [{ autogenerate: { directory: 'data' } }] },
                { label: 'Async', items: [{ autogenerate: { directory: 'async' } }] },
                { label: 'Operations', items: [{ autogenerate: { directory: 'ops' } }] },
                { label: 'Building', items: [{ autogenerate: { directory: 'building' } }] },
                { label: 'Utilities', items: [{ autogenerate: { directory: 'advanced' } }] },
                { label: 'Modules', items: [{ autogenerate: { directory: 'modules' } }] },
                { label: 'Examples', items: [{ autogenerate: { directory: 'examples' } }] },
                {
                    label: 'Reference',
                    items: [{ autogenerate: { directory: 'reference' } }],
                },
            ],
        }),
    ],
});
