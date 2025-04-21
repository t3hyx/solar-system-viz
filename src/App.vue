<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { onMounted } from 'vue'

function init() {
  function createStars() {
    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.1,
      sizeAttenuation: true,
    })

    const starsVertices = []
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() - 0.5) * 2000
      starsVertices.push(x, y, z)
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
    const stars = new THREE.Points(starsGeometry, starsMaterial)

    return stars
  }

  // Create scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  // Add stars to the scene programmatically
  scene.add(createStars())

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  )
  camera.position.z = 50

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // Add renderer to DOM
  const container = document.getElementById('solar-system')
  if (!container)
    return
  container.appendChild(renderer.domElement)

  // Add orbit controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)
    controls.update() // Update controls
    renderer.render(scene, camera)
  }

  // Start animation
  animate()

  // Return scene for later use
  return { scene }
}

onMounted(() => {
  init()
})
</script>

<template>
  <div id="solar-system" />
</template>

<style>
#solar-system {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
