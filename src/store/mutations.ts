import { state, user } from './types';

export default {
    handleChangeSelect (state: state, event: Event) {
        state.tickets = parseInt((event.target as HTMLInputElement).value);
    },
    handleSelect(state: state, getTickets: number[]) {
        let ticket: string;
        state.users = [];
        const users: user[] = state.users;
  
        for(ticket in getTickets) {
            users.push({...state.user, id: parseInt(ticket)})
        }
        return users;
    },

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

    handleInName(state:state, name: {idx: number, event: Event}) {
        const { idx, event } = name
        state.users[idx] = {...state.users[idx], fieldName: {...state.users[idx].fieldName, name: (event.target as HTMLInputElement).value}};
    },

    handleInLastname(state:state, lastname: {idx: number, event: Event}) {
        const { idx, event } = lastname;
        state.users[idx] = {...state.users[idx], fieldLastname: {...state.users[idx].fieldLastname, lastname: (event.target as HTMLInputElement).value}};
    },

    handleInNationality(state:state, nationality: {idx: number, event: Event}) {
        const { idx, event } = nationality;
        state.users[idx] = { ...state.users[idx], fieldNationality: {...state.users[idx].fieldNationality, nationality: (event.target as HTMLInputElement).value}};
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

    documentError(state: state, idx: number) {
        const documentValue = state.users[idx].fieldDocument.document;
        const validDocument = state.regNumbers.test(documentValue);

        if(validDocument) {
            state.letters = false;
        } else {
            state.letters = true;
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
        state.letters= false;
        state.users= [];
        state.validMultiForm= [];
        
        state.tickets= 0;
    },
}