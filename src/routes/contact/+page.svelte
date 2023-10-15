<script>
    import { onMount } from 'svelte';

    let posts = [];

    onMount(async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        posts = await response.json();
    });
</script>

<ul>
    {#each posts as post (post.id)}
        <li>{post.title}</li>
    {/each}
</ul>
