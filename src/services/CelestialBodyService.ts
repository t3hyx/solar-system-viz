import type { CelestialBodyFactory } from '@/factories/CelestialBodyFactory'
import type { ISolarSystemState } from '@/types/solar-system.types'
import { celestialBodiesConfig } from '@/configs/celestial-bodies.config'
import * as THREE from 'three'

/**
 * # CelestialBodyService is responsible for creating and managing all celestial bodies in the solar system.
 *
 * ? Responsibilities:
 * ? 1. Creation of celestial bodies
 * ? 2. Creation of orbits and trails
 * ? 3. Adding celestial bodies to the scene
 * ? 4. Handling the creation of moons
 */
export class CelestialBodyService {
  private state: ISolarSystemState
  private celestialBodyFactory: CelestialBodyFactory

  constructor(state: ISolarSystemState, celestialBodyFactory: CelestialBodyFactory) {
    this.state = state
    this.celestialBodyFactory = celestialBodyFactory
  }

  public async createSolarSystem(): Promise<void> {
    // create solar system container
    const solarSystem = new THREE.Object3D()
    this.state.scene.add(solarSystem)
    this.state.objects.push(solarSystem)

    // create Sun
    const sun = await this.celestialBodyFactory.createPlanet('sun')
    solarSystem.add(sun)
    this.state.objects.push(sun)

    // create planets
    const planets = [
      'mercury',
      'venus',
      'earth',
      'mars',
      'jupiter',
      'saturn',
      'uranus',
      'neptune',
      'pluto',
    ]

    for (const planetName of planets) {
      const planet = await this.celestialBodyFactory.createPlanet(planetName)
      const config = celestialBodiesConfig[planetName]

      // Set planet position
      planet.position.x = config.distance

      // Create orbit and trail
      const orbit = this.celestialBodyFactory.createOrbit(config.distance, planetName)
      const trail = this.celestialBodyFactory.createOrbitTrail(config.distance, planetName)

      solarSystem.add(orbit)
      solarSystem.add(trail)
      orbit.add(planet)

      this.state.objects.push(orbit, trail, planet)
    }

    // create Moon (special case as it orbits Earth)
    const moon = await this.celestialBodyFactory.createPlanet('moon')
    const earth = this.state.objects.find(obj => obj.name === 'earth')
    if (earth) {
      const moonConfig = celestialBodiesConfig.moon
      moon.position.x = moonConfig.distance
      earth.add(moon)
      this.state.objects.push(moon)
    }
  }
}
