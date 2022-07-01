<template>
    <div class="finish">
        <div id="form">
            <div class="finish-form">
                <h2>The form was sent successfully</h2>
            </div>
            <the-button type-button="button" name="accept" @click="handleAccept"></the-button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        handleAccept() {
            this.$store.commit('handleAccept')
        },
    }
}
</script>

<style>
.finish {
    margin: 16% 0 0 0;
}
.finish-form {
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
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