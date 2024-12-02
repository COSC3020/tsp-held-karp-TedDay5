function tsp_hk(distance_matrix) {
    let l = distance_matrix.length;

    if (l <= 1) {
        return 0;
    }
    let minimumTour = Infinity;

    for (let start = 0; start < l; start++){
        let cache = {};
        let cities = [];

        for(let i = 0; i < l; i++) {
            cities.push(i);
        }
        let tour = heldKarp(distance_matrix, cities, start, cache);

        if(tour < minimumTour) {
            minimumTour = tour;
        }
    }
    return minimumTour;
}

function heldKarp(distance_matrix, cities, start, cache) {
    let key = JSON.stringify([cities.slice(), start]);

    if(cache[key] !== undefined) {
        return cache[key];
    }
    if(cities.length == 2) {
        let remaining = cities.find(c => c !== start);
        cache[key] = distance_matrix[start][remaining]
        return cache[key];
    }
    let minimumTour = Infinity;

    for(let city = 0; city < cities.length; city++) {
        if(city !== start) {
            let citiesSet = [];

            for(let newCity = 0; newCity < cities.length; newCity++) {
                if(newCity !== start) {
                    citiesSet.push(newCity);
                }
            }

            let tour = heldKarp(distance_matrix, citiesSet, city, cache) + distance_matrix[start][city];

            if(tour < minimumTour) {
                minimumTour = tour;
            }
        }
    }
    cache[key] = minimumTour;
    return minimumTour;
}
