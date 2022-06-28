<template>
  <select name="tickets" id="tickets" :value="$store.state.tickets" @input="handleSelect">
    <option value="0" disabled selected="selected"> 1</option>
    <option v-for="number in $store.state.maxTickets" :key="number" :value="number"> {{ number }}</option>
  </select>
  <finish-form v-if="$store.state.continue === 'finish'"></finish-form>
  <ul v-else>
    <li v-if="$store.state.tickets === 0">
      <the-form :user="$store.state.user"></the-form>
    </li>
    <li v-for="ticket in getTickets()" :key="ticket" v-else>
      <multi-form :user="$store.state.users" :id="parseInt(ticket)"></multi-form>
    </li>
  </ul>
  <!-- <finish-form v-if="$store.state.continue === 'finish'"></finish-form>
  <the-form v-else></the-form> -->
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  methods: {
    getTickets() {
      return Array.from({length: this.$store.state.tickets}, (_, i) => i + 1)
    },
    handleSelect(event: Event) {
      this.$store.state.tickets = (event.target as HTMLInputElement).value;

      let ticket;
      this.$store.state.users = [];
      const users = this.$store.state.users;

      for(ticket in this.getTickets()) {
        if(ticket) {
          users.push({...this.$store.state.user, id: parseInt(ticket)})
        }
      }
      console.log(users)
      return users;
    },
  }
})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
