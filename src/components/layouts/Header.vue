<template>
	<header class="bgm">
		<h4 class="app-name float-left m-3">
			<img src="../../assets/logo.png" alt />
			<span class="ml-2">Routine Manager CSE</span>
			<sub class="beta ta mx-1">ALPHA {{version}}</sub>
		</h4>
		<div class="input-group float-right m-3" v-if="!signedIn" v-bind:class="{inputError:inputError}">
			<input
				type="text"
				v-model="inputId"
				@keyup="onKeyUp"
				class="form-control"
				placeholder="Student Id"
				aria-describedby="btnSignin"
			/>
			<div class="input-group-append">
				<button @click="onClickSignin()" class="btn btn-primary btn-sm" type="button">
					<i class="fal fa-sign-in"></i>
					<span class="ml-1">SIGNIN</span>
				</button>
			</div>
		</div>
		<div class="float-right" v-if="signedIn">
			<p class="student-id float-left mb-0 my-3">{{studentId}}</p>
			<button class="btn btn-outline-danger btn-sm float-right m-3" @click="signOut">
				<i class="fal fa-power-off"></i>
				<span class="ml-1">LOGOUT</span>
			</button>
			<div class="clearfix"></div>
		</div>
		<div class="clearfix"></div>
		<progress-loader :class="{animate:rootLoader}"/>
	</header>
</template>

<script>
	/** IMPORTS */
	import pac from "../../../package.json";
	import { mapGetters, mapMutations, mapActions } from "vuex";
	/** Components */
	import ProgressLoader from "../loaders/ProgressLoader"

	export default {
		name: "Header",
		props: ["input_id"],
		components:{
			'progress-loader':ProgressLoader
		},
		data() {
			return {
				inputId: this.input_id || "",
				version: pac.version,
				inputError: false
			};
		},
		watch: {
			input_id(val) {
				this.inputId = val;
			}
		},
		computed: {
			...mapGetters(["signedIn","rootLoader"]),
			...mapGetters("users", ["studentId"])
		},
		methods: {
			...mapActions("users", ["SigninUser", "signOut"]),
			onKeyUp(event) {
				if (this.inputId.trim() !== "") {
					this.inputError = false;
					if (event.keyCode === 13) {
						this.SigninUser(this.inputId);
					}
				} else {
					this.inputError = true;
				}
			},
			onClickSignin() {
				if (this.inputId.trim() !== "") {
					this.SigninUser(this.inputId);
				} else {
					this.inputError = true;
				}
			}
		}
	};
</script>
<style lang="scss">
	header {
		height: 4rem;
		overflow: hidden;
		position: relative;
		.app-name {
			.beta {
				font-size: 0.4em;
			}
		}
		.input-group {
			width: 14rem;
			.form-control {
				height: 2rem;
			}
		}
		.student-id {
			font-size: 1.3em;
		}
	}
	.dark {
		header {
			.app-name {
				font-weight: 300;
			}
		}
		.input-group {
			.form-control {
				background-color: #212121;
				border-color: #424242;
				color: #bdbdbd;
			}
		}
	}
	.light {
		header {
			.app-name {
				font-weight: 400;
			}
		}
	}
</style>
