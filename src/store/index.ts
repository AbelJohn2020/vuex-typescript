import { createStore } from 'vuex';
import rootGetters from './getters';
import rootMutations from './mutations';

export type user = {
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

export type state = {
    user: user,
    letters: boolean,
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