import React from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import CodeMirror from 'codemirror';
import EditorBar from './EditorBar';
require('codemirror/mode/gfm/gfm.js');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/3024-day.css');


export default class EditorMain extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            height: this.props.fullScreen ? document.body.scrollHeight - 56 : document.body.scrollHeight - 116
        };
        this.updateHeight = this.updateHeight.bind(this);
        this.cmChanged = this.cmChanged.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        // 配置markdown解析器和highlight.js
        marked.setOptions({ highlight: code => hljs.highlightAuto(code).value });
    }

    componentDidMount() {
        this.editor = CodeMirror.fromTextArea(this._textarea, {
            theme: '3024-day',
            mode: 'markdown',
            lineWrapping: true,
            lineNumbers: true
        });
        this.editorScroller = this.editor.getScrollerElement();
        this.editor.setSize('50%', '100%');
        this.editor.on('change', this.cmChanged);
        this.editorScroller.addEventListener('scroll', this.handleScroll);
        this._preview.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.updateHeight);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.do) {
            this.editor.setValue(nextProps.body);
            nextProps.cancelDo();
        }

        if (this.props.body !== '' && nextProps.body === '') {
            this.editor.setValue('');
        }

        if (this.props.screenShow !== nextProps.screenShow) {
            if (nextProps.screenShow === 2) {
                this.editor.setSize('50%', '100%');
                if (this.props.screenShow !== 2) {
                    this.editorScroller.addEventListener('scroll', this.handleScroll);
                    this._preview.addEventListener('scroll', this.handleScroll);
                }
            } else if (nextProps.screenShow === 0) {
                this.editor.setSize('100%', '100%');
                if (this.props.screenShow === 2) {
                    this.editorScroller.addEventListener('scroll', this.handleScroll);
                    this._preview.addEventListener('scroll', this.handleScroll);
                }
            } else {
                this.editor.setSize('0%', '0%');
                if (this.props.screenShow === 2) {
                    this.editorScroller.removeEventListener('scroll', this.handleScroll);
                    this._preview.removeEventListener('scroll', this.handleScroll);
                }
            }
        }

        if (this.props.fullScreen !== nextProps.fullScreen) {
            this.setState({
                height: nextProps.fullScreen ? document.body.scrollHeight - 56 : document.body.scrollHeight - 116
            });
        }
    }

    componentWillUnmount() {
        this.editor.off('change', this.cmChanged);
        this.editorScroller.removeEventListener('scroll', this.handleScroll);
        this._preview.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.updateHeight);
    }

    updateHeight() {
        this.setState({
            height: this.props.fullScreen ? document.body.scrollHeight - 56 : document.body.scrollHeight - 116
        });
    }

    getEditor() {
        return this.editor;
    }

    cmChanged(doc, change) {
        if (change.origin !== 'setValue') {
            this.props.updateBody(doc.getValue());
        }
    }

    handleScroll() {
        const target = event.target;
        let other;
        if (target === this.editorScroller) {
            other = this._preview;
        } else {
            other = this.editorScroller;
        }
        // 移除另一个区域的滚动事件 防止循环滚动
        other.removeEventListener('scroll', this.handleScroll);
        // 滚动大小按内容百分比计算
        const percentage = target.scrollTop / (target.scrollHeight - target.offsetHeight);
        other.scrollTop = percentage * (other.scrollHeight - other.offsetHeight);
        // 恢复另一个区域的滚动事件
        setTimeout(() => {
            other.addEventListener('scroll', this.handleScroll);
        }, 300);
    }

    render() {
        const markup = marked(this.props.body.toString(), { sanitize: true });
        const screenShow = this.props.screenShow;
        let width;
        if (screenShow === 2) {
            width = 50;
        } else if (screenShow === 0) {
            width = 0;
        } else {
            width = 100;
        }
        const previewStyle = {
            display: screenShow !== 0 ? 'block' : 'none',
            width: `${width}%`
        };
        return (
            <div className="editor-wrapper"
              style={{ height: `${this.state.height}px` }}
            >
                <textarea
                  ref={textarea => this._textarea = textarea}
                  defaultValue={this.props.body}
                >
                </textarea>
                <div
                  className="preview"
                  style={previewStyle}
                  ref={div => this._preview = div}
                  dangerouslySetInnerHTML={{ __html: markup }}
                >
                </div>
                <EditorBar
                  screenShow={screenShow}
                  getEditor={() => this.getEditor()}
                  updateBody={(body) => this.props.updateBody(body)}
                />
            </div>
        );
    }
}
