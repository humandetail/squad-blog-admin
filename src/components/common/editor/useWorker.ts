import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// import markdownWorker from 'monaco-editor/esm/vs/basic-languages/markdown/markdown.worker?worker';

self.MonacoEnvironment = {
  getWorker (_: any, _label: string) {
    // if (label === 'markdown') {
    //  return new markdownWorker();
    // }
    return new EditorWorker()
  }
}

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
