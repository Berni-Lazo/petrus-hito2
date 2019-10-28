<?php get_header() ?>

<main class="main">

        <?php get_template_part('_includes/carrousel', 'section') ?>
        <?php get_template_part('_includes/specialties', 'cicles') ?>

        <section class="news main__news">
          <h2>Noticias</h2>

            <?php $arg = array(
             'post_type'     => 'post',
             'posts_per_page' => 2,
             );

             $get_arg = new WP_Query( $arg );

             while ( $get_arg->have_posts() ) {
             $get_arg->the_post();
             ?>
          <div class="container news__post">
             <div class="news__img">
               <?php the_post_thumbnail('blog-square', array('class' => 'w100 h-auto')); ?>
             </div>
             <div class="news__text">
               <h4 class="news__title"><?php the_title() ?></h4>
               <h6 class="news__subtitle"><i class="fas fa-calendar-alt"></i> <timedatetime="<?php the_time('Y-m-d') ?>"><?php the_time('d \d\e F \d\e Y') ?></time></h6>
               <h6 class="news__description my-3"><?php the_excerpt() ?> </h6>
               <a class="news__button" href="<?php the_permalink() ?>">Leer más</a>
             </div>
           </div>
             <?php } wp_reset_postdata(); ?>

        </section>

        <section class="alliance">
          <div class="alliance__header">
            <h2 class="alliance__title"><span>PETRUS</span> en alianza con:</h2>
            <a class="alliance__logo" href="http://www.lodgecerronegro.com/es"> <img src="<?php echo get_theme_file_uri(); ?>/assets/images/logo-lodge.png" alt="Logo lodge"></a>
          </div>
          <div class="alliance__video">
            <?php if ( is_active_sidebar( 'video-widget' ) ) { ?>
              <?php dynamic_sidebar( 'video-widget' ); ?>
            <?php }; ?>
          </div>
        </section>

        <div class="icons">
            <a href="https://www.facebook.com/PetrusBirdwatching/"><i class="fab fa-facebook"></i></a>
            <a href="https://www.instagram.com/petrus_birdwatching_patagonia"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
            <a href="https://wa.me/56999316921"><i class="fab fa-whatsapp"></i></a>
        </div>
 </main>
<?php get_footer() ?>
