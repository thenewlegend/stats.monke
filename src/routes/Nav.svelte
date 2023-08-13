<nav>
    <a href="/" class="nav-link">HOME</a>
    <a href="/kdgallery" class="nav-link">KD Gallery</a>
    <a href="/kdgallery" class="nav-link">Scared Monkeys</a>
    <a href="/kdgallery" class="nav-link">Feed the DAMN Monke</a>
    <a href="/kdgallery" class="nav-link">Hall of Shame</a>
</nav>

<style>
    nav {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .nav-link {
        display: block;
        text-align: right;
        padding: 10px 20px;
        margin: 10px 0;
        color: rgb(0, 0, 0);
        text-decoration: none;
        font-size: 16px;
        transition: background-color 0.3s, transform 0.2s;
        background-color: #e3e3e336;
    }

    .nav-link.active {
        background-color: #f2bd1d;
        transform: translateX(-5px);
        border-radius: 8px;
    }
</style>

<script>
    import { onMount } from 'svelte';

    onMount(() => {
        const navLinks = document.querySelectorAll('.nav-link');
		const currentDomain = window.location.pathname;

        navLinks.forEach(link => {

			if (link.getAttribute('href') === currentDomain) {
                link.classList.add('active');
			}

            link.addEventListener('click', function (event) {
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });
</script>

<h1 class="nav-link active" style="visibility:hidden">-</h1>
