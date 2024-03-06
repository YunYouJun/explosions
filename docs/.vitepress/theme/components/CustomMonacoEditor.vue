<script lang="ts" setup>
import type * as Monaco from 'monaco-editor'
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import { defu } from 'defu'

import 'monaco-editor/esm/vs/basic-languages/css/css.contribution'
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'

import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'

const props = withDefaults(defineProps<Props>(), {
  lang: () => 'plaintext',
  options: () => ({}),
  modelValue: () => '',
})

const emit = defineEmits<Emits>()

// @ts-expect-error MonacoEnvironment is not defined
globalThis.MonacoEnvironment = {
  getWorker(workerId: string, label: string) {
    if (label === 'typescript' || label === 'javascript')
      return new TsWorker()
    if (label === 'json')
      return new JsonWorker()
    if (label === 'css')
      return new CssWorker()
    if (label === 'html')
      return new HtmlWorker()

    return new EditorWorker()
  },
}

interface Props {
  /**
   * Programming Language (Not a locale for UI);
   * overrides `options.language`
   */
  lang?: string
  /**
   * Options passed to the second argument of `monaco.editor.create`
   */
  options?: Monaco.editor.IStandaloneEditorConstructionOptions
  modelValue?: string
}

interface Emits {
  (event: 'update:modelValue', value: string): void
  (event: 'load', editor: Monaco.editor.IStandaloneCodeEditor): void
}

const isLoading = ref(true)

const lang = computed(() => props.lang || props.options.language)

const editorElement = ref<HTMLDivElement>()

let editor: Monaco.editor.IStandaloneCodeEditor
let model: Monaco.editor.ITextModel
const editorRef = shallowRef<Monaco.editor.IStandaloneCodeEditor>()

const defaultOptions: Monaco.editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: false,
}

watch(() => props.modelValue, () => {
  if (editor?.getValue() !== props.modelValue)
    editor?.setValue(props.modelValue)
})

watch(() => props.lang, async () => {
  const monaco = await import('monaco-editor')

  if (model)
    model.dispose()
  model = monaco.editor.createModel(props.modelValue, lang.value)
  editor?.setModel(model)
})

watch(() => props.options, () => {
  editor?.updateOptions(defu(props.options, defaultOptions))
})

defineExpose({
  /**
   * Monaco editor instance
   */
  $editor: editorRef,
})

onMounted(async () => {
  if (!editorElement.value)
    return

  const monaco = await import('monaco-editor')
  editor = monaco.editor.create(editorElement.value!, defu(props.options, defaultOptions))
  editorRef.value = editor
  model = monaco.editor.createModel(props.modelValue, lang.value)
  editor.setModel(model)
  editor.onDidChangeModelContent(() => {
    emit('update:modelValue', editor.getValue())
  })
  isLoading.value = false
  emit('load', editor)
})

onUnmounted(() => {
  editor?.dispose()
  model?.dispose()
})
</script>

<template>
  <div ref="editorElement">
    <slot v-if="isLoading" />
  </div>
</template>
