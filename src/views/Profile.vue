<template>
	<div class="profile">
		<profile-overview v-if="isDataLoaded" :theme="theme" />
		<quick-buttons v-if="isDataLoaded" />
		<routine-table
			:v-if="isDataLoaded&&studentsRoutine!=null"
			:routine="studentsRoutine"
			:slots="fullSlots"
			:aDays="assocDays"
		/>
	</div>
</template>

<script>
	/** Components */
	import Overview from "../components/Profile/Overview";
	import QuickButtons from "../components/Profile/QuickButtons";
	import TableView from "../components/viewTypes/TableView";
	import TabView from "../components/viewTypes/TabView";

	import router from "../routes/";

	import { mapMutations, mapGetters } from "vuex";

	export default {
		name: "profile",
		components: {
			"profile-overview": Overview,
			"quick-buttons": QuickButtons,
			"routine-table": TableView,
			TabView
		},
		computed: {
			...mapGetters(["signedIn", "theme"]),
			...mapGetters("users", ["isDataLoaded"]),
			...mapGetters("routines", ["studentsRoutine", "fullSlots", "assocDays"])
		}
	};
</script>
