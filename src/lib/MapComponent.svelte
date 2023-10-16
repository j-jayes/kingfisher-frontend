<!-- src/lib/MapComponent.svelte -->
<script>
    import { onMount } from 'svelte';
  
    let map;
    onMount(() => {
      map = L.map('map').setView([49.4482, -2.5895], 13); // Coordinates for Guernsey
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  
      L.marker([49.4482, -2.5895]).addTo(map)
        .bindPopup('Guernsey')
        .openPopup();
    });
</script>
  
<div id="map"></div>

<style>
    #map {
      width: 100%;
      height: 400px;
    }
</style>
  
  