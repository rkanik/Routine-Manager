<template>
  <div class="container table-view">
    <table>
      <thead>
        <tr class="bgAccent">
          <th class="text-light">Day/Time</th>
          <th class="text-light" v-for="(slot, index) in slots" :key="index">{{slot}}</th>
        </tr>
      </thead>
      <tbody class="tMedium">
        <tr v-for="(day, index) in routine" :key="index">
          <th class="days">{{aDays[index]}}</th>
          <td v-for="(rou, index) in day" :key="index">
            <p>{{rou.Course}}</p>
            <p>{{rou.Teacher}}</p>
            <p>{{rou.Room}}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableView",
  props: { routine: Object, slots: Array, aDays: Object }
};
</script>
<style lang="scss" scoped>
table {
  width: 100%;
  margin: 1rem 0;
  border-collapse: collapse;
  thead {
    th {
      padding: 0.4rem 0 0.4rem 1rem;
      font-size: 1em;
      font-weight: 500;
    }
  }
  tbody {
    td,
    th {
      padding: 0.6rem 0 0.6rem 1rem;
      p {
        margin: 0;
        font-weight: 400;
        font-size: 15px;
      }
    }
  }
}
</style>
