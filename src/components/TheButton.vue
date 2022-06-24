<template>
  <button :type="typeButton" :disabled="isDisabled">{{ name }}</button>
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
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  text-transform: capitalize;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}

button:disabled {
    border-color: #AAAAAA;
    color: #AAAAAA;
    background-color: white;
    cursor: default;
}
</style>