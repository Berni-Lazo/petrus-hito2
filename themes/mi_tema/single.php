<?php get_header() ?>

<main class="contact">

<?php $arg = array(
 'post_type'		 => 'post',
 'posts_per_page' => -1,
 );

 $get_arg = new WP_Query( $arg );

 while ( $get_arg->have_posts() ) {
 $get_arg->the_post();
 ?>

   <article class="container my-2 border border-light rounded">
  	  <?php the_post_thumbnail('detail-new', array('class' => 'w-80 h-auto mt-4')); ?>
      <div class="text-center py-3">
  			 <h2 class="news__title"><?php the_title() ?></h2>
  		   <p class="news__subtitle"><i class="fas fa-calendar-alt"></i> <timedatetime="<?php the_time('Y-m-d') ?>"><?php the_time('d \d\e F \d\e Y') ?></time></p>
  	  	 <p class="news__description"> <?php the_content() ?> </p>
  	 </div>
   </article>

    <?php } wp_reset_postdata(); ?>
    <?php get_template_part('_includes/back', 'button') ?>
  </main>
<?php get_footer() ?>
