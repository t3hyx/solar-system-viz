import type { ISolarSystemState } from '@/types/solar-system.types'
import * as THREE from 'three'

/**
 * GUIService manages the dat.GUI interface for controlling the solar system visualization.
 * It provides controls for:
 * - Performance monitoring (FPS)
 * - Planet-specific helpers (axes, orbits)
 * 
 * The service uses a single GUI instance from the application state to prevent duplication.
 */
export class GUIService {
  private state: ISolarSystemState

  constructor(state: ISolarSystemState) {
    this.state = state
  }

  /**
   * Initializes all GUI controls and folders
   * Called by SolarSystemService after scene setup
   */
  public initializeGUI(): void {
    this.setupPerformanceControls()
    this.setupPlanetHelpers()
  }

  /**
   * Sets up performance monitoring controls
   * Creates a folder for FPS display
   */
  private setupPerformanceControls(): void {
    const performanceFolder = this.state.gui.addFolder('Performance')
    performanceFolder.add(this.state.fpsCounter, 'value').name('FPS').listen()
  }

  /**
   * Sets up planet-specific helpers and controls
   * Creates folders for each planet with their respective axes and orbit controls
   */
  private setupPlanetHelpers(): void {
    const helpersFolder = this.state.gui.addFolder('Helpers')
    const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']

    planets.forEach((planetName: string) => {
      const planetFolder = helpersFolder.addFolder(planetName)
      const planet = this.state.objects.find((object: THREE.Object3D) => object.name === planetName)
      const orbit = this.state.objects.find((object: THREE.Object3D) => object.name === `orbit-${planetName}`)

      // Setup planet axes
      if (planet) {
        // Add axes helper if it doesn't exist
        if (!planet.children.some(child => child instanceof THREE.AxesHelper)) {
          const axesHelper = new THREE.AxesHelper(3)
          planet.add(axesHelper)
        }
        const axes = planet.children.find((child: THREE.Object3D) => child instanceof THREE.AxesHelper)
        if (axes) {
          const axesControl = { visible: false }
          axes.visible = false
          planetFolder
            .add(axesControl, 'visible')
            .name('Axes')
            .onChange((value: boolean) => {
              axes.visible = value
            })
        }
      }

      // Setup orbit and orbit axes
      if (orbit) {
        // Add orbit axes helper if it doesn't exist
        if (!orbit.children.some(child => child instanceof THREE.AxesHelper)) {
          const axesHelper = new THREE.AxesHelper(5)
          orbit.add(axesHelper)
        }
        const orbitAxes = orbit.children.find((child: THREE.Object3D) => child instanceof THREE.AxesHelper)
        if (orbitAxes) {
          const orbitAxesControl = { visible: false }
          orbitAxes.visible = false
          planetFolder
            .add(orbitAxesControl, 'visible')
            .name('Orbit Axes')
            .onChange((value: boolean) => {
              orbitAxes.visible = value
            })
        }

        // Setup orbit visibility
        if (orbit.userData.orbitMesh) {
          const orbitControl = { visible: false }
          orbit.userData.orbitMesh.visible = false
          planetFolder
            .add(orbitControl, 'visible')
            .name('Orbit')
            .onChange((value: boolean) => {
              orbit.userData.orbitMesh.visible = value
            })
        }
      }

      // Special handling for Earth's moon
      if (planetName === 'Earth') {
        const earth = this.state.objects.find((object: THREE.Object3D) => object.name === 'Earth')
        if (earth) {
          const moonOrbit = earth.children.find((child: THREE.Object3D) => child.name === 'orbit-Moon')
          if (moonOrbit) {
            const moonFolder = planetFolder.addFolder('Moon')
            const moon = moonOrbit.children[0]

            // Setup moon axes
            if (moon) {
              if (!moon.children.some(child => child instanceof THREE.AxesHelper)) {
                const axesHelper = new THREE.AxesHelper(1)
                moon.add(axesHelper)
              }
              const moonAxes = moon.children.find((child: THREE.Object3D) => child instanceof THREE.AxesHelper)
              if (moonAxes) {
                const moonAxesControl = { visible: false }
                moonAxes.visible = false
                moonFolder
                  .add(moonAxesControl, 'visible')
                  .name('Axes')
                  .onChange((value: boolean) => {
                    moonAxes.visible = value
                  })
              }
            }

            // Setup moon orbit axes
            if (!moonOrbit.children.some(child => child instanceof THREE.AxesHelper)) {
              const axesHelper = new THREE.AxesHelper(3)
              moonOrbit.add(axesHelper)
            }
            const moonOrbitAxes = moonOrbit.children.find((child: THREE.Object3D) => child instanceof THREE.AxesHelper)
            if (moonOrbitAxes) {
              const moonOrbitAxesControl = { visible: false }
              moonOrbitAxes.visible = false
              moonFolder
                .add(moonOrbitAxesControl, 'visible')
                .name('Orbit Axes')
                .onChange((value: boolean) => {
                  moonOrbitAxes.visible = value
                })
            }

            // Setup moon orbit visibility
            if (moonOrbit.userData.orbitMesh) {
              const moonOrbitControl = { visible: false }
              moonOrbit.userData.orbitMesh.visible = false
              moonFolder
                .add(moonOrbitControl, 'visible')
                .name('Orbit')
                .onChange((value: boolean) => {
                  moonOrbit.userData.orbitMesh.visible = value
                })
            }
          }
        }
      }
    })
  }

  /**
   * Cleans up the GUI instance
   */
  public dispose(): void {
    this.state.gui.destroy()
  }
} 
