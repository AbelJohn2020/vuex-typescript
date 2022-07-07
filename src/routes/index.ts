import { createRouter, createWebHashHistory } from 'vue-router';

import FinishForm from '../pages/FinishForm.vue';
import TheWelcome from '../pages/TheWelcome.vue';
import TheFormsAndReview from '../pages/TheFormsAndReview.vue';

const routes = [
    { path: '/', component: TheWelcome },
    { path: '/forms', component: TheFormsAndReview},
    { path: '/finish', component: FinishForm },
];

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router;