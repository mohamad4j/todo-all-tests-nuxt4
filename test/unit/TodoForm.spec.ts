import { mount } from '@vue/test-utils'
import TodoForm from '@/components/todo-form.vue'

describe('TodoForm.vue', () => {
    it('emits addNew when form valid', async () => {
        const wrapper = mount(TodoForm, {
            props: { openDialog: true, loading: false }
        })

        await wrapper.get('input').setValue('New task')
        await wrapper.get('textarea').setValue('Some text')
        await wrapper.get('button[type="button"]').trigger('click')

        expect(wrapper.emitted('addNew')).toBeTruthy()
    })

    it('emits close on close button click', async () => {
        const wrapper = mount(TodoForm, {
            props: { openDialog: true, loading: false }
        })
        await wrapper.find('button.secondary').trigger('click')
        expect(wrapper.emitted('close')).toBeTruthy()
    })
})
