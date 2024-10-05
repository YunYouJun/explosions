<script lang="ts" setup>
import type * as Monaco from 'monaco-editor'
import { ref } from 'vue'

const value = ref('')

const options: Monaco.editor.IStandaloneDiffEditorConstructionOptions = {
  theme: 'vs-dark',
}
</script>

<template>
  <div class="w-full h-full min-h-100 rounded shadow" grid="~ cols-2">
    <div class="h-full" font="mono">
      <ClientOnly>
        <CustomMonacoEditor v-model="value" class="h-full" lang="typescript" :options="options" />
      </ClientOnly>
    </div>
    <div>
      <PreviewPixi />
    </div>
  </div>
</template>
