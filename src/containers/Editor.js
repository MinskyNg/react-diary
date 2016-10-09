import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addCat, delCat, addTag, delTag, addPost, delPost, toggleAside,
  updateTitle, updateBody, updateCat, updateTag } from '../actions';
import EditorNav from '../components/EditorNav';
import EditorMain from '../components/EditorMain';


class Editor extends React.PureComponent {
    constructor(props) {
        super(props);
        this.post = this.props.posts[this.props.params.id];
        this.state = { screenShow: 2, undoStack: [], redoStack: [] };
        this.handleDrop = this.handleDrop.bind(this);
    }

    componentDidMount() {
        this.timer = setTimeout(() => this.setStack(), 2000);
        document.addEventListener('drop', this.handleDrop);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        document.removeEventListener('drop', this.handleDrop);
    }

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

    handleUndo() {
        const undoStack = [...this.state.undoStack];
        const redoStack = [...this.state.redoStack];
        if (undoStack.length > 1) {
            const body = undoStack[undoStack.length - 2];
            redoStack.push(undoStack.pop());
            this.setState({ undoStack, redoStack });
            this.props.dispatch(updateBody(body));
        }
    }

    handleRedo() {
        const undoStack = [...this.state.undoStack];
        const redoStack = [...this.state.redoStack];
        if (redoStack.length > 0) {
            const body = redoStack.pop();
            undoStack.push(body);
            this.setState({ undoStack, redoStack });
            this.props.dispatch(updateBody(body));
        }
    }

    handleDrop() {
        // 文件读取API
        const reader = new FileReader();
        reader.onload = evt => {
            this.setState({ redoStack: [] });
            this.props.dispatch(updateBody(evt.target.result));
        };
        reader.readAsText(event.dataTransfer.files[0]);
        event.preventDefault();
    }

    render() {
        const { postIds, categories, tags, posts, asideShow, dispatch, router } = this.props;
        const postId = this.props.params.id;
        const post = posts[postId];
        if (post === undefined) {
            return (<div></div>);
        }
        return (
            <div className="content">
                <EditorNav
                  title={post.title}
                  category={post.category}
                  tag={post.tag}
                  body={post.body}
                  categories={categories}
                  tags={tags}
                  asideShow={asideShow}
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
                  updateTitle={title => dispatch(updateTitle(postId, title))}
                  updateCat={cat => dispatch(updateCat(postId, cat))}
                  updateTag={tag => dispatch(updateTag(postId, tag))}
                  handleUndo={() => this.handleUndo()}
                  handleRedo={() => this.handleRedo()}
                  changeScreen={show => this.setState({ screenShow: show })}
                />
                <EditorMain
                  body={post.body}
                  screenShow={this.state.screenShow}
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
    posts: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        tag: PropTypes.array.isRequired
    }).isRequired,
    asideShow: PropTypes.bool.isRequired
};


function selector(state) {
    return {
        postIds: state.getIn(['diarys', 'postIds']).toJS(),
        categories: state.getIn(['diarys', 'categories']).toJS(),
        tags: state.getIn(['diarys', 'tags']).toJS(),
        posts: state.getIn(['diarys', 'posts']).toJS(),
        asideShow: state.get('asideShow')
    };
}

export default connect(selector)(Editor);
