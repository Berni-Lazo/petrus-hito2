<?php get_header() ?>

<section class="bd-example">
        <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="<?php echo get_theme_file_uri(); ?>/assets/images/slide1.jpg" class="img-carousel d-block w-100" alt="foto1">
              <div class="carousel-caption">
                <h5 class="carousel-caption__title">Una experiencia única</h5>
                <p class="carousel-caption__description d-none d-lg-block">Recorre la Carretera Austral en manos de personal entrenado para atenderte y ayudarte en lo necesario para que tu experiencia sea inolvidable</p>
                <a class="carousel-caption__button" href="#">Conócenos</a>
              </div>
            </div>
            <div class="carousel-item">
              <img src="<?php echo get_theme_file_uri(); ?>/assets/images/slide2.jpg" class="img-carousel d-block w-100" alt="foto2">
              <div class="carousel-caption">
                <h5 class="carousel-caption__title">Turismo con acceso para todos</h5>
                <p class="carousel-caption__description d-none d-lg-block">La flora, la fauna y los paisajes únicos de la Patagonia Chilena están al alcance de todos. Guías especializados en adaptar cada servicio a las características de su grupo.</p>
                <a class="carousel-caption__button" href="#">Únete a la aventura</a>
              </div>
            </div>
            <div class="carousel-item">
              <img src="<?php echo get_theme_file_uri(); ?>/assets/images/slide3.jpg" class="img-carousel d-block w-100" alt="foto3">
              <div class="carousel-caption">
                <h5 class="carousel-caption__title">Fotografía especializada</h5>
                <p class="carousel-caption__description d-none d-lg-block">Descubre y registra la riqueza única que existe en la gran variedad de aves que habitan la Región de Aysén</p>
                <a class="carousel-caption__button" href="#">Mira nuestras fotos</a>
              </div>
            </div>
            <div class="carousel-item">
              <img src="<?php echo get_theme_file_uri(); ?>/assets/images/slide4.jpg" class="img-carousel d-block w-100" alt="foto4">
              <div class="carousel-caption">
                <h5 class="carousel-caption__title">La Patagonia te está esperando</h5>
                <p class="carousel-caption__description d-none d-lg-block">No lo pienses más y únete a la aventura</p>
                <a class="carousel-caption__button" href="#">Contáctanos</a>
              </div>
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Anterior</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Siguiente</span>
          </a>
        </div>
      </section>

      <section class="main__articles">
        <article class="article main__article_1">
          <div class="article__icon">
            <svg height="80pt" viewBox="0 -30 507.91186 507" width="80pt" xmlns="http://www.w3.org/2000/svg"><path d="m493.53125 1.691406-64.914062 36.847656-146.652344 83.109376c-30.265625-55.683594-59.703125-103.226563-72.59375-111.820313-30.355469-20.386719-74.242188 8.871094-74.242188 8.871094h-132.9375c-1.15625.058593-2.089844.96875-2.1835935 2.125-.09375 1.15625.6835935 2.203125 1.8203125 2.445312 69.117187 13.257813 99.199219 27.335938 117.394531 44.25l.089844.09375c6.789062 6.480469 12.777344 13.753907 17.828125 21.667969.457031.730469.914063 1.371094 1.371094 2.101562 15.359375 23.222657 13.625 55.773438 14.902343 82.46875 2.5625 49.554688 24.59375 99.476563 67.75 125.804688 31.75 18.296875 64.742188 34.335938 98.742188 48 .914062.367188 1.921875.824219 2.835938 1.191406 4.78125 2.054688 8.546874 5.929688 10.46875 10.765625 1.921874 4.835938 1.835937 10.238281-.230469 15.015625l-20.480469 46.355469c-2.65625 6.019531-2.105469 12.972656 1.46875 18.5s9.6875 8.882813 16.269531 8.929687h31.542969c5.203125.023438 10.195312-2.0625 13.832031-5.785156s5.609375-8.761718 5.460938-13.964844c-.464844-37.796874-3.734375-75.507812-9.785157-112.824218-6.40625-22.675782-14.820312-44.734375-25.140624-65.917969v-.09375c19.332031-9.652344 37.574218-21.363281 54.398437-34.925781 3.65625-2.925782 7.222656-5.941406 10.695313-9.234375 5.871093-5.152344 11.371093-10.710938 16.457031-16.636719 2.5625-2.925781 5.121093-5.945312 7.5-8.960938 9.640625-12.011718 18.238281-24.828124 25.691406-38.308593 2.195313-3.75 4.203125-7.589844 6.214844-11.429688 1.464843-2.835937 2.925781-5.761719 4.296875-8.59375 16.394531-34.976562 28.578125-71.773437 36.296875-109.625.789062-3.707031-.667969-7.535156-3.722657-9.78125-3.054687-2.2460935-7.140624-2.496093-10.445312-.640625zm-241.601562 251.976563c-1.363282-.75-2.742188-1.582031-4.050782-2.414063 1.34375.824219 2.6875 1.65625 4.050782 2.414063zm-54.628907-62.445313c3.882813 7.402344 8.15625 14.59375 12.800781 21.542969-4.652343-6.945313-8.921874-14.136719-12.800781-21.542969zm20.753907 32.429688c1.746093 2.222656 3.503906 4.390625 5.292968 6.402344-1.789062-1.984376-3.546875-4.1875-5.292968-6.402344zm-7.394532-10.054688c1.972656 2.90625 3.964844 5.703125 5.988282 8.347656-2.023438-2.671874-4.015626-5.46875-5.988282-8.375zm14.855469 18.824219c1.546875 1.683594 3.109375 3.347656 4.679687 4.890625-1.570312-1.574219-3.132812-3.234375-4.679687-4.917969zm18.960937 16.675781c-1.371093-.914062-2.742187-1.964844-4.074218-3 1.351562.996094 2.703125 2.023438 4.074218 3zm-7.238281-5.484375c-1.445312-1.199219-2.863281-2.496093-4.28125-3.796875 1.417969 1.300782 2.835938 2.597656 4.296875 3.796875zm49.992188 20.113281c.914062.046876 1.828125.136719 2.742187.15625-.933594.027344-1.835937-.066406-2.742187-.109374zm-31.425781-8.117187c1.097656.527344 2.203124 1.078125 3.320312 1.5625-1.117188-.441406-2.222656-.988281-3.320312-1.519531zm7.535156 3.214844c1.070312.402343 2.140625.816406 3.226562 1.164062-1.085937-.304687-2.15625-.714843-3.226562-1.117187zm7.753906 2.433593c1.023438.265626 2.046875.558594 3.082031.785157-1.035156-.144531-2.058593-.472657-3.089843-.738281zm7.972656 1.636719c.96875.144531 1.929688.328125 2.90625.4375-.976562-.0625-1.9375-.246093-2.90625-.390625zm16.546875.867188c.84375 0 1.664063 0 2.507813-.070313-.84375.097656-1.664063.089844-2.507813.117188zm8.816407-.765625c.675781-.082032 1.34375-.128906 2.027343-.230469-.683593.148437-1.351562.191406-2.027343.273437zm0 0" fill="#35495e"/><path d="m319.90625 347.65625c-34-13.664062-66.992188-29.703125-98.742188-48-43.15625-26.328125-65.1875-76.25-67.75-125.804688-1.277343-26.695312.457032-59.246093-14.902343-82.46875-.457031-.730468-.914063-1.371093-1.371094-2.101562-5.050781-7.914062-11.039063-15.1875-17.828125-21.667969 4.753906 1.917969 9.875 4.113281 15.269531 6.671875 39.414063 18.558594 76.71875 41.300782 111.269531 67.839844l-40.871093 23.132812c-9.085938 5.210938-12.46875 16.648438-7.679688 25.964844 31.816407 60.527344 71.039063 80.824219 117.667969 69.945313l.914062 4.386719s23.957032 41.875 4.023438 82.101562zm0 0" fill="#955ba5"/><path d="m281.964844 121.648438-36.113282 20.476562c-34.550781-26.539062-71.855468-49.28125-111.269531-67.839844-3.539062-18.195312-4.09375-36.847656-1.648437-55.222656l.09375-.363281h2.101562s43.886719-29.257813 74.242188-8.871094c12.890625 8.59375 42.328125 56.136719 72.59375 111.820313zm0 0" fill="#71c285"/><path d="m428.617188 38.539062c-91.429688 78.808594-165.304688 198.949219-175.453126 215.863282-20.664062-10.972656-39.222656-31.636719-55.863281-63.179688-4.789062-9.316406-1.40625-20.753906 7.679688-25.964844l40.871093-23.132812 36.113282-20.476562zm0 0" fill="#bdc3c7"/><path d="m507.699219 12.113281c-7.71875 37.851563-19.902344 74.648438-36.296875 109.625-1.371094 2.832031-2.832032 5.757813-4.296875 8.59375-2.011719 3.839844-4.019531 7.679688-6.214844 11.429688-7.453125 13.480469-16.050781 26.296875-25.691406 38.308593-2.378907 3.015626-4.9375 6.035157-7.5 8.960938-5.085938 5.925781-10.585938 11.484375-16.457031 16.636719-3.472657 3.292969-7.039063 6.308593-10.695313 9.234375-16.824219 13.5625-35.066406 25.273437-54.398437 34.925781v.09375c-9.953126 4.875-20.40625 8.644531-31.179688 11.246094-20.722656 5.554687-42.773438 3.140625-61.804688-6.765625 10.148438-16.914063 84.023438-137.054688 175.453126-215.863282l64.914062-36.847656c3.304688-1.855468 7.390625-1.6054685 10.445312.640625 3.054688 2.246094 4.511719 6.074219 3.722657 9.78125zm0 0" fill="#e6e7e8"/><path d="m187.882812 46.125c0 5.050781-4.09375 9.144531-9.140624 9.144531-5.050782 0-9.144532-4.09375-9.144532-9.144531 0-5.046875 4.09375-9.140625 9.144532-9.140625 5.046874 0 9.140624 4.09375 9.140624 9.140625zm0 0"/><path d="m471.402344 121.738281c-1.371094 2.832031-2.832032 5.757813-4.296875 8.59375-2.011719 3.839844-4.019531 7.679688-6.214844 11.429688-13.992187 1.628906-28.066406 2.421875-42.148437 2.375-6.949219 0-13.988282-.179688-21.03125-.546875-5.046876-.253906-8.9375-4.550782-8.683594-9.601563.253906-5.046875 4.550781-8.9375 9.597656-8.683593 24.320312 1.417968 48.71875.222656 72.777344-3.566407zm0 0" fill="#bdc3c7"/><path d="m435.199219 180.070312c-2.378907 3.015626-4.9375 6.035157-7.5 8.960938-5.085938 5.925781-10.585938 11.484375-16.457031 16.636719-14.296876 3.570312-28.964844 5.472656-43.699219 5.671875-12.769531.359375-25.460938-2.042969-37.214844-7.042969-4.59375-2.121094-6.597656-7.5625-4.476563-12.160156 2.117188-4.59375 7.5625-6.597657 12.15625-4.480469 19.933594 9.234375 53.121094 6.675781 96-7.3125.367188-.089844.734376-.183594 1.191407-.273438zm0 0" fill="#bdc3c7"/><path d="m134.582031 74.285156c-5.394531-2.558594-10.515625-4.753906-15.269531-6.671875l-.089844-.09375c-18.195312-16.914062-48.277344-30.992187-117.394531-44.25-1.136719-.242187-1.9140625-1.289062-1.8203125-2.445312.0937495-1.15625 1.0273435-2.066407 2.1835935-2.125h130.835938l-.09375.363281c-2.445313 18.375-1.890625 37.027344 1.648437 55.222656zm0 0" fill="#e64c3c"/></svg>
          </div>
          <div class="article__text">
            <h3 class="article__title">Aves nativas</h3>
            <p class="article__description  d-none d-lg-block">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </article>

        <article class="article main__article_2">
          <div class="article__icon">
            <svg height="80pt" viewBox="0 -25 486 486" width="80pt" xmlns="http://www.w3.org/2000/svg"><path d="m0 436.035156 167.449219-21 107.550781-65 118.273438-43.585937 54.726562-46.414063 38-16v192zm0 0" fill="#a67c52"/><path d="m247.695312 143.9375-7.695312 44.097656h-56l14.398438-87.160156c2.582031-15.242188 17.027343-25.511719 32.273437-22.9375 15.242187 2.585938 25.503906 17.03125 22.929687 32.273438l-1.128906 6.480468" fill="#5bc9e1"/><path d="m240 188.035156 56 16 48 80-24 16-40-64-79.671875-7.199218c-5.378906-.492188-10.417969-2.851563-14.238281-6.671876-6.195313-6.179687-8.363282-15.324218-5.601563-23.625l3.511719-10.503906zm0 0" fill="#009245"/><path d="m236.753906 232.105469 7.941406 51.914062-52.695312 76.984375-24.550781-15.136718 41.488281-63.046876-20.792969-58.890624" fill="#006837"/><path d="m344 284.035156 8.335938 8.433594 10.398437-3.496094c8.242187-2.777344 17.222656 1.304688 20.554687 9.335938l4.246094 10.269531-55.605468 20.488281-11.929688-29.03125zm0 0" fill="#808080"/><path d="m192 361.003906h.921875c13.296875.003906 24.078125 10.785156 24.078125 24.085938l-18.519531 11.199218-51.480469-26.253906 20.449219-24.167968zm0 0" fill="#808080"/><path d="m302.144531 348.035156c-.578125-.003906-1.15625-.0625-1.71875-.183594-4.320312-.945312-7.050781-5.210937-6.105469-9.527343l57.503907-262.488281c1.046875-4.199219 5.242187-6.800782 9.46875-5.878907 4.226562.925781 6.953125 5.042969 6.15625 9.292969l-57.503907 262.496094c-.804687 3.667968-4.046874 6.28125-7.800781 6.289062zm0 0" fill="#666"/><path d="m290 44.035156c0 19.890625-16.125 36.015625-36.015625 36.015625s-36.015625-16.125-36.015625-36.015625 16.125-36.015625 36.015625-36.015625 36.015625 16.125 36.015625 36.015625zm0 0" fill="#f5e0cd"/><path d="m190.246094 158.074219c-4.417969.195312-8.15625-3.230469-8.351563-7.648438-.191406-4.417969 3.230469-8.15625 7.648438-8.351562l8.800781-.800781c13.261719-1.164063 26.183594-4.84375 38.070312-10.839844 3.949219-1.988282 8.761719-.398438 10.75 3.550781 1.988282 3.945313.398438 8.757813-3.546874 10.746094-13.691407 6.898437-28.5625 11.132812-43.832032 12.480469l-8.800781.800781c-.257813.054687-.496094.0625-.738281.0625zm0 0" fill="#0378a3"/><path d="m139.136719 125.082031-18.34375-3.917969c-2.320313-.496093-4.742188-.039062-6.722657 1.265626-1.980468 1.304687-3.355468 3.351562-3.8125 5.675781l-7.722656 39.121093c-.46875 2.367188.050782 4.824219 1.433594 6.796876 1.386719 1.976562 3.519531 3.300781 5.902344 3.667968l19.464844 3.007813zm0 0" fill="#0378a3"/><path d="m323.601562 15.15625-28.242187 14.078125-14.480469 7.28125-49.039062 24.480469-7.601563 3.757812c-1.117187.554688-2.347656.855469-3.597656.882813-3.058594.003906-5.855469-1.734375-7.199219-4.480469-.296875-.554688-.511718-1.148438-.640625-1.761719-1.875-4.902343-2.824219-10.109375-2.800781-15.359375.019531-18.390625 11.476562-34.828125 28.722656-41.214844 17.246094-6.382812 36.644532-1.367187 48.636719 12.574219l29.039063-14.558593c3.957031-1.964844 8.753906-.355469 10.722656 3.597656.964844 1.886718 1.132812 4.082031.472656 6.09375-.660156 2.015625-2.097656 3.679687-3.992188 4.628906zm0 0" fill="#f8cf26"/><path d="m256 131.554688-16-.367188.296875-12.800781c.351563-16.816407-10.527344-31.816407-26.625-36.695313l-19.398437-5.855468 4.621093-15.320313 19.394531 5.855469c22.96875 6.980468 38.5 28.382812 38.007813 52.382812zm0 0" fill="#0378a3"/><path d="m198.398438 100.875 6.769531-35.878906c.246093-1.296875-.050781-2.636719-.816407-3.714844-.761718-1.074219-1.933593-1.789062-3.238281-1.980469l-37.128906-5.496093c-6.65625-.984376-12.882813 3.511718-14.046875 10.132812l-20.570312 116.800781 54.632812 7.296875zm0 0" fill="#29485a"/><path d="m281.335938 169.371094c-2.875 0-5.652344-1.03125-7.832032-2.902344l-57.335937-49.335938c-5.023438-4.328124-5.589844-11.90625-1.265625-16.929687 4.328125-5.023437 11.90625-5.589844 16.929687-1.265625l51.28125 44.128906 67.511719-33.808594c3.835938-1.960937 8.429688-1.710937 12.035156.648438 3.605469 2.363281 5.664063 6.476562 5.398438 10.777344-.265625 4.300781-2.816406 8.128906-6.683594 10.03125l-74.664062 37.382812c-1.667969.839844-3.507813 1.273438-5.375 1.273438zm0 0" fill="#f0d0b4"/></svg>
          </div>
          <div class="article__text">
            <h3 class="article__title">Trekking</h3>
            <p class="article__description  d-none d-lg-block">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </article>
        <article class="article main__article_3">
          <div class="article__icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="80pt" viewBox="0 0 512 512" width="80pt"><style>.a{fill:#E5E9EA;}.b{fill:#E29A4B;}.c{fill:#566368;}.d{fill:#6F7B7F;}.e{fill:#435054;}</style><path d="M101.1 146.6V73.4c0-6.2-5-11.2-11.2-11.2H52.5c-6.2 0-11.2 5-11.2 11.2v73.2" class="a"/><path d="M68.4 146.6V62.2H52.5c-6.2 0-11.2 5-11.2 11.2v73.2" fill="#D1D1D1"/><path d="M512 159.9v273.7c0 18.8-15.2 34-34 34H34c-18.8 0-34-15.2-34-34V159.9c0-18.8 15.2-34 34-34h67.2c14.5 0 27.4-9.2 32.1-22.8l12.4-35.8c4.7-13.7 17.6-22.9 32.1-22.9h198.2c14.5 0 27.4 9.2 32.1 22.9l12.4 35.8c4.7 13.7 17.6 22.8 32.1 22.8h25.4C496.8 125.9 512 141.1 512 159.9z" fill="#FCB65F"/><path d="M60.6 467.6H34c-18.8 0-34-15.2-34-34V159.9c0-18.8 15.2-34 34-34h24.5v0.1c-17.8 1.1-31.9 15.9-31.9 33.9v273.7C26.6 452.4 41.9 467.6 60.6 467.6z" class="b"/><path d="M204.4 44.4c-14.5 0-27.4 9.2-32.1 22.9l-12.4 35.8c-4.7 13.7-17.6 22.8-32.1 22.8h-22.8v-0.2c12.9-1.5 23.9-10.2 28.3-22.6l12.4-35.8c4.7-13.7 17.6-22.9 32.1-22.9C177.8 44.4 204.4 44.4 204.4 44.4z" class="b"/><path d="M512 218.4v215.2c0 18.8-15.2 34-34 34H34c-18.8 0-34-15.2-34-34V218.4H512z" fill="#53BCE9"/><path d="M60.6 467.6H34c-18.8 0-34-15.2-34-34V218.4h26.6v215.2C26.6 452.4 41.9 467.6 60.6 467.6z" fill="#36A6CE"/><circle cx="256" cy="294.1" r="141.6" class="a"/><path d="M356.1 294.1c0 29.5-12.7 56-33 74.3C305.3 384.5 281.8 394.3 256 394.3c-25.8 0-49.3-9.8-67.1-25.8 -20.3-18.3-33-44.8-33-74.3s12.7-56 33-74.3c17.8-16 41.3-25.8 67.1-25.8 25.8 0 49.3 9.8 67.1 25.8C343.4 238.2 356.1 264.7 356.1 294.1z" class="c"/><path d="M326.8 223.4c20.8 20.8 30.6 48.6 29.2 75.9 -27.3 1.4-55-8.3-75.9-29.2 -20.8-20.8-30.6-48.6-29.2-75.9C278.2 192.8 305.9 202.5 326.8 223.4z" class="d"/><path d="M231.9 318.2c20.8 20.8 30.6 48.6 29.2 75.9 -27.3 1.4-55.1-8.3-75.9-29.2 -20.8-20.8-30.6-48.6-29.2-75.9C183.3 287.6 211.1 297.4 231.9 318.2z" class="d"/><path d="M256 402.1c-59.5 0-107.9-48.4-107.9-107.9s48.4-107.9 107.9-107.9S363.9 234.6 363.9 294.1 315.5 402.1 256 402.1zM256 201.9c-50.9 0-92.3 41.4-92.3 92.3s41.4 92.3 92.3 92.3 92.3-41.4 92.3-92.3S306.9 201.9 256 201.9z" class="e"/><path d="M256 254c-22.2 0-40.2 18-40.2 40.2s18 40.2 40.2 40.2 40.2-18 40.2-40.2C296.2 272 278.2 254 256 254z" class="e"/><path d="M306.9 118.1h61.6c8.1 0 14.7-6.6 14.7-14.7V87.3c0-8.1-6.6-14.7-14.7-14.7h-61.6c-8.1 0-14.7 6.6-14.7 14.7v16.1C292.2 111.5 298.8 118.1 306.9 118.1z" class="a"/><path d="M368.4 125.9h-61.6c-12.4 0-22.5-10.1-22.5-22.5V87.3c0-12.4 10.1-22.5 22.5-22.5h61.6c12.4 0 22.5 10.1 22.5 22.5v16.1C390.9 115.8 380.8 125.9 368.4 125.9zM306.9 80.5c-3.8 0-6.8 3.1-6.8 6.8v16.1c0 3.8 3.1 6.8 6.8 6.8h61.6c3.8 0 6.8-3.1 6.8-6.8V87.3c0-3.8-3.1-6.8-6.8-6.8C368.4 80.5 306.9 80.5 306.9 80.5z" class="b"/><circle cx="97.3" cy="410.2" r="28.3" class="c"/>
            </svg>
          </div>
          <div class="article__text">
            <h3 class="article__title">Fotografía</h3>
            <p class="article__description d-none d-lg-block">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </article>

      </section>

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
             <h6 class="news__subtitle"><p><i class="fas fa-calendar-alt"></i> <timedatetime="<?php the_time('Y-m-d') ?>"><?php the_time('d \d\e F \d\e Y') ?></time></p></h6>
             <p class="news__description"><?php the_excerpt(); ?></p>
             <a class="news__button" href="#">Leer más</a>
           </div>
         </div>
           <?php } wp_reset_postdata(); ?>

      </section>

      <div class="icons">
          <a href="https://www.facebook.com/PetrusBirdwatching/"><i class="fab fa-facebook"></i></a>
          <a href="https://www.instagram.com/petrus_birdwatching_patagonia"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
          <a href="#"><i class="fab fa-whatsapp"></i></a>
      </div>

<?php get_footer() ?>
