<?php get_header() ?>

<?php $arg = array(
 'post_type'		 => 'post',
 'posts_per_page' => 1,
 );

 $get_arg = new WP_Query( $arg );

 while ( $get_arg->have_posts() ) {
 $get_arg->the_post();
 ?>

 <article class="mb-5 container principal">
	 <div class="text-center my-3">
		  <?php the_post_thumbnail('detail', array('class' => 'w-100 h-auto my-4')); ?>
			 <h2><?php the_title() ?></h2>
		 <p><i class="fas fa-calendar-alt"></i> <timedatetime="<?php the_time('Y-m-d') ?>"><?php the_time('d \d\e F \d\e Y') ?></time></p>
	 </div>
	 <div>
	 	<?php the_content() ?>
	 </div>
 </article>


 <?php } wp_reset_postdata(); ?>
<?php get_footer() ?>
