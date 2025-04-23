import type { ICelestialBody } from '@/types/solar-system.types'
import { celestialBodiesConfig } from '@/configs/solar-system.config'
import * as THREE from 'three'

export class CelestialBodyFactory {
  private static config: Record<string, ICelestialBody> = celestialBodiesConfig

  // * Creates a basic celestial body (planets, moons, sun)
  public static createCelestialBody(body: ICelestialBody): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(body.radius, body.segments, body.segments)
    const material = new THREE.MeshPhongMaterial({
      color: body.color,
      emissive: body.emissive,
      shininess: body.shininess,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.set(body.scale, body.scale, body.scale)

    return mesh
  }

  // * Sun
  public static createSun(): THREE.Mesh {
    return this.createCelestialBody({
      name: this.config.sun.name,
      radius: this.config.sun.radius,
      distance: this.config.sun.distance,
      color: this.config.sun.color,
      emissive: this.config.sun.emissive,
      scale: this.config.sun.scale,
      segments: this.config.sun.segments,
      shininess: this.config.sun.shininess,
    })
  }
}
