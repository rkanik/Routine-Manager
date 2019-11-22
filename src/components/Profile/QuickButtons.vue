<template>
	<div class="quick-buttons text-center px-4 py-2 bgm">
		<div class="mb-3">
			<button :class="classes">Edit Course</button>
			<button :class="classes">Table View</button>
			<button :class="classes">Card View</button>
			<button :class="classes">Update info</button>
			<button :class="classes">Teachers</button>
			<button :class="classes" class="active">Dark</button>
			<button :class="classes">Search</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "quick-buttons",
		data() {
			return {
				classes: "br bgt ts rounded-pill mx-1"
			};
		}
	};
</script>

<style lang="scss">
	.quick-buttons{
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
	}
	button {
		padding: 0.3rem 1rem;
		text-transform: uppercase;
		font-size: 0.9em;
		letter-spacing: 1px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
	}
</style>