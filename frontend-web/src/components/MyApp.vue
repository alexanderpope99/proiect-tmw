<template>
	<div>
		<MyNavbar @logout="logOut" :show-logout-button="Boolean(token)" />
		<b-container class="background">
			<div v-if="token">
				<MyCategories ref="myCategories" @update="refreshMyTable" :token="token" />
				<b-container>
					<b-row>
						<MyTable ref="myTable" @update="refreshMyCategories" :token="token" />
						<b-col>
							<h2>Grafic</h2>
							<MyGraph ref="myGraph" />
						</b-col>
					</b-row>
				</b-container>
			</div>
			<div v-else>
				<MyLogin class="justify-content-center d-flex" @login="login" />
			</div>
			<MyFooter class="footer" />
		</b-container>
	</div>
</template>

<script>
import MyNavbar from './MyNavbar.vue';
import MyCategories from './MyCategories.vue';
import MyTable from './MyTable.vue';
import MyGraph from './MyGraph.vue';
import MyFooter from './MyFooter.vue';
import MyLogin from './MyLogin.vue';

const getToken = require('../getToken');

export default {
	name: 'MyApp',
	components: {
		MyNavbar,
		MyCategories,
		MyTable,
		MyGraph,
		MyFooter,
		MyLogin,
	},

	data() {
		return {
			token: getToken(),
		}
	},

	methods: {
		login(token) {
			this.token = token;
		},
		logOut() {
			this.token = null;
		},
		refreshMyCategories() {
			this.$refs.myCategories.getCategories();
			this.$refs.myGraph.getCategories();
		},
		refreshMyTable() {
			this.$refs.myTable.getExpenses();
			this.$refs.myGraph.getCategories();
		},
	},
};
</script>

<style>
.background {
	background-color: #f5f7fb;
}

.footer {
	margin-top: 3em;
}
</style>