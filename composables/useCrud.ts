export default function useCrud<T extends { id: string }>(items: T[]) {
  const route = useRoute()

  const search = ref(route.query.search || '') as Ref<string>
  const currentItem = ref<T>({} as T) as Ref<T>

  const createDialog = ref(false)
  const updateDialog = ref(false)
  const deleteDialog = ref(false)

  const isSubmitting = ref(false)

  // Cleanup route query when dialog is closed
  watch(updateDialog, (value, previousValue) => {
    if (!value && previousValue) {
      const query = { ...route.query }
      delete query.id
      navigateTo({ path: route.path, query })
    }
  })

  if (route.query.id)
    handleDialogOpen('update', route.query.id as string)

  async function handleCreate(currentItem: T, callback: () => void) {
    isSubmitting.value = true
    callback()
    createDialog.value = false
    currentItem = {} as T
    isSubmitting.value = false
  }

  async function handleUpdate(currentItem: T, callback: (id?: string) => void) {
    isSubmitting.value = true
    callback()
    updateDialog.value = false
    currentItem = {} as T
    isSubmitting.value = false
  }

  async function handleDelete(currentItem: T, callback: (id?: string) => void) {
    isSubmitting.value = true
    callback()
    deleteDialog.value = false
    currentItem = {} as T
    isSubmitting.value = false
  }

  async function handleDialogOpen(mode: 'create' | 'update' | 'delete', id?: string) {
    if (id) {
      const item = items.find(item => item.id === id)
      if (item)
        currentItem.value = { ...item }

      if (mode === 'update') {
        if (!route.query.id) {
          const route = useRoute()
          await navigateTo({
            path: route.path,
            query: { ...route.query, id },
          })
        }

        updateDialog.value = true
      }
      else {
        deleteDialog.value = true
      }
    }
    else {
      currentItem.value = {} as T
      createDialog.value = true
    }
  }

  return {
    search,
    currentItem,
    createDialog,
    updateDialog,
    deleteDialog,
    isSubmitting,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleDialogOpen,
  }
}
