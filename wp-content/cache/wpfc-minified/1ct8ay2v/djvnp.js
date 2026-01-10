(function($){
"use strict";
$('header a').click(function(){
$('header').before('<div id="preloader"></div>');
});
$('footer a').click(function(){
$('header').before('<div id="preloader"></div>');
});
$(window).on('load', function(){
$('#preloader').fadeOut('slow', function(){ $(this).remove(); });
});
jQuery('.stellarnav').stellarNav({
theme: 'light',
breakpoint: 960,
position: 'right',
phoneBtn: '+918918560266',
locationBtn: 'hello@amartadey.com'
});
$(window).on('scroll', function(){
if($(window).scrollTop() > 85){
$('header').addClass('navbar-fixed-top');
}else{
$('header').removeClass('navbar-fixed-top');
}});
$.scrollUp({
scrollText: '<i class="fa fa-arrow-up" aria-hidden="true"></i>',
easingType: 'linear',
scrollSpeed: 500,
animation: 'fade'
});
$('.counter-up').counterUp();
$('.smoothscroll').on('click', function(e){
e.preventDefault();
var target=this.hash;
$('html, body').stop().animate({
'scrollTop': $(target).offset().top - 80
}, 1200);
});
$('[data-countdown]').each(function(){
var $this=$(this),
finalDate=$(this).data('countdown');
$this.countdown(finalDate, function(event){
$this.html(event.strftime('<span class="cdown days"><span class="time-count">%-D</span> <p>Days</p></span> <span class="cdown hour"><span class="time-count">%-H</span> <p>Hour</p></span> <span class="cdown minutes"><span class="time-count">%M</span> <p>Min</p></span> <span class="cdown second"> <span><span class="time-count">%S</span> <p>Sec</p></span>'));
});
});
$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
disableOn: 700,
type: 'iframe',
mainClass: 'mfp-fade',
removalDelay: 300,
preloader: false,
fixedContentPos: false
});
$('.test-popup-link').magnificPopup({
type: 'image',
callbacks: {
resize: changeImgSize,
imageLoadComplete:changeImgSize,
change:changeImgSize
}});
function changeImgSize(){
var img=this.content.find('img');
img.css('max-height', '100%');
img.css('width', 'auto');
img.css('max-width', 'auto');
}
$('#container').imagesLoaded(function (){
$('.project-menu').on('click', 'button', function (){
var filterValue=$(this).attr('data-filter');
$grid.isotope({ filter: filterValue });
$('.project-menu').find('.checked').removeClass('checked');
$(this).addClass('checked');
});
var $grid=$('.grid_container').isotope({
itemSelector: '.grid',
percentPosition: true,
masonry: {
columnWidth: '.grid'
}})
});
function project_carousel(){
var owl=$(".project-carousel");
owl.owlCarousel({
loop: false,
margin: 40,
responsiveClass: true,
navigation: true,
navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
nav: false,
items: 5,
smartSpeed: 2000,
dots: false,
autoplay: false,
autoplayTimeout: 4000,
center: true,
autoWidth: true,
responsive: {
0: {
items: 1
},
480: {
items: 1
},
760: {
items: 3
}}
});
}
project_carousel();
function testimonial_carousel(){
var owl=$(".testimonial-carousel");
owl.owlCarousel({
loop: true,
margin: 30,
responsiveClass: true,
navigation: true,
navText: ["<i class='fal fa-long-arrow-left'></i>", "<i class='fal fa-long-arrow-right'></i>"],
nav: true,
items: 2,
smartSpeed: 2000,
dots: false,
autoplay: false,
autoplayTimeout: 4000,
center: false,
responsive: {
0: {
items: 1
},
480: {
items: 1
},
760: {
items: 2
}}
});
}
testimonial_carousel();
}(jQuery));