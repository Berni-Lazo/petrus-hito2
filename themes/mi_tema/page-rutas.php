<?php get_header() ?>
<h2 class="services__title">Rutas</h2>
    <p class="services__description">Puedes visitar una de las siguientes zonas de interés turístico de nuestra región:</p>

    <section class="articles services__articles">
      <article class="article services__article">
        <div class="article__img">
            <img src="<?php echo get_theme_file_uri(); ?>/assets/images/reserva-coyh.jpg" alt="<Reserva Nacional Coyhaique">
        </div>
        <div class="article__text">
          <h3 class="article__title_papyrus">Reserva Nacional Coyhaique</h3>
          <p class="article__description">Está ubicada al noreste de Coyhaique, en la Región de Aysén del General Carlos Ibáñez del Campo. Entre sus atractivos figuran...</p>
          <a class="article__button" href="#collapseExample" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Leer más <i class="fas fa-arrow-alt-circle-down"></i></a>
          <div class="collapse" id="collapseExample">
            <div class="card card-body">
              <i class="fas fa-money-bill-wave"></i><p> <span>Tarifa:</span> $15.000 por persona.</p>
              <i class="far fa-clock"></i> <p> <span>Duración:</span> 4 horas.</p>
              <i class="fas fa-mug-hot"></i><p> <span>Incluye:</span> Traslados y snack.</p>
              <i class="fas fa-check-square"></i> <p> <span>Recomendaciones:</span> LLevar ropa adecuada.</p>
              <i class="fas fa-map-pin"></i><span>Ubicación:</span>
            </div>
          </div>
        </div>
      </article>
      <article class="article services__article">
        <div class="article__img">
          <img src="<?php echo get_theme_file_uri(); ?>/assets/images/reserva-2lag.jpg" alt="<Monumento Nacional Dos Lagunas">
        </div>
        <div class="article__text">
          <h3 class="article__title_papyrus">Monumento Nacional Dos Lagunas</h3>
          <p class="article__description">Ubicada en la Región de Aysén del General Carlos Ibáñez del Campo, comuna de Coyhaique. Se destaca por...</p>
          <a class="article__button" href="#collapseExample2" data-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">Leer más <i class="fas fa-arrow-alt-circle-down"></i></a>
          <div class="collapse" id="collapseExample2">
            <div class="card card-body">
              <i class="fas fa-money-bill-wave"></i><p> <span>Tarifa:</span> $15.000 por persona.</p>
              <i class="far fa-clock"></i> <p> <span>Duración:</span> 4 horas.</p>
              <i class="fas fa-mug-hot"></i><p> <span>Incluye:</span> Traslados y snack.</p>
              <i class="fas fa-check-square"></i> <p> <span>Recomendaciones:</span> LLevar ropa adecuada.</p>
              <i class="fas fa-map-pin"></i><span>Ubicación:</span>
            </div>
          </div>
        </div>
      </article>
      <article class="article services__article">
        <div class="article__img">
            <img src="<?php echo get_theme_file_uri(); ?>/assets/images/parque-castillo.jpg" alt="Parque Nacional Cerro Castillo">
        </div>
        <div class="article__text">
          <h3 class="article__title_papyrus">Parque Nacional Cerro Castillo</h3>
          <p class="article__description">Destaca por la protección de las especies de fauna huemul, puma, guanaco, chingue patagónico y ...</p>
          <a class="article__button" href="#collapseExample3" data-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample">Leer más <i class="fas fa-arrow-alt-circle-down"></i></a>
          <div class="collapse" id="collapseExample3">
            <div class="card card-body">
              <i class="fas fa-money-bill-wave"></i> <p> <span>Tarifa:</span> $15.000 por persona.</p>
              <i class="far fa-clock"></i> <p> <span>Duración:</span> 4 horas.</p>
              <i class="fas fa-mug-hot"></i> <p> <span>Incluye:</span> Traslados y snack.</p>
              <i class="fas fa-check-square"></i> <p> <span>Recomendaciones:</span> LLevar ropa adecuada.</p>
              <i class="fas fa-map-pin"></i><span>Ubicación:</span>
            </div>
          </div>
        </div>
      </article>
      <article class="article services__article">
        <div class="article__img">
            <img src="<?php echo get_theme_file_uri(); ?>/assets/images/reserva-rio.jpg" alt="<Reserva Nacional Río Simpson">
        </div>
        <div class="article__text">
          <h3 class="article__title_papyrus">Reserva Nacional Río Simpson</h3>
          <p class="article__description">Ubicada en el kilómetro 37 de la ruta que une las ciudades de Coyhaique y Puerto Aysén. El Río Simpson...</p>
          <a class="article__button" href="#collapseExample4" data-toggle="collapse" href="#collapseExample4" role="button" aria-expanded="false" aria-controls="collapseExample">Leer más <i class="fas fa-arrow-alt-circle-down"></i></a>
          <div class="collapse" id="collapseExample4">
            <div class="card card-body">
              <i class="fas fa-money-bill-wave"></i><p> <span>Tarifa:</span> $15.000 por persona.</p>
              <i class="far fa-clock"></i> <p> <span>Duración:</span> 4 horas.</p>
              <i class="fas fa-mug-hot"></i><p> <span>Incluye:</span> Traslados y snack.</p>
              <i class="fas fa-check-square"></i> <p> <span>Recomendaciones:</span> LLevar ropa adecuada.</p>
              <i class="fas fa-map-pin"></i><span>Ubicación:</span>

              <?php if ( is_active_sidebar( 'map-widget' ) ) { ?>
        				<?php dynamic_sidebar( 'map-widget' ); ?>
        			<?php }; ?>

            </div>
          </div>
        </div>
      </article>
    </section>

<?php get_footer() ?>
