import { ref, Ref, computed } from 'vue'

export function useCollapse() {
  const collapse: Ref<boolean> = ref(false)
  const setCollapse = () => {
    collapse.value = !collapse.value
  }
  const getCollapse = computed(() => {
    return collapse.value
  })
  return { collapse, setCollapse, getCollapse }
}
