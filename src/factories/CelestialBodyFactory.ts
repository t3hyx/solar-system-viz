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
      wireframe: body.wireframed,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.set(body.scale, body.scale, body.scale)
    mesh.name = body.name

    return mesh
  }

  // * Creates an orbit object for a celestial body
  public static createOrbit(distance: number, bodyName: string): THREE.Object3D {
    const orbit = new THREE.Object3D()
    orbit.name = `orbit-${bodyName}`

    // Create a visual representation of the orbit
    const orbitGeometry = new THREE.RingGeometry(distance - 0.1, distance + 0.1, 64)
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    })
    const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial)
    orbit.add(orbitMesh)

    // Store the orbit mesh as a property for easy access
    orbit.userData.orbitMesh = orbitMesh

    return orbit
  }

  // * Creates an orbit trail for a celestial body
  public static createOrbitTrail(distance: number, bodyName: string): THREE.Line {
    const points = []
    const segments = 64
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const x = Math.cos(angle) * distance
      const z = Math.sin(angle) * distance
      points.push(new THREE.Vector3(x, 0, z))
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: 0x666666,
      transparent: true,
      opacity: 0.5,
      linewidth: 1,
    })

    const trail = new THREE.Line(geometry, material)
    trail.name = `trail-${bodyName}`

    return trail
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
      orbitalRotationSpeed: this.config.sun.orbitalRotationSpeed,
      wireframed: this.config.sun.wireframed,
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
      orbitalRotationSpeed: this.config.earth.orbitalRotationSpeed,
      wireframed: this.config.earth.wireframed,
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
      orbitalRotationSpeed: this.config.moon.orbitalRotationSpeed,
      wireframed: this.config.moon.wireframed,
    })
  }

  // * Saturn
  public static createSaturnWithRings(): THREE.Group {
    // Create Saturn group
    const saturnGroup = new THREE.Group()
    saturnGroup.name = this.config.saturn.name

    // Create Saturn planet
    const saturnGeometry = new THREE.SphereGeometry(
      this.config.saturn.radius,
      this.config.saturn.segments,
      this.config.saturn.segments,
    )
    const saturnMaterial = new THREE.MeshPhongMaterial({
      color: this.config.saturn.color,
      emissive: this.config.saturn.emissive,
      emissiveIntensity: this.config.saturn.emissiveIntensity,
      shininess: this.config.saturn.shininess,
      wireframe: this.config.saturn.wireframed,
    })
    const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial)
    saturn.scale.set(
      this.config.saturn.scale,
      this.config.saturn.scale,
      this.config.saturn.scale,
    )
    saturnGroup.add(saturn)

    // Create Saturn rings
    const ringGeometry = new THREE.RingGeometry(3, 5, 64)
    const ringMaterial = new THREE.MeshPhongMaterial({
      color: this.config.saturn.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
      shininess: 30,
      wireframe: this.config.saturn.wireframed,
    })
    const rings = new THREE.Mesh(ringGeometry, ringMaterial)
    rings.rotation.x = Math.PI / 2 // x Rotate to be horizontal
    saturnGroup.add(rings)

    return saturnGroup
  }
}
