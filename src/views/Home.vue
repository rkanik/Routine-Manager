<template>
  <div class="home">
    <s-form />
    <TableView v-if="viewType=='table' && sRoutine != undefined" :routine="sRoutine" :slots="fullSlots" :aDays="assocDays" />
    <TabView
      v-if="viewType=='tab' && sRoutine != undefined"
      :routine="sRoutine"
      :aDay="tabActiveDay"
      :assocDays="assocDays"
      :imgSrc="aImages"
      :rsDays="routineDays"
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
      "tabActiveDay",
      "routineDays",
      "viewType",
      "aImages"
    ])
  }
};
</script>
