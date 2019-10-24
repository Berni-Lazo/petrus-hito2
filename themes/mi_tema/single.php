<?php get_header() ?>

<main class="contact">

  <?php if ( have_posts() ) { ?>
  <?php while ( have_posts() ) { ?>
  <?php the_post(); ?>

   <article class="container my-2 text-center border border-light rounded">
  		 <h2 class="news__title mt-5"><?php the_title() ?></h2>
  	   <h6 class="news__subtitle"><i class="fas fa-calendar-alt"></i> <timedatetime="<?php the_time('Y-m-d') ?>"><?php the_time('d \d\e F \d\e Y') ?></time></h6>
       <div class="news__img">
         <?php the_post_thumbnail('detail-new', array('class' => 'w-100 h-auto my-4')); ?>
       </div>
       <h6 class="news__description text-justify"> <?php the_content() ?> </h6>


   </article>
 <?php } ?>
 <?php } else { ?>
 <!-- Content -->
 <?php } wp_reset_query(); ?>

    <?php get_template_part('_includes/back', 'button') ?>
  </main>
<?php get_footer() ?>
