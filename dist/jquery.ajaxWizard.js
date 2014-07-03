/*
 *  jQuery Ajax Wizard - v0.0.1
 *
 *  Made by Glauco Custódio
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {
    // Create the defaults once
    var pluginName = "ajaxWizard",
        defaults = {
          contentUrl: null,
          controlSelectors: {
            forward:  '.forward',
            backward: '.backward'
          },
          beforeForward: function() { return true; },
          afterForward: function() { return true; },
          afterCachedForward: function() { return true; },
          beforeBackward: function() { return true; },
          afterBackward: function() { return true; },
        };

    // The actual plugin constructor
    function ajaxWizard ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(ajaxWizard.prototype, {
        init: function () {
          $(this.element).find('fieldset:first-child').addClass('current');
          this.eventListeners();
        },
        currentStep: function(){
          return $(this.element).find('fieldset.current');
        },
        getContentUrl: function(){
          if(this.settings.contentUrl === null){
            throw new Error('contentUrl not defined');
          }else{
            return this.settings.contentUrl;
          }
        },
        generateUniqueKey: function(){
          return (Math.random()*Math.random()).toString(16).substr(2,16);
        },
        whenCallingNextStep: function(that){
          if(!$(that).data('ajax-wizard-key') || $(that).data('ajax-wizard-hash') !== this.currentStep().serialize()){
            $('.' + $(that).data('ajax-wizard-key')).remove();
            this.forward(that);
          }else{
            this.animate(this.currentStep(),
                         $('.' + $(that).data('ajax-wizard-key')));
            this.afterCachedForwardCallback(this.element);
          }
        },
        beforeForwardCallback: function(){
          return this.settings.beforeForward.call(this, this.element);
        },
        afterForwardCallback: function(){
          return this.settings.afterForward.call(this, this.element);
        },
        afterCachedForwardCallback: function(){
          return this.settings.afterCachedForward.call(this, this.element);
        },
        beforeBackwardCallback: function(){
          return this.settings.beforeBackward.call(this, this.element);
        },
        afterBackwardCallback: function(){
          return this.settings.afterBackward.call(this, this.element);
        },
        ajaxRequest: function(sender){
          var self = this;
          var hash = this.currentStep().serialize();

          $.ajax({
            url: self.getContentUrl(),
            dataType: 'html',
            method: 'post',
            data: hash,
            success: function(data){
              self.currentStep().after('<fieldset>' + data + '</fieldset>');
              var newStep = self.currentStep().next('fieldset');
              self.animate(self.currentStep(), newStep);
              var key = self.generateUniqueKey();

              $(sender).data('ajax-wizard-key', key);
              $(sender).data('ajax-wizard-hash', hash);
              newStep.addClass(key);
              self.afterForwardCallback(this.element);
            }
          });
        },
        forward: function(sender){
          if(this.beforeForwardCallback() === true){
            this.ajaxRequest(sender);
          }
        },
        backward: function(){
          if(this.beforeBackwardCallback() === true){
            this.animate(this.currentStep(),
                         this.currentStep().prev('fieldset'));
            this.afterBackwardCallback();
          }
        },
        eventListeners: function () {
          var self = this;
          
          $(this.element).on('submit', function(e){
            e.preventDefault();
            self.whenCallingNextStep(this);
          });
          
          $(this.element).on('click', this.settings.controlSelectors.forward, function(){
            self.whenCallingNextStep(this);
          });
          
          $(this.element).on('click', this.settings.controlSelectors.backward, function(){
            self.backward();
          });
        },
        animate: function(from, to){
          from.hide().removeClass('current');
          to.fadeIn().addClass('current');
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new ajaxWizard( this, options ) );
            }
        });

        // chain jQuery functions
        return this;
    };

})( jQuery, window, document );