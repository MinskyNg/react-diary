import { fromJS, List } from 'immutable';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);
import * as types from '../../src/constants/actionTypes';
import diarys from '../../src/reducers/diarys';


describe('diarys reducer', () => {
    let initialState;

    beforeEach(() => {
        sinon.spy(localStorage, 'setItem');
        initialState = fromJS({
            postIds: [1],
            categories: { 未分类: [], 分类1: [1] },
            tags: {
                Web: [1],
                Node: [1]
            },
            posts: {
                1: {
                    id: 1,
                    title: '标题1',
                    body: 'body',
                    year: 2014,
                    date: '6-4 18:41',
                    category: '分类1',
                    tag: ['Web', 'Node']
                }
            }
        });
    });


    afterEach(() => {
        localStorage.setItem.restore();
    });


    it('should return the initial state', () => {
        initialState = fromJS({
            postIds: [],
            categories: {},
            tags: {},
            posts: {}
        });
        const nextState = diarys(undefined, {});

        expect(nextState).to.equal(initialState);
        expect(localStorage.setItem.called).to.be.false;
    });


    describe('handle ADD_CAT', () => {
        it('should return the initial state', () => {
            let nextState = diarys(initialState, {
                type: types.ADD_CAT,
                cat: '全部日记'
            });
            expect(nextState).to.equal(initialState);

            nextState = diarys(initialState, {
                type: types.ADD_CAT,
                cat: '搜索结果'
            });
            expect(nextState).to.equal(initialState);

            expect(localStorage.setItem.calledWith('diarys', JSON.stringify(initialState))).to.be.true;
            expect(localStorage.setItem.callCount).to.equal(2);
        });

        it('should add a category that does not exist', () => {
            const nextState = diarys(initialState, {
                type: types.ADD_CAT,
                cat: '分类2'
            });
            expect(nextState).to.equal(initialState.setIn(['categories', '分类2'], List([])));
            expect(localStorage.setItem.calledWith('diarys', JSON.stringify(nextState))).to.be.true;
            expect(localStorage.setItem.callCount).to.equal(1);
        });

        it('should not add an existing category', () => {
            const nextState = diarys(initialState, {
                type: types.ADD_CAT,
                cat: '分类1'
            });
            expect(nextState).to.equal(initialState);
        });
    });


    describe('handle DEL_CAT', () => {
        it('should return the initial state', () => {
            const nextState = diarys(initialState, {
                type: types.DEL_CAT,
                cat: '未分类'
            });
            expect(nextState).to.equal(initialState);
        });

        it('should delete a category', () => {
            let nextState = diarys(initialState, {
                type: types.DEL_CAT,
                cat: '分类1'
            });
            expect(nextState).to.equal(fromJS({
                postIds: [1],
                categories: { 未分类: [1] },
                tags: {
                    Web: [1],
                    Node: [1]
                },
                posts: {
                    1: {
                        id: 1,
                        title: '标题1',
                        body: 'body',
                        year: 2014,
                        date: '6-4 18:41',
                        category: '未分类',
                        tag: ['Web', 'Node']
                    }
                }
            }));

            initialState = fromJS({
                postIds: [3, 2, 1],
                categories: { 未分类: [3, 1], 分类1: [2] },
                tags: {
                    Web: [2],
                    Node: [2]
                },
                posts: {
                    2: {
                        id: 2,
                        title: '标题1',
                        body: 'body',
                        year: 2014,
                        date: '6-4 18:41',
                        category: '分类1',
                        tag: ['Web', 'Node']
                    }
                }
            });

            nextState = diarys(initialState, {
                type: types.DEL_CAT,
                cat: '分类1'
            });
            expect(nextState).to.equal(fromJS({
                postIds: [3, 2, 1],
                categories: { 未分类: [3, 2, 1] },
                tags: {
                    Web: [2],
                    Node: [2]
                },
                posts: {
                    2: {
                        id: 2,
                        title: '标题1',
                        body: 'body',
                        year: 2014,
                        date: '6-4 18:41',
                        category: '未分类',
                        tag: ['Web', 'Node']
                    }
                }
            }));
        });
    });


    describe('handle ADD_TAG', () => {
        it('should add a tag that does not exist', () => {
            const nextState = diarys(initialState, {
                type: types.ADD_TAG,
                tag: 'Python'
            });
            expect(nextState).to.equal(initialState.setIn(['tags', 'Python'], List([])));
        });

        it('should not add an existing tag', () => {
            const nextState = diarys(initialState, {
                type: types.ADD_TAG,
                tag: 'Node'
            });
            expect(nextState).to.equal(initialState);
        });
    });


    describe('handle DEL_TAG', () => {
        it('should delete a tag', () => {
            const nextState = diarys(initialState, {
                type: types.DEL_TAG,
                tag: 'Web'
            });
            expect(nextState).to.equal(fromJS({
                postIds: [1],
                categories: { 未分类: [], 分类1: [1] },
                tags: {
                    Node: [1]
                },
                posts: {
                    1: {
                        id: 1,
                        title: '标题1',
                        body: 'body',
                        year: 2014,
                        date: '6-4 18:41',
                        category: '分类1',
                        tag: ['Node']
                    }
                }
            }));
        });
    });


    describe('handle ADD_POST', () => {
        it('should add a post when the category exists', () => {
            const nextState = diarys(initialState, {
                type: types.ADD_POST,
                id: 2,
                cat: '分类1',
                year: 2015,
                date: '9-3 21:41'
            });
            expect(nextState).to.equal(fromJS({
                postIds: [2, 1],
                categories: { 未分类: [], 分类1: [2, 1] },
                tags: {
                    Web: [1],
                    Node: [1]
                },
                posts: {
                    1: {
                        id: 1,
                        title: '标题1',
                        body: 'body',
                        year: 2014,
                        date: '6-4 18:41',
                        category: '分类1',
                        tag: ['Web', 'Node']
                    },
                    2: {
                        id: 2,
                        title: '新建日记',
                        body: '',
                        year: 2015,
                        date: '9-3 21:41',
                        category: '分类1',
                        tag: []
                    }
                }
            }));
        });

        it('should add a post when the category does not exist', () => {
            const nextState = diarys(initialState, {
                type: types.ADD_POST,
                id: 2,
                cat: '分类2',
                year: 2015,
                date: '9-3 21:41'
            });
            expect(nextState).to.equal(fromJS({
                postIds: [2, 1],
                categories: { 未分类: [2], 分类1: [1] },
                tags: {
                    Web: [1],
                    Node: [1]
                },
                posts: {
                    1: {
                        id: 1,
                        title: '标题1',
                        body: 'body',
                        year: 2014,
                        date: '6-4 18:41',
                        category: '分类1',
                        tag: ['Web', 'Node']
                    },
                    2: {
                        id: 2,
                        title: '新建日记',
                        body: '',
                        year: 2015,
                        date: '9-3 21:41',
                        category: '未分类',
                        tag: []
                    }
                }
            }));
        });
    });


    describe('handle DEL_POST', () => {
        it('should delete a post', () => {
            const nextState = diarys(initialState, {
                type: types.DEL_POST,
                id: 1
            });
            expect(nextState).to.equal(fromJS({
                postIds: [],
                categories: { 未分类: [], 分类1: [] },
                tags: {
                    Web: [],
                    Node: []
                },
                posts: {
                }
            }));
        });
    });


    describe('handle UPDATE_TITLE', () => {
        it('should update the title of a post', () => {
            const nextState = diarys(initialState, {
                type: types.UPDATE_TITLE,
                id: 1,
                title: '新标题'
            });
            expect(nextState).to.equal(initialState.setIn(['posts', '1', 'title'], '新标题'));
        });
    });


    describe('handle UPDATE_BODY', () => {
        it('should update the body of a post', () => {
            const nextState = diarys(initialState, {
                type: types.UPDATE_BODY,
                id: 1,
                body: 'newBody'
            });
            expect(nextState).to.equal(initialState.setIn(['posts', '1', 'body'], 'newBody'));
        });
    });


    describe('handle UPDATE_CAT', () => {
        it('should update the category of a post', () => {
            let nextState = diarys(initialState, {
                type: types.UPDATE_CAT,
                id: 1,
                cat: '未分类'
            });
            expect(nextState).to.equal(fromJS({
                postIds: [1],
                categories: { 未分类: [1], 分类1: [] },
                tags: {
                    Web: [1],
                    Node: [1]
                },
                posts: {
                    1: {
                        id: 1,
                        title: '标题1',
                        body: 'body',
                        year: 2014,
                        date: '6-4 18:41',
                        category: '未分类',
                        tag: ['Web', 'Node']
                    }
                }
            }));

            initialState = fromJS({
                postIds: [3, 2, 1],
                categories: { 未分类: [3, 1], 分类1: [2] },
                tags: {
                    Web: [2],
                    Node: [2]
                },
                posts: {
                    2: {
                        id: 2,
                        title: '标题1',
                        body: 'body',
                        year: 2014,
                        date: '6-4 18:41',
                        category: '分类1',
                        tag: ['Web', 'Node']
                    }
                }
            });

            nextState = diarys(initialState, {
                type: types.UPDATE_CAT,
                id: 2,
                cat: '未分类'
            });
            expect(nextState).to.equal(fromJS({
                postIds: [3, 2, 1],
                categories: { 未分类: [3, 2, 1], 分类1: [] },
                tags: {
                    Web: [2],
                    Node: [2]
                },
                posts: {
                    2: {
                        id: 2,
                        title: '标题1',
                        body: 'body',
                        year: 2014,
                        date: '6-4 18:41',
                        category: '未分类',
                        tag: ['Web', 'Node']
                    }
                }
            }));
        });
    });


    describe('handle UPDATE_TAG', () => {
        it('should return the initial state when the tag length more than 5', () => {
            const nextState = diarys(initialState, {
                type: types.UPDATE_TAG,
                id: 1,
                tag: ['Node', 'Node', 'Node', 'Node', 'Node', 'Node']
            });
            expect(nextState).to.equal(initialState);
        });

        it('should update the tag of a post', () => {
            let nextState = diarys(initialState, {
                type: types.UPDATE_TAG,
                id: 1,
                tag: ['Node']
            });
            expect(nextState).to.equal(fromJS({
                postIds: [1],
                categories: { 未分类: [], 分类1: [1] },
                tags: {
                    Web: [],
                    Node: [1]
                },
                posts: {
                    1: {
                        id: 1,
                        title: '标题1',
                        body: 'body',
                        year: 2014,
                        date: '6-4 18:41',
                        category: '分类1',
                        tag: ['Node']
                    }
                }
            }));

            initialState = fromJS({
                postIds: [3, 2, 1],
                categories: { 未分类: [3, 1], 分类1: [2] },
                tags: {
                    Web: [3, 1],
                    Node: [2]
                },
                posts: {
                    2: {
                        id: 2,
                        title: '标题1',
                        body: 'body',
                        year: 2014,
                        date: '6-4 18:41',
                        category: '分类1',
                        tag: ['Node']
                    }
                }
            });

            nextState = diarys(initialState, {
                type: types.UPDATE_TAG,
                id: 2,
                tag: ['Web', 'Node']
            });
            expect(nextState).to.equal(fromJS({
                postIds: [3, 2, 1],
                categories: { 未分类: [3, 1], 分类1: [2] },
                tags: {
                    Web: [3, 2, 1],
                    Node: [2]
                },
                posts: {
                    2: {
                        id: 2,
                        title: '标题1',
                        body: 'body',
                        year: 2014,
                        date: '6-4 18:41',
                        category: '分类1',
                        tag: ['Web', 'Node']
                    }
                }
            }));
        });
    });
});
