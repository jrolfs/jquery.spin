// See: https://gist.github.com/1290439

/*

You can now create a spinner using any of the variants below:

$('#el').spin(); // Produces default Spinner using the text color of #el.
$('#el').spin('small'); // Produces a 'small' Spinner using the text color of #el.
$('#el').spin('large', 'white'); // Produces a 'large' Spinner in white (or any valid CSS color).
$('#el').spin({ ... }); // Produces a Spinner using your custom settings.

$('#el').spin(false); // Kills the spinner.

*/

(function($) {
    $.fn.spin = function (opts, color) {

        var presets = {
            'tiny': { lines: 8, length: 2, width: 2, radius: 3 },
            'small': { lines: 11, length: 3, width: 2, radius: 5 },
            'large': { lines: 11, length: 4, width: 3, radius: 7 }
        };

        if (Spinner) {
            return this.each(function() {
                var $this = $(this);
                var data = $this.data();

                if (opts === false) {
                    if (data.spinner) {
                        data.spinner.stop();
                        delete data.spinner;
                    }
                    $this.empty();
                } else {
                    if (typeof opts === 'string') {
                        if (opts in presets) {
                            opts = presets[opts];
                        } else {
                            opts = {};
                        }

                        if (color) {
                            opts.color = color;
                        }

                        // Default hwaccel to true
                        opts.hwaccel = true;
                    } else if (typeof opts === 'object') {
                        if (opts.hasOwnProperty('preset')) {
                            $.extend(opts, opts.preset);
                        }

                        // Default hwaccel to true
                        if (!opts.hasOwnProperty('hwaccel')) {
                            opts.hwaccel = true;
                        }
                    }

                    data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin();
                    $this.html($(data.spinner.el).html());

                    return $this;
                }
            });
        } else {
            throw 'Spinner class not available.';
        }
    };

    $.fn.spinContents = function (opts, color) {
        var $this = $(this);
        var $spinner;

        if (opts === false) {
            var data = $this.data();

            if (data.spinner) {
                $spinner = data.spinner;
                $spinner.spin(false);
                $spinner.remove();
            }

            $this.css({
                height: data.height,
                width: data.width
            });

            $this.html(data.html);
            $this.removeClass('disabled');
        } else {
            $this.data({
                html: $this.html(),
                height: $this.css('height'),
                width: $this.css('width')
            });

            $this.height($this.height());
            $this.width($this.width());
            $this.html('<div class="spinner"></div>');

            $spinner = $this.find('.spinner').spin(opts, color);
            $this.html($spinner.get(0));
            $this.data('spinner', $spinner);
        }

        return $this;
    };
})(jQuery);
