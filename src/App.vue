<template>
      <!-- <finish-form v-if="$store.state.continue === 'finish'"></finish-form>
      <div v-else>
        <div v-if="$store.state.users.length > 0">
            <the-forms-and-review></the-forms-and-review>
        </div>
        <div v-else class="finish">
              <the-welcome></the-welcome>
        </div>
      </div> -->
      <router-view></router-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  methods: {
    getTickets() {
        return this.$store.getters.getTickets;
    },

    handleSelect(event: Event) {
        this.$store.commit('handleChangeSelect', event);
        const getTickets = this.getTickets()

        this.$store.commit('handleSelect', getTickets);
        this.$store.commit('multiForm', this.$store.state.tickets);
    },
  },

  provide() {
    return {
      getTickets: this.getTickets,
      handleSelect: this.handleSelect,
    };
  },
})
export default class App extends Vue {
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&family=Piazzolla:wght@300;400;700&family=Roboto:wght@300;400;700&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  box-sizing: border-box;
  font-family:'Roboto';
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
