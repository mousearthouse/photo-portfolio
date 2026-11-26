<script>
    let { data } = $props();

    let selectedCategory = $state(
        Object.keys(data.photos)[0] ?? ''
    );

    let categories = $derived(
        Object.entries(data.photos)
    );

    let shootings = $derived(
        data.photos[selectedCategory]?.shootings
            ? Object.entries(data.photos[selectedCategory].shootings)
            : []
    );
</script>

<svelte:head>
    <title>Photos — portfolio</title>
    <meta
        name="description"
        content="Photography portfolio: events, concerts and individual shoots."
    />
</svelte:head>

<main>
    <h1>photos</h1>

    {#if categories.length === 0}
        <p>No photo categories found.</p>

    {:else}
        <nav class="categories" aria-label="Photo categories">
            {#each categories as [slug, category]}
                <button
                    class:active={selectedCategory === slug}
                    aria-pressed={selectedCategory === slug}
                    onclick={() => selectedCategory = slug}
                >
                    {category.title}
                </button>
            {/each}
        </nav>

        <section class="shootings">
            {#each shootings as [slug, shooting]}
                <a
                    href={`/photos/${selectedCategory}/${slug}`}
                    class="shooting-card"
                >
                    {#if shooting.cover}
                        <div class="cover">
                            <img
                                src={shooting.cover.url}
                                alt={shooting.title}
                                loading="lazy"
                            />
                        </div>
                    {:else}
                        <div class="cover cover-empty">
                            <span>No cover</span>
                        </div>
                    {/if}

                    <h2>{shooting.title}</h2>

                    <span>
                        {shooting.photos?.length ?? 0} photos
                    </span>
                </a>
            {/each}
        </section>

        {#if shootings.length === 0}
            <p>No shootings in this category yet.</p>
        {/if}
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