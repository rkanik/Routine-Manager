<template>
	<div class="c-modal signup">
		<div class="overlay"></div>
		<div class="inner bgmo">
			<i @click="hide" class="fal fa-times position-absolute ts c-close"></i>
			<double-bounce
				v-if="loading"
				:position="'center'"
				class="loader position-absolute h-100 w-100 rounded"
			/>
			<div class="content m-3">
				<div>
					<div class="text-center">
						<p class="lead mt-3 tp mt-4 mb-2">Create your account</p>
						<p
							class="lead2 ts"
						>Please enter your informations correctly and then click on save to create your account</p>
					</div>
					<hr />
					<form class="px-4">
						<custom-input
							v-model="data.student_id"
							:hint="'Enter your student ID'"
							:data="darkPillShadow"
							:bind="tempId"
							:theme="modalTheme"
						/>
						<custom-input 
							v-model="data.name" 
							:hint="'Enter your Full Name'" 
							:data="darkPillShadow" 
							:theme="modalTheme"
						/>

						<custom-input
							v-model="data.email"
							:hint="'Enter email address'"
							:data="darkPillShadow"
							:message="'You can leave this empty'"
							:theme="modalTheme"
						/>
						<custom-select
							@change="onChangeLevel"
							:options="levelOptions"
							:data="darkPillShadow"
							:shadow="false"
							:theme="modalTheme"
						/>
						<custom-select
							@change="onChangeTerm"
							:options="termOptions"
							:data="darkPillShadow"
							:shadow="false"
							:theme="modalTheme"
						/>

						<custom-select
							@change="(s)=>data.section=s"
							:options="availableSections"
							:data="darkPillShadow"
							:shadow="false"
							:theme="modalTheme"
						/>

						<button
							class="btn btn-outline-info btn-sm rounded-pill pl-4 pr-4 my-3"
							@click="onClickSave()"
							type="button"
						>Save</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapMutations, mapActions, mapGetters } from "vuex";
	/** COMPONENTS */
	import DoubleBounce from "../loaders/DoubleBounce";
	import CustomSelect from "../custom-forms/CustomSelect";
	import CustomInput from "../custom-forms/CustomInput";

	export default {
		name: "modal-signup",
		components: {
			"double-bounce": DoubleBounce,
			"custom-select": CustomSelect,
			"custom-input": CustomInput
		},
		data() {
			return {
				loading: false,
				data: {
					student_id: "",
					name: "",
					email: "",
					level: "none",
					term: "none",
					section: "none"
				},
				darkPillShadow: {
					//theme: "d-28",
					type: "pill",
					border: "none",
					shadow: true
				},
				/** Strings */
				emMes: "You can leave this empty",
				idMes: "Student id should be like XXX-XX-XXXX",
				levelOptions: [
					{ value: "none", text: "Select your level" },
					{ value: "L1", text: "Level - 1" },
					{ value: "L2", text: "Level - 2" },
					{ value: "L3", text: "Level - 3" },
					{ value: "L4", text: "Level - 4" }
				],
				termOptions: [
					{ value: "none", text: "Select your term" },
					{ value: "T1", text: "Term - 1" },
					{ value: "T2", text: "Term - 2" },
					{ value: "T3", text: "Term - 3" }
				]
			};
		},
		computed: {
			...mapGetters(["modalTheme"]),
			...mapGetters("routines", ["availableSections"]),
			...mapGetters("users", ["tempId"])
		},
		watch: {
			tempId(id) {
				this.data.student_id = id;
			}
		},
		methods: {
			...mapMutations(["pushError"]),
			...mapMutations("users", ["setState"]),
			...mapMutations("routines", ["resetAvailableSections"]),
			...mapActions("routines", ["fetchAvailableSections"]),
			...mapActions("users", ["signup"]),
			hide() {
				this.setState({ state: "signup", data: false });
				this.setState({ state: "tempId", data: "" });
			},
			onChangeLevel(level) {
				this.data.level = level;
				if (level !== "none" && this.data.term !== "none") {
					this.fetchAvailableSections({ level, term: this.data.term });
				} else this.resetAvailableSections();
			},
			onChangeTerm(term) {
				this.data.term = term;
				if (term !== "none" && this.data.level !== "none") {
					this.fetchAvailableSections({ level: this.data.level, term });
				} else this.resetAvailableSections();
			},
			async onClickSave() {
				if (!this.validateStudentId(this.data.student_id)) {
					this.pushError({
						title: "Invalid Student ID",
						message:
							"Student id should not contain Characters and format will be like XXX-XX-XXXX"
					});
					return;
				}
				if (this.data.name.trim() === "" || /\d/.test(this.data.name)) {
					this.pushError({
						title: "Invalid Name!",
						message: "Name shoudn't contain number or can't be blank"
					});
					return;
				}
				if (
					this.data.email.trim() !== "" &&
					!this.validateEmail(this.data.email)
				) {
					this.pushError({
						title: "Invalid email address",
						message: "Make sure you entered a valid email address"
					});
					return;
				}
				if (
					"none" === this.data.level ||
					"none" === this.data.term ||
					"none" === this.data.section
				) {
					this.pushError({
						title: "Invalid level, term or section",
						message: "Please select your level, term and section properly"
					});
					return;
				}
				this.loading = true;
				await this.signup(this.data);
				this.loading = false;
			},
			validateEmail(email) {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(String(email).toLowerCase());
			},
			validateStudentId(id) {
				let re = /^[0-9][0-9][0-9][-][0-9][0-9][-][0-9]+$/;
				return re.test(id);
			},
			getCourseCodes() {
				return this.formData[this.formData.level + this.formData.term].map(
					x => {
						return x.Code + "(" + this.formData.section.toUpperCase() + ")";
					}
				);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.c-modal {
		.overlay {
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			display: none;
		}
		.inner {
			position: fixed;
			border-radius: 4px;
			top: 1rem;
			right: 4rem;
			height: 0;
			width: 0;
			overflow: hidden;
			visibility: hidden;
			opacity: 0;
			.content {
				display: none;
				width: 24rem;
				height: max-content;
			}
			.c-close {
				top: 0.8rem;
				right: 1rem;
				cursor: pointer;
			}
			.c-close:hover {
				color: #e57373 !important;
			}
			hr {
				border-color: #424242;
			}
			.lead2 {
				font-weight: 300;
				font-size: 0.9em;
			}
		}
	}

	.show {
		.overlay {
			display: block;
			z-index: 10;
		}
		.inner {
			transition: all 0.3s;
			visibility: visible;
			opacity: 1;
			z-index: 11;
			overflow: visible;
			height: auto;
			width: max-content;
			top: 50%;
			left: 50%;
			right: 0;
			transform: translate(-50%, -50%);
			transition: all 0.3s;
			.content {
				display: block;
				position: relative;
			}
			.loader {
				background-color: #4242429a;
				z-index: 12;
			}
		}
	}
	.disabled {
		pointer-events: none;
		color: #424242 !important;
	}

	.dark {
		.c-modal {
			.overlay {
				background-color: rgba(0, 0, 0, 0.65);
			}
		}
	}
	.light {
		.c-modal {
			.overlay {
				background-color: rgba(0, 0, 0, 0.80);
			}
		}
	}
</style>
