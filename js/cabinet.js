$(document).ready(function() {

	$('.side-menu').mCustomScrollbar({
		axis: 'y'
	});

	$('.dashboard-zone-dates-item a').click(function(e) {
		var curLi = $(this).parent();
		if (!curLi.hasClass('active')) {
			$('.dashboard-zone-dates-item.active').removeClass('active');
			curLi.addClass('active');
			var curIndex = $('.dashboard-zone-dates-item').index(curLi);
			$('.dashboard-zone-content.active').removeClass('active');
			$('.dashboard-zone-content').eq(curIndex).addClass('active');
		}
		e.preventDefault();
	});

	$('body').on('click', '.support-search-link', function(e) {
		$('html').addClass('support-search-open');
		$('.support-search-window-input input').trigger('focus');
		e.preventDefault();
	});

	$(document).click(function(e) {
		if ($(e.target).parents().filter('.support-search').length == 0) {
			$('html').removeClass('support-search-open');
		}
	});

	$('body').on('click', '.card-item-menu-icon', function(e) {
		$(this).parent().parent().toggleClass('open');
		$('header').addClass('header-up');
	});

	$('.meets-content-header').click(function(e) {
		$(this).parent().toggleClass('open');
		$(this).parent().find('.dashboard-zone-list').slideToggle(300);
		e.preventDefault();
	});

	$('body').on('mouseover', '.manager-table-section', function(e) {
		var curBlock = $(this);
		$('.wrapper').append('<div class="manager-table-section-detail-window" style="left:' + curBlock.offset().left + 'px; top:' + curBlock.offset().top + 'px">' + curBlock.find('.manager-table-section-detail').html() + '</div>');
	});

	$('body').on('mouseout', '.manager-table-section', function(e) {
		$('.manager-table-section-detail-window').remove();
	});

	$('body').on('change', '.manager-table .manager-table-head-checkbox input', function() {
		var curTable = $(this).parents().filter('.manager-table');
		if (curTable.find('.manager-table-head-checkbox input:checked').length == 1) {
			curTable.find('.manager-table-cell-checkbox input').prop('checked', true);
			if ($('.manager-table-header-fixed .form-checkbox').length > 0) {
				$('.manager-table-header-fixed .form-checkbox input').prop('checked', true);
			}			
		} else {
			curTable.find('.manager-table-cell-checkbox input').prop('checked', false);
			if ($('.manager-table-header-fixed .form-checkbox').length > 0) {
				$('.manager-table-header-fixed .form-checkbox input').prop('checked', false);
			}			
		}
	});

	$('body').on('change', '.manager-table .manager-table-cell-checkbox input', function() {
		var curTable = $(this).parents().filter('.manager-table');
		if (curTable.find('.manager-table-cell-checkbox input:checked').length > 0) {
			curTable.find('.manager-table-head-checkbox input').prop('checked', true);
			if ($('.manager-table-header-fixed .form-checkbox').length > 0) {
				$('.manager-table-header-fixed .form-checkbox input').prop('checked', true);
			}			
		} else {
			curTable.find('.manager-table-head-checkbox input').prop('checked', false);
			if ($('.manager-table-header-fixed .form-checkbox').length > 0) {
				$('.manager-table-header-fixed .form-checkbox input').prop('checked', false);
			}
		}
	});

	checkManagerTables();

	$('body').on('click', '.manager-table-filter-link', function() {
		$('html').toggleClass('manager-table-filter-open');
	});

	$('body').on('click', '.manager-filter-select-current', function() {
		var curSelect = $(this).parent();
		if (curSelect.hasClass('open')) {
			curSelect.removeClass('open');
		} else {
			$('.manager-filter-select.open').removeClass('open');
			curSelect.addClass('open');
		}
	});

	$(document).click(function(e) {
		if ($(e.target).parents().filter('.manager-filter-select').length == 0) {
			$('.manager-filter-select.open').removeClass('open');
		}
	});

	$('body').on('change', '.manager-filter-select-list input', function() {
		var curSelect = $(this).parents().filter('.manager-filter-select');
		var newHTML = '';
		curSelect.find('.manager-filter-select-list input:checked').each(function() {
			if (newHTML != '') {
				newHTML += ', ';
			}
			newHTML += $(this).parent().find('span').text();
		});
		curSelect.find('.manager-filter-select-current').html(newHTML);
		if (newHTML !== '') {
			curSelect.find('.manager-filter-select-current').removeClass('default');
		} else {
			curSelect.find('.manager-filter-select-current').addClass('default').html(curSelect.find('.manager-filter-select-current').attr('data-placeholder'));
		}
		filterUpdate();		
	});

	$(document).click(function(e) {
		var isDatepicker = false;
		var curClass = $(e.target).attr('class');
		if ((curClass !== undefined && curClass.indexOf('datepicker') > -1) || $(e.target).parents().filter('[class^="datepicker"]').length > 0) {
			isDatepicker = true;
		}
		var isSelect = false;
		var curClass = $(e.target).attr('class');
		if ((curClass !== undefined && curClass.indexOf('select2') > -1) || $(e.target).parents().filter('[class^="select2"]').length > 0) {
			isSelect = true;
		}
		if ($(e.target).parents().filter('.manager-table-filter').length == 0 && !isDatepicker && !isSelect) {
			$('html').removeClass('manager-table-filter-open');
		}
	});

	$('.manager-table-filter').each(function() {
		filterUpdate();
		$('.manager-table-filter .form-input-date input').each(function() {
			var myDatepicker = $(this).data('datepicker');
			if (myDatepicker) {
				myDatepicker.update('onSelect', function(formattedDate, date, inst) {
					filterUpdate();
				});
			}
		});
	});

	$('body').on('change', '.manager-table-filter .form-checkbox input', function(e) {
		filterUpdate();
	});

	$('body').on('change', '.manager-table-filter .form-input-date input', function(e) {
		filterUpdate();
	});
	
	 $('body').on('change', '.manager-table-filter-params-window-props select', function(e) {
		filterUpdate();
	});

	$('body').on('change', '.manager-table-filter-params-window-count-meets-input .form-input input', function(e) {
		filterUpdate();
	});

	$('body').on('change', '.manager-table-filter-params-window-input .form-input input', function(e) {
		filterUpdate();
	});

	$('body').on('keyup', '.manager-table-filter-params-window-input .form-input input', function(e) {
		filterUpdate();
	});

    $('body').on('click', '.manager-table-filter-params-window-input .form-input-clear', function(e) {
        $(this).parent().find('input').trigger('change');
    });

	$('body').on('change', '.manager-table-filter .form-select select', function(e) {
		filterUpdate();
	});

	$('body').on('click', '.manager-table-filter-param span', function() {
		var curId = $(this).attr('data-id');
		var curField = $('.manager-table-filter-params-window *[data-id="' + curId + '"]').eq(0);
		if (curField.parents().filter('.form-checkbox').length > 0) {
			curField.prop('checked', false);
			curField.trigger('change');
            if (curField.parents().filter('.manager-table-filter-params-window-props-group').length == 1) {
                curField.parents().filter('.manager-table-filter-params-window-props-group').find('.form-checkbox input').prop('checked', false).trigger('change');
            }
		}
		if (curField.hasClass('manager-table-filter-params-window-dates')) {
			curField.find('input').val('');
			curField.find('input').trigger('change');
		}
		if (curField.hasClass('manager-table-filter-params-window-count-meets')) {
			curField.find('input').val('');
			curField.find('input').trigger('change');
		}
		if (curField.parents().filter('.manager-table-filter-params-window-input').length == 1) {
			curField.val('');
			curField.trigger('change');
            curField.parent().removeClass('full');
		}
		if (curField.parents().filter('.manager-filter-select-list').length == 1) {
			curField.parents().filter('.manager-filter-select-list').find('input').prop('checked', false);
			curField.parents().filter('.manager-filter-select-list').find('input').eq(0).trigger('change');
		}
		if (curField.is('select')) {
			curField.find('option:selected').prop('selected', false);
			curField.trigger('change');
		}
		if (curField.parents().filter('.form-select-ajax').length == 1) {
			curField.html('');
			curField.trigger('change');
		}
		if (curField.hasClass( 'ownd-filter-select' )) {
			console.log( 'in' );
			curField.val( 0 );
			curField.trigger('change');
		}
	});

	$('body').on('mouseover', '.manager-table-schedule .manager-table-row .manager-table-schedule-section', function() {
		var curCell = $(this);
		var curRow = curCell.parents().filter('.manager-table-row');
		var curTable = curCell.parents().filter('.manager-table-schedule');
		var curIndex = curRow.find('.manager-table-schedule-section').index(curCell);
		curTable.find('.manager-table-row').each(function() {
			$(this).find('.manager-table-schedule-section').eq(curIndex).addClass('hover');
		});
		curTable.find('.manager-table-head-schedule').eq(curIndex).addClass('hover');
	});

	$('body').on('click', '.support-search-link', function(e) {
		$('html').addClass('support-search-open');
		$('.support-search-window-input input').trigger('focus');
		e.preventDefault();
	});

	$(document).click(function(e) {
		if ($(e.target).parents().filter('.support-search').length == 0) {
			$('html').removeClass('support-search-open');
		}
	});

	$('body').on('change', '.window-online-date-list input', function(e) {
		var curIndex = $('.window-online-date-list input').index($('.window-online-date-list input:checked'));
		$('.window-online-time-content.active').removeClass('active');
		$('.window-online-time-content .window-online-time-list input').removeClass('required');
		$('.window-online-time-content').eq(curIndex).addClass('active');
		$('.window-online-time-content').eq(curIndex).find('.window-online-time-list input').addClass('required');
		$('.window-online-date h3 .error').removeClass('visible');
		$('.window-online-date-current span').html('<strong>' + $('.window-online-date-list input:checked').attr('data-name') + '</strong> ' + $('.window-online-date-list input:checked').attr('data-day'));
		$('.window-online-date-list .archive-card-days-date').removeClass('current');
		$('.window-online-date-list input:checked').parents().filter('.archive-card-days-date').addClass('current');
	});

	$('body').on('change', '.window-online-time-list input', function(e) {
		$('.window-online-time h3 .error').removeClass('visible');
	});

	$('body').on('change', '.window-online-type input', function(e) {
		$('.window-online-type h3 .error').removeClass('visible');
	});

	$('body').on('click', '.meet-add-step-ctrl-next a', function(e) {
		var curStep = $('.meet-add-step').index($('.meet-add-step.active'));
		var isValid = true;
		if (curStep == 0) {
			if ($('.meet-add-company input:checked').length == 0) {
				$('.meet-add-company-error').addClass('visible');
				$('html, body').animate({'scrollTop': 0});
				isValid = false;
			} else {
				$('.meet-add-company-error').removeClass('visible');
			}
		}
		if (curStep == 1) {
			/*

			Убрано, мешает

			if ($('.window-online-type input:checked').length == 0) {
				$('.window-online-type h3 .error').addClass('visible');
				isValid = false;
			} else {
				$('.window-online-type h3 .error').removeClass('visible');
			}
			*/
			if ($('.window-online-time .window-online-time-content.active input:checked').length == 0) {
				$('.window-online-time h3 .error').addClass('visible');
				isValid = false;
			} else {
				$('.window-online-time h3 .error').removeClass('visible');
			}
			if ($('.window-online-date input:checked').length == 0) {
				$('.window-online-date h3 .error').addClass('visible');
				isValid = false;
			} else {
				$('.window-online-date h3 .error').removeClass('visible');
			}
			if ($('.meet-add-content h3 .error.visible').length > 0) {
				$('html, body').animate({'scrollTop': $('.meet-add-content h3 .error.visible').eq(0).offset().top - $('header').height() - 50});
			}
		}
		if (isValid) {
			curStep++;
			$('.meet-add-step.active').removeClass('active').addClass('success');
			$('.meet-add-step').eq(curStep).addClass('active');
			$('.meet-add-content.active').removeClass('active');
			$('.meet-add-content').eq(curStep).addClass('active');
			$('html, body').animate({'scrollTop': $('.meet-add-steps').offset().top - 100});
			if (curStep == 1) {
				meetAddTimeUpdate();
				meetAddConfirmUpdate();
			}
			if (curStep == 2) {
				meetAddConfirmUpdate();
			}
		}
		e.preventDefault();
	});

	$('.meet-add-step-ctrl-submit a').click(function(e) {
		meetAddConfirm();
		e.preventDefault();
	});

	$('body').on('click', '.meet-add-step-ctrl-back a', function(e) {
		var curStep = $('.meet-add-step').index($('.meet-add-step.active'));
		curStep--;
		$('.meet-add-step.active').removeClass('active');
		$('.meet-add-step').eq(curStep).removeClass('success').addClass('active');
		$('.meet-add-content.active').removeClass('active');
		$('.meet-add-content').eq(curStep).addClass('active');
		$('html, body').animate({'scrollTop': 0});
		e.preventDefault();
	});

	$('body').on('change', '.window-online-date-list input', function(e) {
		var curIndex = $('.window-online-date-list input').index($('.window-online-date-list input:checked'));
		$('.window-online-time-content.active').removeClass('active');
		$('.window-online-time-content').eq(curIndex).addClass('active');
		$('.window-online-time-container input').prop('checked', false);
	});

	$('body').on('change', '.window-online-time-list input', function(e) {
		$('.window-online-time-error').removeClass('visible');
	});

	$('.meet-add-company-wrapper .manager-table-filter .form-input-date input').each(function() {
		var myDatepicker = $(this).data('datepicker');
		if (myDatepicker) {
			myDatepicker.update('onSelect', function(formattedDate, date, inst) {
				meetAddFilterUpdate();
			});
		}
	});

    $('body').on('change', '.meet-add-company-wrapper .manager-table-filter .form-checkbox input', function(e) {
        meetAddFilterUpdate();
    });

    $('body').on('change', '.meet-add-company-wrapper .manager-table-filter .form-input-date input', function(e) {
        meetAddFilterUpdate();
    });

    $('body').on('change', '.meet-add-company-wrapper .manager-table-filter .form-input-date input', function(e) {
        meetAddFilterUpdate();
    });

    $('body').on('change', '.meet-add-company-wrapper .manager-table-filter-params-window-count-meets-input .form-input input', function(e) {
        meetAddFilterUpdate();
    });

    $('body').on('change', '.meet-add-company-wrapper .manager-table-filter-params-window-input .form-input input', function(e) {
        meetAddFilterUpdate();
    });

    $('body').on('keyup', '.meet-add-company-wrapper .manager-table-filter-params-window-input .form-input input', function(e) {
        meetAddFilterUpdate();
    });

    $('body').on('change', '.meet-add-company-wrapper .manager-table-filter .form-select select', function(e) {
        meetAddFilterUpdate();
    });

    $('body').on('keyup', '.meet-add-company-wrapper .support-search-window-input input', function(e) {
        meetAddFilterUpdate();
    });

    $('body').on('change', '.meet-add-company-wrapper .manager-table-filter .form-select select', function(e) {
        meetAddFilterUpdate();
    });

    $('body').on('change', '.meet-add-company-wrapper .manager-filter-select-list input', function() {
        meetAddFilterUpdate();
    });

	$('.meet-add-company-wrapper .support-search-window form').each(function() {
		var curForm = $(this);
		var validator = curForm.validate();
		validator.destroy();
		curForm.validate({
			ignore: '',
			submitHandler: function(form) {
				meetAddFilterUpdate();
			}
		});
	});

	$('body').on('click', '.meet-add-company-wrapper .pager a', function(e) {
		var curLink = $(this);
		if (!curLink.hasClass('active')) {
			if (!(curLink.hasClass('pager-prev') && $('.meet-add-company-wrapper .pager-prev').next().hasClass('active')) && !(curLink.hasClass('pager-next') && $('.meet-add-company-wrapper .pager-next').prev().hasClass('active'))) {
				if (!(curLink.hasClass('pager-prev')) && !(curLink.hasClass('pager-next'))) {
					$('.meet-add-company-wrapper .pager a.active').removeClass('active');
					curLink.addClass('active');
				} else if (curLink.hasClass('pager-prev')) {
					var curIndex = $('.meet-add-company-wrapper .pager a').index($('.meet-add-company-wrapper .pager a.active'));
					$('.meet-add-company-wrapper .pager a.active').removeClass('active');
					$('.meet-add-company-wrapper .pager a').eq(curIndex - 1).addClass('active');
				} else {
					var curIndex = $('.meet-add-company-wrapper .pager a').index($('.meet-add-company-wrapper .pager a.active'));
					$('.meet-add-company-wrapper .pager a.active').removeClass('active');
					$('.meet-add-company-wrapper .pager a').eq(curIndex + 1).addClass('active');
				}
				meetAddFilterUpdate();
				$('html, body').animate({'scrollTop': 0});
			}
		}
		e.preventDefault();
	});

	if ($('.meet-add-company-wrapper').length > 0) {
		meetAddFilterUpdate();
	}

	$('body').on('change', '.meet-add-company input', function() {
		$('.meet-add-company-error').removeClass('visible');
        $('.meet-add-step-ctrl-next a').eq(0).trigger('click');
	});

	$('body').on('click', '.manager-table-filter-params-window-title', function(e) {
		$(this).parent().toggleClass('open');
	});

	$('body').on('click', '.support-open-form a', function(e) {
		$(this).parent().parent().find('.support-form').addClass('visible');
		$(this).parent().parent().find('.support-open-form').hide();
		e.preventDefault();
	});

	$('body').on('mouseover', '.manager-table-hint', function(e) {
		$('body .manager-table-hint-window-show').remove();
		$('body').append('<div class="manager-table-hint-window-show" style="left:' + $(this).offset().left + 'px; top:' + $(this).offset().top + 'px"><div class="manager-table-hint-window-show-inner">' + $(this).find('.manager-table-hint-window').html() + '</div></div>');
		e.preventDefault();
	});

	$('body').on('mouseout', '.manager-table-hint', function(e) {
		$('body .manager-table-hint-window-show').remove();
		e.preventDefault();
	});
	$('body').on('mouseover', '.manager-table-row', function(e) {
		var curLeft = $(this).parents().filter('.manager-table-wrapper').width();
		if ($('.manager-table-wrapper').mCustomScrollbar()[0].mcs !== undefined) {
			curLeft -= $('.manager-table-wrapper').mCustomScrollbar()[0].mcs.left;
		}
		$(this).find('.manager-table-cell-action').css({'left': curLeft});
		e.preventDefault();
	});

	$('.manager-table-ctrl .support-search-window form').each(function() {
		var curForm = $(this);
		var validator = curForm.validate();
		validator.destroy();
		curForm.validate({
			ignore: '',
			submitHandler: function(form) {
				$('.manager-table-content').addClass('loading');
				var curForm = $(form);
				var curData = curForm.serialize();
				if ($('.manager-table-head a.active').length > 0) {
					curData += '&sortname=' + $('.manager-table-head a.active').attr('data-sortname') + '&sortdir=' + $('.manager-table-head a.active').attr('data-sortdir');
				}
				$.ajax({
					type: 'POST',
					url: curForm.attr('action'),
					dataType: 'html',
					data: curData,
					cache: false
				}).done(function(html) {
					$('.manager-table-content').html(html);
					$('.manager-table-content').removeClass('loading');
					$(window).trigger('resize');
				});
			}
		});
	});

	$('.meet-add-company-wrapper form').each(function() {
		var curForm = $(this);
		var validator = curForm.validate();
		validator.destroy();
		curForm.validate({
			ignore: '',
			submitHandler: function(form) {
				meetAddFilterUpdate();
			}
		});
	});

	$('body').on('click', '.manager-table-head a', function(e) {
		if ($('.manager-table-filter').length > 0) {
			filterUpdate();
		}
		e.preventDefault();
	});

	$('body').on('click', '.manager-table-content .pager a', function(e) {
		var curLink = $(this);
		if (!curLink.hasClass('active')) {
			var curPager = curLink.parent();
			if (!(curLink.hasClass('pager-prev') && curPager.find('.pager-prev').next().hasClass('active')) && !(curLink.hasClass('pager-next') && curPager.find('.pager-next').prev().hasClass('active'))) {
				if (!(curLink.hasClass('pager-prev')) && !(curLink.hasClass('pager-next'))) {
					curPager.find('a.active').removeClass('active');
					curLink.addClass('active');
				} else if (curLink.hasClass('pager-prev')) {
					var curIndex = curPager.find('a').index(curPager.find('a.active'));
					curPager.find('a.active').removeClass('active');
					curPager.find('a').eq(curIndex - 1).addClass('active');
				} else {
					var curIndex = curPager.find('a').index(curPager.find('a.active'));
					curPager.find('a.active').removeClass('active');
					curPager.find('a').eq(curIndex + 1).addClass('active');
				}
				filterUpdate();
				$('html, body').animate({'scrollTop': 0});
			}
		}
		filterUpdate();
		e.preventDefault();
	});
		
});

