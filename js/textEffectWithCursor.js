/**
 * @author Deniz A.
 * created on 22.4.2016
 */
jQuery(document).ready(function(){}),function(t){"use strict";var s=function(s,e){this.el=t(s),this.options=t.extend({},t.fn.typed.defaults,e),this.baseText=this.el.text()||this.el.attr("placeholder")||"",this.typeSpeed=this.options.typeSpeed,this.startDelay=this.options.startDelay,this.backSpeed=this.options.backSpeed,this.backDelay=this.options.backDelay,this.strings=this.options.strings,this.strPos=0,this.arrayPos=0,this.stopNum=0,this.loop=this.options.loop,this.loopCount=this.options.loopCount,this.curLoop=0,this.stop=!1,this.showCursor=this.isInput?!1:this.options.showCursor,this.cursorChar=this.options.cursorChar,this.isInput=this.el.is("input"),this.attr=this.options.attr||(this.isInput?"placeholder":null),this.build()};s.prototype={constructor:s,init:function(){var t=this;t.timeout=setTimeout(function(){t.typewrite(t.strings[t.arrayPos],t.strPos)},t.startDelay)},build:function(){this.showCursor===!0&&(this.cursor=t('<span class="typed-cursor">'+this.cursorChar+"</span>"),0==this.el.parent().find(".typed-cursor").length&&this.el.after(this.cursor)),this.init()},typewrite:function(t,s){if(this.stop!==!0){var e=Math.round(70*Math.random())+this.typeSpeed,o=this;o.timeout=setTimeout(function(){var e=0,i=t.substr(s);if("^"===i.charAt(0)){var r=1;/^\^\d+/.test(i)&&(i=/\d+/.exec(i)[0],r+=i.length,e=parseInt(i)),t=t.substring(0,s)+t.substring(s+r)}o.timeout=setTimeout(function(){if(s===t.length){if(o.options.onStringTyped(o.arrayPos),o.arrayPos===o.strings.length-1&&(o.options.callback(),o.curLoop++,o.loop===!1||o.curLoop===o.loopCount))return;o.timeout=setTimeout(function(){o.backspace(t,s)},o.backDelay)}else{0===s&&o.options.preStringTyped(o.arrayPos);var e=o.baseText+t.substr(0,s+1);o.attr?o.el.attr(o.attr,e):o.el.text(e),s++,o.typewrite(t,s)}},e)},e)}},backspace:function(t,s){if(this.stop!==!0){var e=Math.round(70*Math.random())+this.backSpeed,o=this;o.timeout=setTimeout(function(){var e=o.baseText+t.substr(0,s);o.attr?o.el.attr(o.attr,e):o.el.text(e),s>o.stopNum?(s--,o.backspace(t,s)):s<=o.stopNum&&(o.arrayPos++,o.arrayPos===o.strings.length?(o.arrayPos=0,o.init()):o.typewrite(o.strings[o.arrayPos],s))},e)}},reset:function(){var t=this;clearInterval(t.timeout);var s=this.el.attr("id");this.el.after('<span id="'+s+'"/>'),this.el.remove(),this.cursor.remove(),t.options.resetCallback()}},t.fn.typed=function(e){return this.each(function(){var o=t(this),i=o.data("typed"),r="object"==typeof e&&e;i||o.data("typed",i=new s(this,r)),"string"==typeof e&&i[e]()})},t.fn.typed.defaults={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],typeSpeed:0,startDelay:0,backSpeed:0,backDelay:500,loop:!1,loopCount:!1,showCursor:!0,cursorChar:"|",attr:null,callback:function(){},preStringTyped:function(){},onStringTyped:function(){},resetCallback:function(){}}}(window.jQuery);
jQuery(function($) {
        $("#welcome").typed({
            strings: ["Welcome To My Webite ",  "Välkommen till min sida", "Velkommen til min hjemmeside"],
            typeSpeed: 45,
            backSpeed: 0,
            startDelay: 0,
            backDelay: 3500,
            loop: true,
            loopCount: false,
            showCursor: false,
            cursorChar: "|",
            attr: null
        });
    });