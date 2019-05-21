<template>
    <div>
        <div :style="{width:'100%',height:'600px'}" ref="myEchart"></div>

    </div>
</template>

<script>
import echarts from 'echarts'
import '../../node_modules/echarts/map/js/china.js'
import '../../node_modules/echarts/map/js/province/beijing.js'
import '../../node_modules/echarts/map/js/province/hebei.js'
import '../../node_modules/echarts/map/js/province/chongqing.js'
import '../../node_modules/echarts/map/js/province/shanghai.js'
import '../../node_modules/echarts/map/js/province/xinjiang.js'
import '../../node_modules/echarts/map/js/province/neimenggu.js'
import '../../node_modules/echarts/map/js/province/heilongjiang.js'
import '../../node_modules/echarts/map/js/province/jilin.js'
import '../../node_modules/echarts/map/js/province/liaoning.js'
import '../../node_modules/echarts/map/js/province/taiwan.js'

export default {
  props:{
      mapname:{
          type:String,
          default:'china'
      },
      styleCss:{
          type:String,
          default:''
      }
  }, 
  data () {
    return {
       
    }
  },
  mounted(){
      this.drawMap()
  },
  methods:{ 
    drawMap(){
        let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置    
        
        //绘制图表
        let optionMap={  
            title:{   //标题
                text:'中国地图省份',   //主标题
                subtext:'虚构数据',    //子标题
                x:'left',           //x轴位置，默认 left
                y:''            //y轴位置，默认 top
            },
            backgroundColor:'#fff', //背景颜色
            tooltip:{   // 鼠标移到图里面的浮动提示框(默认空值就可以，也可以自己配置显示内容)
                trigger:"item"
            },   
            legend: {
                top:30
            }, //标 · 显示
            dataRange: { //颜色范围轴
                min: 0,
                max: 1000,
                x: 'left',
                y: 'bottom',
                text:['高','低'],           
                calculable : true,
                realtime: true,
                color: ['orangered', 'yellow', 'lightskyblue'] //颜色自定义
            },
             toolbox: { //可用于右侧图标用于  查看数据视图，编辑，保存图表图片
                show: true,
                orient : 'vertical',
                x: 'right',
                y: 'center',
                feature : {
                    mark : {show: false},
                    dataView : {show: false, readOnly: true},
                    restore : {show: false},
                    saveAsImage : {show: true}
                }
            },
            series:[
                {
                    name:this.mapname,
                    type:'map', //报表类型  map
                    mapType:this.mapname,  // 地图类型，中国地图{ 如果要省份地图，可以引用echarts里省份相关js，这里写相关省份，如：河北}
                    roam:true,
                    label: {
                        normal: {
                            show: true, // 是否显示对应地名
                            textStyle: {
                            color: 'rgba(0,0,0,0.4)'
                            }
                        }
                    },
                    itemStyle:{
                        normal: {
                            borderColor: 'rgba(0, 0, 0, 0.2)'
                        },
                        emphasis: {
                            areaColor: null,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 20,
                            borderWidth: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data:[]
                }
            ]
          }

          myChart.setOption(optionMap)

          if(this.mapname=='china'){
            this.$http.post('api/getProvince').then((res)=>{
                
                //处理数据，满足图表接收的数据类型:[{name:'上海',value:222}]
                let provinces=[]
                for(let i=0;i<res.data.length;i++){
                    provinces.push({name:res.data[i],value:Math.round(Math.random()*1000)})
                }
                myChart.setOption({
                    series:{
                    data:provinces
                    }
                })
            })

            myChart.on('click',(paras)=>{
                this.$emit('on-change',paras)
            })
         }else{
              this.$http.post('api/getCity').then((res)=>{
            
                    //处理数据，满足图表接收的数据类型:[{name:'上海',value:222}]
                    let provinces=[]
                    for(let i=0;i<res.data[this.mapname].length;i++){
                        provinces.push({name:res.data[this.mapname][i],value:Math.round(Math.random()*1000)})
                    }
                    
                    myChart.setOption({
                        series:{
                        data:provinces
                        }
                    })
                })
         }
      }
    }
  }
</script>

<style>

</style>
