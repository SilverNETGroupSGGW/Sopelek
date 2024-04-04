export default function useArray() {
  function mapArrayToLabelValue<T>(array: T[]) {
    return array.map((item, index) => {
      // Due to bug in radix-vue select component, we can't set value to 0
      return { label: item, value: index + 1 }
    })
  }

  return {
    mapArrayToLabelValue,
  }
}
