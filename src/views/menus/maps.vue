<template>
    <div>
         <v-chinamap :mapname="map" @on-change="onChange($event)" ></v-chinamap>
         <my-dialog :is-show="isShow" @on-close="openDialog">
             <v-chinamap :mapname="nowmap" ></v-chinamap>
         </my-dialog>
    </div>
</template>

<script>
import VChinamap from '../../components/ChinaMap'
import myDialog from '../../components/base/Dialog'
export default {
    components:{
        VChinamap,
        myDialog
    },
    data(){
        return{
          isShow:false,
          map:'china',
          nowmap:'china',
          menu:[]
        }
    }
    ,methods:{
       openDialog(){
          this.isShow=!this.isShow
       },
       onChange(param){
         this.isShow=true,
         this.nowmap=param.name
       }
       
    }
}
</script>