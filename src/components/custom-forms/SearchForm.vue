<template>
  <div class="search-form bgm p-3">
    <div class="text-center">
      <custom-select class="dib w-12r h-2r" :options="levelOptions" />
      <custom-select class="dib w-12r h-2r" :options="termOptions" />
      <custom-input class="dib w-12r h-2r" :theme="'dark'" :hint="'Course code'" />
      <button class="btn btn-sm btn-success">Search</button>
    </div>
  </div>
</template>

<script>
/** Components */
import CustomSelect from "../custom-forms/CustomSelect";
import CustomInput from "../custom-forms/CustomInput";

export default {
  name: "search-form",
  components: {
    "custom-select": CustomSelect,
    "custom-input": CustomInput
  },
  data() {
    return {
      levelOptions: [
        { value: "none", text: "Select Level" },
        { value: "L1", text: "L1 - First Year" },
        { value: "L2", text: "L2 - Second Year" },
        { value: "L3", text: "L3 - Third Year" },
        { value: "L4", text: "L4 - Fourth Year" }
      ],
      termOptions: [
        { value: "none", text: "Select Term" },
        { value: "T1", text: "Term 1" },
        { value: "T2", text: "Term 2" },
        { value: "T3", text: "Term 3" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.dib {
  display: inline-block;
}
.w-12r{
   width: 12rem;
}
.h-2r{
   height: 2rem;
}
</style>