import { createStore } from 'vuex';
import rootGetters from './getters';
import rootMutations from './mutations';

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

            letters: false,
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
    mutations: rootMutations,

    getters: rootGetters,
});

export default store;