/**
 * 侧边栏
 * @class Aside
 * @prop {number} postLen 文章总数
 * @prop {object} categories 分类列表
 * @prop {boolean} asideShow 是否显示侧栏
 */


import React from 'react';
import { Link, IndexLink } from 'react-router';


export default class Aside extends React.PureComponent {
    render() {
        const { postLen, categories, asideShow } = this.props;
        // 生成分类列表
        let categoryItems = Object.keys(categories).map(category => (
                <li key={category}>
                    <Link to={`/category/${category}`} activeClassName="active">
                        <h4 className="category-name">{category}</h4>
                        <span className="category-count">{categories[category].length}</span>
                    </Link>
                </li>
            )
        );

        return (
            <aside className={`category-list${asideShow ? '' : ' category-hidden'}`}>
                <ul>
                    <li>
                        <IndexLink to="/" activeClassName="active">
                            <h4 className="category-name">全部日记</h4>
                            <span className="category-count">{postLen}</span>
                        </IndexLink>
                    </li>
                    {categoryItems}
                </ul>
            </aside>
        );
    }
}
