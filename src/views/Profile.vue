<template>
  <div class="profile">
    <SignedBox/>
    <TableView v-if="viewType=='table'" :routine='userRoutine' :slots='fullSlots' :aDays='assocDays'/>
    <TabView  v-if="viewType=='tab'" :routine='userRoutine' :aDay='tabActiveDay' :assocDays='assocDays' :imgSrc='aImages' :rsDays='routineDays'/>
    <!-- <div class="p-3">
      <CardBar class="mb-4"/>
      <Card class="float-left" v-bind:data="{img:'com_fun.jpg',title:'Computer fundamentals',time:'08:30-10:00',room:'315DT5',teacher:'Mousumi zaman bonny'}" />
      <Card class="float-left ml-4" v-bind:data="{img:'bas_math.jpg',title:'Basic mathemetics',time:'08:30-10:00',room:'315DT5',teacher:'Zakia Zaman'}" />
    </div> -->
  </div>
</template>

<script>

/** Components */
import SignedBox from '../components/Profile/SignedBox';
import TableView from "../components/viewTypes/TableView";
import TabView from "../components/viewTypes/TabView";

import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'profile',
  components: {
    SignedBox,TableView,TabView,
  },
  created(){
    this.onCreateProfile();
  },
  data(){
    return{
      signedData:{
        "Courses":["CSE421(I)","CSE422(I)","CSE423(I)","CSE450(I)","CSE499(I)","ACT301(C)"],"CreatedAt":{"seconds":1561059093,"nanoseconds":136000000},"Email":"Rasel15-7040@diu.edu.bd","ID":"161-15-7040","LastVisited":{"seconds":1566930210,"nanoseconds":294000000},"Level":"L4","Name":"Md Rasel Khandkar","Section":"I","Term":"T2"
      },
    }
  },
  methods:{
    ...mapMutations(['onCreateProfile']),
  },
  computed:{
    ...mapGetters([
      'userRoutine','viewType','fullSlots','assocDays',
      'tabActiveDay','aImages','routineDays'])
  }
}
</script>

<style lang="scss">
  .profile{
    height: calc(100vh - 4rem);
    overflow: auto;
  }
</style>