function meetAddFilterUpdate() {
	$('.meet-add-content.active .meet-add-step-ctrl').removeClass('visible');
	$('.meet-add-company').remove();
	$('.meet-add-company-wrapper').addClass('loading');
	$('.meet-add-company-wrapper .message').remove();

    var curForm = $('.meet-add-company-wrapper form');
    var curData = curForm.serialize();
    if ($('.manager-table-head a.active').length > 0) {
        if (curData != '') {
            curData += '&';
        }
        curData += 'sortname=' + $('.manager-table-head a.active').attr('data-sortname') + '&sortdir=' + $('.manager-table-head a.active').attr('data-sortdir');
    }
    if ($('.pager a.active').length > 0) {
        if (curData != '') {
            curData += '&';
        }
        curData += 'pager=' + $('.pager a.active').html();
    }

    $.ajax({
        type: 'POST',
        url: $('.meet-add-ctrl').attr('data-url'),
        dataType: 'json',
        data: curData,
        cache: false,
		success: function(data) {
			if (data.status) {
				$('.meet-add-company-wrapper').removeClass('loading');
				$('.meet-add-company-wrapper .message').remove();
				var newHTML = '';
				var inputName = $('.meet-add-companies').attr('data-inputname');
				for (var i = 0; i < data.data.list.length; i++) {
					var curCompany = data.data.list[i];
					newHTML +=  '<label class="meet-add-company">';
					newHTML +=  '<input type="radio" name="' + inputName + '" value="' + curCompany.ID + '" />';
					newHTML +=  '<div class="meet-add-company-radiobox"></div>';
					newHTML +=  '<div class="meet-add-company-info">' +
									'<div class="meet-add-company-info-inner">' +
										'<div class="meet-add-company-logo"><div class="meet-add-company-logo-inner"><img src="' + curCompany.LOGOTYPE_SRC + '" alt="" /></div></div>' +
										'<div class="meet-add-company-text">' +
											'<div class="meet-add-company-title">' + curCompany.NAME + '</div>' +
											'<div class="meet-add-company-brands">' + curCompany.BRANDS + '</div>' +
										'</div>' +
									'</div>' +
								'</div>';

					newHTML +=  '<div class="meet-add-company-country"><div class="meet-add-company-title-mobile">Страна</div>';
					if (curCompany.COUNTRIES !== undefined) {
						for (var j = 0; j < curCompany.COUNTRIES.length; j++) {
							newHTML +=  '<div class="catalogue-item-country-item">';
							newHTML +=	  '<span class="catalogue-item-country-item-hint"><img src="' + curCompany.COUNTRIES[j].FLAG_SRC + '" alt="" /><span class="catalogue-item-country-item-hint-title">' + curCompany.COUNTRIES[j].NAME + '</span></span>';
							newHTML +=	  '<span class="catalogue-item-country-item-title">' + curCompany.COUNTRIES[j].NAME + '</span>';
							if (curCompany.COUNTRIES[j].REGIONS !== undefined) {
								for (var k = 0; k < curCompany.COUNTRIES[j].REGIONS.length; k++) {
									if (k == 0) {
										newHTML += '<span class="catalogue-item-country-sep"></span>';
									}
									newHTML += '<span class="catalogue-item-country-region">' + curCompany.COUNTRIES[j].REGIONS[k].SHORT + '<span class="catalogue-item-country-region-title">' + curCompany.COUNTRIES[j].REGIONS[k].FULL + '</span></span>';
								}
							}
							newHTML +=  '</div>';
						}
					}
					newHTML +=  '</div>';

					newHTML +=  '<div class="meet-add-company-category"><div class="meet-add-company-title-mobile">Категории</div>';
					if (curCompany.CATEGORIES !== undefined) {
						for (var j = 0; j < curCompany.CATEGORIES.length; j++) {
							newHTML += '<span class="catalogue-item-country-item-hint"><img src="' + curCompany.CATEGORIES[j].ICON_SRC + '" alt="" /><span class="catalogue-item-country-item-hint-title">' + curCompany.CATEGORIES[j].NAME + '</span></span>';
						}
					}
					newHTML +=  '</div>';

					newHTML +=  '<div class="meet-add-company-source"><div class="meet-add-company-title-mobile">Сырье</div>';
					if (curCompany.SOURCE !== undefined) {
						for (var j = 0; j < curCompany.SOURCE.length; j++) {
							newHTML += '<div class="meet-add-company-source-item">' + curCompany.SOURCE[j].NAME + '</div>';
						}
					}
					newHTML +=  '</div>';

					newHTML +=  '<div class="meet-add-company-min"><div class="meet-add-company-title-mobile">Минимальный заказ</div>';
					if (curCompany.ORDER_MIN !== undefined) {
						newHTML += curCompany.ORDER_MIN;
					}
					newHTML +=  '</div>';

					newHTML +=  '<div class="meet-add-company-props">';
					if (curCompany.PROPS !== undefined) {
						for (var j = 0; j < curCompany.PROPS.length; j++) {
							newHTML +=  '<div class="meet-add-company-prop">';
							newHTML +=	  '<div class="meet-add-company-prop-icon">' + curCompany.PROPS[j].ICON + '</div>';
							newHTML +=	  '<div class="meet-add-company-prop-text">' + curCompany.PROPS[j].NAME + '</div>';
							newHTML +=  '</div>';
						}
					}
					newHTML +=  '</div>';
					newHTML +=  '</label>';
				}
				$('.meet-add-companies').append(newHTML);

				var pagerHTML = '';
				if (data.data.pageCount > 1) {
					pagerHTML += '<div class="pager"><a href="#" class="pager-prev"></a>';
					var newCurPage = data.data.page.replace('page-', '');
					for (var i = 0; i < data.data.pageCount; i++) {
						var curPage = i + 1;
						if (curPage == newCurPage) {
							pagerHTML += '<a href="#" class="active">' + curPage + '</a>';
						} else {
							pagerHTML += '<a href="#">' + curPage + '</a>';
						}
					}
					pagerHTML += '<a href="#" class="pager-next"></a></div>';
				}
				$('.meet-add-company-wrapper .pager').html(pagerHTML);
			} else {
				$('.meet-add-company-wrapper').removeClass('loading');
				$('.meet-add-company-wrapper .message').remove();
				$('.meet-add-company-wrapper').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">' + data.message + '</div></div>');
			}
		},
		error: function() {
			$('.meet-add-company-wrapper').removeClass('loading');
			$('.meet-add-company-wrapper .message').remove();
			$('.meet-add-company-wrapper').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">Загрузка данных невозможна</div></div>');
		}
	});
}

