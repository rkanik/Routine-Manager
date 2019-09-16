<template>
  <div class="search-form">
    <div class="container">
      <div class="form top-form text-center">
        <div class="form-group">
          <div class="arrow_down rounded">
            <img src="../../assets/svg/arrow_down.svg" />
          </div>
          <select class="form-control level" v-model="formData.level">
            <option value="none">Select Level</option>
            <option value="L1">L1 - First Year</option>
            <option value="L2">L2 - Second Year</option>
            <option value="L3">L3 - Third Year</option>
            <option value="L4">L4 - Fourth Year</option>
          </select>
        </div>
        <div class="form-group">
          <div class="arrow_down rounded">
            <img src="../../assets/svg/arrow_down.svg" />
          </div>
          <select class="form-control term" v-model="formData.term">
            <option value="none">Select Term</option>
            <option value="T1">Term - 1</option>
            <option value="T2">Term - 2</option>
            <option value="T3">Term - 3</option>
          </select>
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control section"
            placeholder="Section"
            v-model="formData.section"
          />
        </div>
        <div class="form-group">
          <button
            type="button"
            class="btn btn-outline-secondary btn-go sa"
            @click="onClickSearch(formData)"
          >Search</button>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="more-option" :class="{expanded:sfExpanded=='Collapse'}">
        <div class="form">
          <div class="form-group">
            <input
              v-model="advFData.code"
              type="text"
              class="form-control cc"
              placeholder="Course code"
            />
          </div>
          <div class="form-group">
            <input
              v-model="advFData.section"
              type="text"
              class="form-control se"
              placeholder="Section"
            />
          </div>
          <div class="form-group">
            <button @click="onClickAdvFSeacrch(advFData)" class="sa btn btn-outline-dark">Search</button>
          </div>
          <p class="small text-secondary">For retake section enter R1, R2, R3 like this</p>
        </div>
      </div>
      <div class="more text-center overflow-hidden">
        <p
          class="more-ad mb-2 small text-secondary"
          @click="onClickSFormExpand"
          :class="{active:sfExpanded=='Collapse'}"
        >{{sfExpanded}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "SearchForm",
  props: {},
  data() {
    return {
      /** Booleans */
      lightTheme: false,

      /** Objects */
      formData: { level: "none", term: "none", section: "" },
      advFData: { code: "", section: "" }

      /** Arrays */

      /** Strings */
    };
  },
  created() {},
  methods: {
    ...mapMutations([
      "onClickSearch",
      "onClickSFormExpand",
      "onClickAdvFSeacrch"
    ])
  },
  computed: {
    ...mapGetters(["viewType", "sfExpanded"])
  }
};
</script>
<style lang="scss" scoped>
.search-form {
  padding-top: 1rem;
  background-color: #191919;
  .form {
    .form-control {
      background-color: transparent;
      border-color: #313131;
      color: #bdbdbd;
    }
    .sa {
      border-left: none;
      color: #bdbdbd;
      border-color: #313131;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .top-form {
    .form-group {
      position: relative;
      display: inline-block;
      .form-control {
        float: left;
        option {
          background-color: #191919;
        }
      }
      .level,.term{
        width: 14rem;
      }
      .term,.section{
          border-left: none;
          border-radius: 0;
      }
      .section{
          width: 10rem;
      }
    }
    .btn-go {
      width: 100%;float: left;
      border-color: #313131;
    }
  }
}
.arrow_down {
  position: absolute;
  right: 0;
  width: 2.3rem;
  height: 100%;
  pointer-events: none;
  padding-top: 0.25rem;
  border: 1px solid #313131;
  border-left: none;
  background-color: #191919;
  border-radius: 0 !important;
  img {
    width: 0.8rem;
  }
}

.more {
  .more-ad {
    cursor: pointer;
    user-select: none;
    display: inline-block;
    padding: 0.1rem 1rem;
    transition: border-color, color 0.2s ease-in-out;
    border-radius: 1rem;
    border: 1px solid rgba(0, 0, 0, 0);
  }
  .more-ad:hover,
  .active {
    color: #bdbdbd !important;
    border-color: #5c5c5c;
  }
}

.more-option {
  max-height: 0;
  overflow: hidden;
  text-align: center;
  transition: max-height 0.3s ease-in-out;
  .form {
    display: inline-block;
    .form-group {
      float: left;
    }
    .cc {
      width: 10rem;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .se {
      width: 6rem;
      border-left: none;
      border-radius: 0;
    }
  }
}
.expanded {
  height: auto;
  max-height: 6rem;
}

@media (max-width: 576px) {
  .search-form {
    .col-md-4,
    .col-md-2 {
      max-width: 50%;
    }
    .col-md-4:first-child,
    .col-sec {
      padding-right: 0;
    }
  }
}
</style>

