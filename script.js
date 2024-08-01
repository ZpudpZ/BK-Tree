// Crear una instancia de BKTree
const bktree = new BKTree();

// Cargar palabras en el BKTree
dictionary.forEach(word => bktree.insert(word));

// Función para mostrar sugerencias
function showSuggestions(results) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = result;
        li.classList.add('list-group-item');
        suggestions.appendChild(li);
    });
}

// Función para manejar la entrada del usuario
document.getElementById('searchInput').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query) {
        const maxDistance = 2; // Distancia máxima para considerar palabras similares
        const results = bktree.search(query, maxDistance);
        showSuggestions(results);
    } else {
        showSuggestions([]);
    }
});
