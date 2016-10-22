/**
* 标签页面
**/


import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { delPost, changeNavName } from '../actions';
import ArchiveItem from '../components/ArchiveItem';


class Tag extends React.PureComponent {
    componentDidMount() {
        this.props.dispatch(changeNavName(this.props.params.tagName));
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.params.tagName !== nextProps.params.tagName) {
            nextProps.dispatch(changeNavName(nextProps.params.tagName));
        }
    }


    render() {
        const tagName = this.props.params.tagName;
        const { tags, posts, asideShow, dispatch } = this.props;
        const tagIds = tags[tagName];

        if (tagIds === undefined) {
            return (
                <div className="notfound">
                    <h2>404</h2>
                    <p>Tag not found</p>
                    <button onClick={() => browserHistory.replace('/')}>Back To Home</button>
                </div>
            );
        }

        let ArchiveItems = [];
        let i = 0;
        const len = tagIds.length;
        // 匹配日记按年份输出
        while (i < len) {
            let prevPost = posts[tagIds[i]];
            let nextPost = posts[tagIds[++i]];
            let articles = [prevPost];
            while (nextPost && prevPost.year === nextPost.year) {
                prevPost = nextPost;
                nextPost = posts[tagIds[++i]];
                articles.push(prevPost);
            }
            ArchiveItems.push(
                <ArchiveItem
                  key={prevPost.year}
                  year={prevPost.year}
                  articles={articles}
                  asideShow={asideShow}
                  delPost={id => dispatch(delPost(id))}
                />
            );
        }

        return (
            <div>
                {ArchiveItems}
            </div>
        );
    }
}


Tag.propTypes = {
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
    asideShow: PropTypes.bool.isRequired
};


function selector(state) {
    return {
        tags: state.getIn(['diarys', 'tags']).toJS(),
        posts: state.getIn(['diarys', 'posts']).toJS(),
        asideShow: state.get('asideShow')
    };
}

export default connect(selector)(Tag);
