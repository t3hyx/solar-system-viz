import * as THREE from 'three'

export class AxisGridsHelper {
  private axes: THREE.AxesHelper
  private grid: THREE.GridHelper
  private _visible: boolean = false

  constructor(node: THREE.Object3D, units: number = 10) {
    this.axes = new THREE.AxesHelper()
    this.axes.renderOrder = 2 // render after grids
    this.axes.visible = false

    if (this.axes.material instanceof THREE.Material) {
      this.axes.material.depthTest = false
    }
    // add axes to the node
    node.add(this.axes)

    this.grid = new THREE.GridHelper(units, units)
    this.grid.renderOrder = 1 // render after other objects but before axes
    this.grid.visible = false

    if (this.grid.material instanceof THREE.Material) {
      this.grid.material.depthTest = false
    }
    // add grid to the node
    node.add(this.grid)
  }

  get visible() {
    return this._visible
  }

  set visible(value: boolean) {
    this._visible = value
    this.grid.visible = value
    this.axes.visible = value
  }
}
