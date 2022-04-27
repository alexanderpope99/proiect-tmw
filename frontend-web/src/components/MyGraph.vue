<template>
	<div>
		<PieChart
			v-if="sum"
			:chartData="{
				labels: labels,
        datasets: [
          {
            backgroundColor: backgroundColor,
            data: chartData
          }
        ]}"
		/>
		<div v-else>Nu există categorii sau sunt nule</div>
	</div>
</template>

<script>
import PieChart from './PieChart';
import axios from 'axios';
import { server } from '../server-address';

export default {
	name: 'MyGraph',
	components: { PieChart },

	data() {
		return {
			data: [],
			sum: null,
			labels: [],
			backgroundColor: [],
			chartData: [],
		}
	},

	async mounted() {
		await this.getCategories();
	},

	methods: {
		async getCategories() {
			let data = [];
			this.labels = [];
			this.backgroundColor = [];
			this.chartData = [];
			data = await axios
				.get(`${server}/api/categories`)
				.then(function (res) {
					return res.data;
				})
				.catch(function (error) {
					console.log(error);
				});
			if (data) {
				let sum = 0;
				for (let val of data) {
					sum += val.expensesSum;
					this.labels.push(val.name);
					this.backgroundColor.push(val.color);
					this.chartData.push(val.expensesSum ? val.expensesSum : null);
				}
				this.sum = sum;
			}
		},
	},
};
</script>

<style>
</style>