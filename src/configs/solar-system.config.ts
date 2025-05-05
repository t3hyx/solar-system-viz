import type { ISolarSystemConfig } from '@/types/solar-system.types'
import { colorConfig } from '@/configs/color.config'
import * as THREE from 'three'
import { celestialBodiesConfig } from './celestial-bodies.config'

export { celestialBodiesConfig }

export const solarSystemConfig: ISolarSystemConfig = {
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
  trails: {
    color: colorConfig.trailGrey,
    opacity: 0.5,
    linewidth: 1,
    segments: 128,
    transparent: true,
    side: THREE.DoubleSide,
  },
  scene: {
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
      minDistance: 10,
      maxDistance: 1000,
      maxPolarAngle: Math.PI / 2,
      minPolarAngle: 0,
      dampingFactor: 0.05,
    },
  },
  gui: {
    trails: {
      color: colorConfig.trailGrey,
      opacity: 0.5,
      linewidth: 1,
      segments: 128,
      transparent: true,
      side: THREE.DoubleSide,
    },
    fps: {
      updateInterval: 500,
    },
    axisGrid: {
      units: 10,
    },
  },
  celestialBodies: Object.values(celestialBodiesConfig),
}
