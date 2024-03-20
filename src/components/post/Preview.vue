<template>
  <a-drawer
    :open="visible"
    :title="record.title"
    width="60%"
    placement="right"
    @close="emits('close')"
  >
    <figure>
      <a-image
        :src="record.coverPic"
      ></a-image>
    </figure>

    <a-divider></a-divider>

    <main
      class="posts-content"
      :style="{
        color: token.colorText
      }"
      v-html="content"
    ></main>
  </a-drawer>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import type { PostItem } from '@/types/post'
import markdown from '@/utils/markdown'

const props = defineProps<{
  record: PostItem
}>()

const emits = defineEmits<(e: 'close') => void>()

const { token } = theme.useToken()

const visible = ref(true)

const content = computed(() => markdown.render(props.record.content))
</script>

<style lang="scss">
:is(html[data-theme="dark"]) .posts-content {
  --inline-code-bg: rgba(110,118,129,0.4);
  --tr-bg: rgb(22, 27, 34);
  --code-header-bg: rgb(22, 27, 34);
  --border-color: rgb(48, 54, 61);
  --shadow-color: #302f2f;
}
.posts-content {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 1em;
  line-height: 1.6;
  word-wrap: break-word;

  --inline-code-bg: rgba(175,184,193,0.2);
  --tr-bg: #f6f8fa;
  --code-header-bg: rgb(246, 248, 250);
  --border-color: rgb(208, 215, 222);
  --shadow-color: #bcbcbc;

  > * {
    margin-top: 1.5em !important;

    &:first-child {
      margin-top: 0 !important;
    }
  }

  :is(h1, h2, h3, h4, h5, h6) {
    margin-top: 1em !important;

    & + * {
      margin-top: 1em !important;
    }
  }

  details,
  figcaption,
  figure {
    display: block;
  }

  [hidden] {
    display: none !important;
  }

  a {
    margin: 0 0.1em;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: 600;
  }

  dfn {
    font-style: italic;
  }

  mark {
    background-color: var(--bg);
    color: var(--secondary-text);
  }

  small {
    font-size: 90%;
  }

  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    display: block;
    max-width: 100%;
    margin: 0 auto;
    border-style: none;
    box-sizing: content-box;
    cursor: zoom-in;
  }

  figure {
    margin: 1em 2.4em;
  }

  hr {
    height: .25em;
    margin: var(--gap-lg) 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid var(--border-color);
    background: transparent;
    box-sizing: content-box;
    overflow: hidden;

    &::before {
      content: '';
      display: table;
    }

    &::after {
      display: table;
      clear: both;
      content: "";
    }
  }

  input {
    font: inherit;
    margin: 0;
    overflow: visible;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  [type=button],
  [type=reset],
  [type=submit] {
    -webkit-appearance: button;

    &::-moz-focus-inner {
      outline: 1px dotted ButtonText;
    }
  }

  [type=checkbox],
  [type=radio] {
    box-sizing: border-box;
    padding: 0;
  }

  [type=number]::-webkit-inner-spin-button,
  [type=number]::-webkit-outer-spin-button {
    height: auto;
  }

  [type=search] {
    -webkit-appearance: textfield;
    outline-offset: -.1em;

    &::-webkit-search-cancel-button,
    &::-webkit-search-decoration {
      -webkit-appearance: none;
    }
  }

  ::-webkit-input-placeholder {
    color: inherit;
    opacity: .54;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  table {
    display: block;
    width: max-content;
    max-width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    border-radius: .4em;
    overflow: auto;

    td,
    th {
      padding: .4em 1em;
      border: 1px solid var(--border-color);
    }

    th {
      font-weight: 600;
      background-color: var(--code-header-bg);
    }

    tr {
      background-color: var(--bg);

      &:hover {
        background-color: var(--tr-bg);
      }
    }
  }

  :where(pre) {
    width: 100%;
    border: 1px solid var(--border-color);
    border-radius: .4em;
    overflow: hidden;

    code {
      display: block;
      margin: 0;
      border-top: 1px solid var(--border-color);
      border-radius: 0;
      // word-break: break-all;
      // white-space: pre-wrap;
    }

    &:not([open]) {
      summary {
        .btn-collapse {
          transform: rotate(-1.25turn);
        }
      }
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;
    padding: .5em 0;
    color: var(--primary-text);
    scroll-margin-top: var(--header-height);

    tt,
    code {
      padding: 0 .2em;
      font-size: inherit;
    }

    &:hover::before {
      content: '#';
      position: absolute;
      left: -1em;
      top: .5em;
      width: 1em;
      text-align: center;
      line-height: inherit;
      font-size: inherit;
    }
  }

  @for $i from 1 through 3 {
    h#{$i} {
      font-size: 1.8em - 0.2 * $i;
      border-bottom: 1px solid var(--border-color);
    }
  }
  @for $i from 4 through 6 {
    h#{$i} {
      font-size: 1em;
    }
  }

  blockquote {
    margin: 0;
    padding: 1em;
    color: var(--secondary-text);
    border-left: .25em solid var(--blue);
    background-color: var(--code-header-bg);

    & + blockquote {
      margin: 0 !important;
    }

    > :first-of-type {
      margin: 0;
    }

    blockquote {
      margin: -1em 0 !important;
    }
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  ul,
  ol {
    padding-left: 2em;

    ol {
      list-style-type: lower-roman;
    }

    ul,
    ol {
      ol {
        list-style-type: lower-alpha;
      }
    }
  }

  ol {
    padding-left: 1.6rem;

    &[type="1"] {
      list-style-type: decimal;
    }
    &[type="a"] {
      list-style-type: lower-alpha;
    }
    &[type="i"] {
      list-style-type: lower-roman;
    }
  }

  div > ol:not([type]) {
    list-style-type: decimal;
  }

  li {
    > * {
      margin-top: var(--gap);
    }

    + li {
      margin-top: .6em;
    }

    p {
      margin: 0 .25em;
    }
  }

  dl {
    padding: 0;

    dt {
      padding: 0;
      margin-top: 1em;
      font-size: 1em;
      font-style: italic;
      font-weight: 600;
    }

    dd {
      margin-left: 0;
      margin-bottom: 1em;
      padding: 0 1em;
    }
  }

  input {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;
      -webkit-appearance: none;
      appearance: none;
    }
  }

  code,
  tt {
    margin: 0 .1em;
    padding: .2em .4em;
    font-size: 85%;
    background: var(--inline-code-bg);
    border-radius: .2em;

    br {
      display: none;
    }
  }

  del code {
    text-decoration: inherit;
  }

  .footnotes {
    ol {
      padding-left: 1.6rem;
    }

    li {
      position: relative;

      &:target {
        color: var(--primary-text);

        &::before {
          position: absolute;
          top: -0.8rem;
          right: -0.8rem;
          bottom: -0.8rem;
          left: -2.4rem;
          pointer-events: none;
          content: "";
          border: .2rem solid var(--primary-color);
          border-radius: .6rem;
        }
      }
    }
  }

  .task-list-item {
    list-style-type: none;

    label {
      font-weight: 400;
    }

    &.enabled label {
      cursor: pointer;
    }

    & +.task-list-item {
      margin-top: .3rem;
    }

    .handle {
      display: none;
    }

    .task-list-item-checkbox {
      margin: 0 .2em .25em -1.6em;
      vertical-align: middle;
    }

    .contains-task-list:dir(rtl) .task-list-item-checkbox {
      margin: 0 -1.6em .25em .2em;
    }
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(50%);
  }
}
</style>

