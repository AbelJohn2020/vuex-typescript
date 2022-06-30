<template>
    <form @submit.prevent="handleSubmit">
        <div v-if="$store.state.continue === 'review'">
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
        </div>
        <div v-else>
            <h3 id="more-tickets">If you want more tickets: </h3>
            <select-your-ticket :handleSelect="handleSelect" :isWelcome="false"></select-your-ticket>
            <ul>
                <li v-for="ticket in getTickets()" :key="ticket">
                <multi-form :user="$store.state.users" :id="parseInt(ticket)"></multi-form>
                </li>
            </ul>
            <div>
                <the-button :is-disabled="enableSubmit" type-button="button" name="next" @click="handleNext"></the-button>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props:['getTickets', 'handleSelect'],
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
    handleSubmit() {
      this.$store.commit('handleSubmit')
    },
  }
})
export default class ShowTheForm extends Vue {
}
</script>

<style>
    #more-tickets {
        box-sizing: border-box;
        text-align: center;
    }
</style>