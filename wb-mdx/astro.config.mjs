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
                SocialIcons: './src/components/SocialIcons.astro',
            },
            customCss: ['/src/styles/custom.css'],
            head: [
                {
                    tag: 'script',
                    attrs: {
                        defer: true,
                        src: 'https://snowprint.suvera.xyz/snow.js',
                        'data-domain': 'suvera.github.io',
                    },
                },
            ],
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
                    items: ['introduction', 'installation', 'quickstart', 'configuration'],
                },
                { label: 'Core', items: [{ autogenerate: { directory: 'core' } }] },
                { label: 'Web', items: [{ autogenerate: { directory: 'web' } }] },
                { label: 'Data', items: [{ autogenerate: { directory: 'data' } }] },
                { label: 'Async', items: [{ autogenerate: { directory: 'async' } }] },
                { label: 'Operations', items: [{ autogenerate: { directory: 'ops' } }] },
                // Listed explicitly so pages can be grouped by topic without
                // moving files (moving them would change published URLs).
                {
                    label: 'Testing & Deployment',
                    items: ['building/testing', 'advanced/build-deploy'],
                },
                {
                    label: 'Advanced',
                    items: [
                        'advanced/json-xml',
                        'advanced/local-stores',
                        'advanced/native-extension',
                        'building/utilities',
                    ],
                },
                { label: 'Libraries', items: [{ autogenerate: { directory: 'modules' } }] },
                { label: 'Examples', items: [{ autogenerate: { directory: 'examples' } }] },
                'real-applications',
                { label: 'How To', items: [{ autogenerate: { directory: 'howto' } }] },
                {
                    label: 'Reference',
                    items: [{ autogenerate: { directory: 'reference' } }],
                },
            ],
        }),
    ],
});
