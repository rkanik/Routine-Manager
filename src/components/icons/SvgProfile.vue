<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="34.5" height="38.75" viewBox="0 0 34.5 38.75">
    <g transform="translate(-41.25 -49)">
      <path
        class="a"
        v-bind:class="{dark:data.color=='dark'}"
        d="M10,0H21A10,10,0,0,1,31,10v5a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V10A10,10,0,0,1,10,0Z"
        transform="translate(43 71)"
      />
      <g class="b" transform="translate(50 49)">
        <circle class="c" v-bind:class="{dark:data.color=='dark'}" cx="9" cy="9" r="9" />
        <circle class="d" v-bind:class="{dark:data.color=='dark'}" cx="9" cy="9" r="7.25" />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "SvgProfile",
  props: { data: {} }
};
</script>

<style scoped >
.a,
.b,
.d {
  fill: none;
}
.dark {
  stroke: #424242 !important;
}
.c,.d {
  stroke: #e0e0e0;
  stroke-width: 1.5px;
}
</style>