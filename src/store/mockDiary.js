/**
 * 模拟数据
 * postIds: 日记项ID数组
 * categories: 日记分类
 * tags: 日记标签
 * posts: 日记项集合
 *    id: 标志
 *    title: 标题
 *    body: 内容
 *    year: 年份
 *    date: 日期
 *    category: 分类
 *    tag: 标签
 */

const body = "# Markdown\n\n----\n\nMarkdown is a text formatting syntax inspired on plain text email. In the words of its creator, [John Gruber][]:\n\n> The idea is that a Markdown-formatted document should be publishable as-is, as plain text, without looking like it’s been marked up with tags or formatting instructions.\n\n[John Gruber]: http://daringfireball.net/\n\n\n## Syntax Guide\n\n### Strong and Emphasize\n\n```\n*emphasize*    **strong**\n_emphasize_    __strong__\n```\n\n### list\n\n#### ul\n\n- item1\n\n  item1\n\n- item2\n\n  item2\n\n### ol\n\n1. item1\n\n2. item2\n\n### Links\n\nInline links:\n\n[link text](http://url.com/)\n\n### code\n\n\n```javascript\n$(function(){\n  $('div').html('I am a div.');\n});\n```";

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
            title: 'Markdown1',
            body,
            year: 2014,
            date: '6月 4日 18:41',
            category: '分类1',
            tag: ['Web', 'Node']
        },
        2: {
            id: 2,
            title: 'Markdown2',
            body,
            year: 2015,
            date: '9月 3日 21:41',
            category: '分类2',
            tag: ['Web', 'Python']
        },
        3: {
            id: 3,
            title: 'Markdown3',
            body,
            year: 2016,
            date: '10月 2日 10:41',
            category: '分类1',
            tag: ['Python', 'Node']
        }
    }
};
