<template>
  <div class="home">
    <s-form />
    <TableView v-if="viewType=='table'" :routine="sRoutine" :slots="fullSlots" :aDays="assocDays" />
    <TabView
      v-if="viewType=='tab'"
      :routine="sRoutine"
      :aDay="sActiveDay"
      :assocDays="assocDays"
      :rsDays="sRoutineDays"
    />
  </div>
</template>

<script>
/** Components */
import SearchForm from "../components/layouts/SearchForm";
import TableView from "../components/viewTypes/TableView";
import TabView from "../components/viewTypes/TabView";

import { mapMutations, mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    "s-form": SearchForm,
    TableView,
    TabView
  },
  computed: {
    ...mapGetters([
      "sRoutine",
      "fullSlots",
      "assocDays",
      'sRoutineDays',
      "viewType",
      'sActiveDay'
    ])
  }
};
</script>
