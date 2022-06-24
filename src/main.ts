import { createApp } from 'vue';
import { createStore } from 'vuex';

import TheForm from './components/TheForm.vue';
import TheButton from './components/TheButton.vue';
import TheRegistration from './components/TheRegistration.vue';
import FinishForm from './components/FinishForm.vue';
import App from './App.vue';

const store = createStore({
    state() {
        return {
            // inputs
            name: '',
            lastname: '',
            nationality: '',
            identification: '',
            document: '',

            //validate inputs
            validName: 'pending',
            validLastname: 'pending',
            validNationality: 'pending',
            validIdentification: 'pending',
            validDocument: 'pending',

            //back o continue the form
            continue: 'form',

            language: 'english',
            users: [],
        };
    },
});

const app = createApp(App);

app.component('the-form', TheForm);
app.component('the-button', TheButton);
app.component('the-registration', TheRegistration);
app.component('finish-form', FinishForm)

app.use(store);
app.mount('#app');
