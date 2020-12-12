<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { isExternal as _isExternal } from '@/utils/validate'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const isExternal = computed(() => _isExternal(props.to))
    function linkProps(to) {
      if (isExternal.value) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
    return {
      isExternal,
      type: computed(() => isExternal.value ? 'a' : 'router-link'),
      linkProps
    }
  }
})
</script>
