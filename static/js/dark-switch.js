(function($) {
    function toggleDarkMode() {
        if ($('body').hasClass('dark')) {
            $('body').css({opacity: 0, visibility: 'visible'}).animate({opacity: 1}, 500);
            $('body').removeClass('dark');
            $('body nav').removeClass('navbar-inverse');
            $('body nav').addClass('navbar-default');
            $('.js-dark-toggle i').removeClass('fa-sun-o');
            $('.js-dark-toggle i').addClass('fa-moon-o');
            localStorage.setItem('dark_mode', '0');
        } else {
            $('body').css({opacity: 0, visibility: 'visible'}).animate({opacity: 1}, 500);
            $('body').addClass('dark');
            $('body nav').removeClass('navbar-default');
            $('body nav').addClass('navbar-inverse');
            $('.js-dark-toggle i').removeClass('fa-moon-o');
            $('.js-dark-toggle i').addClass('fa-sun-o');
            localStorage.setItem('dark_mode', '1');
        }
    }

    $(document).ready(function() {
        // Set dark mode if user chose it.
        let default_mode = 0;
        if ($('body').hasClass('dark')) {
            default_mode = 1;
        }
        let dark_mode = parseInt(localStorage.getItem('dark_mode') || default_mode);
        if (dark_mode) {
            $('body').addClass('dark');
            $('body nav').removeClass('navbar-default');
            $('body nav').addClass('navbar-inverse');
            $('.js-dark-toggle i').removeClass('fa-moon-o');
            $('.js-dark-toggle i').addClass('fa-sun-o');
        } else {
            $('body').removeClass('dark');
            $('body nav').removeClass('navbar-inverse');
            $('body nav').addClass('navbar-default');
            $('.js-dark-toggle i').removeClass('fa-sun-o');
            $('.js-dark-toggle i').addClass('fa-moon-o');
        }
    });

    $(window).on('load', function() {
        $('.js-dark-toggle').click(function(e) {
            e.preventDefault();
            toggleDarkMode();
        });
    });

})(jQuery);
