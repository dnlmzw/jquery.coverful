/*
 * Coverful v0.10
 * jQuery plugin by
 * Daniel Mierzwinski
 * https://github.com/dnlmzw
 *
 * Built on jQuery Boilerplate
 */

;(function( $, window, document, undefined ) {

    var pluginName = "coverful",
        defaults = {
		crop: true, // Maybe in the future
		orientation: 'center center' // Maybe in the future
	};

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            // Shortcut jQuery object, reference to plugin and hide image
            var ref = this;
            var el = $(this.element);
            el.data('pluginRef', ref).hide();

            // Set src for later reference and bind onload
            var src = el.attr('src');
            el.attr('src','').bind('load', this.onload);

            // Reload image to trigger onLoad listener
            this.load(src);

            // Update on resize
            $(window).bind('resize', function() { ref.resize(); });
        },

        setup: function() {
            var el = $(this.element);

            // Wrap image in mask
            var wrapper = '<div class="coverful-wrapper" style="overflow:hidden;height:100%;width:100%;"></div>';
            el.wrap(wrapper);

            this.resize();
        },

        load: function(src) {
            // Load image
            var el = $(this.element);
            el.attr('src', src);
        },

        onload: function() {
            // Image loaded
            var ref = $(this).data('pluginRef');
            var el = $(ref.element);

            ref.setup();
            el.fadeIn('slow');
        },

        resize: function() {
            var el = $(this.element);

            // Define ratio
            var ratio = {
                image : el.width() / el.height(),
                wrapper : el.parent().width() / el.parent().height()
            };

            // Define ratio and set size
            var size = ratio.image > ratio.wrapper ? {height: el.parent().height(), width: 'auto'} : {width: el.parent().width(), height: 'auto'};
            el.css(size);

            // Small delay to register size change
            setTimeout(function() {
                // Calculate and set margin
                var margin = {
                    marginTop: 0 - (el.height() - el.parent().height()) / 2,
                    marginLeft: 0 - (el.width() - el.parent().width()) / 2
                };
                el.css(margin);
            },1);
        }
    };

    $.fn[pluginName] = function( options ) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );