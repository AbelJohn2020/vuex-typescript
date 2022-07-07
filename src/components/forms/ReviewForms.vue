<template>
    <review-title>
        <the-button type-button="button" name="<" @click="handleBack" class="edit-btn"></the-button>
    </review-title>
    <ul>
        <li v-for="ticket in getTickets()" :key="ticket">
          <the-registration :user="$store.state.users" :id="parseInt(ticket)"></the-registration>
        </li>
    </ul>
    <div class="submit-box">
        <the-button type-button="submit" :is-disabled="enableSubmit" name="submit"></the-button>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';

    @Options({
        inject:['getTickets'],

        computed: {
            enableSubmit() {
                return this.$store.getters.enableSubmit;
            },
        },

        methods: {
            handleBack() {
                this.$store.commit('handleBack');
            },
        }
    })

    export default class ReviewForms extends Vue {
    }
</script>

<style>

</style>