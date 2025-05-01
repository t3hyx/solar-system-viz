import type { ISceneConfig } from '@/types/solar-system.types'
import { colorConfig } from '@/configs/color.config'
import * as THREE from 'three'

export const sceneConfig: ISceneConfig = {
  camera: {
    fov: 75,
    near: 0.1,
    far: 100000,
    position: new THREE.Vector3(0, 0, 1000),
  },
  background: {
    color: colorConfig.pureBlack,
  },
  lights: {
    sun: {
      color: colorConfig.pureWhite,
      intensity: 300.00,
      distance: 15000,
      decay: 2.00,
    },
    ambient: {
      color: colorConfig.ambientGrey,
      intensity: 1,
    },
  },
  stars: {
    color: colorConfig.pureWhite,
    count: 5000,
    size: 3,
    sizeAttenuation: true,
  },
  controls: {
    minDistance: 5,
    maxDistance: 27000,
    maxPolarAngle: Math.PI / 2,
    minPolarAngle: 0,
    dampingFactor: 0.05,
  },
} 
