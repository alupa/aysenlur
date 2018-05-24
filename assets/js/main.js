/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

	});

	var allPanels = $('.accordion > dd').hide();
				
					$('.accordion > dt > a').click(function() {
						allPanels.slideUp();
						
						if($(this).parent().next().is(':hidden'))
						{
							$(this).parent().next().slideDown();
						}
						
						return false;
					});

	var container = document.getElementById("container");
				$('select[name="streaming-category"]').change(function(){
					switch($(this).val()){
						case "spotify": container.innerHTML = '<iframe src="https://open.spotify.com/embed?uri=spotify:album:3ucBdPtu9ttGtn6ebcMcyx" width="100%" height="80" frameborder="0" allowtransparency="true"></iframe>'; break;
						case "applems": container.innerHTML = '<iframe src="https://tools.applemusic.com/embed/v1/album/1323238086?country=us" width="100%" height="215" frameborder="0"></iframe>'; break;
						case "deezerm": container.innerHTML = '<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=false&width=700&height=350&color=007FEB&layout=dark&size=medium&type=album&id=53627732&app_id=1" width="100%" height="90"></iframe>'; break;
					}     
				});

				$('a[href="#gallery"]').click(function(){
					var image = document.getElementById("image");
					image.src = $(this).find("img").attr("src");
				});
})(jQuery);

var default_lang = 'es';
var current_lang = (localStorage.getItem("data-lang-ref") !== 'null') ? localStorage.getItem("data-lang-ref") : default_lang;
				var i18n = domI18n({
					selector: '[data-translatable]',
					separator: ' || ',
					languages: ['en', 'es'],
					defaultLanguage: default_lang,
					currentLanguage: current_lang
				});

				var nav = Array.prototype.slice.call(document.querySelectorAll('#header > ul li a[href="#"]'));

				nav.forEach(function (item) {
				item.onclick = function (e) {
					localStorage.setItem("data-lang-ref", this.getAttribute('data-lang-ref'));
					i18n.changeLanguage(this.getAttribute('data-lang-ref'));
					e.preventDefault();
				};
				});