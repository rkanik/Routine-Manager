<template>
  <div class="profile">
    <SignedBox  v-bind:signedData="signedData"/>
  </div>
</template>

<script>

/** Components */
import SignedBox from '../components/Profile/SignedBox';

export default {
  name: 'profile',
  components: {
    SignedBox
  },
  data(){
    return{
      signedData:{
        "Courses":["CSE421(I)","CSE422(I)","CSE423(I)","CSE450(I)","CSE499(I)","ACT301(C)"],"CreatedAt":{"seconds":1561059093,"nanoseconds":136000000},"Email":"Rasel15-7040@diu.edu.bd","ID":"161-15-7040","LastVisited":{"seconds":1566930210,"nanoseconds":294000000},"Level":"L4","Name":"Md Rasel Khandkar","Section":"I","Term":"T2"
      }
    }
  }
}
</script>
