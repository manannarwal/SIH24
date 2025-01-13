document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('#cards #card');
    const cardsContainer = document.getElementById('cards');

    function updateActiveCard() {
        let center = window.innerWidth / 2;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;

            if (Math.abs(center - cardCenter) < rect.width / 2) {
                cards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            }
        });
    }

    // Initial check
    updateActiveCard();

    // Update on scroll
    cardsContainer.addEventListener('scroll', updateActiveCard);
});
