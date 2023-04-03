import MonacoEditorVueComponent from './monaco-editor-vue-component.vue'

export default {
    install: (app) => {
        app.component("monaco", MonacoEditorVueComponent)
    },
    MonacoEditorVueComponent: MonacoEditorVueComponent
}
