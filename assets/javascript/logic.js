
$(document).ready(function () {


    var url = 'https://api.giphy.com/v1/gifs/search?api_key=6kpocg5pkbeG7HF1fXYpK3S5l5lBesP2&limit=10&q=';
    var visEffects = ['First Man', 'Blade Runner 2049', 'The Jungle Book', 'Ex Machina', 'Interstellar',
        'Gravity', 'Life of Pi', 'Hugo', 'Inception', 'Avatar', 'The Curious Case of Benjamin Button',
        'The Golden Compass', 'Pirates of the Caribbean: Dead Man\'s Chest', 'King Kong', 'Spider-Man 2',
        'Lord of the Rings', 'Gladiator', 'The Matrix'];
    var favorites, favbuttons;

    function createButtons(arr) {
        for (e of arr) {
            $('#buttons').prepend(`<button class="movieButton" type="button">${e}</button>`);
        }
    }
    const initializeStorage = _ => {
        if (!localStorage.getItem('favorites')) {
            localStorage.setItem('favorites', '[]');
        }
        if (!localStorage.getItem('favbuttons')) {
            localStorage.setItem('favbuttons', '[]');
        }
        favorites = JSON.parse(localStorage.getItem('favorites'));
        favbuttons = JSON.parse(localStorage.getItem('favbuttons'));
    }
    initializeStorage();
    createButtons(visEffects);
    createButtons(favbuttons);

    $('body').on('click', '.movieButton', function () {
        $('#images').empty();
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        $.ajax({
            url: url + $(this).text(),
            method: 'GET'
        }).then(function (response) {
            let resultArray = response.data;
            addImages(resultArray,'#images', 'far fa-heart');
        })
    })

    $('body').on('click', '.giphies', function () {
        let still = $(this).attr('data-still');
        let animated = $(this).attr('data-animated');
        if ($(this).attr('data-state') === 'still') {
            $(this).attr('src', animated);
            $(this).attr('data-state', 'not-still');
        } else {
            $(this).attr('src', still);
            $(this).attr('data-state', 'still')
        }
    })

    $('form').on('submit', function (e) {
        e.preventDefault();
        let value = $('#add-button').val().trim();
        if (value === '') {
            return;
        }
        createButtons([value]);
        favbuttons.push(value);
        localStorage.setItem('favbuttons',JSON.stringify(favbuttons));
        $('#add-button').val('');
    })

    const addImages = (array, location, icon) => {
        array.forEach(e => {
            $(location).append(`<div class="card">
                                    <div class="img-container">
                                        <img src="${e.images.fixed_width_still.url}" class="giphies" alt="${e.title}" id="${e.id}" data-still="${e.images.fixed_width_still.url}" data-animated="${e.images.fixed_width.url}" data-rating="${e.rating}" data-state="still" />
                                    </div>
                                    <div class="row">Rating: ${e.rating.toUpperCase()}
                                    <i class="${icon}" data-id="${e.id}"></i>
                                    </div>
                                </div>`);
        })
    }
    addImages(favorites, '#favs','fas fa-trash-alt');
    $('body').on('click', '.far', function() {
        $(this).removeClass('far');
        $(this).addClass('fas');
        let newFavorite = $('#'+$(this).attr('data-id'));
        fav = {
            images: {
                fixed_width: {
                    url: newFavorite.attr('data-animated')
                },
                fixed_width_still: {
                    url: newFavorite.attr('data-still')
                }
            },
            id: newFavorite.attr('id'),
            title: newFavorite.attr('alt'),
            rating: newFavorite.attr('data-rating')
        }
        addImages([fav],'#favs','fas fa-trash-alt');
        favorites.push(fav);
        localStorage.setItem('favorites',JSON.stringify(favorites));
    })
    $('body').on('click', '.fa-trash-alt', function () {
        $(this).closest('.card').remove();
        let i = favorites.findIndex((item) => item.id === $(this).attr('data-id'));
        favorites.splice(i,1)
        localStorage.setItem('favorites',JSON.stringify(favorites));
    })
})