<template>
  <form @submit.prevent="handleSubmit">
    <div v-if="$store.state.continue === 'review'">
        <the-registration ></the-registration>
        <div>
            <the-button type-button="button" name="back" @click="handleBack"></the-button>
            <the-button name="submit"></the-button>
        </div>
    </div>
    <div v-else>
        <div class="form-control" :class="{invalid: invalidField($store.state.validName)}">
            <label for="name">Name</label>
            <input type="text" v-model="$store.state.name" @blur="validateNameField"/>
            <p v-if="invalidField($store.state.validName)">invalid field</p>
        </div>
        
        <div class="form-control" :class="{invalid: invalidField($store.state.validLastname)}">
            <label for="lastname">Lastname</label>
            <input type="text" v-model="$store.state.lastname" @blur="validateLastnameField"/>
            <p v-if="invalidField($store.state.validLastname)">invalid field</p>
        </div>
        
        <div class="form-control" :class="{invalid: invalidField($store.state.validNationality)}">
            <label for="nationality">Nationality</label>
            <input type="text" v-model="$store.state.nationality" @blur="validateNationalityField"/>
            <p v-if="invalidField($store.state.validNationality)">invalid field</p>
        </div>
        
        <div class="form-control" :class="{invalid: invalidIdentification}">
            <label for="identification">Document type</label>
            <select name="identification" id="identification" v-model="$store.state.identification" @blur="validIdentificationField">
                <option value="dni">DNI</option>
                <option value="ce">CE</option>
                <option value="passport">Passport</option>
            </select>
            <p v-if="invalidField($store.state.validIdentification)">invalid field</p>
        </div>
        
        <div class="form-control" :class="{invalid: invalidID}">
            <label for="document">ID</label>
            <input type="text" :value="$store.state.document" :maxlength="maxLengthByOption" :disabled="documentDisabled" @input="validateDocumentField"/>
            <p v-if="invalidId('dni')">Invalid field, 8 characters to ID</p>
            <p v-else-if="invalidId('passport')">Invalid field, 9 characters to Passport</p>
            <p v-else-if="invalidId('ce')">Invalid field, 9 characters to Passport or CE</p>
        </div>

        <div>
        <the-button :is-disabled="enableSubmit" type-button="button" name="next" @click="handleNext"></the-button>
        <!-- <button :disabled="enableSubmit" type="button">submit</button> -->
        </div>
    </div>
  </form>
</template>

<script >
export default {
    data() {
        return {
            regex: /^[a-zñA-ZÑáéíóúÁÉÍÓÚ'.]*$/,
            rgx: /^[a-zñA-ZÑ]*$/,
        };
    },
    computed: {
        maxLengthByOption() {
            return this.$store.state.identification === 'dni' ? '8' : '9';
        },
        documentDisabled() {
            return this.$store.state.identification === '' ? true : false;
        },
        enableSubmit() {
            return this.validateForm() === 'valid' ?  false : true;
        },
        invalidIdentification() {return this.$store.state.validIdentification === 'invalid'},
        invalidID() { return this.invalidId('dni') || this.invalidId('passport') || this.invalidId('ce') },
    },
    methods: {
        handleNext() {
            this.$store.state.continue = 'review';
        },
        handleBack() {
            this.$store.state.continue = 'form';
        },
        invalidField(validation) {
            return validation === 'invalid';
        },

        invalidId(option) {
            return this.invalidField(this.$store.state.validDocument) && this.$store.state.identification === option;
        },

        handleSubmit() {
            console.log('Name: ', this.$store.state.name)
            console.log('Latname: ', this.$store.state.lastname)
            console.log('Nationality: ', this.$store.state.nationality)
            console.log('Identification: ', this.$store.state.identification)
            console.log('Document: ', this.$store.state.document)
            console.log(this.validateForm())

            this.$store.state.name = '';
            this.$store.state.lastname = '';
            this.$store.state.nationality = '';
            this.$store.state.identification = '';
            this.$store.state.document = '';
            this.$store.state.validName = 'pending';
            this.$store.state.validLastname = 'pending';
            this.$store.state.validNationality = 'pending';
            this.$store.state.validIdentification = 'pending';
            this.$store.state.validDocument = 'pending';
            this.$store.state.continue = 'finish';
        },

        validateNameField(){
            const name = this.$store.state.name;
            const validName = this.regex.test(name);
            
            if(name.length > 1 && validName) {
                this.$store.state.validName = 'valid';
            } else {
                this.$store.state.validName = 'invalid';
            }
            console.log(this.$store.state.validName)
        },
        validateLastnameField(){
            const lastname = this.$store.state.lastname;
            const validLastname = this.regex.test(lastname);

            if(lastname.length >= 3 && validLastname) {
                this.$store.state.validLastname = 'valid';
            } else {
                this.$store.state.validLastname = 'invalid';
            }
        },
        validateNationalityField() {
            const nationality = this.$store.state.nationality;
            const validNationality = this.rgx.test(nationality);
            
            if(nationality.length > 1 && validNationality) {
                this.$store.state.validNationality = 'valid';
            } else {
                this.$store.state.validNationality = 'invalid';
            }
        },
        validIdentificationField() {
            const identification = this.$store.state.identification
            
            if(identification === '') {
                this.$store.state.validIdentification = 'invalid';
            } else {
                this.$store.state.validIdentification = 'valid';
                this.$store.state.document = '';
            }
        },
        validateDocumentField(event) {
            this.$store.state.document = event.target.value;
            const onlyNumbers = /^[0-9]+$/
            const validDocument = onlyNumbers.test(this.$store.state.document);
            const id = this.$store.state.identification;
            const len = this.$store.state.document.length;

            if( ((id === 'dni' && len === 8) || ((id === 'passport' || 'ce') && len === 9)) && validDocument) {
                this.$store.state.validDocument = 'valid';
            } else {
                this.$store.state.validDocument = 'invalid';
            }
        },

        validateForm() {
            const validNameField = this.$store.state.validName;
            const validLastnameField = this.$store.state.validLastname;
            const validNationalityField = this.$store.state.validNationality;
            const validIdentificationField = this.$store.state.validIdentification;
            const validDocumentField = this.$store.state.validDocument;
            if(
                validNameField === 'valid' && 
                validLastnameField === 'valid' && 
                validNationalityField === 'valid' &&
                validIdentificationField === 'valid' &&
                validDocumentField === 'valid'
            ) {
                return 'valid'
            } else {
                return 'invalid'
            }
        },
    }
}
</script>

<style scoped>
form {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}

.form-control {
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

input,
select,
label,
p {
    box-sizing: border-box;
}

label, p {
  font-weight: bold;
  text-align: start;
  background-color: green;
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

.form-control.invalid input {
  border-color: red;
}

input,
select {
  display: block;
  font: inherit;
  margin-top: 0.5rem;
  padding: 8px;
}
</style>