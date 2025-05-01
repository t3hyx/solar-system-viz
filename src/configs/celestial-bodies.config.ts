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
    radius: 1,
    distance: 0,
    color: colorConfig.sunYellow,
    emissive: colorConfig.sunraysOrange,
    emissiveIntensity: 1,
    scale: 696340 * km_to_x, // sun's radius in km converted to 3JS units
    segments: 64,
    shininess: 0,
    selfRotationSpeed: 0.004, // ~27 days
    orbitalRotationSpeed: 0,
    inclination: 0,
    orbitInclination: 0,
    wireframed: false,
  },
  mercury: {
    name: 'Mercury',
    radius: 1,
    distance: 0.387 * au_to_x * distanceScaleFactor,
    color: colorConfig.mercuryBrown,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 2439.7 * km_to_x * 3, // mercury's radius in km converted to 3JS units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.017, // 58.6 days
    orbitalRotationSpeed: 0.011, // 88 days
    inclination: 0.034,
    orbitInclination: 7.0,
    wireframed: false,
  },
  venus: {
    name: 'Venus',
    radius: 1,
    distance: 0.723 * au_to_x * distanceScaleFactor,
    color: colorConfig.venusYellow,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 6051.8 * km_to_x * 3, // venus's radius in km converted to 3JS units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.004, // 243 days (retrograde)
    orbitalRotationSpeed: 0.008, // 225 days
    inclination: 177.4, // degrees (retrograde)
    orbitInclination: 3.4,
    wireframed: false,
  },
  earth: {
    name: 'Earth',
    radius: 1,
    distance: 1.000 * au_to_x * distanceScaleFactor,
    color: colorConfig.earthBlue,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 6371.0 * km_to_x * 3, // earth's radius in km converted to 3JS units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 1.0, // 1 day
    orbitalRotationSpeed: 0.003, // 365.25 days
    inclination: 23.4,
    orbitInclination: 0,
    wireframed: false,
  },
  moon: {
    name: 'Moon',
    radius: 1,
    distance: 0.00257 * au_to_x * distanceScaleFactor,
    color: colorConfig.moonGrey,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1737.4 * km_to_x * 3, // moon's radius in km converted to 3JS units
    segments: 32,
    shininess: 40,
    selfRotationSpeed: 0.27, // 27.3 days
    orbitalRotationSpeed: 0.27, // 27.3 days (tidally locked)
    inclination: 6.7,
    orbitInclination: 5.1,
    wireframed: false,
  },
  mars: {
    name: 'Mars',
    radius: 1,
    distance: 1.524 * au_to_x * distanceScaleFactor,
    color: colorConfig.marsRed,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 3389.5 * km_to_x * 3, // mars's radius in km converted to 3JS units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.97, // 1.03 days
    orbitalRotationSpeed: 0.001, // 687 days
    inclination: 25.2,
    orbitInclination: 1.9,
    wireframed: false,
  },
  jupiter: {
    name: 'Jupiter',
    radius: 1,
    distance: 5.203 * au_to_x * distanceScaleFactor,
    color: colorConfig.jupiterOrange,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 69911 * km_to_x * 3, // jupiter's radius in km converted to 3JS units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 2.41, // 0.41 days
    orbitalRotationSpeed: 0.0002, // 4333 days
    inclination: 3.1,
    orbitInclination: 1.3,
    wireframed: false,
  },
  saturn: {
    name: 'Saturn',
    radius: 1,
    distance: 9.537 * au_to_x * distanceScaleFactor,
    color: colorConfig.saturnYellow,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 58232 * km_to_x * 3, // saturn's radius in km converted to 3JS units
    segments: 32,
    shininess: 10,
    selfRotationSpeed: 2.25, // 0.44 days
    orbitalRotationSpeed: 0.00009, // 10759 days
    inclination: 26.7,
    orbitInclination: 2.5,
    wireframed: false,
  },
  uranus: {
    name: 'Uranus',
    radius: 1,
    distance: 19.191 * au_to_x * distanceScaleFactor,
    color: colorConfig.uranusCyan,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 25362 * km_to_x * 3, // uranus's radius in km converted to 3JS units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 1.39, // 0.72 days (retrograde)
    orbitalRotationSpeed: 0.00003, // 30687 days
    inclination: 97.8, // degrees (retrograde)
    orbitInclination: 0.8,
    wireframed: false,
  },
  neptune: {
    name: 'Neptune',
    radius: 1,
    distance: 30.069 * au_to_x * distanceScaleFactor,
    color: colorConfig.neptuneBlue,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 24622 * km_to_x * 3, // neptune's radius in km converted to 3JS units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 1.49, // 0.67 days
    orbitalRotationSpeed: 0.00002, // 60190 days
    inclination: 28.3,
    orbitInclination: 1.8,
    wireframed: false,
  },
  pluto: {
    name: 'Pluto',
    radius: 1,
    distance: 39.482 * au_to_x * distanceScaleFactor,
    color: colorConfig.plutoGrey,
    emissive: colorConfig.pureBlack,
    emissiveIntensity: 0,
    scale: 1188.3 * km_to_x * 3, // pluto's radius in km converted to 3JS units
    segments: 32,
    shininess: 15,
    selfRotationSpeed: 0.15, // 6.4 days
    orbitalRotationSpeed: 0.00001, // 90560 days
    inclination: 122.5,
    orbitInclination: 17.2,
    wireframed: false,
  },
}
