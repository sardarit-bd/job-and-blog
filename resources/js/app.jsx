// import { createInertiaApp } from '@inertiajs/react';
// import { createRoot } from 'react-dom/client';

// const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });

// createInertiaApp({
//     resolve: name => pages[`./Pages/${name}.jsx`].default,
//     setup({ el, App, props }) {
//         createRoot(el).render(<App {...props} />);
//     },
// });


import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });

createInertiaApp({
    resolve: (name) => {
        const path = `./Pages/${name}.jsx`;
        const page = pages[path];

        if (!page) {
            console.error(`MISSING COMPONENT: The file "${path}" was not found.`);
            console.log("Available pages are:", Object.keys(pages));
            throw new Error(`Component ${name} not found.`);
        }

        return page.default;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});