<template>
  <div class="profile">
    <SignedBox/>
    <TableView v-if="viewType=='table' && userRoutine " :routine='userRoutine' :slots='fullSlots' :aDays='assocDays'/>
    <TabView  v-if="viewType=='tab'" :routine='userRoutine' :aDay='tabActiveDay' :assocDays='assocDays' :rsDays='routineDays'/>
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
