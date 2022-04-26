<template>
	<div>
		<b-modal title="Eroare" ref="my-modal">
			{{ errorMessage }}
		</b-modal>
		<b-card title="Login" style="width: 30rem;" class="text-center mt-5">
			<b-form>
				<b-form-group
					id="username"
					label="Username"
					label-for="username"
					class="mb-3"
				>
					<b-form-input
						id="username-input"
						v-model="username"
						type="text"
					>
					</b-form-input>
				</b-form-group>
				<b-form-group
					id="password"
					label="Password"
					label-for="password"
				>
					<b-form-input
						id="password-input"
						v-model="password"
						type="password"
					>
					</b-form-input>
					<b-button :disabled="!username || !password" @click="login" class="mt-3">Login
					</b-button>
				</b-form-group>
			</b-form>
		</b-card>
	</div>
</template>

<script>
import axios from 'axios';
import { server } from '../server-address';

export default {
	name: 'MyLogin',

	data() {
		return {
			username: '',
			password: '',
			show: false,
			errorMessage: '',
		}
	},

	methods: {
		async login() {
			await axios
				.post(`${server}/api/users/login`, {
					username: this.username,
					password: this.password,
				})
				.then((res) => {
					if (res.status !== 200) {
						this.errorMessage = res.data.message;
						this.$refs['my-modal'].show();
					} else {
						sessionStorage.setItem('token', res.data.token);
						this.$emit('login', res.data.token);
					}
				})
				.catch((error) => {
					this.errorMessage = error;
					this.$refs['my-modal'].show();
				});
		},
	},
};
</script>

<style>
</style>