import type { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { sceneConfig } from '@/configs/scene.config'
import { celestialBodiesConfig } from '@/configs/solar-system.config'
import { CelestialBodyFactory } from '@/factories/CelestialBodyFactory'
import { AxisGridsHelper } from '@/utils/AxisGridsHelper'
import * as THREE from 'three'
import { AnimationService } from './AnimationService'
import { CelestialBodyService } from './CelestialBodyService'
import { GUIService } from './GUIService'
import { SceneService } from './SceneService'

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
    this.celestialBodyService = new CelestialBodyService(state)

    // setup scene with stars and lighting
    const stars = this.sceneService.createStars()
    this.sceneService.getScene().add(stars)
    this.sceneService.createLights()

    // create the solar system with all celestial bodies
    this.celestialBodyService.createSolarSystem()

    // initialize the GUI controls
    this.guiService.initializeGUI()
  }

  // * Starts the animation loop for the solar system
  public startAnimation(): void {
    this.animationService.startAnimation()
  }

  /**
   * Adds axis and grid helpers to a node for debugging purposes
   * @param node - The 3D object to add helpers to
   * @param units - Size of the grid
   * @param label - Label for the GUI control
   * @param folder - Optional GUI folder to add the control to
   */
  public addAxisGrid(node: THREE.Object3D, units: number, label: string, folder?: GUI): void {
    const helper = new AxisGridsHelper(node, units)
    if (folder) {
      folder.add(helper, 'visible').name(label)
    }
    else {
      this.sceneService.getState().gui.add(helper, 'visible').name(label)
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
    // * Solar system container
    const solarSystem = new THREE.Object3D()
    this.sceneService.getScene().add(solarSystem)
    this.sceneService.getState().objects.push(solarSystem)

    // * Add lights
    this.sceneService.createLights()

    // * Add Sun
    const sun = CelestialBodyFactory.createSun()
    solarSystem.add(sun)
    this.sceneService.getState().objects.push(sun)

    // * Add Mercury's orbit, trail, and planet
    const mercuryOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.mercury.distance, celestialBodiesConfig.mercury.name)
    solarSystem.add(mercuryOrbit)
    this.sceneService.getState().objects.push(mercuryOrbit)

    const mercuryTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.mercury.distance, celestialBodiesConfig.mercury.name)
    solarSystem.add(mercuryTrail)
    this.sceneService.getState().objects.push(mercuryTrail)

    const mercury = CelestialBodyFactory.createMercury()
    mercury.position.x = celestialBodiesConfig.mercury.distance
    mercuryOrbit.add(mercury)
    this.sceneService.getState().objects.push(mercury)

    // * Add Venus's orbit, trail, and planet
    const venusOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.venus.distance, celestialBodiesConfig.venus.name)
    solarSystem.add(venusOrbit)
    this.sceneService.getState().objects.push(venusOrbit)

    const venusTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.venus.distance, celestialBodiesConfig.venus.name)
    solarSystem.add(venusTrail)
    this.sceneService.getState().objects.push(venusTrail)

    const venus = CelestialBodyFactory.createVenus()
    venus.position.x = celestialBodiesConfig.venus.distance
    venusOrbit.add(venus)
    this.sceneService.getState().objects.push(venus)

    // * Add Earth's orbit, trail, and planet
    const earthOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.earth.distance, celestialBodiesConfig.earth.name)
    solarSystem.add(earthOrbit)
    this.sceneService.getState().objects.push(earthOrbit)

    const earthTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.earth.distance, celestialBodiesConfig.earth.name)
    solarSystem.add(earthTrail)
    this.sceneService.getState().objects.push(earthTrail)

    const earth = CelestialBodyFactory.createEarth()
    earth.position.x = celestialBodiesConfig.earth.distance
    earthOrbit.add(earth)
    this.sceneService.getState().objects.push(earth)

    // * Add Moon's orbit, trail, and planet
    const moonOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.moon.distance, celestialBodiesConfig.moon.name)
    earth.add(moonOrbit)

    const moonTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.moon.distance, celestialBodiesConfig.moon.name)
    earth.add(moonTrail)
    this.sceneService.getState().objects.push(moonTrail)

    const moon = CelestialBodyFactory.createMoon()
    moon.position.x = celestialBodiesConfig.moon.distance
    moonOrbit.add(moon)
    this.sceneService.getState().objects.push(moon)

    // * Add Mars's orbit, trail, and planet
    const marsOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.mars.distance, celestialBodiesConfig.mars.name)
    solarSystem.add(marsOrbit)
    this.sceneService.getState().objects.push(marsOrbit)

    const marsTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.mars.distance, celestialBodiesConfig.mars.name)
    solarSystem.add(marsTrail)
    this.sceneService.getState().objects.push(marsTrail)

    const mars = CelestialBodyFactory.createMars()
    mars.position.x = celestialBodiesConfig.mars.distance
    marsOrbit.add(mars)
    this.sceneService.getState().objects.push(mars)

    // * Add Jupiter's orbit, trail, and planet
    const jupiterOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.jupiter.distance, celestialBodiesConfig.jupiter.name)
    solarSystem.add(jupiterOrbit)
    this.sceneService.getState().objects.push(jupiterOrbit)

    const jupiterTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.jupiter.distance, celestialBodiesConfig.jupiter.name)
    solarSystem.add(jupiterTrail)
    this.sceneService.getState().objects.push(jupiterTrail)

    const jupiter = CelestialBodyFactory.createJupiter()
    jupiter.position.x = celestialBodiesConfig.jupiter.distance
    jupiterOrbit.add(jupiter)
    this.sceneService.getState().objects.push(jupiter)

    // * Add Saturn's orbit, trail, and planet with its rings
    const saturnOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.saturn.distance, celestialBodiesConfig.saturn.name)
    solarSystem.add(saturnOrbit)
    this.sceneService.getState().objects.push(saturnOrbit)

    const saturnTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.saturn.distance, celestialBodiesConfig.saturn.name)
    solarSystem.add(saturnTrail)
    this.sceneService.getState().objects.push(saturnTrail)

    const saturn = CelestialBodyFactory.createSaturnWithRings()
    saturn.position.x = celestialBodiesConfig.saturn.distance
    saturnOrbit.add(saturn)
    this.sceneService.getState().objects.push(saturn)

    // * Add Uranus's orbit, trail, and planet
    const uranusOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.uranus.distance, celestialBodiesConfig.uranus.name)
    solarSystem.add(uranusOrbit)
    this.sceneService.getState().objects.push(uranusOrbit)

    const uranusTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.uranus.distance, celestialBodiesConfig.uranus.name)
    solarSystem.add(uranusTrail)
    this.sceneService.getState().objects.push(uranusTrail)

    const uranus = CelestialBodyFactory.createUranus()
    uranus.position.x = celestialBodiesConfig.uranus.distance
    uranusOrbit.add(uranus)
    this.sceneService.getState().objects.push(uranus)

    // * Add Neptune's orbit, trail, and planet
    const neptuneOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.neptune.distance, celestialBodiesConfig.neptune.name)
    solarSystem.add(neptuneOrbit)
    this.sceneService.getState().objects.push(neptuneOrbit)

    const neptuneTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.neptune.distance, celestialBodiesConfig.neptune.name)
    solarSystem.add(neptuneTrail)
    this.sceneService.getState().objects.push(neptuneTrail)

    const neptune = CelestialBodyFactory.createNeptune()
    neptune.position.x = celestialBodiesConfig.neptune.distance
    neptuneOrbit.add(neptune)
    this.sceneService.getState().objects.push(neptune)

    // * Add Pluto's orbit, trail, and planet
    const plutoOrbit = CelestialBodyFactory.createOrbit(celestialBodiesConfig.pluto.distance, celestialBodiesConfig.pluto.name)
    solarSystem.add(plutoOrbit)
    this.sceneService.getState().objects.push(plutoOrbit)

    const plutoTrail = CelestialBodyFactory.createOrbitTrail(celestialBodiesConfig.pluto.distance, celestialBodiesConfig.pluto.name)
    solarSystem.add(plutoTrail)
    this.sceneService.getState().objects.push(plutoTrail)

    const pluto = CelestialBodyFactory.createPluto()
    pluto.position.x = celestialBodiesConfig.pluto.distance
    plutoOrbit.add(pluto)
    this.sceneService.getState().objects.push(pluto)

    // * Add orbit visualization controls to GUI
    const orbitFolder = this.sceneService.getState().gui.addFolder('Orbit Visualizations')
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
        const mercuryOrbit = this.sceneService.getState().objects.find(obj => obj.name === 'orbit-Mercury')
        if (mercuryOrbit?.userData.orbitMesh) {
          mercuryOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'venusOrbit')
      .name('Venus Orbit')
      .onChange((value: boolean) => {
        const venusOrbit = this.sceneService.getState().objects.find(obj => obj.name === 'orbit-Venus')
        if (venusOrbit?.userData.orbitMesh) {
          venusOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'earthOrbit')
      .name('Earth Orbit')
      .onChange((value: boolean) => {
        const earthOrbit = this.sceneService.getState().objects.find(obj => obj.name === 'orbit-Earth')
        if (earthOrbit?.userData.orbitMesh) {
          earthOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'moonOrbit')
      .name('Moon Orbit')
      .onChange((value: boolean) => {
        const earth = this.sceneService.getState().objects.find(obj => obj.name === 'Earth')
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
        const marsOrbit = this.sceneService.getState().objects.find(obj => obj.name === 'orbit-Mars')
        if (marsOrbit?.userData.orbitMesh) {
          marsOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'jupiterOrbit')
      .name('Jupiter Orbit')
      .onChange((value: boolean) => {
        const jupiterOrbit = this.sceneService.getState().objects.find(obj => obj.name === 'orbit-Jupiter')
        if (jupiterOrbit?.userData.orbitMesh) {
          jupiterOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'saturnOrbit')
      .name('Saturn Orbit')
      .onChange((value: boolean) => {
        const saturnOrbit = this.sceneService.getState().objects.find(obj => obj.name === 'orbit-Saturn')
        if (saturnOrbit?.userData.orbitMesh) {
          saturnOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'uranusOrbit')
      .name('Uranus Orbit')
      .onChange((value: boolean) => {
        const uranusOrbit = this.sceneService.getState().objects.find(obj => obj.name === 'orbit-Uranus')
        if (uranusOrbit?.userData.orbitMesh) {
          uranusOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'neptuneOrbit')
      .name('Neptune Orbit')
      .onChange((value: boolean) => {
        const neptuneOrbit = this.sceneService.getState().objects.find(obj => obj.name === 'orbit-Neptune')
        if (neptuneOrbit?.userData.orbitMesh) {
          neptuneOrbit.userData.orbitMesh.visible = value
        }
      })

    orbitFolder.add(orbitControls, 'plutoOrbit')
      .name('Pluto Orbit')
      .onChange((value: boolean) => {
        const plutoOrbit = this.sceneService.getState().objects.find(obj => obj.name === 'orbit-Pluto')
        if (plutoOrbit?.userData.orbitMesh) {
          plutoOrbit.userData.orbitMesh.visible = value
        }
      })

    // * Add axis and grid to all objects -- not intended to be used in production
    const axesGridsFolder = this.sceneService.getState().gui.addFolder('Axes & Grids')

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
}
