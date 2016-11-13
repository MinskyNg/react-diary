import React from 'react';
import { shallow } from 'enzyme';
import EditorBar from '../../src/components/EditorBar';


describe('<EditorBar />', () => {
    it('should render wrapper correctly', () => {
        const props = {
            screenShow: 0,
            getEditor: null,
            updateBody: null
        };
        const wrapper = shallow(<EditorBar {...props} />);
        expect(wrapper.hasClass('toolbar')).to.be.true;
        expect(wrapper.prop('style')).to.deep.equal({ display: 'block' });
    });


    it('should render <button> correctly', () => {
        const props = {
            screenShow: 0,
            getEditor: null,
            updateBody: null
        };
        const wrapper = shallow(<EditorBar {...props} />);
        let button = wrapper.find('button');
        expect(button.length).to.equal(10);
        button = button.at(0);
        expect(button.prop('title')).to.equal('添加标题');
        expect(button.childAt(0).hasClass('icon-heading')).to.be.true;
    });


    it('should call insertText()', () => {
        let spyes = {
            getCursor: bool => (bool ? { line: 1, ch: 1 } : { line: 1, ch: 1 }),
            replaceSelection: sinon.spy(),
            setSelection: sinon.spy(),
            getSelection: sinon.stub().withArgs().returns('selection'),
            focus: sinon.spy(),
            getValue: sinon.spy()
        };
        let getEditor = sinon.stub().withArgs().returns(spyes);
        let props = {
            screenShow: 0,
            getEditor,
            updateBody: sinon.spy()
        };
        let wrapper = shallow(<EditorBar {...props} />);
        let button = wrapper.find('button').at(0);
        button.simulate('click');
        expect(getEditor.callCount).to.equal(1);
        expect(spyes.focus.callCount).to.equal(1);
        expect(spyes.getValue.callCount).to.equal(1);
        expect(spyes.replaceSelection.calledWith('## 请输入标题')).to.be.true;

        spyes = {
            getCursor: bool => (bool ? { line: 1, ch: 1 } : { line: 1, ch: 2 }),
            replaceSelection: sinon.spy(),
            setSelection: sinon.spy(),
            getSelection: sinon.stub().withArgs().returns('selection'),
            focus: sinon.spy(),
            getValue: sinon.spy()
        };
        getEditor = sinon.stub().withArgs().returns(spyes);
        props = {
            screenShow: 0,
            getEditor,
            updateBody: sinon.spy()
        };
        wrapper = shallow(<EditorBar {...props} />);
        button = wrapper.find('button').at(0);
        button.simulate('click');
        expect(getEditor.callCount).to.equal(1);
        expect(spyes.focus.callCount).to.equal(1);
        expect(spyes.getValue.callCount).to.equal(1);
        expect(spyes.replaceSelection.calledWith('## selection')).to.be.true;
    });
});
