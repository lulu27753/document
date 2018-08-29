> 需求：datatable表格，每一行带有checkbox，勾选checkbox导出当前行所有数据，全选则导出所有选中行的数据
即实现导出列表选中行数据的功能


```
<a class="download" download="用户列表">导出</a>
```

```
function exportFile() {
    var dataArr = [];//定义数组用来保存所勾选的列表当前行数据
    // 定义表头
    var str = `<tr>
        <th>样本名称</th>
        <th>问卷编码</th>
        <th>提交时间</th>
    </tr>`
    // 遍历列表中所购选中的行
    $('table').find('tr.hover-bg').each(function() {
        var Data = new Object();
        Data.AreaName = $(this).find('td:eq(1)').html();
        Data.DataID= $(this).find('td:eq(2)').html();
        Data.EntryTime= $(this).find('td:eq(3)').html();
        dataArr.push(Data);
    })
    if($('table').find('tr').hasClass('hover-bg')) {
        //循环遍历，每行加入tr标签，每个单元格加td标签
        for (let i = 0; i < dataArr.length; i++) {
            str += '<tr>';
            for (let item in dataArr[i]) {
                //增加\t为了不让表格显示科学计数法或者其他格式
                str += `<td>${ dataArr[i][item] + '\t'}</td>`;
            }
            str += '</tr>';
        }
        var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
                          xmlns:x="urn:schemas-microsoft-com:office:excel"
                          xmlns="http://www.w3.org/TR/REC-html40">
                          <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
                            <x:Name>'录入列表.xls'</x:Name>
                            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
                            </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
                            </head><body><table>${str}</table></body></html>`;
                            
        // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
        var blob = new Blob([template], {type: "application/vnd.ms-excel"});
        $('.download').attr('href', URL.createObjectURL(blob));
    }
}
```