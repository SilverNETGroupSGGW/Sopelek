export default function useCrud<T extends { id: string }>(items: T[]) {
  const search = ref('')
  const currentItem = ref<T>({} as T) as Ref<T>

  const createDialog = ref(false)
  const updateDialog = ref(false)
  const deleteDialog = ref(false)

  async function handleCreate(currentItem: T, callback: () => void) {
    callback()
    createDialog.value = false
    currentItem = {} as T
  }

  async function handleUpdate(currentItem: T, callback: (id?: string) => void) {
    callback()
    updateDialog.value = false
    currentItem = {} as T
  }

  async function handleDelete(currentItem: T, callback: (id?: string) => void) {
    callback()
    deleteDialog.value = false
    currentItem = {} as T
  }

  function handleDialogOpen(mode: 'create' | 'update' | 'delete', id?: string) {
    if (id) {
      const item = items.find(item => item.id === id)
      if (item)
        currentItem.value = { ...item }

      if (mode === 'update')
        updateDialog.value = true
      else
        deleteDialog.value = true
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
    handleCreate,
    handleUpdate,
    handleDelete,
    handleDialogOpen,
  }
}
