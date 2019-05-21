<template>
     <div id="myChart" :style="{width:'100%',height:'600px'}"></div>
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
        color: ['blue', 'green', 'red'],   //自定义颜色
        title:{   //标题
                text:'农作物产量线状报表',   //主标题
                subtext:'虚构数据',    //子标题
                x:'left',             //x轴位置，默认 left
            },
        backgroundColor:'#fff', //背景颜色
        tooltip: {
          trigger:'axis', //集合显示，也可以分开显示item
          axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
        },
        legend:{ top:30 },
        toolbox: {
            show: true,
            feature: {
                magicType: {type: ['line','bar','stack','tiled']}, //线，柱，堆叠，平铺
                restore: {},
                saveAsImage: {}
            }
        },
        grid:{
            left:'3%',
            right:'4%',
            bottom:'3%',
            containLabel:true
        },
        //x轴，y轴可互换，可横向显示柱状图
        xAxis:{},
        yAxis:{ 
            type:'value',
            axisLabel:{
                formatter:'{value}t'
            }
        },
        series: []
    });

    // myChart.showLoading();
    this.$http.post('api/getProduct')
        .then((res)=>{
          let xdata= _.map(res.data,(item)=>{
                    return item.name
                  })
          let xaxis=[]
          let dataSeries=[]
          for(let i=0;i<res.data.length;i++){

                let ydata=[]
                for(let j=0;j<res.data[i].list.length;j++){
                    if(xaxis.indexOf(res.data[i].list[j]['title'])===-1){
                        xaxis.push(res.data[i].list[j]['title'])
                    }
                    ydata.push(res.data[i].list[j]['value'])
                }
                //拼接数据源模式
                //  [
                //     {
                //         name:'邮件营销',
                //         type:'line',       --图形类型-
                //         areaStyle: {},    --area 域模式  
                //         step:'end'        --线型可以设置成阶梯模式，start,middle,end
                //         data:[120, 132, 101, 134, 90, 230, 210]  --数据源
                //         .....             ---可以设置平均值，最大，最小的指示线，可以去echarts官网查找
                //     }    
                // ]
                dataSeries.push({name:res.data[i].name,type:'line', data:ydata})
          }
           console.log(xdata)
           console.log(xaxis)
          console.log(dataSeries)
        
           myChart.hideLoading();
           myChart.setOption({
             legend: {
                data:xdata
             },
             xAxis:{
                 type:'category',
                 data:xaxis
             },
             series:dataSeries
             
           })
        })
    }
  }
}
</script>


