import React, { useCallback, useMemo, useState, useEffect } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { Editor, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Button, SlateIcon, Toolbar } from './SlateEditorComponents';
import { Icon } from '@chakra-ui/react';
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
} from 'react-icons/ai';
import { BsCode } from 'react-icons/bs';
import { connect } from 'react-redux';
import './SlateEditor.css';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const SlateEditor = ({ socketData }) => {
  const socket = socketData.socket;

  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => {
    if (socket) {
      socket.off('RCV_MSG').on('RCV_MSG', (data) => {
        setValue(data.content);
      });
    }
  }, [socket]);

  const onChangeSlateEditor = (value) => {
    setValue(value);

    socket.emit('SEND_MSG', { content: value }, (data) => {
      console.log('everyone self send', data);
    });
  };

  return (
    <Slate editor={editor} value={value} onChange={onChangeSlateEditor}>
      <Toolbar>
        <MarkButton format="bold" icon={<Icon as={AiOutlineBold} />} />
        <MarkButton format="italic" icon={<Icon as={AiOutlineItalic} />} />
        <MarkButton
          format="underline"
          icon={<Icon as={AiOutlineUnderline} />}
        />
        <MarkButton format="code" icon={<Icon as={BsCode} />} />
      </Toolbar>
      <Editable
        className="leaf-main"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Interview text here..."
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <SlateIcon>{icon}</SlateIcon>
    </Button>
  );
};

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'The mock interview will be held here...' }],
  },
];

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps, {})(SlateEditor);
