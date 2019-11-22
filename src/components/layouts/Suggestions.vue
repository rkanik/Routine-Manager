<template>
	<div class="suggestions bgmo sdw rounded py-3">
		<div
			v-for="(course, i) in data"
			:class="{active:focus==i}"
			:key="i"
			@click="$emit('click',i)"
			class="item"
		>
			<p class="tm mb-0 position-relative">
				<strong>[ {{course.code}} ]</strong>
				<span>{{course.title}}</span>
				<span class="shadow"></span>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "suggestions",
		props: ["data", "focus"],
		watch: {
			focus(i) {
				let el = document.querySelector(`.suggestions .item:nth-child(${i})`);
				if (el !== null /** && el.offsetTop > 273  */) {
					el.scrollIntoView();
				}
			}
		}
	};
</script>

<style lang="scss">
	.suggestions {
		position: absolute;
		top: 2.3rem;
		left: -12%;
		transform: translate(-12%);
		z-index: 10;
		width: 20rem;
		overflow: auto;
		max-height: 24rem;
		.item {
			width: 100%;
			overflow: hidden;
			padding: 0.4rem 1.2rem;
			cursor: pointer;
			p {
				overflow: hidden;
				white-space: nowrap;
				.shadow {
					position: absolute;
					right: -8px;
					top: 0;
					width: 4rem;
					display: block;
					height: 100%;
				}
			}
		}
		.item:hover,
		.active {
			background-color: rgba(0, 0, 0, 0.2);
			color: white !important;
		}
	}
	.dark .suggestions {
		.item {
			p .shadow {
				background: rgb(0, 0, 0);
				background: linear-gradient(
					90deg,
					rgba(0, 0, 0, 0) 0%,
					rgba(49, 49, 49, 1) 95%,
					rgba(49, 49, 49, 1) 100%
				);
			}
		}
		.item:hover,
		.active {
			p .shadow {
				background: rgb(0, 0, 0);
				background: linear-gradient(
					90deg,
					rgba(0, 0, 0, 0) 0%,
					rgba(0, 0, 0, 0) 5%,
					rgba(39, 39, 39, 1) 95%,
					rgba(39, 39, 39, 1) 100%
				);
			}
		}
	}
	.light .suggestions {
		.item {
			p .shadow {
				background: rgb(255, 255, 255);
				background: linear-gradient(
					90deg,
					rgba(255, 255, 255, 0) 0%,
					rgba(255, 255, 255, 1) 95%,
					rgba(255, 255, 255, 1) 100%
				);
			}
		}
		.item:hover,
		.active {
			p .shadow {
				background: rgb(0, 0, 0);
				background: linear-gradient(
					90deg,
					rgba(255, 255, 255, 0) 0%,
					rgba(255, 255, 255, 0) 5%,
					rgba(200, 200, 200, 1) 95%,
					rgba(200, 200, 200, 1) 100%
				);
			}
		}
	}
</style>