<script>
    import {updatePrice} from '$lib/dataman';
    import { onMount } from 'svelte';

     onMount(async () => {

        const interval = 10000
        const intervalId = setInterval(async () => {
            updatePrice();
        }, interval);

        return () => clearInterval(intervalId); // Clear interval on component unmount
    });
</script>

<div class="container">
    <div class="left">
    <img src="/advanced.png" alt="logo" style="height: 100px;">
    </div>

    <div class="mid">
        <h1>Monke Stats</h1>
    <span>1 BANANA ⇋ </span><span id="price"></span>
    </div>

    <div class="right">
        <button id="login">Login</button>
    </div>
</div>


<style>
    .container{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 150px;
        user-select: none;
    }


    #login {
    transition: background-color 0.5s, transform 0.2s;
    color: black !important;
    height: 2.75rem;
    text-transform: uppercase;
    border-width: 2px !important;
    border-radius: 3rem !important;
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
    font-weight: 400 !important;
    }

    #login:hover {
        background-color: #f2bd1d;
        cursor: not-allowed ;
    }

</style>