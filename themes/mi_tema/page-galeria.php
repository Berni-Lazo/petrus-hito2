<?php get_header() ?>
<main class="gallery">
  <h2 class="gallery__title">Galería</h2>
  <?php the_post() ?>

  <?php if( function_exists('photo_gallery') ) { photo_gallery(7); } ?>
</main>

<?php get_footer() ?>
