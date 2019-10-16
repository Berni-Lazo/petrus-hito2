<?php get_header() ?>
<h2 class="contact__title">Contacto</h2>
	<p class="contact__description">Para reservas o mayor información contactanos en:</p>

	<div class="contact__box container">
		<div class="contact__icons">
			<div class="">
				<i class="contact__icon fab fa-whatsapp"></i> <p class="contact__info"> +56 9 9316921</p>
			</div>
			<div class="">
				<i class="contact__icon_2 fab fa-facebook"></i> <p class="contact__info"> PetrusBirdwatching</p>
			</div>
			<div class="">
				<i class="contact__icon_3 fab fa-instagram"></i> <p class="contact__info"> Petrus_Birdwatching_Patagonia</p>
			</div>
			<div class="">
				<i class="contact__icon_4 far fa-envelope"></i> <p class="contact__info"> petrusbirdwatching@gmail.com</p>
			</div>
		</div>
		<form class="contact__form" action="contact.html" method="post">
			<h5>Escribe tu nombre</h5>
			<input type="text" name="Nombre" value="Nombre">
			<h5>Escribe tu mensaje</h5>
			<input type="text" name="Mensaje" value="Mensaje">
			<a href="#">Enviar</a>
		</form>
	</div>

<?php get_footer() ?>
