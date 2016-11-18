/**
 * 导航栏
 * @class Nav
 * @prop {string} navName 导航栏标题
 * @prop {object} categories 分类列表
 * @prop {array} tags 标签列表
 * @prop {boolean} asideShow 是否显示侧边栏
 * @prop {function} addCat 添加分类
 * @prop {function} delCat 删除分类
 * @prop {function} addTag 添加标签
 * @prop {function} delTag 删除标签
 * @prop {function} addPost 新建文章
 * @prop {function} toggleAside 切换边栏
 * @prop {function} toggleScreen 切换全屏
 */


import React from 'react';


export default class Nav extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { tagHandlerShow: false, catHandlerShow: false };
    }

    // 添加日记
    handleAddPost() {
        let date = new Date();
        const year = date.getFullYear();
        const hour = date.getHours();
        const min = date.getMinutes();
        date = `${date.getMonth() + 1}-${date.getDate()} ${hour < 10 ? (`0${hour}`) : hour}:${min < 10 ? (`0${min}`) : min}`;
        this.props.addPost(this.props.navName, year, date);
        event.preventDefault();
        event.stopPropagation();
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
        event.preventDefault();
        event.stopPropagation();
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
        event.preventDefault();
        event.stopPropagation();
    }


    render() {
        const { categories, tags } = this.props;

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
                <button
                  className="aside-toggle"
                  title="切换边栏"
                  onClick={() => this.props.toggleAside()}
                >
                    <i className={this.props.asideShow ? 'icon-left' : 'icon-right'}></i>
                </button>
                <button className="full-screen" title="全屏模式"
                  onClick={() => this.props.toggleScreen()}
                >
                    <i className="icon-fullScreen"></i>
                </button>
                <h2>{this.props.navName}</h2>
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
            </nav>
        );
    }
}
