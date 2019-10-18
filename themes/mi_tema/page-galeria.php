<?php get_header() ?>
  <h2 class="gallery__title">Galería</h2>
  <?php the_post() ?>

  <?php if( function_exists('photo_gallery') ) { photo_gallery(7); } ?>
<?php get_footer() ?>
