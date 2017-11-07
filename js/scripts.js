$(document).ready(function () {
    var i = 'url(img/fondo-1.jpg';
    var cont = 2;
    $('#carouselExampleIndicators').bind('slide.bs.carousel', function (e) {
        i = 'url(img/fondo-' + cont + '.jpg';
        $('body').css('background-image', i);
        cont++;
        if (cont > 7) {
            cont = 1;
        }
    });
});

function personajeEpisodio(root){
    var personajes='';
        $.ajax({
            url: root,
            method: 'GET',
            async: false,
            success: function (data) {
                personajes = data.name;
            },
            error: function (e) {
                console.log(e);
            }
        });
    return personajes;
};

function modalSecreto(info){
    var root = 'https://swapi.co/api/films/';
    $.ajax({
        url: root,
        method: 'GET',
    }).then (function(data){
        if (info == 4) {
            info=0;
        }
        if (info == 5) {
            info=5;
        }
        if (info == 7) {
            info=6;
        }
        if (info == 1) {
            info=2;
        }
        if (info == 2) {
            info=1;
        }
        if (info == 6) {
            info=4;
        }
        $("#titulo-episodio").html(data.results[info].title);
        $("#fecha-episodio").html(data.results[info].release_date);
        $("#director-episodio").html(data.results[info].director);
        $("#productor-episodio").html(data.results[info].producer);
        $("#apertura-episodio").html(data.results[info].opening_crawl);
        $('#listado-personajes').empty();
        var listado = document.getElementById('listado-personajes');
        for (var i = 0; i < data.results[info].characters.length; i++) {
            var texto = document.createTextNode(personajeEpisodio(data.results[info].characters[i]));
            var elemLI = document.createElement("LI");
            elemLI.appendChild(texto)
            listado.appendChild(elemLI);
        }
    });
};

$(document).ready(function () {
    var root = 'https://swapi.co/api/films/';

    //Metodo I
    $.ajax({
        url: root,
        method: 'GET',
    }).then(function (data) {
        var tarjeta = '';
        var aux = [];
        for (var i = 0; i < data.results.length; i++) {
            if (i == 3) {
                aux.push(data.results[2]);
            }
            if (i == 4) {
                aux.push(data.results[3]);
            }
            if (i == 5) {
                aux.push(data.results[1]);
            }
            if (i == 0) {
                aux.push(data.results[i]);
            }
            if (i == 1) {
                aux.push(data.results[5]);
            }
            if (i == 2) {
                aux.push(data.results[4]);
            }
            if (i == 6) {
                aux.push(data.results[6]);
            }
        }
        $('#dropdown-index').html(tarjeta);
        var tarjeta = '';
        for (var j = 0; j < aux.length; j++) {
            tarjeta += '<div class="col-lg-4 col-sm-6 portfolio-item">';
            tarjeta += '<div class="card h-100">';
            tarjeta += '<a href="" data-toggle="modal" data-target="#myModal" onclick="modalSecreto('+aux[j].episode_id+')">';
            tarjeta += '<img class="card-img-top" src="img/episode' + aux[j].episode_id + '.png" alt="">';
            tarjeta += '</a>';
            tarjeta += '<div class="card-body">';
            tarjeta += '<h4 class="card-title">';
            tarjeta += '<p>' + aux[j].title + '</p>';
            tarjeta += '</h4>';
            tarjeta += '<p class="card-text">' + aux[j].opening_crawl + '</p>';
            tarjeta += '</div>';
            tarjeta += '</div>';
            tarjeta += '</div>';
        }
        $("#peliculas").html(tarjeta);
    });
});

function personajeEspecie(root){
    var personajes='';
        $.ajax({
            url: root,
            method: 'GET',
            async: false,
            success: function (data) {
                personajes = ("Race: "+data.name+" <br>language: "+data.language);
                return personajes;
            },
            error: function (e) {
                console.log(e);
            }
        });
    return personajes;
};

function personajePelicula(root){
    var personajes='';
        $.ajax({
            url: root,
            method: 'GET',
            async: false,
            success: function (data) {
                personajes = ("Episode: "+data.episode_id+" <br>Title: "+data.title);
                return personajes;
            },
            error: function (e) {
                console.log(e);
            }
        });
    return personajes;
};

$(document).ready(function () {
    var root = 'https://swapi.co/api/people/';
    cargarPeople(root);
    function cargarPeople(url){
    //Metodo I
    $.ajax({
            url: url,
            method: 'GET',
        }).then(function (data) {
            var tarjeta = '';
            $("#lista-personajes").empty();
            for (var j = 0; j < data.results.length; j++) {
                tarjeta += '<div class=col-lg-3 col-sm-4 portfolio-item">';
                tarjeta += '<div class="card h-100">';
                tarjeta += '<div class="card-body">';
                tarjeta += '<h4 class="card-title">';
                tarjeta += '<p class="card-text">' + data.results[j].name + '</p>';
                tarjeta += '</h4>';
                tarjeta += '<p class="card-text">' + personajeEspecie(data.results[j].species) + '</p>';
                for (var i= 0; i<data.results[j].films.length; i++){
                    tarjeta += '<p class="card-text">' + personajePelicula(data.results[j].films[i]) + '</p>';
                }              
                tarjeta += '</div>';
                tarjeta += '</div>';
                tarjeta += '</div>';
            }
            $("#lista-personajes").html(tarjeta);
            $('#next').on('click', function (e) {
                e.preventDefault();
                if (data.next != null)
                 cargarPeople(data.next);
            });
            $('#prev').on('click', function (e) {
                e.preventDefault();
                if (data.previous != null)
                 cargarPeople(data.previous);
            });
        });
    }
});

