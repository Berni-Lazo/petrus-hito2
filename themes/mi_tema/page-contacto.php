<?php get_header() ?>
<main class="contact">
	<h2 class="contact__title">Contacto</h2>
		<p class="contact__description">Para reservas o mayor información contáctanos en:</p>

		<div class="contact__box container">
			<div class="contact__icons">
				<div class="">
					<div class="">
						<i class="contact__icon fab fa-whatsapp"></i> <p class="contact__info"> +56 9 99316921</p>
					</div>
					<div class="">
						<i class="contact__icon_2 fab fa-facebook"></i> <p class="contact__info"> PetrusBirdwatching</p>
					</div>
				</div>
			  <div class="">
					<div class="">
						<i class="contact__icon_3 fab fa-instagram"></i> <p class="contact__info"> Petrus_Birdwatching_Patagonia</p>
					</div>
					<div class="">
						<i class="contact__icon_4 far fa-envelope"></i> <p class="contact__info"> petrusbirdwatching@gmail.com</p>
					</div>
			  </div>
			</div>
			<div class="contact__form">
				<?php the_post() ?>
				<?php the_content(); ?>
			</div>
		</div>
		<?php get_template_part('_includes/back', 'button') ?>
</main>
<?php get_footer() ?>
