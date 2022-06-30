<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props:['tickets'],
})
export default class TektonAirlines extends Vue {
}
</script>

<style>

</style>