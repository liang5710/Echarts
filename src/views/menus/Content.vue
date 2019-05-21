<template>
    <div class="content-board">
        <h2>
            该项目均采购mockjs 来实现模拟异步数据加载模式
        </h2>    
        <h2>1.地图</h2>
        <p>地图报表可以点击相应的省份，弹出该省份相应的地市；<br>
            &nbsp;&nbsp;①.若弹出未显示相关地市的空白页，说明组件内未引用相关省的js;<br>
            &nbsp;&nbsp;②.若弹出中部分县市呈灰色未绑定相关数据,需要查看该县市的数据是否存在，名称是否与js一致，请保持一致，列如北京js里 <span style="color:red">顺义区</span>，如果你的是<span style="color:red">顺义市</span>,<br>
            &nbsp;&nbsp;&nbsp;该数据源就无法绑定，可以修改自己数据源，也可以引入的js,如修改js,建议把echarts提取到项目中在应用，不免每次安装依赖时重置。
            </p>
        <h2>2.其他报表</h2>
        <p>线状图/柱状图/饼图/圆环图/重叠实现基本类似，个别只需要调整相关属性来自由切换，这里简单说明一下,<span style=" background:#EEEEEE;">代码里有详细的注释</span>，具体也可以去<span style="color:blue"><a target="_black" href="https://www.echartsjs.com/examples/">echart官网查看</a></span><br>
            &nbsp;&nbsp;①.如果我们想要area 域作用图，只需要在线状图中加一个属性就可以了,代码里有详细的注释;<br>
            &nbsp;&nbsp;②.圆环图是在饼图的基础上，设置两个半径百分比实现的<br>
            &nbsp;&nbsp;③.横向图显示，例如要横向显示柱状图，只需要把x轴，y轴属性互换就可以了<br>
            &nbsp;&nbsp;④.重叠也是可以通过属性自由切换，我们的线状图，可以通过右上角的按钮来切换 重叠，平铺，柱状图，我还可以添加指向性说明例如平均值，最大值，最小值等,这里就不一一说明了<br>
            </p>    
    </div>
</template>
<style >
.content-board {
  background: #fff;
  padding: 10px 0;
}
.content-board h2 {
  padding: 2px 2px;
  font: bold 12px/30px Georgia,serif;
}
.content-board p {
  padding: 1px 1px;
  font: bold 12px/30px Georgia,serif;
}
</style>
