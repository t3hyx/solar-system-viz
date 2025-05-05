import type { ICelestialBody } from '@/types/solar-system.types'
import { colorConfig } from '@/configs/color.config'

// * Size scaling
// ? Using Earth as reference: 6371 km = 1 3JS unit
const km_to_x = 1 / 6371

// * Distance scaling
// ? 1 AU = 25 3JS units (this determines the scale of solar system)
const au_to_x = 25

// * Calculate minimum safe distance for planets (1.5 times Sun's radius)
// ? This ensures planets don't overlap with the Sun
const sunRadius = 696340 * km_to_x // sun's radius in 3JS units
const minSafeDistance = sunRadius * 1.5

// * Scale factor for orbital distances to ensure planets are visible
// ? Using Mercury's real distance (0.387 AU) as reference
const distanceScaleFactor = minSafeDistance / (0.387 * au_to_x)

export const celestialBodiesConfig: Record<string, ICelestialBody> = {
  sun: {
    name: 'Sun',
    radius: 10,
    distance: 0,
    rotationSpeed: 0.004, // ~27 days
    orbitSpeed: 0,
    color: colorConfig.sunYellow,
    emissive: colorConfig.sunraysOrange,
    emissiveIntensity: 1,
    scale: 1,
    segments: 32,
    shininess: 100,
    inclination: 0,
    orbitInclination: 0,
    wireframed: false,
  },
  mercury: {
    name: 'Mercury',
    radius: 0.4,
    distance: 0.387 * au_to_x * distanceScaleFactor, // 0.387 AU
    rotationSpeed: 0.017, // 58.6 days
    orbitSpeed: 0.011, // 88 days
    color: colorConfig.mercuryBrown,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1,
    segments: 32,
    shininess: 30,
    inclination: 0,
    orbitInclination: 7,
    wireframed: false,
  },
  venus: {
    name: 'Venus',
    radius: 0.9,
    distance: 0.723 * au_to_x * distanceScaleFactor, // 0.723 AU
    rotationSpeed: 0.004, // 243 days (retrograde)
    orbitSpeed: 0.008, // 225 days
    color: colorConfig.venusYellow,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1,
    segments: 32,
    shininess: 30,
    inclination: 0,
    orbitInclination: 3.4,
    wireframed: false,
  },
  earth: {
    name: 'Earth',
    radius: 1,
    distance: 1.000 * au_to_x * distanceScaleFactor, // 1.000 AU
    rotationSpeed: 1.0, // 1 day
    orbitSpeed: 0.003, // 365.25 days
    color: colorConfig.earthBlue,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1,
    segments: 32,
    shininess: 30,
    inclination: 23.4,
    orbitInclination: 0,
    wireframed: false,
  },
  moon: {
    name: 'Moon',
    radius: 0.3,
    distance: 0.00257 * au_to_x * distanceScaleFactor, // 0.00257 AU
    rotationSpeed: 0.27, // 27.3 days
    orbitSpeed: 0.27, // 27.3 days (tidally locked)
    color: colorConfig.moonGrey,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1,
    segments: 32,
    shininess: 30,
    inclination: 5.1,
    orbitInclination: 0,
    wireframed: false,
  },
  mars: {
    name: 'Mars',
    radius: 0.5,
    distance: 1.524 * au_to_x * distanceScaleFactor, // 1.524 AU
    rotationSpeed: 0.97, // 1.03 days
    orbitSpeed: 0.001, // 687 days
    color: colorConfig.marsRed,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1,
    segments: 32,
    shininess: 30,
    inclination: 25.2,
    orbitInclination: 1.9,
    wireframed: false,
  },
  jupiter: {
    name: 'Jupiter',
    radius: 2.5,
    distance: 5.203 * au_to_x * distanceScaleFactor, // 5.203 AU
    rotationSpeed: 2.41, // 0.41 days
    orbitSpeed: 0.0002, // 4333 days
    color: colorConfig.jupiterOrange,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1,
    segments: 32,
    shininess: 30,
    inclination: 3.1,
    orbitInclination: 1.3,
    wireframed: false,
  },
  saturn: {
    name: 'Saturn',
    radius: 2.0,
    distance: 9.537 * au_to_x * distanceScaleFactor, // 9.537 AU
    rotationSpeed: 2.25, // 0.44 days
    orbitSpeed: 0.00009, // 10759 days
    color: colorConfig.saturnYellow,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1,
    segments: 32,
    shininess: 30,
    inclination: 26.7,
    orbitInclination: 2.5,
    wireframed: false,
    rings: {
      innerRadius: 2.2,
      outerRadius: 3.5,
      segments: 32,
    },
  },
  uranus: {
    name: 'Uranus',
    radius: 1.5,
    distance: 19.191 * au_to_x * distanceScaleFactor, // 19.191 AU
    rotationSpeed: 1.39, // 0.72 days (retrograde)
    orbitSpeed: 0.00003, // 30687 days
    color: colorConfig.uranusCyan,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1,
    segments: 32,
    shininess: 30,
    inclination: 97.8,
    orbitInclination: 0.8,
    wireframed: false,
  },
  neptune: {
    name: 'Neptune',
    radius: 1.4,
    distance: 30.069 * au_to_x * distanceScaleFactor, // 30.069 AU
    rotationSpeed: 1.49, // 0.67 days
    orbitSpeed: 0.00002, // 60190 days
    color: colorConfig.neptuneBlue,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1,
    segments: 32,
    shininess: 30,
    inclination: 28.3,
    orbitInclination: 1.8,
    wireframed: false,
  },
  pluto: {
    name: 'Pluto',
    radius: 0.2,
    distance: 39.482 * au_to_x * distanceScaleFactor, // 39.482 AU
    rotationSpeed: 0.15, // 6.4 days
    orbitSpeed: 0.00001, // 90560 days
    color: colorConfig.plutoGrey,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1,
    segments: 32,
    shininess: 30,
    inclination: 122.5,
    orbitInclination: 17.2,
    wireframed: false,
  },
}
