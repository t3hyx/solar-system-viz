<script setup>
import GuiCollapsibleMenu from '../components/GUI/GuiCollapsibleMenu.vue'
import GuiDate from '../components/GUI/GuiDate.vue'
import GuiHours from '../components/GUI/GuiHours.vue'
import GuiProgress from '../components/GUI/GuiProgress.vue'
import GuiTarget from '../components/GUI/GuiTarget.vue'
</script>

<template>
  <div class="gui-layout-container">
    <div class="gui-layout-upper-side">
      <GuiTarget />
      <GuiCollapsibleMenu />
    </div>
    <div class="gui-layout-lower-side">
      <GuiHours />
      <GuiProgress />
      <GuiDate />
    </div>
  </div>
</template>

<style>
.gui-layout-container {
  position: fixed;
  width: 100%;
  height: 100%;
}

.gui-layout-upper-side {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
}

.gui-layout-lower-side {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
}
</style>
