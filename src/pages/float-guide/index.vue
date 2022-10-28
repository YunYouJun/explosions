<template>
  <div class="w-full h-30">
    <div class="float-guide move" />
  </div>
</template>

<style lang="scss">
.float-guide {
  --float-start-pos-x: 150px;
  --float-start-pos-y: 150px;
  --float-end-pos-x: 80px;
  --float-end-pos-y: 80px;
  --float-bg-url: url(/favicon.svg);
}

@keyframes float-move-animation {
  0% {
    left: var(--float-start-pos-x);
    top: var(--float-start-pos-y);
  }

  100% {
    left: var(--float-end-pos-x);
    top: var(--float-end-pos-y);
  }
}

.float-guide {
  position: absolute;
  left: var(--float-end-pos-x);
  top: var(--float-start-pos-y);

  width: 71px;
  height: 64px;
  background: var(--float-bg-url)
    no-repeat center;
  background-size: contain;
  transform-origin: left top;

  &.move {
    animation: linear 1s infinite alternate float-move-animation;
  }
}
</style>
