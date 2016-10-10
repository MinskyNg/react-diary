import React from 'react';
import { Link, IndexLink } from 'react-router';


export default class Aside extends React.PureComponent {
    render() {
        const { postLen, categories, asideShow } = this.props;
        let categoryItems = Object.keys(categories).map(category => (
                <Link key={category} to={`/category/${category}`} activeClassName="active">
                    <h4 className="category-name">{category}</h4>
                    <span className="category-count">{categories[category].length}</span>
                </Link>
            )
        );
        return (
            <aside className="category-list" style={{ display: asideShow ? 'block' : 'none' }}>
                <IndexLink to="/" activeClassName="active">
                    <h4 className="category-name">全部日记</h4>
                    <span className="category-count">{postLen}</span>
                </IndexLink>
                {categoryItems}
            </aside>
        );
    }
}