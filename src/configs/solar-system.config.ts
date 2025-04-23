import type { ICelestialBody, ISolarSystemConfig } from '@/types/solar-system.types'
import { colorConfig } from '@/configs/color.config'
import * as THREE from 'three'

const wireframe = false

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
      intensity: 30.00,
      distance: 1000,
      decay: 2.00,
    },
    ambient: {
      color: colorConfig.ambientGray,
      intensity: 1,
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
    emissiveIntensity: 1,
    scale: 5,
    segments: 64,
    shininess: 0,
    selfRotationSpeed: 0.001,
    wireframe,
  },
  earth: {
    name: 'Earth',
    radius: 1,
    distance: 15,
    color: colorConfig.earthBlue,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1,
    segments: 32,
    shininess: 40,
    selfRotationSpeed: 0.001,
    wireframe,
  },
  moon: {
    name: 'Moon',
    radius: 0.5,
    distance: 2,
    color: colorConfig.pureWhite,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 0.5,
    segments: 32,
    shininess: 40,
    selfRotationSpeed: 0.001,
    wireframe,
  },
}
