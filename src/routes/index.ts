import { createRouter, createWebHashHistory } from 'vue-router';

import FinishForm from '../pages/FinishForm.vue';
import TheWelcome from '../pages/TheWelcome.vue';
import TheFormsAndReview from '../pages/TheFormsAndReview.vue';
// import store from '@/store';

// const state = store.state;
// console.log(state.users)

//    const TheWelcome = { template: '<the-welcome></the-welcome>' }
//    const TheFormsAndReview = { template: '<the-forms-and-review></the-forms-and-review>' }
//    const FinishForm = { template: '<finish-form></finish-form>' }

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