<script lang="ts" setup>
// 行
const rows = ref(25)
// 列
const cols = ref(25)
// 500ms 时间间隔
const interval = ref(250)

// to clear interval
const intervalId = ref()

const lifeGrid = ref<boolean[][]>(new Array(rows.value).fill(new Array(cols.value).fill(false)))

const containerStyle = computed(() => ({
  gridTemplateColumns: `repeat(${cols.value}, minmax(0, 1fr))`,
  gridTemplateRows: `repeat(${rows.value}, minmax(0, 1fr))`,
}))

const isAlive = (x: number, y: number) => Boolean(lifeGrid.value[y] && lifeGrid.value[y][x])

const surroundingGrid = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
]

function nextLife(x: number, y: number, isSelfAlive: boolean) {
  let count = 0
  surroundingGrid.forEach((item) => {
    count += Number(isAlive(x + item[0], y + item[1]))
  })
  return count === 3 || (isSelfAlive && count === 2)
}

/**
 * 生成随机生命
 */
function generateRandomLife() {
  lifeGrid.value = new Array(rows.value).fill(null).map(_r =>
    new Array(cols.value).fill(null).map(_c => Math.random() > 0.5),
  )
}

function startLife() {
  intervalId.value = setInterval(() => {
    lifeGrid.value = lifeGrid.value.map((rows, i) => (rows.map((item, j) => nextLife(j, i, item))))
  }, interval.value)
}

function pauseLife() {
  clearInterval(intervalId.value)
  intervalId.value = null
}

function resetLife() {
  lifeGrid.value = new Array(rows.value).fill(false).map(_ => new Array(cols.value).fill(false))
}

onBeforeMount(() => {
  generateRandomLife()
})
</script>

<template>
  <div
    class="w-85 h-85 shadow"
    border="~ gray-200"
    grid="~"
    gap="px"
    m="auto"
    bg="gray-200 opacity-50"
    :style="containerStyle"
  >
    <template v-for="(row, r) in lifeGrid" :key="r">
      <template v-for="(item, c) in row" :key="c">
        <LifeSquare :init-status="item" :x="r" :y="c" @click="lifeGrid[r][c] = !lifeGrid[r][c]" />
      </template>
    </template>
  </div>
  <div class="w-85 operation text-center" m="auto" p="y-4">
    <div class="flex justify-between text-xs">
      <span>
        <label>行：</label>
        <input v-model="cols" type="number" class="exp-input">
      </span>
      <span>
        <label>列：</label>
        <input v-model="rows" type="number" class="exp-input">
      </span>
      <span>
        <label>间隔（ms）：</label>
        <input v-model="interval" type="number" step="50" class="exp-input">
      </span>
    </div>
    <div class="flex justify-between" m="t-6">
      <button v-if="!intervalId" id="play" class="square-btn" @click="startLife">
        <div i-ri-play-line />
      </button>
      <button v-else id="pause" class="square-btn" @click="pauseLife">
        <div i-ri-pause-line />
      </button>

      <button id="random-init" class="square-btn" title="随机初始化" @click="generateRandomLife">
        <div i-ri-shuffle-line />
      </button>
      <button id="reset" class="square-btn" title="重置" @click="resetLife">
        <div i-ri-restart-line />
      </button>
    </div>

    <div class="mt-5">
      <hr>
      <router-link class="icon-btn" m="t-5" to="/life-game/about">
        <div i-ri-file-line />
      </router-link>
    </div>
  </div>
</template>
