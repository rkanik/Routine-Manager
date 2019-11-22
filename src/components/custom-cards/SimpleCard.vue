<template>
	<div :class="theme" class="simple-card p-3 rounded">
		<p class="label mb-0 ta">{{label}}</p>
		<p class="mb-0">{{content}}</p>
	</div>
</template>
<script>
	export default {
		name: "simple-card",
		props: ["label", "content", "theme"]
	};
</script>

<style lang='scss' scoped>
	.simple-card {
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);
		.label{
			font-size: 0.9em;
		}
	}
	.dark.simple-card {
		background-color: #303030;
	}
	.light.simple-card {
		background-color: #ffffff;
		color: #313131;
	}
</style>