<template>
  <div class="tab-switcher">
    <div
      class="tab-con mr-2"
      v-for="(day, index) in rsDays"
      :key="index"
      :class="{active:day==aDay}"
      @click="onSelectedTab(day)"
    >
      <p class="mb-1 float-left text-secondary">{{assocDays[day]}}</p>
      <div class="ac-line"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "tab-switcher",
  props: {
    assocDays: Object,
    rsDays: Array,
    aDay: String
  },
  methods: {
    ...mapMutations(["onSelectedTab"])
  }
};
</script>

<style lang="scss">
.tab-switcher {
  padding: 1em 2rem;
  text-align: center;
  .tab-con {
    display: inline-block;
    position: relative;
    p {
      cursor: pointer;
    }
    .ac-line {
      height: 2px;
      width: 0;
      border-radius: 1rem;
      background-color: teal;
      position: absolute;
      bottom: 0;
      left: calc(50% - 1rem);
    }
  }
  .active {
    p {
      color: teal !important;
    }
    .ac-line {
      width: 2rem;
      animation: "ac-line" 0.5s ease-in-out;
    }
  }
}
@keyframes ac-line {
  from {
    width: 0;
  }
  to {
    width: 2rem;
  }
}
</style>