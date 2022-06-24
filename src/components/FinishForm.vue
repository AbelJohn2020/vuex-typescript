<template>
    <div class="form">
        <div class="finish-form">
            <h2>The form was sent successfully</h2>
        </div>
        <the-button type-button="button" name="accept" @click="handleAccept"></the-button>
    </div>
</template>

<script>
export default {
    methods: {
        handleAccept() {
            this.$store.state.continue = "form"
        },
    }
}
</script>

<style>
.form {
    position: fixed;
    margin: 2rem auto;
    max-width: 30rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1.2rem 4rem 3.2rem 4rem;
    background-color: #ffffff;
    top: 24%;
    left: 36%;
}
.finish-form {
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>