function meetAddTimeUpdate() {
	$('.meet-add-content.active .meet-add-step-ctrl').removeClass('visible');
	$('.meet-add-datetime').addClass('loading');
	$('.meet-add-datetime .message').remove();
	var filterData = {'company': $('.meet-add-company input:checked').val()};
	$.ajax({
		type: 'POST',
		url: $('.meet-add-datetime').attr('data-url'),
		dataType: 'html',
		data: filterData,
		cache: false,
		success: function(data) {
			$('.meet-add-datetime').html(data);
			$('.meet-add-datetime').removeClass('loading');
		},
		error: function() {
			$('.meet-add-datetime').removeClass('loading');
			$('.meet-add-datetime .message').remove();
			$('.meet-add-datetime').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">Загрузка данных невозможна</div></div>');
		}
	});
}

function meetAddConfirmUpdate() {
	var curCompany = $('.meet-add-company input:checked').parents().filter('.meet-add-company');
	$('.meet-add-confirm-company').html(curCompany.find('.meet-add-company-logo-inner').html() + curCompany.find('.meet-add-company-title').html());
	$('.meet-add-confirm-date').html($('.window-online-date-list input:checked').attr('data-name') + ' <span>' + $('.window-online-date-list input:checked').attr('data-day') + '</span>');
	  $('.meet-add-confirm-time').html($('.window-online-time-list input:checked').attr('data-timefull'));
	$('.meet-add-confirm-type').html($('.window-online-type input:checked').parent().find('span').html());
}

