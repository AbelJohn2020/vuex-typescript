<template>
  <finish-form v-if="$store.state.continue === 'finish'"></finish-form>
  
  <div v-else>
    <div v-if="$store.state.users.length > 0">
        <show-the-forms :getTickets="getTickets" :handleSelect="handleSelect"></show-the-forms>
    </div>
    <div v-else class="finish">
        <div id="form">
            <h1>Welcome to Tekton Airlines</h1>
            <h3>Please take your tickets.</h3>
            <h3>Each user can buy up to 4 tickets.</h3>
            <h3>Have fun travelling!</h3>
            <select-your-ticket :handleSelect="handleSelect" :isWelcome="true"></select-your-ticket>
        </div>
    </div>
  </div>
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
      this.$store.state.continue = 'form';
      this.$store.commit('multiForm', this.$store.state.tickets);

      let ticket;
      this.$store.state.users = [];
      const users = this.$store.state.users;

      for(ticket in this.getTickets()) {
        if(ticket) {
          users.push({...this.$store.state.user, id: parseInt(ticket)})
        }
      }
        console.log(this.getTickets())
      return users;
    },
  }
})
export default class TektonAirlines extends Vue {
}
</script>

<style>
#form,
#review {
  max-width: 30rem;
}

#form {
  margin: 2rem auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  background-color: #ffffff;
  padding: 2rem;
}

ul {
  list-style: none;
  padding: 0;
}

#review {
  margin: 2rem auto 0 auto;
  display: flex;
  align-items: center;
  padding: 2rem 2rem 1rem 2rem;
}

#review h2 {
  width: 100%;
  text-transform: capitalize;
  text-align: center;
}
</style>
