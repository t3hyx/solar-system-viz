<script setup lang="ts">

</script>

<template>
  <div class="gui-target-container">
    <div class="trapezoid-shape">
      <svg
        width="100%"
        height="100%"
        version="1.1"
        viewBox="0 0 105.83 28.84"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m0.88305 0.88305h104.2l-12.657 27.08h-78.886z" fill="none" stroke="white" stroke-linecap="round" stroke-width=".79375" />
      </svg>
      <div class="text-content">
        <p>Target</p>
        <p>No target</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gui-target-container {
  margin: 10px;
  color: #fff;
  align-self: flex-start;
}

.trapezoid-shape {
  position: relative;
  width: 300px; /* Base size */
  height: 80px; /* Base size */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive shape sizes */
@media (max-width: 768px) {
  .trapezoid-shape {
    width: 200px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .trapezoid-shape {
    width: 150px;
    height: 45px;
  }
}

.text-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1em;
}

/* Responsive font sizes */
@media (max-width: 768px) {
  .text-content {
    font-size: 0.8em;
  }
}

@media (max-width: 480px) {
  .text-content {
    font-size: 0.6em;
  }
}
</style>
