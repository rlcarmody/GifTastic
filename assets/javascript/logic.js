
$(document).ready(function () {

    var url = 'http://api.giphy.com/v1/gifs/search?api_key=6kpocg5pkbeG7HF1fXYpK3S5l5lBesP2&limit=10&q=';
    var visEffects = ['First Man', 'Blade Runner 2049', 'The Jungle Book', 'Ex Machina', 'Interstellar',
        'Gravity', 'Life of Pi', 'Hugo', 'Inception', 'Avatar', 'The Curious Case of Benjamin Button',
        'The Golden Compass', 'Pirates of the Caribbean: Dead Man\'s Chest', 'King Kong', 'Spider-Man 2',
        'Lord of the Rings', 'Gladiator', 'The Matrix'];

    function createButtons(arr) {
        for (e of arr) {
            let newButton = `<button class="movieButton" type="button">${e}</button>`
            $('#buttons').append(newButton);
        }
    }

    createButtons(visEffects);
    $('body').on('click', '.movieButton', function () {
        $.ajax({
            url: url + $(this).text,
            method: 'GET'
        }).then()
    })
    

})