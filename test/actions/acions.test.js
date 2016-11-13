import * as types from '../../src/constants/actionTypes';
import * as actions from '../../src/actions';


describe('actions', () => {
    it('should create an action to add a post', () => {
        const id = 1;
        const cat = '分类1';
        const year = '2016';
        const date = '9-3 21:41';

        const expectedAction = {
            type: types.ADD_POST,
            id,
            cat,
            year,
            date
        };

        expect(actions.addPost(id, cat, year, date)).to.deep.equal(expectedAction);
    });
});
