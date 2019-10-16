<?php if ( has_nav_menu( 'footer-menu' ) ) { ?>
	<?php wp_nav_menu( array( 'theme_location' => 'footer-menu', 'container_class' => 'footer-menu' ) ); ?>
<?php } ?>
	<footer class="footer">
			<img class="footer__img" src="<?php echo get_theme_file_uri(); ?>/assets/images/logo.png" alt="logo">
		</div>
	</footer>
<?php wp_footer() ?>
</body>
</html>
