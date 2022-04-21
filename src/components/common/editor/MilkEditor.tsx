
import { Editor, rootCtx, defaultValueCtx, editorViewCtx, parserCtx } from '@milkdown/core';
import { nordDark } from '@milkdown/theme-nord';
import { EditorRef, VueEditor, useEditor } from '@milkdown/vue';
import { commonmark } from '@milkdown/preset-commonmark';
import { history } from '@milkdown/plugin-history';
import { clipboard } from '@milkdown/plugin-clipboard';
import { cursor } from '@milkdown/plugin-cursor';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prism } from '@milkdown/plugin-prism';
import { tooltip } from '@milkdown/plugin-tooltip';
import { slash } from '@milkdown/plugin-slash';
import { emoji } from '@milkdown/plugin-emoji';
import { table } from '@milkdown/plugin-table';
import { menu } from '@milkdown/plugin-menu';
import { upload, uploadPlugin } from '@milkdown/plugin-upload';
import uploader from './uploader';
import { defineComponent, ref, watch } from 'vue';
import { Slice } from 'prosemirror-model';
import options from './menu';
import { imageBtnTool } from './imageBtnPlugin';
import PictureSelectorModal from '@/components/resource/picture/picture/PictureSelectorModal.vue'

import { SelectedPicture } from '@/types/picture';
// import { useDefineAsyncComponent } from '@/hooks/common';

const MilkEditor = defineComponent<{ value: string }>((props, { emit }) => {

  // const PictureSelectorModal = useDefineAsyncComponent('/components/resource/picture/picture/PictureSelectorModal.vue')

  const pictureSelectorVisible = ref(false);

  const editorRef = ref<EditorRef>({ get: () => undefined, dom: () => null });

  const editor = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, props.value)
        ctx.get(listenerCtx)
          .markdownUpdated((_ctx, markdown, _prevMarkdown) => {
            // when markdown updates
            emit('update:value', markdown);
          });
      })
      .use(nordDark)
      .use(tooltip)
      .use(commonmark)
      .use(clipboard)
      .use(cursor)
      .use(listener)
      .use(prism)
      .use(slash)
      .use(emoji)
      .use(history)
      .use(table)
      .use(imageBtnTool(openImageSelector))
      .use(menu(options))
      .use(upload.configure(uploadPlugin, { uploader }))
  )

  const insertMarkdown = (markdown: string) => {
    const editorInstance = editorRef.value.get();
    if (!editorInstance) {
      return;
    }
    if (!markdown) {
      return;
    }

    const view = editorInstance.action((ctx) => ctx.get(editorViewCtx));
    const tr = view.state.tr;
    if (!tr.selection.empty) {
      tr.deleteSelection();
    }

    editorInstance.action((ctx) => {
      const parser = ctx.get(parserCtx);
      const doc = parser(markdown);

      if (!doc) {
        return;
      }

      const state = view.state;

      view.dispatch(state.tr.replace(tr.selection.from, tr.selection.from, new Slice(doc.content, 0, 0)))
    })
  }

  const openImageSelector = () => {
    pictureSelectorVisible.value = true;
  }

  const handleSelectorChange = (item: SelectedPicture | SelectedPicture[]) => {
    if (Array.isArray(item)) {
      return;
    }
    insertMarkdown(`![${item.name}](${item.url})`);
    pictureSelectorVisible.value = false;
  }

  watch(() => props.value, (value) => {
    insertMarkdown(value);
  }, {
    deep: true,
    immediate: true
  })
  // </script>

  return () => (
    <>
      <VueEditor editorRef={editorRef} editor={editor} />
      <PictureSelectorModal
        v-show="pictureSelectorVisible"
        style={{ display: pictureSelectorVisible.value ? 'block' : 'none' }}
        show={pictureSelectorVisible.value}
        multiple={false}
        onChange={handleSelectorChange}
        onClose={ () => pictureSelectorVisible.value = false }
      />
    </>
  );
});

MilkEditor.props = ['value'];

export default MilkEditor;
