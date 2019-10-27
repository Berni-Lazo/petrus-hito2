<?php
function rutas_post_type() {

	$labels = array(
		'name'                  => _x( 'Rutas', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Ruta', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Rutas', 'text_domain' ),
		'name_admin_bar'        => __( 'Rutas', 'text_domain' ),
		'archives'              => __( 'Archivos de rutas', 'text_domain' ),
		'attributes'            => __( 'Atributos de rutas', 'text_domain' ),
		'parent_item_colon'     => __( 'Ruta orincipal', 'text_domain' ),
		'all_items'             => __( 'Todas las rutas', 'text_domain' ),
		'add_new_item'          => __( 'Agregar nueva ruta', 'text_domain' ),
		'add_new'               => __( 'Agregar nuevo', 'text_domain' ),
		'new_item'              => __( 'Ruta nueva', 'text_domain' ),
		'edit_item'             => __( 'Editar ruta', 'text_domain' ),
		'update_item'           => __( 'Actualizar ruta', 'text_domain' ),
		'view_item'             => __( 'Ver ruta', 'text_domain' ),
		'view_items'            => __( 'Ver rutas', 'text_domain' ),
		'search_items'          => __( 'Buscar ruta', 'text_domain' ),
		'not_found'             => __( 'No encontrado', 'text_domain' ),
		'not_found_in_trash'    => __( 'No encontrado en papelera', 'text_domain' ),
		'featured_image'        => __( 'Imagen destacada', 'text_domain' ),
		'set_featured_image'    => __( 'Establecer imagen destacada', 'text_domain' ),
		'remove_featured_image' => __( 'Eliminar imagen destacada', 'text_domain' ),
		'use_featured_image'    => __( 'Usar como imagen destacada', 'text_domain' ),
		'insert_into_item'      => __( 'Insertar en ruta', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Actualizado en esta ruta', 'text_domain' ),
		'items_list'            => __( 'Lista de rutas', 'text_domain' ),
		'items_list_navigation' => __( 'Lista de navegación de rutas', 'text_domain' ),
		'filter_items_list'     => __( 'Filtro para lista de rutas', 'text_domain' ),
	);
	$args = array(
		'label'                 => __( 'Ruta', 'text_domain' ),
		'description'           => __( 'post para las rutas', 'text_domain' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail' ),
		'taxonomies'            => array( 'category', 'post_tag' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-location-alt',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'ruta', $args );

}

add_action( 'init', 'rutas_post_type', 0 );
?>
