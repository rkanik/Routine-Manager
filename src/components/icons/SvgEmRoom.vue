<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37">
    <g transform="translate(-315 -52)">
      <g class="a" v-bind:class="{dark:data.color=='dark'}" transform="translate(319 56)">
        <rect class="d" width="29" height="29" />
        <rect class="e" x="-2" y="-2" width="33" height="33" />
      </g>
      <g class="b" v-bind:class="{dark:data.color=='dark'}" transform="translate(323 60)">
        <rect class="d" width="11" height="11" />
        <rect class="e" x="1" y="1" width="9" height="9" />
      </g>
      <line class="c" v-bind:class="{dark:data.color=='dark'}" x2="7" transform="translate(337.5 62.5)" />
      <line class="c" v-bind:class="{dark:data.color=='dark'}" x2="7" transform="translate(337.5 68.5)" />
      <line class="c" v-bind:class="{dark:data.color=='dark'}" x2="22" transform="translate(322.5 74.5)" />
      <line class="c" v-bind:class="{dark:data.color=='dark'}" x2="22" transform="translate(322.5 80.5)" />
    </g>
  </svg>
</template>

<script>
export default {
  name: "SvgToggler",
  props: { data: {} }
};
</script>

<style>
.a,
.b,
.c,
.e {
  fill: none;
}
.a,
.b,
.c {
  stroke: #fff;
  stroke-linecap: round;
}
.a,
.b {
  stroke-linejoin: round;
}
.a {
  stroke-width: 4px;
}
.b,
.c {
  stroke-width: 2px;
}
.d {
  stroke: none;
}
.dark {
  stroke: #424242;
}
</style>