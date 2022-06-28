import { createApp } from 'vue';
import { createStore } from 'vuex';

import MultiForm from './components/MultiForm.vue';
import TheForm from './components/TheForm.vue';
import TheButton from './components/TheButton.vue';
import TheRegistration from './components/TheRegistration.vue';
import FinishForm from './components/FinishForm.vue';
import InputField from './components/InputField.vue';

import App from './App.vue';

type user = {
    id: number,
    fieldName: {
        name: string,
        validName: string,
    },
    fieldLastname: {
        lastname: string,
        validLastname: string,
    },
    fieldNationality: {
        nationality: string,
        validNationality: string,
    },
    fieldIdentification: {
        identification: string,
        validIdentification: string,
    },
    fieldDocument: {
        document: string,
        validDocument: string,
    },
};

type state = {
    user: user,
    continue: string,
    language: string,
    users: user[] | [],
    regNumbers: RegExp,
    regex: RegExp,
    regNationality: RegExp,
    maxTickets: number[],
    tickets: number,
}

const store = createStore({
    state() {
        return {
            user: {
                id: 0,
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
            
            maxTickets: Array.from({length: 3}, (_, i) => i + 2),
            tickets: 0,
            regNumbers: /^[0-9]+$/,
            regex: /^[a-zñ A-ZÑáéíóúÁÉÍÓÚ'.]*$/,
            regNationality: /^[a-zñA-ZÑ]*$/,
        };
    },
    mutations: {
        handleNext(state: state) {
            console.log(state.user)
            state.continue = 'review';
        },

        handleBack(state: state) {
            state.continue = 'form';
        },

        handleAccept(state: state) {
            state.continue = 'form';
        },
        
        handleSubmit(state: state) {
            state.user = {
                id: 0,
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

            state.continue = 'finish';
        },

        identificationField(state: state, identification: string) {
            if(identification === '') {
                state.user.fieldIdentification.validIdentification = 'invalid';
            } else {
                state.user.fieldIdentification.validIdentification = 'valid';
                state.user.fieldDocument.document = '';
                state.user.fieldDocument.validDocument = 'pending';
            }
        },


        validateNameField(state: state) {
            const name = state.user.fieldName.name;
            const validName = state.regex.test(name);
            
            state.user.fieldName.validName = (name.length > 1 && validName) ? 'valid' : 'invalid';
        },

        validateLastnameField(state: state) {
            const lastname = state.user.fieldLastname.lastname;
            const validLastname = state.regex.test(lastname);

            state.user.fieldLastname.validLastname = (lastname.length > 1 && validLastname) ? 'valid' : 'invalid';

        },

        validateNationalityField(state: state) {
            const nationality = state.user.fieldNationality.nationality;
            const validNationality = state.regNationality.test(nationality);
            state.user.fieldNationality.validNationality = (nationality.length > 1 && validNationality) ? 'valid' : 'invalid';
        },

        identificationBlur(state: state) {
            const identification = state.user.fieldIdentification.identification;
            state.user.fieldIdentification.validIdentification = (identification.length > 1) ? 'valid' : 'invalid';
        },

        validateDocumentField(state: state, document: string) {
            const validDocument = state.regNumbers.test(document);
            const len = state.user.fieldDocument.document.length;
            const docLen = (state.user.fieldIdentification.identification === 'dni') ? 8 : 9;
            
            state.user.fieldDocument.validDocument = ((len === docLen) && validDocument) ? 'valid' : 'invalid';
        },
        
        //------------------------------------- MULTIFORM --------------------------------------------------

        onBlurName(state: state, idx: number) {
            const name = state.users[idx].fieldName.name;
            const validName = state.regex.test(name);
            
            if(name.length > 1 && validName) {
                state.users[idx] = {...state.users[idx], fieldName: {...state.users[idx].fieldName, validName: 'valid'}}
            } else {
                state.users[idx] = {...state.users[idx], fieldName: {...state.users[idx].fieldName, validName: 'invalid'}}
            }
        },

        onBlurLastname(state: state, idx: number) {
            const lastname = state.users[idx].fieldLastname.lastname;
            const validLastname = state.regex.test(lastname);
            
            if(lastname.length > 1 && validLastname) {
                state.users[idx] = {...state.users[idx], fieldLastname: {...state.users[idx].fieldLastname, validLastname: 'valid'}}
            } else {
                state.users[idx] = {...state.users[idx], fieldLastname: {...state.users[idx].fieldLastname, validLastname: 'invalid'}}
            }
        },

        onBlurNationality(state: state, idx: number) {
            const nationality = state.users[idx].fieldNationality.nationality;
            const validNationality = state.regNationality.test(nationality);
            
            if(nationality.length > 1 && validNationality) {
                state.users[idx] = {...state.users[idx], fieldNationality: {...state.users[idx].fieldNationality, validNationality: 'valid'}}
            } else {
                state.users[idx] = {...state.users[idx], fieldNationality: {...state.users[idx].fieldNationality, validNationality: 'invalid'}}
            }
        },
    },
});

const app = createApp(App);

app.component('multi-form', MultiForm)
app.component('the-form', TheForm);
app.component('the-button', TheButton);
app.component('the-registration', TheRegistration);
app.component('finish-form', FinishForm);
app.component('input-field', InputField);

app.use(store);
app.mount('#app');
