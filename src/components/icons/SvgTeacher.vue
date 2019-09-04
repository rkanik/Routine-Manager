<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="34.5" height="41.75" viewBox="0 0 34.5 41.75">
    <g transform="translate(-227.25 -46)">
      <path
        class="a" v-bind:class="{dark:data.color=='dark'}"
        d="M10,0H21A10,10,0,0,1,31,10v7a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V10A10,10,0,0,1,10,0Z"
        transform="translate(229 69)"
      />
      <g class="b" v-bind:class="{dark:data.color=='dark'}" transform="translate(235 46)">
        <ellipse class="e" cx="9.5" cy="10" rx="9.5" ry="10" />
        <ellipse class="f" cx="9.5" cy="10" rx="8" ry="8.5" />
      </g>
      <g class="c" transform="translate(250.163 82.817) rotate(180)">
        <path class="e" d="M5.853,0l5.99,14.161H0Z" />
        <path
          class="g" v-bind:class="{dark:data.color=='dark'}"
          d="M 5.868703842163086 3.888302803039551 L 2.243035316467285 12.66056156158447 L 9.579154968261719 12.66056156158447 L 5.868703842163086 3.888302803039551 M 5.852709293365479 1.9073486328125e-06 L 11.8422794342041 14.16056156158447 L -9.5367431640625e-07 14.16056156158447 L 5.852709293365479 1.9073486328125e-06 Z"
        />
      </g>
      <path
        class="d" v-bind:class="{dark:data.color=='dark'}"
        d="M-47.963,60.52l4.06,4.06-3.137.369,1.292,3.045-6.939,4.626"
        transform="translate(296.609 9.601)"
      />
      <path
        class="d" v-bind:class="{dark:data.color=='dark'}"
        d="M-48.321,60.52l-4.06,4.06,3.137.369-1.292,3.045,7.313,4.6"
        transform="translate(287.926 9.601)"
      />
    </g>
  </svg>
</template>

<script>
export default {
  name: "SvgTeacher",
  props: { data: {} }
};
</script>

<style scoped >
.a,
.b,
.c,
.d,
.f {
  fill: none;
}
.a,
.b,
.d {
  stroke:#e0e0e0;
}
.a {
  stroke-linecap: square;
  stroke-linejoin: round;
  stroke-width: 3.5px;
}
.b {
  stroke-width: 3px;
}
.d {
  stroke-width: 1.5px;
}
.e,
.g {
  stroke: none;
}
.g {
  fill: #e0e0e0;
}

.dark {
  stroke: #424242 !important;
}
.dark.g{
    fill: #424242 !important;
}

</style>