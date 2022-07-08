<template>
  <div id="review">
    <div class="edit-box">
        <slot></slot>
    </div>
    <h2>{{ language() ? 'review' : 'revisión' }}</h2>
  </div>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';

    @Options({
        inject:['language'],
    })

    export default class ReviewTitle extends Vue {
    }
</script>

<style>

</style>