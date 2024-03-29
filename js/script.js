$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1500,
        /* adaptiveHeight: true, */
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/previous.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/next.png"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                dots: false,
                arrows: false
                }
            }
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')                       .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // MODAL

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay,#consultation').fadeIn('slow');
    });
    $('.modal__close').on('click',  function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });    

    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

   
    function valideForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },            
                phone:"required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символов!")
                  },
    
                phone: "Введите свой телефон",
                email: {
                  required: "Пожалуйста введите свой е-мейл",
                  email: "Введите адрес в формате name@domain.com"
                }
              }            
        });
    };

    valideForms('#consultation-form');
    valideForms('#order form');
    valideForms('#consultation form');
    
    $('input[name=phone]').mask("+420 999-999-999");

    $('form').submit(function(e){
        e.preventDefault();
        
        if(!$(this).valid()){
            return;
        }
        $.ajax({
            type: "POST",
            url:"mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay,#thanks').fadeIn('slow');


            $('form').trigger('reset');
        });
        return false;
    });

    // pageup

    $(window).scroll(function(){
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else $('.pageup').fadeOut();
    })
    $("a[href=#up]").on('click', function() {
            const _href = $(this).attr("href");
            $('html, body').animate({
                scrollTop: $(_href).offset().top}); 
                return false;                         
       });
       new WOW().init();
});