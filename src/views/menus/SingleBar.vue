<template>
     <div id="myChart" :style="{width:'100%',height:'700px'}"></div>
</template>

<script>
import _ from 'lodash'
import echarts from 'echarts'
export default {
  data(){
      return {
      }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        
        // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))

      myChart.setOption({
        title: {
            text: '异步数据加载示例',
            subtext:'虚构数据',    //子标题
            x:'left',           //x轴位置，默认 left
            y:''            //y轴位置，默认 top
        },
        backgroundColor:'#fff', //背景颜色
        tooltip: {},
        legend: {
               orient:'vertical',  //vertical,horizontal 纵向横向
               left:'center',
               top:15
        },
        xAxis: {
            data:[]
        },
        yAxis: {},
        toolbox: { //可用于右侧图标用于  查看数据视图，编辑，保存图表图片
                show: true,
                orient : 'vertical',
                x: 'right',
                y: 'center',
                feature : {
                    mark : {show: false},
                    dataView : {show: false, readOnly: true},
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage : {show: true}
                }
            },
        series: [{
            name: '降雨量',
            type: 'bar',
            smooth: true, //线加弧度 
            // step:'end',   //阶梯式
            data: []
        }]
    });

    myChart.showLoading();
    this.$http.post('api/getJYL')
        .then((res)=>{
          let xdata= _.map(res.data,(item)=>{
                    return item.name
                  })
          let ydata= _.map(res.data,(item)=>{
                    return item.value
                  })
           myChart.hideLoading();
           myChart.setOption({
             xAxis:{
               data:xdata
             },
             series:{
               name:"降雨量",
               data:ydata
             }
           })
        })
    }
  }
}
</script>

