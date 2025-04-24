import * as THREE from 'three'

export class AxisGridsHelper {
  private axes: THREE.AxesHelper

  constructor(node: THREE.Object3D) {
    this.axes = new THREE.AxesHelper()
    this.axes.renderOrder = 1 // render after other objects
    this.axes.visible = true

    if (this.axes.material instanceof THREE.Material) {
      this.axes.material.depthTest = false
    }
    // add axes to the node
    node.add(this.axes)
  }
}