function meetAddConfirm() {
	$('.meet-add-confirm').addClass('loading');
	$('.meet-add-confirm .message').remove();
	var filterData = {
						'company': $('.meet-add-company input:checked').val(),
						'date': $('.window-online-date-list input:checked').val(),
						'time': $('.window-online-time-list input:checked').val(),
						'type': $('.window-online-type input:checked').val(),
						'link': $('.window-online-communication input[name=link]').val(),
						'link_message': $('.window-online-communication textarea[name=link_message]').val(),
	};
	console.log(filterData);
	$.ajax({
		type: 'POST',
		url: $('.meet-add-step-ctrl-submit a').attr('href'),
		dataType: 'json',
		data: filterData,
		cache: false,
		success: function(data) {
			if (data.status) {
				$('.meet-add-container').html('<div class="message message-success"><div class="message-title">Успешно</div><div class="message-text">' + data.message + '</div></div>');
			} else {
				$('.meet-add-confirm').removeClass('loading');
				$('.meet-add-confirm .message').remove();
				$('.meet-add-confirm').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">' + data.message + '</div></div>');
			}
		},
		error: function() {
			$('.meet-add-confirm').removeClass('loading');
			$('.meet-add-confirm .message').remove();
			$('.meet-add-confirm').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">Загрузка данных невозможна</div></div>');
		}
	});
}

