<template>
	<b-navbar
		:sticky="true"
		fixed="top"
		variant="primary"
		type="dark"
		class="justify-content-center"
	>
		<b-navbar-brand>Expense Tracker</b-navbar-brand>
		<b-navbar-nav v-if="showLogoutButton" class="ml-auto" style="float:right">
			<b-nav-form>
				<b-button size="sm" class="my-2 my-sm-0" @click="logout">Log Out</b-button>
			</b-nav-form>
		</b-navbar-nav>
	</b-navbar>
</template>

<script>
export default {
	name: 'MyNavbar',
	props: {
		showLogoutButton: {
			type: Boolean,
		},
	},

	methods: {
		logout() {
			sessionStorage.removeItem('token');
			this.$emit('logout');
		},
	},
};
</script>

<style>
</style>