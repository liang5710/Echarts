<template>
  <div>
    <div id="myChart" :style="{ width: '100%', height: '600px' }"></div>
    <my-dialog :is-show="isShow" @on-close="openDialog">
      <span>点击获取参数</span>
      <br />
      <span>{{ params.data }}</span>
    </my-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import echarts from "echarts";
import MyDialog from "../../components/base/Dialog";
export default {
  components: {
    MyDialog
  },
  data() {
    return {
      isShow: false,
      params: []
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));

      myChart.setOption({
        title: {
          //标题
          text: "环形降雨量报表", //主标题
          subtext: "虚构数据", //子标题
          x: "left", //x轴位置，默认 left
          y: "", //y轴位置，默认 top
          top: 20
        },
        backgroundColor: "#fff", //背景颜色
        tooltip: {
          formatter: "{a}<br/>{b}:{c}ml({d}%)" //自定义显示格式
        },
        legend: {
          orient: "horizontal", //vertical,horizontal 纵向横向
          left: "center",
          bottom: 10 //距离底部 top,left right 都可以设置
        },
        toolbox: {
          //可用于右侧图标用于  查看数据视图，编辑，保存图表图片
          show: true,
          orient: "vertical",
          x: "right",
          y: "center",
          feature: {
            mark: { show: false },
            dataView: { show: false, readOnly: true },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "降雨量",
            type: "pie", //图表类型
            radius: ["50%", "70%"],
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: "{a} \n {b}:{c}ml({d}%)"
              },
              emphasis: {
                //中间显示内容
                show: true,
                textStyle: {
                  fontSize: 20,
                  fontWeight: "bold"
                }
              }
            },
            data: []
          }
        ]
      });

      myChart.showLoading();
      this.$http.post("api/getJYL").then(res => {
        let xdata = _.map(res.data, item => {
          return item.name;
        });

        myChart.hideLoading();
        myChart.setOption({
          legend: {
            data: xdata
          },
          series: {
            data: res.data
          }
        });
      });

      myChart.on("click", paras => {
        this.isShow = !this.isShow;
        console.log(paras);
        this.params = paras;
      });
    },
    openDialog() {
      this.isShow = !this.isShow;
    }
  }
};
</script>


