/**
 * 回到顶部
 * @class BackTop
 */


import React from 'react';


export default class BackTop extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }


    componentDidMount() {
        this.diary = document.getElementById('diary');
        if (this.diary.clientWidth > 580) {
            this.diary.addEventListener('scroll', this.handleScroll);
        }
    }


    componentWillUnmount() {
        if (this.diary.clientWidth > 580) {
            this.diary.removeEventListener('scroll', this.handleScroll);
        }
    }


    // 处理滚动
    handleScroll() {
        if (this.diary.scrollTop > 100) {
            this._backtop.style.opacity = '.8';
            this._backtop.style.cursor = 'pointer';
        } else {
            this._backtop.style.opacity = '0';
            this._backtop.style.cursor = 'default';
        }
    }


    // 处理点击
    handleClick() {
        const diary = document.getElementById('diary');
        let pre = +new Date();
        let acc = 0;
        function move() {
            let top = 0;
            const cur = +new Date();
            const passed = cur - pre;
            pre = cur;
            acc += passed;
            while (acc > 15 && diary.scrollTop > 0) {
                top += 15 * 4;
                acc -= 15;
            }
            diary.scrollTop -= top;
            if (diary.scrollTop > 0) {
                setTimeout(move, 15);
            }
        }
        setTimeout(move, 15);
    }


    render() {
        return (
            <div
              className="backtop"
              ref={div => this._backtop = div}
              onClick={() => this.handleClick()}
            >
                <i className="icon-up"></i>
            </div>
        );
    }
}
