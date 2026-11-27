<script lang="ts">
	import Header from './Header.svelte';
	import { onMount } from 'svelte';
	import './layout.css';

	let { children } = $props();

    let randomImage = $state();

    onMount(async () => {
        const response = await fetch('/api/decorations');
		console.log('Photos:', response);

        if (response.ok) {
            randomImage = await response.json();
        }
    });
</script>

<div class="app">
	<main>
		{@render children()}
	</main>
	<!-- рамочка интернет эксплорера -->
	<!-- <div class="fixed-element">
		<div class="top">
			<picture>
				<source media="(max-width: 768px)" srcset="bgtop-mobile.png" />
				<img src="bgtop.png" alt="" />
			</picture>
			<div class="address">
				<a>about:print8creen</a>
			</div>
			<nav>
				<a href="/">Home</a>
				<a href="/about">About</a>
				<a href="/photos">Photos</a>
			</nav>

		</div>
		<div class="middle"></div>
		<picture>
			<source media="(max-width: 768px)" srcset="bgbottom-mobile.png" />
			<img class="bottom" src="bgbottom.png" alt="" />
		</picture>
	</div> -->

	<div class="fixed-element">
		<div class="top">
			<nav>
				<a href="/">главная</a>
				<a href="/services">условия</a>
				<a href="/photos">портфолио</a>
				<a href="/about">обо мне</a>
			</nav>
			<div class="address">
				<a>PrtSc</a>
			</div>
		</div>
	</div>

	<footer>
	✦ thank you for visiting ✦
	© 2026 by polina adashkevich<br/>
	{#if randomImage}
		<img
			src={randomImage.url}
			alt=""
			class="decoration"
		/>
	{/if}
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 100%;
		/* max-width: 64rem; */
		margin: 0 auto;
		box-sizing: border-box;
	}

	.fixed-element {
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		z-index: 90;
		min-width: 100%;
		height: 6vh;
		pointer-events: none;
		background-color: rgba(255, 255, 255, 0.5);

		transition: color 0.25s ease;
	}

	.top {
		position: relative;
		flex-shrink: 0;
		pointer-events: all;
	}

	.top > picture {
		display: block;
	}

	.top > picture > img {
		display: block;
		width: 100%;
		height: auto;
	}

	.address {
		position: fixed;
		top: 2vh;
		left: 3vw;
		a {
			color: rgb(190, 120, 126);
			font-size: 1.5rem;
		}
	}
	/* для рамочки */
	/* nav {
		position: absolute;
		display: flex;
		top: 55%;
		left: 3vw;
		gap: 2vw;
	} */

	nav {
		position: fixed;
		top: 2vh;
		right: 3vw;
		gap: 4vw;
	}

	.middle {
		flex: 1;
		pointer-events: none;
		background-image: url('/bgcenter.png');
		background-repeat: repeat-y;
		background-size: 100% 100%;
	}

	.bottom {
		width: 100%;
		height: auto;
		flex-shrink: 0;
		pointer-events: none;
	}

	.decoration {
		margin-top: 5px;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
		margin-bottom: 3vh;
	}

	footer a {
		font-weight: bold;
	}

	@media (max-width: 768px) {
		footer {
			margin-bottom: 6vh;
			display: flex;
		}
		.middle {
			background-image: url('/bgcenter-mobile.png');
		}
		.address {
			left: 3vw;
			a {
			font-size: 1rem;
			}
		}

		nav {
			right: 3vw;
			gap: 2vw;
			a {
				font-size: 1rem;
			}
		}
	}
</style>
