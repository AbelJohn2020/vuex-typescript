<template>
  <div id="form">
        <h1>Welcome to Tekton Airlines</h1>
        <h3>Please take your tickets.</h3>
        <h3>Each user can buy up to 4 tickets.</h3>
        <h3>Have fun travelling!</h3>
        <select-your-ticket :handleSelect="handleSelect" :isWelcome="true"></select-your-ticket>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  inject: ['handleSelect']
})
export default class TheWelcome extends Vue {
}
</script>

<style>

</style>