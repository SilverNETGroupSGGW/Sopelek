<script setup lang="ts">
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const { scene, camera, renderer } = useTres()
const boxRef = shallowRef()

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta / 5
    boxRef.value.rotation.z += delta / 5
  }
})

onMounted(() => {
  const controls = new OrbitControls(camera.value!, renderer.value.domElement)
  controls.enableDamping = true // Optional: smooth the camera movements
  controls.dampingFactor = 0.05 // Optional: control the damping factor
  controls.update()

  // Update controls on every frame
  onBeforeRender(() => {
    controls.update()
  })
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[4, 4, 6]"
    :look-at="[1, 1, 1]"
  />

  <TresMesh ref="boxRef">
    <TresDodecahedronGeometry :args="[10]" />
    <TresMeshBasicMaterial color="white" :wireframe="true" />
  </TresMesh>

  <TresAmbientLight :intensity="1" />
</template>
