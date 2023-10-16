<script>
    import Navbar from '$lib/Navbar.svelte';
    import MapComponent from '$lib/MapComponent.svelte';
</script>
  
<Navbar />
  
<div class="container mt-5">
    <h2>Contact Us</h2>
    <form>
      <div class="form-group">
        <label for="email">Email address:</label>
        <input type="email" class="form-control" placeholder="Enter email" id="email">
      </div>
      
      <div class="form-group">
        <label for="phone">Phone number:</label>
        <input type="tel" class="form-control" placeholder="Enter phone number" id="phone">
      </div>
  
      <!-- Message Section -->
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea class="form-control" id="message" rows="4" placeholder="Type your message here..."></textarea>
      </div>
  
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  
    <div class="mt-5">
      <h3>Find us here:</h3>
      <MapComponent />
    </div>
</div>
  