$(window).on('load resize', function() {
	$('.manager-table-wrapper').each(function() {
		var curWrapper = $(this);
		curWrapper.find('.manager-table-cell').removeAttr('style');
		if ($(window).width() > 1169) {
			curWrapper.find('.manager-table-cell-participant').each(function() {
				$(this).find('.manager-table-participant-text').css({'display': 'inline'});
				$(this).css({'min-width': $(this).find('.manager-table-participant-text').width() + 30});
				$(this).find('.manager-table-participant-text').removeAttr('style');
			});
			curWrapper.mCustomScrollbar('destroy');
			curWrapper.mCustomScrollbar({
				axis: 'x',
				callbacks: {
					whileScrolling: function() {
						$('.manager-table-header-fixed-inner').css({'left': this.mcs.left});
					}
				}
			});
			curWrapper.find('.manager-table-cell:last-child').each(function() {
				if ($(this).hasClass('manager-table-cell-action')) {
					$(this).prev().addClass('last-child');
				} else {
					$(this).addClass('last-child');
				}
			});			
		} else {
			curWrapper.mCustomScrollbar('destroy');
		}
	});

});

function checkManagerTables() {
	$('.manager-table').each(function() {
		var curTable = $(this);
		if (curTable.find('.manager-table-cell-checkbox input:checked').length > 0) {
			curTable.find('.manager-table-head-checkbox input').prop('checked', true);
			if ($('.manager-table-header-fixed .form-checkbox').length > 0) {
				$('.manager-table-header-fixed .form-checkbox input').prop('checked', true);
			}
		} else {
			curTable.find('.manager-table-head-checkbox input').prop('checked', false);
			if ($('.manager-table-header-fixed .form-checkbox').length > 0) {
				$('.manager-table-header-fixed .form-checkbox input').prop('checked', false);
			}
		}
	});
}

