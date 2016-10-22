/**
* 编辑器
**/


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addCat, delCat, addTag, delTag, addPost, delPost, toggleAside, toggleScreen,
  updateTitle, updateBody, updateCat, updateTag } from '../actions';
import EditorNav from '../components/EditorNav';
import EditorMain from '../components/EditorMain';


class Editor extends React.PureComponent {
    constructor(props) {
        super(props);
        this.post = this.props.posts[this.props.params.id];
        if (this.post !== undefined) {
            // 屏幕显示切换，撤销恢复标志，撤销恢复记录栈
            this.state = {
                screenShow: 2,
                do: false,
                undoStack: [this.post.body],
                redoStack: []
            };
        }
        this.handleDrop = this.handleDrop.bind(this);
    }


    componentDidMount() {
        if (this.post !== undefined) {
            this.timer = setTimeout(() => this.setStack(), 2000);
            document.addEventListener('drop', this.handleDrop);
        }
    }


    componentWillReceiveProps(nextProps) {
        this.post = nextProps.posts[nextProps.params.id];
        if (this.props.params.id !== nextProps.params.id) {
            this.state = { screenShow: 2, undoStack: [this.post.body], redoStack: [] };
        }
    }


    componentWillUnmount() {
        if (this.post !== undefined) {
            clearTimeout(this.timer);
            document.removeEventListener('drop', this.handleDrop);
        }
    }


    // 设置撤销栈
    setStack() {
        const undoStack = [...this.state.undoStack];
        if (undoStack[undoStack.length - 1] !== this.post.body) {
            if (undoStack.length > 50) {
                undoStack.shift();
            }
            undoStack.push(this.post.body);
            this.setState({ undoStack });
        }
        this.timer = setTimeout(() => this.setStack(), 2000);
    }


    // 处理撤销操作
    handleUndo() {
        const undoStack = [...this.state.undoStack];
        const redoStack = [...this.state.redoStack];
        if (undoStack.length > 1) {
            const body = undoStack[undoStack.length - 2];
            redoStack.push(undoStack.pop());
            this.setState({ do: true, undoStack, redoStack });
            this.props.dispatch(updateBody(this.post.id, body));
        }
    }


    // 处理恢复操作
    handleRedo() {
        const undoStack = [...this.state.undoStack];
        const redoStack = [...this.state.redoStack];
        if (redoStack.length > 0) {
            const body = redoStack.pop();
            undoStack.push(body);
            this.setState({ do: true, undoStack, redoStack });
            this.props.dispatch(updateBody(this.post.id, body));
        }
    }


    // 处理文件拖拽上传操作
    handleDrop() {
        const reader = new FileReader();
        reader.onload = e => {
            this.setState({ redoStack: [] });
            this.props.dispatch(updateBody(e.target.result));
        };
        reader.readAsText(event.dataTransfer.files[0]);
        event.preventDefault();
    }


    render() {
        const { postIds, categories, tags, posts, fullScreen, dispatch, router } = this.props;
        const postId = +this.props.params.id;
        const post = posts[postId];

        if (post === undefined) {
            return (
                <div className="notfound">
                    <h2>404</h2>
                    <p>Post not found</p>
                    <button onClick={() => router.replace('/')}>Back To Home</button>
                </div>
            );
        }

        return (
            <div className="editor-warpper">
                <EditorNav
                  title={post.title}
                  category={post.category}
                  tag={post.tag}
                  body={post.body}
                  categories={categories}
                  tags={tags}
                  addCat={cat => dispatch(addCat(cat))}
                  delCat={cat => dispatch(delCat(cat))}
                  addTag={tag => dispatch(addTag(tag))}
                  delTag={tag => dispatch(delTag(tag))}
                  addPost={(cat, year, date) => {
                      this.setState({ undoStack: [], redoStack: [] });
                      dispatch(addPost(postIds[0] + 1, cat, year, date));
                      router.replace(`/editor/${postIds[0] + 1}`);
                  }}
                  delPost={() => {
                      dispatch(delPost(postId));
                      router.replace('/');
                  }}
                  toggleAside={() => dispatch(toggleAside())}
                  toggleScreen={() => dispatch(toggleScreen())}
                  updateTitle={title => dispatch(updateTitle(postId, title))}
                  updateCat={cat => dispatch(updateCat(postId, cat))}
                  updateTag={tag => dispatch(updateTag(postId, tag))}
                  handleUndo={() => this.handleUndo()}
                  handleRedo={() => this.handleRedo()}
                  changeScreen={show => this.setState({ screenShow: show })}
                />
                <EditorMain
                  do={this.state.do}
                  body={post.body}
                  fullScreen={fullScreen}
                  screenShow={this.state.screenShow}
                  cancelDo={() => this.setState({ do: false })}
                  updateBody={body => {
                      this.setState({ redoStack: [] });
                      dispatch(updateBody(postId, body));
                  }}
                />
            </div>
        );
    }
}

Editor.propTypes = {
    postIds: PropTypes.array.isRequired,
    categories: PropTypes.object.isRequired,
    tags: PropTypes.object.isRequired,
    posts: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        tag: PropTypes.array.isRequired
    })).isRequired,
    fullScreen: PropTypes.bool.isRequired
};


function selector(state) {
    return {
        postIds: state.getIn(['diarys', 'postIds']).toJS(),
        categories: state.getIn(['diarys', 'categories']).toJS(),
        tags: state.getIn(['diarys', 'tags']).toJS(),
        posts: state.getIn(['diarys', 'posts']).toJS(),
        fullScreen: state.get('fullScreen')
    };
}

export default connect(selector)(Editor);
