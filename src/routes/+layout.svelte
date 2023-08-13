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

	.container-b {
		display: flex;
		justify-content: space-between; /* Distributes items evenly along the main axis */
		align-items: flex-start; /* Align items at the start of the cross axis */
	}

	.main {
		overflow: auto;
		padding: 20px;
		box-sizing: border-box;
		scrollbar-width: thin;
		scrollbar-color: #f2bd1d transparent;
		/* Add any other styling you need */
	}
</style>