<style lang="scss">
html[data-theme="dark"] {
  pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}/*!
  Theme: GitHub Dark
  Description: Dark theme as seen on github.com
  Author: github.com
  Maintainer: @Hirse
  Updated: 2021-05-15

  Outdated base version: https://github.com/primer/github-syntax-dark
  Current colors taken from GitHub's CSS
*/.hljs{color:#c9d1d9;background:#0d1117}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-built_in,.hljs-symbol{color:#ffa657}.hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}.hljs-subst{color:#c9d1d9}.hljs-section{color:#1f6feb;font-weight:700}.hljs-bullet{color:#f2cc60}.hljs-emphasis{color:#c9d1d9;font-style:italic}.hljs-strong{color:#c9d1d9;font-weight:700}.hljs-addition{color:#aff5b4;background-color:#033a16}.hljs-deletion{color:#ffdcd7;background-color:#67060c}
}
html[data-theme="light"] {
  pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}/*!
    Theme: GitHub
    Description: Light theme as seen on github.com
    Author: github.com
    Maintainer: @Hirse
    Updated: 2021-05-15

    Outdated base version: https://github.com/primer/github-syntax-light
    Current colors taken from GitHub's CSS
  */.hljs{color:#24292e;background:#fff}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}.hljs-built_in,.hljs-symbol{color:#e36209}.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}.hljs-subst{color:#24292e}.hljs-section{color:#005cc5;font-weight:700}.hljs-bullet{color:#735c0f}.hljs-emphasis{color:#24292e;font-style:italic}.hljs-strong{color:#24292e;font-weight:700}.hljs-addition{color:#22863a;background-color:#f0fff4}.hljs-deletion{color:#b31d28;background-color:#ffeef0}
}
</style>
