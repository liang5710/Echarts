import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import maps from'@/views/menus/maps'
import SingleBar from'@/views/menus/SingleBar'
import PieMap from'@/views/menus/PieMap'
import Circular from '@/views/menus/Circular'
import Line from '@/views/menus/Line'
import Content from '@/views/menus/Content'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: Index,
      redirect:'/content',
      children:[
        {
          path:'content',
          component:Content
        },
        {
          path:'maps',
          component:maps
        },
        {
          path:'singlebar',
          component:SingleBar
        },
        {
          path:'piemap',
          component:PieMap
        },
        {
          path:'circular',
          component:Circular
        },
        {
          path:'line',
          component:Line
        }
      
      ]  
    }
  ]
})
