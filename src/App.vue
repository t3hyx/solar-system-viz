<script setup lang="ts">
import { onMounted } from 'vue'
import { SolarSystemService } from './services/SolarSystemService'

let solarSystemService: SolarSystemService

function init() {
  const container = document.getElementById('solar-system')
  if (!container)
    return

  // Create solar system service
  solarSystemService = new SolarSystemService(container)

  // Start animation
  solarSystemService.startAnimation()
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
