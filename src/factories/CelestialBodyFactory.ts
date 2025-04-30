import type { ICelestialBody } from '@/types/solar-system.types'
import { celestialBodiesConfig, solarSystemConfig } from '@/configs/solar-system.config'
import * as THREE from 'three'

export class CelestialBodyFactory {
  private static config: Record<string, ICelestialBody> = celestialBodiesConfig
  private static systemConfig = solarSystemConfig

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

    // Apply inclination (tilt of the planet's axis)
    mesh.rotation.z = THREE.MathUtils.degToRad(body.inclination)

    return mesh
  }

  // * Creates an orbit object for a celestial body
  public static createOrbit(distance: number, bodyName: string): THREE.Object3D {
    const orbit = new THREE.Object3D()
    orbit.name = `orbit-${bodyName}`

    // Create a visual of the orbit
    const orbitGeometry = new THREE.RingGeometry(
      distance - 0.1, // inner
      distance + 0.1, // outer
      this.systemConfig.trails.segments,
    )
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: this.systemConfig.trails.color,
      side: this.systemConfig.trails.side,
      transparent: this.systemConfig.trails.transparent,
      opacity: this.systemConfig.trails.opacity,
    })
    const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial)
    orbit.add(orbitMesh)

    // Apply orbit inclination
    const body = this.config[bodyName.toLowerCase()]
    if (body) {
      orbit.rotation.x = THREE.MathUtils.degToRad(body.orbitInclination)
    }

    orbit.userData.orbitMesh = orbitMesh
    orbit.userData.orbitMesh.visible = false

    return orbit
  }

  // * Creates an orbit trail for a celestial body
  public static createOrbitTrail(distance: number, bodyName: string): THREE.Line {
    const points = []
    const segments = this.systemConfig.trails.segments
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const x = Math.cos(angle) * distance
      const y = 0
      const z = Math.sin(angle) * distance
      points.push(new THREE.Vector3(x, y, z))
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: this.systemConfig.trails.color,
      transparent: this.systemConfig.trails.transparent,
      opacity: this.systemConfig.trails.opacity,
      linewidth: this.systemConfig.trails.linewidth,
    })

    const orbitTrail = new THREE.Line(geometry, material)
    orbitTrail.name = `trail-${bodyName}`

    // Apply orbit inclination
    const body = this.config[bodyName.toLowerCase()]
    if (body) {
      orbitTrail.rotation.x = THREE.MathUtils.degToRad(body.orbitInclination)
    }

    return orbitTrail
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
      inclination: this.config.sun.inclination,
      orbitInclination: this.config.sun.orbitInclination,
    })
  }

  // * Mercury
  public static createMercury(): THREE.Mesh {
    return this.createCelestialBody({
      name: this.config.mercury.name,
      radius: this.config.mercury.radius,
      distance: this.config.mercury.distance,
      color: this.config.mercury.color,
      emissive: this.config.mercury.emissive,
      emissiveIntensity: this.config.mercury.emissiveIntensity,
      scale: this.config.mercury.scale,
      segments: this.config.mercury.segments,
      shininess: this.config.mercury.shininess,
      selfRotationSpeed: this.config.mercury.selfRotationSpeed,
      orbitalRotationSpeed: this.config.mercury.orbitalRotationSpeed,
      wireframed: this.config.mercury.wireframed,
      inclination: this.config.mercury.inclination,
      orbitInclination: this.config.mercury.orbitInclination,
    })
  }

  // * Venus
  public static createVenus(): THREE.Mesh {
    return this.createCelestialBody({
      name: this.config.venus.name,
      radius: this.config.venus.radius,
      distance: this.config.venus.distance,
      color: this.config.venus.color,
      emissive: this.config.venus.emissive,
      emissiveIntensity: this.config.venus.emissiveIntensity,
      scale: this.config.venus.scale,
      segments: this.config.venus.segments,
      shininess: this.config.venus.shininess,
      selfRotationSpeed: this.config.venus.selfRotationSpeed,
      orbitalRotationSpeed: this.config.venus.orbitalRotationSpeed,
      wireframed: this.config.venus.wireframed,
      inclination: this.config.venus.inclination,
      orbitInclination: this.config.venus.orbitInclination,
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
      inclination: this.config.earth.inclination,
      orbitInclination: this.config.earth.orbitInclination,
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
      inclination: this.config.moon.inclination,
      orbitInclination: this.config.moon.orbitInclination,
    })
  }

  // * Mars
  public static createMars(): THREE.Mesh {
    return this.createCelestialBody({
      name: this.config.mars.name,
      radius: this.config.mars.radius,
      distance: this.config.mars.distance,
      color: this.config.mars.color,
      emissive: this.config.mars.emissive,
      emissiveIntensity: this.config.mars.emissiveIntensity,
      scale: this.config.mars.scale,
      segments: this.config.mars.segments,
      shininess: this.config.mars.shininess,
      selfRotationSpeed: this.config.mars.selfRotationSpeed,
      orbitalRotationSpeed: this.config.mars.orbitalRotationSpeed,
      wireframed: this.config.mars.wireframed,
      inclination: this.config.mars.inclination,
      orbitInclination: this.config.mars.orbitInclination,
    })
  }

  // * Jupiter
  public static createJupiter(): THREE.Mesh {
    return this.createCelestialBody({
      name: this.config.jupiter.name,
      radius: this.config.jupiter.radius,
      distance: this.config.jupiter.distance,
      color: this.config.jupiter.color,
      emissive: this.config.jupiter.emissive,
      emissiveIntensity: this.config.jupiter.emissiveIntensity,
      scale: this.config.jupiter.scale,
      segments: this.config.jupiter.segments,
      shininess: this.config.jupiter.shininess,
      selfRotationSpeed: this.config.jupiter.selfRotationSpeed,
      orbitalRotationSpeed: this.config.jupiter.orbitalRotationSpeed,
      wireframed: this.config.jupiter.wireframed,
      inclination: this.config.jupiter.inclination,
      orbitInclination: this.config.jupiter.orbitInclination,
    })
  }

  // * Saturn
  public static createSaturnWithRings(): THREE.Group {
    // create group
    const saturnGroup = new THREE.Group()
    saturnGroup.name = this.config.saturn.name

    // create planet
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
    // Apply inclination
    saturn.rotation.z = THREE.MathUtils.degToRad(this.config.saturn.inclination)
    saturnGroup.add(saturn)

    // create rings
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

  // * Uranus
  public static createUranus(): THREE.Mesh {
    return this.createCelestialBody({
      name: this.config.uranus.name,
      radius: this.config.uranus.radius,
      distance: this.config.uranus.distance,
      color: this.config.uranus.color,
      emissive: this.config.uranus.emissive,
      emissiveIntensity: this.config.uranus.emissiveIntensity,
      scale: this.config.uranus.scale,
      segments: this.config.uranus.segments,
      shininess: this.config.uranus.shininess,
      selfRotationSpeed: this.config.uranus.selfRotationSpeed,
      orbitalRotationSpeed: this.config.uranus.orbitalRotationSpeed,
      wireframed: this.config.uranus.wireframed,
      inclination: this.config.uranus.inclination,
      orbitInclination: this.config.uranus.orbitInclination,
    })
  }

  // * Neptune
  public static createNeptune(): THREE.Mesh {
    return this.createCelestialBody({
      name: this.config.neptune.name,
      radius: this.config.neptune.radius,
      distance: this.config.neptune.distance,
      color: this.config.neptune.color,
      emissive: this.config.neptune.emissive,
      emissiveIntensity: this.config.neptune.emissiveIntensity,
      scale: this.config.neptune.scale,
      segments: this.config.neptune.segments,
      shininess: this.config.neptune.shininess,
      selfRotationSpeed: this.config.neptune.selfRotationSpeed,
      orbitalRotationSpeed: this.config.neptune.orbitalRotationSpeed,
      wireframed: this.config.neptune.wireframed,
      inclination: this.config.neptune.inclination,
      orbitInclination: this.config.neptune.orbitInclination,
    })
  }

  // * Pluto
  public static createPluto(): THREE.Mesh {
    return this.createCelestialBody({
      name: this.config.pluto.name,
      radius: this.config.pluto.radius,
      distance: this.config.pluto.distance,
      color: this.config.pluto.color,
      emissive: this.config.pluto.emissive,
      emissiveIntensity: this.config.pluto.emissiveIntensity,
      scale: this.config.pluto.scale,
      segments: this.config.pluto.segments,
      shininess: this.config.pluto.shininess,
      selfRotationSpeed: this.config.pluto.selfRotationSpeed,
      orbitalRotationSpeed: this.config.pluto.orbitalRotationSpeed,
      wireframed: this.config.pluto.wireframed,
      inclination: this.config.pluto.inclination,
      orbitInclination: this.config.pluto.orbitInclination,
    })
  }
}
