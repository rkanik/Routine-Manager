<template>
  <div>
    <span class="bgRed"></span>
    <span class="bgPink"></span>
    <span class="bgBlue"></span>
    <span class="bgCyan"></span>
    <span class="bgTeal"></span>
    <span class="bgGreen"></span>
    <span class="bgOrange"></span>
  </div>
</template>
<style lang="scss" scoped>
  span{
    display: inline-block;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
    margin-left: 0.2rem;
    border-radius: 50%;
    background-color: #fff;
  }
  .bgRed{
    background-color: #f44336
  }
  .bgPink{
    background-color: #e91e63
  }
  .bgBlue{
    background-color: #2196f3
  }
  .bgCyan{
    background-color: #00acc1
  }
  .bgTeal{
    background-color: #009688
  }
  .bgGreen{
    background-color: #8bc34a
  }
  .bgOrange{
    background-color: #ff9800
  }
</style>