import  { CHANGE_NAV_NAME } from '../../src/constants/actionTypes';
import navName from '../../src/reducers/navName';


describe('navName reducer', () => {
    it('should return the initial state', () => {
        expect(navName(undefined, {})).to.be.equal('全部日记');
    });

    it('should return a new navName', () => {
        expect(navName('分类1', {
            type: CHANGE_NAV_NAME,
            navName: '分类2'
        })).to.be.equal('分类2');
    });
});
