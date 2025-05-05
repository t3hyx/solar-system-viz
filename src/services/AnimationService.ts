import type { ISolarSystemState } from '@/types/solar-system.types'
import { celestialBodiesConfig } from '@/configs/celestial-bodies.config'

/**
 * # AnimationService manages the animation loop and all animated elements in the scene.
 * # It handles planet rotations, orbital movements, and performance monitoring.
 *
 * ? Responsibilities:
 * ? 1. Animation loop management
 * ? 2. FPS monitoring and display
 * ? 3. Planet rotation animations
 * ? 4. Orbital movement animations
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
    this.fpsUpdateInterval = 500 // update FPS counter every 500ms
    this.fpsUpdateTime = this.lastTime
  }

  // * Starts the animation loop
  public startAnimation(): void {
    this.lastTime = performance.now()
    this.fpsUpdateTime = this.lastTime
    this.animate()
  }

  // * Returns the FPS counter object for GUI display
  public getFpsCounter(): { value: number } {
    return this.state.fpsCounter
  }

  /**
   * # Main animation loop
   * ? Handles:
   * ? - FPS calculation
   * ? - Planet rotations
   * ? - Orbital movements
   * ? - Scene updates
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

  // * Updates the FPS counter
  private updateFPSCounter(currentTime: number): void {
    this.frameCount++
    if (currentTime - this.fpsUpdateTime >= this.fpsUpdateInterval) {
      this.state.fpsCounter.value = Math.round((this.frameCount / (currentTime - this.fpsUpdateTime)) * 500)
      this.frameCount = 0
      this.fpsUpdateTime = currentTime
    }
  }

  // * Animates all celestial bodies (self-rotation, orbital movement)
  private animateObjects(deltaTime: number): void {
    // update sun rotation
    const sun = this.state.objects.find(obj => obj.name === 'Sun')
    if (sun) {
      sun.rotation.y += deltaTime * celestialBodiesConfig.sun.rotationSpeed
    }

    // update planet rotations and orbits
    for (const planet of this.state.objects.filter(obj => obj.name !== 'Sun' && obj.name !== 'Moon')) {
      const config = celestialBodiesConfig[planet.name.toLowerCase()]
      if (config) {
        // update planet rotation
        planet.rotation.y += deltaTime * config.rotationSpeed

        // update planet orbit rotation
        const orbit = planet.parent
        if (orbit) {
          orbit.rotation.y += deltaTime * config.orbitSpeed
        }
      }
    }

    // update moon rotation and orbit
    const moon = this.state.objects.find(obj => obj.name === 'Moon')
    if (moon) {
      const moonOrbit = moon.parent
      if (moonOrbit) {
        moonOrbit.rotation.y += deltaTime * celestialBodiesConfig.moon.orbitSpeed
      }
      moon.rotation.y += deltaTime * celestialBodiesConfig.moon.rotationSpeed
    }
  }
}
