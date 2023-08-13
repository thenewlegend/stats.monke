<script>
	import Nav from "./Nav.svelte";
	import Top from "./Top.svelte";
</script>

<div class="top">
	<Top/>
</div>

<div class="container-b">
	<div class="nav">
	<Nav/>
	</div>

	<div class="main">
		<slot />
	</div>
</div>


<style>
	.container-b{
		display: flex;
	}
</style>
