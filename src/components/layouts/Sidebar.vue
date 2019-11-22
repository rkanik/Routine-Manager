<template>
	<div class="sidebar bgs" :class="sidebar">
		<div class="menu-toggler p-3">
			<div class="circle" @click="onClickToggler(sidebar)">
				<s-toggler class="toggler" :theme="theme" />
			</div>
		</div>
		<div class="gap"></div>
		<ul class="router-link-group">
			<router-link tag="li" to="/">
				<i class="fal fa-home icon"></i>
				<p class>Home</p>
			</router-link>
			<router-link v-if="signedIn" tag="li" to="/me">
				<i class="fal fa-user icon"></i>
				<p class>My profile</p>
			</router-link>
			<router-link tag="li" to="/teacher">
				<i class="fal fa-user-graduate icon"></i>
				<p class>Teachers</p>
			</router-link>
			<router-link tag="li" to="/emptyroom">
				<i class="fal fa-list-alt icon"></i>
				<p class>Empty rooms</p>
			</router-link>
			<router-link tag="li" to="/questions">
				<i class="fal fa-folder icon"></i>
				<p class>Questions</p>
			</router-link>
			<hr />
			<router-link tag="li" to="/settings">
				<i class="fal fa-cog icon"></i>
				<p class>Settings</p>
			</router-link>
		</ul>
	</div>
</template>

<script>
	import Toggler from "../icons/SvgToggler";

	import { mapMutations, mapGetters } from "vuex";

	export default {
		name: "sidebar",
		props: {
			sidebar: String,
			theme: String
		},
		components: {
			"s-toggler": Toggler
		},
		methods: {
			...mapMutations(["setSidebar"]),
			onClickToggler(v) {
				if (v === "collapsed") this.setSidebar("expanded");
				else {
					this.setSidebar("collapsed");
				}
			},
			change() {
				let theme = localStorage.getItem("theme");
				if (theme === "dark") {
					localStorage.theme = "light";
				} else localStorage.theme = "dark";
			}
		},
		computed: {
			...mapGetters(["signedIn"])
		}
	};
</script>

<style lang="scss">
	.sidebar {
		width: 13rem;
		height: 100vh;
		transition: width 0.3s ease-in-out;
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.2);
		.menu-toggler {
			transition: padding 0.2s ease-in-out;
			.circle {
				border-radius: 50%;
				overflow: hidden;
				height: 2.8rem;
				width: 2.8rem;
				padding: 0.5rem;
				padding-left: 0.7rem;
				cursor: pointer;
				transition: padding, width, border-radius 0.2s ease-in;
				transition-delay: 0s;
				.toggler {
					height: 1.5rem;
					width: 1.5rem;
				}
			}
		}
		.gap {
			width: 100%;
			height: 4rem;
		}
		.router-link-group {
			padding: 0;
			li {
				cursor: pointer;
				padding: 0.5rem 1rem;
				display: grid;
				overflow: hidden;
				border-left: 4px solid;
				grid-template-columns: min-content auto;
				transition: background-color 0.3s;
				i.icon {
					margin-top: 0.3rem;
					transition: all 0.2s ease-in-out;
				}
				p {
					min-width: 12rem;
					padding: 0;
					margin: 0;
					margin-left: 1.7rem;
					user-select: none;
					font-size: 1em;
				}
			}
		}
	}
	.collapsed {
		width: 4rem;
		.menu-toggler {
			padding-left: 0 !important;
			padding-right: 0 !important;
			.circle {
				border-radius: 0;
				width: 100%;
				padding-left: 1.1rem;
				transition-delay: 0.3s;
			}
		}
		.router-link-group {
			li {
				i.icon {
					font-size: 1.25em;
				}
			}
		}
	}
	.dark .sidebar {
		.router-link-group {
			li {
				border-color: #282828;
			}
			li:hover,
			.router-link-exact-active {
				background-color: #313131;
				border-color: #313131;
			}
		}
		.menu-toggler {
			.circle:hover {
				background-color: #313131;
			}
		}
	}
	.light .sidebar {
		.menu-toggler {
			.circle:hover {
				background-color: #e0e0e0;
			}
		}
		.router-link-group {
			li {
				border-color: white;
			}
			li:hover,
			.router-link-exact-active {
				border-color: #e0e0e0;
				background-color: #e0e0e0;
			}
		}
	}
</style>