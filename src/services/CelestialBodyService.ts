import { celestialBodiesConfig } from '@/configs/celestial-bodies.config'
import { CelestialBodyFactory } from '@/factories/CelestialBodyFactory'
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
  private factory: CelestialBodyFactory

  constructor() {
    this.factory = new CelestialBodyFactory()
  }

  public async createSolarSystem(): Promise<THREE.Group> {
    const solarSystem = new THREE.Group()
    solarSystem.name = 'solar-system'

    // create sun
    const sun = await this.factory.createPlanet('sun')
    solarSystem.add(sun)

    // create planets
    const planets = await Promise.all([
      this.factory.createPlanet('mercury'),
      this.factory.createPlanet('venus'),
      this.factory.createPlanet('earth'),
      this.factory.createPlanet('mars'),
      this.factory.createPlanet('jupiter'),
      this.factory.createPlanet('saturn'),
      this.factory.createPlanet('uranus'),
      this.factory.createPlanet('neptune'),
      this.factory.createPlanet('pluto'),
    ])

    // add planets to solar system
    planets.forEach((planet) => {
      const config = celestialBodiesConfig[planet.name]
      planet.position.x = config.distance
      solarSystem.add(planet)

      // create orbit
      const orbit = this.factory.createOrbit(config.distance, planet.name, 'ring')
      solarSystem.add(orbit)

      // create orbit trail
      const trail = this.factory.createOrbitTrail(config.distance, planet.name)
      solarSystem.add(trail)
    })

    return solarSystem
  }
}
