---
theme: default
background: https://upyun.yunyoujun.cn/images/code-bg.jpg
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## 徽章旋转动画
  蚂蚁森林 徽章旋转动画 技术分享

  [YunYouJun/explosions](https://github.com/YunYouJun/explosions)
title: 徽章旋转动画
---

# 🐒 徽章旋转动画

「🐜 蚂蚁森林 🌲」神奇动物

☁️ 雲游 🎮

<div class="pt-5">
  <br/>
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    (∩ ◕_▩ )⊃━☆ Explosion！ <span class="inline cursor-pointer mb-5 text-red-400 animate-ping" hover="bg-white bg-opacity-10">💥</span>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/YunYouJun/explosions" target="_blank" alt="GitHub"
    class="text-xl icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
这是我加入蚂蚁大家庭以来做的第一个项目，也十分感谢简老师给我的这个机会和子贱师兄的指导。
-->

---
layout: two-cols
---

# 长啥样

进入 「蚂蚁森林」 左上角

<mdi-arrow-top-left-thick class="inline"/> 点击发现神奇物种（继续点左上角）

<br>

> 我实现了什么？

<br>

- 拖动 3D 徽章 <mdi-police-badge class="inline" /> 
- 根据拖动的速度徽章的惯性动画
  - 停止时总是停留在正/反面
- 进入时的晃动动画
- 轻拍晃动效果 <vaadin-touch class="inline"/> 
- 陀螺仪效果（晃动手机） <icon-park-outline-weixin-shake class="inline"/>

<br>

> 遇到的问题与选取的方案

::right::

<video style="width: 46%" src="https://upyun.yunyoujun.cn/videos/demo/ant-forest-animal-badge-rotation.mp4" controls></video>

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-text-fill-color: transparent;
}

video {
  margin: auto;
}
</style>

---

# <ph-projector-screen class="inline"/> 我的实现方案

首要问题：惯性动画

- 本质：Canvas 绘制的 3D 模型 <carbon-cube class="inline" />
- 思路：改变徽章的旋转角度 <mdi-axis-z-rotate-clockwise class="inline"/>

## 如何拖动徽章？

<vaadin-touch class="inline"/> 计算屏幕触摸点横向移动的差值（delta X），按比例赋值给徽章饶 Y 轴旋转的角度（欧拉角 y）。

> So easy? 此时还基本无需考虑动画的问题。手指移动是连续的，旋转就是连续的。

<br>

```ts
const deltaX = curPos.x - this.lastPos.x;
model.eulerAngles.y += deltaX;
```

<br>

但是我们需要的是停止后，徽章仍会因为惯性继续滑动。

---

# setInterval VS setTimeout VS requestAnimationFrame

动画

当我们的滑动停止后，徽章仍继续转动，这意味着应当是一个动画。

渲染帧率：60fps

`setTimeout(callback, 16)` ？

requestAnimationFrame[^1] 更优雅

> 回调函数执行次数通常是每秒60次，与浏览器屏幕刷新次数相匹配

<br>

## 分析动画

<br>

- 速度逐渐衰减（需要得知初速度）
- 最终总是停留在正面或是反面

<br>

