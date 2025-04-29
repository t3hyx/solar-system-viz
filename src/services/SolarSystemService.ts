import type { ISolarSystemConfig, ISolarSystemState } from '@/types/solar-system.types'
import { celestialBodiesConfig } from '@/configs/solar-system.config'
import { CelestialBodyFactory } from '@/factories/CelestialBodyFactory'
import { AxisGridsHelper } from '@/utils/AxisGridsHelper'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

export class SolarSystemService {
  // ! ===== PROPERTIES =====
  // * State & Config
  private config: ISolarSystemConfig
  private state: ISolarSystemState

  // * Performance monitoring -- not intended to be used in production
  private fpsCounter: { value: number }
  private lastTime: number
  private frameCount: number
  private fpsUpdateInterval: number
  private fpsUpdateTime: number

  // ! ===== CONSTRUCTOR =====
  constructor(container: HTMLElement, config: ISolarSystemConfig) {
    // * Initialize configuration
    this.config = config

    // * Initialize performance monitoring
    this.fpsCounter = { value: 0 }
    this.lastTime = performance.now()
    this.frameCount = 0
    this.fpsUpdateInterval = 500 // update fps every 500ms
    this.fpsUpdateTime = this.lastTime

    // * Initialize state
    this.state = this.initializeState(container)
  }

  // ! ===== PUBLIC METHODS =====
  // * Starts the animation
  public startAnimation(): void {
    this.lastTime = performance.now()
    this.fpsUpdateTime = this.lastTime
    this.animate()
  }

  // * Adds axis and grid to a node -- not intended to be used in production
  public addAxisGrid(node: THREE.Object3D, units: number, label: string, folder?: GUI): void {
    const helper = new AxisGridsHelper(node, units)
    if (folder) {
      folder.add(helper, 'visible').name(label)
    }
    else {
      this.state.gui.add(helper, 'visible').name(label)
    }
  }

  // * Handles window resize events if any
  // TODO: Find where it could be useful to implement this (as per 3JS docs)
  // public handleResize(container: HTMLElement): void {
  //   const width = container.clientWidth
  //   const height = container.clientHeight

  //   // Update camera
  //   this.state.camera.aspect = width / height
  //   this.state.camera.updateProjectionMatrix()

  //   // Update renderer
  //   this.state.renderer.setSize(width, height, false)
  // }

  // # Solar System
  public createSolarSystem(): void {
    // * Setup GUI -- not intended to be used in production
    // FPS counter
    const fpsFolder = this.state.gui.addFolder('FPS')
    fpsFolder.add(this.fpsCounter, 'value').name('FPS').listen()

    // * Solar system container
    const solarSystem = new THREE.Object3D()
    this.state.scene.add(solarSystem)
    this.state.objects.push(solarSystem)

    // * Add lights
    this.createLights()

    // * Add Sun
    const sun = CelestialBodyFactory.createSun()
    solarSystem.add(sun)
    this.state.objects.push(sun)

    // * Add Mercury's orbit, trail, and planet
    const mercuryOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.mercury.distance, celestialBodiesConfig.mercury.name)
    solarSystem.add(mercuryOrbit)
    this.state.objects.push(mercuryOrbit)

