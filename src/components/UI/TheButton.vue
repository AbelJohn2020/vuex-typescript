<template>
  <button :type="typeButton" :disabled="isDisabled" :class="this.$store.state.language === 'english' ? 'english' : 'español'">{{ name }}</button>
</template>

<script>
export default {
    props: {
        typeButton: {
            type: String,
        },
        isDisabled: {
            type: Boolean,
        },
        name: {
            type: String,
            required: true,
        }
    }
}
</script>

<style>
button {
  font: inherit;
  font-weight: bold;
  cursor: pointer;
  padding: 0.44rem 1.2rem;
  border-radius: 8px;
  text-transform: capitalize;
  color: white;
}

button:disabled {
  color: white;
  cursor: default;
}

.english {
  border: 1px solid #0076bb;
  background-color: #0076bb;
}

.español {
  border: 1px solid #A51C30;
  background-color: #A51C30;
}

.english:hover,
.english:active {
  border-color: #002350;
  background-color: #002350;
}

.español:hover,
.español:active {
  border-color: #881C30;
  background-color: #881C30;
}

.english:disabled {
    border-color: rgba(0,149,246,.3);
    background-color: rgba(0,149,246,.3);
}

.español:disabled {
    border-color: rgba(149,32,42,.3);
    background-color: rgba(149,32,42,.3);
}

</style>