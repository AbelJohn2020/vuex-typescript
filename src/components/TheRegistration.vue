<template>
  <div class="form-control">
    <label for="name">Name</label>
    <h2>{{ $store.state.name }}</h2>
  </div>

  <div class="form-control">
    <label for="lastname">Latname</label>
    <h2>{{ $store.state.lastname }}</h2>
  </div>
    <label for="nationality">Nationality</label>
    <h2>{{ $store.state.nationality }}</h2>

  <div class="form-control">
    <label for="identification">Identification</label>
    <h2>{{ $store.state.identification }}</h2>
  </div>
  <div class="form-control">
    <label for="document">Document</label>
    <h2>{{ $store.state.document }}</h2>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>