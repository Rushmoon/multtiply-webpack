/*API*/
//forwardRef react 传递ref的方法，类似高阶函数的方式来传递

function mapChildren(children, func, context) {
    if (children == null) {
        return children
    }
    const result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, func, context);
    return result
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
    let escapedPrefix = '';
    if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/'
    }
    const traverseContext = getPooledTraverseContext(
        array,
        escapedPrefix,
        func,
        context,
    )
    traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
    releaseTraverseContext(traverseContext)
}
/*PureComponent*/
//这个类跟component类似，只比普通的component多一个标识，如果继承Pure
// shallowEqual(newstate,oldstate) 怎么用？







//fiber constructor


