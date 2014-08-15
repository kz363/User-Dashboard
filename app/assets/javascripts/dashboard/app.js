/**
 * globals
 */
var MOBILE_VIEW = 992;

$(function() {
  'use strict';

  function getWidth() {
    return window.innerWidth;
  }

  var App = {
      /**
       * init
       */
      init: function() {
        this.cacheElements();
        this.bindEvents();
        this.checkViewport();
        this.bindLogin();
        this.bindAlerts();
      },

      /**
       * cache elements
       */
      cacheElements: function() {
        this.$viewport    = $(window);
        this.$pageWrapper = $("#page-wrapper");
        this.$toggleBtn   = $("#toggle-sidebar");
      },

      /**
       * bind events to elements
       */
      bindEvents: function() {
        this.$viewport.on('resize', this.viewportResize.bind(this));
        this.$toggleBtn.on('click', this.toggleSidebar.bind(this));
      },

      /**
       * trigger checkviewport on resize
       */
      viewportResize: function() {
        this.checkViewport();
      },

      /**
       * toggles sidebar
       */
      toggleSidebar: function(e) {
        this.$pageWrapper.toggleClass('active');

        $.cookie('toggle', this.$pageWrapper.hasClass("active"));
      },

      /**
       * Checks the viewport and toggles sidebar if toggled
       */
      checkViewport: function() {
        if (getWidth() >= MOBILE_VIEW) {
            if ($.cookie('toggle') === undefined) {
                this.$pageWrapper.addClass("active");
            } else {
                if($.cookie('toggle') == 'true') {
                    this.$pageWrapper.addClass("active");
                } else {
                    this.$pageWrapper.removeClass("active");
                }
            }
        } else {
            this.$pageWrapper.removeClass("active");
        }
      },

      bindLogin: function() {
        $("div.modal-body").on('submit', "form", function(e) {
          e.preventDefault();
          var login =
          $.ajax({
            url: "/login",
            type: "POST",
            data: $(this).serialize()
          });
          login.success(function(response) {
            $("#loginModal").modal('hide');
            $("div.meta.pull-right").remove();
            $("div.page-content").append(response.rows);
            $("div.meta.pull-left").after(response.user);
          });
          login.fail(function(response) {
            $("div.error").html("");
            $("div.error").append(response.responseText);
          })
        });
      },

      bindAlerts: function() {
        $("div.page-content").on('click', ".alert", function(e) {
          e.preventDefault();
          $(this).remove();
        });
      }
  };

  App.init();

});
