<template>
     <div class="detail-wrap">
        <div class="detail-left">
            <div class="product-board">
                <h2>异步数据加载实例</h2>
                <ul>
                    <router-link v-for="item in menus" :to="{path: item.herf}" :key="item.value"
                      tag="li" active-class="active">{{ item.title }}</router-link>
                </ul>
            </div>
        </div> 
        <div class="detail-right">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>    
        </div>
     </div>
  
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
           menus:[]
        }
    },created(){
        console.log(this.menus)
        this.loadMenu()
    },methods:{
        loadMenu(){

            // 以下2种方法都可以  
             this.axios.post('api/getMenu')
                .then((res) => {
                     this.menus=res.data
                }).catch((error)=>{
                    console.log(error)
                })

            // this.$http.post('api/getMenu').then((res)=>{
            //     this.menus=res.data
            // }).catch((error)=>{
            //     console.log(error)
            // })
        }
    }
}
</script>
<style>
.detail-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 20px;
}
.detail-left {
  float: left;
  width: 200px;
  text-align: center;
}
.detail-right {
  float: left;
  width: 980px;
  margin-left: 20px;
}
.product-board {
  background: #fff;
  padding: 20px 0;
}
.product-board h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.product-board ul {
  margin-top: 20px;
}
.product-board li {
  text-align: left;
  padding: 10px 15px;
  cursor: pointer;
}
.product-board li.active,
.product-board li:hover {
  background: #4fc08d;
  color: #fff;
}
.product-board li a {
  display: block;
}
.sales-board {
  background: #fff;
}
.sales-board-form {

}
.sales-board-intro h2 {
  font-size: 20px;
  padding: 20px;
}
.sales-board-intro p {
  background: #f7fcff;
  padding: 10px 20px;
  color: #999;
  line-height: 1.8;
}
.sales-board-form {
  padding: 30px 20px;
  font-size: 14px;
}
.sales-board-line {
  clear: both;
  padding-bottom: 20px;
}
.sales-board-line-left {
    display: inline-block;
    width: 100px;
}
.sales-board-line-right {
    display: inline-block;
    width: 75%;
}
.sales-board-des {
  border-top: 20px solid #f0f2f5;
  padding: 15px 20px;
}
.sales-board-des p {
  line-height: 1.6;
}
.sales-board-des h2 {
  font-size: 20px;
  padding-bottom: 15px;
}
.sales-board-des h3 {
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0 10px 0;
}
.sales-board-des li {
  padding: 5px 0;
}
.sales-board-table {
  width: 100%;
  margin-top: 20px;
}
.sales-board-table th {
  background: #4fc08d;
  color: #fff;
}
.sales-board-table td {
    border: 1px solid #f0f2f5;
    padding: 15px;
}
</style>