    const mercuryTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.mercury.distance, celestialBodiesConfig.mercury.name)
    solarSystem.add(mercuryTrail)
    this.state.objects.push(mercuryTrail)

    const mercury = CelestialBodyFactory.createMercury()
    mercury.position.x = celestialBodiesConfig.mercury.distance
    mercuryOrbit.add(mercury)
    this.state.objects.push(mercury)

    // * Add Venus's orbit, trail, and planet
    const venusOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.venus.distance, celestialBodiesConfig.venus.name)
    solarSystem.add(venusOrbit)
    this.state.objects.push(venusOrbit)

    const venusTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.venus.distance, celestialBodiesConfig.venus.name)
    solarSystem.add(venusTrail)
    this.state.objects.push(venusTrail)

    const venus = CelestialBodyFactory.createVenus()
    venus.position.x = celestialBodiesConfig.venus.distance
    venusOrbit.add(venus)
    this.state.objects.push(venus)

    // * Add Earth's orbit, trail, and planet
    const earthOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.earth.distance, celestialBodiesConfig.earth.name)
    solarSystem.add(earthOrbit)
    this.state.objects.push(earthOrbit)

    const earthTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.earth.distance, celestialBodiesConfig.earth.name)
    solarSystem.add(earthTrail)
    this.state.objects.push(earthTrail)

    const earth = CelestialBodyFactory.createEarth()
    earth.position.x = celestialBodiesConfig.earth.distance
    earthOrbit.add(earth)
    this.state.objects.push(earth)

    // * Add Moon's orbit, trail, and planet
    const moonOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.moon.distance, celestialBodiesConfig.moon.name)
    earth.add(moonOrbit)

    const moonTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.moon.distance, celestialBodiesConfig.moon.name)
    earth.add(moonTrail)
    this.state.objects.push(moonTrail)

    const moon = CelestialBodyFactory.createMoon()
    moon.position.x = celestialBodiesConfig.moon.distance
    moonOrbit.add(moon)
    this.state.objects.push(moon)

    // * Add Mars's orbit, trail, and planet
    const marsOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.mars.distance, celestialBodiesConfig.mars.name)
    solarSystem.add(marsOrbit)
    this.state.objects.push(marsOrbit)

    const marsTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.mars.distance, celestialBodiesConfig.mars.name)
    solarSystem.add(marsTrail)
    this.state.objects.push(marsTrail)

    const mars = CelestialBodyFactory.createMars()
    mars.position.x = celestialBodiesConfig.mars.distance
    marsOrbit.add(mars)
    this.state.objects.push(mars)

    // * Add Jupiter's orbit, trail, and planet
    const jupiterOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.jupiter.distance, celestialBodiesConfig.jupiter.name)
    solarSystem.add(jupiterOrbit)
    this.state.objects.push(jupiterOrbit)

    const jupiterTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.jupiter.distance, celestialBodiesConfig.jupiter.name)
    solarSystem.add(jupiterTrail)
    this.state.objects.push(jupiterTrail)

    const jupiter = CelestialBodyFactory.createJupiter()
    jupiter.position.x = celestialBodiesConfig.jupiter.distance
    jupiterOrbit.add(jupiter)
    this.state.objects.push(jupiter)

    // * Add Saturn's orbit, trail, and planet with its rings
    const saturnOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.saturn.distance, celestialBodiesConfig.saturn.name)
    solarSystem.add(saturnOrbit)
    this.state.objects.push(saturnOrbit)

    const saturnTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.saturn.distance, celestialBodiesConfig.saturn.name)
    solarSystem.add(saturnTrail)
    this.state.objects.push(saturnTrail)

    const saturn = CelestialBodyFactory.createSaturnWithRings()
    saturn.position.x = celestialBodiesConfig.saturn.distance
    saturnOrbit.add(saturn)
    this.state.objects.push(saturn)

    // * Add Uranus's orbit, trail, and planet
    const uranusOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.uranus.distance, celestialBodiesConfig.uranus.name)
    solarSystem.add(uranusOrbit)
    this.state.objects.push(uranusOrbit)

    const uranusTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.uranus.distance, celestialBodiesConfig.uranus.name)
    solarSystem.add(uranusTrail)
    this.state.objects.push(uranusTrail)

    const uranus = CelestialBodyFactory.createUranus()
    uranus.position.x = celestialBodiesConfig.uranus.distance
    uranusOrbit.add(uranus)
    this.state.objects.push(uranus)

    // * Add Neptune's orbit, trail, and planet
    const neptuneOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.neptune.distance, celestialBodiesConfig.neptune.name)
    solarSystem.add(neptuneOrbit)
    this.state.objects.push(neptuneOrbit)

    const neptuneTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.neptune.distance, celestialBodiesConfig.neptune.name)
    solarSystem.add(neptuneTrail)
    this.state.objects.push(neptuneTrail)

    const neptune = CelestialBodyFactory.createNeptune()
    neptune.position.x = celestialBodiesConfig.neptune.distance
    neptuneOrbit.add(neptune)
    this.state.objects.push(neptune)

    // * Add Pluto's orbit, trail, and planet
    const plutoOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.pluto.distance, celestialBodiesConfig.pluto.name)
    solarSystem.add(plutoOrbit)
    this.state.objects.push(plutoOrbit)

    const plutoTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.pluto.distance, celestialBodiesConfig.pluto.name)
    solarSystem.add(plutoTrail)
    this.state.objects.push(plutoTrail)

    const pluto = CelestialBodyFactory.createPluto()
    pluto.position.x = celestialBodiesConfig.pluto.distance
    plutoOrbit.add(pluto)
    this.state.objects.push(pluto)

    // * Add orbit visualization controls to GUI
    const orbitFolder = this.state.gui.addFolder('Orbit Visualizations')
    const orbitControls = {
      mercuryOrbit: false,
      venusOrbit: false,
      earthOrbit: false,
      moonOrbit: false,
      marsOrbit: false,
      jupiterOrbit: false,
      saturnOrbit: false,
      uranusOrbit: false,
      neptuneOrbit: false,
      plutoOrbit: false,
    }

    orbitFolder.add(orbitControls, 'mercuryOrbit')
      .name('Mercury Orbit')
      .onChange((value: boolean) => {
        const mercuryOrbit = this.state.objects.find(obj => obj.name === 'orbit-Mercury')
        if (mercuryOrbit?.userData.orbitMesh) {
          mercuryOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'venusOrbit')
      .name('Venus Orbit')
      .onChange((value: boolean) => {
        const venusOrbit = this.state.objects.find(obj => obj.name === 'orbit-Venus')
        if (venusOrbit?.userData.orbitMesh) {
          venusOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'earthOrbit')
      .name('Earth Orbit')
      .onChange((value: boolean) => {
        const earthOrbit = this.state.objects.find(obj => obj.name === 'orbit-Earth')
        if (earthOrbit?.userData.orbitMesh) {
          earthOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'moonOrbit')
      .name('Moon Orbit')
      .onChange((value: boolean) => {
        const earth = this.state.objects.find(obj => obj.name === 'Earth')
        if (earth) {
          const moonOrbit = earth.children.find(child => child.name === 'orbit-Moon')
          if (moonOrbit?.userData.orbitMesh) {
            moonOrbit.userData.orbitMesh.visible = value
          }
        }
      })

    orbitFolder.add(orbitControls, 'marsOrbit')
      .name('Mars Orbit')
      .onChange((value: boolean) => {
        const marsOrbit = this.state.objects.find(obj => obj.name === 'orbit-Mars')
        if (marsOrbit?.userData.orbitMesh) {
          marsOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'jupiterOrbit')
      .name('Jupiter Orbit')
      .onChange((value: boolean) => {
        const jupiterOrbit = this.state.objects.find(obj => obj.name === 'orbit-Jupiter')
        if (jupiterOrbit?.userData.orbitMesh) {
          jupiterOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'saturnOrbit')
      .name('Saturn Orbit')
      .onChange((value: boolean) => {
        const saturnOrbit = this.state.objects.find(obj => obj.name === 'orbit-Saturn')
        if (saturnOrbit?.userData.orbitMesh) {
          saturnOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'uranusOrbit')
      .name('Uranus Orbit')
      .onChange((value: boolean) => {
        const uranusOrbit = this.state.objects.find(obj => obj.name === 'orbit-Uranus')
        if (uranusOrbit?.userData.orbitMesh) {
          uranusOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'neptuneOrbit')
      .name('Neptune Orbit')
      .onChange((value: boolean) => {
        const neptuneOrbit = this.state.objects.find(obj => obj.name === 'orbit-Neptune')
        if (neptuneOrbit?.userData.orbitMesh) {
          neptuneOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'plutoOrbit')
      .name('Pluto Orbit')
      .onChange((value: boolean) => {
        const plutoOrbit = this.state.objects.find(obj => obj.name === 'orbit-Pluto')
        if (plutoOrbit?.userData.orbitMesh) {
          plutoOrbit.userData.orbitMesh.visible = value
        }
      })

    // * Add axis and grid to all objects -- not intended to be used in production
    const axesGridsFolder = this.state.gui.addFolder('Axes & Grids')

    // Planets section
    const planetsFolder = axesGridsFolder.addFolder('Planets')
    this.addAxisGrid(sun, 3, 'Sun', planetsFolder)
    this.addAxisGrid(mercury, 3, 'Mercury', planetsFolder)
    this.addAxisGrid(venus, 3, 'Venus', planetsFolder)
    this.addAxisGrid(earth, 3, 'Earth', planetsFolder)
    this.addAxisGrid(moon, 1, 'Moon', planetsFolder)
    this.addAxisGrid(mars, 3, 'Mars', planetsFolder)
    this.addAxisGrid(jupiter, 3, 'Jupiter', planetsFolder)
    this.addAxisGrid(saturn, 3, 'Saturn', planetsFolder)
    this.addAxisGrid(uranus, 3, 'Uranus', planetsFolder)
    this.addAxisGrid(neptune, 3, 'Neptune', planetsFolder)
    this.addAxisGrid(pluto, 3, 'Pluto', planetsFolder)

    // Orbits section
    const orbitsFolder = axesGridsFolder.addFolder('Orbits')
    this.addAxisGrid(mercuryOrbit, 5, 'Mercury', orbitsFolder)
    this.addAxisGrid(venusOrbit, 5, 'Venus', orbitsFolder)
    this.addAxisGrid(earthOrbit, 5, 'Earth', orbitsFolder)
    this.addAxisGrid(moonOrbit, 3, 'Moon', orbitsFolder)
    this.addAxisGrid(marsOrbit, 5, 'Mars', orbitsFolder)
    this.addAxisGrid(jupiterOrbit, 5, 'Jupiter', orbitsFolder)
    this.addAxisGrid(saturnOrbit, 15, 'Saturn', orbitsFolder)
    this.addAxisGrid(uranusOrbit, 15, 'Uranus', orbitsFolder)
    this.addAxisGrid(neptuneOrbit, 15, 'Neptune', orbitsFolder)
    this.addAxisGrid(plutoOrbit, 15, 'Pluto', orbitsFolder)
  }

  // ! ===== PRIVATE METHODS =====
  // # Main
  // * Initializes the state of the solar system
  private initializeState(container: HTMLElement): ISolarSystemState {
    // create core components
    const renderer = this.createRenderer(container)
    const camera = this.createCamera(container)
    const scene = this.createScene()
    const controls = this.createControls(camera, renderer)
    const gui = new GUI()

    return {
      renderer,
      camera,
      scene,
      controls,
      gui,
      objects: [],
      animationFrameId: 0,
    }
  }

  // * Animation loop
  private animate(): void {
    // step1: calculate time since last frame
    const currentTime = performance.now()
    const deltaTime = (currentTime - this.lastTime) / 1000
    this.lastTime = currentTime

    // step2: update fps counter -- not intended to be used in production
    this.updateFPSCounter(currentTime)

    // step3: animate objects
    this.animateObjects(deltaTime)

    // step4: update controls
    this.state.controls.update()

    // step5: render
    this.state.renderer.render(this.state.scene, this.state.camera)

    // step6: request next frame
    this.state.animationFrameId = requestAnimationFrame(() => this.animate())
  }

  // # Helpers
  // * Creates & configures the renderer
  private createRenderer(container: HTMLElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)

    // add to DOM
    container.appendChild(renderer.domElement)

    return renderer
  }

  // * Creates the camera
  private createCamera(container: HTMLElement): THREE.PerspectiveCamera {
    // calculate aspect ratio
    const aspect = container.clientWidth / container.clientHeight

    const camera = new THREE.PerspectiveCamera(
      this.config.camera.fov,
      aspect,
      this.config.camera.near,
      this.config.camera.far,
    )
    camera.position.copy(this.config.camera.position)
    camera.lookAt(0, 0, 0)

    return camera
  }

  // * Creates random-positioned stars for the scene background
  private createStars(): THREE.Points {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(this.config.stars.count * 3)
    const colors = new Float32Array(this.config.stars.count * 3)

    // Create a sphere of stars around the solar system
    const radius = 30000 // Reduced radius to make stars more visible
    const color = new THREE.Color(this.config.stars.color)

    for (let i = 0; i < this.config.stars.count; i++) {
      // Generate random points on a sphere using spherical coordinates
      const theta = Math.random() * Math.PI * 2 // Random angle around Y axis
      const phi = Math.acos(2 * Math.random() - 1) // Random angle from Y axis
      
      // Convert spherical coordinates to Cartesian
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: this.config.stars.size,
      sizeAttenuation: this.config.stars.sizeAttenuation,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })

    const stars = new THREE.Points(geometry, material)
    stars.name = 'stars' // Name the stars object so we can find it later
    return stars
  }

  // * Creates the scene
  private createScene(): THREE.Scene {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(this.config.background.color)

    // add the stars
    const stars = this.createStars()
    scene.add(stars)
    console.log('Stars added to scene:', stars) // Debug log

    return scene
  }

  // * Creates & configures orbit controls
  private createControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): OrbitControls {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Set camera limits
    controls.minDistance = 5 // Minimum zoom distance
    controls.maxDistance = 27000 // Maximum zoom distance
    controls.maxPolarAngle = Math.PI / 2 // Prevent going below the solar system plane
    controls.minPolarAngle = 0 // Prevent going above the solar system plane

    return controls
  }

  // * Creates lights configuration
  private createLights() {
    // sun light
    const sunLight = new THREE.PointLight(
      this.config.lights.sun.color,
      this.config.lights.sun.intensity,
      this.config.lights.sun.distance,
      this.config.lights.sun.decay,
    )
    sunLight.position.set(0, 0, 0)
    this.state.scene.add(sunLight)

    // ambient light
    const ambientLight = new THREE.AmbientLight(
      this.config.lights.ambient.color,
      this.config.lights.ambient.intensity,
    )
    this.state.scene.add(ambientLight)
  }

  // * Updates the FPS counter -- not intended to be used in production
  private updateFPSCounter(currentTime: number): void {
    // increment frame count
    this.frameCount++

    // update fps every 500ms
    if (currentTime - this.fpsUpdateTime >= this.fpsUpdateInterval) {
      this.fpsCounter.value = Math.round((this.frameCount / (currentTime - this.fpsUpdateTime)) * 500)
      this.frameCount = 0
      this.fpsUpdateTime = currentTime
    }
  }

  // * Animate all objects in the scene
  private animateObjects(deltaTime: number): void {
    // animate the sun
    const sun = this.state.objects.find(object => object.name === 'Sun') as THREE.Object3D
    if (sun) {
      sun.rotation.y += deltaTime * celestialBodiesConfig.sun.selfRotationSpeed
    }

    // animate the mercury orbit and mercury
    const mercuryOrbit = this.state.objects.find(object => object.name === 'orbit-Mercury') as THREE.Object3D
    if (mercuryOrbit) {
      mercuryOrbit.rotation.y += deltaTime * celestialBodiesConfig.mercury.orbitalRotationSpeed
    }

    const mercury = this.state.objects.find(object => object.name === 'Mercury') as THREE.Object3D
    if (mercury) {
      mercury.rotation.y += deltaTime * celestialBodiesConfig.mercury.selfRotationSpeed
    }

    // animate the venus orbit and venus
    const venusOrbit = this.state.objects.find(object => object.name === 'orbit-Venus') as THREE.Object3D
    if (venusOrbit) {
      venusOrbit.rotation.y += deltaTime * celestialBodiesConfig.venus.orbitalRotationSpeed
    }

    const venus = this.state.objects.find(object => object.name === 'Venus') as THREE.Object3D
    if (venus) {
      venus.rotation.y += deltaTime * celestialBodiesConfig.venus.selfRotationSpeed
    }

    // animate the earth orbit and earth
    const earthOrbit = this.state.objects.find(object => object.name === 'orbit-Earth') as THREE.Object3D
    if (earthOrbit) {
      earthOrbit.rotation.y += deltaTime * celestialBodiesConfig.earth.orbitalRotationSpeed
    }

    const earth = this.state.objects.find(object => object.name === 'Earth') as THREE.Object3D
    if (earth) {
      earth.rotation.y += deltaTime * celestialBodiesConfig.earth.selfRotationSpeed
    }

    // animate the moon orbit and moon
    const moonOrbit = this.state.objects.find(object => object.name === 'orbit-Moon') as THREE.Object3D
    if (moonOrbit) {
      moonOrbit.rotation.y += deltaTime * celestialBodiesConfig.moon.orbitalRotationSpeed
    }

    const moon = this.state.objects.find(object => object.name === 'Moon') as THREE.Object3D
    if (moon) {
      moon.rotation.y += deltaTime * celestialBodiesConfig.moon.selfRotationSpeed
    }

    // animate the mars orbit and mars
    const marsOrbit = this.state.objects.find(object => object.name === 'orbit-Mars') as THREE.Object3D
    if (marsOrbit) {
      marsOrbit.rotation.y += deltaTime * celestialBodiesConfig.mars.orbitalRotationSpeed
    }

    const mars = this.state.objects.find(object => object.name === 'Mars') as THREE.Object3D
    if (mars) {
      mars.rotation.y += deltaTime * celestialBodiesConfig.mars.selfRotationSpeed
    }

    // animate the jupiter orbit and jupiter
    const jupiterOrbit = this.state.objects.find(object => object.name === 'orbit-Jupiter') as THREE.Object3D
    if (jupiterOrbit) {
      jupiterOrbit.rotation.y += deltaTime * celestialBodiesConfig.jupiter.orbitalRotationSpeed
    }

    const jupiter = this.state.objects.find(object => object.name === 'Jupiter') as THREE.Object3D
    if (jupiter) {
      jupiter.rotation.y += deltaTime * celestialBodiesConfig.jupiter.selfRotationSpeed
    }

    // animate the saturn orbit and saturn
    const saturnOrbit = this.state.objects.find(object => object.name === 'orbit-Saturn') as THREE.Object3D
    if (saturnOrbit) {
      saturnOrbit.rotation.y += deltaTime * celestialBodiesConfig.saturn.orbitalRotationSpeed
    }

    const saturn = this.state.objects.find(object => object.name === 'Saturn') as THREE.Object3D
    if (saturn) {
      saturn.rotation.y += deltaTime * celestialBodiesConfig.saturn.selfRotationSpeed
    }

    // animate the uranus orbit and uranus
    const uranusOrbit = this.state.objects.find(object => object.name === 'orbit-Uranus') as THREE.Object3D
    if (uranusOrbit) {
      uranusOrbit.rotation.y += deltaTime * celestialBodiesConfig.uranus.orbitalRotationSpeed
    }

    const uranus = this.state.objects.find(object => object.name === 'Uranus') as THREE.Object3D
    if (uranus) {
      uranus.rotation.y += deltaTime * celestialBodiesConfig.uranus.selfRotationSpeed
    }

    // animate the neptune orbit and neptune
    const neptuneOrbit = this.state.objects.find(object => object.name === 'orbit-Neptune') as THREE.Object3D
    if (neptuneOrbit) {
      neptuneOrbit.rotation.y += deltaTime * celestialBodiesConfig.neptune.orbitalRotationSpeed
    }

    const neptune = this.state.objects.find(object => object.name === 'Neptune') as THREE.Object3D
    if (neptune) {
      neptune.rotation.y += deltaTime * celestialBodiesConfig.neptune.selfRotationSpeed
    }

    // animate the pluto orbit and pluto
    const plutoOrbit = this.state.objects.find(object => object.name === 'orbit-Pluto') as THREE.Object3D
    if (plutoOrbit) {
      plutoOrbit.rotation.y += deltaTime * celestialBodiesConfig.pluto.orbitalRotationSpeed
    }

    const pluto = this.state.objects.find(object => object.name === 'Pluto') as THREE.Object3D
    if (pluto) {
      pluto.rotation.y += deltaTime * celestialBodiesConfig.pluto.selfRotationSpeed
    }
  }
}
