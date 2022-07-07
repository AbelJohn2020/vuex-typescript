<template>
    <form @submit.prevent="handleSubmit">
        <div v-if="$store.state.continue === 'review'">
            <review-forms></review-forms>
        </div>
        <div v-else>
            <the-forms></the-forms>
        </div>
    </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  methods: {
    handleSubmit() {
      this.$store.commit('handleSubmit');

      if(this.$store.state.continue === 'finish') {
        window.addEventListener('submit', () => this.$router.push('/finish'))
      }
    },
  },
})

export default class TheFormsAndReviews extends Vue {
}
</script>

<style>

</style>