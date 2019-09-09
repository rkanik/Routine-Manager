<template>
  <div class="card-bar container">
    <div class="bar-con">
      <div class="line">
        <div
          class="days"
          v-for="(day, i) in shortDays"
          :key="i"
          :class="day"
          @click="onSelectedCardBar(day)"
        >
          <p>{{day[0]}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "card-bar",
  props: {
    aDay: String
  },
  data() {
    return {
      active: this.aDay
    };
  },
  created() {
    setTimeout(() => {
      let doc = document.getElementsByClassName(this.active)[0];
      doc.classList.add("active");
      doc.firstChild.innerText = this.active;
    }, 200);
  },
  methods: {
    ...mapMutations(["onSelectedCardBar"])
  },
  computed: {
    ...mapGetters(["shortDays"])
  }
};
</script>

<style lang="scss" scoped >
.card-bar {
  .bar-con {
    position: relative;
    padding: 1rem 0;
  }
  .line {
    border: 1px solid white;
    margin: 0 auto;position: relative;
    width: 50%;height: 0.2rem;
    border-radius: 2rem;background-color: #212121;
    .days {
        position: absolute;
        top: 0;height: 2rem;width: 2rem;
        cursor: pointer;border-radius: 50%;
        background-color: #313131;
        transition: transform 0.3s ease-in-out;
        display: flex;
        flex-direction: row;
        justify-content: center;
        justify-items: center;
        p {
        font-size: 0.9em;
        margin: 0;
        padding: 0;
        line-height: 2.2;
        color: #bdbdbd;
        }
    }
  }
  
  .Sat {
    left: 1%;
  }
  .Sun {
    left: 16%;
  }
  .Mon {
    left: 32%;
  }
  .Tue {
    left: 50%;
  }
  .Wed {
    right: 32%;
  }
  .Thu {
    right: 16%;
  }
  .Fri {
    right: 1%;
  }
  .days:hover,
  .active {
    transform: scale(1.5);
  }
  .active {
    background-color: teal;
    font-size: 0.9em;
    p {
      color: white;
    }
  }
  .disabled {
    background-color: #ff5252;
    p {
      color: white;
    }
  }
}
</style>