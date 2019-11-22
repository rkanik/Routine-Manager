<template>
  <div class="accents">
    <selectable-circle 
      @click="onClick"
      v-for="(color,index) in accents" 
      :key="color" :color='color'
      :active='active==index'
      :index="index"
      class="d-inline-block ml-1 mb-1"
    />
  </div>
</template>

<script>
import AccentItem from "./AccentItem"
export default {
  name:"accents",
  props:['activeColor'],
  components:{
    'selectable-circle':AccentItem
  },
  data() {

    let states = {
      active:this.activeIndex||0,
      accents:[
        "red","pink","purple","deep_purple",
        "indigo","blue","cyan","teal",
        "green","light_green","lime","yellow",
        "amber","orange","deep_orange","brown"
      ]
    }
    return states
  },
  created(){
    this.active = this.accents.indexOf(this.activeColor)
  },
  methods: {
    onClick(index){
      this.active=index
      this.$emit('change',this.accents[index])
    }
  },
  computed:{
    activeIndex(){
      return this.accents.indexOf(this.activeColor)
    }
  }
}
</script>