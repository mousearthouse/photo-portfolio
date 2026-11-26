<script>
    import { onMount } from 'svelte';

    let photos = $state({});
    let loading = $state(true);
    let error = $state(null);
    let selectedCategory = $state('');

    onMount(async () => {
        try {
            const response = await fetch('/api/photos');

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            photos = await response.json();

            const categories = Object.keys(photos);

            if (categories.length > 0) {
                selectedCategory = categories[0];
            }
        } catch (e) {
            console.error(e);
            error = e.message;
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    <title>Photos — portfolio</title>
</svelte:head>

<main>
    <h1>photos</h1>

    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p>Error: {error}</p>
    {:else}
        {#each Object.entries(photos) as [slug, category]}
            <button
                class:active={selectedCategory === slug}
                onclick={() => selectedCategory = slug}
            >
                {category.title}
            </button>
        {/each}
        <div class="shootings">
            {#each Object.entries(photos[selectedCategory]?.shootings ?? {}) as [slug, shooting]}
                <a
                    href={`/photos/${selectedCategory}/${slug}`}
                    class="shooting-card"
                >
                    {#if shooting.cover}
                        <div class="cover">
                            <img
                                src={shooting.cover.url}
                                alt={shooting.title}
                            />
                        </div>
                    {/if}

                    <h2>{shooting.title}</h2>
                    <span>{shooting.photos.length} photos</span>
                </a>
            {/each}
        </div>
    {/if}
</main>

<style>
    main {
        max-width: 1600px;
        margin: 5vh auto 0;
        padding: 40px;
        display: flex;
        flex-direction: column;
    }

    h1 {
        font-family: 'Ms-sans-serif-1';
    }

    .categories {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin: 30px 0;
    }

    button {
        padding: 10px 20px;
        cursor: pointer;
        border: none;
        font-family: sans-serif;
    }

    button.active {
        background: rgb(64, 115, 255);
        color: white;
    }

    .shootings {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px;
    }

    .shooting-card {
        display: block;
        color: inherit;
        text-decoration: none;
        min-width: 0;
    }

    .cover {
        width: 100%;
        aspect-ratio: 4 / 3;
        overflow: hidden;
        background: #eee;
    }

    .cover img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .shooting-card:hover .cover img {
        transform: scale(1.03);
    }

    .shooting-info {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 10px;
        margin-top: 10px;
    }

    .shooting-info h2 {
        font-size: 16px;
        font-weight: normal;
        margin: 0;
    }

    .shooting-info span {
        font-size: 12px;
        opacity: 0.6;
        white-space: nowrap;
    }

    .empty {
        display: grid;
        place-items: center;
        color: #777;
    }

    @media (max-width: 900px) {
        .shootings {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 700px) {
        main {
            padding: 15px;
        }

        .shootings {
            grid-template-columns: 1fr;
        }
    }
</style>