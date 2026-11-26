<script lang="ts">
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import welcome from '$lib/images/svelte-welcome.webp';
</script>

<svelte:head>
	<title>print8creen | фотограф в Сибири</title>
	<meta name="description" content="prin8creen portfolio" />
</svelte:head>

<section class="welcome">
	<h1>
		print8creen<br />photos
	</h1>
</section>
<section class="text-block">
	<img src="/profile_icon.png" alt="profile_icon"/>
	<p>Меня зовут Полина, я фотограф в Сибири, специализируюсь на репортажной и портретной съемке. Снимаю мероприятия, концерты, индивидуальные и творческие проекты</p>
</section>

<style>
	.welcome {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		width: 100vw;
		background-image: url('/bg.JPEG');
		background-size: cover;
	}

	.text-block {
		width: 50%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0 5vh;
		margin: 5vh auto;

		img {
			height: 50%;
			width: 50%;
			margin: 0 5vh;
		}
	}

	h1 {
		width: 100%;
		font-family: 'Ari';
		color: rgb(255, 255, 255);
	}
</style>
