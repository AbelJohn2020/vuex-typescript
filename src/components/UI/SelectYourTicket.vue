<template>
  <select 
    name="tickets" 
    id="tickets" 
    :value="$store.state.tickets" 
    @input="handleSelect" 
    :class="{ welcome: isWelcome, english: $store.state.language === 'english', español: $store.state.language === 'español'}" 
    @change="handleChange"
>
        <option value="0" disabled selected="selected"> Choose an Option</option>
        <option v-for="number in $store.state.maxTickets" :key="number" :value="number"> 
            {{ number }}
        </option>
    </select>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: ['handleSelect', 'isWelcome'],
    methods: {
        handleChange() {
            //Routing: primera ruta
            window.addEventListener('unload', this.goToForm());
        },

        goToForm() {
            this.$router.push('/forms');
        },
    }
})
export default class SelectYourTicket extends Vue {
}
</script>

<style scoped>
    select {
        font: inherit;
        font-weight: bold;
        cursor: pointer;
        padding: 0.44rem 1.2rem;
        border-radius: 8px;
        outline: none;
    }

    .english {
        border: 1px solid #0076bb;
        background-color: #0076bb;
        color: white;
    }

    .español {
        border: 1px solid #A51C30;
        background-color: #A51C30;
        color: white;
    }

    .welcome {
        margin: 1rem 0 0 0;
        appearance: none;
    }

    .english:hover,
    .english:active {
        border-color: #002350;
        background-color: #002350;
    }

    .español:hover,
    .español:active {
        border-color: #881C30;
        background-color: #881C30;
    }

    .español option {
        background-color: #881C30;
    }
</style>