$(document).ready(function () {
    var root = 'https://swapi.co/api/planets/';
    cargarPlanetas(root);
    function cargarPlanetas(url){
    //Metodo I
    $.ajax({
            url: url,
            method: 'GET',
        }).then(function (data) {
            var tarjeta = '';
            $("#lista-planetas").empty();
            for (var j = 0; j < data.results.length; j++) {
                tarjeta += '<div class=col-lg-3 col-sm-4 portfolio-item">';
                tarjeta += '<div class="card h-100">';
                tarjeta += '<div class="card-body">';
                tarjeta += '<h4 class="card-title">';
                tarjeta += '<p class="card-text">' + data.results[j].name + '</p>';
                tarjeta += '</h4>';
                tarjeta += '<p class="card-text">Diameter: ' +data.results[j].diameter + '</p>';
                tarjeta += '<p class="card-text">Climate: ' +data.results[j].climate + '</p>';
                tarjeta += '<p class="card-text">Terrain: ' +data.results[j].terrain + '</p>';
                tarjeta += '<p class="card-text">Surface water: ' +data.results[j].surface_water + '</p>';
                tarjeta += '<p class="card-text">Population: ' +data.results[j].population + '</p>';
                tarjeta += '</div>';
                tarjeta += '</div>';
                tarjeta += '</div>';
            }
            $("#lista-planetas").html(tarjeta);
            $('#next').on('click', function (e) {
                e.preventDefault();
                if (data.next != null)
                cargarPlanetas(data.next);
            });
            $('#prev').on('click', function (e) {
                e.preventDefault();
                if (data.previous != null)
                cargarPlanetas(data.previous);
            });
        });
    }
});

$(document).ready(function () {
    var root = 'https://swapi.co/api/vehicles/';
    cargarVehiculos(root);
    function cargarVehiculos(url){
    //Metodo I
    $.ajax({
            url: url,
            method: 'GET',
        }).then(function (data) {
            var tarjeta = '';
            $("#lista-vehiculos").empty();
            for (var j = 0; j < data.results.length; j++) {
                tarjeta += '<div class=col-lg-3 col-sm-4 portfolio-item">';
                tarjeta += '<div class="card h-100">';
                tarjeta += '<div class="card-body">';
                tarjeta += '<h4 class="card-title">';
                tarjeta += '<p class="card-text">' + data.results[j].name + '</p>';
                tarjeta += '</h4>';
                tarjeta += '<p class="card-text">Model: ' +data.results[j].model + '</p>';
                tarjeta += '<p class="card-text">Length: ' +data.results[j].length + '</p>';
                tarjeta += '<p class="card-text">Crew: ' +data.results[j].crew + '</p>';
                tarjeta += '<p class="card-text">Passengers: ' +data.results[j].passengers + '</p>';
                tarjeta += '<p class="card-text">Vehicle class: ' +data.results[j].vehicle_class + '</p>';
                tarjeta += '</div>';
                tarjeta += '</div>';
                tarjeta += '</div>';
            }
            $("#lista-vehiculos").html(tarjeta);
            $('#next').on('click', function (e) {
                e.preventDefault();
                if (data.next != null)
                cargarVehiculos(data.next);
            });
            $('#prev').on('click', function (e) {
                e.preventDefault();
                if (data.previous != null)
                cargarVehiculos(data.previous);
            });
        });
    }
});

$(document).ready(function () {
    var root = 'https://swapi.co/api/starships/';
    cargarCruceros(root);
    function cargarCruceros(url){
    //Metodo I
    $.ajax({
            url: url,
            method: 'GET',
        }).then(function (data) {
            var tarjeta = '';
            $("#lista-cruceros").empty();
            for (var j = 0; j < data.results.length; j++) {
                tarjeta += '<div class=col-lg-3 col-sm-4 portfolio-item">';
                tarjeta += '<div class="card h-100">';
                tarjeta += '<div class="card-body">';
                tarjeta += '<h4 class="card-title">';
                tarjeta += '<p class="card-text">' + data.results[j].name + '</p>';
                tarjeta += '</h4>';
                tarjeta += '<p class="card-text">Model: ' +data.results[j].model + '</p>';
                tarjeta += '<p class="card-text">Manufacturer: ' +data.results[j].length + '</p>';
                tarjeta += '<p class="card-text">Crew: ' +data.results[j].crew + '</p>';
                tarjeta += '<p class="card-text">Passengers: ' +data.results[j].passengers + '</p>';
                tarjeta += '<p class="card-text">Vehicle class: ' +data.results[j].vehicle_class + '</p>';
                tarjeta += '</div>';
                tarjeta += '</div>';
                tarjeta += '</div>';
            }
            $("#lista-cruceros").html(tarjeta);
            $('#next').on('click', function (e) {
                e.preventDefault();
                if (data.next != null)
                cargarCruceros(data.next);
            });
            $('#prev').on('click', function (e) {
                e.preventDefault();
                if (data.previous != null)
                cargarCruceros(data.previous);
            });
        });
    }
});