<script>
    let { data } = $props();

    function createRows(photos) {
        const rows = [];
        const used = new Set();

        for (let i = 0; i < photos.length; i++) {
            if (used.has(i)) continue;

            const current = photos[i];
            const isVertical = current.height > current.width;

            if (!isVertical) {
                rows.push([current]);
                used.add(i);
                continue;
            }

            let pairIndex = -1;

            for (let j = i + 1; j < photos.length; j++) {
                if (
                    !used.has(j) &&
                    photos[j].height > photos[j].width
                ) {
                    pairIndex = j;
                    break;
                }
            }

            if (pairIndex !== -1) {
                rows.push([current, photos[pairIndex]]);
                used.add(i);
                used.add(pairIndex);
            } else {
                rows.push([current]);
                used.add(i);
            }
        }

        return rows;
    }
</script>

<svelte:head>
    <title>{data.shooting.title} | print8creen</title>
</svelte:head>

<main>
    <nav>
        <a href="/photos">← все фото</a>
        <span>
            {data.category.title} / {data.shooting.title}
        </span>
    </nav>

    <h1>{data.shooting.title}</h1>
    <div class="container">
        <div class="gallery">
            {#each createRows(data.photos) as row}
                <div
                    class="photo-row"
                    class:double={row.length === 2}
                    class:single={row.length === 1}
                    class:vertical-single={
                        row.length === 1 &&
                        row[0].width < row[0].height
                    }
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
        font-family: 'Ari';
        margin-bottom: 30px;
    }
    .container {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .gallery {
        width: 60%;
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
        flex: 1 1 0;
    }

    .photo-row.double .photo {
        width: 50%;
    }

    .photo-row.single .photo {
        width: 100%;
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

        .gallery {
            width: 100%;
        }

        nav {
            align-items: flex-start;
            gap: 10px;
        }
    }
</style>