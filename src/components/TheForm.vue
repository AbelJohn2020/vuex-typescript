<template>
  <form @submit.prevent="handleSubmit">
    <div v-if="$store.state.continue === 'review'">
        <div class="review">
            <div class="edit-box">
                <the-button type-button="button" name="<" @click="handleBack" class="edit-btn"></the-button>
            </div>
            <h2>review</h2>
        </div>
        <the-registration ></the-registration>
        <div class="submit-box">
            <the-button :is-disabled="enableSubmit" name="submit"></the-button>
        </div>
    </div>
    <div v-else>
        <input-field for-label="name" :validation="invalidField($store.state.validName)">
            <input placeholder="Name" type="text" v-model="$store.state.name" @blur="validateNameField"/>
        </input-field>
        
        <input-field for-label="lastname" :validation="invalidField($store.state.validLastname)">
            <input placeholder="Lastname" type="text" v-model="$store.state.lastname" @blur="validateLastnameField"/>
        </input-field>

        <input-field for-label="nationality" :validation="invalidField($store.state.validNationality)">
            <input placeholder="Nationality" type="text" v-model="$store.state.nationality" @blur="validateNationalityField"/>
        </input-field>
        
        <div class="form-control" :class="{invalid: invalidIdentification}">
            <label for="identification">document type</label>
            <select name="identification" id="identification" :value="$store.state.identification" @input="validIdentificationField" @blur="identificationBlur">
                <option value="dni">DNI</option>
                <option value="ce">CE</option>
                <option value="passport">Passport</option>
            </select>
            <p v-if="invalidField($store.state.validIdentification)">invalid field</p>
        </div>
        
        <div class="form-control" :class="{invalid: invalidID}">
            <label for="document">ID</label>
            <input :placeholder="placeHolder" type="text" :value="$store.state.document" :maxlength="maxLengthByOption" :disabled="documentDisabled" @input="validateDocumentField"/>
            <p v-if="invalidId('dni')">Invalid field, 8 characters to ID</p>
            <p v-else-if="invalidId('passport')">Invalid field, 9 characters to Passport</p>
            <p v-else-if="invalidId('ce')">Invalid field, 9 characters to Passport or CE</p>
        </div>

        <div>
        <the-button :is-disabled="enableSubmit" type-button="button" name="next" @click="handleNext"></the-button>
        </div>
    </div>
  </form>
</template>

<script >
export default {
    data() {
        return {
            regex: /^[a-zñ A-ZÑáéíóúÁÉÍÓÚ'.]*$/,
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
        invalidIdentification() {
            return this.$store.state.validIdentification === 'invalid'
        },
        invalidID() { 
            return this.invalidId('dni') || this.invalidId('passport') || this.invalidId('ce') 
        },
        placeHolder() { 
            return this.$store.state.identification === "dni" 
                    ? 'DNI' 
                    : (
                        this.$store.state.identification === "ce" 
                            ? 'CE' 
                            : (
                                this.$store.state.identification === "passport"
                                    ? 'Passport'
                                    : ''
                            )
                    ) 
        },
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
            console.log(name)
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
        identificationBlur() {
            this.$store.state.identification === '' ? this.$store.state.validIdentification = 'invalid' : this.$store.state.validIdentification = 'valid';
        },
        validIdentificationField(event) {
            this.$store.state.identification = event.target.value
            const identification = this.$store.state.identification
            
            if(identification === '') {
                this.$store.state.validIdentification = 'invalid';
            } else {
                this.$store.state.validIdentification = 'valid';
                this.$store.state.document = '';
                this.$store.state.validDocument = 'pending';
            }
        },
        validateDocumentField(event) {
            this.$store.state.document = event.target.value;
            const onlyNumbers = /^[0-9]+$/
            const validDocument = onlyNumbers.test(this.$store.state.document);
            const id = this.$store.state.identification;
            const len = this.$store.state.document.length;

            if( ((id === 'dni' && len === 8) || ((id === 'passport' || 'ce') && len === 9)) && validDocument) {
                this.$store.state.validDocument = 'valid'
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

.form-control.invalid input,
.form-control.invalid select {
  border-color: red;
    box-sizing: border-box;

}

input,
select {
  display: block;
  font: inherit;
  margin-top: 0.5rem;
  padding: 8px;
}

.review,
.submit-box {
    box-sizing: border-box;
}

.submit-box {
    display: flex;
    justify-content: center;
    margin: 0 0 2.4rem 0;
}

.review {
    display: grid;
    grid-template-columns: 40% 60%;
}

.review h2 {
    margin: 0;
    text-transform: uppercase;
    font-weight: bolder;
    text-align: start;
}

.edit-btn {
    padding: 0.2rem 0.8rem;
    border-radius: 100%;
    font-size: 22px;
}
.edit-box {
    width: 100%;
    display: flex;
    justify-content: start;
}
</style>