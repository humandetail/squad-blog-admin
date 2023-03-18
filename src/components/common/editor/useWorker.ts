import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// import markdownWorker from 'monaco-editor/esm/vs/basic-languages/markdown/markdown.worker?worker';

// @ts-ignore
self.MonacoEnvironment = {
  getWorker (_: any, label: string) {
    // if (label === 'markdown') {
    //  return new markdownWorker();
    // }
    return new EditorWorker();
  }
};

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
