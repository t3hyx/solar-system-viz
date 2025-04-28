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
  public addAxisGrid(node: THREE.Object3D, units: number, label: string): void {
    const helper = new AxisGridsHelper(node, units)
    this.state.gui.add(helper, 'visible').name(label)
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

    // * Add Earth's orbit, and Earth planet on it
    const earthOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.earth.distance, celestialBodiesConfig.earth.name)
    solarSystem.add(earthOrbit)
    this.state.objects.push(earthOrbit)

    const earth = CelestialBodyFactory.createEarth()
    earth.position.x = celestialBodiesConfig.earth.distance
    earthOrbit.add(earth)
    this.state.objects.push(earth)

    // * Add Moon's orbit, and Moon planet on it
    const moonOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.moon.distance, celestialBodiesConfig.moon.name)
    earth.add(moonOrbit) // Attach moon orbit to Earth (not Earth's orbit)

    const moon = CelestialBodyFactory.createMoon()
    moon.position.x = celestialBodiesConfig.moon.distance
    moonOrbit.add(moon)
    this.state.objects.push(moon)

    // * Add Saturn's orbit, and Saturn with its rings, on it
    const saturnOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.saturn.distance, celestialBodiesConfig.saturn.name)
    solarSystem.add(saturnOrbit)
    this.state.objects.push(saturnOrbit)

    const saturn = CelestialBodyFactory.createSaturnWithRings() // edge-case: Saturn is a group because of its rings
    saturn.position.x = celestialBodiesConfig.saturn.distance
    saturnOrbit.add(saturn)
    this.state.objects.push(saturn)

    // * Add orbit visualization controls to GUI
    const orbitFolder = this.state.gui.addFolder('Orbit Visualizations')
    const orbitControls = {
      earthOrbit: true,
      moonOrbit: true,
      saturnOrbit: true,
    }

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
        // Find Earth first
        const earth = this.state.objects.find(obj => obj.name === 'Earth')
        if (earth) {
          // Find Moon orbit among Earth's children
          const moonOrbit = earth.children.find(child => child.name === 'orbit-Moon')
          if (moonOrbit?.userData.orbitMesh) {
            moonOrbit.userData.orbitMesh.visible = value
          }
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

    // * Add axis and grid to all objects -- not intended to be used in production
    this.addAxisGrid(solarSystem, 100, '-- Solar System --')
    this.addAxisGrid(sun, 3, 'Sun')
    this.addAxisGrid(earth, 3, 'Earth')
    this.addAxisGrid(moon, 1, 'Moon')
    this.addAxisGrid(saturn, 10, 'Saturn')
    this.addAxisGrid(earthOrbit, 5, 'orbit-Earth')
    this.addAxisGrid(moonOrbit, 3, 'orbit-Moon')
    this.addAxisGrid(saturnOrbit, 15, 'orbit-Saturn')
  }

  // ! ===== PRIVATE METHODS =====
  // # Main
  // * Initializes the state of the solar system
  private initializeState(container: HTMLElement): ISolarSystemState {
    // Create core components
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
    // step3: animate animateObjects
    this.animateObjects(deltaTime)
    // step4: update controls
    this.state.controls.update()
    // step5: render
    this.state.renderer.render(this.state.scene, this.state.camera)
    // step6: request next frame
    this.state.animationFrameId = requestAnimationFrame(() => this.animate())
    // console.log('animation is running')
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
  private createStars() {
    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({
      color: this.config.stars.color,
      size: this.config.stars.size,
      sizeAttenuation: this.config.stars.sizeAttenuation,
    })

    const starsVertices = []
    for (let i = 0; i < this.config.stars.count; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() - 0.5) * 2000
      starsVertices.push(x, y, z)
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3))
    const stars = new THREE.Points(starsGeometry, starsMaterial)

    return stars
  }

  // * Creates the scene
  private createScene(): THREE.Scene {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(this.config.background.color)

    // add the stars
    scene.add(this.createStars())

    return scene
  }

  // * Creates & configures orbit controls
  private createControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): OrbitControls {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

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

    // animate the saturn orbit and saturn
    const saturnOrbit = this.state.objects.find(object => object.name === 'orbit-Saturn') as THREE.Object3D
    if (saturnOrbit) {
      saturnOrbit.rotation.y += deltaTime * celestialBodiesConfig.saturn.orbitalRotationSpeed
    }

    const saturn = this.state.objects.find(object => object.name === 'Saturn') as THREE.Object3D
    if (saturn) {
      saturn.rotation.y += deltaTime * celestialBodiesConfig.saturn.selfRotationSpeed
    }
  }
}
