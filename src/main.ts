import { createApp } from 'vue';

import MultiForm from './components/models/MultiForm.vue';
import TheButton from './components/UI/TheButton.vue';
import TheRegistration from './components/models/TheRegistration.vue';
import FinishForm from './pages/FinishForm.vue';
import InputField from './components/UI/InputField.vue';
import ReviewTitle from './components/layouts/ReviewTitle.vue';
import SelectYourTicket from './components/UI/SelectYourTicket.vue';
import TheForms from './pages/TheForms.vue';
import ReviewForms from './pages/ReviewForms.vue';


import App from './App.vue';
import store from './store';

const app = createApp(App);

app.component('multi-form', MultiForm);
app.component('the-button', TheButton);
app.component('the-registration', TheRegistration);
app.component('finish-form', FinishForm);
app.component('input-field', InputField);
app.component('review-title', ReviewTitle);
app.component('select-your-ticket', SelectYourTicket);
app.component('the-forms', TheForms);
app.component('review-forms', ReviewForms);

app.use(store);
app.mount('#app');
