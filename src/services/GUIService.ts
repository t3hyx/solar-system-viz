import type { ISolarSystemState } from '@/types/solar-system.types'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { AxisGridsHelper } from '@/utils/AxisGridsHelper'
import * as THREE from 'three'

export class GUIService {
  private state: ISolarSystemState

  constructor(state: ISolarSystemState) {
    this.state = state
  }

  public initializeGUI(): void {
    this.setupFPS()
    this.setupOrbitVisualizations()
    this.setupAxesAndGrids()
  }

  private setupFPS(): void {
    const fpsFolder = this.state.gui.addFolder('Performance')
    fpsFolder.add(this.state.fpsCounter, 'value').name('FPS').listen()
  }

  private setupOrbitVisualizations(): void {
    const orbitFolder = this.state.gui.addFolder('Orbit Visualizations')
    const orbitControls: Record<string, boolean> = {
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

    Object.entries(orbitControls).forEach(([key, _value]) => {
      const planetName = key.replace('Orbit', '')
      orbitFolder.add(orbitControls, key)
        .name(`${planetName} Orbit`)
        .onChange((value: boolean) => {
          if (planetName === 'Moon') {
            const earth = this.state.objects.find(obj => obj.name === 'Earth')
            if (earth) {
              const moonOrbit = earth.children.find(child => child.name === `orbit-${planetName}`)
              if (moonOrbit?.userData.orbitMesh) {
                moonOrbit.userData.orbitMesh.visible = value
              }
            }
          } else {
            const orbit = this.state.objects.find(obj => obj.name === `orbit-${planetName}`)
            if (orbit?.userData.orbitMesh) {
              orbit.userData.orbitMesh.visible = value
            }
          }
        })
    })
  }

  private setupAxesAndGrids(): void {
    const axesGridsFolder = this.state.gui.addFolder('Axes & Grids')

    // Planets section
    const planetsFolder = axesGridsFolder.addFolder('Planets')
    const planets = ['Sun', 'Mercury', 'Venus', 'Earth', 'Moon', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']
    planets.forEach(planetName => {
      const planet = this.state.objects.find(obj => obj.name === planetName)
      if (planet) {
        const units = planetName === 'Moon' ? 1 : 3
        this.addAxisGrid(planet, units, planetName, planetsFolder)
      }
    })

    // Orbits section
    const orbitsFolder = axesGridsFolder.addFolder('Orbits')
    const orbitSizes = {
      Mercury: 5,
      Venus: 5,
      Earth: 5,
      Moon: 3,
      Mars: 5,
      Jupiter: 5,
      Saturn: 15,
      Uranus: 15,
      Neptune: 15,
      Pluto: 15,
    }

    Object.entries(orbitSizes).forEach(([planetName, units]) => {
      if (planetName === 'Moon') {
        const earth = this.state.objects.find(obj => obj.name === 'Earth')
        if (earth) {
          const moonOrbit = earth.children.find(child => child.name === `orbit-${planetName}`)
          if (moonOrbit) {
            this.addAxisGrid(moonOrbit, units, planetName, orbitsFolder)
          }
        }
      } else {
        const orbit = this.state.objects.find(obj => obj.name === `orbit-${planetName}`)
        if (orbit) {
          this.addAxisGrid(orbit, units, planetName, orbitsFolder)
        }
      }
    })
  }

  private addAxisGrid(node: THREE.Object3D, units: number, label: string, folder: GUI): void {
    const helper = new AxisGridsHelper(node, units)
    folder.add(helper, 'visible').name(label)
  }

  public dispose(): void {
    this.state.gui.destroy()
  }
} 
