// API endpoint
const apiLink = 'https://quotes-api-self.vercel.app/quote';

// Elements
const refreshBtn = document.getElementById('refresh-button');
const favoriteBtn = document.getElementById('favorite-button');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const favoritesList = document.getElementById('favorites-list');

// Fetch and display a quote
async function fetchQuote() {
  try {
    const response = await fetch(apiLink);
    const data = await response.json();

    quoteText.innerText = `"${data.quote}"`;
    authorText.innerText = `- ${data.author}, ${data.work || ''} (${data.year || ''})`;
    authorText.dataset.authorName = data.author;
    authorText.dataset.work = data.work || '';
    authorText.dataset.year = data.year || '';
  } catch (err) {
    quoteText.innerText = "Erreur de chargement de la citation.";
    authorText.innerText = "";
    console.error("Quote fetch error:", err);
  }
}

// Save quote to localStorage
favoriteBtn.addEventListener('click', () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const work = authorText.dataset.work;
  const year = authorText.dataset.year;

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push({ quote, author, work, year });
  localStorage.setItem('favorites', JSON.stringify(favorites));

  alert('Citation ajoutée aux favoris !');
  renderFavorites();
});

// Open Wikipedia bio on author click
authorText.addEventListener('click', () => {
  const authorName = authorText.dataset.authorName;
  const wikiUrl = `https://fr.wikipedia.org/wiki/${encodeURIComponent(authorName)}`;
  window.open(wikiUrl, '_blank');
});

// Render saved favorites
function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favoritesList.innerHTML = '';

  favorites.forEach(({ quote, author }) => {
    const p = document.createElement('p');
    p.classList.add('border', 'border-gray-300', 'p-3', 'rounded', 'bg-white', 'shadow');
    p.innerHTML = `<strong>${quote}</strong><br><em>${author}</em>`;
    favoritesList.appendChild(p);
  });
}

// Refresh quote on button click
refreshBtn.addEventListener('click', fetchQuote);

// Initial load
fetchQuote();
renderFavorites();
