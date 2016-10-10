import React from 'react';


export default class Nav extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { tagHandlerShow: false, catHandlerShow: false };
    }

    handleAddPost() {
        let date = new Date();
        const year = date.getFullYear();
        date = `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        this.props.addPost(this.props.navName, year, date);
        event.preventDefault();
        event.stopPropagation();
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
        event.preventDefault();
        event.stopPropagation();
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
        event.preventDefault();
        event.stopPropagation();
    }

    render() {
        const { categories, tags } = this.props;
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
                <h2>{this.props.navName}</h2>
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
            </nav>
        );
    }
}