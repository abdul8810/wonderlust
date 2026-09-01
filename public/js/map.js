

   
    mapboxgl.accessToken=mapToken;
    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/standard',
        center: list.geometry.coordinates,
        zoom: 8
    });

    const marker=new mapboxgl.Marker({color:"red"})
    .setLngLat(list.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25}).setHTML(
            `<h4>${list.location}</h4><p>Exact location provide after booking</p>`
        )
    )
    .addTo(map);
  