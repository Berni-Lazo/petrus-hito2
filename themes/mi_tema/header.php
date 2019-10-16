<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset') ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php get_template_part('_includes/iOS', 'icons') ?>
	<?php wp_head() ?>
</head>
<body>

	<nav class="navbar navbar-expand-lg fixed-top">
				<div class="container">
					<a class="navbar__logo" href="index.html"> <img class="navbar__img" src="<?php echo get_theme_file_uri(); ?>/assets/images/logo.png" alt="logo"> </a>

					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<i class="fas fa-bars"></i>
					</button>

					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav ml-auto">
							<li class="nav-item">
								<a class="nav-link" href="#about">Inicio</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="services.html">Rutas</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="gallery.html">Galería</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="contact.html">Contacto</a>
							</li>
						</ul>
					</div>
				</div>
	</nav>

	<?php if ( has_nav_menu( 'header-menu' ) ) { ?>
		<?php wp_nav_menu( array(
			'theme_location' => 'header-menu',
			'container_class' => 'header-menu'
		) ); ?>



	<?php } ?>
