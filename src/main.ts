import { createApp } from 'vue';

import MultiForm from './components/Forms/MultiForm.vue';
import TheButton from './components/UI/TheButton.vue';
import TheRegistration from './components/Forms/TheRegistration.vue';
import FinishForm from './components/Forms/FinishForm.vue';
import InputField from './components/UI/InputField.vue';
import TektonAirlines from './pages/TektonAirlines.vue';
import ReviewTitle from './components/layouts/ReviewTitle.vue';
import ShowTheForms from './components/Forms/ShowTheForms.vue';
import SelectYourTicket from './components/UI/SelectYourTicket.vue';

import App from './App.vue';
import store from './store';

const app = createApp(App);

app.component('multi-form', MultiForm);
app.component('the-button', TheButton);
app.component('the-registration', TheRegistration);
app.component('finish-form', FinishForm);
app.component('input-field', InputField);
app.component('tekton-airlines', TektonAirlines);
app.component('review-title', ReviewTitle);
app.component('show-the-forms', ShowTheForms);
app.component('select-your-ticket', SelectYourTicket);

app.use(store);
app.mount('#app');
