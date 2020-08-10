import React, { Component } from 'react';
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Link, Route,Switch } from 'react-router-dom';
import Multiple from '../multipleNumber/index'
import BackIp from '../backIP/index'
import OrderTransPath from '../translatePathUnix/index'
import TurnBackLine from '../turnbacktheLineOFWord/index'

class App extends Component {
    render() {
        const ourbaseName = window.location.pathname;
        // const order = {
        //     pathname:'./turn',
        //     query:{
        //         order:'Elizabeth'
        //     },
        //     state:{
        //       line:'say some thing'
        //     }
        // };
        return (
            <div>
            {/*<Router basename={ourbaseName} getUserConfirmation={}>*/}
            {/*    /!*basename 基础的最初路由*!/*/}
            {/*    <div className="App">*/}
            {/*        <Link to="/">{'乘法'}</Link>*/}
            {/*        <Link to="/ip:3333333">{'整理字符串为可能的ip地址'}</Link>*/}
            {/*        <Link to="/turn">{'翻转语句但不转单词'}</Link>*/}
            {/*        <Link to={order}>{'转换控制台输入的指令为指定的路径'}</Link>*/}
            {/*        <hr/>*/}
            {/*        <Switch>*/}
            {/*            /!*减少重复的匹配防止代码写错啥的，不过写对了的话，没啥用也可以防止第二层目录出现，第一层不同，但第二层都行同的情况然后匹配错误的情况*!/*/}
            {/*            <Route path="/" exact component={Multiple}></Route>*/}
            {/*            <Route path="/ip/:ip" component={BackIp}></Route>*/}
            {/*            <Route path="/turn" component={TurnBackLine}></Route>*/}
            {/*            <Route path="/order" component={OrderTransPath}></Route>*/}
            {/*        /!*    路由传递参数的方式之一：*/}
            {/*               通过通配符传递参数，就是在链接的后面传递，获取的方式为：this.props.match.ip*/}
            {/*               路由传参方式之二：*/}
            {/*               通过state的方式传递参数 可以是：this.props.history.push('/turn',{line:'ccccc'}) 获取的时候是props.location.state.line*/}
            {/*               尝试通过上述定义的order 在link的时候传递，获取方式都存在于props的location里 query也是*/}
            {/*               3.query*/}
            {/*               方式二和方式三都存在缺点就是无法通过刷新重新获取数据了，所以如果就传递一个不咋长的值的话，就通过第一种方式传递吧*/}
            {/*        *!/*/}
            {/*        </Switch>*/}
            {/*    </div>*/}
            {/*</Router>*/}
            </div>
        );
    }
}

ReactDom.render((
    <App />
),document.getElementById('app'));