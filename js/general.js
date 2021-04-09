$(document).ready(function() {

	$.validator.addMethod('phoneRU',
		function(phone_number, element) {
			return this.optional(element) || phone_number.match(/^\+7 \d{3} \d{3}\-\d{2}\-\d{2}$/);
		},
		'Ошибка заполнения'
	);

	$('body').on('focus', '.form-input input, .form-input textarea', function() {
		$(this).parent().addClass('focus');
	});

	$('body').on('blur', '.form-input input, .form-input textarea', function() {
		$(this).parent().removeClass('focus');
		if ($(this).val() != '') {
			$(this).parent().addClass('full');
		} else {
			$(this).parent().removeClass('full');
		}
	});

	$('body').on('input', '.form-input textarea', function() {
		this.style.height = '242px';
		this.style.height = (this.scrollHeight) + 'px';
	});

	$('body').on('change', '.form-file input', function() {
		var curInput = $(this);
		var curField = curInput.parents().filter('.form-file');
		var curName = curInput.val().replace(/.*(\/|\\)/, '');
		if (curName != '') {
			curField.find('.form-file-name').html(curName);
		} else {
			curField.find('.form-file-name').html('');
		}
	});

	$.validator.addMethod('inputDate',
		function(curDate, element) {
			if (this.optional(element) && curDate == '') {
				return true;
			} else {
				if (curDate.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
					var userDate = new Date(curDate.substr(6, 4), Number(curDate.substr(3, 2)) - 1, Number(curDate.substr(0, 2)));
					if ($(element).attr('min')) {
						var minDateStr = $(element).attr('min');
						var minDate = new Date(minDateStr.substr(6, 4), Number(minDateStr.substr(3, 2)) - 1, Number(minDateStr.substr(0, 2)));
						if (userDate < minDate) {
							$.validator.messages['inputDate'] = 'Минимальная дата - ' + minDateStr;
							return false;
						}
					}
					if ($(element).attr('max')) {
						var maxDateStr = $(element).attr('max');
						var maxDate = new Date(maxDateStr.substr(6, 4), Number(maxDateStr.substr(3, 2)) - 1, Number(maxDateStr.substr(0, 2)));
						if (userDate > maxDate) {
							$.validator.messages['inputDate'] = 'Максимальная дата - ' + maxDateStr;
							return false;
						}
					}
					return true;
				} else {
					$.validator.messages['inputDate'] = 'Дата введена некорректно';
					return false;
				}
			}
		},
		''
	);

	$('form').each(function() {
		initForm($(this));
	});

	$('body').on('change', '.notEmailEquals', function(e) {
		var curField = $(this);
		window.setTimeout(function() {
			var curValue = curField.val();
			if (curValue !== '') {
				var curForm = curField.parents().filter('form');
				var count = 0;
				curForm.find('.notEmailEquals').each(function() {
					if (curValue == $(this).val()) {
						count++;
					}
				});
				if (count > 1) {
					curField.addClass('isnotequal-error');
					curField.addClass('error').removeClass('valid');
					curField.parent().find('label.error').remove();
					curField.parent().append('<label class="error">Данное значение уже указано</label>');
				} else {
					curField.removeClass('isnotequal-error');
					if (!curField.hasClass('emailcheck-error')) {
						curField.removeClass('error').addClass('valid');
						curField.parent().find('label.error').remove();
					}
				}
			}
		}, 100);
	});

	$('body').on('change', '.inncheck', function(e) {
		var curField = $(this);
		window.setTimeout(function() {
			var curValue = curField.val();
			var curId = curField.data('current-id') ? curField.data('current-id') : '';
			
			if (curValue !== '') {
				var curForm = curField.parents().filter('form');
				$.ajax({
					type: 'POST',
					url: '/local/ajax/register/inn.php?' + curField.attr('name') + '=' + curValue + '&curID=' + curId,
					processData: false,
					contentType: false,
					dataType: 'html',
					data: null,
					cache: false
				}).done(function(html) {
					if (html == 'false') {
						curField.addClass('error').removeClass('valid');
						curField.parent().find('label.error').remove();
						curField.parent().append('<label class="error">Данное значение уже зарегистрировано</label>');
					} else {
						curField.removeClass('error').addClass('valid');
						curField.parent().find('label.error').remove();
					}
				});
			}
		}, 100);
	});

	$('body').on('change', '.emailcheck', function(e) {
		var curField = $(this);
		window.setTimeout(function() {
			var curValue = curField.val();
			var curId = curField.data('current-id') ? curField.data('current-id') : '';

			if (curValue !== '') {
				var curForm = curField.parents().filter('form');
				$.ajax({
					type: 'POST',
					url: '/local/ajax/register/email.php?' + 'USER_EMAIL' + '=' + curValue + '&curID=' + curId,
					processData: false,
					contentType: false,
					dataType: 'html',
					data: null,
					cache: false
				}).done(function(html) {
					if (html == 'false') {
						curField.addClass('error').removeClass('valid');
						curField.addClass('emailcheck-error');
						curField.parent().find('label.error').remove();
						curField.parent().append('<label class="error">Данное значение уже зарегистрировано</label>');
					} else {
						curField.removeClass('emailcheck-error');
						if (!curField.hasClass('isnotequal-error')) {
							curField.removeClass('error').addClass('valid');
							curField.parent().find('label.error').remove();
						}
					}
				});
			}
		}, 100);
	});

	$('.gallery').each(function() {
		var curGallery = $(this);
		curGallery.on('init', function(event, slick) {
			var curSlide = curGallery.find('.slick-current');
			var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
			curGallery.find('.slick-dots').css({'top': curPhotoHeight});
			curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
			curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
		});
		var options = {
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow: '<button type="button" class="slick-prev"></button>',
			nextArrow: '<button type="button" class="slick-next"></button>',
			adaptiveHeight: true,
			fade: true,
			dots: true
		};
		if (curGallery.next().hasClass('gallery-preview')) {
			options.dots = false;
			options.responsive = [
				{
					breakpoint: 1169,
					settings: {
						dots: true
					}
				}
			];
		}
		curGallery.slick(
			options
		).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			var curSlide = curGallery.find('.slick-slide:not(.slick-cloned)').eq(nextSlide);
			var curPhotoHeight = curSlide.find('.gallery-item-photo').outerHeight();
			curGallery.find('.slick-dots').css({'top': curPhotoHeight});
			curGallery.find('.slick-prev').css({'top': curPhotoHeight / 2});
			curGallery.find('.slick-next').css({'top': curPhotoHeight / 2});
			if (curGallery.next().hasClass('gallery-preview')) {
				curGallery.next().find('.gallery-preview-item').removeClass('active');
				curGallery.next().find('.gallery-preview-item').eq(nextSlide).addClass('active');
			}
		}).on('setPosition', function(event, slick) {
			if (curGallery.next().hasClass('gallery-preview')) {
				var currentSlide = curGallery.slick('slickCurrentSlide');
				curGallery.next().find('.gallery-preview-item').removeClass('active');
				curGallery.next().find('.gallery-preview-item').eq(currentSlide).addClass('active');
			}
		});

		if (curGallery.next().hasClass('gallery-preview')) {
			var galleryPreview = curGallery.next();
			galleryPreview.mCustomScrollbar({
				axis: 'x'
			});
			galleryPreview.find('.gallery-preview-item a').click(function(e) {
				var curIndex = galleryPreview.find('.gallery-preview-item').index($(this).parent());
				curGallery.slick('slickGoTo', curIndex);
				e.preventDefault();
			});
		}
	});

	$('.header-lang-link').click(function(e) {
		$('.header-lang').toggleClass('open');
		e.preventDefault();
	});

	$(document).click(function(e) {
		if ($(e.target).parents().filter('.header-lang').length == 0) {
			$('.header-lang').removeClass('open');
		}
	});

	$('.tabs').each(function() {		   
		var curTabs = $(this);
		var activeTab = $(this).data("active-tab");
		if(activeTab == undefined) activeTab = 0;
		var curTabsMenu = curTabs.find('> .tabs-menu');
		var curTabsContainer = curTabs.find('> .tabs-container');
		var newHTML = '';
		curTabsContainer.find('> .tabs-content').each(function() {
			var curTabTitle = $(this).find('> .tabs-content-title').html();
			newHTML += '<div class="tabs-menu-item"><a href="#">' + curTabTitle + '</a></div> ';
		});
		curTabsContainer.find('> .tabs-content').eq(activeTab).addClass('active');
		curTabsMenu.html(newHTML);
		curTabsMenu.find('.tabs-menu-item').eq(activeTab).addClass('active');
		curTabsMenu.mCustomScrollbar({
			axis: 'x'
		});
	});

	$('body').on('click', '.tabs-menu-item a', function(e) {
		var curLi = $(this).parent();
		if (!curLi.hasClass('active')) {
			var curTabs = curLi.parents().filter('.tabs');
			curTabs.find('.tabs-menu-item.active').removeClass('active');
			curLi.addClass('active');
			var curIndex = curTabs.find('.tabs-menu-item').index(curLi);
			curTabs.find('.tabs-content.active').removeClass('active');
			curTabs.find('.tabs-content').eq(curIndex).addClass('active');
		}
		e.preventDefault();
	});

	$('.header-menu').each(function() {
		$('.header-menu > ul').append('<li class="header-menu-hover"></li>');
		var $navActive = $('.header-menu .header-menu-hover');

		if ($('.header-menu > ul > li.active').length > 0) {
			$navActive
				.width($('.header-menu > ul > li.active').width())
				.css('left', $('.header-menu > ul > li.active').offset().left - $('.header-menu > ul').offset().left)
				.data('origLeft', $navActive.position().left)
				.data('origWidth', $navActive.width());
		} else {
			$navActive
				.data('origLeft', 0)
				.data('origWidth', 0);
		}

		$('.header-menu > ul > li > a').hover(
			function() {
				var $el = $(this);
				var leftPos = $el.parent().offset().left - $('.header-menu > ul').offset().left;
				var newWidth = $el.parent().width();
				$navActive.stop().animate({
					left: leftPos,
					width: newWidth
				});
			},

			function() {
				$navActive.stop().animate({
					left: $navActive.data('origLeft'),
					width: $navActive.data('origWidth')
				});
			}
		);
	});

	$('.up-link').click(function(e) {
		$('html, body').animate({'scrollTop': 0});
		e.preventDefault();
	});

	$('body').on('click', '.window-link', function(e) {
		windowOpen($(this).attr('href'));
		e.preventDefault();
	});

	$('body').on('keyup', function(e) {
		if (e.keyCode == 27) {
			windowClose();
		}
	});

	$(document).click(function(e) {
		if ($(e.target).hasClass('window')) {
			windowClose();
		}
	});

	$('body').on('click', '.window-close, .window-close-btn', function(e) {
		windowClose();
		e.preventDefault();
	});

	$('.mobile-menu-link').click(function(e) {
		var curWidth = $(window).width();
		if (curWidth < 480) {
			curWidth = 480;
		}
		var curScroll = $(window).scrollTop();
		$('html').addClass('mobile-menu-open');
		$('meta[name="viewport"]').attr('content', 'width=' + curWidth);
		$('html').data('scrollTop', curScroll);
		$('.wrapper').css('margin-top', -curScroll);
		e.preventDefault();
	});

	$('.mobile-menu-close').click(function(e) {
		$('html').removeClass('mobile-menu-open');
		$('meta[name="viewport"]').attr('content', 'width=device-width');
		$('.wrapper').css('margin-top', 0);
		$(window).scrollTop($('html').data('scrollTop'));
		e.preventDefault();
	});

	$('.mobile-menu-bg').click(function() {
		$('html').removeClass('mobile-menu-open');
		$('meta[name="viewport"]').attr('content', 'width=device-width');
		$('.wrapper').css('margin-top', 0);
		$(window).scrollTop($('html').data('scrollTop'));
	});

	$('.mobile-menu-header-lang-link').click(function(e) {
		$('.mobile-menu-header-lang').toggleClass('open');
		e.preventDefault();
	});

	$(document).click(function(e) {
		if ($(e.target).parents().filter('.mobile-menu-header-lang').length == 0) {
			$('.mobile-menu-header-lang').removeClass('open');
		}
	});

	$('.footer-block-title').click(function(e) {
		$(this).parent().toggleClass('open');
	});

	$('body').on('click', '.tabs-content-title', function(e) {
		$(this).parent().toggleClass('open');
	});

	$('body').on('click', '.contacts-item-mobile-link', function(e) {
		$(this).parent().parent().parent().toggleClass('open');
		e.preventDefault();
	});

	$('body').on('click', '.text-with-hint-link', function(e) {
		var curBlock = $(this).parent();
		if (curBlock.hasClass('open')) {
			curBlock.removeClass('open');
		} else {
			$('.text-with-hint.open').removeClass('open');
			curBlock.removeClass('to-right');
			curBlock.addClass('open');
			var curPopup = curBlock.find('.text-with-hint-popup');
			if (curPopup.offset().left + curPopup.outerWidth() > $(window).width()) {
				curBlock.addClass('to-right');
			}
		}
		e.preventDefault();
	});

	$('body').on('click', '.text-with-hint-popup-close', function(e) {
		$('.text-with-hint.open').removeClass('open');
		e.preventDefault();
	});

	$(document).click(function(e) {
		if ($(e.target).parents().filter('.text-with-hint').length == 0) {
			$('.text-with-hint.open').removeClass('open');
		}
	});

	$('body').on('click', '.faq-item-title-sublink[data-href]', function(e) {
		window.location.href = $(this).attr('data-href');
		e.preventDefault();
	});

	$('body').on('click', '.registration-item-header-remove a', function(e) {
		$(this).parents().filter('.registration-item').remove();
		if ($('.registration .recommend-list .registration-item').length == 0) {
			$('.registration .registration-recommend-btn').removeClass('hidden');
		}
		if ($('.window .recommend-list .registration-item').length == 0) {
			$('.window .registration-recommend-btn').removeClass('hidden');
		}
		e.preventDefault();
	});

	$('body').on('click', '.registration-list-btn a', function(e) {
		var curForm = $(this).parents().filter('form');
		var newHTML = curForm.parent().find('.list-template').html();
		var newID = curForm.find('.registration-list .registration-item').length;
		newHTML = newHTML.replace(/_COUNTER_/g, newID + 1);
		newHTML = newHTML.replace(/_ID_/g, newID);
		curForm.find('.registration-list').append(newHTML);
		e.preventDefault();
	});

	$('body').on('click', '.registration-recommend-btn a', function(e) {
		var curForm = $(this).parents().filter('form');
		var newHTML = curForm.parent().find('.recommend-template').html();
		var newID = curForm.find('.recommend-list .registration-item').length;
		newHTML = newHTML.replace(/_ID_/g, newID);
		curForm.find('.recommend-list').append(newHTML);
		if ($('.registration .recommend-list .registration-item').length == 0) {
			$('.registration .registration-recommend-btn').removeClass('hidden');
		} else {
			$('.registration .registration-recommend-btn').addClass('hidden');
		}
		if ($('.window .recommend-list .registration-item').length == 0) {
			$('.window .registration-recommend-btn').removeClass('hidden');
		} else {
			$('.window .registration-recommend-btn').addClass('hidden');
		}
		e.preventDefault();
	});

	$('body').on('click', '.faq-item-title a', function(e) {
		var curItem = $(this).parent().parent();
		curItem.toggleClass('open');
		curItem.find('.faq-item-answer').stop(true, true).slideToggle();
		e.preventDefault();
	});

	$('.event-cards').each(function() {
		var curTabs = $(this);
		var curTabsMenu = curTabs.find('> .event-cards-tabs');
		var curTabsContainer = curTabs.find('> .event-cards-tabs-container');
		var newHTML = '';
		curTabsContainer.find('> .event-cards-tabs-content').each(function() {
			var curTabTitle = $(this).find('> .event-cards-tabs-content-title').html();
			newHTML += '<a href="#" class="event-cards-tabs-item">' + curTabTitle + '</a>';
		});
		curTabsContainer.find('> .event-cards-tabs-content').eq(0).addClass('active');
		curTabsMenu.append(newHTML);
		curTabsMenu.find('.event-cards-tabs-item').eq(0).addClass('active');
	});

	$('body').on('click', '.event-cards-tabs-item', function(e) {
		var curLi = $(this);
		if (!curLi.hasClass('active')) {
			var curTabs = curLi.parents().filter('.event-cards');
			curTabs.find('.event-cards-tabs-item.active').removeClass('active');
			curLi.addClass('active');
			var curIndex = curTabs.find('.event-cards-tabs-item').index(curLi);
			curTabs.find('.event-cards-tabs-content.active').removeClass('active');
			curTabs.find('.event-cards-tabs-content').eq(curIndex).addClass('active');
		}
		e.preventDefault();
	});

	$('.event-cards-tabs-content-title').click(function(e) {
		$(this).parent().toggleClass('open');
	})

	$('.mobile-menu-list ul li').each(function() {
		if ($(this).find('ul').length > 0) {
			$(this).addClass('with-submenu');
		}
	});

	$('.mobile-menu-list ul li a').click(function(e) {
		if ($(this).parent().find('ul').length > 0) {
			$(this).parent().toggleClass('open');
			e.preventDefault();
		}
	});
	
});

