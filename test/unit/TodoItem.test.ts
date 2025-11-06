import { mount } from '@vue/test-utils'
import TodoItem from '@/components/todo-item.vue'

const task = { id: 1, title: 'Test', text: 'Task text', done: false }

describe('TodoItem.vue', () => {
    it('emits updateItem on checkbox change', async () => {
        const wrapper = mount(TodoItem, { props: { task } })
        await wrapper.get('input[type="checkbox"]').setValue(true)
        expect(wrapper.emitted('updateItem')?.[0][0]).toEqual({ id: 1, done: true })
    })

    it('emits removeItem on remove click', async () => {
        const wrapper = mount(TodoItem, { props: { task } })
        await wrapper.get('.remove').trigger('click')
        expect(wrapper.emitted('removeItem')?.[0][0]).toEqual({ id: 1 })
    })

    it('adds "card--done" class when done=true', () => {
        const wrapper = mount(TodoItem, { props: { task: { ...task, done: true } } })
        expect(wrapper.classes()).toContain('card--done')
    })
})
