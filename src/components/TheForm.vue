<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name</label>
      <input type="text" v-model="$store.state.name"/>
    </div>
    <div>
      <label for="lastname">Lastname</label>
      <input type="text" v-model="$store.state.lastname"/>
    </div>
    <div>
      <label for="nationality">Nationality</label>
      <input type="text" v-model="$store.state.nationality"/>
    </div>
    <div>
      <label for="identification">Document type</label>
      <select name="identification" id="identification" v-model="$store.state.identification">
        <option value="dni">DNI</option>
        <option value="ce">CE</option>
        <option value="passport">Passport</option>
      </select>
    </div>
    <div>
      <label for="document">ID</label>
      <input type="text" v-model="$store.state.document" maxlength="8"/>
    </div>
    <div>
      <button>submit</button>
    </div>
  </form>
</template>

<script >
export default {
    methods: {
        handleSubmit() {
            const onlyNumbers = /^[0-9]+$/
            const validationForDocument = onlyNumbers.test(this.$store.state.document)
            console.log(validationForDocument)
            console.log('Name: ', this.$store.state.name)
            console.log('Latname: ', this.$store.state.lastname)
            console.log('Nationality: ', this.$store.state.nationality)
            console.log('Identification: ', this.$store.state.identification)
            console.log('Document: ', this.$store.state.document)
            this.$store.state.name = '';
            this.$store.state.lastname = '';
            this.$store.state.nationality = '';
            this.$store.state.identification = '';
            this.$store.state.document = '';
        }
    }
}
</script>

<style>

</style>