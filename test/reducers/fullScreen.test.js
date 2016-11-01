import { TOGGLE_SCREEN } from '../../src/constants/actionTypes';
import fullScreen from '../../src/reducers/fullScreen';


describe('fullScreen reducer', () => {
    it('should return the initial state', () => {
        expect(fullScreen(undefined, {})).to.be.false;
    });

    it('should return to the opposite state', () => {
        expect(fullScreen(undefined, { type: TOGGLE_SCREEN })).to.be.true;
        expect(fullScreen(true, { type: TOGGLE_SCREEN })).to.be.false;
    });
});
