import { state } from './types';

export default {
    getTickets(state: state) {
        return Array.from({length: state.tickets}, (_, i) => i + 1)
    },

    enableSubmit(state: state) {
        // return state.validMultiForm.includes(false) ? true : false;
        const filterFalse = state.validMultiForm.filter(element => element === false);
        return filterFalse.length > 0 ? true : false;
    },

    handleChecked(state: state) {
        if(state.language === 'español') {
            return true
        } else {
            return false;
        }
    },

    language(state:state) {
        if(state.language === 'english') {
            return true
        } else {
            return false
        }
    }
}