<template>
  <div class="home">
    <search-form />
    <!-- <search-form-alt/> -->
    <TableView v-if="searchRoutine!==null" :routine="searchRoutine" :slots="fullSlots" :aDays="assocDays" />
    <TabView v-if="1>2"/>
  </div>
</template>

<script>
/** Components */
import SearchForm from "../components/layouts/SearchForm";
import SearchForm2 from "../components/custom-forms/SearchForm";
import TableView from "../components/viewTypes/TableView";
import TabView from "../components/viewTypes/TabView";

import { mapMutations, mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    "search-form": SearchForm,
    "search-form-alt": SearchForm2,
    TableView,
    TabView
  },
  computed: {
    ...mapGetters('routines',["searchRoutine","fullSlots","assocDays","fullDays"]),
  }
};
</script>
