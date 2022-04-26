import { Doughnut } from 'vue-chartjs'

export default {
	extends: Doughnut,
	props: {
		chartData: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			options: {
				responsive: true,
				maintainAspectRatio: false,
			},
		}
	},
	mounted() {
		this.renderChart(this.chartData, this.options);
	},
	watch: {
		chartData: function () {
			this.renderChart(this.chartData, this.options);
		},
	},
}