<template>
	<div class="overview bgm">
		<div class="row m-0 px-2 py-2">
			<simple-card :theme="theme" :label="'Name'" :content="studentName" class="col mx-2 mb-2" />
			<simple-card
				v-if="studentEmail!=''"
				:theme="theme"
				:label="'Email'"
				:content="studentEmail"
				class="col mx-2 mb-2"
			/>
			<simple-card
				:theme="theme"
				:label="'Semester'"
				:content="`
					Level ${studentLevel.split('L')[1]} • 
					Term ${studentTerm.split('T')[1]} • 
					Section ${studentSection}`"
				class="col mx-2 mb-2"
			/>
			<simple-card
				:theme="theme"
				:label="'Overview'"
				:content="`
					Class ${noOfDays} days • 
					${noOfCourses} courses`"
				class="col mx-2 mb-2"
			/>
		</div>
	</div>
</template>

<script>
	import SimpleCard from "../custom-cards/SimpleCard";
	import { mapGetters } from "vuex";
	export default {
		name: "overview",
		props: ["theme"],
		components: {
			"simple-card": SimpleCard
		},
		computed: {
			...mapGetters("users", [
				"studentName",
				"studentEmail",
				"studentLevel",
				"studentTerm",
				"studentSection",
				"noOfCourses",
				"noOfDays"
			])
		}
	};
</script>