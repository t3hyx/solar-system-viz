import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

// Scene Configuration Types
export interface ICameraConfig {
  fov: number
  near: number
  far: number
  position: THREE.Vector3
}

export interface IBackgroundConfig {
  color: THREE.Color
}

export interface ILightConfig {
  color: THREE.Color
  intensity: number
  distance?: number
  decay?: number
}

export interface ILightsConfig {
  sun: ILightConfig
  ambient: ILightConfig
}

export interface IStarsConfig {
  color: THREE.Color
  count: number
  size: number
  sizeAttenuation: boolean
}

export interface IControlsConfig {
  minDistance: number
  maxDistance: number
  maxPolarAngle: number
  minPolarAngle: number
  dampingFactor: number
}

export interface ISceneConfig {
  camera: ICameraConfig
  background: IBackgroundConfig
  lights: ILightsConfig
  stars: IStarsConfig
  controls: IControlsConfig
}

// GUI Configuration Types
export interface ITrailConfig {
  color: THREE.Color
  opacity: number
  linewidth: number
  segments: number
  transparent: boolean
  side: THREE.Side
}

export interface IFpsConfig {
  updateInterval: number
}

export interface IAxisGridConfig {
  units: number
}

export interface IGuiConfig {
  trails: ITrailConfig
  fps: IFpsConfig
  axisGrid: IAxisGridConfig
}

// Celestial Body Types
export interface ICelestialBody {
  name: string
  radius: number
  distance: number
  color: THREE.Color
  emissive: THREE.Color
  emissiveIntensity: number
  scale: number
  segments: number
  shininess: number
  selfRotationSpeed: number
  orbitalRotationSpeed: number
  inclination: number
  orbitInclination: number
  wireframed: boolean
  severity?: number // Optional property for error handling
}

// State Types
export interface ISolarSystemState {
  renderer: THREE.WebGLRenderer
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  controls: OrbitControls
  gui: GUI
  objects: THREE.Object3D[]
  animationFrameId: number | null
  fpsCounter: { value: number }
}

// Solar System Configuration Type
export interface ISolarSystemConfig {
  camera: ICameraConfig
  scene: ISceneConfig
  gui: IGuiConfig
  lights: ILightsConfig
  stars: IStarsConfig
  trails: ITrailConfig
  background: IBackgroundConfig
  celestialBodies: ICelestialBody[]
}
