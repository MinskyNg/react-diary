import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ArchiveItem from '../components/ArchiveItem';


class Archive extends React.PureComponent {
    render() {
        const { archives, posts } = this.props;
        const years = Object.keys(archives).sort((a, b) => a - b);
        let archiveItems = years.map((year) => {
            let yearPosts = archives[year].map((id) => posts[id]);
            return (
                <ArchiveItem
                  key={year}
                  year={year}
                  posts={yearPosts}
                />
            );
        });
        return (
            <div className="main archive">
                { archiveItems }
            </div>
        );
    }
}


Archive.propTypes = {
    archives: PropTypes.arrayOf(
        PropTypes.number
    ).isRequired,
    posts: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired
    }).isRequired
};


function selector(state) {
    return {
        archives: state.getIn(['diarys', 'archives']).toJS(),
        posts: state.getIn(['diarys', 'posts']).toJS()
    };
}

export default connect(selector)(Archive);