[^1]: [window.requestAnimationFrame | MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

<style>
.footnotes-sep {
  @apply opacity-10;
}
.footnotes {
  @apply text-sm opacity-75;
}
.footnote-backref {
  display: none;
}
</style>

---

# <ion-footsteps-outline class="inline"/> 步骤 


<div grid="~ cols-2 gap-4">
<div>

拖动结束时 `touchEnd` 赋予徽章一个初速度 <whh-speed class="inline"/>


```ts
// 滑动距离
const deltaX = 
  e.changedTouches[0].clientX - this.prePos.x;

const touchEndTime = new Date().valueOf();
// 滑动时间
const deltaTime = touchEndTime - touchStartTime;

/**
 * 初始速度，每 ms 旋转速度（设顺时针为正数）
 * deltaX <= 0 为顺时针
 */
let speed = -deltaX / deltaTime;

// 将速度赋予动画实例，播放动画
this.inertiaAnimation.playAnimation = true;
this.inertiaAnimation.speed = speed;
this.inertiaAnimation.run();
```

</div>
<div>

徽章旋转衰减

- 方案1: 模拟物理重力，使用加速度来计算速度
- 方案2: 模拟摩擦力，采用摩擦系数一样的衰减系数 

<mdi-check class="text-green-400 inline" /> 方案 2 更简便、更符合逻辑，加速度另有他用

衰减系数 `u: 0.95`

```ts
/**
 * 每一步动画
 * @param {number} timestamp
 */
function step(timestamp) {
  ...
  speed *= u;
  ...
}
```

</div>
</div>

---

# 🌍 平面重力


<div grid="~ cols-2 gap-4" m="-r-50">

<div>

速度衰减，意味着徽章最后可能停止在任意角度。

<mdi-earth class="inline" /> 水平面施加一个「重力」，使其总是保持正/反面。

```ts
/**
 * 水平重力影响系数
 */
gravity: 0.008
```

重力（加速度）在徽章的左右区间正负是不一样的。

```ts
// 一些乱七八糟的取余处理（因为会大于 180 嘛）
const remainder = getRotation() % 180;
const positiveRemainder = remainder < 0 ? remainder + 180 : remainder;

if (positiveRemainder >= 90 && positiveRemainder < 180) {
  speed -= gravity;
} else if (positiveRemainder > 0 && positiveRemainder < 90) {
  speed += gravity;
}
```

</div>

<div>

假设从徽章顶部看，顺时针方向为正 <mdi-axis-z-rotate-clockwise class="inline"/>

随后从屏幕看向徽章 <mdi-cellphone-screenshot class="inline" />

- 左半外：加速度向屏幕内，为正数 <ic-round-plus class="inline"/>
- 左半内：加速度向屏幕外，为负数 <ic-round-minus class="inline"/>
- 右半外：加速度向屏幕内，为负数 <ic-round-minus class="inline"/>
- 右半内：加速度向屏幕外，为正数 <ic-round-plus class="inline"/>

<img border="rounded" width="180" src="https://upyun.yunyoujun.cn/images/badge-rotation-middle.jpg" />
</div>

</div>

---
preload: false
---

# <uiw-stop-o v-motion :initial="{ y: -100, x: -100, scale: 2 }" :enter="final" class="inline" /> 如何停止 

<div grid="~ cols-2 gap-4">
<div>

```ts
function step(timestamp) {
  // 继续播放动画的条件（需要避免和后续的陀螺仪/拖动等冲突）
  if (
    _this.playAnimation &&
    (Math.abs(speed) > toleratedSpeed ||
      (positiveRemainder > toleratedAngel 
      && positiveRemainder < 180 - toleratedAngel))
  ) {
    // 记录是否正在播放动画
    _this.isPlaying = true;

    ...
    // 根据时间和速度，计算每一帧徽章应该旋转的角度
    const deltaRotation = speed * elapsed;
    setRotation(deltaRotation);
    ...
    // 继续播放动画
    window.requestAnimationFrame(step);
  } else {
    _this.isPlaying = false;
  }
}
```

</div>
<div>

拖拽时会与加速度动画产生冲突，我们需要通过状态来使得他们互相独立。

- `_this.playAnimation` 是否允许播放动画
- `_this.isPlaying` 记录状态，是否正在播放动画

<br/>
<hr/>

速度逐渐衰减，配合水平面的重力加速度，数字尽管越来越小，但仍旧是浮点数。`number(float)`

> 正所谓，「日取其半，万世不竭」。——《庄子》

因此我们需要明确徽章趋近于静止时的一个界限（可以被忽略的参数大小）。

- `toleratedSpeed`: 0.001 可以被忽略的速度
- `toleratedAngle`: 5 可以被忽略的角度

</div>
</div>

<script setup lang="ts">
const final = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  transition: {
    type: 'spring',
    damping: 10,
    stiffness: 20,
    mass: 2
  }
}
</script>

---

<div grid="~ cols-2 gap-4">
<div>

- 优化：可配置的参数接口，提供默认参数

```ts
export interface InertiaAnimationOptions {
  /**
   * 初速度
   */
  speed?: number
  /**
   * 水平重力影响系数
   */
  gravity?: number
  /**
   * 衰减系数
   */
  u?: number
  /**
   * 最后可忽略的速度
   */
  toleratedSpeed?: 0.0005
  /**
   * 最后可忽略的角度
   */
  toleratedAngel?: 3


```

</div>

<div>

- 函数式而非 Class `createInertiaAnimation`

```ts
  /**
   * 获取旋转角度
   */
  getRotation?: () => number
  /**
   * 设置旋转角度
   */
  setRotation?: (deltaRotation: number) => void
}
/**
 * 创建旋转惯性动画
 *
 * @param {*} options
 * @param {Function} callback 回调函数 设置状态
 */
export function createInertiaAnimation(
  options: InertiaAnimationOptions
) {
  return {
    ...
  }
}
```

</div>
</div>

---

<style>
.slidev-layout {
  padding: 0.5rem 3rem ;
}
iframe {
  transform: scale(0.8);
  overflow: hidden;
}
</style>

<div grid="~ cols-2 gap-4">
<div>

## <eos-icons-fork-outlined class="inline"/> 可复用

此处的应用场景是 3D 模型，倘若是图片、DOM？

> 譬如右侧的 CSS 立体徽章，~~CSS 原教旨主义~~

进一步解耦，任意自定义旋转方式

