<template>
  <div class="teacher p-4 pt-0 bgMedium">
    <div class="container">
      <form class="form">
        <div class="input-group">
          <input
            type="text"
            class="form-control bgTranspatent br"
            placeholder="Teacher's name or initial"
            aria-describedby="button-addon2"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              @click="InitTeacherRoutine(searchedKey)"
              type="button"
              id="button-addon2"
            >Search</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
  .teacher{
    .input-group{
      width: 24rem;
      margin: 0 auto;
    }
  }
</style>