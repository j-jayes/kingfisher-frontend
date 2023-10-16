<!-- src/lib/MapComponent.svelte -->
<script>
    import { onMount } from 'svelte';
  
    let map;
  
    onMount(() => {
      map = L.map('map').setView([49.1833, -2.1006], 13); // Coordinates for St Helier, Jersey
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  
      L.marker([49.1833, -2.1006]).addTo(map)
        .bindPopup('St Helier, Jersey')
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
  
  