import { createApp } from 'vue';
import { createStore } from 'vuex';

import TheForm from './components/TheForm.vue';
import App from './App.vue';

const store = createStore({
    state() {
        return {
            name: '',
            lastname: '',
            nationality: '',
            identification: '',
            document: '',
            validName: 'pending',
            validLastname: 'pending',
            validNationality: 'pending',
            validIdentification: 'pending',
            validDocument: 'pending',
            language: 'english',
            enableButton: null,
            users: [],
        };
    },
});

const app = createApp(App);

app.component('the-form', TheForm);

app.use(store);
app.mount('#app');
