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

  // * Creates an orbit object for a celestial body
  public static createOrbit(distance: number): THREE.Object3D {
    const orbit = new THREE.Object3D()
    orbit.position.x = distance
    return orbit
  }

  // * Sun
  public static createSun(): THREE.Mesh {
    return this.createCelestialBody({
      name: this.config.sun.name,
      radius: this.config.sun.radius,
      distance: this.config.sun.distance,
      color: this.config.sun.color,
      emissive: this.config.sun.emissive,
      emissiveIntensity: this.config.sun.emissiveIntensity,
      scale: this.config.sun.scale,
      segments: this.config.sun.segments,
      shininess: this.config.sun.shininess,
      selfRotationSpeed: this.config.sun.selfRotationSpeed,
      wireframe: this.config.sun.wireframe,
    })
  }

  // * Earth
  public static createEarth(): THREE.Mesh {
    return this.createCelestialBody({
      name: this.config.earth.name,
      radius: this.config.earth.radius,
      distance: this.config.earth.distance,
      color: this.config.earth.color,
      emissive: this.config.earth.emissive,
      emissiveIntensity: this.config.earth.emissiveIntensity,
      scale: this.config.earth.scale,
      segments: this.config.earth.segments,
      shininess: this.config.earth.shininess,
      selfRotationSpeed: this.config.earth.selfRotationSpeed,
      wireframe: this.config.earth.wireframe,
    })
  }

  // * Moon
  public static createMoon(): THREE.Mesh {
    return this.createCelestialBody({
      name: this.config.moon.name,
      radius: this.config.moon.radius,
      distance: this.config.moon.distance,
      color: this.config.moon.color,
      emissive: this.config.moon.emissive,
      emissiveIntensity: this.config.moon.emissiveIntensity,
      scale: this.config.moon.scale,
      segments: this.config.moon.segments,
      shininess: this.config.moon.shininess,
      selfRotationSpeed: this.config.moon.selfRotationSpeed,
      wireframe: this.config.moon.wireframe,
    })
  }
}
