
<template>
  <div class="errors">
    <div class="inner rounded" v-for="(item, index) in errors" :key="index">
      <div class="content">
        <p class="lead mb-0">{{item.title}}</p>
        <p class="small mb-1">{{item.message}}</p>
      </div>
      <!-- <i class="fal fa-times c-toggler" @click="deleteError({item,time:'inst'})"></i> -->
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "errors",
  props: ["errors"],
  methods: {
    ...mapMutations(["deleteError"])
  }
};
</script>

<style lang="scss" scoped>
.errors {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  max-width: 20rem;
  z-index: 13;
  .inner {
    margin-top: 0.4rem;
    padding: 0.3rem 1rem;
    padding-right: 3rem;
    background-color: #f44336;
    color: white;
    overflow: hidden;
    position: relative;
    .content {
      .lead {
        font-size: 1em;
      }
      .small {
        font-size: 0.8em;
      }
    }
    .c-toggler {
      position: absolute;
      top: 0.5rem;right: 0.5rem;
      height: 0.8rem;
      cursor: pointer;
    }
  }
}
</style>