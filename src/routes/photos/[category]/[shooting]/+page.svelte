<script>
    let { data } = $props();

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
</script>

<svelte:head>
    <title>{data.shooting.title} — portfolio</title>
</svelte:head>

<main>
    <nav>
        <a href="/photos">← all photos</a>
        <span>
            {data.category.title} / {data.shooting.title}
        </span>
    </nav>

    <h1>{data.shooting.title}</h1>

    <div class="gallery">
        {#each createRows(data.photos) as row}
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
        margin: 5vh auto 0;
        padding: 40px;
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        font-size: 14px;
    }

    nav a {
        color: inherit;
        text-decoration: none;
    }

    nav a:hover {
        text-decoration: underline;
    }

    nav span {
        opacity: 0.6;
    }

    h1 {
        font-family: 'Ms-sans-serif-1';
        margin-bottom: 30px;
    }

    .gallery {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .photo-row {
        display: flex;
        gap: 12px;
        align-items: flex-start;
    }

    .photo {
        min-width: 0;
    }

    .photo img {
        display: block;
        width: 100%;
        height: auto;
    }

    @media (max-width: 700px) {
        main {
            padding: 15px;
        }

        .photo-row {
            gap: 6px;
        }

        nav {
            align-items: flex-start;
            gap: 10px;
        }
    }
</style>