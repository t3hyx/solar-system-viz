import type * as THREE from 'three'
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import type { GUI } from 'three/addons/libs/lil-gui.module.min.js'

export interface ISolarSystemConfig {
  camera: {
    fov: number
    near: number
    far: number
    position: THREE.Vector3
  }
  background: {
    color: number
  }
  lights: {
    sun: {
      color: number
      intensity: number
      distance: number
      decay: number
    }
    ambient: {
      color: number
      intensity: number
    }
  }
  stars: {
    color: number
    count: number
    size: number
    sizeAttenuation: boolean
  }
}

export interface ISolarSystemState {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  controls: OrbitControls
  gui: GUI
  objects: THREE.Object3D[]
  animationFrameId: number
}

export interface ICelestialBody {
  name: string
  radius: number
  distance: number
  selfRotationSpeed: number
  color: number
  emissive: number
  emissiveIntensity: number
  scale: number
  segments: number
  shininess: number
  wireframe: boolean
}
