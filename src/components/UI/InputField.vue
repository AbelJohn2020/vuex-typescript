<template>
  <div class="form-control" :class="{invalid: validation}">
    <label :for="forLabel" id="for-label">
      {{ forLabel }}
      <slot name="valid"></slot>
    </label>
    <slot></slot>
    <p v-if="validation">invalid field</p>
  </div>
</template>

<script>
export default {
    props: [
        'forLabel',
        'validation',
    ]
}
</script>

<style>
.form-control {
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#for-label {
  display: flex;
}

label {
    text-transform: capitalize;
}

label, p {
  box-sizing: border-box;
  font-weight: bold;
  text-align: start;
}

p {
    text-transform: capitalize;
    padding: 0;
    margin: 0.4rem 0 0 0;
}

.form-control.invalid label,
.form-control.invalid p {
  color: red;
}
</style>