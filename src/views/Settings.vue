<template>
	<div class="settings">
		<div class="bgs sdw p-4 rounded">
			<p class="ta mt-2 mb-4 small text-uppercase">Basic settings</p>
			<div class="row pb-3 m-0 mt-2 brb">
				<label class="tp col m-0">Light theme</label>
				<div class="switch-con col">
					<c-switch @change="(_)=>sc('theme',_)" :checked="theme=='light'" class="float-right" />
				</div>
			</div>
			<div class="row pb-3 m-0 mt-4 brb">
				<label class="tp col m-0">Accent colors</label>
				<div class="switch-con col">
					<Accents @change="ac" :activeColor='accent' class="float-right" />
				</div>
			</div>
			<div class="row pb-3 m-0 mt-3">
				<label class="tp col m-0">Ramadan time</label>
				<br />
				<div class="switch-con col">
					<c-switch class="float-right" :name="'ramadan'" :checked="false" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Switch from "../components/switch/Switch";
	import Accents from "../components/layouts/Accents";
	import { mapGetters, mapMutations } from "vuex";

	export default {
		name: "Settings",
		components: { "c-switch": Switch, Accents },
		data() {
			return {
				tabActive: "Table",
				lightTheme: true
			};
		},
		computed: {
			...mapGetters(["theme",'accent'])
		},
		methods: {
			...mapMutations(["setGlobalState"]),
			/** on Switch Change */
			sc(state, value) {
				switch (state) {
					case "theme":
						this.switchTheme(state, value);
						break;
					default:
						break;
				}
			},
			/** on Accent Change */
			ac(color) {
				this.setGlobalState({ state: "accent", data: color });
				localStorage.setItem("accent", color);
			},
			switchTheme(state, value) {
				let theme = value ? "light" : "dark";
				this.setGlobalState({ state, data: theme });
				localStorage.setItem(state, theme);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.settings {
		padding: 1rem 0;
		width: 44rem;
		margin: 2rem auto;
	}

	.dark .settings {
		.row {
			border-color: #333333 !important;
		}
	}

	.light .settings {
		.row {
			border-color: #e0e0e0 !important;
		}
	}
</style>
