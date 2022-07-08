<template>
    <div class="finish">
        <div id="form">
            <div class="finish-form">
                <h2>{{ language() ? 'The form was sent successfully' : 'El formulario fue enviado satisfactoriamente' }}</h2>
                <h2>{{ language() ? 'Thanks for travelling with us!' : 'Gracias por viajar con nostros!' }}</h2>
            </div>
            <the-button type-button="button" :name="language() ? 'accept' : 'aceptar'" @click="handleAccept"></the-button>
        </div>
    </div>
</template>

<script>
export default {
    inject: ['language'],
    methods: {
        handleAccept() {
            this.$store.commit('handleAccept');

            // Routing: regresar a la pagina de bienvenida
            window.addEventListener('click', () => this.$router.push('/'))
        },
    },
}
</script>

<style>
.finish {
    margin: 12% 0 0 0;
}
.finish-form {
  margin: 1rem 0 3.2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

h2 {
    padding: 0;
    margin: 1.2rem 0 0 0;
    font-size: 22px;
}

@media (max-width: 678px) {
    .finish {
        margin: 50% 0 0 0;
    }
    
}

@media (max-width: 424px) {
    .finish {
        margin:64% 0 0 0;
    }
    .finish-form h2 {
        font-size: 18px;
    }
}
</style>