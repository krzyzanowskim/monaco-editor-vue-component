<template>
  <div ref="editor_element" style="width: 100%; height: 100%;" />
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import loader from "@monaco-editor/loader";

const editor_element = ref(null)
const props = defineProps({
  modelValue: String,
  editorOptions: Object,
  language: {
    type: String,
    default: "javascript"
  },
  fontSize: {
    type: String,
    default: "12pt"
  },
  tabSize: {
    type: Number,
    default: 4
  },
  minimap: {
    type: Boolean,
    default: false
  },
  lineHeight: {
    type: Number,
    default: 21
  },
  theme: {
    type: String,
    default: "vs"
  },
  wordWrap: {
    type: Boolean,
    default: true
  },
  lighbulb: {
    type: Boolean,
    default: false
  },
  automaticLayout: {
    type: Boolean,
    default: true
  },
  smoothScrolling: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'update:modelValue'
])

var editor = null

const _localValue = ref('')
const localValue = computed({
  get() {
    return _localValue.value
  },
  set(val) {
    _localValue.value = val
    emit('update:modelValue', val)
  }
})

watch(props, (newValue) => {
  if (localValue.value != newValue.modelValue) {
    editor.setValue(newValue.modelValue);
  }
})

onMounted(function () {
  loader.init().then((monaco) => {
    const editorOptions = {
      value: props.modelValue,
      fontSize: props.fontSize,
      lineHeight: props.lineHeight,
      language: props.language,
      wordWrap: props.wordWrap ? "on" : "off",
      wrappingIndent: "indent",
      tabSize: props.tabSize,
      lighbulb: {
        enabled: props.lighbulb,
      },
      minimap: {
        enabled: props.minimap,
      },
      theme: props.theme,
      scrollBeyondLastLine: false,
      scrollBeyondLastColumn: false,
      smoothScrolling: props.smoothScrolling,
      showFoldingControls: "mouseover",
      selectionHighlight: true,
      occurrencesHighlight: false,
      scrollbar: {
        horizontal: "hidden",
        useShadows: false,
      },
      overviewRulerBorder: false,
      renderLineHighlight: "none",
      matchBrackets: "never",
      columnSelection: false,
      automaticLayout: props.automaticLayout,
    };

    const _editor = monaco.editor.create(editor_element.value, props.editorOptions ? props.editorOptions : editorOptions)
    editor = _editor
    _editor.onDidChangeModelContent(event => {
      localValue.value = _editor.getValue()
    });

  })
})
</script>