function filterUpdate() {
	var newHTML = '';
	var id = -1;

	if ($('.manager-table-filter-params-window-dates').length == 1) {
		id++;
		$('.manager-table-filter-params-window-dates').attr('data-id', id);
		var datesText = '';
		if ($('.filter-date-from').val() != '') {
			datesText += 'с ' + $('.filter-date-from').val();
		}
		if ($('.filter-date-to').val() != '') {
			if (datesText != '') {
				datesText += ' ';
			}
			datesText += 'по ' + $('.filter-date-to').val();
		}
		if (datesText != '') {
			newHTML += '<div class="manager-table-filter-param">' + datesText + '<span data-id="' + id + '"><svg width="7" height="7" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 4.5L8 1" stroke-width="1.2"/><path d="M8 8L4.5 4.5L1 8" stroke-width="1.2"/></svg></span></div>';
		}
		$('.manager-table-filter-params-window-dates .manager-table-filter-params-window-title .manager-table-filter-params-window-title-values').remove();
		$('.manager-table-filter-params-window-dates .manager-table-filter-params-window-title').append('<div class="manager-table-filter-params-window-title-values">' + datesText + '</div>');
	}

	if ($('.manager-table-filter-params-window-count-meets').length == 1) {
		id++;
		$('.manager-table-filter-params-window-count-meets').attr('data-id', id);
		var datesText = '';
		if ($('.manager-table-filter-params-window-count-meets-input input').eq(0).val() != '') {
			datesText += 'с ' + $('.manager-table-filter-params-window-count-meets-input input').eq(0).val();
		}
		if ($('.manager-table-filter-params-window-count-meets-input input').eq(1).val() != '') {
			if (datesText != '') {
				datesText += ' ';
			}
			datesText += 'по ' + $('.manager-table-filter-params-window-count-meets-input input').eq(1).val();
		}
		if (datesText != '') {
			newHTML += '<div class="manager-table-filter-param">' + datesText + ' встреч<span data-id="' + id + '"><svg width="7" height="7" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 4.5L8 1" stroke-width="1.2"/><path d="M8 8L4.5 4.5L1 8" stroke-width="1.2"/></svg></span></div>';
		}
		$('.manager-table-filter-params-window-count-meets').parent().find('.manager-table-filter-params-window-title .manager-table-filter-params-window-title-values').remove();
		$('.manager-table-filter-params-window-count-meets').parent().find('.manager-table-filter-params-window-title').append('<div class="manager-table-filter-params-window-title-values">' + datesText + '</div>');
	}

	var newText = '';
	for (var i = 0; i < $('.manager-table-filter .form-checkbox').length; i++) {
		var curInput = $('.manager-table-filter .form-checkbox').eq(i).find('input');
		if (curInput.parents().filter('.manager-table-filter-params-window-props-group').length == 0 || curInput.parents().filter('.manager-table-filter-params-window-props-group').find('.form-checkbox input:checked').index(curInput) == 0) {
			id++;
			curInput.attr('data-id', id);
			if (curInput.prop('checked')) {
				var moreText = '';
				if (curInput.parents().filter('.manager-table-filter-params-window-props-group').length == 1) {
					if (curInput.parents().filter('.manager-table-filter-params-window-props-group').find('.form-checkbox input:checked').length > 1) {
						moreText = '<em>, еще ' + (curInput.parents().filter('.manager-table-filter-params-window-props-group').find('.form-checkbox input:checked').length - 1) + '</em>';
					}
				}
				var bgClass = '';
				if (curInput.parent().find('.manager-table-filter-params-window-props-trust').length == 1) {
					bgClass = ' ' + curInput.parent().find('.manager-table-filter-params-window-props-trust').attr('class').replace('manager-table-filter-params-window-props-trust ', '');
				}
				newHTML += '<div class="manager-table-filter-param' + bgClass + '">' + curInput.parent().find('span').text() + moreText + '<span data-id="' + id + '"><svg width="7" height="7" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 4.5L8 1" stroke-width="1.2"/><path d="M8 8L4.5 4.5L1 8" stroke-width="1.2"/></svg></span></div>';
				if (newText != '') {
					newText += ', ';
				}
				newText += curInput.parent().find('span').text();
			}
		} else {
			id++;
			curInput.attr('data-id', id);
		}
	}
	for (var i = 0; i < $('.manager-table-filter .form-select').length; i++) {
		var curSelect = $('.manager-table-filter .form-select').eq(i).find('select');
		id++;
		curSelect.attr('data-id', id);
		if (curSelect.find('option:selected').length > 0 && curSelect.find('option:selected').attr('value') != '') {
			newHTML += '<div class="manager-table-filter-param">' + curSelect.find('option:selected').text() + '<span data-id="' + id + '"><svg width="7" height="7" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 4.5L8 1" stroke-width="1.2"/><path d="M8 8L4.5 4.5L1 8" stroke-width="1.2"/></svg></span></div>';
			if (newText != '') {
				newText += ', ';
			}
			newText += curSelect.find('option:selected').text();
		}
	}
	for (var i = 0; i < $('.manager-table-filter-params-window-input').length; i++) {
		var curInput = $('.manager-table-filter-params-window-input').eq(i).find('input');
		id++;
		curInput.attr('data-id', id);
		if (curInput.val() != '') {
			newHTML += '<div class="manager-table-filter-param">' + curInput.val() + '<span data-id="' + id + '"><svg width="7" height="7" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 4.5L8 1" stroke-width="1.2"/><path d="M8 8L4.5 4.5L1 8" stroke-width="1.2"/></svg></span></div>';
			if (newText != '') {
				newText += ', ';
			}
			newText += curInput.val();
		}
	}
	for (var i = 0; i < $('.manager-table-filter .manager-filter-select-list input').length; i++) {
		var curInput = $('.manager-table-filter .manager-filter-select-list input').eq(i);
		if (curInput.parents().filter('.manager-table-filter-params-window-props-group').length == 0 || curInput.parents().filter('.manager-table-filter-params-window-props-group').find('input:checked').index(curInput) == 0) {
			id++;
			curInput.attr('data-id', id);
			if (curInput.prop('checked')) {
				var moreText = '';
				if (curInput.parents().filter('.manager-table-filter-params-window-props-group').length == 1) {
					if (curInput.parents().filter('.manager-table-filter-params-window-props-group').find('input:checked').length > 1) {
						moreText = '<em>, еще ' + (curInput.parents().filter('.manager-table-filter-params-window-props-group').find('input:checked').length - 1) + '</em>';
					}
				}
				newHTML += '<div class="manager-table-filter-param">' + curInput.parent().find('span').text() + moreText + '<span data-id="' + id + '"><svg width="7" height="7" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 4.5L8 1" stroke-width="1.2"/><path d="M8 8L4.5 4.5L1 8" stroke-width="1.2"/></svg></span></div>';
				if (newText != '') {
					newText += ', ';
				}
				newText += curInput.parent().find('span').text();
			}
		} else {
			id++;
			curInput.attr('data-id', id);
		}
	}
	$('.manager-table-filter-params-window-props .manager-table-filter-params-window-title .manager-table-filter-params-window-title-values').remove();
	$('.manager-table-filter-params-window-props .manager-table-filter-params-window-title').append('<div class="manager-table-filter-params-window-title-values">' + newText + '</div>');

	$('.manager-table-filter-params').html(newHTML);

	$('.manager-table-content').addClass('loading');
	var curForm = $('.manager-table-filter-params-window form');
	var curData = curForm.serialize();
	if ($('.manager-table-head a.active').length > 0) {
		if (curData != '') {
			curData += '&';
		}
		curData += 'sortname=' + $('.manager-table-head a.active').attr('data-sortname') + '&sortdir=' + $('.manager-table-head a.active').attr('data-sortdir');
	}
	if ($('.pager a.active').length > 0) {
		if (curData != '') {
			curData += '&';
		}
		curData += 'pager=' + $('.pager a.active').html();
	}
	$.ajax({
		type: 'POST',
		url: curForm.attr('action'),
		dataType: 'html',
		data: curData,
		cache: false
	}).done(function(html) {
		$('.manager-table-content').html(html);
		$('.manager-table-content').removeClass('loading');
		$(window).trigger('resize');
	});
}

