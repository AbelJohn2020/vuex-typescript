import store from '@/store';
import { mount } from '@vue/test-utils';
import InputField from '../../src/components/UI/InputField.vue';

describe('Input field Name', () => { 
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
    const regex = store.state.regex;


    test('The default Slot in InputField will be Abel Antonio', async () => { 

        await inputValue.setValue('Abel Antonio');

        expect((inputValue.element as HTMLInputElement).value).toBe('Abel Antonio');
    });

    test('Should return Invalid Field', async () => { 

        await inputValue.setValue('Abel Antonio11');

        const isNotValid = mount(InputField, {
            ...wrapper, 
            slots:{ default: '<input placeholder="Name" id="name" type="text" v-model="valueName"/>' },
            props: {...wrapper.props(), validation: true}
        });

        const notValid = regex.test((inputValue.element as HTMLInputElement).value);

        expect(notValid).toBe(false);
        expect(isNotValid.find('p').element.textContent).toContain('invalid field');
        expect(isNotValid.html()).toMatchSnapshot();
     });

    test('should return Valid Field', async () => { 
        await inputValue.setValue('Abel John');
        const valid = regex.test((inputValue.element as HTMLInputElement).value);
        const test = mount(InputField, {
            ...wrapper, 
            slots:{ default: '<input placeholder="Name" id="name" type="text" v-model="valueName"/>', valid: '<p>valid field</p>' }, 
            props: {...wrapper.props()}
        });

        expect(valid).toBe(true);
        expect(test.find('p').element.textContent).toContain('valid fiel');
        expect(test.html()).toMatchSnapshot();
    });
 });


describe('Input Field Nationality', () => { 
    const wrapper = mount(InputField, {
        slots: {
            default: `
                <input placeholder="Name" id="name" type="text" v-model="valueNationality"/>
            `,
        },
        props: {
            forLabel: 'nationality',
            validation: false
        },
        data() {
            return {
                valueNationality: '',
            };
        },
    });

    const inputValue = wrapper.find('input[type="text"]');
    const regex = store.state.regNationality;


    test('The default Slot in InputField will be Peruano', async () => { 

        await inputValue.setValue('Peruano');
        expect((inputValue.element as HTMLInputElement).value).toBe('Peruano');
    });

    test('Should return Invalid Field', async () => { 

        await inputValue.setValue("Peruano'");

        const isNotValid = mount(InputField, {
            ...wrapper, 
            slots:{ default: '<input placeholder="Name" id="name" type="text" v-model="valueNationality"/>' },
            props: {...wrapper.props(), validation: true}
        });

        const notValid = regex.test((inputValue.element as HTMLInputElement).value);

        expect(notValid).toBe(false);
        expect(isNotValid.find('p').element.textContent).toContain('invalid field');
        expect(isNotValid.html()).toMatchSnapshot();
     });

    test('should return Valid Field', async () => { 
        await inputValue.setValue('peruano');
        const valid = regex.test((inputValue.element as HTMLInputElement).value);
        const test = mount(InputField, {
            ...wrapper, 
            slots:{ default: '<input placeholder="Name" id="name" type="text" v-model="valueNationality"/>', valid: '<p>valid field</p>' }, 
            props: {...wrapper.props()}
        });

        expect(valid).toBe(true);
        expect(test.find('p').element.textContent).toContain('valid fiel');
        expect(test.html()).toMatchSnapshot();
    });
  })

  describe('Input Field Identification', () => { 
    const wrapper = mount(InputField, {
        slots: {
            default: `
                <input placeholder="Name" id="name" type="text" v-model="valueIdentification"/>
            `,
        },
        props: {
            forLabel: 'ID',
            validation: false
        },
        data() {
            return {
                valueIdentification: '',
            };
        },
    });

    const inputValue = wrapper.find('input[type="text"]');
    const regex = store.state.regNumbers;


    test('The default Slot in InputField will be Peruano', async () => { 

        await inputValue.setValue('123456789');
        expect((inputValue.element as HTMLInputElement).value).toBe('123456789');
    });

    test('Should return Invalid Field', async () => { 

        await inputValue.setValue("12345678d");

        const isNotValid = mount(InputField, {
            ...wrapper, 
            slots:{ default: '<input placeholder="Name" id="name" type="text" v-model="valueIdentification"/>' },
            props: {...wrapper.props(), validation: true}
        });

        const notValid = regex.test((inputValue.element as HTMLInputElement).value);

        expect(notValid).toBe(false);
        expect(isNotValid.find('p').element.textContent).toContain('invalid field');
        expect(isNotValid.html()).toMatchSnapshot();
     });

    test('should return Valid Field', async () => { 
        await inputValue.setValue('123456789');
        const valid = regex.test((inputValue.element as HTMLInputElement).value);
        const test = mount(InputField, {
            ...wrapper, 
            slots:{ default: '<input placeholder="Name" id="name" type="text" v-model="valueIdentification"/>', valid: '<p>valid field</p>' }, 
            props: {...wrapper.props()}
        });

        expect(valid).toBe(true);
        expect(test.find('p').element.textContent).toContain('valid fiel');
        expect(test.html()).toMatchSnapshot();
    });
  })