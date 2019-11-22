<template>
	<div :class="['c-'+color,{active}]" class="circle-box">
		<div @click="$emit('click',index)" class="circle position-relative rounded-circle">
			<i class="fal fa-check to-center text-white"></i>
		</div>
	</div>
</template>

<script>
	export default {
		name: "selectable-color-circle",
		props: ["color", "active", "index"]
	};
</script>

<style lang="scss" scoped>
	.circle-box {
		.circle {
			width: 2rem;
			height: 2rem;
			cursor: pointer;
			border: 2px solid transparent;
			transition: border 0.2s ease-in-out;
		}
		.circle:hover {
			border-color: #e0e0e0;
		}
		.fa-check {
			display: none;
		}
	}
	.active {
		.fa-check {
			display: block;
		}
	}
	.c-teal .circle {
		background-color: teal;
	}
	.c-red .circle {
		background-color: #f44336;
	}
	.c-pink .circle {
		background-color: #e91e63;
	}
	.c-purple .circle {
		background-color: #9c27b0;
	}
	.c-deep_purple .circle {
		background-color: #673ab7;
	}
	.c-indigo .circle {
		background-color: #3f51b5;
	}
	.c-blue .circle {
		background-color: #3f51b5;
	}
	.c-cyan .circle {
		background-color: #3f51b5;
	}
	.c-green .circle {
		background-color: #4caf50;
	}
	.c-light_green .circle {
		background-color: #8bc34a;
		.fa-check {
			color: black !important;
		}
	}
	.c-lime .circle {
		background-color: #cddc39;
		.fa-check {
			color: black !important;
		}
	}
	.c-yellow .circle {
		background-color: #ffeb3b;
		.fa-check {
			color: black !important;
		}
	}
	.c-amber .circle {
		background-color: #ffc107;
		.fa-check {
			color: black !important;
		}
	}
	.c-orange .circle {
		background-color: #ff9800;
	}
	.c-deep_orange .circle {
		background-color: #ff5722;
	}
	.c-brown .circle {
		background-color: #795548;
	}
	.c-blue_grey .circle {
		background-color: #607d8b;
	}
</style>