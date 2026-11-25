<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>About me</title>
	<meta name="description" content="About me" />
</svelte:head>

<div class="text-column">
	<h1>About me</h1>

	<p>
		Привет! Меня зовут Полина, я фотограф - уже несколько лет снимаю события и людей. Людей я очень люблю, и для меня фотография - способ оставить ваш и свой след в мире. Мой ник - название кнопки скриншота на компе, потому что истории со мной остаются не только в памяти. На личных фотосессиях мы с вами классно проведем время на съемке и создадим такие снимки, что вы еще долго будете думать "ну ничего себе, это я"!
	</p>

	<p>Я есть в соцсетях:</p>
	<a href="https://www.instagram.com/print8creen/">instagram</a>
	<a href="https://vk.com/print8creen">vk</a>
	<a href="https://pinterest.com/print8creen">pinterest</a>

	<p>Записаться и задать волнующие вопросы можно в <a href="https://t.me/forggi">tg</a></p>

	<p>
		Помимо фотографии, я devops-инженер в поисках работы! Если вам в команду нужен крутой сотрудник/вы знаете, где есть свободная вакансия, пожалуйста, дайте знать: напишите мне в <a href="https://t.me/forggi">tg</a>, я верю в силу интернета и в то, что работа обязательно со мной случится!!!<br/>
		А здесь лежит <a href="https://github.com/mousearthouse/photo-portfolio">исходный код</a> этого портфолио
	</p>
</div>

<style>
	.text-column {
		margin-top: 7vh;
		padding: 0 5%;
	}

	h1 {
		font-family: 'Ms-sans-serif-1'
	}
</style>
