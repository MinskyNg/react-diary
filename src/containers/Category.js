import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { delPost, changeNavName } from '../actions';
import ArchiveItem from '../components/ArchiveItem';


class Category extends React.PureComponent {
    render() {
        const catName = this.props.params.catName;
        const { categories, posts, dispatch, router } = this.props;
        let ArchiveItems = [];
        const postIds = categories[catName];
        if (postIds === undefined) {
            return (<div></div>);
        }
        dispatch(changeNavName(catName));
        for (let i = 0, len = postIds.length; i < len; i++) {
            let prevPost = posts[postIds[i]];
            let articles = [prevPost];
            while (prevPost.year === posts[postIds[i + 1]].year) {
                prevPost = posts[postIds[i + 1]];
                articles.push(prevPost);
                i++;
            }
            ArchiveItems.push(
                <ArchiveItem
                  key={prevPost.year}
                  year={prevPost.year}
                  articles={articles}
                  delPost={id => dispatch(delPost(id))}
                  router={router}
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


Category.propTypes = {
    categories: PropTypes.object.isRequired,
    posts: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        tag: PropTypes.array.isRequired
    }).isRequired
};


function selector(state) {
    return {
        categories: state.getIn(['diarys', 'categories']).toJS(),
        posts: state.getIn(['diarys', 'posts']).toJS()
    };
}

export default connect(selector)(Category);
