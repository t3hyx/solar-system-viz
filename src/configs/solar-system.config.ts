import type { ICelestialBody, ISolarSystemConfig } from '@/types/solar-system.types'
import { colorConfig } from '@/configs/color.config'
import * as THREE from 'three'

const wireframed = true

// * Distance scaling
const _ua = 149597870.7 // km (1 Astronomical Unit)
// * 1 AU = 25 Three.js units (this determines the scale of the solar system)
const au_to_x = 25

// * Size scaling
// Using Earth as reference: 6371 km = 1 unit
// This means in our visualization:
// - Earth's radius (6371 km) will be 1 unit
// - Other planets' sizes will be scaled relative to Earth
const km_to_x = 1 / 6371

// Calculate minimum safe distance for planets (1.5 times Sun's radius)
// This ensures planets don't overlap with the Sun
const sunRadius = 696340 * km_to_x // Sun's radius in our units
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
    scale: 696340 * km_to_x, // Sun's radius in km converted to our units
    segments: 64,
    shininess: 0,
    selfRotationSpeed: 0.004, // 27 days
    orbitalRotationSpeed: 0,
    inclination: 0, // degrees
    orbitInclination: 0, // degrees
    wireframed,
  },
  mercury: {
    name: 'Mercury',
    radius: 1,
    distance: 0.387 * au_to_x * distanceScaleFactor,
    color: colorConfig.mercuryBrown,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 2439.7 * km_to_x * 2, // Mercury's radius in km converted to our units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.004, // 58.6 days
    orbitalRotationSpeed: 0.008, // 88 days
    inclination: 0.034, // degrees
    orbitInclination: 7.0, // degrees
    wireframed,
  },
  venus: {
    name: 'Venus',
    radius: 1,
    distance: 0.723 * au_to_x * distanceScaleFactor,
    color: colorConfig.venusYellow,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 6051.8 * km_to_x * 2, // Venus's radius in km converted to our units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.002, // 243 days (retrograde)
    orbitalRotationSpeed: 0.006, // 225 days
    inclination: 177.4, // degrees (retrograde)
    orbitInclination: 3.4, // degrees
    wireframed,
  },
  earth: {
    name: 'Earth',
    radius: 1,
    distance: 1.000 * au_to_x * distanceScaleFactor,
    color: colorConfig.earthBlue,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 6371.0 * km_to_x * 2, // Earth's radius in km converted to our units (reference)
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 1.0, // 1 day (reference)
    orbitalRotationSpeed: 0.005, // 365.25 days
    inclination: 23.4, // degrees
    orbitInclination: 0, // degrees (reference)
    wireframed,
  },
  moon: {
    name: 'Moon',
    radius: 1,
    distance: 0.00257 * au_to_x * distanceScaleFactor,
    color: colorConfig.moonGrey,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1737.4 * km_to_x * 2, // Moon's radius in km converted to our units
    segments: 32,
    shininess: 40,
    selfRotationSpeed: 0.27, // 27.3 days
    orbitalRotationSpeed: 0.27, // 27.3 days (tidally locked)
    inclination: 6.7, // degrees
    orbitInclination: 5.1, // degrees
    wireframed,
  },
  mars: {
    name: 'Mars',
    radius: 1,
    distance: 1.524 * au_to_x * distanceScaleFactor,
    color: colorConfig.marsRed,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 3389.5 * km_to_x * 2, // Mars's radius in km converted to our units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.97, // 1.03 days
    orbitalRotationSpeed: 0.004, // 687 days
    inclination: 25.2, // degrees
    orbitInclination: 1.9, // degrees
    wireframed,
  },
  jupiter: {
    name: 'Jupiter',
    radius: 1,
    distance: 5.203 * au_to_x * distanceScaleFactor,
    color: colorConfig.jupiterOrange,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 69911 * km_to_x * 2, // Jupiter's radius in km converted to our units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 2.41, // 0.41 days
    orbitalRotationSpeed: 0.0008, // 4333 days
    inclination: 3.1, // degrees
    orbitInclination: 1.3, // degrees
    wireframed,
  },
  saturn: {
    name: 'Saturn',
    radius: 1,
    distance: 9.537 * au_to_x * distanceScaleFactor,
    color: colorConfig.saturnYellow,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 58232 * km_to_x * 2, // Saturn's radius in km converted to our units
    segments: 32,
    shininess: 10,
    selfRotationSpeed: 2.25, // 0.44 days
    orbitalRotationSpeed: 0.0003, // 10759 days
    inclination: 26.7, // degrees
    orbitInclination: 2.5, // degrees
    wireframed,
  },
  uranus: {
    name: 'Uranus',
    radius: 1,
    distance: 19.191 * au_to_x * distanceScaleFactor,
    color: colorConfig.uranusCyan,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 25362 * km_to_x * 2, // Uranus's radius in km converted to our units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 1.39, // 0.72 days
    orbitalRotationSpeed: 0.0001, // 30687 days
    inclination: 97.8, // degrees (retrograde)
    orbitInclination: 0.8, // degrees
    wireframed,
  },
  neptune: {
    name: 'Neptune',
    radius: 1,
    distance: 30.069 * au_to_x * distanceScaleFactor,
    color: colorConfig.neptuneBlue,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 24622 * km_to_x * 2, // Neptune's radius in km converted to our units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 1.49, // 0.67 days
    orbitalRotationSpeed: 0.00006, // 60190 days
    inclination: 28.3, // degrees
    orbitInclination: 1.8, // degrees
    wireframed,
  },
  pluto: {
    name: 'Pluto',
    radius: 1,
    distance: 39.482 * au_to_x * distanceScaleFactor,
    color: colorConfig.plutoGrey,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1188.3 * km_to_x * 2, // Pluto's radius in km converted to our units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.15, // 6.4 days
    orbitalRotationSpeed: 0.00004, // 90560 days
    inclination: 122.5, // degrees
    orbitInclination: 17.2, // degrees
    wireframed,
  },
}
