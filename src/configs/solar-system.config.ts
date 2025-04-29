import type { ICelestialBody, ISolarSystemConfig } from '@/types/solar-system.types'
import { colorConfig } from '@/configs/color.config'
import * as THREE from 'three'

const wireframed = true

const _ua = 149597870.7 // km
// * 1 AU = 25 Three.js units
const au_to_x = 25

// Real planet radii in km
const planetRadii = {
  sun: 696340, // Sun
  mercury: 2439.7, // Mercury
  venus: 6051.8, // Venus
  earth: 6371.0, // Earth
  moon: 1737.4, // Moon
  mars: 3389.5, // Mars
  jupiter: 69911, // Jupiter
  saturn: 58232, // Saturn
  uranus: 25362, // Uranus
  neptune: 24622, // Neptune
  pluto: 1188.3, // Pluto
}

// Scale factor to convert km to Three.js units
// Using Earth as reference: 6371 km = 1 unit
const km_to_x = 1 / 6371

// Calculate minimum safe distance for planets (1.5 times Sun's radius)
const sunRadius = planetRadii.sun * km_to_x
const minSafeDistance = sunRadius * 1.5

// Scale factor for orbital distances to ensure planets are visible
// Using Mercury's real distance (0.387 AU) as reference
const distanceScaleFactor = minSafeDistance / (0.387 * au_to_x)

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
      intensity: 30.00,
      distance: 1000,
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
}

export const celestialBodiesConfig: Record<string, ICelestialBody> = {
  sun: {
    name: 'Sun',
    radius: 1,
    distance: 0,
    color: colorConfig.sunYellow,
    emissive: colorConfig.sunraysOrange,
    emissiveIntensity: 1,
    scale: planetRadii.sun * km_to_x,
    segments: 64,
    shininess: 0,
    selfRotationSpeed: 0.1,
    orbitalRotationSpeed: 0,
    wireframed,
  },
  mercury: {
    name: 'Mercury',
    radius: 1,
    distance: 0.387 * au_to_x * distanceScaleFactor,
    color: colorConfig.mercuryBrown,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: planetRadii.mercury * km_to_x * 2,
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.3,
    orbitalRotationSpeed: 0.5,
    wireframed,
  },
  venus: {
    name: 'Venus',
    radius: 1,
    distance: 0.723 * au_to_x * distanceScaleFactor,
    color: colorConfig.venusYellow,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: planetRadii.venus * km_to_x * 2,
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.3,
    orbitalRotationSpeed: 0.5,
    wireframed,
  },
  earth: {
    name: 'Earth',
    radius: 1,
    distance: 1.000 * au_to_x * distanceScaleFactor,
    color: colorConfig.earthBlue,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: planetRadii.earth * km_to_x * 2,
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.3,
    orbitalRotationSpeed: 0.5,
    wireframed,
  },
  moon: {
    name: 'Moon',
    radius: 1,
    distance: 0.00257 * au_to_x * distanceScaleFactor,
    color: colorConfig.moonGrey,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: planetRadii.moon * km_to_x * 2,
    segments: 32,
    shininess: 40,
    selfRotationSpeed: 0.01,
    orbitalRotationSpeed: 0.1,
    wireframed,
  },
  mars: {
    name: 'Mars',
    radius: 1,
    distance: 1.524 * au_to_x * distanceScaleFactor,
    color: colorConfig.marsRed,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: planetRadii.mars * km_to_x * 2,
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.3,
    orbitalRotationSpeed: 0.5,
    wireframed,
  },
  jupiter: {
    name: 'Jupiter',
    radius: 1,
    distance: 5.203 * au_to_x * distanceScaleFactor,
    color: colorConfig.jupiterOrange,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: planetRadii.jupiter * km_to_x * 2,
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.3,
    orbitalRotationSpeed: 0.5,
    wireframed,
  },
  saturn: {
    name: 'Saturn',
    radius: 1,
    distance: 9.537 * au_to_x * distanceScaleFactor,
    color: colorConfig.saturnYellow,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: planetRadii.saturn * km_to_x * 2,
    segments: 32,
    shininess: 10,
    selfRotationSpeed: 0.001,
    orbitalRotationSpeed: 0.3,
    wireframed,
  },
  uranus: {
    name: 'Uranus',
    radius: 1,
    distance: 19.191 * au_to_x * distanceScaleFactor,
    color: colorConfig.uranusCyan,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: planetRadii.uranus * km_to_x * 2,
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.3,
    orbitalRotationSpeed: 0.5,
    wireframed,
  },
  neptune: {
    name: 'Neptune',
    radius: 1,
    distance: 30.069 * au_to_x * distanceScaleFactor,
    color: colorConfig.neptuneBlue,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: planetRadii.neptune * km_to_x * 2,
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.3,
    orbitalRotationSpeed: 0.5,
    wireframed,
  },
  pluto: {
    name: 'Pluto',
    radius: 1,
    distance: 39.482 * au_to_x * distanceScaleFactor,
    color: colorConfig.plutoGrey,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: planetRadii.pluto * km_to_x * 2,
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.3,
    orbitalRotationSpeed: 0.5,
    wireframed,
  },
}
