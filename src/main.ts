import { createApp } from 'vue';
import { createStore } from 'vuex';

import MultiForm from './components/MultiForm.vue';
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
    validMultiForm: boolean[] | [],
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
            validMultiForm: [],
            
            maxTickets: Array.from({length: 4}, (_, i) => i + 1),
            tickets: 0,
            regNumbers: /^[0-9]+$/,
            regex: /^[a-zñ A-ZÑáéíóúÁÉÍÓÚ'.]*$/,
            regNationality: /^[a-zñA-ZÑ]*$/,
        };
    },
    mutations: {
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
        handleBack(state: state) {
            state.continue = 'form';
        },

        handleAccept(state: state) {
            state.continue = 'form';
        },

        handleNext(state: state) {
            state.continue = 'review';
        },

        getTickets(state: state) {
            Array.from({length: state.tickets}, (_, i) => i + 1)
        },

        multiForm(state: state, tickets: number) {
            let i;
            state.validMultiForm = [];

            for(i= 0; i < tickets; i++) {
                state.validMultiForm = [...state.validMultiForm, false]
            }
            return state.validMultiForm;
        },

        typeIDField(state: state, identification: {event: Event, idx: number}) {
            const { event, idx } = identification;

            state.users[idx] = { ...state.users[idx], fieldIdentification: { ...state.users[idx].fieldIdentification, identification: (event.target as HTMLInputElement).value }};
            const idType = state.users[idx].fieldIdentification.identification;

            if(idType === '') {
                state.users[idx] = { ...state.users[idx], fieldIdentification: { ...state.users[idx].fieldIdentification, validIdentification: 'invalid' }};
            } else {
                state.users[idx] = { ...state.users[idx], fieldIdentification: { ...state.users[idx].fieldIdentification, validIdentification: 'valid' }};
                state.users[idx] = { ...state.users[idx], fieldDocument: { ...state.users[idx].fieldDocument, document: '' }};
                state.users[idx] = { ...state.users[idx], fieldDocument: { ...state.users[idx].fieldDocument, validDocument: 'pending' }};
            }
        },

        documentField(state: state, document: {event: Event, idx: number}) {
            const { event, idx } = document;

            state.users[idx] = { ...state.users[idx], fieldDocument: { ...state.users[idx].fieldDocument, document: (event.target as HTMLInputElement).value }}
            const documentValue = state.users[idx].fieldDocument.document;
            const validDcument = state.regNumbers.test(documentValue);
            const len = documentValue.length;
            const doclen = ( state.users[idx].fieldIdentification.identification === 'dni' ) ? 8 : 9

            if((len === doclen) && validDcument) {
                state.users[idx] = { ...state.users[idx], fieldDocument: { ...state.users[idx].fieldDocument, validDocument: 'valid' }};
            } else {
                state.users[idx] = { ...state.users[idx], fieldDocument: { ...state.users[idx].fieldDocument, validDocument: 'invalid' }};
            }
        },

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

        onBlurIdentification(state: state, idx: number) {
            const identification = state.users[idx].fieldIdentification.identification;
            if(identification.length > 1) {
                state.users[idx] = {...state.users[idx], fieldIdentification: {...state.users[idx].fieldIdentification, validIdentification: 'valid'}}
            } else {
                state.users[idx] = {...state.users[idx], fieldIdentification: {...state.users[idx].fieldIdentification, validIdentification: 'invalid'}}
            }
        },

        validMultipleForm(state: state, idx: number) {
            const validName = state.users[idx].fieldName.validName;
            const validLastname = state.users[idx].fieldLastname.validLastname;
            const validNationality = state.users[idx].fieldNationality.validNationality;
            const validIdentification = state.users[idx].fieldIdentification.validIdentification;
            const validDocument = state.users[idx].fieldDocument.validDocument;

            if(validName === 'valid' && validLastname === 'valid' && validNationality === 'valid' && validIdentification === 'valid' && validDocument === 'valid') {
                state.validMultiForm[idx] = true;
            } else {
                state.validMultiForm[idx] = false;
            }
        },

        handleSubmit(state: state) {
            state.continue= 'finish';

            state.user= {
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
            };

            state.language= 'english';
            state.users= [];
            state.validMultiForm= [];
            
            state.tickets= 0;
        },
    },
});

const app = createApp(App);

app.component('multi-form', MultiForm);
app.component('the-button', TheButton);
app.component('the-registration', TheRegistration);
app.component('finish-form', FinishForm);
app.component('input-field', InputField);

app.use(store);
app.mount('#app');
