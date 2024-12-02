function tsp_hk(distance_matrix) {
    let l = distance_matrix.length;
    let cache = new Map();

    if (l <= 1) {
        return 0;
    }


    function heldKarp(cities, start) {
        if(cities.size === 1) {
            let remaining = Array.from(cities)[0];
            return distance_matrix[start][remaining];
        }

        let key = '${Array.from(cities).join('-')}-${start}'
        let minimumTour = Infinity;

        if(cache.has(key)) {
            return cache.get(key);
        }
        for(let city of cities) {
            if(city !== start) {
                let citiesSet = new Set(cities);

                citiesSet.delete(city)

                let tour = heldKarp(citiesSet, city) + distance_matrix[start][city];

                minimumTour = Math.min(minimumTour, tour);
            }
        }
        cache.set(key, minimumTour);
        return minimumTour;
    }
    let minimumTour = Infinity;

    for (let start = 0; start < l; start++){
        let cities = new Set([...Array(l).keys()].filter((c) => c !== start));
        let tour = heldKarp(cities, start);

        minimumTour = Math.min(minimumTour, tour);
    }
    cache.clear();
    return minimumTour;
}
