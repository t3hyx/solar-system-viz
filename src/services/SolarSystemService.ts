import type * as THREE from 'three'
import type { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { sceneConfig } from '@/configs/scene.config'
import { AnimationService } from '@/services/AnimationService'
import { CelestialBodyService } from '@/services/CelestialBodyService'
import { GUIService } from '@/services/GUIService'
import { SceneService } from '@/services/SceneService'
import { AxisGridsHelper } from '@/utils/AxisGridsHelper'

/**
 * # SolarSystemService is the main orchestrator of the solar system visualization.
 * # It coordinates all other services and manages the overall application lifecycle.
 *
 * ? Responsibilities:
 * ? 1. Initializes and coordinates all other services
 * ? 2. Manages the creation and setup of the solar system
 * ? 3. Provides high-level control over the visualization
 */
export class SolarSystemService {
  private sceneService: SceneService
  private animationService: AnimationService
  private guiService: GUIService
  private celestialBodyService: CelestialBodyService

  constructor(container: HTMLElement) {
    // initialize services in dependency order
    this.sceneService = new SceneService(container, sceneConfig)
    const state = this.sceneService.getState()
    this.animationService = new AnimationService(state)
    this.guiService = new GUIService(state)
    this.celestialBodyService = new CelestialBodyService()

    // setup scene with stars and lighting
    const stars = this.sceneService.createStars()
    this.sceneService.getScene().add(stars)
    this.sceneService.createLights()

    // create the solar system with all celestial bodies
    this.initializeSolarSystem()

    // initialize the GUI controls
    this.guiService.initializeGUI()
  }

  private async initializeSolarSystem(): Promise<void> {
    try {
      const solarSystem = await this.celestialBodyService.createSolarSystem()
      this.sceneService.getScene().add(solarSystem)
      this.sceneService.getState().objects.push(solarSystem)
    }
    catch (error) {
      console.error('Error initializing solar system:', error)
    }
  }

  public startAnimation(): void {
    this.animationService.startAnimation()
  }

  public addAxisGrid(node: THREE.Object3D, units: number, label: string, folder?: GUI): void {
    const helper = new AxisGridsHelper(node, units)
    if (folder) {
      folder.add(helper, 'visible').name(label)
    }
    else {
      this.sceneService.getState().gui.add(helper, 'visible').name(label)
    }
  }
}
