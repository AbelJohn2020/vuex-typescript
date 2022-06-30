<template>
  <finish-form v-if="$store.state.continue === 'finish'"></finish-form>
  <div v-else>
    <select name="tickets" id="tickets" :value="$store.state.tickets" @input="handleSelect">
      <option value="0" disabled selected="selected"> Choose an Option</option>
      <option v-for="number in $store.state.maxTickets" :key="number" :value="number"> {{ number }}</option>
    </select>
    <div v-if="$store.state.users.length > 0">
      <form @submit.prevent="handleSubmit">
        <div v-if="$store.state.continue === 'review'" >
            <div id="review">
                <div class="edit-box">
                    <the-button type-button="button" name="<" @click="handleBack" class="edit-btn"></the-button>
                </div>
                <h2>review</h2>
            </div>
            <ul>
              <li v-for="ticket in getTickets()" :key="ticket" id="form">
                <the-registration :user="$store.state.users" :id="parseInt(ticket)"></the-registration>
              </li>
            </ul>
            <div class="submit-box">
                <the-button type-button="submit" :is-disabled="enableSubmit" name="submit"></the-button>
            </div>
        </div>
        <div v-else>
          <ul>
            <li v-for="ticket in getTickets()" :key="ticket">
              <multi-form :user="$store.state.users" :id="parseInt(ticket)"></multi-form>
            </li>
          </ul>
          <div>
            <the-button :is-disabled="enableSubmit" type-button="button" name="next" @click="handleNext"></the-button>
            <p>{{ this.$store.state.validMultiForm }}</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  computed: {
    enableSubmit() {
      return this.$store.state.validMultiForm.includes(false) ? true : false;
    },
  },
  methods: {
    handleNext() {
      this.$store.commit('handleNext');
    },
    handleBack() {
      this.$store.commit('handleBack');
    },
    getTickets() {
      return Array.from({length: this.$store.state.tickets}, (_, i) => i + 1)
    },
    handleSelect(event: Event) {
      this.$store.state.tickets = (event.target as HTMLInputElement).value;
      this.$store.commit('multiForm', this.$store.state.tickets);

      let ticket;
      this.$store.state.users = [];
      const users = this.$store.state.users;

      for(ticket in this.getTickets()) {
        if(ticket) {
          users.push({...this.$store.state.user, id: parseInt(ticket)})
        }
      }

      return users;
    },
    handleSubmit() {
      this.$store.commit('handleSubmit')
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
  box-sizing: border-box;
}

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
