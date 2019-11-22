<template>
	<label class="switch">
		<input type="checkbox" :checked="isChecked" @change="$emit('change',$event.target.checked)" />
		<span></span>
	</label>
</template>

<script>
	import { mapMutations, mapGetters } from "vuex";
	export default {
		name: "c-switch",
		props: { name: String, checked: Boolean },
		data() {
			return {
				isChecked: this.checked || false
			};
		}
	};
</script>

<style lang="scss" scoped>
	.switch {
		cursor: pointer;
		margin-bottom: 0;
		input {
			display: none;
			& + span {
				width: 4rem;
				height: 1.5rem;
				border-radius: 14px;
				transition: all 0.3s ease;
				display: block;
				position: relative;
				&:before,
				&:after {
					content: "";
					display: block;
					position: absolute;
					transition: all 0.3s ease;
				}
				&:before {
					top: 4px;
					left: 4px;
					width: 1rem;
					height: 1rem;
					border-radius: 9px;
				}
				&:after {
					top: 4px;
					left: 2.9rem;
					width: 6px;
					height: 1rem;
					border-radius: 40%;
					transform-origin: 50% 50%;
					opacity: 0;
				}
				&:active {
					transform: scale(0.92);
				}
			}
			&:checked {
				& + span {
					&:before {
						width: 0px;
						border-radius: 3px;
						margin-left: 2.6rem;
						border-width: 4px;
					}
					&:after {
						animation: blobChecked 0.35s linear forwards 0.2s;
					}
				}
			}
			&:not(:checked) {
				& + span {
					&:before {
						animation: blob 0.85s linear forwards 0.2s;
					}
				}
			}
		}
	}

	.dark .switch input {
		& + span {
			background-color: #202020;
			&:before {
				border: 4px solid #bdbdbd;
			}
			&:after {
				background: #bdbdbd;
			}
		}
	}

	.light .switch input {
		& + span {
			background-color: #bdbdbd;
			&:before {
				border: 4px solid #fff;
			}
			&:after {
				background: #fff;
			}
		}
	}

	.teal .switch input {
		&:checked {
			& + span {
				background: teal;
			}
		}
	}

	@keyframes blob {
		0%,
		100% {
			transform: scale(1);
		}
		30% {
			transform: scale(1.12, 0.94);
		}
		60% {
			transform: scale(0.96, 1.06);
		}
	}

	@keyframes blobChecked {
		0% {
			opacity: 1;
			transform: scaleX(1);
		}
		30% {
			transform: scaleX(1.44);
		}
		70% {
			transform: scaleX(1.18);
		}
		50%,
		99% {
			transform: scaleX(1);
			opacity: 1;
		}
		100% {
			transform: scaleX(1);
			opacity: 0;
		}
	}
</style>