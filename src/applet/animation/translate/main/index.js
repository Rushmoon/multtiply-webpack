import { CSSTransitionGroup } from 'react-transition-group' // ES6
//实现css动画
import React from "react";
import ReactDOM from "react-dom";
import "./index.less"
class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ['hello', 'world', 'click', 'me'],
            show:false
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.getCssClss = this.getCssClss.bind(this);
        this.showOrHidden = this.showOrHidden.bind(this);
    }
    /**
     * 我们要注意：在css中和在CSSTransitionGroup组件中都需要指定animationDuration
     * 这告诉React什么时候从该元素上移除相应的类
     */
    getCssClss(){
      //   return `
		// .detail-enter {
		//   height: 3px;
		//   opacity: 0.01;
		// }
		// .detail-enter.detail-enter-active {
		//   opacity: 1;
		//   height:300px;
		//   transition: opacity,height 500ms ease-in;
		// }
      //   //当你点击了hello节点的时候，那么该元素将会被移除，它会首先被添加example-leave,
      //   //然后添加example-leave-active这个class
		// .detail-leave {
		//   opacity: 1;
		//   height:300px;
		// }
		// .detail-leave.detail-leave-active {
		//   opacity: 0.01;
		//   height:3px;
		//   transition: opacity,height 300ms ease-in;
		// }
		// .detail-appear {
		//   opacity: 0.01;
		//   height:3px;
		// }
		// .detail-appear.detail-appear-active {
		//   opacity: 1;
		//   height:300px;
		//   transition: opacity,height .5s ease-in;
		// }
  	// `
        return `
		.detail-enter {
		  height: 3px !important;
		  opacity: 0.01;
		}
		.detail-enter.detail-enter-active {
		  height: 300px;
		  opacity: 1;
		  transition: all 500ms ease-in;
		}
        //当你点击了hello节点的时候，那么该元素将会被移除，它会首先被添加example-leave,
        //然后添加example-leave-active这个class
		.detail-leave {
		  opacity: 1;
		  height:300px;
		}
		.detail-leave.detail-leave-active {
		  opacity: 0.01;
		  height:3px !important;
		  transition: all 300ms ease-in;
		}
		.detail-appear {
		  opacity: 0.01;
		  height:3px;
		}
		.detail-appear.detail-appear-active {
		  transition: all .5s ease-in;
		}
  	`
    }
    /**
     * 添加一个元素
     */
    handleAdd() {
        const newItems = this.state.items.concat([
            prompt('Enter some text')
        ]);
        this.setState({items: newItems});
    }

    /**
     * 移除某一个元素。然后导致我们的组件reRender,对于我们要移除的那个DOM，我们会
     * 首先添加example-enter和example-enter-active。这是通过我们的key来判断的
     */
    handleRemove(i) {
        let newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.setState({items: newItems});
    }
    showOrHidden(){
        const show = this.state.show;
        if(show === true){
            this.setState({
                show:false
            })
          }else {
            this.setState({
                show:true
            })
          }
    };
    /**
     * 在这个组件中，当我们为CSSTransitionGroup添加子元素的时候，那么在下一帧它会被添加
     * example-enter和example-enter-active这两个class，你可以通过打断点查看。这是基于我们
     * 指定的transitionName属性来判断的。
     */
    render() {
        const show = this.state.show;
        const items = this.state.items.map((item, i) => (
            <div key={item} onClick={() => this.handleRemove(i)}>
                {item}
            </div>
        ));
        const hidden = show?(
            <div className={"showItem"}>should be hidden item</div>
        ):null;
        /**
         *(1)CSSTransitionGroup提供了一个transitionAppear属性用于在组件第一次被挂载的时候添加动画。
         *默认情况下，在组件第一次被挂载的时候我们的transitionAppear被设置为false。
         *如果要为首次挂载添加动画你要使用该属性。它会自动添加 example-appear和example-appear-active.
         *(2)在首次挂载的时候，CSSTransitionGroup的所有子元素被添加appear相关的类，但是没有添加enter相关的类
         * 所有后面添加到CSSTransitionGroup中的子元素都会添加enter相关的类，不会添加appear相关的类。
         *(3)transitionAppear是在0.13后添加的，为了向后兼容默认设置为false。但是默认的transitionEnter和
         * transitionLeave被设置为true，所以你必须指定transitionEnterTimeout和transitionLeaveTimeout。
         * 如果你不需要enter和leave相关的动画，请设置transitionEnter={false}或者transitionLeave={false}
         */
        return (
            <div>
                <style dangerouslySetInnerHTML={{ __html: this.getCssClss() }} />
                <button onClick={this.showOrHidden}>Show Item</button>
                <CSSTransitionGroup
                    transitionName="detail"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}
                    transitionAppearTimeout={500}>
                    {hidden}
                </CSSTransitionGroup>
            </div>
        );
    }
}

ReactDOM.render(<TodoList/>,document.getElementById("app"));