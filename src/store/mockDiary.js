export default {
    postIds: [3, 2, 1],
    categories: {
        未分类: [],
        分类1: [3, 1],
        分类2: [2]
    },
    tags: {
        Web: [2, 1],
        Python: [3, 2],
        Node: [3, 1]
    },
    posts: {
        1: {
            id: 1,
            title: '标题1',
            body: '这是内容',
            year: 2015,
            date: '6-4 18:41',
            category: '分类1',
            tag: ['Web', 'Node']
        },
        2: {
            id: 2,
            title: '标题2',
            body: '这是内容',
            year: 2015,
            date: '9-3 21:41',
            category: '分类2',
            tag: ['Web', 'Python']
        },
        3: {
            id: 3,
            title: '标题3',
            body: '这是内容',
            year: 2016,
            date: '10-2 10:41',
            category: '分类1',
            tag: ['Python', 'Node']
        }
    }
};
