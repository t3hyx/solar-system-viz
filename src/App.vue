<script setup lang="ts">
import type { ISolarSystemConfig } from './types/solar-system.types'
import { onMounted } from 'vue'
import { solarSystemConfig } from './configs/solar-system.config'
import { SolarSystemService } from './services/SolarSystemService'

let solarSystemService: SolarSystemService
const config: ISolarSystemConfig = solarSystemConfig

function init() {
  const container = document.getElementById('solar-system')
  if (!container)
    return

  // Create solar system service
  solarSystemService = new SolarSystemService(container, config)

  // Create solar system
  solarSystemService.createSolarSystem()

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
