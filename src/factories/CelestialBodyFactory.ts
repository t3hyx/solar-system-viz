import { celestialBodiesConfig } from '@/configs/celestial-bodies.config'
import { solarSystemConfig } from '@/configs/solar-system.config'
import { TextureService } from '@/services/TextureService'
import * as THREE from 'three'

/**
 * # CelestialBodyFactory is responsible for creating celestial bodies (planets, moons, sun) and their orbits and trails.
 *
 * ? Responsibilities:
 * ? 1. Creation of celestial bodies
 * ? 2. Creation of orbits and trails
 */
export class CelestialBodyFactory {
  private textureService: TextureService

  constructor() {
    this.textureService = new TextureService()
  }

  public async createPlanet(name: string): Promise<THREE.Mesh> {
    const config = celestialBodiesConfig[name]
    if (!config) {
      throw new Error(`No configuration found for celestial body: ${name}`)
    }

    const geometry = new THREE.SphereGeometry(config.radius, 64, 64)
    const material = await this.textureService.createPlanetMaterial(name)

    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = name

    // special handling for Saturn's rings
    if (name === 'saturn' && config.rings) {
      const ringsGeometry = new THREE.RingGeometry(
        config.rings.innerRadius,
        config.rings.outerRadius,
        64,
      )
      const ringsMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
      })
      const rings = new THREE.Mesh(ringsGeometry, ringsMaterial)
      rings.rotation.x = Math.PI / 2
      mesh.add(rings)
    }

    return mesh
  }

  public createOrbit(radius: number, name: string, type: 'ring' | 'line' | 'trail' = 'line'): THREE.Object3D {
    const config = celestialBodiesConfig[name.toLowerCase()]

    if (type === 'ring') {
      const orbit = new THREE.Object3D()
      orbit.name = `orbit-${name}`

      const orbitGeometry = new THREE.RingGeometry(
        radius - 0.1,
        radius + 0.1,
        solarSystemConfig.trails.segments,
      )
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: solarSystemConfig.trails.color,
        side: solarSystemConfig.trails.side,
        transparent: solarSystemConfig.trails.transparent,
        opacity: solarSystemConfig.trails.opacity,
      })
      const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial)
      orbit.add(orbitMesh)

      if (config) {
        orbit.rotation.x = THREE.MathUtils.degToRad(config.orbitInclination)
      }

      orbit.userData.orbitMesh = orbitMesh
      orbit.userData.orbitMesh.visible = false

      return orbit
    }
    else {
      const geometry = new THREE.BufferGeometry()
      const material = new THREE.LineBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: type === 'trail' ? 0.1 : 0.3,
        linewidth: type === 'trail' ? 2 : 1,
      })
      const points = []

      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2
        points.push(new THREE.Vector3(
          radius * Math.cos(theta),
          0,
          radius * Math.sin(theta),
        ))
      }

      geometry.setFromPoints(points)
      const line = new THREE.Line(geometry, material)
      line.name = `${name}-${type}`

      if (config) {
        line.rotation.x = THREE.MathUtils.degToRad(config.orbitInclination)
      }

      return line
    }
  }

  public createOrbitTrail(radius: number, name: string): THREE.Line {
    return this.createOrbit(radius, name, 'trail') as THREE.Line
  }
}
