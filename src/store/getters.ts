import { state } from '../store';

export default {
    getTickets(state: state) {
        return Array.from({length: state.tickets}, (_, i) => i + 1)
    },
}