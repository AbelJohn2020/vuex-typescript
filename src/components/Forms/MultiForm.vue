<template>
    <div :key="id" id="form">
        <input-field for-label="name" :validation="invalidField(user[idx].fieldName.validName)">
            <input placeholder="Name" type="text" :value="user[idx].fieldName.name" @input="handleInName" @blur="onBlurName"/>
            <template #valid>
                <p v-if="user[idx].fieldName.validName === 'valid'" class="valid-field">valid</p>
            </template>
        </input-field>
        
        <input-field for-label="lastname" :validation="invalidField(user[idx].fieldLastname.validLastname)">
            <input placeholder="Lastname" type="text" :value="user[idx].fieldLastname.lastname" @input="handleInLastname" @blur="onBlurLastname"/>
            <template #valid>
                <p v-if="user[idx].fieldLastname.validLastname === 'valid'" class="valid-field">valid</p>
            </template>
        </input-field>

        <input-field for-label="nationality" :validation="invalidField(user[idx].fieldNationality.validNationality)">
            <input placeholder="Nationality" type="text" :value="user[idx].fieldNationality.nationality" @input="handleInNationality" @blur="onBlurNationality"/>
            <template #valid>
                <p v-if="user[idx].fieldNationality.validNationality === 'valid'" class="valid-field">valid</p>
            </template>
        </input-field>

        <input-field for-label="document type" :validation="invalidField(user[idx].fieldIdentification.validIdentification)">
            <select name="identification" id="identification" :value="user[idx].fieldIdentification.identification" @input="handleInIdentification" @blur="onBlurIdentification">
                <option value="dni">DNI</option>
                <option value="ce">CE</option>
                <option value="passport">Passport</option>
            </select>
            <template #valid>
                <p v-if="user[idx].fieldIdentification.validIdentification === 'valid'" class="valid-field">valid</p>
            </template>
        </input-field>
        
        <div class="form-control" :class="{invalid: invalidID}">
            <label for="document" id="for-label">
                ID
                <p v-if="user[idx].fieldDocument.validDocument === 'valid'" class="valid-field">valid</p>
            </label>
            <input 
                :placeholder="placeholderValue" 
                type="text" :maxlength="maxLengthByOption" 
                :value="user[idx].fieldDocument.document" 
                @input="handleInDocument" 
                :disabled="documentDisabled"
            />
            <p v-if="$store.state.letters">Invalid characters</p>
            <p v-if="!$store.state.letters && invalidId('dni')">8 characters to ID</p>
            <p v-else-if="!$store.state.letters && invalidId('passport')">9 characters to Passport</p>
            <p v-else-if="!$store.state.letters && invalidId('ce')">9 characters to CE</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: ['user', 'id'],
    data() {
        return {
            idx: this.id - 1,
        };
    },
    computed: {
        maxLengthByOption() {
            return this.user[this.idx].fieldIdentification.identification === 'dni' ? '8' : '9';
        },
        documentDisabled() {
            return this.user[this.idx].fieldIdentification.identification === '' ? true : false;
        },
        placeholderValue() { 
            const identification = this.user[this.idx].fieldIdentification.identification;
            
            return (identification === "dni") ? 'DNI' : (identification === "ce" ? 'CE' : (identification === "passport" ? 'Passport' : '')) 
        },
        invalidID() { 
            return this.invalidId('dni') || this.invalidId('passport') || this.invalidId('ce') 
        },
    },
    methods: {
        invalidField(validation: string) {
            return validation === 'invalid';
        },
        invalidId(option: string) {
            return this.invalidField(this.user[this.idx].fieldDocument.validDocument) && this.user[this.idx].fieldIdentification.identification === option;
        },
        handleInName(event: Event) {
            this.user[this.idx] = {...this.user[this.idx], fieldName: {...this.user[this.idx].fieldName, name: (event.target as HTMLInputElement).value}};
        },
        onBlurName() {
            this.$store.commit('onBlurName', this.idx);

            this.$store.commit('validMultipleForm', this.idx);
        },
        handleInLastname(event: Event) {
            this.user[this.idx] = {...this.user[this.idx], fieldLastname: {...this.user[this.idx].fieldLastname, lastname: (event.target as HTMLInputElement).value}};
        },
        onBlurLastname() {
            this.$store.commit('onBlurLastname', this.idx);

            this.$store.commit('validMultipleForm', this.idx);
        },
        handleInNationality(event: Event) {
            this.user[this.idx] = { ...this.user[this.idx], fieldNationality: {...this.user[this.idx].fieldNationality, nationality: (event.target as HTMLInputElement).value}};
        },
        onBlurNationality() {
            this.$store.commit('onBlurNationality', this.idx);

            this.$store.commit('validMultipleForm', this.idx);
        },
        handleInIdentification(event: Event) {
            const idx = this.idx;
            this.$store.commit('typeIDField', {event, idx});
        },
        onBlurIdentification() {
            this.$store.commit('onBlurIdentification', this.idx);

            this.$store.commit('validMultipleForm', this.idx);
        },
        handleInDocument(event: Event) {
            const idx = this.idx;
            this.$store.commit('documentField', {event, idx});
            this.$store.commit('documentError', idx);

            this.$store.commit('validMultipleForm', idx);
        },
        onBlurDocument() {
            this.$store.commit('onBlurIdentification', this.idx);
        },
    }
})

export default class MultiForm extends Vue {}

</script>

<style scoped>
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
}

.valid-field {
    margin: 0 0 0 8px;
    padding: 0;
    color: green;
    box-sizing: border-box;
    text-transform: lowercase;
}
</style>