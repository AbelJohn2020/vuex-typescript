import { createApp } from 'vue';
import { createStore } from 'vuex';

import TheForm from './components/TheForm.vue';
import TheButton from './components/TheButton.vue';
import TheRegistration from './components/TheRegistration.vue';
import FinishForm from './components/FinishForm.vue';
import InputField from './components/InputField.vue';

import App from './App.vue';

const store = createStore({
    state() {
        return {
            user: {
                fieldName: {
                    name: '',
                    validName: 'pending',
                },
                fieldLastname: {
                    lastname: '',
                    validLastname: 'pending',
                },
                fieldNationality: {
                    nationality: '',
                    validNationality: 'pending',
                },
                fieldIdentification: {
                    identification: '',
                    validIdentification: 'pending',
                },
                fieldDocument: {
                    document: '',
                    validDocument: 'pending',
                },
            },

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
app.component('finish-form', FinishForm);
app.component('input-field', InputField);

app.use(store);
app.mount('#app');
