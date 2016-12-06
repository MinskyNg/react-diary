import React from 'react';
import { shallow } from 'enzyme';
import Aside from '../../src/components/Aside';


describe('<Aside />', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            postLen: 3,
            categories: {
                未分类: [],
                分类1: [3, 1],
                分类2: [2]
            },
            asideShow: false
        };
        wrapper = shallow(<Aside {...props} />);
    });

    it('should render wrapper correctly', () => {
        expect(wrapper.type()).to.equal('aside');
        expect(wrapper.hasClass('category-list')).to.be.true;
        expect(wrapper.hasClass('category-hidden')).to.be.true;
        expect(wrapper.childAt(0).type()).to.equal('ul');
    });


    it('should render <IndexLink /> component correctly', () => {
        let IndexLink = wrapper.find('IndexLink');
        expect(IndexLink.length).to.equal(1);
        IndexLink = IndexLink.at(0);
        expect(IndexLink.prop('to')).to.equal('/');
        expect(IndexLink.prop('activeClassName')).to.exist;
        expect(IndexLink.find('.category-name').text()).to.equal('• 全部日记');
        expect(IndexLink.find('.category-count').text()).to.equal('3');
    });

    it('should render <Link /> components correctly', () => {
        let Link = wrapper.find('Link');
        expect(Link.length).to.equal(3);
        Link = Link.at(1);
        expect(Link.prop('to')).to.equal('/category/分类1');
        expect(Link.prop('activeClassName')).to.exist;
        expect(Link.find('.category-name').text()).to.equal('• 分类1');
        expect(Link.find('.category-count').text()).to.equal('2');
    });
});
