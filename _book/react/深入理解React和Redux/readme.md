## Redux

* redux 基本原则
    * 唯一数据源：如果状态数据分散在多个store中，容易造成数据冗余，这样数据一致性方面就会出问题。因此Redux推荐整个应用只保持一个Store。
    * 保持状态只读：不能直接修改状态，要修改store的状态，必须要通过派发一个action对象完成。当然，要驱动用户界面渲染，就要改变应用的状态，但是改变状态的方法不是去修改状态上的值，而是创建一个新的状态对象返回给Redux，由Redux完成新的状态的组装。
    * 数据改变只能通过纯函数完成：reducer(state, action),state:当前的状态；action是接收到的action对象，而reducer要做的事情，就是根据state和action的值产生一个新的对象返回，注意reducer必须是纯函数，也就是说函数的返回结果必须完全由参数state和action决定，而且不产生任何副作用，也不能修改参数state和action对象。reducer只负责计算状态，不负责存储状态。
    * 