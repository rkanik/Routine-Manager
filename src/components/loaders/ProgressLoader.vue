<template>
	<div class="progress-loader bgm">
		<span></span>
	</div>
</template>
<script>
export default {
   name:'progress-loader'
}
</script>
<style lang="scss" scoped>
   .progress-loader {
        display: block;
        height: 2px;
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        span {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgb(37, 156, 146);
        }
    }
    .animate {
        span {
            display: block;
            width: 50%;
            animation: progress_anim 1.5s linear infinite;
        }
    }

@keyframes progress_anim {
    0% {
        width: 0%;
        left: 0;
    }
    50% {
        left: 0;
        width: 50%;
    }
    100% {
        width: 10%;
        left: 90%;
    }
}
</style>