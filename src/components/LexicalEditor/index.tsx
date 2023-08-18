'use client';
import React from 'react';
import theme from './theme';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html"
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $getRoot, LexicalEditor, $insertNodes } from "lexical";
import ToolbarPlugin from './plugins/ToolbarPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';

export interface Props {
    label: string;
    name: string;
    onChange: any;
    value: string;
    placeholder?: string;
};

const TextEditor = (p: Props) => {
    const initialConfig = {
        namespace: 'MyEditor',
        theme: theme,
        onError: (error: Error): void => { console.error(error) },
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode,
        ],
        editorState: (editor: LexicalEditor) =>
            editor.update(() => {
                const parser = new DOMParser();
                const dom = parser.parseFromString(p?.value || '', 'text/html');
                const nodes = $generateNodesFromDOM(editor, dom);
                $getRoot().select();
                $insertNodes(nodes);
            })
        // editorState: () => $convertFromMarkdownString(p?.value, TRANSFORMERS)
    };
    return (
        <div className="relative space-y-2 mt-2">
            <p className="text-sm text-tc pb-2`">{p?.label}</p>
            <LexicalComposer initialConfig={initialConfig}>
                <ToolbarPlugin />
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="relative p-3 bg-white h-44 overflow-y-auto border" />
                    }
                    placeholder={<div className="editor-placeholder mt-1 md:mt-3"> {p?.placeholder ? p?.placeholder : "Enter some text..."}</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                {/* <OnChangePlugin onChange={(editorState) => {
                    editorState.read(() => {
                        const markdown = $convertToMarkdownString(TRANSFORMERS);
                        p?.onChange({ target: { name: p?.name, value: markdown } });
                    })
                }} /> */}
                <OnChangePlugin onChange={(_, editor: LexicalEditor) => {
                    editor.update(() => {
                        // const editorState = editor.getEditorState();
                        // const jsonString = JSON.stringify(editorState);
                        const htmlString = $generateHtmlFromNodes(editor, null);
                        p?.onChange({ target: { name: p?.name, value: htmlString } });
                    })
                }} />

                <AutoFocusPlugin />
                <CodeHighlightPlugin />
                <ListPlugin />
                <LinkPlugin />
                <AutoLinkPlugin />
                <ListMaxIndentLevelPlugin maxDepth={7} />
                {/* <OnChangeDebounce onChange={(e: any) => p?.onChange({ target: { name: p?.name, value: e } })} /> */}
                {/* <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
            </LexicalComposer>
        </div>
    );
};

export default TextEditor;

// import { TRANSFORMERS, $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown';
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

// function MyCustomAutoFocusPlugin() {
//     const [editor] = useLexicalComposerContext();
//     useEffect(() => {
//         editor.focus();
//     }, [editor]);
//     return null;
// }

// export const OnChangeDebounce: React.FC<{
//     ignoreInitialChange?: boolean;
//     ignoreSelectionChange?: boolean;
//     onChange: any;
//     wait?: number;
// }> = ({ ignoreInitialChange = true, ignoreSelectionChange = false, onChange, wait = 167 }) => {
//     const [editor] = useLexicalComposerContext();
//     let timerId: NodeJS.Timeout | null = null;

//     React.useLayoutEffect(() => {
//         return editor.registerUpdateListener(({
//             editorState,
//             dirtyElements,
//             dirtyLeaves,
//             prevEditorState
//         }) => {
//             if (ignoreSelectionChange && dirtyElements.size === 0 && dirtyLeaves.size === 0) {
//                 return;
//             }

//             if (ignoreInitialChange && prevEditorState.isEmpty()) {
//                 return;
//             }
//             if (timerId === null) {
//                 timerId = setTimeout(() => {
//                     editorState.read(() => {
//                         const root = $getRoot();
//                         onChange(root.getTextContent());
//                         // onChange(JSON.stringify(editorState));
//                         // localStorage.setItem('editorState', JSON.stringify(editorState))
//                     })
//                 }, wait);
//             } else {
//                 clearTimeout(timerId);
//                 timerId = setTimeout(() => {
//                     editorState.read(() => {
//                         const root = $getRoot();
//                         onChange(root.getTextContent());
//                         // onChange(JSON.stringify(editorState));
//                         // localStorage.setItem('editorState', JSON.stringify(editorState));
//                     });
//                 }, wait);
//             }
//         });
//     }, [editor, ignoreInitialChange, ignoreSelectionChange, onChange]);
//     return null;
// }
