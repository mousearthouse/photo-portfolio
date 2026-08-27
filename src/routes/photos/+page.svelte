<script>
    import { onMount } from 'svelte';

    let photos = $state({});
    let loading = $state(true);
    let error = $state(null);
    let selectedCategory = $state('');

    function createRows(photos) {
        const rows = [];

        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];

            if (
                photo.width < photo.height &&
                photos[i + 1]?.width < photos[i + 1]?.height
            ) {
                rows.push([photo, photos[i + 1]]);
                i++;
            } else {
                rows.push([photo]);
            }
        }

        return rows;
    }

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

            console.log('Photos:', photos);
            console.log('Selected category:', selectedCategory);
        } catch (e) {
            console.error(e);
            error = e.message;
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    <title>portfolio</title>
</svelte:head>

<main>
    <h1>portfolio</h1>

        <div class="categories">
            {#each Object.keys(photos) as category}
                <button
                    class:active={selectedCategory === category}
                    onclick={() => selectedCategory = category}
                >
                    {category}
                </button>
            {/each}
        </div>

        <div class="gallery">
            {#each createRows(photos[selectedCategory] ?? []) as row}
                <div
                    class:single={row.length === 1}
                    class:vertical-single={
                        row.length === 1 &&
                        row[0].width < row[0].height
                    }
                    class="photo-row"
                >
                    {#each row as photo}
                        <div
                            class="photo"
                            style={`flex: ${photo.width / photo.height} 1 0`}
                        >
                            <img
                                src={photo.url}
                                alt={photo.name}
                                loading="lazy"
                            />
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
</main>

<style>
    main {
        max-width: 1600px;
        margin: 0 auto;
        padding: 40px;
        margin-top: 5vh;
        display: flex;
        flex-direction: column;
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
        color: rgb(255, 255, 255);
    }

    .gallery {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .photo-row {
        display: flex;
        gap: 12px;
    }

    .photo {
        min-width: 0;
    }

    .photo img {
        display: block;
        width: 100%;
        height: auto;
    }

    .photo p {
        margin-top: 5px;
        font-size: 12px;
    }

    @media (max-width: 700px) {
        .gallery {
            grid-template-columns: repeat(2, 1fr);
        }
        main {
            padding: 5px;
        }
    }

    h1 {
        font-family: 'Ms-sans-serif-1';
    }
</style>