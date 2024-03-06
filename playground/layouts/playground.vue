<script lang="ts" setup>
import type * as Monaco from 'monaco-editor'

const value = ref('')

const options: Monaco.editor.IStandaloneDiffEditorConstructionOptions = {
  theme: 'vs-dark',
}
</script>

<template>
  <div class="w-full h-full" grid="~ cols-2">
    <div class="h-full" font="mono">
      <ClientOnly>
        <MonacoEditor v-model="value" class="h-full" lang="typescript" :options="options" />
      </ClientOnly>
    </div>
    <div>
      b
    </div>
  </div>
</template>
