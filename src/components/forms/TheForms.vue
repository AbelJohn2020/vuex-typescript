<template>
    <h3 id="more-tickets">{{ language() ? 'If you want more tickets:' : 'Si gustas mas tickets: ' }}</h3>
    <select-your-ticket :handleSelect="handleSelect" :isWelcome="false"></select-your-ticket>
    <ul>
        <li v-for="ticket in getTickets()" :key="ticket">
            <multi-form :user="$store.state.users" :id="parseInt(ticket)"></multi-form>
        </li>
    </ul>
    <div>
        <the-button :is-disabled="enableSubmit" type-button="button" :name="language() ? 'next' : 'siguiente'" @click="handleNext"></the-button>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';

    @Options({
        inject:['getTickets', 'handleSelect', 'language'],

        computed: {
            enableSubmit() {
                return this.$store.getters.enableSubmit;
            },
        },

        methods: {
            handleNext() {
                this.$store.commit('handleNext');
            },
        },

        mounted() {
            // Routing: si en el state user no tiene states entonces me envia a la pagina de inicio
            if(this.$store.state.users.length === 0) {
                this.$router.push('/')
            }
        },
    })

    export default class TheForms extends Vue {
    }
</script>

<style>
    #more-tickets {
        box-sizing: border-box;
        text-align: center;
    }
</style>