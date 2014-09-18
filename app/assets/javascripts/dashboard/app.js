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
        this.appendUserInfo();
        this.bindSpeedTest();
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
            $("div.user-agent").remove();
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
      },

      appendUserInfo: function() {
        $("div.user-agent").append("<h3>User Agent</h3><p>"+navigator.userAgent+"</p>");
        $("div.user-agent").append("<h3>Screen Resolution</h3><p>"+screen.width+"x"+screen.height+"</p>");
        $("div.user-agent").append("<h3>Window Size</h3><p>"+$(window).width()+"x"+$(window).height()+"</p>");
        $("div.user-agent").append("<a class='speed-test'>Test Speed</a>");
      },

      bindSpeedTest: function() {
        $("a.speed-test").on('click', function(e) {
          e.preventDefault();
          var past = new Date().getTime();
          var login =
          $.ajax({
            url: "/speedtest",
            type: "GET"
          });
          login.success(function(response) {
            // console.log(response.getResponseHeader());
            $("a.speed-test").remove();
            var now = new Date().getTime();
            console.log((now-past)/1000);
            var speed = Math.round((100 / ((now - past) / 1000)) * 10) / 10 + " MB/s";
            $("div.user-agent").append("<h3>Bandwidth</h3><p>"+speed+"</p>");
          });
        });
      }
  };

  App.init();

});
