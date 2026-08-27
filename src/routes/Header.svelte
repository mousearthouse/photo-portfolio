<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<header>
	<nav>
		<ul>
			<li aria-current={page.url.pathname === '/' ? 'page' : undefined}>
				<a href={resolve('/')}>Home</a>
			</li>
			<li aria-current={page.url.pathname === '/about' ? 'page' : undefined}>
				<a href={resolve('/about')}>About</a>
			</li>
			<li aria-current={page.url.pathname === '/photos' ? 'page' : undefined}>
				<a href={resolve('/photos')}>Photos</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: center;
	}

	.browser {
		position: relative;
		width: min(1400px, 100%);
		margin: 0 auto;
	}

	.browser-image {
		display: block;
		width: 100%;
		height: auto;
	}

	nav {
		position: absolute;

		top: 7%;
		left: 5%;
	}

	nav ul {
		display: flex;
		gap: 25px;

		padding: 0;
		margin: 0;

		list-style: none;
	}

	nav a {
		color: #222;
		text-decoration: none;

		font-family: Arial, sans-serif;
		font-size: 13px;
	}

	nav a:hover {
		text-decoration: underline;
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}
</style>
