<?php get_header() ?>
<main class="services">


  <h2 class="services__title">Rutas</h2>
      <p class="services__description">Puedes visitar una de las siguientes zonas de interés turístico de nuestra región:</p>

      <section class="articles services__articles">
        <?php $arg = array(
         'post_type'     => 'rutas',
         'posts_per_page' => -1,
         'orderby' => 'rand'
         );

         $get_arg = new WP_Query( $arg );

         while ( $get_arg->have_posts() ) {
         $get_arg->the_post();
         ?>

         <article class="article services__article">
           <div class="article__img">
               <?php the_post_thumbnail('blog-square', array('class' => 'w100 h-auto')); ?>
           </div>
           <div class="article__text">
             <h3 class="article__title_papyrus"><?php the_title() ?></h3>
             <h6 class="article__description"><?php the_content() ?></h6>
             <a class="article__button" href="#collapse<?php the_ID() ?>" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample">Detalles <i class="fas fa-arrow-alt-circle-down"></i></a>
             <div class="collapse" id="collapse<?php the_ID() ?>">
               <div class="card card-body">
                <div> <i class="fas fa-money-bill-wave"></i> <span>Tarifa: </span> <p> $<?php the_field('tarifa'); ?> por persona.</p> </div>
                <div> <i class="far fa-clock"></i> <span>Duración: </span> <p> <?php the_field('duracion'); ?> horas.</p> </div>
                <div> <i class="fas fa-mug-hot"></i> <span>Incluye: </span><p> <?php the_field('incluye'); ?></p> </div>
                <div> <i class="fas fa-check-square"></i> <span>Recomendaciones: </span> <p> <?php the_field('recomendaciones'); ?></p> </div>
                <div> <i class="fas fa-map-pin"></i> <span>Ubicación: </span><p><?php the_field('ubicacion'); ?></p> </div>
               </div>
             </div>
           </div>
         </article>

         <?php } wp_reset_postdata(); ?>
      </section>
      <?php get_template_part('_includes/back', 'button') ?>
</main>

<?php get_footer() ?>
