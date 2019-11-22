<template>
	<div :class="size" class="lds-ring">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>
<script>
export default {
   name:'simple-loader',
   props:['size']
}
</script>
<style scoped>
	.lds-ring {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 8px;
		border: 8px solid #fff;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #fff transparent transparent transparent;
   }
   
   .csm{
      width: 32px;
		height: 32px;
   }
   .csm div{
      width: 24px !important;
		height: 24px !important;
		margin: 2px !important;
		border: 3px solid #fff !important;
   }

	.lds-ring div:nth-child(1) {
		animation-delay: -0.15s;
	}
	.lds-ring div:nth-child(2) {
		animation-delay: -0.1s;
	}
	.lds-ring div:nth-child(3) {
		animation-delay: -0.05s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>