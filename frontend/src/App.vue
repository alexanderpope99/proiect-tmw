<template>
  <div id="app">
    <MyApp />
  </div>
</template>

<script>
import MyApp from './components/MyApp.vue'

export default {
  name: 'App',
  components: {
    MyApp
  }
}
</script>

<style>
#app {
	margin: 0;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
	'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
	sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
