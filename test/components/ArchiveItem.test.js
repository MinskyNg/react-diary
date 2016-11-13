import React from 'react';
import { shallow } from 'enzyme';
import ArchiveItem from '../../src/components/ArchiveItem';


describe('<ArchiveItem />', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            year: 2016,
            articles: [{ id: 1, title: '', body: '', year: 2016 }],
            delPost: sinon.spy(),
            asideShow: sinon.spy()
        };
        wrapper = shallow(<ArchiveItem {...props} />);
    });

    it('should render wrapper correctly', () => {
        expect(wrapper.find('.year').text()).to.equal('2016年');
    });

    it('should render <PostItem /> correctly', () => {
        expect(wrapper.find('PostItem').length).to.equal(1);
    });
});
