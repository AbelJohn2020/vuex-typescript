import { mount } from "@vue/test-utils";
import TheButton from '@/components/UI/TheButton.vue';

describe('Testing Button component', () => { 
    test('Should have a name', () => { 
        const wrapper = mount(TheButton, {
            props: {
                name: 'test button',
            }
        });

        expect(wrapper.html()).toContain('test button')
        expect(wrapper.html()).toMatchSnapshot();
    })

    test('Should have name and type', () => { 
        const wrapper = mount(TheButton, {
            props: {
                typeButton: '',
                name: 'test button',
            }
        });
    
        expect(wrapper.html()).toContain('test button');

        // si en caso no tiene un tipo entonces se quedara con el default.
        expect(wrapper.element.getAttribute('type')).toEqual('submit');
        expect(wrapper.html()).toMatchSnapshot();
     })

     test('Should have name, type and disabled', () => { 
        const wrapper = mount(TheButton, {
            props: {
                typeButton: '',
                isDisabled: true,
                name: 'test dissabled button',
            },
        });

        expect(wrapper.html()).toContain('test dissabled button');

        expect(wrapper.vm.typeButton).toBe('');
        expect(wrapper.element.getAttribute('type')).toBe('submit');

        expect(wrapper.vm.isDisabled).toEqual(true);
        expect(wrapper.html()).toMatchSnapshot();
      })
 })