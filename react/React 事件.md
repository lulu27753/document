## 事件获取值

1.onChange={this.onchange.bind(this,你要传的参数)}    用bind，this后面加上你要的参数，他会把value值传到你写的方法的最后一个参数上

2.onChange={(value)=>{this.onchange(value,你要传的参数)}}   显式地把value写出来，这样就可以把value和参数都传过去


3. e.target.value

     