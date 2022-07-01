import { state } from './types';

export default {
    getTickets(state: state) {
        return Array.from({length: state.tickets}, (_, i) => i + 1)
    },
}