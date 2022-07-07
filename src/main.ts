import { createApp } from 'vue';

import FinishForm from './pages/FinishForm.vue';
import InputField from './components/UI/InputField.vue';
import MultiForm from './components/models/MultiForm.vue';
import ReviewForms from './components/forms/ReviewForms.vue';
import ReviewTitle from './components/layouts/ReviewTitle.vue';
import SelectYourTicket from './components/UI/SelectYourTicket.vue';
import TheButton from './components/UI/TheButton.vue';
import TheForms from './components/forms/TheForms.vue';
import TheRegistration from './components/models/TheRegistration.vue';
import TheWelcome from './pages/TheWelcome.vue';
import TheFormsAndReview from './pages/TheFormsAndReview.vue';


import App from './App.vue';
import store from './store';
import router from './routes';

const app = createApp(App);

app.component('finish-form', FinishForm);
app.component('input-field', InputField);
app.component('multi-form', MultiForm);
app.component('review-forms', ReviewForms);
app.component('review-title', ReviewTitle);
app.component('select-your-ticket', SelectYourTicket);
app.component('the-button', TheButton);
app.component('the-forms', TheForms);
app.component('the-forms-and-review', TheFormsAndReview);
app.component('the-registration', TheRegistration);
app.component('the-welcome', TheWelcome);

app.use(store);
app.use(router);
app.mount('#app');
