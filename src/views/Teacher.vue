<template>
	<div class="teacher bgm pt-2 pb-4 sdw">
		<div class="form">
			<div class="form-group position-relative">
				<input
					@keydown="initialKeyUp"
					v-model="initial"
					type="text"
					class="form-control code"
					placeholder="Teacher name or initial"
				/>
				<!-- <Suggestions
						@click="click"
						v-if="courseSuggestions.length!==0"
						:data="courseSuggestions"
						:focus="onFocus"
				/>-->
			</div>
			<div class="form-group">
				<button @click="fetch" class="btn-search br">
					<i class="fal fa-search"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapMutations } from "vuex";
	export default {
		name: "teacher",
		data() {
			return {
				initial: ""
			};
		},
		methods: {
			...mapActions(["fetchTeacher"]),
			...mapMutations(["pushError"]),
			fetch() {
				if (this.initial.trim() !== "") {
					this.fetchTeacher(this.initial.toUpperCase());
				} else {
					this.pushError({
						title: "Incomplete filed error!",
						message: "Please enter teacher initial or name and search again"
					});
				}
			},
			initialKeyUp(ev) {
				if (ev.keyCode == 13) {
					this.fetch();
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.teacher {
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
				.code {
					border-top-right-radius: 0;
					border-bottom-right-radius: 0;
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
	}
	.dark .teacher .form {
		.btn-search,
		.form-control {
			background-color: #252525;
			border-color: #424242 !important;
			color: #bdbdbd;
		}
		.btn-search:hover {
			background-color: #ffffff2f;
		}
	}
	.light .teacher .form {
		.btn-search,
		.form-control {
			background-color: white;
			border-color: #bdbdbd !important;
			color: #212121;
		}
		.btn-search:hover {
			background-color: #e0e0e0;
		}
	}
</style>