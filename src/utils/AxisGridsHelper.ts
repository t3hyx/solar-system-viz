import * as THREE from 'three'

export class AxisGridsHelper {
  private axes: THREE.AxesHelper
  private grid: THREE.GridHelper

  constructor(node: THREE.Object3D, units: number = 10) {
    this.axes = new THREE.AxesHelper()
    this.axes.renderOrder = 2 // render after grids
    this.axes.visible = true

    if (this.axes.material instanceof THREE.Material) {
      this.axes.material.depthTest = false
    }
    // add axes to the node
    node.add(this.axes)

    this.grid = new THREE.GridHelper(units, units)
    this.grid.renderOrder = 1 // render after other objects but before axes
    this.grid.visible = true

    if (this.grid.material instanceof THREE.Material) {
      this.grid.material.depthTest = false
    }
    // add grid to the node
    node.add(this.grid)
  }
}
