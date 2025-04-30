import type { ISolarSystemState } from '@/types/solar-system.types'
import { celestialBodiesConfig } from '@/configs/celestial-bodies.config'
import * as THREE from 'three'

/**
 * AnimationService manages the animation loop and all animated elements in the scene.
 * It handles planet rotations, orbital movements, and performance monitoring.
 * 
 * Responsibilities:
 * 1. Animation loop management
 * 2. FPS monitoring and display
 * 3. Planet rotation animations
 * 4. Orbital movement animations
 */
export class AnimationService {
  private state: ISolarSystemState
  private lastTime: number
  private frameCount: number
  private fpsUpdateInterval: number
  private fpsUpdateTime: number

  constructor(state: ISolarSystemState) {
    this.state = state
    this.lastTime = performance.now()
    this.frameCount = 0
    this.fpsUpdateInterval = 500 // Update FPS counter every 500ms
    this.fpsUpdateTime = this.lastTime
  }

  /**
   * Starts the animation loop
   */
  public startAnimation(): void {
    this.lastTime = performance.now()
    this.fpsUpdateTime = this.lastTime
    this.animate()
  }

  /**
   * Returns the FPS counter object for GUI display
   */
  public getFpsCounter(): { value: number } {
    return this.state.fpsCounter
  }

  /**
   * Main animation loop
   * Handles:
   * - FPS calculation
   * - Planet rotations
   * - Orbital movements
   * - Scene updates
   */
  private animate(): void {
    const currentTime = performance.now()
    const deltaTime = (currentTime - this.lastTime) / 1000
    this.lastTime = currentTime

    this.updateFPSCounter(currentTime)
    this.animateObjects(deltaTime)
    this.state.controls.update()
    this.state.renderer.render(this.state.scene, this.state.camera)
    this.state.animationFrameId = requestAnimationFrame(() => this.animate())
  }

  /**
   * Updates the FPS counter
   */
  private updateFPSCounter(currentTime: number): void {
    this.frameCount++
    if (currentTime - this.fpsUpdateTime >= this.fpsUpdateInterval) {
      this.state.fpsCounter.value = Math.round((this.frameCount / (currentTime - this.fpsUpdateTime)) * 500)
      this.frameCount = 0
      this.fpsUpdateTime = currentTime
    }
  }

  /**
   * Animates all celestial bodies
   * Handles both self-rotation and orbital movement
   */
  private animateObjects(deltaTime: number): void {
    // Animate sun
    const sun = this.state.objects.find(object => object.name === 'Sun') as THREE.Object3D
    if (sun) {
      sun.rotation.y += deltaTime * celestialBodiesConfig.sun.selfRotationSpeed
    }

    // Animate planets
    const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
    planets.forEach(planetName => {
      const planet = this.state.objects.find(object => object.name === planetName) as THREE.Object3D
      const orbit = this.state.objects.find(object => object.name === `orbit-${planetName}`) as THREE.Object3D
      const config = celestialBodiesConfig[planetName.toLowerCase()]

      if (planet) {
        planet.rotation.y += deltaTime * config.selfRotationSpeed
      }
      if (orbit) {
        orbit.rotation.y += deltaTime * config.orbitalRotationSpeed
      }
    })

    // Animate moon
    const earth = this.state.objects.find(object => object.name === 'Earth') as THREE.Object3D
    if (earth) {
      const moonOrbit = earth.children.find(child => child.name === 'orbit-Moon') as THREE.Object3D
      const moon = moonOrbit?.children[0] as THREE.Object3D

      if (moonOrbit) {
        moonOrbit.rotation.y += deltaTime * celestialBodiesConfig.moon.orbitalRotationSpeed
      }
      if (moon) {
        moon.rotation.y += deltaTime * celestialBodiesConfig.moon.selfRotationSpeed
      }
    }
  }
} 
