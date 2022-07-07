import { mount } from '@vue/test-utils';
import InputField from '../../src/components/UI/InputField.vue';

describe('Input field', () => { 
    const wrapper = mount(InputField, {
        slots: {
            default: `
                <input placeholder="Name" id="name" type="text" v-model="valueName"/>
            `,
        },
        props: {
            forLabel: 'name',
            validation: false
        },
        data() {
            return {
                valueName: '',
            };
        },
    });

    const inputValue = wrapper.find('input[type="text"]');


    test('The default Slot in InputField will be Abel Antonio', async () => { 

        await inputValue.setValue('Abel Antonio');

        expect((inputValue.element as HTMLInputElement).value).toBe('Abel Antonio');
    });
 }) 