import React from 'react';
import { shallow } from 'enzyme';
import EditorMain from '../../src/components/EditorMain';


describe.only('<EditorMain />', () => {
    let spyes;
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            do: false,
            body: '# body',
            fullScreen: false,
            screenShow: 2,
            cancelDo: sinon.spy(),
            updateBody: sinon.spy()
        };

        wrapper = shallow(<EditorMain {...props} />);
    });


    it('should render wrapper correctly', () => {
        const textarea = wrapper.childAt(0);
        const preview = wrapper.childAt(1);

        expect(wrapper.hasClass('editor-main')).to.be.true;
        expect(textarea.type()).to.equal('textarea');
        expect(textarea.prop('defaultValue')).to.equal('# body');
        expect(preview.hasClass('preview')).to.be.true;
        expect(preview.prop('dangerouslySetInnerHTML')).to.deep.equal({ __html: '<h1 id="body">body</h1>\n' });
    });

    it('should render <EditorBar /> correctly', () => {
        expect(wrapper.find('EditorBar')).to.be.ok;
    });
});
