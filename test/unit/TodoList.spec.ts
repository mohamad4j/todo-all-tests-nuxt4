import { mount } from '@vue/test-utils'
import TodoList from '@/components/todo-list.vue'
import TodoItem from '@/components/todo-item.vue'

describe('TodoList.vue', () => {
    const list = [
        { id: 1, title: 'A', text: 'a', done: false },
        { id: 2, title: 'B', text: 'b', done: true },
    ]

    it('renders items correctly', () => {
        const wrapper = mount(TodoList, { props: { list },
            global: { components: { TodoItem } },
        })
        const items = wrapper.findAllComponents(TodoItem)
        expect(items.length).toBe(2)
    })

    it('emits updateItem when child emits', async () => {
        const wrapper = mount(TodoList, { props: { list },
            global: { components: { TodoItem } },
        })
        const item = wrapper.findComponent(TodoItem)
       await item.vm.$emit('update-item', { id: 1, done: true })
       expect(wrapper.emitted('updateItem')).toBeTruthy()
    })
})
