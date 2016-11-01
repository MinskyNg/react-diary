import { TOGGLE_ASIDE } from '../../src/constants/actionTypes';
import asideShow from '../../src/reducers/asideShow';


describe('asideShow reducer', () => {
    it('should return the initial state', () => {
        expect(asideShow(undefined, {})).to.be.true;
    });

    it('should return to the opposite state', () => {
        expect(asideShow(undefined, { type: TOGGLE_ASIDE })).to.be.false;
        expect(asideShow(false, { type: TOGGLE_ASIDE })).to.be.true;
    });
});
