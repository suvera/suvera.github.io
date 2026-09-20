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
