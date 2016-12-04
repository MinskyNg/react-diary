/**
 * 编辑器导航栏
 * @class EditorNav
 * @prop {string} title 文章标题
 * @prop {string} category 文章类别
 * @prop {array} tag 文章标签
 * @prop {string} body 文章内容
 * @prop {object} categories 分类列表
 * @prop {array} tags 标签列表
 * @prop {function} addCat 添加分类
 * @prop {function} delCat 删除分类
 * @prop {function} addTag 添加标签
 * @prop {function} delTag 删除标签
 * @prop {function} addPost 新建文章
 * @prop {function} delPost 删除文章
 * @prop {function} toggleAside 切换边栏
 * @prop {function} toggleScreen 切换全屏
 * @prop {function} updateTitle 更新标题
 * @prop {function} updateCat 更新类别
 * @prop {function} updateTag 更新标签
 * @prop {function} handleUndo 撤销
 * @prop {function} handleRedo 重做
 * @prop {function} changeScreen 改变显示模式
 */


import React from 'react';


export default class EditorNav extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { tagHandlerShow: false, catHandlerShow: false };
    }

    // 标题改变
    handleTitleChange(event) {
        const title = event.target.value.replace(/(^\s*)|(\s*$)/g, '');
        this.props.updateTitle(title || '');
    }

    // 下拉多选改变
    handleMultiSelect(event) {
        const options = event.target.options;
        const tag = [];
        for (let i = 0, len = options.length; i < len; i++) {
            if (options[i].selected) {
                tag.push(options[i].value);
            }
        }
        this.props.updateTag(tag);
    }

    // 添加日记
    handleAddPost() {
        let date = new Date();
        const year = date.getFullYear();
        const hour = date.getHours();
        const min = date.getMinutes();
        date = `${date.getMonth() + 1}月 ${date.getDate()}日 ${hour < 10 ? (`0${hour}`) : hour}:${min < 10 ? (`0${min}`) : min}`;
        this.props.addPost(this.props.category, year, date);
    }

    // 删除日记
    handleDelPost() {
        if (confirm('确定要删除此日记吗?')) {
            this.props.delPost();
        }
    }

    // 切换显示分类管理面板
    toggleCatHanlder(event) {
        if (event.target === this._catIcon) {
            this.setState({ catHandlerShow: !this.state.catHandlerShow });
        }
    }

    // 添加分类
    handleAddCat(event) {
        if (event.keyCode === 13) {
            const cat = event.target.value.replace(/(^\s*)|(\s*$)/g, '');
            if (cat !== null && cat !== '') {
                event.target.value = '';
                this.props.addCat(cat);
            }
        }
        event.preventDefault();
        event.stopPropagation();
    }

    // 删除分类
    handleDelCat(event, cat) {
        if (confirm('确定要删除此分类吗?')) {
            this.props.delCat(cat);
        }
    }

    // 切换显示标签管理面板
    toggleTagHanlder(event) {
        if (event.target === this._tagIcon) {
            this.setState({ tagHandlerShow: !this.state.tagHandlerShow });
        }
    }

    // 添加标签
    handleAddTag(event) {
        if (event.keyCode === 13) {
            const tag = event.target.value.replace(/(^\s*)|(\s*$)/g, '');
            if (tag !== null && tag !== '') {
                event.target.value = '';
                this.props.addTag(tag);
            }
        }
        event.preventDefault();
        event.stopPropagation();
    }

    // 删除标签
    handleDelTag(event, tag) {
        if (confirm('确定要删除此标签吗?')) {
            this.props.delTag(tag);
        }
    }

    // 下载日记
    handleDown() {
        const name = `${this.props.title}.md`;
        const blob = new Blob([this.props.body], {
            type: 'text/plain'
        });
        if (window.saveAs) {
            // IE
            window.saveAs(blob, name);
        } else if (navigator.saveBlob) {
            // IE
            navigator.saveBlob(blob, name);
        } else {
            // 非IE
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', name);
            // 模拟点击下载事件
            const event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
            link.dispatchEvent(event);
        }
    }


    render() {
        const { categories, tags, changeScreen } = this.props;

        // 生成分类/标签Select选项
        let catOptions = Object.keys(categories).map(cat => <option key={cat} value={cat}>{cat}</option>);
        let tagOptions = Object.keys(tags).map(tag => <option key={tag} value={tag}>{tag}</option>);

        // 生成分类/标签项
        let catItems = Object.keys(categories).map(cat => (
                <li key={cat}>
                    <span>{cat} ({categories[cat].length})</span>
                    <span title="删除分类" className="icon-delete" onClick={e => this.handleDelCat(e, cat)}></span>
                </li>
            )
        );
        let tagItems = Object.keys(tags).map(tag => (
                <li key={tag}>
                    <span>{tag} ({tags[tag].length})</span>
                    <span title="删除标签" className="icon-delete" onClick={e => this.handleDelTag(e, tag)}></span>
                </li>
            )
        );

        const panelShowStyle = {
            top: '45px',
            visibility: 'visible',
            opacity: 1
        };
        const panelHiddenStyle = {
            top: '15px',
            visibility: 'hidden',
            opacity: 0
        };

        return (
            <nav className="nav">
                <button className="full-screen" title="全屏模式"
                  onClick={() => this.props.toggleScreen()}
                >
                    <i className="icon-fullScreen"></i>
                </button>
                <input
                  className="input-title"
                  type="text"
                  placeholder="请输入标题"
                  value={this.props.title}
                  onChange={(e) => this.handleTitleChange(e)}
                />
                <select
                  value={this.props.category}
                  onChange={(e) => this.props.updateCat(e.target.value)}
                >
                    {catOptions}
                </select>
                <select multiple="true" size="1"
                  value={this.props.tag}
                  onChange={(e) => this.handleMultiSelect(e)}
                >
                    {tagOptions}
                </select>
                <button className="add-tag" title="管理标签"
                  onClick={e => this.toggleTagHanlder(e)}
                >
                    <i className="icon-addTag"
                      ref={ i => this._tagIcon = i }
                    ></i>
                    <div className="panel"
                      style={this.state.tagHandlerShow ? panelShowStyle : panelHiddenStyle}
                    >
                        <input type="text" placeholder="回车添加标签"
                          onKeyUp={e => this.handleAddTag(e)}
                        />
                        <h3>所有标签</h3>
                        <ul>{tagItems}</ul>
                    </div>
                </button>
                <button className="add-cat" title="管理分类"
                  onClick={e => this.toggleCatHanlder(e)}
                >
                    <i className="icon-addCat"
                      ref={ i => this._catIcon = i }
                    ></i>
                    <div className="panel"
                      style={this.state.catHandlerShow ? panelShowStyle : panelHiddenStyle}
                    >
                        <input type="text" placeholder="回车添加分类"
                          onKeyUp={e => this.handleAddCat(e)}
                        />
                        <h3>所有分类</h3>
                        <ul>{catItems}</ul>
                    </div>
                </button>
                <button className="add-post" title="添加日记"
                  onClick={() => this.handleAddPost()}
                >
                    <i className="icon-addPost"></i>
                </button>
                <button className="del" title="删除日记"
                  onClick={() => this.handleDelPost()}
                >
                    <i className="icon-del"></i>
                </button>
                <button className="download" title="下载日记"
                  onClick={() => this.handleDown()}
                >
                    <i className="icon-download"></i>
                </button>
                <i className="split"></i>
                <button className="show-preview" title="只显示预览区"
                  onClick={() => changeScreen(1)}
                >
                    <i className="icon-preview"></i>
                </button>
                <button className="show-editor" title="只显示编辑区"
                  onClick={() => changeScreen(0)}
                >
                    <i className="icon-editor"></i>
                </button>
                <button className="show-double" title="双屏显示"
                  onClick={() => changeScreen(2)}
                >
                    <i className="icon-double"></i>
                </button>
                <i className="split"></i>
                <button className="redo" title="恢复"
                  onClick={() => this.props.handleRedo()}
                >
                    <i className="icon-redo"></i>
                </button>
                <button className="undo" title="撤销"
                  onClick={() => this.props.handleUndo()}
                >
                    <i className="icon-undo"></i>
                </button>
            </nav>
        );
    }
}
