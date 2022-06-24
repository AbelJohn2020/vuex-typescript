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
        <input-field for-label="name" :validation="invalidField($store.state.user.fieldName.validName)">
            <input placeholder="Name" type="text" v-model="$store.state.user.fieldName.name" @blur="validateNameField"/>
        </input-field>
        
        <input-field for-label="lastname" :validation="invalidField($store.state.user.fieldLastname.validLastname)">
            <input placeholder="Lastname" type="text" v-model="$store.state.user.fieldLastname.lastname" @blur="validateLastnameField"/>
        </input-field>

        <input-field for-label="nationality" :validation="invalidField($store.state.user.fieldNationality.validNationality)">
            <input placeholder="Nationality" type="text" v-model="$store.state.user.fieldNationality.nationality" @blur="validateNationalityField"/>
        </input-field>
        
        <div class="form-control" :class="{invalid: invalidIdentification}">
            <label for="identification">document type</label>
            <select name="identification" id="identification" :value="$store.state.user.fieldIdentification.identification" @input="validIdentificationField" @blur="identificationBlur">
                <option value="dni">DNI</option>
                <option value="ce">CE</option>
                <option value="passport">Passport</option>
            </select>
            <p v-if="invalidField($store.state.user.fieldIdentification.validIdentification)">invalid field</p>
        </div>
        
        <div class="form-control" :class="{invalid: invalidID}">
            <label for="document">ID</label>
            <input :placeholder="placeHolder" type="text" :value="$store.state.user.fieldDocument.document" :maxlength="maxLengthByOption" :disabled="documentDisabled" @input="validateDocumentField"/>
            <p v-if="invalidId('dni')">Invalid field, 8 characters to ID</p>
            <p v-else-if="invalidId('passport')">Invalid field, 9 characters to Passport</p>
            <p v-else-if="invalidId('ce')">Invalid field, 9 characters to CE</p>
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
            return this.$store.state.user.fieldIdentification.identification === 'dni' ? '8' : '9';
        },
        documentDisabled() {
            return this.$store.state.user.fieldIdentification.identification === '' ? true : false;
        },
        enableSubmit() {
            return this.validateForm() === 'valid' ?  false : true;
        },
        invalidIdentification() {
            return this.$store.state.user.fieldIdentification.validIdentification === 'invalid'
        },
        invalidID() { 
            return this.invalidId('dni') || this.invalidId('passport') || this.invalidId('ce') 
        },
        placeHolder() { 
            return this.$store.state.user.fieldIdentification.identification === "dni" 
                    ? 'DNI' 
                    : (
                        this.$store.state.user.fieldIdentification.identification === "ce" 
                            ? 'CE' 
                            : (
                                this.$store.state.user.fieldIdentification.identification === "passport"
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
            return this.invalidField(this.$store.state.user.fieldDocument.validDocument) && this.$store.state.user.fieldIdentification.identification === option;
        },

        handleSubmit() {
            console.log(this.validateForm())

            this.$store.state.user.fieldName.name = '';
            this.$store.state.user.fieldLastname.lastname = '';
            this.$store.state.user.fieldNationality.nationality = '';
            this.$store.state.user.fieldIdentification.identification = '';
            this.$store.state.user.fieldDocument.document = '';
            this.$store.state.user.fieldName.validName = 'pending';
            this.$store.state.user.fieldLastname.validLastname = 'pending';
            this.$store.state.user.fieldNationality.validNationality = 'pending';
            this.$store.state.user.fieldIdentification.validIdentification = 'pending';
            this.$store.state.user.fieldDocument.validDocument = 'pending';
            this.$store.state.continue = 'finish';
        },

        validateNameField(){
            const name = this.$store.state.user.fieldName.name;
            const validName = this.regex.test(name);
            
            if(name.length > 1 && validName) {
                this.$store.state.user.fieldName.validName = 'valid';
            } else {
                this.$store.state.user.fieldName.validName = 'invalid';
            }
        },
        validateLastnameField(){
            const lastname = this.$store.state.user.fieldLastname.lastname;
            const validLastname = this.regex.test(lastname);

            if(lastname.length >= 3 && validLastname) {
                this.$store.state.user.fieldLastname.validLastname = 'valid';
            } else {
                this.$store.state.user.fieldLastname.validLastname = 'invalid';
            }
        },
        validateNationalityField() {
            const nationality = this.$store.state.user.fieldNationality.nationality;
            const validNationality = this.rgx.test(nationality);
            
            if(nationality.length > 1 && validNationality) {
                this.$store.state.user.fieldNationality.validNationality = 'valid';
            } else {
                this.$store.state.user.fieldNationality.validNationality = 'invalid';
            }
        },
        identificationBlur() {
            this.$store.state.user.fieldIdentification.identification === '' ? this.$store.state.user.fieldIdentification.validIdentification = 'invalid' : this.$store.state.user.fieldIdentification.validIdentification = 'valid';
        },
        validIdentificationField(event) {
            this.$store.state.user.fieldIdentification.identification = event.target.value
            const identification = this.$store.state.user.fieldIdentification.identification
            
            if(identification === '') {
                this.$store.state.user.fieldIdentification.validIdentification = 'invalid';
            } else {
                this.$store.state.user.fieldIdentification.validIdentification = 'valid';
                this.$store.state.user.fieldDocument.document = '';
                this.$store.state.user.fieldDocument.validDocument = 'pending';
            }
        },
        validateDocumentField(event) {
            this.$store.state.user.fieldDocument.document = event.target.value;
            const onlyNumbers = /^[0-9]+$/
            const validDocument = onlyNumbers.test(this.$store.state.user.fieldDocument.document);
            const id = this.$store.state.user.fieldIdentification.identification;
            const len = this.$store.state.user.fieldDocument.document.length;

            if( ((id === 'dni' && len === 8) || ((id === 'passport' || 'ce') && len === 9)) && validDocument) {
                this.$store.state.user.fieldDocument.validDocument = 'valid'
            } else {
                this.$store.state.user.fieldDocument.validDocument = 'invalid';
            }
        },

        validateForm() {
            const validNameField = this.$store.state.user.fieldName.validName;
            const validLastnameField = this.$store.state.user.fieldLastname.validLastname;
            const validNationalityField = this.$store.state.user.fieldNationality.validNationality;
            const validIdentificationField = this.$store.state.user.fieldIdentification.validIdentification;
            const validDocumentField = this.$store.state.user.fieldDocument.validDocument;
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