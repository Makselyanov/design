"use strict";
 $(document).ready(function(){
     var work_slider, experts_slider,  accordion,  btn_top_anchor, body, modal_win_top, input_phone, input_num, modal_thank;

     work_slider = $('.work_slider');
     experts_slider = $('.experts_slider');
     if(work_slider.length){
         work_slider.slick({
             dots: false,
             infinite: true,
             arrows:true,
             speed: 300,
             slidesToShow: 3,
             slidesToScroll: 1,
             lazyLoad: 'ondemand',
             responsive: [
                 {
                     breakpoint: 600,
                     settings: {
						 slidesToScroll: 1,
                         slidesToShow: 1
                     }
                 }
             ]
         });
     }
	 

	 experts_slider = $('.experts_slider');
     if(experts_slider.length){
		 if(experts_slider.find('.experts_slide').length < 6) {
		 experts_slider.append(experts_slider.html()); 
		 };
         experts_slider.slick({
             dots: false,
             infinite: true,
             arrows:true,
             speed: 300,
             slidesToShow: 5,
             slidesToScroll: 1,
             lazyLoad: 'ondemand',
			 fade:false,
             responsive: [
                 {
                     breakpoint: 1401,
                     settings: {
						 slidesToScroll: 1,
                         slidesToShow: 4
                     }
                 },
                 {
                     breakpoint: 1001,
                     settings: {
						 slidesToScroll: 1,
                         slidesToShow: 3
                     }
                 }
             ]
         });
     }


    

         $('.testimonials-slider').slick({
             dots: true,
             infinite: true,
             arrows:true,
             speed: 300,
             slidesToShow: 3,
             slidesToScroll: 1,
			 centerMode: true,
			 centerPadding: '0',
             lazyLoad: 'ondemand',
             responsive: [
                 {
                     breakpoint: 1000,
                     settings: {
						 slidesToScroll: 1,
                         slidesToShow: 1
                     }
                 }
             ]
         });

	 $('.testimonial-item .show-full').click(function(e){
		e.preventDefault();
			$(this).hide();
			$(this).closest('.testimonial-item').addClass('open');
	 });

     input_num = $('.input_num');
     input_phone = $('.input_phone');
     modal_thank = $('#modal-thank');

     accordion = $('.accordion');
     body = $('body');
     modal_win_top = 0;
     btn_top_anchor = $('.btn_top_anchor').eq(0);
     if(accordion.length){
         accordion.accordion({
              heightStyle: "content"
         });
         accordion.accordion( "refresh" );
     }
     var win_width = $(window).width();
     $(window).resize(function(){
         var  cur_win_width  = $(window).width();
         if(win_width !== cur_win_width){
             win_width = cur_win_width;
             accordion.accordion( "refresh" );
         } else {
             return 0;
         }
     });


     /*form*/

     $('#input_file').on('change', function(){
         var files = this.files;
         for(var a=0;a<files.length;a++)
             $("#file_list_name").html(files[a].name);
     });

     if(input_num.length){
         input_num.mask('000000');
         input_num.on('input',function(){
             var $this, value;
             $this = $(this);
             value = $this.val();
             if(value.length > 1 && value[0]==='0'){
                 value = value.slice(1);
                 $this.val(value);
             }
             if(value.length === 0){
                 $this.val('0');
             }
         });
     }
     if(input_phone.length){
         input_phone.mask('+7 (000) 000-00-00');
     }
     $(document).on('submit',".form",function (event) {
         var this1, form_data, data_thank, thank, data_ya_target, data_ga_target;
         this1 = $(this);
         data_ya_target = this1.attr('data-ya-target');
         data_ga_target = this1.attr('data-ga-target');
         data_thank = this1.attr('data-thank');
         if(data_thank && data_thank != "" && $(data_thank).length) {
             thank = $(data_thank);
         } else {
             thank = modal_thank;
         }

         form_data = new FormData(this1[0]);
         if (is_empty(this1)) {
             $.ajax({
                 type: "POST",
                 url: "wp-content/themes/linesdesign/php/mail.php",
                 data: form_data,
                 contentType:false,
                 processData:false,
                 success: function (res) {
                     this1.trigger('reset');
                     this1.closest('.modal-overlay').stop().fadeOut(200);
                     if((this1).closest('.modal-overlay').length === 0){
                         modal_win_top = $(window).scrollTop();
                     }
                     $('body, html').removeAttr('style');
                     if(this1.closest('.modal-overlay').length && is_ios()){
                         $('body, html').scrollTop(modal_win_top);
                     }
                     try{
                         yaCounter26277747.reachGoal(data_ya_target);
                     } catch (e){console.log('ya_error1');}

                     try{
                         ga('send', 'event', data_ya_target, 'SUBMIT');
                     } catch (e){console.log('ga_error');}
					 
                     var timing = setTimeout(function(){
                         center_modal(thank);
                         clearTimeout(timing);
                     }, 250);
                 }
             });
         }
         else {
         }
         return false;
     });
	 
	 $(document).on('click', '.btn_target', function(){
		 var data_ya_target = $(this).attr('data-ya-target');
		 data_ya_target = data_ya_target ? data_ya_target : '';
			try{
				 yaCounter26277747.reachGoal(data_ya_target);
			 } catch (e){console.log('ya_error2');}

			 try{
				 ga('send', 'event', data_ya_target, 'SUBMIT');
			 } catch (e){console.log('ga_error');}
			 
		 
	 });

     $(document).on('focus', '.invalid', function(){
         var form = $(this).closest('.form');
         if ($(this).hasClass('invalid')) {
             $(this).removeClass('invalid');
         }
     });
     $(document).on('click', '.btn_go_to', function(e){
         e.preventDefault();
         var $this, data_href, obj;
         $this = $(this);
         data_href = $this.attr('href') ? $this.attr('href') : $this.attr('data-href');
         obj = $(data_href).eq(0);
         if(obj.length){
             $('html, body').dequeue().stop().animate({scrollTop: obj.offset().top}, 1000);
         }
     });

     /*modal_windows*/

     $(document).on('click', '.modal-close', function(e){
         e.preventDefault();
         e.stopPropagation();
         to_close_modal(e);
     });
     $(document).on('click', '.modal-overlay', function(e){
         to_close_modal(e);
     });

     $(window).on('load resize scroll', function(){
         btn_top_view('.btn_top_anchor');
     });

     /*color box*/
     $(document).on('click', '.colorBox_item', function(e){
         var $this;
         $this = $(this);
         e.preventDefault();
         $this.colorbox({rel: $(this).attr("rel")});
         $this.closest('.colorBox_wrap').find('.colorBox_item').colorbox({rel: $(this).attr("rel")});
     });

     $('.work_slider').on('setPosition', function(event, slick, currentSlide, nextSlide){
         var $this, active_slide;
         $this = $(this);
         active_slide = $this.find('.slick-slide.slick-active').eq(1);
         active_slide.find('.colorBox_item').colorbox({rel: $(this).attr("rel")});
     });

     $(window).on('load scroll resize', function(){
         sticking('#stick_block', '.nav_anchor', 1);
     });

     $(document).on('click', '.button_menu', function(){
         var width_scroll, $this, win_width;
         $this = $(this);
         win_width = $(window).width();
         if($this.closest('.static_header_block').length && win_width > 800 ){
             return 0;
         }

         width_scroll = 0;
         $('html').toggleClass('menu_active');
         if($('html').hasClass('menu_active')){
             modal_win_top = $(window).scrollTop();
             if (is_scroll()) {
                 width_scroll = calc_scroll_width();
                 if(is_ios()){
                     $('html').css({'padding-right': width_scroll + 'px'});
                     $('html, body').css({'overflow': 'hidden'});
                 } else {
                     $('html').css({'padding-right': width_scroll + 'px'});
                     $('body').css({'overflow': 'hidden'});
                 }
             }
         } else {
             menu_to_close();
         }

     });

     $(document).on('click', '.menu_active', function(event){
         var e_target;
         e_target = $(event.target);
         if(e_target.closest('.button_menu').length || e_target.closest('.head_nav').length){
             return 0;
         } else {
             menu_to_close();
         }
     });

     $(document).on('click', '.menu a', function(event){
         menu_to_close();
     });




     $(document).on('click', '.nav_menu a,  .menu_close', function(){
         menu_to_close();
     });

     function menu_to_close(){
         $('html').removeClass('menu_active');
         $('body, html').removeAttr('style');
         if(is_ios()){
             $(window).scrollTop(modal_win_top);
         }
     }

     function sticking(selector,anchor,stick_mode){
         var obj, obj_wrap, obj_height, win_top,obj_anchor, space_top, mode, obj_wrap_exist;
         anchor = anchor || '';
         mode = stick_mode || 0;
         obj = $(selector).eq(0);
         obj_anchor = $(anchor).eq(0);
         if(obj_anchor.length) {
             space_top = parseInt(obj_anchor.offset().top, 10);
         } else {
             space_top = 500;
         }
         obj_wrap = obj.closest('.stick_wrap');
         obj_wrap_exist = obj_wrap.length ? 1 : 0;
         obj_height = obj.height();
         win_top = $(window).scrollTop();
         if(win_top >= space_top){
             if(mode === 0){
                 if(obj_wrap_exist){
                     obj_wrap.css({"min-height":obj_height + "px"});
                 }
             } else {
                 if(!(obj.hasClass('stick')) && obj_wrap_exist){
                     obj_wrap.css({"min-height":obj_height + "px"});
                 }
             }
             obj.addClass('stick');
         } else {
             obj.removeClass('stick');
         }
     }

     function init_color_box(selector){
         var obj, data_group;
         obj = $(selector);
         if(obj.length === 0){
             return 0;
         }
         obj.each(function(){
             data_group = $(this).attr('rel');
             data_group = data_group ? data_group : false;
             $(this).colorbox({
                 innerWidth: 0, innerHeight: 0, maxWidth:'100%',  maxHeight:'100%', rel: data_group
             });
         });
     }

     function to_close_modal(e, selector) {
         var e_target;
         selector = $(selector);
         if(selector.length){
             e_target = selector;
         } else {
             e_target = $(e.target);
         }
         if(e_target.closest('.modal-block').length && e_target.closest('.modal-close').length == 0 ) {
             return 0;
         }
         e_target.closest('.modal-overlay').stop().fadeOut(200);
         $('body, html')
             .removeAttr('style');
         if(is_ios()){
             $('body, html').scrollTop(modal_win_top);
         }
     }

     function center_modal(selector, auto_exit_time) {
         var obj, body, width_scroll;
         modal_win_top = $(window).scrollTop();
         body = $('body');
         obj = $(selector);
         width_scroll = 0;
         if (obj.length == 0) {
             console.log('объект не найден');
             return 0;
         }
         if (is_scroll()) {
             width_scroll = calc_scroll_width();
             if(is_ios()){
                 $('html').css({'padding-right': width_scroll + 'px'});
                 $('html, body').css({'overflow': 'hidden'});
                 obj.fadeIn(200).css({'top': 0 + 'px'});
             } else {
                 $('html').css({'padding-right': width_scroll + 'px'});
                 $('body').css({'overflow': 'hidden'});
                 obj.fadeIn(200).css({'top': modal_win_top + 'px'});
             }
         }
         if(auto_exit_time) {
             var timing = setTimeout(function(){
                 obj.fadeOut(200);
                 $('body, html')
                     .removeAttr('style');
                 if(is_ios()){
                     $('body, html').scrollTop(modal_win_top);
                 }
                 clearTimeout(timing);
             },auto_exit_time )
         }

     }
     $(document).on('click', '.btn-get-modal', function(e){
         var $this, data_id, data_info, data_title, obj,input_info, modal_title, data_btn_text, modal_btn_submit, data_ya_target;
         e.preventDefault();
         $this = $(this);
         data_ya_target = $this.attr('data-ya-target');
         data_id = $this.attr('data-id');
         data_info = $this.attr('data-info');
         data_title = $this.attr('data-title');
         data_btn_text = $this.attr('data-btn-text');
         obj = $(data_id);
         input_info  = obj.find('input[name="info"]');
         modal_title = obj.find('.modal_title').eq(0);
         modal_btn_submit =  obj.find('.modal_btn_submit').eq(0);

         if(obj.length){
             $('.modal-overlay').fadeOut(200);
             center_modal(data_id);
             if(data_ya_target && data_ya_target !='' && data_ya_target.length && obj.find('form').length){
                 obj.find('form').attr('data-ya-target',data_ya_target);
             }else {
                 obj.find('form').removeAttr(data-ya-target);
             }
             if(data_info && data_info !='' && input_info.length){
                 input_info.val(data_info);
             }
             if(data_title && data_title !='' && modal_title.length){
                 modal_title.html(data_title);
             }
             if(data_btn_text && data_btn_text !='' && modal_btn_submit.length){
                 modal_btn_submit.html(data_btn_text);
             }
         }
     });

     $(document).on('click', '.btn_top', function(){
         $('html, body').dequeue().stop().animate({scrollTop: 0}, 1000);

     });

     var wow = new WOW(
         {
             boxClass: 'wow',
             animateClass: 'animated',
             offset: 150,
             mobile: false,
             live: true
         }
     );
     wow.init();

     $(document).on('click','.btn_target', function(){
         var $this, data_ya_target;
         $this = $(this);
         data_ya_target = $this.attr('data-ya-target');
         try{
             yaCounter26277747.reachGoal(data_ya_target);
         } catch (e){console.log('ya_error');}
     });

     $(document).on('click', '.btn_description_view', function(){
         $(this).closest('.description_box').toggleClass('view_hide');

     });

     var w_top, e_top, w_height, e_height, e_kg, show = true;
     function is_visible(selector){
         w_top = $(window).scrollTop();
         e_top = $(selector).offset().top;
         w_height = $(window).height();
         e_kg =  w_height*0.1;
         e_height = $(selector).outerHeight();
         if ((w_top + w_height) > e_top + e_kg && w_top < (e_top + e_height - e_kg)) return 1;
         else  return 0;
     }
     function is_empty(elem) {
         var mas, objects;
         objects = elem.find('.req');
         mas = [];
         objects.each(function () {
             if ($(this).val().length == 0 || !$(this).val().replace(/\s+/g, '')) {
                 $(this).addClass('invalid');
                 mas.push("0");
             } else if ($(this).hasClass('input_phone') && $(this).val().length !== 18) {
                 $(this).addClass('invalid');
                 mas.push("0");
             }
             else{
                 $(this).removeClass('invalid');
             }
         });
         if (mas.length == 0) return 1;
         else return 0;
     }

     function is_ios (){
         var user_agent_value = (navigator.userAgent).toLowerCase();
         return user_agent_value.match(/iPhone|iPad|iPod/i);
     }
     function is_mobile (){
         var user_agent_value = (navigator.userAgent).toLowerCase();
         return user_agent_value.match(/iPhone|iPad|iPod|android|mobile|phone/i);
     }
     function is_scroll() {
         if($(document).height() > $(window).height()) {
             return true;
         } else {
             return false
         }
     }
     function calc_scroll_width() {
         var hide_block, width_scroll, css_text;
         hide_block = document.createElement('div');
         css_text = "width:100%!important; height:100px; position:fixed; left:100%; top:100%; overflow:scroll;";
         hide_block.id = "hide_block";
         hide_block.setAttribute('style', css_text);
         document.body.appendChild(hide_block);
         width_scroll = parseFloat((hide_block.offsetWidth) - (hide_block.clientWidth),10);
         hide_block.parentElement.removeChild(hide_block);
         return width_scroll;
     }

     function btn_top_view(btn_top_anchor) {
         var btn_top,height_top;
         btn_top = $('.btn_top');
         if(!btn_top.length) {return 0;}
         btn_top_anchor = $(btn_top_anchor);
         if(btn_top_anchor.length){
             height_top = parseInt(btn_top_anchor.offset().top,10);
         } else {
             height_top =  500;
         }
         if($(window).scrollTop()>=height_top){
             $('.btn_top').addClass('active');
         } else {
             $('.btn_top').removeClass('active');
         }
     }
	 

	 
     function to_rnd_mas(rnd_mas, time, id_tag){
         var rnd_mas_len, action_mas, k, tag_obj;
         tag_obj = $(id_tag).eq(0);
         rnd_mas_len = rnd_mas.length;
         action_mas = generateArrayRandomNumber (0, rnd_mas_len-1);
         k = 0;
         setInterval(function() {
             if(k < rnd_mas_len ){
                 tag_obj.html(rnd_mas[action_mas[k]]);
                 ++k;

             } else {
                 action_mas = generateArrayRandomNumber (0, rnd_mas_len-1);
                 k = 0;
                 tag_obj.html(rnd_mas[action_mas[k]]);
                 ++k;
             }
         },time);
     }
	 

     function generateArrayRandomNumber (min, max) {
         var totalNumbers 		= max - min + 1,
             arrayTotalNumbers 	= [],
             arrayRandomNumbers 	= [],
             tempRandomNumber;
         while (totalNumbers--) {
             arrayTotalNumbers.push(totalNumbers + min);
         }
         while (arrayTotalNumbers.length) {
             tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
             arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
             arrayTotalNumbers.splice(tempRandomNumber, 1);
         }
         return (arrayRandomNumbers);
     }
	 
 });
