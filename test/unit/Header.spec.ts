import { mount } from '@vue/test-utils'
import Header from '@/components/header.vue'

describe('Header.vue', () => {
    it('emits themeUpdated when switch toggles', async () => {
        const wrapper = mount(Header)
        const checkbox = wrapper.get('input[type="checkbox"]')
        await checkbox.setValue(true)
        expect(wrapper.emitted('themeUpdated')?.[0]).toEqual(['dark'])
        await checkbox.setValue(false)
        expect(wrapper.emitted('themeUpdated')?.[1]).toEqual(['light'])
    })

    it('renders app title', () => {
        const wrapper = mount(Header)
        expect(wrapper.text()).toContain('ToLLo')
    })
})
