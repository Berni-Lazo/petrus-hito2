<?php get_header() ?>

<main class="services">

  <?php if ( have_posts() ) { ?>
  <?php while ( have_posts() ) { ?>
  <?php the_post(); ?>

  <article class="article services__article">
    <div class="article__img">
        <?php the_post_thumbnail('blog-square', array('class' => 'w100 h-auto')); ?>
    </div>
    <div class="article__text">
      <h3 class="article__title_papyrus"><?php the_title() ?></h3>
      <h6 class="article__description"><?php the_content() ?></h6>
      <div class="card card-body">
         <div> <i class="fas fa-money-bill-wave"></i> <span>Tarifa: </span> <p> $<?php the_field('tarifa'); ?> por persona.</p> </div>
         <div> <i class="far fa-clock"></i> <span>Duración: </span> <p> <?php the_field('duracion'); ?> horas.</p> </div>
         <div> <i class="fas fa-mug-hot"></i> <span>Incluye: </span><p> <?php the_field('incluye'); ?></p> </div>
         <div> <i class="fas fa-check-square"></i> <span>Recomendaciones: </span> <p> <?php the_field('recomendaciones'); ?></p> </div>
         <div> <i class="fas fa-map-pin"></i> <span>Ubicación: </span><p><?php the_field('mapa'); ?></p> </div>
      </div>
    </div>
  </article>

 <?php } ?>
 <?php } else { ?>
 <!-- Content -->
 <?php } wp_reset_query(); ?>

    <?php get_template_part('_includes/back', 'button') ?>
  </main>
<?php get_footer() ?>
