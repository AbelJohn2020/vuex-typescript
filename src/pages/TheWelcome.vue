<template>
  <div id="form">
        <h1>{{ language() ? 'Welcome to Tekton Airlines' : 'Bienvenidos a Tekton Airlines' }}</h1>
        <h3>{{ language() ? 'Please take your tickets.' : 'Por favor elije tus boletos.' }}</h3>
        <h3>{{ language() ? 'Each user can buy up to 4 tickets.' : 'Cada usuario puede comprar hasta 4 boletos' }}</h3>
        <h3>{{ language() ? 'Have fun travelling!' : '¡Que tengas un excelente viaje!' }}</h3>
        <select-your-ticket :handleSelect="handleSelect" :isWelcome="true"></select-your-ticket>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  inject: ['handleSelect', 'language']
})
export default class TheWelcome extends Vue {
}
</script>

<style>

</style>