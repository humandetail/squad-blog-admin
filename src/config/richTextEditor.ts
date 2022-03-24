// Vditor 相关配置

import Vditor from 'vditor/dist/method';

export const getToolbar = (imageToolCallback: Function) => {
  return [
    'undo',
    'redo',
    '|',
    {
      name: 'image',
      tip: '选择图片',
      tipPosition: 'n',
      className: 'right',
      icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2050" width="16" height="16"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32z m-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792z m0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z" p-id="2051"></path><path d="M304 456c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88z m0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z" p-id="2052"></path></svg>',
      click: () => {
        imageToolCallback();
      }
    },
    '|',
    'headings',
    'bold',
    'italic',
    'strike',
    'link',
    '|',
    'table',
    'list',
    'ordered-list',
    'check',
    'outdent',
    'indent',
    '|',
    'quote',
    'line',
    'code',
    // 'inline-code',
    // 'insert-before',
    // 'insert-after',
    '|',
    // 'upload',
    // 'record',
    // '|',
    // 'edit-mode',
    // 'content-theme',
    // 'code-theme',
    // 'export',
    'emoji',
    'fullscreen',
    'preview'
    // {
    //   name: 'more',
    //   toolbar: [
    //     'fullscreen',
    //     'both',
    //     'preview',
    //     // 'info',
    //     // 'help'
    //   ]
    // }
  ];
}

export const toolbarConfig = {
  pin: true // 是否固定
}

export const preview = {
  theme: {
    current: 'vditor-dark-theme',
    path: '../src/assets/styles'
  },
  hljs: {
    enable: true,
    style: 'monokai',
    lineNumber: true
  },
  markdown: {
    codeBlockPreview: true, // wysiwyg 和 ir 模式下是否对代码块进行渲染
    toc: true
  }
}

export const theme = 'dark';

export const tab = '  ';

export const cache = {
  enable: false
}

const getRichTextEditorOptions = ({ imageToolCallback }: { imageToolCallback: Function }): any => {
  return {
    toolbar: getToolbar(imageToolCallback),
    toolbarConfig,
    preview,
    theme,
    tab,
    cache
  }
}

export default getRichTextEditorOptions;
