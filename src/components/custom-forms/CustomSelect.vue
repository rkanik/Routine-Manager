<template>
	<div class="form-group" :class="[theme||data.theme]">
		<i class="fal fa-angle-down fa-lg text-center position-absolute rounded-pill"></i>
		<select
			@change="$emit('change',$event.target.value)"
			v-model="selected"
			:class="{'rounded-pill':type||data.type=='pill','border-0':border||data.border=='none',shdw:shadow||data.shadow}"
			class="form-control"
		>
			<option v-for="(o, i) in options" :key="i" :value="o.value">{{o.text}}</option>
		</select>
	</div>
</template>

<script>
	export default {
		name: "custom-select",
		props: {
			options: Array,
			theme: String,
			type: String,
			border: String,
			shadow: Boolean,
			data:Object
		},
		data: () => ({selected: "none"}),
		watch:{options(val){if(val.length===1)this.selected='none'}}
	};
</script>

<style lang="scss" scoped>
	.form-group {
		position: relative;
		.fa-angle-down {
			width: 2rem;
			height: 1.5rem;
			right: 0.1rem;
			top: 50%;
			padding-top: 0.3rem;
			transform: translate(0, -50%);
			pointer-events: none;
		}
		.shdw {
			box-shadow: 0 0 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
		}
	}
	.dark.form-group {
		.form-control,
		.fa-angle-down {
			background-color: #212121;
			color: #757575;
		}
		.form-control {
			border-color: #313131;
		}
	}
	.d-19.form-group {
		.form-control,
		.fa-angle-down {
			background-color: #191919;
			color: #616161;
		}
		.form-control {
			border-color: #313131;
		}
	}
	.d-28.form-group {
		.form-control,
		.fa-angle-down {
			background-color: #282828;
			color: #757575;
		}
		.form-control {
			border-color: #424242;
		}
	}
	.light.form-group {
		.form-control,
		.fa-angle-down {
			background-color: #fafafa;
			color: #212121;
		}
		.form-control {
			border-color: #e0e0e0;
		}
	}
	.light-grey.form-group {
		.form-control,
		.fa-angle-down {
			background-color: #e0e0e0;
			color: #212121;
		}
		.form-control {
			border-color: #e0e0e0;
		}
	}
</style>