<template>
	<div class="p-4 text-white-50">

		<simple-card :label='"Name"' :content="'Md. Rasel Khandkar'" class="mb-3"/>

		<button @click='pushError({title: "This is an error", message: "This is a sample error"})'>Push error</button>
		<custom-select :options="options" :theme="'dark'" :data='{}'/>
		<custom-select :options="options" :theme="'dark'" :type="'pill'"  :data='{}'/>
		<custom-select :options="options" :theme="'dark'" :border="'none'"  :data='{}'/>
		<custom-select :options="options" :theme="'dark'" :type="'pill'" :border="'none'" :data='{}'/>
		<custom-select :options="options" :theme="'dark'" :type="'pill'" :border="'none'"  :data='{}' :shadow="true"/>
		<custom-select :options="options" :theme="'d-19'" :data='{}'/>
		<custom-input :data='{}' :hint="'Enter your name'" :label='"Full Name"' :theme="'dark'" :message="'Name should not contain numeric character'"/>
		<custom-input :data='{}' :hint="'Enter your name'" :theme="'dark'"/>
		<custom-input :data='{}' :hint="'Enter your name'" :theme="'light'"/>
		<custom-input :data='{}' :hint="'Enter your name'" :theme="'light'" :type="'pill'"/>
		<custom-input :data='{}' :hint="'Enter your name'" :theme="'light'" :type="'pill'" :border="'none'" :shadow='true'/>

	</div>
</template>

<script>

	import CustomSelect from "../components/custom-forms/CustomSelect";
	import CustomInput from "../components/custom-forms/CustomInput";
	import SimpleCard from "../components/custom-cards/SimpleCard";

	import { mapMutations } from 'vuex'

	export default {
		name: "builder",
		components: {
			"custom-select": CustomSelect,
			"custom-input": CustomInput,
			"simple-card": SimpleCard,
		},
		data() {
			return {
				options: [
					{ value: "none", text: "Select an option" },
					{ value: "L1", text: "Level One L1" }
				]
			};
		},
		methods: {
			...mapMutations(['pushError']),
			onChange(e) {
				console.log(e);
			}
		}
	};
</script>