- setRotation: 设置旋转角度
  - （`transform: rotateY(${val}deg)`）
- getRotation: 获取旋转角度（`getComputedStyle`）

```ts
const inertiaAnimation = createInertiaAnimation({
  speed: 0.2,
  getRotation() {
    return rotateY.value
  },
  setRotation(deltaRotation) {
    rotateY.value -= deltaRotation
  },
})
```

TypeScript + VueUse(PR) + CSS + createInertiaAnimation

</div>

<div>

<a class="text-xs absolute" href="https://explosions.yunyoujun.cn">示例: https://explosions.yunyoujun.cn</a>

<iframe
    title="Explosion"
    width="100%"
    height="100%"
    scrolling="no"
    src="https://explosions.yunyoujun.cn/badge-rotation/">
</iframe>

</div>
</div>

---

# <mdi-run-fast class="inline"/> 最后一公里

工作结束了？又好像还没结束。一点点优化，细节决定成败。

<div grid="~ cols-2 gap-4">
<div>

- 初始晃动效果

> 让用户知道它是可拖动的，动画冲突，所以应当共用一个实例

```ts
const inertiaAnimation = createInertiaAnimation();
...
game.run(options, () => {
  inertiaAnimation.playAnimation = true;
  // 赋予一个微小的初速度，并播放动画
  inertiaAnimation.speed = 0.2;
  inertiaAnimation.run();
})
```

<br/>

- 轻拍晃动（）

> 原本的初速度是根据移动距离和时间计算的，那么用户仅仅想拍一下徽章呢
> 当移动距离和时间小于一定数值时触发，并判断为左侧还是右侧。

</div>
<div>

```ts
// 轻拍
const tapSpeed = 0.3;
if (Math.abs(deltaX) < 5 && deltaTime < 200) {
  const pageWidth = document.documentElement.clientWidth
  speed = 
    this.prePos.x > pageWidth / 2
      ? -tapSpeed : tapSpeed;
}
```

<br />

- 陀螺仪（）

> 用户微微晃动手机，徽章总是面向用户，也是增强体验不错的方式。

<br />

但也存在一些问题...

<mdi-bug class="inline"/>
<mdi-bug class="inline"/>
<mdi-bug class="inline"/>
<mdi-bug class="inline"/>
<mdi-bug class="inline"/>
<mdi-bug class="inline"/>
<noto-bug class="inline"/>
<noto-bug class="inline"/>
<noto-bug class="inline"/>
<noto-bug class="inline"/>
<noto-bug class="inline"/> 
<noto-bug class="inline"/> 
<img class="inline" width="20" src="https://upyun.yunyoujun.cn/images/jian-yu-avatar.jpg">
<img class="inline" width="20" src="https://upyun.yunyoujun.cn/images/jian-yu-avatar.jpg">
<img class="inline" width="20" src="https://upyun.yunyoujun.cn/images/jian-yu-avatar.jpg">
<img class="inline" width="20" src="https://upyun.yunyoujun.cn/images/jian-yu-avatar.jpg">
<img class="inline" width="20" src="https://upyun.yunyoujun.cn/images/jian-yu-avatar.jpg">
<img class="inline" width="20" src="https://upyun.yunyoujun.cn/images/jian-yu-avatar.jpg">
</div>
</div>

---

## <pixelarticons-device-vibrate class="inline"/> 陀螺仪问题解决

<br/>

- 与惯性动画冲突造成抖动

> 通过各类状态判断，当用户在拖动、仍在播放惯性动画时，陀螺仪效果不生效（与拖动和惯性动画之间的冲突处理逻辑类似）

<br/>

- 陀螺仪因为用户初始拿的位置便具有数值（应当使用相对数值）
- 超过 90 度会突变为负数 `90 -> -89`
- 数值频率变化敏感

> 通过相对计算，并进行缓动，过大变化时舍去

<br/>

- 网页 API [`deviceorientation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/deviceorientation_event) iOS 兼容问题

```ts
window.addEventListener("deviceorientation", (event) => {
    ...
    // gamma: 从左到右
    let deltaGamma = event.gamma - this.lastGamma;
    ...
}, true);
```

> 子贱师兄发现 iOS 下陀螺仪效果不生效，查询 caniuse 原来是 iOS 网页下还不支持。
> 使用 [@alipay/luna-deviceorientation](https://web.npm.alibaba-inc.com/package/@alipay/luna-deviceorientation) 包进行兼容，内部调用 iOS API。
> 顺便包好像也已经把我之前考虑的几个问题给解决了……

---

<div class="flex flex-col justify-center items-center h-full">
<div class="text-8xl">😊</div>
<br/>
<br/>
<div class="text-4xl">敬请指教</div>
<br/>
<br/>
<div class="text-4xl">Thanks for listening my speech.</div>
</div>
