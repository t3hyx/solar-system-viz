import type { ISolarSystemConfig, ISolarSystemState } from '@/types/solar-system.types'
import { celestialBodiesConfig } from '@/configs/solar-system.config'
import { CelestialBodyFactory } from '@/factories/CelestialBodyFactory'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export class SolarSystemService {
  // ! ===== PROPERTIES =====
  // * State & Config
  private config: ISolarSystemConfig
  private state: ISolarSystemState

  // ! ===== CONSTRUCTOR =====
  constructor(container: HTMLElement, config: ISolarSystemConfig) {
    this.config = config
    this.state = this.initializeState(container)
  }

  // ! ===== PUBLIC METHODS =====
  // * Starts the animation
  public startAnimation(): void {
    this.animate()
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
    // * Solar system container
    const solarSystem = new THREE.Object3D()
    this.state.scene.add(solarSystem)
    this.state.objects.push(solarSystem)

    // * Add lights
    this.createLights()

    // * Add Sun
    const sun = CelestialBodyFactory.createSun()
    this.state.scene.add(sun)
    this.state.objects.push(sun)

    // * Add Earth's orbit and Earth on it
    const earthOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.earth.distance)
    this.state.scene.add(earthOrbit)
    this.state.objects.push(earthOrbit)

    const earth = CelestialBodyFactory.createEarth()
    earthOrbit.add(earth)
    this.state.objects.push(earth)
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

    return {
      renderer,
      camera,
      scene,
      controls,
      objects: [],
      animationFrameId: 0,
    }
  }

  // * Animation loop
  private animate(): void {
    // step1: update controls
    this.state.controls.update()
    // step2: render
    this.state.renderer.render(this.state.scene, this.state.camera)
    // step3: request next frame
    this.state.animationFrameId = requestAnimationFrame(() => this.animate())
  }

  // # Helpers
  // * Creates & configures the renderer
  private createRenderer(container: HTMLElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)

    // Add to DOM
    container.appendChild(renderer.domElement)

    return renderer
  }

  // * Creates the camera
  private createCamera(container: HTMLElement): THREE.PerspectiveCamera {
    // Calculate aspect ratio
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

    // Add the stars
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
    // Sun Light
    const sunLight = new THREE.PointLight(
      this.config.lights.sun.color,
      this.config.lights.sun.intensity,
      this.config.lights.sun.distance,
      this.config.lights.sun.decay,
    )
    sunLight.position.set(0, 0, 0)
    this.state.scene.add(sunLight)

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(
      this.config.lights.ambient.color,
      this.config.lights.ambient.intensity,
    )
    this.state.scene.add(ambientLight)
  }
}
