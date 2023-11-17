document.addEventListener('DOMContentLoaded', function () {
    // Asegúrate de que todos los id's coincidan con tu HTML
    const toggleBurgerAll = document.getElementById('toggleBurgerAll');
    const toggleFries = document.getElementById('toggleFries');
    const toggleFriesAll = document.getElementById('toggleFriesAll');
    const burgerStyle = document.getElementById('burgerStyle');
    const ingredientListDisplay = document.getElementById('ingredientListDisplay');

    toggleBurgerAll.addEventListener('change', function () {
        // Asume que todos los ingredientes de hamburguesa tienen la clase 'burger-ingredient-checkbox'
        document.querySelectorAll('.burger-ingredient-checkbox').forEach(checkbox => {
            checkbox.checked = this.checked;
            checkbox.disabled = this.checked;
        });
    });

    toggleFries.addEventListener('change', function () {
        document.getElementById('friesOptions').style.display = this.checked ? 'block' : 'none';
    });

    toggleFriesAll.addEventListener('change', function () {
        // Asume que todos los ingredientes de hamburguesa tienen la clase 'burger-ingredient-checkbox'
        document.querySelectorAll('.papas-ingredient-checkbox').forEach(checkbox => {
            checkbox.checked = this.checked;
            checkbox.disabled = this.checked;
        });
    });

    burgerStyle.addEventListener('change', function () {
        // Actualiza los ingredientes basándote en la selección
        const ingredients = {
            sencilla: ['Queso Amarillo', 'Ingrediente No 2', 'Ingrediente No 3'],
            // Agrega aquí los ingredientes de los otros estilos de hamburguesa
        };
        const selected = ingredients[this.value] || [];
        ingredientListDisplay.innerHTML = selected.map((ingredient, index) => {
            const opacity = index === 0 ? '1' : '0.5';
            return `<div style="opacity: ${opacity};">${ingredient}</div>`;
        }).join('');
    });
});
