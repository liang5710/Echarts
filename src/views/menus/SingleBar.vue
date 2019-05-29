<template>
  <div>
    <div id="myChart" :style="{ width: '100%', height: '700px' }"></div>
    <my-dialog :is-show="isShow" @on-close="openDialog">
      <span>点击获取参数</span>
      <br />
      <span
        >暂时没办法获取到其他成员变量，因为柱状图和线图只涉及到X轴Y轴的绑定，未涉及到数据源的绑定，我们也可以根据获取的键值对去数据源集合中进行匹配查找获取其他属性变量</span
      >
      <br />
      <span>{{ strName }} : {{ strValue }}</span>
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
      strName: "",
      strValue: ""
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    openDialog() {
      this.isShow = !this.isShow;
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));

      myChart.setOption({
        title: {
          text: "异步数据加载示例",
          subtext: "虚构数据", //子标题
          x: "left", //x轴位置，默认 left
          y: "" //y轴位置，默认 top
        },
        backgroundColor: "#fff", //背景颜色
        tooltip: {},
        legend: {
          orient: "vertical", //vertical,horizontal 纵向横向
          left: "center",
          top: 15
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        toolbox: {
          //可用于右侧图标用于  查看数据视图，编辑，保存图表图片
          show: true,
          orient: "vertical",
          x: "right",
          y: "center",
          feature: {
            mark: { show: false },
            dataView: { show: false, readOnly: true },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "降雨量",
            type: "bar",
            smooth: true, //线加弧度
            // step:'end',   //阶梯式
            data: []
          }
        ]
      });

      myChart.showLoading();
      this.$http.post("api/getJYL").then(res => {
        let xdata = _.map(res.data, item => {
          return item.name;
        });
        let ydata = _.map(res.data, item => {
          return item.value;
        });
        myChart.hideLoading();
        myChart.setOption({
          xAxis: {
            data: xdata
          },
          series: {
            name: "降雨量",
            data: ydata
          }
        });
      });
      myChart.on("click", paras => {
        this.isShow = !this.isShow;
        this.strName = paras.name;
        this.strValue = paras.value;
        // console.log(paras);
        // console.log("ss", paras.name);
        // this.params = paras;
      });
    }
  }
};
</script>

