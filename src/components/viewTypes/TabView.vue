<template>
  <div class="tab-view text-center">
    <div class="container">
      <TabSwitcher :assocDays="assocDays" :rsDays='rsDays' :aDay='aDay'/>
        <div class="card-container">
            <Card
                v-for="(rou, i) in routine[aDay]"
                :key="i"
                :data="rou"
                class="float-left mr-3 mb-3"
            />
      </div>
    </div>
  </div>
</template>

<script>
/** IMPORTS */
import Card from "../viewTypes/subs/Card";
import TabSwitcher from "../viewTypes/subs/TabSwitcher";

export default {
  name: "TabView",
  props: {
    routine: Object,
    aDay: String,
    rsDays:Array,
    assocDays:Object
  },
  components: { Card, TabSwitcher },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
  .card-container{
    display: inline-block;
  }
</style>
