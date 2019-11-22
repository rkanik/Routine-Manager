<template>
	<svg xmlns="http://www.w3.org/2000/svg" width="42" height="28" viewBox="0 0 42 28">
		<g transform="translate(-429.5 -56.5)">
			<line class="a" :class="theme" x2="38" transform="translate(431.5 70.5)" />
			<line class="a" :class="theme" x2="29" transform="translate(431.5 82.5)" />
			<line class="a" :class="theme" x2="19" transform="translate(431.5 58.5)" />
		</g>
	</svg>
</template>

<script>
	export default {
		name: "SvgToggler",
		props: ["theme"]
	};
</script>

<style>
	.a {
		fill: none;
		stroke-linecap: round;
		stroke-width: 4px;
	}
	.dark {
		stroke: #f5f5f5;
  }
  .light{
    stroke: #424242;
  }
</style>