import type { ISceneConfig, ISolarSystemState } from '@/types/solar-system.types'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

export class SceneService {
  private config: ISceneConfig
  private state: ISolarSystemState

  constructor(container: HTMLElement, config: ISceneConfig) {
    this.config = config
    this.state = this.initializeState(container)
  }

  public getState(): ISolarSystemState {
    return this.state
  }

  public getScene(): THREE.Scene {
    return this.state.scene
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.state.camera
  }

  public getRenderer(): THREE.WebGLRenderer {
    return this.state.renderer
  }

  public getControls(): OrbitControls {
    return this.state.controls
  }

  public getGUI(): GUI {
    return this.state.gui
  }

  public getObjects(): THREE.Object3D[] {
    return this.state.objects
  }

  public addObject(object: THREE.Object3D): void {
    this.state.objects.push(object)
  }

  public findObject(name: string): THREE.Object3D | undefined {
    return this.state.objects.find(obj => obj.name === name)
  }

  private initializeState(container: HTMLElement): ISolarSystemState {
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
      fpsCounter: { value: 0 },
      gui,
      objects: [],
      animationFrameId: null,
    }
  }

  private createRenderer(container: HTMLElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)
    return renderer
  }

  private createCamera(container: HTMLElement): THREE.PerspectiveCamera {
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

  private createScene(): THREE.Scene {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(this.config.background.color)
    return scene
  }

  private createControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer): OrbitControls {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = this.config.controls.dampingFactor
    controls.minDistance = this.config.controls.minDistance
    controls.maxDistance = this.config.controls.maxDistance
    controls.maxPolarAngle = this.config.controls.maxPolarAngle
    controls.minPolarAngle = this.config.controls.minPolarAngle
    return controls
  }

  public createStars(): THREE.Points {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(this.config.stars.count * 3)
    const colors = new Float32Array(this.config.stars.count * 3)
    const radius = 30000
    const color = new THREE.Color(this.config.stars.color)

    for (let i = 0; i < this.config.stars.count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
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
    stars.name = 'stars'
    return stars
  }

  public createLights(): void {
    const sunLight = new THREE.PointLight(
      this.config.lights.sun.color,
      this.config.lights.sun.intensity,
      this.config.lights.sun.distance,
      this.config.lights.sun.decay,
    )
    sunLight.position.set(0, 0, 0)
    this.state.scene.add(sunLight)

    const ambientLight = new THREE.AmbientLight(
      this.config.lights.ambient.color,
      this.config.lights.ambient.intensity,
    )
    this.state.scene.add(ambientLight)
  }
} 
