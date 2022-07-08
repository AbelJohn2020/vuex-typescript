<template>
    <div id="toggle">        
        <p v-if="$store.state.language === 'english'" class="p-english">en</p>
        <div :class="$store.state.language === 'english' ? 'toggle-button-english' : 'toggle-button-español'">
            <label class="switch">
                <input type="checkbox" :value="$store.state.language" @input="handleToggle" :checked="handleChecked">
                <span class="slider round"></span>
            </label>
        </div>
        <p v-if="$store.state.language === 'español'" class="p-español">es</p>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    computed: {
        handleChecked() {
            return this.$store.getters.handleChecked;
        }
    },
    methods: {
        handleToggle(event: Event) {
            this.$store.commit('handleToggle', event)
        },
    }
})

export default class ToggleButton extends Vue {
}

</script>

<style scoped>
    #toggle {
        box-sizing: border-box;
        display: flex;
        padding: 0 8%;
        justify-content: flex-end;
        align-items: center;
    }

    #toggle p {
        text-transform: uppercase;
    }

    .p-english {
        margin: 0 8px 0 0;
        padding: 0;
    }

    .p-español {
        margin: 0 0 0 8px;
        padding: 0;
    }

    .checked {
        visibility: hidden;
    }

    .toggle-button-english {
        margin: 0 27px 0 0;
        padding: 0;
    }

    .toggle-button-español {
        margin: 0;
        padding: 0;
    }

    /* The switch - the box around the slider */
    .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
    opacity: 0;
    width: 0;
    height: 0;
    }

    /* The slider */
    .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #0076bb;
    -webkit-transition: .4s;
    transition: .4s;
    }

    .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    }

    input:checked + .slider {
    background-color: #A51C30;
    }

    input:focus + .slider {
    box-shadow: 0 0 1px #A51C30;
    }

    input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
    border-radius: 34px;
    }

    .slider.round:before {
    border-radius: 50%;
    }
</style>