function initForm(curForm) {
	if (curForm.hasClass('cat-ajax-form')) return;

	curForm.find('.form-input input, .form-input textarea').each(function() {
		if ($(this).val() != '') {
			$(this).parent().addClass('full');
		}
	});

	curForm.find('.form-input input:focus, .form-input textarea:focus').each(function() {
		$(this).trigger('focus');
	});

	curForm.find('input.phoneRU').mask('+7 000 000-00-00');

	curForm.find('.form-input textarea').each(function() {
		$(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
	});

	curForm.find('.form-input-date input').mask('00.00.0000');
	curForm.find('.form-input-date input').attr('autocomplete', 'off');
	curForm.find('.form-input-date input').addClass('inputDate');

	curForm.find('.form-input-date input').on('keyup', function() {
		var curValue = $(this).val();
		if (curValue.match(/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/)) {
			var isCorrectDate = true;
			var userDate = new Date(curValue.substr(6, 4), Number(curValue.substr(3, 2)) - 1, Number(curValue.substr(0, 2)));
			if ($(this).attr('min')) {
				var minDateStr = $(this).attr('min');
				var minDate = new Date(minDateStr.substr(6, 4), Number(minDateStr.substr(3, 2)) - 1, Number(minDateStr.substr(0, 2)));
				if (userDate < minDate) {
					isCorrectDate = false;
				}
			}
			if ($(this).attr('max')) {
				var maxDateStr = $(this).attr('max');
				var maxDate = new Date(maxDateStr.substr(6, 4), Number(maxDateStr.substr(3, 2)) - 1, Number(maxDateStr.substr(0, 2)));
				if (userDate > maxDate) {
					isCorrectDate = false;
				}
			}
			if (isCorrectDate) {
				var myDatepicker = $(this).data('datepicker');
				if (myDatepicker) {
					var curValueArray = curValue.split('.');
					myDatepicker.selectDate(new Date(Number(curValueArray[2]), Number(curValueArray[1]) - 1, Number(curValueArray[0])));
					myDatepicker.show();
					$(this).focus();
				}
			} else {
				$(this).addClass('error');
				return false;
			}
		}
	});

	curForm.find('.form-input-date input').each(function() {
		var minDateText = $(this).attr('min');
		var minDate = null;
		if (typeof (minDateText) != 'undefined') {
			var minDateArray = minDateText.split('.');
			minDate = new Date(Number(minDateArray[2]), Number(minDateArray[1]) - 1, Number(minDateArray[0]));
		}
		var maxDateText = $(this).attr('max');
		var maxDate = null;
		if (typeof (maxDateText) != 'undefined') {
			var maxDateArray = maxDateText.split('.');
			maxDate = new Date(Number(maxDateArray[2]), Number(maxDateArray[1]) - 1, Number(maxDateArray[0]));
		}
		if ($(this).hasClass('maxDate1Year')) {
			var curDate = new Date();
			curDate.setFullYear(curDate.getFullYear() + 1);
			curDate.setDate(curDate.getDate() - 1);
			maxDate = curDate;
			var maxDay = curDate.getDate();
			if (maxDay < 10) {
				maxDay = '0' + maxDay
			}
			var maxMonth = curDate.getMonth() + 1;
			if (maxMonth < 10) {
				maxMonth = '0' + maxMonth
			}
			$(this).attr('max', maxDay + '.' + maxMonth + '.' + curDate.getFullYear());
		}
		var startDate = new Date();
		if (typeof ($(this).attr('value')) != 'undefined') {
			var curValue = $(this).val();
			if (curValue != '') {
				var startDateArray = curValue.split('.');
				startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
			}
		}
		$(this).datepicker({
			language: 'ru',
			minDate: minDate,
			maxDate: maxDate,
			startDate: startDate,
			toggleSelected: false
		});
		if (typeof ($(this).attr('value')) != 'undefined') {
			var curValue = $(this).val();
			if (curValue != '') {
				var startDateArray = curValue.split('.');
				startDate = new Date(Number(startDateArray[2]), Number(startDateArray[1]) - 1 , Number(startDateArray[0]));
				$(this).data('datepicker').selectDate(startDate);
			}
		}
	});

	curForm.find('.form-select select').each(function() {
		var curSelect = $(this);
		var options = {
			minimumResultsForSearch: 20
		}
		if (curSelect.parent().hasClass('form-select-ajax')) {
			options['ajax'] = {
					url: curSelect.parent().attr('data-link'),
					dataType: 'json'
			};
			options['minimumInputLength'] = 3;
			options['placeholder'] = curSelect.parent().attr('data-placeholder');
		}

		curSelect.select2(options);

		curSelect.parent().find('.select2-container').attr('data-placeholder', curSelect.attr('data-placeholder'));
		curSelect.parent().find('.select2-selection').attr('data-placeholder', curSelect.attr('data-placeholder'));
		curSelect.on('select2:select', function(e) {
			$(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
			curSelect.parent().find('select.error').removeClass('error');
			curSelect.parent().find('label.error').remove();
		});

		curSelect.on('select2:unselect', function(e) {
			if (curSelect.find('option:selected').length == 0) {
				curSelect.parent().find('.select2-container').removeClass('select2-container--full');
			}
		});

		if (curSelect.val() != '' && curSelect.val() !== null) {
			curSelect.trigger({type: 'select2:select'})
			curSelect.parent().find('.select2-container').addClass('select2-container--full');
		}
	});

	var curFormOptions = {
		ignore: '',
		invalidHandler: function(event, validator) {
			var curForm = $(this);
			curForm.find('.notEmailEquals').each(function() {
				var curField = $(this);
				var curValue = curField.val();
				if (curValue !== '') {
					var count = 0;
					curForm.find('.notEmailEquals').each(function() {
						if (curValue == $(this).val()) {
							count++;
						}
					});
					if (count > 1) {
						curField.addClass('error').removeClass('valid');
						curField.parent().find('label.error').remove();
						curField.parent().append('<label class="error">Данное значение уже указано</label>');
					} else {
						curField.removeClass('error').addClass('valid');
						curField.parent().find('label.error').remove();
					}
				}
			});
			curForm.find('.inncheck').each(function(e) {
				var curField = $(this);
				var curValue = curField.val();
				var curId = curField.data('current-id') ? curField.data('current-id') : '';

				if (curValue !== '') {
					$.ajax({
						type: 'POST',
						url: '/local/ajax/register/inn.php?' + curField.attr('name') + '=' + curValue + '&curID=' + curId,
						processData: false,
						contentType: false,
						dataType: 'html',
						data: null,
						cache: false
					}).done(function(html) {
						if (html == 'false') {
							curField.addClass('error').removeClass('valid');
							curField.parent().find('label.error').remove();
							curField.parent().append('<label class="error">Данное значение уже зарегистрировано</label>');
						} else {
							curField.removeClass('error').addClass('valid');
							curField.parent().find('label.error').remove();
						}
					});
				}
			});
			curForm.find('.emailcheck').each(function(e) {
				var curField = $(this);
				var curValue = curField.val();
				var curId = curField.data('current-id') ? curField.data('current-id') : '';
	
				if (curValue !== '') {
					$.ajax({
						type: 'POST',
						url: '/local/ajax/register/email.php?' + 'USER_EMAIL' + '=' + curValue + '&curID=' + curId,
						processData: false,
						contentType: false,
						dataType: 'html',
						data: null,
						cache: false
					}).done(function(html) {
						if (html == 'false') {
							curField.addClass('error').removeClass('valid');
							curField.addClass('emailcheck-error');
							curField.parent().find('label.error').remove();
							curField.parent().append('<label class="error">Данное значение уже зарегистрировано</label>');
						} else {
							curField.removeClass('emailcheck-error');
							if (!curField.hasClass('isnotequal-error')) {
								curField.removeClass('error').addClass('valid');
								curField.parent().find('label.error').remove();
							}
						}
					});
				}
			});

			if (curForm.parents().filter('.window-online').length == 1 || curForm.parents().filter('.meet-add-form').length == 1) {
				if (curForm.find('.window-online-type input:checked').length == 0) {
					curForm.find('.window-online-type h3 .error').addClass('visible');
				} else {
					curForm.find('.window-online-type h3 .error').removeClass('visible');
				}
				if (curForm.find('.window-online-time .window-online-time-content.active input:checked').length == 0) {
					curForm.find('.window-online-time h3 .error').addClass('visible');
				} else {
					curForm.find('.window-online-time h3 .error').removeClass('visible');
				}
				if (curForm.find('.window-online-date input:checked').length == 0) {
					curForm.find('.window-online-date h3 .error').addClass('visible');
				} else {
					curForm.find('.window-online-date h3 .error').removeClass('visible');
				}
				if ($('.window-online h3 .error.visible').length > 0) {
					$('.window').animate({'scrollTop': 0});
				}
				if ($('.meet-add-form h3 .error.visible').length > 0) {
					$('html, body').animate({'scrollTop': $('.meet-add-form h3 .error.visible').eq(0).offset().top - $('header').height() - 50});
				}

			}
		},
		submitHandler: function(form) {
			var curForm = $(form);
			var result = true;
			curForm.find('.notEmailEquals').each(function() {
				var curField = $(this);
				var curValue = curField.val();
				if (curValue !== '') {
					var count = 0;
					curForm.find('.notEmailEquals').each(function() {
						if (curValue == $(this).val()) {
							count++;
						}
					});
					if (count > 1) {
						curField.addClass('error').removeClass('valid');
						curField.parent().find('label.error').remove();
						curField.parent().append('<label class="error">Данное значение уже указано</label>');
						result = false;
					} else {
						curField.removeClass('error').addClass('valid');
						curField.parent().find('label.error').remove();
					}
				}
			});
			if (result) {
				if (curForm.hasClass('ajax-form')) {
					curForm.addClass('loading');
					var formData = new FormData(form);

					if (curForm.find('[type=file]').length != 0) {
						var file = curForm.find('[type=file]')[0].files[0];
						formData.append('file', file);
					}

					$.ajax({
						type: 'POST',
						url: curForm.attr('action'),
						processData: false,
						contentType: false,
						dataType: 'html',
						data: formData,
						cache: false
					}).done(function(html) {
						curForm.html(html);
						initForm(curForm);
						curForm.removeClass('loading');
					});
				} else if (curForm.hasClass('ajax-form-faq')) {
					curForm.addClass('loading');
					var formData = new FormData(form);

					if (curForm.find('[type=file]').length != 0) {
						var file = curForm.find('[type=file]')[0].files[0];
						formData.append('file', file);
					}

					$.ajax({
						type: 'POST',
						url: curForm.attr('action'),
						processData: false,
						contentType: false,
						dataType: 'json',
						data: formData,
						cache: false
					}).done(function(data) {
						if (data.status) {
							curForm.find('textarea').val('').trigger('blur');
							curForm.parent().find('.faq-list-self').prepend('<div class="faq-item"><div class="faq-item-title"><a href="#">' + data.title + '<span>' + data.date + '</span></span></a></div></div>');
							curForm.find('.message').remove();
							curForm.prepend('<div class="message message-success"><div class="message-title">' + curForm.find('.form-success-text-title').html() + '</div><div class="message-text">' + data.message + '</div></div>')
						} else {
							curForm.find('.message').remove();
							curForm.prepend('<div class="message message-error"><div class="message-title">' + curForm.find('.form-error-text-title').html() + '</div><div class="message-text">' + data.message + '</div></div>')
						}
						curForm.removeClass('loading');
					});
				} else if (curForm.hasClass('ajax-form-comment')) {
					curForm.addClass('loading');
					var formData = new FormData(form);

					$.ajax({
						type: 'POST',
						url: curForm.attr('action'),
						processData: false,
						contentType: false,
						dataType: 'json',
						data: formData,
						cache: false
					}).done(function(data) {
						if (data.status) {
							curForm.find('textarea').val('').trigger('blur');
							curForm.parent().find('.comment-list').prepend('<div class="comment-item"><div class="comment-item-title"><div class="comment-item-date">' + data.date + '</div><div class="meet-card-company-info-props-delegate"><div class="manager-table-delegate-letter manager-table-delegate-letter-' + data.color + '">' + data.letter + '</div><div class="manager-table-delegate-name">' + data.author + '</div></div></div><div class="comment-item-text">' + data.text + '</div><a href="#" class="comment-item-link"></a></div>');
							curForm.find('.message').remove();
							curForm.prepend('<div class="message message-success"><div class="message-title">' + curForm.find('.form-success-text-title').html() + '</div><div class="message-text">' + data.message + '</div></div>')
						} else {
							curForm.find('.message').remove();
							curForm.prepend('<div class="message message-error"><div class="message-title">' + curForm.find('.form-error-text-title').html() + '</div><div class="message-text">' + data.message + '</div></div>')
						}
						curForm.removeClass('loading');
					});
				} else if (curForm.hasClass('ajax-form-faq-add')) {
					curForm.addClass('loading');
					var formData = new FormData(form);

					$.ajax({
						type: 'POST',
						url: curForm.attr('action'),
						processData: false,
						contentType: false,
						dataType: 'json',
						data: formData,
						cache: false
					}).done(function(data) {
						if (data.status) {
							curForm.find('textarea').val('').trigger('blur');
							$('<div class="faq-card-list-item"><div class="faq-card-list-item-title">Ответ<span>' + data.date + '</span></div><div class="faq-card-list-item-text">' + data.text + '</div></div>').insertBefore(curForm.parent());
							curForm.find('.message').remove();
							var curTop = curForm.parent().parent().find('.faq-card-list-item:last').offset().top;
							curForm.parent().parent().find('.support-open-form').remove();
							curForm.parent().remove();
							$('html, body').animate({'scrollTop': curTop - $('header').height()});
						} else {
							curForm.find('.message').remove();
							curForm.prepend('<div class="message message-error"><div class="message-title">' + curForm.find('.form-error-text-title').html() + '</div><div class="message-text">' + data.message + '</div></div>')
						}
						curForm.removeClass('loading');
					});
				} else if (curForm.hasClass('window-form')) {
					var formData = new FormData(form);

					if (curForm.find('[type=file]').length != 0) {
						var file = curForm.find('[type=file]')[0].files[0];
						formData.append('file', file);
					}

					windowOpen(curForm.attr('action'), formData);
				} else {
					if (curForm.find('.inncheck, .emailcheck').length > 0) {
						var count = 0;
						var result = true;
						curForm.find('.inncheck').each(function(e) {
							var curField = $(this);
							var curValue = curField.val();
							var curId = curField.data('current-id') ? curField.data('current-id') : '';

							if (curValue !== '') {
								$.ajax({
									type: 'POST',
									url: '/local/ajax/register/inn.php?' + curField.attr('name') + '=' + curValue + '&curID=' + curId,
									processData: false,
									contentType: false,
									dataType: 'html',
									data: null,
									cache: false
								}).done(function(html) {
									count++;
									if (html == 'true') {
										if (count == curForm.find('.inncheck, .emailcheck').length && result) {
											curField.removeClass('error').addClass('valid');
											curField.parent().find('label.error').remove();

											form.submit();
										}
									} else {
										result = false;
									}
								});
							}
						});

						curForm.find('.emailcheck').each(function(e) {
							var curField = $(this);
							var curValue = curField.val();
							var curId = curField.data('current-id') ? curField.data('current-id') : '';
							
							if (curValue !== '') {
								$.ajax({
									type: 'POST',
									url: '/local/ajax/register/email.php?' + 'USER_EMAIL' + '=' + curValue + '&curID=' + curId,
									processData: false,
									contentType: false,
									dataType: 'html',
									data: null,
									cache: false
								}).done(function(html) {
									count++;
									if (html == 'true') {
										if (count == curForm.find('.inncheck, .emailcheck').length && result) {
											curField.removeClass('error').addClass('valid');
											curField.parent().find('label.error').remove();

											form.submit();
										}
									} else {
										result = false;
									}
								});
							}
						});
					} else {
						form.submit();
					}
				}
			}
		}
	};

	if (curForm.find('.email-phone-group').length > 0) {
		curFormOptions.rules = {
			email: {
				require_from_group: [1, '.email-phone-group']
			},
			phone: {
				require_from_group: [1, '.email-phone-group']
			}
		}

		curFormOptions.messages = {
			email: 'Заполните хотя бы одно из этих полей',
			phone: 'Заполните хотя бы одно из этих полей'
		}
	}

	curForm.validate(curFormOptions);
}

$(window).on('load resize scroll', function() {
	var windowScroll = $(window).scrollTop();

	$('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
	var windowHeight = $('#body-test-height').height();
	$('#body-test-height').remove();

	if (windowScroll > 0) {
		$('html').addClass('header-fixed');
	} else {
		$('html').removeClass('header-fixed');
	}

	if ($('.up-link').length == 1) {
		if (windowScroll > windowHeight) {
			$('.up-link').addClass('visible');
		} else {
			$('.up-link').removeClass('visible');
		}

		if ($(window).width() > 1169) {
			if (windowScroll + windowHeight > $('footer').offset().top) {
				$('.up-link').css({'margin-bottom': (windowScroll + windowHeight) - $('footer').offset().top});
			} else {
				$('.up-link').css({'margin-bottom': 0});
			}
		} else {
			if (windowScroll + windowHeight > $('.footer-left').offset().top) {
				$('.up-link').css({'margin-bottom': (windowScroll + windowHeight) - $('.footer-left').offset().top});
			} else {
				$('.up-link').css({'margin-bottom': 0});
			}
		}
	}

});

function windowOpen(linkWindow, dataWindow) {
	if ($('.window').length == 0) {
		var curPadding = $('.wrapper').width();
		var curWidth = $(window).width();
		if (curWidth < 480) {
			curWidth = 480;
		}
		var curScroll = $(window).scrollTop();
		$('html').addClass('window-open');
		curPadding = $('.wrapper').width() - curPadding;
		$('body').css({'margin-right': curPadding + 'px'});
		$('header').css({'padding-right': curPadding + 'px'});

		$('body').append('<div class="window"><div class="window-loading"></div></div>')

		$('.wrapper').css({'top': -curScroll});
		$('.wrapper').data('curScroll', curScroll);
		$('meta[name="viewport"]').attr('content', 'width=' + curWidth);
	} else {
		$('.window').append('<div class="window-loading"></div>')
		$('.window-container').addClass('window-container-preload');
	}

	$('.window').animate({'scrollTop': 0}, 100);

	$.ajax({
		type: 'POST',
		url: linkWindow,
		processData: false,
		contentType: false,
		dataType: 'html',
		data: dataWindow,
		cache: false
	}).done(function(html) {
		if ($('.window-container').length == 0) {
			$('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"></a></div>');
		} else {
			$('.window-container').html(html + '<a href="#" class="window-close"></a>');
			$('.window .window-loading').remove();
		}

		$('.archive-card-descr-container').each(function() {
			var curBlock = $(this);
			curBlock.removeClass('open');
			if (curBlock.height() < curBlock.find('.archive-card-descr-content').height()) {
				curBlock.addClass('with-more');
			} else {
				curBlock.removeClass('with-more');
			}
		});

		window.setTimeout(function() {
			$('.window-container-preload').removeClass('window-container-preload');
		}, 100);

		$('.window form').each(function() {
			initForm($(this));
		});

		$('.window .tabs').each(function() {
			var curTabs = $(this);
			var activeTab = $(this).data("active-tab");
			if(activeTab == undefined) activeTab = 0;
			var curTabsMenu = curTabs.find('> .tabs-menu');
			var curTabsContainer = curTabs.find('> .tabs-container');
			var newHTML = '';
			curTabsContainer.find('> .tabs-content').each(function() {
				var curTabTitle = $(this).find('> .tabs-content-title').html();
				newHTML += '<div class="tabs-menu-item"><a href="#">' + curTabTitle + '</a></div> ';
			});
			curTabsContainer.find('> .tabs-content').eq(activeTab).addClass('active');
			curTabsMenu.html(newHTML);
			curTabsMenu.find('.tabs-menu-item').eq(activeTab).addClass('active');
			var newLink = $('<a href="' + linkWindow + '"></a>');
			var hashLink = newLink[0].hash;
			if (hashLink !== '') {
				var curTab = curTabs.find($(hashLink));
				if (curTab.length == 1) {
					var curIndex = curTabsContainer.find('> .tabs-content').index(curTab);
					curTabsMenu.find('.tabs-menu-item.active').removeClass('active');
					curTabsMenu.find('.tabs-menu-item').eq(curIndex).addClass('active');
					curTabsContainer.find('> .tabs-content.active').removeClass('active');
					curTabsContainer.find('> .tabs-content').eq(curIndex).addClass('active');
				}
			}
			curTabsMenu.mCustomScrollbar({
				axis: 'x'
			});
			$('.window').addClass('with-tabs');
		});

		var windowGalleryCount = 0;
		$('.window .archive-gallery img').one('load', function() {
			windowGalleryCount++;
			if (windowGalleryCount >= $('.window .archive-gallery img').length) {
				$('.window .archive-gallery').each(function() {
					var shuffleInstance = new Shuffle(this, {
						itemSelector: '.archive-gallery-item',
						roundTransforms: false,
						throttleTime: 0
					});
				});
			}
		});

		$(window).trigger('resize');

   });
}

function windowClose() {
	if ($('.window').length > 0) {
		$('.window').remove();
		$('html').removeClass('window-open');
		$('body').css({'margin-right': 0});
		$('header').css({'padding-right': 0});
		$('.wrapper').css({'top': 0});
		$('meta[name="viewport"]').attr('content', 'width=device-width');
		$(window).scrollTop($('.wrapper').data('curScroll'));
	}
}

const googleTranslateConfig = {
	lang: 'ru'
};

function TranslateInit() {

	var code = TranslateGetCode();
	$('.header-lang li').removeClass('active');
	$('.mobile-menu-header-lang li').removeClass('active');
	$('.header-lang li[data-google-lang="' + code + '"]').addClass('active');
	$('.mobile-menu-header-lang li[data-google-lang="' + code + '"]').addClass('active');
	$('.header-lang-link').removeClass('lang-list-ru lang-list-en lang-list-it lang-list-fr').addClass('lang-list-' + code);
	$('.hmobile-menu-eader-lang-link').removeClass('lang-list-ru lang-list-en lang-list-it lang-list-fr').addClass('lang-list-' + code);

	if (code == googleTranslateConfig.lang) {
		TranslateClearCookie();
	}

	new google.translate.TranslateElement({
		pageLanguage: googleTranslateConfig.lang
	});

	$('[data-google-lang] a').click(function(e) {
		TranslateSetCookie($(this).parent().attr('data-google-lang'));
		$('.header-lang').removeClass('open');
		$('.mobile-menu-header-lang').removeClass('open');
		e.preventDefault();
		window.location.reload();
	});
}

function TranslateGetCode() {
	var lang = ($.cookie('googtrans') != undefined && $.cookie('googtrans') != 'null') ? $.cookie('googtrans') : googleTranslateConfig.lang;
	return lang.substr(-2);
}

function TranslateClearCookie() {
	$.removeCookie("googtrans");
	$.removeCookie("googtrans", {
		domain: "." + document.domain
	});
	$.cookie("googtrans", null, {
		expires: 365
	});
	$.cookie("googtrans", null, {
		domain: "." + document.domain,
		expires: 365
	});
}

function TranslateSetCookie(code) {
	$.cookie("googtrans", "\/auto\/" + code, {
		expires: 365
	});
	$.cookie("googtrans", "\/auto\/" + code, {
		domain: "." + document.domain,
		expires: 365
	});
}