(function ($) {
    $.fn.loading = function () {
        var DEFAULTS = {
            percent: 75,
            duration: 2000
        };

        $(this).each(function () {
            var $target = $(this);

            var opts = {
                percent: $target.data('percent') ? $target.data('percent') : DEFAULTS.percent,
                duration: $target.data('duration') ? $target.data('duration') : DEFAULTS.duration
            };

            $target.append('<div class="progress"></div>');

            var $progress = $target.find('.progress');

            setTimeout(function () {
                $progress.attr('id', 'anime')
            }, 1);

            $('.flex-pauseplay').click(function () {
                if ($(this).children().hasClass('flex-play')) {
                    document.getElementById('anime').style.animationPlayState = 'paused';
                } else if ($(this).children().hasClass('flex-pause')) {
                    var el = document.getElementById('anime');
                    el.style.animation = 'none';
                    el.offsetHeight;
                    el.style.animation = null;
                }
            });
        });
    }
})(jQuery);