<template>
	<div class="table-view mx-4">
		<table>
			<thead v-if="routine">
				<tr class="bga text-white">
					<th>Day/Time</th>
					<th v-for="(slot, index) in slots" :key="index">{{slot}}</th>
				</tr>
			</thead>
			<tbody class="tm">
				<tr v-for="(day, index) in routine" :key="index">
					<th class="days">{{index}}</th>
					<td v-for="(rou, index) in day" :key="index">
						<p>{{rou.course}}</p>
						<p>{{rou.teacher}}</p>
						<p>{{rou.room}}</p>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		name: "table-view",
		props: ["routine", "slots", "aDays"]
	};
</script>
<style lang='scss' scoped>
	table {
		width: 100%;
		margin: 1rem 0;
		border-collapse: collapse;
	}
	table thead th {
		padding: 0.4rem 0 0.4rem 1rem;
		font-size: 1em;
		font-weight: 400;
		border-right: 1px solid;
	}
	table tbody td,
	table tbody th {
		padding: 0.6rem 0 0.6rem 1rem;
	}
	table tbody td p,
	table tbody th p {
		margin: 0;
		font-size: 15px;
	}

	.dark .table-view {
		thead {
			th {
				border-color: #424242;
			}
		}
		tbody {
			tr {
				background-color: #252525;
			}
			.days {
				background-color: #282828;
				border: 1px solid #313131;
			}
			td {
				border: 1px solid #303030;
				color: #bdbdbd;
			}
		}
	}

	.light .table-view {
      thead {
         th {
            border-right: 1px solid #ffffff;
         }
      }
      tbody {
         tr {
            background-color: white;
         }
         td,
         th {
            border: 1px solid #e0e0e0;
         }
      }
   }
</style>
