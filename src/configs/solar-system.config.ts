import type { ICelestialBody, ISolarSystemConfig } from '@/types/solar-system.types'
import { colorConfig } from '@/configs/color.config'
import * as THREE from 'three'

export const solarSystemConfig: ISolarSystemConfig = {
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: new THREE.Vector3(0, 0, 50),
  },
  background: {
    color: colorConfig.pureBlack,
  },
  lights: {
    sun: {
      color: colorConfig.pureWhite,
      intensity: 1.00,
      distance: 1000,
      decay: 2.00,
    },
    ambient: {
      color: colorConfig.ambientGray,
      intensity: 0.5,
    },
  },
  stars: {
    color: colorConfig.pureWhite,
    count: 5000,
    size: 0.5,
    sizeAttenuation: true,
  },
}

export const celestialBodiesConfig: Record<string, ICelestialBody> = {
  sun: {
    name: 'Sun',
    radius: 1,
    distance: 0,
    color: colorConfig.sunYellow,
    emissive: colorConfig.sunraysOrange,
    scale: 5,
    segments: 64,
    shininess: 100,
  },
}