$(window).on('load resize scroll', function() {
	var windowScroll = $(window).scrollTop();
	var windowHeight = $(window).height();

	$('.manager-table-wrapper').each(function() {
		var curTable = $(this);
		if (curTable.parents().filter('.tabs-content').length == 0 || curTable.parents().filter('.tabs-content').hasClass('active')) {
			curTable.find('.mCSB_scrollTools').each(function() {
				var curTools = $(this);
				var curBottom = (windowScroll + windowHeight) - (curTable.offset().top + curTable.height());
				if (curBottom < 0) {
					curBottom = 0;
				}
				curTools.css({'position': 'fixed', 'left': curTools.parent().offset().left, 'bottom': curBottom, 'right': 'auto', 'width': curTools.parent().width(), 'z-index': 2});
			});

			if ($(window).width() > 1169) {
				var curHeader = curTable.find('.manager-table-header');
				if (curHeader.length == 1) {
					if ((windowScroll + $('header').outerHeight() > curHeader.offset().top) && (windowScroll + $('header').outerHeight() + 36 < curHeader.offset().top + curTable.outerHeight())) {
						$('.manager-table-header-fixed').remove();
						$('.wrapper').append('<div class="manager-table-header-fixed"><div class="manager-table-header-fixed-inner">' + curHeader.html() + '</div></div>');
						if ($('.manager-table-header-fixed .form-checkbox').length > 0) {
							$('.manager-table-header-fixed .form-checkbox input').prop('checked', curHeader.find('.form-checkbox input').prop('checked'));
							$('.manager-table-header-fixed .form-checkbox input').change(function() {
								var curTableInner = curTable.find('.manager-table');
								curTableInner.find('.manager-table-head-checkbox input').prop('checked', $(this).prop('checked'));
								if (curTableInner.find('.manager-table-head-checkbox input:checked').length == 1) {
									curTableInner.find('.manager-table-cell-checkbox input').prop('checked', true);
								} else {
									curTableInner.find('.manager-table-cell-checkbox input').prop('checked', false);
								}
							});
						}
						$('.manager-table-header-fixed .manager-table-head').each(function() {
							var curHead = $(this);
							var curIndex = $('.manager-table-header-fixed .manager-table-head').index(curHead);
							curHead.width(curHeader.find('.manager-table-head').eq(curIndex).width());
						});
						if (curTable.mCustomScrollbar()[0].mcs !== undefined) {
							$('.manager-table-header-fixed-inner').css({'left': curTable.mCustomScrollbar()[0].mcs.left});
						}
					} else {
						$('.manager-table-header-fixed').remove();
					}
				}
			} else {
				$('.manager-table-header-fixed').remove();
			}
		}
	});

	if ($(window).width() > 1169) {
		$('.manager-table-ctrl').each(function() {
			$('.manager-table-filter').css({'width': $('.manager-table-ctrl').width() - $('.manager-table-action').outerWidth() - 35});
		});
	} else {
		$('.manager-table-filter').css({'width': 'auto'});
	}

	/* Добавлено для добавления встречи */
	if ($(window).width() > 1169) {
		$('.meet-add-ctrl').each(function() {
			$('.manager-table-filter').css({'width': $('.meet-add-ctrl').width() - $('.manager-table-action').outerWidth() - 35});
		});
	} else {
		$('.manager-table-filter').css({'width': 'auto'});
	}
	/* Добавлено */
});