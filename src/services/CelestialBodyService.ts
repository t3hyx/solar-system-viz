import type { ISolarSystemState } from '@/types/solar-system.types'
import { celestialBodiesConfig } from '@/configs/celestial-bodies.config'
import { CelestialBodyFactory } from '@/factories/CelestialBodyFactory'
import * as THREE from 'three'

export class CelestialBodyService {
  private state: ISolarSystemState

  constructor(state: ISolarSystemState) {
    this.state = state
  }

  public createSolarSystem(): void {
    // Create solar system container
    const solarSystem = new THREE.Object3D()
    this.state.scene.add(solarSystem)
    this.state.objects.push(solarSystem)

    // Create Sun
    const sun = CelestialBodyFactory.createSun()
    solarSystem.add(sun)
    this.state.objects.push(sun)

    // Create planets
    this.createPlanet('mercury', solarSystem)
    this.createPlanet('venus', solarSystem)
    this.createPlanet('earth', solarSystem)
    this.createPlanet('mars', solarSystem)
    this.createPlanet('jupiter', solarSystem)
    this.createPlanet('saturn', solarSystem)
    this.createPlanet('uranus', solarSystem)
    this.createPlanet('neptune', solarSystem)
    this.createPlanet('pluto', solarSystem)

    // Create Moon (special case as it orbits Earth)
    this.createMoon()
  }

  private createPlanet(planetKey: keyof typeof celestialBodiesConfig, parent: THREE.Object3D): void {
    const config = celestialBodiesConfig[planetKey]
    
    // Create orbit
    const orbit = CelestialBodyFactory.createOrbit(config.distance, config.name)
    parent.add(orbit)
    this.state.objects.push(orbit)

    // Create trail
    const trail = CelestialBodyFactory.createOrbitTrail(config.distance, config.name)
    parent.add(trail)
    this.state.objects.push(trail)

    // Create planet
    let planet: THREE.Object3D
    switch (planetKey) {
      case 'mercury':
        planet = CelestialBodyFactory.createMercury()
        break
      case 'venus':
        planet = CelestialBodyFactory.createVenus()
        break
      case 'earth':
        planet = CelestialBodyFactory.createEarth()
        break
      case 'mars':
        planet = CelestialBodyFactory.createMars()
        break
      case 'jupiter':
        planet = CelestialBodyFactory.createJupiter()
        break
      case 'saturn':
        planet = CelestialBodyFactory.createSaturnWithRings()
        break
      case 'uranus':
        planet = CelestialBodyFactory.createUranus()
        break
      case 'neptune':
        planet = CelestialBodyFactory.createNeptune()
        break
      case 'pluto':
        planet = CelestialBodyFactory.createPluto()
        break
      default:
        throw new Error(`Unknown planet: ${planetKey}`)
    }

    planet.position.x = config.distance
    orbit.add(planet)
    this.state.objects.push(planet)
  }

  private createMoon(): void {
    const earth = this.state.objects.find(obj => obj.name === 'Earth')
    if (!earth) return

    const config = celestialBodiesConfig.moon

    // Create orbit
    const orbit = CelestialBodyFactory.createOrbit(config.distance, config.name)
    earth.add(orbit)

    // Create trail
    const trail = CelestialBodyFactory.createOrbitTrail(config.distance, config.name)
    earth.add(trail)
    this.state.objects.push(trail)

    // Create moon
    const moon = CelestialBodyFactory.createMoon()
    moon.position.x = config.distance
    orbit.add(moon)
    this.state.objects.push(moon)
  }
} 
