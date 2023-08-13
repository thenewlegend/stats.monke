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

	.main{
        max-height: 80vh;
        overflow: auto;
        padding: 20px;
        box-sizing: border-box;
		scrollbar-width: thin; /* For Firefox */
        scrollbar-color: #f2bd1d #e3e3e3; /* For Firefox */
        scrollbar-width: thin;
        scrollbar-color: #f2bd1d transparent;
	}
</style>
