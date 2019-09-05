<template>
  <div class="profile">
    <SignedBox/>
    <div class="p-3">
      <CardBar class="mb-4"/>
      <Card class="float-left" v-bind:data="{img:'com_fun.jpg',title:'Computer fundamentals',time:'08:30-10:00',room:'315DT5',teacher:'Mousumi zaman bonny'}" />
      <Card class="float-left ml-4" v-bind:data="{img:'bas_math.jpg',title:'Basic mathemetics',time:'08:30-10:00',room:'315DT5',teacher:'Zakia Zaman'}" />
    </div>
  </div>
</template>

<script>

/** Components */
import SignedBox from '../components/Profile/SignedBox';
import Card from '../components/Profile/subs/Card';
import CardBar from '../components/Profile/subs/CardBar';

export default {
  name: 'profile',
  components: {
    SignedBox,
    Card,
    CardBar
  },
  data(){
    return{
      signedData:{
        "Courses":["CSE421(I)","CSE422(I)","CSE423(I)","CSE450(I)","CSE499(I)","ACT301(C)"],"CreatedAt":{"seconds":1561059093,"nanoseconds":136000000},"Email":"Rasel15-7040@diu.edu.bd","ID":"161-15-7040","LastVisited":{"seconds":1566930210,"nanoseconds":294000000},"Level":"L4","Name":"Md Rasel Khandkar","Section":"I","Term":"T2"
      },
    }
  }
}
</script>
