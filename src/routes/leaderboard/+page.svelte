<p>Click on image to view each leaderboard</p>
    <div class="container">
        <div class="spcl rank">
            <a href="./leaderboard/specialgrades">
                <img src="./specialgrade.png" alt="Special Grade">
            </a>
            <span>Special Grade</span>
        </div>
        <div class="lgd rank">
            <a href="./leaderboard/legends">
                <img src="./legend.png" alt="Legend">
            </a>
            <span>Legend</span>
        </div>
        <div class="exp rank">
            <a href="./leaderboard/experts">
                <img src="./expert.png" alt="Expert">
            </a>
            <span>Expert</span>
        </div>
        <div class="adv rank">
            <a href="./leaderboard/advanced">
                <img src="./advanced.png" alt="Advanced">
            </a>
            <span>Advanced</span>
        </div>
        <div class="inter rank">
            <a href="./leaderboard/intermediates">
                <img src="./intermediate.png" alt="Intermediate">
            </a>
            <span>Intermediate</span>
        </div>
        <div class="begin rank">
            <a href="./leaderboard/beginners">
                <img src="./beginner.png" alt="Beginner">
            </a>
            <span>Beginner</span>
        </div>    
    </div>

<style>

    .container {
        font-family: Arial, sans-serif;
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        justify-content: center;
        user-select: none;
    }

    .rank {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        border-radius: 10px;
        padding: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        
    }

    .rank img:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .rank:hover {
        transform: scale(1.001);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .rank img {
        width: 8rem;
        border-radius: 50%;
        margin-bottom: 1rem;
        cursor: pointer;
    }

    .rank span {
        font-size: 1rem;
        color: #555;
    }
</style>