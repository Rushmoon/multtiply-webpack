import React, {useContext} from "react";
import First from '../action/first.js'
// 经过层层嵌套后，可以在孙组件中读取全局 state 并设置
export default function Content(props) {
    // 这里不要误会，useContext(BankContext) 返回值就是我们共享出来的 context，
    // 只是这里刻意把 context 设计为对象，以便同时提供 dispatch
    const {ab, dispatch } = useContext(props.Context);

    return (
        <div style={{ border: '1px solid #666' }}>
            <div> 当前福星：{ab.tree.refer}</div>

            <button onClick={() => dispatch({ type: 'ab/update', payload: {
                    tree:{
                        refer:'houxinonanmei',
                        name:'nanmi',
                        code:'nogizaka no nannami'
                    }
                } })}>turn to NANA</button>
        </div>
    );
}
