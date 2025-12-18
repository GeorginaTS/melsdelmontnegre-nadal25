document.addEventListener('DOMContentLoaded', () => {
    const stackContainer = document.getElementById('photo-stack');
    const controls = document.getElementById('controls');
    const replayBtn = document.getElementById('replay-btn');
    let photosData = [];

    // Fetch data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            photosData = data;
            startAnimation();
        })
        .catch(error => console.error('Error loading data:', error));

    function createPhotoCard(data, index) {
        const card = document.createElement('figure'); // Semantic: figure for image with caption
        card.className = 'photo-card';
        card.style.zIndex = index + 1; // Ensure order

        const img = document.createElement('img');
        img.src = data.image;
        img.alt = data.title;

        const info = document.createElement('figcaption'); // Semantic: figcaption for the text info
        info.className = 'photo-info';

        const month = document.createElement('p'); // Semantic: p for text
        month.className = 'photo-month';
        month.textContent = data.month;

        const title = document.createElement('h2'); // Semantic: h2 for title (already done)
        title.className = 'photo-title';
        title.textContent = data.title;

        const text = document.createElement('p'); // Semantic: p for text
        text.className = 'photo-text';
        text.textContent = data.text;

        info.appendChild(month);
        info.appendChild(title);
        info.appendChild(text);

        card.appendChild(img);
        card.appendChild(info);

        return card;
    }

    function startAnimation() {
        stackContainer.innerHTML = ''; // Clear existing
        controls.classList.remove('visible');

        photosData.forEach((data, index) => {
            const card = createPhotoCard(data, index);
            stackContainer.appendChild(card);

            // Delay for each card
            setTimeout(() => {
                // Random rotation between -15 and 15 degrees, avoiding 0
                let rotation = Math.random() * 30 - 15;
                if (Math.abs(rotation) < 5) rotation = rotation < 0 ? -5 : 5; // Ensure at least 5deg tilt

                // Random translation between -20 and 20 px
                const xOffset = Math.random() * 10 - 5; // Reduced offset for tight fit
                const yOffset = Math.random() * 20 - 10;

                card.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px)) rotate(${rotation}deg)`;
                card.classList.add('dropped');

                // If it's the last one, show controls
                if (index === photosData.length - 1) {
                    setTimeout(() => {
                        controls.classList.add('visible');
                    }, 1000);
                }
            }, (index + 0.5) * 4000); // Start first card after 2s, then 4s interval
        });
    }

    replayBtn.addEventListener('click', () => {
        startAnimation();
    });
});
