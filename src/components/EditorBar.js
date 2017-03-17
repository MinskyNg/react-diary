/**
 * 编辑器工具栏
 * @function EditorBar
 * @prop {function} getEditor 获取编辑器元素
 * @prop {function} updateBody 更新文章内容
 * @prop {number} screenShow 显示模式
 */


import React from 'react';


const textMap = {
    heading: '## 请输入标题',
    strong: '**请输入文字**',
    italic: '*请输入文字*',
    code: '\t 请输入代码',
    img: '![图片说明](图片地址)',
    url: '[链接说明](链接地址)',
    ul: '* 请输入列表项',
    ol: '1. 请输入列表项',
    quote: '> 请输入引用',
    line: '-------'
};


export default function EditorBar({ screenShow, getEditor, updateBody }) {
    // 根据标记类型改变选区
    function insertText(type) {
        const text = textMap[type];
        const editor = getEditor();
        const start = editor.getCursor(true);
        const end = editor.getCursor(false);
        if (start.line === end.line && start.ch === end.ch) {
            editor.replaceSelection(text);
            const cursor = editor.getCursor(false);
            switch (type) {
                case 'heading':
                case 'code':
                case 'quote':
                    editor.setSelection({ line: cursor.line, ch: cursor.ch - 5 }, cursor);
                    break;
                case 'strong':
                    editor.setSelection({ line: cursor.line, ch: cursor.ch - 7 }, { line: cursor.line, ch: cursor.ch - 2 });
                    break;
                case 'italic':
                    editor.setSelection({ line: cursor.line, ch: cursor.ch - 6 }, { line: cursor.line, ch: cursor.ch - 1 });
                    break;
                case 'img':
                case 'url':
                    editor.setSelection({ line: cursor.line, ch: cursor.ch - 5 }, { line: cursor.line, ch: cursor.ch - 1 });
                    break;
                case 'ul':
                case 'ol':
                    editor.setSelection({ line: cursor.line, ch: cursor.ch - 6 }, cursor);
                    break;
                default:
            }
        } else {
            switch (type) {
                case 'heading':
                    editor.replaceSelection(`## ${editor.getSelection()}`);
                    break;
                case 'strong':
                    editor.replaceSelection(`**${editor.getSelection()}**`);
                    break;
                case 'italic':
                    editor.replaceSelection(`*${editor.getSelection()}*`);
                    break;
                case 'code':
                    editor.replaceSelection(`\t ${editor.getSelection()}`);
                    break;
                case 'img':
                    editor.replaceSelection(`![图片说明](${editor.getSelection()})`);
                    break;
                case 'url':
                    editor.replaceSelection(`[链接说明](${editor.getSelection()})`);
                    break;
                case 'ul':
                    editor.replaceSelection(`* ${editor.getSelection()}`);
                    break;
                case 'ol':
                    editor.replaceSelection(`1. ${editor.getSelection()}`);
                    break;
                case 'quote':
                    editor.replaceSelection(`> ${editor.getSelection()}`);
                    break;
                default:
                    editor.replaceSelection('-------');
            }
        }
        editor.focus();
        updateBody(editor.getValue());
    }


    return (
        <div className="toolbar" style={{ display: screenShow !== 1 ? 'block' : 'none' }}>
            <button title="添加标题"
              onClick={() => insertText('heading')}
            >
                <i className="icon-heading"></i>
            </button>
            <button title="添加粗体"
              onClick={() => insertText('strong')}
            >
                <i className="icon-strong"></i>
            </button>
            <button title="添加斜体"
              onClick={() => insertText('italic')}
            >
                <i className="icon-italic"></i>
            </button>
            <button title="添加代码"
              onClick={() => insertText('code')}
            >
                <i className="icon-code"></i>
            </button>
            <button title="添加链接"
              onClick={() => insertText('url')}
            >
                <i className="icon-link"></i>
            </button>
            <button title="添加图片"
              onClick={() => insertText('img')}
            >
                <i className="icon-img"></i>
            </button>
            <button title="添加无序列表"
              onClick={() => insertText('ul')}
            >
                <i className="icon-ul"></i>
            </button>
            <button title="添加有序列表"
              onClick={() => insertText('ol')}
            >
                <i className="icon-ol"></i>
            </button>
            <button title="添加块引用"
              onClick={() => insertText('quote')}
            >
                <i className="icon-quote"></i>
            </button>
            <button title="添加分割线"
              onClick={() => insertText('line')}
            >
                <i className="icon-line"></i>
            </button>
        </div>
    );
}
