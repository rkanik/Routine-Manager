<template>
	<div class="double-bounce" :class="[position]">
		<div class="spinner">
			<div class="double-bounce1"></div>
			<div class="double-bounce2"></div>
		</div>
	</div>
</template>
<script>
	export default {
    name: "double-bounce",
    props:['position']
	};
</script>

<style scoped>
	.spinner {
		width: 40px;
		height: 40px;
		position: relative;
		margin: 0.5rem auto;
  }
  .center .spinner{
    position: absolute;
    top: 50%;left: 50%;
    transform: translate(-50%, -50%)
  }
	.double-bounce1,
	.double-bounce2 {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #333;
		opacity: 0.6;
		position: absolute;
		top: 0;
		left: 0;
		-webkit-animation: sk-bounce 1.6s infinite ease-in-out;
		animation: sk-bounce 1.6s infinite ease-in-out;
	}

	.double-bounce2 {
		-webkit-animation-delay: -0.8s;
		animation-delay: -0.8s;
		background-color: #009688;
	}

	@-webkit-keyframes sk-bounce {
		0%,
		100% {
			-webkit-transform: scale(0);
		}
		50% {
			-webkit-transform: scale(1);
		}
	}

	@keyframes sk-bounce {
		0%,
		100% {
			transform: scale(0);
			-webkit-transform: scale(0);
		}
		50% {
			transform: scale(1);
			-webkit-transform: scale(1);
		}
	}
</style>