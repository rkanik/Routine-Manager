<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
    <g transform="translate(-132 -52)">
        <g class="a" v-bind:class="{dark:data.color=='dark'}" transform="translate(150 52)">
            <rect class="b" width="16" height="16" rx="4" />
            <rect class="c" x="1.5" y="1.5" width="13" height="13" rx="2.5" />
        </g>
        <g class="a" v-bind:class="{dark:data.color=='dark'}" transform="translate(132 54)">
            <rect class="b" width="14" height="14" rx="4" />
            <rect class="c" x="1.5" y="1.5" width="11" height="11" rx="2.5" />
        </g>
        <g class="a" v-bind:class="{dark:data.color=='dark'}" transform="translate(150 72)">
            <rect class="b" width="14" height="14" rx="4" />
            <rect class="c" x="1.5" y="1.5" width="11" height="11" rx="2.5" />
        </g>
        <g class="a" v-bind:class="{dark:data.color=='dark'}" transform="translate(132 72)">
            <rect class="b" width="14" height="14" rx="4" />
            <rect class="c" x="1.5" y="1.5" width="11" height="11" rx="2.5" />
        </g>
    </g>
</svg>
</template>

<script>
export default {
    name:'SvgDashboard',
    props:{data:{}}
}
</script>

<style lang='scss' scoped>
.a,
.c {
  fill: none;
}
.a {
  stroke-linecap: round;
  stroke-linejoin: round;
  .b,.c{
      stroke:#e0e0e0;
      stroke-width: 1.5px;
  }
}
.dark{
    .b,.c{
        stroke:#424242 !important;
    }
}
</style>