import { Options } from '@milkdown/plugin-menu'
import { redo, setBlockType, undo, wrapIn } from '@milkdown/prose';
import { CustomInsertImage } from './imageBtnPlugin';

const options: Partial<Options> = {
  config: [
    [
      {
        type: 'button',
        icon: 'undo',
        key: 'Undo',
        disabled: (view) => {
          return !undo(view.state);
        }
      },
      {
        type: 'button',
        icon: 'redo',
        key: 'Redo',
        disabled: (view) => {
          return !redo(view.state);
        }
      }
    ],
    [
      {
        type: 'select',
        text: 'Heading',
        options: [
          { id: '1', text: 'Large Heading' },
          { id: '2', text: 'Medium Heading' },
          { id: '3', text: 'Small Heading' }
        ],
        disabled: (view) => {
          const { state } = view;
          const setToHeading = (level: number) => setBlockType(state.schema.nodes.heading, { level })(state);
          return (
            !(setToHeading(1) || setToHeading(2) || setToHeading(3))
          );
        },
        onSelect: (id) => ['TurnIntoHeading', Number(id)]
      }
    ],
    [
      {
        type: 'button',
        icon: 'bold',
        key: 'ToggleBold',
        // active: (view) => hasMark(view.state, view.state.schema.marks.strong),
        disabled: (view) => !view.state.schema.marks.strong
      },
      {
        type: 'button',
        icon: 'italic',
        key: 'ToggleItalic',
        // active: (view) => hasMark(view.state, view.state.schema.marks.em),
        disabled: (view) => !view.state.schema.marks.em
      },
      {
        type: 'button',
        icon: 'strikeThrough',
        key: 'ToggleStrikeThrough',
        // active: (view) => hasMark(view.state, view.state.schema.marks.strike_through),
        disabled: (view) => !view.state.schema.marks.strike_through
      }
    ],
    [
      {
        type: 'button',
        icon: 'bulletList',
        key: 'WrapInBulletList',
        disabled: (view) => {
          const { state } = view;
          return !wrapIn(state.schema.nodes.bullet_list)(state);
        }
      },
      {
        type: 'button',
        icon: 'orderedList',
        key: 'WrapInOrderedList',
        disabled: (view) => {
          const { state } = view;
          return !wrapIn(state.schema.nodes.ordered_list)(state);
        }
      }
    ],
    [
      {
        type: 'button',
        icon: 'link',
        key: 'ToggleLink'
        // active: (view) => hasMark(view.state, view.state.schema.marks.link)
      },
      {
        type: 'button',
        icon: 'image',
        key: CustomInsertImage
      },
      {
        type: 'button',
        icon: 'table',
        key: 'InsertTable'
      },
      {
        type: 'button',
        icon: 'code',
        key: 'TurnIntoCodeFence'
      }
    ],
    [
      {
        type: 'button',
        icon: 'quote',
        key: 'WrapInBlockquote'
      },
      {
        type: 'button',
        icon: 'divider',
        key: 'InsertHr'
      }
    ]
  ]
}

export default options;
