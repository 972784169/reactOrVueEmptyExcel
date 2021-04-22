安装依赖   npm install xlsx --save
import * as XLSX from 'xlsx';

state:{
	href:''
}




downloadExl = (json,type) =>{
  var tmpdata = json[0];
          json.unshift({});
          var keyMap = []; //获取keys
          for (var k in tmpdata) {
              keyMap.push(k);
              json[0][k] = k;
          }
        var tmpdata = [];//用来保存转换好的json 
              json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                  v: v[k],
                  position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
              }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
                  v: v.v
              });
              var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
              var tmpWB = {
                  SheetNames: ['mySheet'], //保存的表标题
                  Sheets: {
                      'mySheet': Object.assign({},
                          tmpdata, //内容
                          {
                              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                          })
                  }
              };
              let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB, 
                  {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
                  ))], {
                  type: ""
              }); //创建二进制对象写入转换好的字节流
  var href = URL.createObjectURL(tmpDown); //创建对象超链接
  this.state.href=href;
  setTimeout(function() { //延时释放
      URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
  }, 100);
}

s2ab=(s)=> { //字符串转字符流
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
getCharCol=(n)=> {
  let temCol = '',
  s = '',
  m = 0
  while (n > 0) {
      m = n % 26 + 1
      s = String.fromCharCode(m + 64) + s
      n = (n - m) / 26
  }
  return s
}  



render(){
	const {href} = this.state;
        let obj = [{ //测试数据
              "活动名称":'',
              "活动开始时间":'',
              "活动结束时间": '',
              "活动地点": '',
              "渠道": '',
              "1月": '',
              "2月": '',
              "3月": '',
              "4月": '',
              "5月": '',
              "6月": '',
              "7月": '',
              "8月": '',
              "9月": '',
              "10月": '',
              "11月": '',
              "12月": ''
                    }];


return (
	<div>
                <a href={href} download={'demo.xlsx'} onClick={this.downloadExl(obj)}>下载模版</a>
               
            </div>
)
}