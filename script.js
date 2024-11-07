document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game');
    const player = document.getElementById('player');
    const gameWidth = gameArea.clientWidth;
    const gameHeight = gameArea.clientHeight;
    const playerSize = player.clientWidth;
    let playerX = player.offsetLeft;
    let playerY = player.offsetTop;

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                if (playerX > 0) playerX -= 40;
                break;
            case 'ArrowRight':
                if (playerX < gameWidth - playerSize) playerX += 40;
                break;
        }
        player.style.top = `${playerY}px`;
        player.style.left = `${playerX}px`;
    });

    function createObstacle() {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.left = `${Math.floor(Math.random() * (gameWidth - 60))}px`;
        gameArea.appendChild(obstacle);

        let obstacleY = 0;
        const obstacleInterval = setInterval(() => {
            obstacleY += 2;
            obstacle.style.top = `${obstacleY}px`;

            if (obstacleY > gameHeight) {
                clearInterval(obstacleInterval);
                gameArea.removeChild(obstacle);
            }

            if (checkCollision(player, obstacle)) {
                alert('Game Over!');
                clearInterval(obstacleInterval);
                location.reload();
            }
        }, 20);
    }

    function checkCollision(player, obstacle) {
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        return !(
            playerRect.top > obstacleRect.bottom ||
            playerRect.bottom < obstacleRect.top ||
            playerRect.left > obstacleRect.right ||
            playerRect.right < obstacleRect.left
        );
    }

    setInterval(createObstacle, 2000);

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});