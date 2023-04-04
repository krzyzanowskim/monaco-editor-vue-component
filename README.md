## Install and basic usage

```bash
$ npm i -s monaco-editor-vue-component
```

Register the component:

```js
import MonacoPlugin from 'monaco-editor-vue-component

const app = createApp(App)
app.use(MonacoPlugin)
app.mount('#app')
```

Use the component:

```vue
<script setup>
import { ref } from "vue";
const sourceCode = ref('// Welcome')
</script>

<template>
    <monaco v-model="sourceCode" fontSize="14pt" theme="vs" language="javascript"/>
    <monaco v-model="sourceCode" :editorOptions="{ fontSize: '14pt', theme: 'vs', language='javascript' }"/> 
</template>
```

## License

[MIT license](LICENSE)