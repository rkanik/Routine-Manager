<template>
	<div id="app" :class="[theme,accent]">
		<div class="main-row">
			<div class="main-col-left">
				<side-bar :sidebar="sidebar" :theme="theme" />
			</div>
			<div class="main-col-right bgp">
				<c-header :input_id="tempId" />
				<div class="router-view">
					<router-view />
				</div>
			</div>
		</div>
		<div class="modals">

			<modal-signup :class="{show:signup}" />
			<modal-editcourse v-if="editCourse" />

		</div>
		<div class="successes-errors">
			<errors :errors="errors" />
		</div>
	</div>
</template>

<script>
	/** Components */
	import Sidebar from "./components/layouts/Sidebar";
	import Header from "./components/layouts/Header";
	import SignupModal from "./components/modals/SignupModal";
	import EditCourseModal from "./components/Profile/EditCourse";
	import Errors from "./components/layouts/Errors";
	import { mapGetters, mapActions, mapMutations } from "vuex";

	export default {
		name: "app",
		components: {
			"side-bar": Sidebar,
			"c-header": Header,
			"modal-signup": SignupModal,
			"modal-editcourse": EditCourseModal,
			errors: Errors
		},
		data() {
			return {
				ed_running: false
			};
		},
		created() {
			this.onCreateApp(), this.onCreateUser();
		},
		computed: {
			...mapGetters(["sidebar", "theme", "accent", "errors"]),
			...mapGetters("users", ["signup", "tempId","editCourse"])
		},
		methods: {
			...mapMutations(["deleteError", "deleteErrors"]),
			...mapActions(["onCreateApp"]),
			...mapActions("users", ["onCreateUser"])
		},
		watch: {
			errors: function(val) {
				console.log("errors changed");
				if (val.length > 0 && !this.ed_running) {
					this.ed_running = true;
					this.deleteErrors();
				} else {
					this.ed_running = false;
				}
			}
		}
	};
</script>

<style lang='scss'>
	@import "./assets/scss/scrollbar.scss";
	@import "./assets/scss/themes.scss";
	@import "./assets/scss/defaults.scss";
</style>
