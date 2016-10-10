import React from 'react';


export default class EditorNav extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { tagHandlerShow: false, catHandlerShow: false };
    }

    handleTitleChange(event) {
        const title = event.target.value.replace(/(^\s*)|(\s*$)/g, '');
        this.props.updateTitle(title || '');
    }

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

    handleAddPost() {
        let date = new Date();
        const year = date.getFullYear();
        date = `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        this.props.addPost(this.props.category, year, date);
    }

    handleDelPost() {
        if (confirm('确定要删除此日记吗?')) {
            this.props.delPost();
        }
    }

    toggleCatHanlder(event) {
        if (event.target === this._catHandler) {
            this.setState({ catHandlerShow: !this.state.catHandlerShow });
        }
    }

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

    handleDelCat(event, cat) {
        if (confirm('确定要删除此分类吗?')) {
            this.props.delCat(cat);
        }
    }

    toggleTagHanlder(event) {
        if (event.target === this._tagHandler) {
            this.setState({ tagHandlerShow: !this.state.tagHandlerShow });
        }
    }

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

    handleDelTag(event, tag) {
        if (confirm('确定要删除此标签吗?')) {
            this.props.delTag(tag);
        }
    }

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
        let catOptions = Object.keys(categories).map(cat => <option key={cat} value={cat}>{cat}</option>);
        let tagOptions = Object.keys(tags).map(tag => <option key={tag} value={tag}>{tag}</option>);
        let catItems = Object.keys(categories).map(cat => (
                <li key={cat}>
                    <span>{cat} ({categories[cat].length})</span>
                    <span className="delete" onClick={e => this.handleDelCat(e, cat)}></span>
                </li>
            )
        );
        let tagItems = Object.keys(tags).map(tag => (
                <li key={tag}>
                    <span>{tag} ({tags[tag].length})</span>
                    <span className="delete" onClick={e => this.handleDelTag(e, tag)}></span>
                </li>
            )
        );
        return (
            <nav className="nav">
                <button
                  className={this.props.asideShow ? 'aside-hidden' : 'aside-show'}
                  title="切换边栏"
                  onClick={() => this.props.toggleAside()}
                >
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
                <button className="add-post" title="添加日记"
                  onClick={() => this.handleAddPost()}
                >
                </button>
                <button className="add-tag" title="管理标签"
                  ref={ button => this._tagHandler = button }
                  onClick={e => this.toggleTagHanlder(e)}
                >
                    <div className="triangle"
                      style={{ display: this.state.tagHandlerShow ? 'block' : 'none' }}
                    ></div>
                    <div className="panel"
                      style={{ display: this.state.tagHandlerShow ? 'block' : 'none' }}
                    >
                        <input type="text" placeholder="回车添加标签"
                          onKeyUp={e => this.handleAddTag(e)}
                        />
                        <h3>所有标签</h3>
                        <ul>{tagItems}</ul>
                    </div>
                </button>
                <button className="add-category" title="管理分类"
                  ref={ button => this._catHandler = button }
                  onClick={e => this.toggleCatHanlder(e)}
                >
                    <div className="triangle"
                      style={{ display: this.state.catHandlerShow ? 'block' : 'none' }}
                    ></div>
                    <div className="panel"
                      style={{ display: this.state.catHandlerShow ? 'block' : 'none' }}
                    >
                        <input type="text" placeholder="回车添加分类"
                          onKeyUp={e => this.handleAddCat(e)}
                        />
                        <h3>所有分类</h3>
                        <ul>{catItems}</ul>
                    </div>
                </button>
                <button className="show-preview" title="只显示预览区"
                  onClick={() => changeScreen(1)}
                >
                </button>
                <button className="show-editor" title="只显示编辑区"
                  onClick={() => changeScreen(0)}
                >
                </button>
                <button className="show-double" title="双屏显示"
                  onClick={() => changeScreen(2)}
                >
                </button>
                <button className="redo" title="恢复"
                  onClick={() => this.props.handleRedo()}
                >
                </button>
                <button className="undo" title="撤销"
                  onClick={() => this.props.handleUndo()}
                >
                </button>
                <button className="download" title="下载日记"
                  onClick={() => this.handleDown()}
                >
                </button>
                <button className="del" title="删除日记"
                  onClick={() => this.handleDelPost()}
                >
                </button>
            </nav>
        );
    }
}
