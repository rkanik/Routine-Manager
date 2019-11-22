<template>
	<div class="search-form bgm sdw">
		<div class="form py-2">
			<div class="form-group">
				<i class="fal fa-angle-down fa-lg bgm p-2 rounded-pill"></i>
				<select @change="fetchSection" class="form-control level" v-model="formData.level">
					<option value="none">Select Level</option>
					<option value="L1">L1 - First Year</option>
					<option value="L2">L2 - Second Year</option>
					<option value="L3">L3 - Third Year</option>
					<option value="L4">L4 - Fourth Year</option>
				</select>
			</div>
			<div class="form-group">
				<i class="fal fa-angle-down fa-lg bgm p-2 rounded-pill"></i>
				<select @change="fetchSection" class="form-control term" v-model="formData.term">
					<option value="none">Select Term</option>
					<option value="T1">Term - 1</option>
					<option value="T2">Term - 2</option>
					<option value="T3">Term - 3</option>
				</select>
			</div>
			<div class="form-group">
				<i class="fal fa-angle-down fa-lg bgm p-2 rounded-pill"></i>
				<select class="form-control section" v-model="formData.section">
					<option value="none">Select section</option>
					<option v-for="section in availableSections" :key="section.value">{{section.text}}</option>
				</select>
			</div>
			<div class="form-group">
				<button type="button" class="btn-search br" @click="fetchRoutine(formData)">
					<i class="fal fa-search"></i>
				</button>
			</div>
		</div>
		<div class="more-option" :class="{expanded:expanded}">
			<div class="form">
				<div class="form-group position-relative">
					<input
						v-model="advFData.code"
						type="text"
						class="form-control code"
						placeholder="Course code"
						@keyup="keyup($event.target.value)"
						@keydown="keydown"
						@blur="onblur"
					/>
					<Suggestions
						@click="click"
						v-if="courseSuggestions.length!==0"
						:data="courseSuggestions"
						:focus="onFocus"
					/>
				</div>
				<div class="form-group">
					<i class="fal fa-angle-down fa-lg bgm p-2 rounded-pill"></i>
					<select class="form-control section" v-model="advFData.section">
						<option value="none">Select section</option>
						<option v-for="section in availableSections" :key="section.value">{{section.text}}</option>
					</select>
				</div>
				<div class="form-group">
					<button @click="advancedFetchRoute(advFData)" class="btn-search br">
						<i class="fal fa-search"></i>
					</button>
				</div>
			</div>
		</div>
		<div class="more text-center">
			<i @click="expanded = !expanded" :class="{rotate:expanded}" class="fal fa-angle-down fa-lg mb-2"></i>
		</div>
	</div>
</template>

<script>
	/** Components */
	import Suggestions from "./Suggestions";

	import { mapMutations, mapGetters, mapActions } from "vuex";

	export default {
		name: "SearchForm",
		components: { Suggestions },
		data() {
			return {
				/** Booleans */
				lightTheme: false,
				expanded: true,
				onFocus: -1,

				/** Objects */
				formData: { level: "none", term: "none", section: "none" },
				advFData: { code: "", section: "none" }
			};
		},
		computed: {
			...mapGetters([]),
			...mapGetters("routines", ["availableSections", "courseSuggestions"])
		},
		methods: {
			...mapMutations([
				"onClickSearch",
				"onClickSFormExpand",
				"onClickAdvFSeacrch"
			]),
			...mapMutations("routines", ["setState"]),
			...mapActions("routines", [
				"fetchRoutine",
				"advancedFetchRoute",
				"fetchAvailableSections",
				"fetchCourseSuggestions"
			]),
			fetchSection() {
				if ("none" !== this.formData.term && "none" !== this.formData.level) {
					this.fetchAvailableSections({
						level: this.formData.level,
						term: this.formData.term
					});
				}
				this.formData.section = "none";
			},
			keyup(val) {
				if (val.trim() !== "" && val.split("").length === 6) {
					this.fetchAvailableSections({ code: val.toUpperCase() });
				}
			},
			keydown(event) {
				if (event.keyCode == 40) {
					/** Arrow DOWN */
					if (this.onFocus === this.courseSuggestions.length - 1) {
						this.onFocus = 0;
					} else {
						this.onFocus++;
					}
					this.advFData.code = this.courseSuggestions[this.onFocus].code;
				} else if (event.keyCode == 38) {
					/** Arrow UP */
					if (this.onFocus === 0 || this.onFocus === -1) {
						this.onFocus = this.courseSuggestions.length - 1;
					} else {
						this.onFocus--;
					}
					this.advFData.code = this.courseSuggestions[this.onFocus].code;
				} else if (event.keyCode == 13) {
					/** Enter / Submit */
					event.preventDefault();
					this.click(this.onFocus);
				} else if (event.keyCode == 9) {
				} else {
					this.fetchCourseSuggestions(this.advFData.code + event.key);
				}
			},
			click(index) {
				this.advFData.code = this.courseSuggestions[index].code;
				this.reset();
			},
			sleep(timeout) {
				return new Promise((resolve, _) => {
					setTimeout(() => {
						resolve();
					}, timeout);
				});
			},
			async onblur() {
				await this.sleep(200);
				if (this.courseSuggestions.length > 0) {
					this.reset();
				}
			},
			reset() {
				this.setState({ state: "courseSuggestions", data: [] });
				this.onFocus = -1;
				this.focusedCourse = {};
			}
		}
	};
</script>
<style lang="scss" scoped>
	.search-form {
		.form {
			display: flex;
			align-items: center;
			justify-content: center;
			.form-group {
				position: relative;
				margin-bottom: 0;
				.form-control {
					height: 2.2rem;
					background-color: transparent;
				}
				.level,
				.term {
					width: 14rem;
				}
				.term,
				.section {
					border-left: none;
					border-radius: 0;
				}
				.level,
				.code {
					border-top-right-radius: 0;
					border-bottom-right-radius: 0;
				}
				.section {
					width: 10rem;
				}
				.fa-angle-down,
				.simple-loader {
					position: absolute;
					top: 0.15rem;
					right: 0.15rem;
					pointer-events: none;
				}
			}
			.btn-search {
				height: 2.2rem;
				border-left: none;
				padding: 0.25rem 0.8rem;
				border-left: none !important;
				border-radius: 0.25rem;
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
		}
		.more-option {
			max-height: 0;
			overflow: hidden;
			transition: max-height 0.4s, margin 0.4s;
			.hidden {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
			}
		}
		.expanded {
			max-height: 50rem;
			margin: 1rem;
			overflow: visible;
		}
		.more {
			.fa-angle-down {
				cursor: pointer;
				transition: transform 0.3s ease-in-out;
			}
			.rotate {
				transform: rotate(180deg);
			}
		}
	}

	.light {
		.search-form {
			.btn-search,
			.form-control {
				background-color: white !important;
				border-color: #bdbdbd !important;
				color: #212121;
			}
			.fa-angle-down {
				color: #757575;
			}
			.btn-search:hover {
				background-color: #e0e0e0 !important;
			}
		}
	}
	.dark {
		.search-form {
			.btn-search,
			.form-control {
				background-color: #252525 !important;
				border-color: #424242 !important;
				color: #bdbdbd;
			}
			.fa-angle-down {
				color: #616161;
			}
			.btn-search:hover {
				background-color: #ffffff2f !important;
			}
		}
	}
</style>

