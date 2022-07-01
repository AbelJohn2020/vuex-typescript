<template>
  <select name="tickets" id="tickets" :value="$store.state.tickets" @input="handleSelect" :class="{welcome: isWelcome}">
        <option value="0" disabled selected="selected"> Choose an Option</option>
        <option v-for="number in $store.state.maxTickets" :key="number" :value="number"> {{ number }}</option>
    </select>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: ['handleSelect', 'isWelcome'],
})
export default class SelectYourTicket extends Vue {
}
</script>

<style scoped>
    select {
        font: inherit;
        border: 1px solid #0076bb;
        background-color: #0076bb;
        font-weight: bold;
        color: white;
        cursor: pointer;
        padding: 0.44rem 1.2rem;
        border-radius: 8px;
    }

    .welcome {
        margin: 1rem 0 0 0;
        appearance: none;
    }

    select:hover,
    select:active {
        border-color: #002350;
        background-color: #002350;
    }
</style>