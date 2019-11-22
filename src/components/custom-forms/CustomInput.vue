<template>
	<div class="form-group" :class="[theme||data.theme]">
		<label v-if="label" class="mb-0 mx-1">{{label}}</label>
		<input
			@keyup="$emit('keyup',d_bind)"
			:class="{'rounded-pill':type||data.type=='pill','border-0':border||data.border=='none',shdw:shadow||data.shadow}"
			:placeholder="hint"
			v-model="d_bind"
			class="form-control"
		/>
		<small v-if="m!==null" :class="{'red-3':e}" class="form-text ml-2">{{m}}</small>
	</div>
</template>

<script>
	export default {
		name: "custom-input",
		props: [
			"hint",
			"message",
			"theme",
			"label",
			"type",
			"border",
			"shadow",
			"data",
			"bind",
			"error"
		],
		model: {
			event: "keyup"
		},
		data() {
			return {
				e: this.error || false,
				m: this.message || null,
				d_bind: this.bind || ""
			};
		},
		watch: {
			bind(val) {
				this.d_bind = val;
			},
			message(val){this.m=val},
			error(val){this.e=val}
		}
	};
</script>

<style lang="scss" scoped>
	.dark.form-group {
		.form-control {
			background-color: #212121;
			border-color: #313131;
			color: #757575;
		}
	}
	.d-19.form-group {
		.form-control {
			background-color: #191919;
			border-color: #313131;
			color: #616161;
		}
	}
	.d-31.form-group {
		.form-control {
			background-color: #313131;
			border-color: #424242;
			color: #616161;
		}
	}
	.d-28.form-group {
		.form-control {
			background-color: #282828;
			border-color: #424242;
			color: #bdbdbd;
		}
	}
	.light.form-group {
		.form-control {
			background-color: #fafafa;
			border-color: #e0e0e0;
			color: #212121;
		}
	}
	.light-grey.form-group {
		.form-control {
			background-color: #e0e0e0;
			border-color: #9e9e9e;
			color: #212121;
			box-shadow: none !important;
		}
	}
	.form-group {
		position: relative;
		.shdw {
			box-shadow: 0 0 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
		}
		small {
			color: #616161;
		}
		.red-3 {
			color: #e57373;
		}
	}
</style>