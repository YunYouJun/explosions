<script lang="ts" setup>
import { isClient } from '@vueuse/core'

import type p5 from 'p5'

interface Bubble { x: number; y: number; size: number; speed: number }

function sketch(s: p5) {
  const bubbles: Bubble[] = []// holds bubble objects
  const bubbleNum = 20// # of bubbles?
  const xVariation = 2// how much the bubbles move in the x direction

  // makes a new bubble at a specified index once its off screen
  function newBubble(index: number) {
    bubbles[index] = {
      x: s.random(window.innerWidth),
      y: window.innerHeight,
      size: s.random(3, 10),
      speed: 0,
    }
  }

  // move the bubbles based on their size
  function moveBubbles(bubble: Bubble) {
    bubble.x += s.random(-xVariation, xVariation)
    bubble.speed += bubble.size / 100
    bubble.y -= bubble.speed
    // draw the bubble NOTE they must be integer values to draw to the canvas
    s.ellipse(
      Math.round(bubble.x),
      Math.round(bubble.y),
      Math.round(bubble.size),
      Math.round(bubble.size),
    )
  }

  // setup the canvas based on the window size
  s.setup = () => {
    s.createCanvas(window.innerWidth, window.innerHeight)
    s.noStroke()
    // frameRate(10);
    // make random bubble objects {x,y,size,speed}
    for (let i = 0; i < bubbleNum; i++) {
      bubbles[i] = {
        x: s.random(window.innerWidth),
        y: s.random(window.innerHeight),
        size: s.random(3, 10),
        speed: 0,
      }
    }
    // set color of the bubbles 'feel free to play with opacity, I think .4 looks nice'
    s.fill('rgba(255,255,255, 0.4)')
  }

  s.draw = () => {
    s.background('#164899')
    bubbles.forEach((bub, index) => {
      moveBubbles(bub)
      if (bub.y < -10)
        newBubble(index)
    })
  }

  // handle window resize events and fix the canvas
  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight)
  }
}

onMounted(async () => {
  if (!isClient)
    return

  const { default: p5 } = await import('p5')
  // @ts-expect-error new p5
  // eslint-disable-next-line new-cap, unused-imports/no-unused-vars
  const sketchInstance = new p5(sketch)
})
</script>

<template>
  <div>
    <h1>Vue + P5.js Bubbles</h1>
  </div>
</template>

<style>
canvas{
  position: fixed;
  top:0px;
  left:0px;
  z-index: 0;
}

h1{
  position: relative;
  z-index: 5;
  color: #fff;
  text-align: center;
  padding-top: 100px;
  font-family: 'Bai Jamjuree', sans-serif;
}
</style>
