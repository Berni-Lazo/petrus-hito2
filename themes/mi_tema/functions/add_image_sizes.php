<?php

/**
 * Custom Images Names
 * Adds custom images sizes ready to use on administrator
 *
 * @return array
 * @since  1.0
 */
function dl_image_sizes( $sizes ) {

	$add_sizes = array(
		'slide'	=> __( 'Tamaño de las imagenes del slider' ),
		'new'	=> __( 'Tamaño de las imagenes de noticias' ),
		'detail-new'	=> __( 'Tamaño de las imagenes de la entrada noticias' ),
		'service'	=> __( 'Tamaño de las imagenes de rutas' ),
		'gallery'	=> __( 'Tamaño de las imagenes de galeria' ),
		'detail-gallery'	=> __( 'Tamaño de las imagenes de galería expandida' )
	);

	return array_merge( $sizes, $add_sizes );

}


/**
 * Custom Images Sizes
 * Adds custom images sizes on posts
 *
 * @return void
 * @since  1.0
 * @see    https://developer.wordpress.org/reference/functions/add_image_size/
 * @see    https://codex.wordpress.org/Plugin_API/Filter_Reference/image_size_names_choose
 */
if ( function_exists( 'add_theme_support' ) ) {
	add_image_size( 'slide', 1240, 450, true );			// Personalización del tamaño del slider
	add_image_size( 'new', 400, 200, true );			// Personalización del tamaño de las noticias
	add_image_size( 'detail-new', 500, 300, true );		// Personalización del tamaño del detalle de las noticias
	add_image_size( 'service', 600, 400, true );			// Personalización del tamaño de las rutas
	add_image_size( 'gallery', 200, 200, true );		// Personalización del tamaño de la galeria
	add_image_size( 'detail-gallery', 800, 600, true );			// Personalización del tamaño de la galeria expandida
	add_filter( 'image_size_names_choose', 'dl_image_sizes' );

}
