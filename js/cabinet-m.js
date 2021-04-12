$(document).ready(function() {

    $('body').on('change', '.lkm-exponent-add-wrapper .manager-table-filter .form-checkbox input', function(e) {
        lkmMeetAddFilterUpdate();
    });

    $('body').on('change', '.lkm-exponent-add-wrapper .manager-table-filter .form-input-date input', function(e) {
        lkmMeetAddFilterUpdate();
    });

    $('body').on('change', '.lkm-exponent-add-wrapper .manager-table-filter-params-window-count-meets-input .form-input input', function(e) {
        lkmMeetAddFilterUpdate();
    });

    $('body').on('change', '.lkm-exponent-add-wrapper .manager-table-filter-params-window-input .form-input input', function(e) {
        lkmMeetAddFilterUpdate();
    });

    $('body').on('keyup', '.lkm-exponent-add-wrapper .manager-table-filter-params-window-input .form-input input', function(e) {
        lkmMeetAddFilterUpdate();
    });

    $('body').on('change', '.lkm-exponent-add-wrapper .manager-table-filter .form-select select', function(e) {
        lkmMeetAddFilterUpdate();
    });

    $('body').on('change', '.lkm-exponent-add-wrapper .manager-filter-select-list input', function() {
        lkmMeetAddFilterUpdate();
    });

	$('body').on('click', '.lkm-exponent-add-wrapper .pager a', function(e) {
		var curLink = $(this);
		if (!curLink.hasClass('active')) {
			if (!(curLink.hasClass('pager-prev') && $('.lkm-exponent-add-wrapper .pager-prev').next().hasClass('active')) && !(curLink.hasClass('pager-next') && $('.lkm-exponent-add-wrapper .pager-next').prev().hasClass('active'))) {
				if (!(curLink.hasClass('pager-prev')) && !(curLink.hasClass('pager-next'))) {
					$('.lkm-exponent-add-wrapper .pager a.active').removeClass('active');
					curLink.addClass('active');
				} else if (curLink.hasClass('pager-prev')) {
					var curIndex = $('.lkm-exponent-add-wrapper .pager a').index($('.lkm-exponent-add-wrapper .pager a.active'));
					$('.lkm-exponent-add-wrapper .pager a.active').removeClass('active');
					$('.lkm-exponent-add-wrapper .pager a').eq(curIndex - 1).addClass('active');
				} else {
					var curIndex = $('.lkm-exponent-add-wrapper .pager a').index($('.lkm-exponent-add-wrapper .pager a.active'));
					$('.lkm-exponent-add-wrapper .pager a.active').removeClass('active');
					$('.lkm-exponent-add-wrapper .pager a').eq(curIndex + 1).addClass('active');
				}
				lkmMeetAddFilterUpdate();
			}
		}
		e.preventDefault();
	});

	$('body').on('change', '.lkm-exponent-add-exponent input', function() {
		$('.lkm-exponent-add-company-error').removeClass('visible');
	});

	$('body').on('change', '.lkm-exponent-add-exponent input', function(e) {
		if ($('.lkm-exponent-add-list input:checked').length == 0) {
			$('.lkm-exponent-add-company-error').addClass('visible');
			$('.window').animate({'scrollTop': 0})
		} else {
			var curID = $('.lkm-exponent-add-exponent input:checked').val();
			$('.meet-card-data-item-exponent input').val(curID);
			$('.meet-card-data-item-exponent').removeClass('meet-card-data-item-empty');
			var curExponent = null;
			for (var i = 0; i < lkmMeetAddData.data.list.length; i++) {
				if (lkmMeetAddData.data.list[i].ID == curID) {
					curExponent = lkmMeetAddData.data.list[i];
				}
			}
			var newHTML =		   '<div class="meet-card-data-header">' +
										'<h3>Данные экспонента</h3>' +
										'<div class="meet-card-data-header-link"><a href="' + curExponent.LINK_DETAIL + '" target="_blank">карточка экспонента</a></div>' +
									'</div>' +
									'<div class="meet-card-data-container">' +
										'<div class="meet-card-data-info">' +
											'<div class="meet-card-data-company">' +
												'<div class="meet-card-data-company-logo"><img src="' + curExponent.LOGOTYPE_SRC + '" alt="" /></div>' +
												'<div class="meet-card-data-company-info">' +
													'<div class="meet-card-data-company-title">' + curExponent.NAME + '</div>';
			if (curExponent.BRANDS !== undefined) {
				newHTML +=						  '<div class="meet-card-data-company-brands">' + curExponent.BRANDS + '</div>';
			}
			newHTML +=						'</div>' +
											'</div>';
			if (curExponent.COUNTRIES !== undefined) {
				newHTML +=				  '<div class="meet-card-data-countries">';
				for (var j = 0; j < curExponent.COUNTRIES.length; j++) {
					newHTML +=				  '<div class="meet-card-data-country">';
					newHTML +=					  '<img src="' + curExponent.COUNTRIES[j].FLAG_SRC + '" alt="" />' + curExponent.COUNTRIES[j].NAME
					if (curExponent.COUNTRIES[j].REGIONS !== undefined) {
						for (var k = 0; k < curExponent.COUNTRIES[j].REGIONS.length; k++) {
							if (k == 0) {
								newHTML += ' '
							} else {
								newHTML += ' | '
							}
							newHTML +=			  '<span class="catalogue-item-country-item-hint">' + curExponent.COUNTRIES[j].REGIONS[k].SHORT + '<span class="catalogue-item-country-item-hint-title">' + curExponent.COUNTRIES[j].REGIONS[k].FULL + '</span></span>';
						}
					}
					newHTML +=				  '</div>';
				}
				newHTML +=				  '</div>';
			}
			newHTML +=				  '</div>' +
										'<div class="meet-card-data-props">' +
											'<div class="meet-card-data-prop">' +
												'<div class="meet-card-data-prop-title">Категории</div>' +
												'<div class="meet-card-data-prop-value">' +
													'<div class="meet-card-data-prop-categories">';
			if (curExponent.CATEGORIES !== undefined) {
				for (var j = 0; j < curExponent.CATEGORIES.length; j++) {
					newHTML +=						  '<span class="catalogue-item-country-item-hint"><img src="' + curExponent.CATEGORIES[j].ICON_SRC + '" alt="" /><span class="catalogue-item-country-item-hint-title">' + curExponent.CATEGORIES[j].NAME + '</span></span>';
				}
			}
			newHTML +=							  '</div>' +
												'</div>' +
											'</div>' +
											'<div class="meet-card-data-prop">' +
												'<div class="meet-card-data-prop-title">Сырье</div>';
			if (curExponent.SOURCE !== undefined) {
				newHTML +=					  '<div class="meet-card-data-prop-value">';
				for (var j = 0; j < curExponent.SOURCE.length; j++) {
					if (j > 0) {
						newHTML +=				  '<br />';
					}
					newHTML +=					  curExponent.SOURCE[j].NAME;
				}
				newHTML +=					  '</div>';
			}
			newHTML +=					  '</div>' +
											'<div class="meet-card-data-prop">' +
												'<div class="meet-card-data-prop-title">Минимальный объем</div>' +
												'<div class="meet-card-data-prop-value">' + curExponent.ORDER_MIN + '</div>' +
											'</div>' +
										'</div>' +
									'</div>';
			$('.meet-card-data-item-exponent .meet-card-data-item-container').html(newHTML);
			$('.meet-card-data-item-exponent .meet-card-data-item-change').show();
			lkmMeetAddDayUpdate();
			windowClose();
		}
		e.preventDefault();
	});


    $('body').on('change', '.lkm-visitor-add-wrapper .manager-table-filter .form-checkbox input', function(e) {
        lkmMeetAddFilterUpdateVisitor();
    });

    $('body').on('change', '.lkm-visitor-add-wrapper .manager-table-filter .form-input-date input', function(e) {
        lkmMeetAddFilterUpdateVisitor();
    });

    $('body').on('change', '.lkm-visitor-add-wrapper .manager-table-filter-params-window-count-meets-input .form-input input', function(e) {
        lkmMeetAddFilterUpdateVisitor();
    });

    $('body').on('change', '.lkm-visitor-add-wrapper .manager-table-filter-params-window-input .form-input input', function(e) {
        lkmMeetAddFilterUpdateVisitor();
    });

    $('body').on('keyup', '.lkm-visitor-add-wrapper .manager-table-filter-params-window-input .form-input input', function(e) {
        lkmMeetAddFilterUpdateVisitor();
    });

    $('body').on('change', '.lkm-visitor-add-wrapper .manager-table-filter .form-select select', function(e) {
        lkmMeetAddFilterUpdateVisitor();
    });

    $('body').on('change', '.lkm-visitor-add-wrapper .manager-filter-select-list input', function() {
        lkmMeetAddFilterUpdateVisitor();
    });

	$('body').on('click', '.lkm-visitor-add-wrapper .pager a', function(e) {
		var curLink = $(this);
		if (!curLink.hasClass('active')) {
			if (!(curLink.hasClass('pager-prev') && $('.lkm-visitor-add-wrapper .pager-prev').next().hasClass('active')) && !(curLink.hasClass('pager-next') && $('.lkm-visitor-add-wrapper .pager-next').prev().hasClass('active'))) {
				if (!(curLink.hasClass('pager-prev')) && !(curLink.hasClass('pager-next'))) {
					$('.lkm-visitor-add-wrapper .pager a.active').removeClass('active');
					curLink.addClass('active');
				} else if (curLink.hasClass('pager-prev')) {
					var curIndex = $('.lkm-visitor-add-wrapper .pager a').index($('.lkm-visitor-add-wrapper .pager a.active'));
					$('.lkm-visitor-add-wrapper .pager a.active').removeClass('active');
					$('.lkm-visitor-add-wrapper .pager a').eq(curIndex - 1).addClass('active');
				} else {
					var curIndex = $('.lkm-visitor-add-wrapper .pager a').index($('.lkm-visitor-add-wrapper .pager a.active'));
					$('.lkm-visitor-add-wrapper .pager a.active').removeClass('active');
					$('.lkm-visitor-add-wrapper .pager a').eq(curIndex + 1).addClass('active');
				}
				lkmMeetAddFilterUpdateVisitor();
			}
		}
		e.preventDefault();
	});

	$('body').on('change', '.lkm-visitor-add-visitor input', function() {
		$('.lkm-visitor-add-company-error').removeClass('visible');
	});

	$('body').on('change', '.lkm-visitor-add-visitor input', function(e) {
		if ($('.lkm-visitor-add-list input:checked').length == 0) {
			$('.lkm-visitor-add-company-error').addClass('visible');
			$('.window').animate({'scrollTop': 0})
		} else {
			var curID = $('.lkm-visitor-add-visitor input:checked').val();
			$('.meet-card-data-item-visitor input').val(curID);
			$('.meet-card-data-item-visitor').removeClass('meet-card-data-item-empty');
			var curExponent = null;
			for (var i = 0; i < lkmMeetAddDataVisitor.data.list.length; i++) {
				if (lkmMeetAddDataVisitor.data.list[i].ID == curID) {
					curExponent = lkmMeetAddDataVisitor.data.list[i];
				}
			}
			var newHTML =		   '<div class="meet-card-data-header">' +
										'<h3>Данные посетителя</h3>' +
										'<div class="meet-card-data-header-link"><a href="' + curExponent.LINK_DETAIL + '" target="_blank">карточка посетителя</a></div>' +
									'</div>' +
									'<div class="meet-card-data-container">' +
										'<div class="meet-card-data-props">' +
											'<div class="meet-card-data-props-col">' +
												'<div class="meet-card-data-props-item">' +
													'<div class="meet-card-data-props-item-title">Название</div>' +
													'<div class="meet-card-data-props-item-value">' + curExponent.NAME + '</div>' +
												'</div>' +
												'<div class="meet-card-data-props-item">' +
													'<div class="meet-card-data-props-item-title">Город</div>' +
													'<div class="meet-card-data-props-item-value">' + curExponent.CITY + '</div>' +
												'</div>' +
											'</div>' +
											'<div class="meet-card-data-props-col">' +
												'<div class="meet-card-data-props-item">' +
													'<div class="meet-card-data-props-item-title">Вид деятельности</div>' +
													'<div class="meet-card-data-props-item-value">' + curExponent.BRANDS + '</div>' +
												'</div>' +
												'<div class="meet-card-data-props-item">' +
													'<div class="meet-card-data-props-item-title">Представитель</div>' +
													'<div class="meet-card-data-props-item-value">' + curExponent.DELEGATE.NAME + '</div>' +
												'</div>' +
											'</div>' +
										'</div>' +
									'</div>';
			$('.meet-card-data-item-visitor .meet-card-data-item-container').html(newHTML);
			$('.meet-card-data-item-visitor .meet-card-data-item-change').show();
			lkmMeetAddDayUpdate();
			windowClose();
		}
		e.preventDefault();
	});

	$('body').on('click', '.meet-add-submit-link', function(e) {
		if ($('.meet-add-form form').valid()) {
            $('.meet-add-form .message').remove();
            $('.meet-add-step-2, .window-online-communication, .window-online-status').hide();
            $('.meet-card-data-item-change').hide();
            $('#meet-add-step-3-date').html($('.archive-card-days-date input:checked').attr('data-name') + ' ' + $('.archive-card-days-date input:checked').attr('data-day'));
            $('#meet-add-step-3-time').html($('.window-online-time-content.active input:checked').parent().find('span').html());
            $('.meet-add-step-3').show();
            $('html, body').animate({'scrollTop': 0});
		} else {
			if ($('.form-input label.error:visible').length > 0) {
				$('html, body').animate({'scrollTop': $('.form-input label.error:visible').eq(0).parent().offset().top - $('header').height() - 50});
			}
		}
		e.preventDefault();
	});

	$('body').on('click', '.meet-add-confirm-link', function(e) {
        $('.meet-add-form').addClass('loading');
        var filterData = {};
        filterData['exponentID'] = $('.meet-card-data-item-exponent input').val();
        filterData['visitorID'] = $('.meet-card-data-item-visitor input').val();
        filterData['date'] = $('.window-online-date input:checked').val();
        filterData['time'] = $('.window-online-time input:checked').val();
        filterData['status'] = $('.window-online-status input:checked').val();
        filterData['communication'] = $('.window-online-communication input').val();
        filterData['message'] = $('.window-online-communication textarea').val();
        filterData['link'] = $('.window-online-communication input[name=link]').val();
        filterData['link_message'] = $('.window-online-communication textarea[name=link_message]').val();
        $.ajax({
            type: 'POST',
            url: $('.meet-add-step-3').attr('data-url'),
            dataType: 'json',
            data: filterData,
            cache: false,
            success: function(data) {
                $('.meet-add-form').removeClass('loading');
                $('.meet-add-form .message').remove();
                $('.meet-add-step-2, .window-online-communication, .window-online-status').hide();
                $('.meet-card-data-item-change').hide();

                if (data.status) {
                    $('.meet-add-form').html('<div class="message message-success"><div class="message-title">Успешно</div><div class="message-text">' + data.message + '</div></div>');
                    $('html, body').animate({'scrollTop': 0});
                } else {
                    $('.meet-add-step-3 .message').remove();
                    $('.meet-add-step-3').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">' + data.message + '</div></div>');
                }
            },
            error: function() {
                $('.meet-add-form').removeClass('loading');
                $('.meet-add-form .message').remove();
                $('.meet-add-step-2, .window-online-communication, .window-online-status').hide();
                $('.meet-card-data-item-change').hide();

                $('.meet-add-step-3 .message').remove();
                $('.meet-add-step-3').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">' + data.message + '</div></div>');
            }
        });
		e.preventDefault();
	});

	$('body').on('click', '.meet-add-back-link', function(e) {
		$('.meet-add-step-2, .window-online-communication, .window-online-status').show();
		$('.meet-card-data-item-change').show();
		$('.meet-add-step-3').hide();
		e.preventDefault();
	});

	$('body').on('click', '.comment-item-link', function(e) {
		$(this).parent().toggleClass('open');
		e.preventDefault();
	});

	var meetsScheduleTimer = null;
	var meetsSchedulePeriod = 500;

	var xhr = null;

	$('body').on('mouseover', '.manager-table-cell-meet-cell .dashboard-zone-item-status', function(e) {
		var curItem = $(this);
		if (curItem.attr('data-url') !== undefined) {
			$('.meets-schedule-window').remove();
			$('.manager-table-cell-meet-cell .dashboard-zone-item-status').removeClass('loading');
			curItem.addClass('loading');
			if (xhr !== null) {
				xhr.abort();
			}
			xhr = $.ajax({
				type: 'POST',
				url: curItem.attr('data-url'),
				dataType: 'html',
				cache: false,
				success: function(html) {
					$('.wrapper').append('<div class="meets-schedule-window preload" style="top:' + $(curItem).offset().top + 'px; left:' + $(curItem).offset().left + 'px"><div class="meets-schedule-window-inner"></div></div>');
					curItem.removeClass('loading');
					$('.meets-schedule-window-inner').html(html);
					if ($('.meets-schedule-window-inner').offset().top < $(window).scrollTop()) {
						$('.meets-schedule-window-inner').addClass('to-bottom');
					}
					if ($('.meets-schedule-window-inner').offset().left + $('.meets-schedule-window-inner').outerWidth() > $(window).width()) {
						$('.meets-schedule-window-inner').addClass('to-left');
					}
					$('.meets-schedule-window').removeClass('preload');
				}
			});
		}
		window.clearTimeout(meetsScheduleTimer);
		meetsScheduleTimer = null;
	});

	$('body').on('mouseout', '.manager-table-cell-meet-cell .dashboard-zone-item-status', function(e) {
		meetsScheduleTimer = window.setTimeout(function() { $('.meets-schedule-window').remove(); $('.manager-table-cell-meet-cell .dashboard-zone-item-status').removeClass('loading'); }, meetsSchedulePeriod);
	});

	$('body').on('mouseover', '.meets-schedule-window', function(e) {
		window.clearTimeout(meetsScheduleTimer);
		meetsScheduleTimer = null;
	});

	$('body').on('mouseout', '.meets-schedule-window', function(e) {
		meetsScheduleTimer = window.setTimeout(function() { $('.meets-schedule-window').remove(); $('.manager-table-cell-meet-cell .dashboard-zone-item-status').removeClass('loading'); }, meetsSchedulePeriod);
	});

});

$(window).on('load resize', function() {

	$('.manager-table-meetdays').each(function() {
		var curTable = $(this);
		var curWidth = 0;
		var curMonth = null;
		curTable.find('.manager-table-cell-meet-cell-month-header').each(function() {
			var curCell = $(this);
			if (curCell.find('.manager-table-meetdays-month-title').length > 0) {
				if (curMonth !== null) {
					curMonth.width(curWidth - 18);
				}
				curWidth = curCell.outerWidth();
				curMonth = curCell.find('.manager-table-meetdays-month-title');
			} else {
				curWidth += curCell.outerWidth();
			}
			if (curMonth !== null) {
				curMonth.width(curWidth);
			}
		});
	});

});

function lkmMeetAddFilterInit() {
	$('.lkm-exponent-add-wrapper .support-search-window form').each(function() {
		var curForm = $(this);
		var validator = curForm.validate();
		validator.destroy();
		curForm.validate({
			ignore: '',
			submitHandler: function(form) {
				lkmMeetAddFilterUpdate();
			}
		});
	});
	$('.window').addClass('with-tabs');
	window.setTimeout(function() {
		$('.lkm-exponent-add-wrapper .form-input-date input').each(function() {
			var myDatepicker = $(this).data('datepicker');
			if (myDatepicker) {
				myDatepicker.update('onSelect', function(formattedDate, date, inst) {
					lkmMeetAddFilterUpdate();
				});
			}
		});
	}, 500);

	lkmMeetAddFilterUpdate();
}

function lkmMeetAddFilterInitVisitor() {
	$('.lkm-visitor-add-wrapper .support-search-window form').each(function() {
		var curForm = $(this);
		var validator = curForm.validate();
		validator.destroy();
		curForm.validate({
			ignore: '',
			submitHandler: function(form) {
				lkmMeetAddFilterUpdateVisitor();
			}
		});
	});
	$('.window').addClass('with-tabs');
	window.setTimeout(function() {
		$('.lkm-visitor-add-wrapper .form-input-date input').each(function() {
			var myDatepicker = $(this).data('datepicker');
			if (myDatepicker) {
				myDatepicker.update('onSelect', function(formattedDate, date, inst) {
					lkmMeetAddFilterUpdateVisitor();
				});
			}
		});
	}, 500);

	lkmMeetAddFilterUpdateVisitor();
}

var lkmMeetAddData = null;
var lkmMeetAddDataVisitor = null;

function lkmMeetAddFilterUpdate() {
	$('.lkm-exponent-add-wrapper').addClass('loading');
	$('.lkm-exponent-add-wrapper .message').remove();

    var curForm = $('.lkm-exponent-add-wrapper .manager-table-filter-params-window form');
    var curData = curForm.serialize();
    if ($('.lkm-exponent-add-wrapper .manager-table-head a.active').length > 0) {
        if (curData != '') {
            curData += '&';
        }
        curData += 'sortname=' + $('.lkm-exponent-add-wrapper .manager-table-head a.active').attr('data-sortname') + '&sortdir=' + $('.lkm-exponent-add-wrapper .manager-table-head a.active').attr('data-sortdir');
    }
    if ($('.lkm-exponent-add-wrapper .pager a.active').length > 0) {
        if (curData != '') {
            curData += '&';
        }
        curData += 'pager=' + $('.lkm-exponent-add-wrapper .pager a.active').html();
    }

	$.ajax({
		type: 'POST',
		url: $('.lkm-exponent-add-ctrl').attr('data-url'),
		dataType: 'json',
		data: curData,
		cache: false,
		success: function(data) {
			if (data.status) {
				$('.lkm-exponent-add-exponent').remove();
				$('.lkm-exponent-add-wrapper').removeClass('loading');
				$('.lkm-exponent-add-wrapper .message').remove();
				lkmMeetAddData = data;
				var newHTML = '';
				var inputName = $('.lkm-exponent-add-list').attr('data-inputname');
				$('.lkm-exponent-add-company-count-current').html(data.data.countOnPage);
				$('.lkm-exponent-add-company-count-all').html(data.data.countAll);
				for (var i = 0; i < data.data.list.length; i++) {
					var curCompany = data.data.list[i];
					var linkDetail = '';
                    if ( curCompany.LINK_DETAIL !== '' ) {
                        linkDetail = '<a href="' + curCompany.LINK_DETAIL + '" target="_blank"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.41797 7.04173C5.65059 7.35272 5.94737 7.61004 6.28818 7.79624C6.629 7.98244 7.00587 8.09317 7.39324 8.12091C7.78061 8.14865 8.16941 8.09276 8.53328 7.95703C8.89715 7.82129 9.22757 7.60889 9.50214 7.33423L11.1271 5.70923C11.6205 5.19843 11.8935 4.5143 11.8873 3.80418C11.8811 3.09407 11.5963 2.41478 11.0941 1.91264C10.592 1.41049 9.91271 1.12566 9.2026 1.11949C8.49248 1.11332 7.80835 1.3863 7.29755 1.87965L6.36589 2.8059" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.58271 5.95829C7.35009 5.64731 7.05331 5.38999 6.71249 5.20378C6.37168 5.01758 5.99481 4.90685 5.60744 4.87911C5.22007 4.85137 4.83127 4.90726 4.4674 5.04299C4.10353 5.17873 3.77311 5.39113 3.49854 5.66579L1.87354 7.29079C1.3802 7.80159 1.10721 8.48572 1.11338 9.19584C1.11955 9.90595 1.40439 10.5852 1.90653 11.0874C2.40868 11.5895 3.08796 11.8744 3.79808 11.8805C4.5082 11.8867 5.19233 11.6137 5.70313 11.1204L6.62938 10.1941" stroke-linecap="round" stroke-linejoin="round"/></svg></a>';
                    }
					newHTML +=  '<label class="lkm-exponent-add-exponent">';
					newHTML +=  '<input type="radio" name="' + inputName + '" value="' + curCompany.ID + '" />';
					newHTML +=  '<div class="lkm-exponent-add-exponent-radiobox"></div>';
					newHTML +=  '<div class="lkm-exponent-add-exponent-info">' +
									'<div class="lkm-exponent-add-exponent-info-inner">' +
										'<div class="lkm-exponent-add-exponent-logo"><div class="lkm-exponent-add-exponent-logo-inner"><img src="' + curCompany.LOGOTYPE_SRC + '" alt="" /></div></div>' +
										'<div class="lkm-exponent-add-exponent-text">' +
											'<div class="manager-table-participant-name">' + curCompany.NAME + linkDetail + '</div>' +
											'<div class="manager-table-participant-text">';
					if ( curCompany.BRANDS !== '' ) {
						newHTML +=			  '<span>' + curCompany.BRANDS + '</span>';
					}
					if (curCompany.COUNTRIES !== '' ) {
						newHTML +=			  '<div class="manager-table-participant-text-countries">';
						for (var j = 0; j < curCompany.COUNTRIES.length; j++) {
							newHTML +=			  '<div class="catalogue-item-country-item">';
							newHTML +=				  '<span class="catalogue-item-country-item-hint"><img src="' + curCompany.COUNTRIES[j].FLAG_SRC + '" alt="" /><span class="catalogue-item-country-item-hint-title">' + curCompany.COUNTRIES[j].NAME + '</span></span>';
							newHTML +=				  '<span class="catalogue-item-country-item-title">' + curCompany.COUNTRIES[j].NAME + '</span>';
							if (curCompany.COUNTRIES[j].REGIONS !== '') {
								for (var k = 0; k < curCompany.COUNTRIES[j].REGIONS.length; k++) {
									if (k != 0) {
										newHTML +=	  '<span class="catalogue-item-country-sep"></span>';
									}
									newHTML +=		  '<span class="catalogue-item-country-region">' + curCompany.COUNTRIES[j].REGIONS[k].SHORT + '<span class="catalogue-item-country-region-title">' + curCompany.COUNTRIES[j].REGIONS[k].FULL + '</span></span>';
								}
							}
							newHTML +=			  '</div>';
						}
						newHTML +=			  '</div>';
					}
					newHTML +=			  '</div>' +
										'</div>' +
									'</div>' +
								'</div>';

					newHTML +=  '<div class="lkm-exponent-add-exponent-source"><div class="meet-add-company-title-mobile">Сырье</div>';
					if (curCompany.SOURCE !== '' ) {
						for (var j = 0; j < curCompany.SOURCE.length; j++) {
							newHTML += '<span class="catalogue-item-country-item-hint">' + curCompany.SOURCE[j].LETTER + '<span class="catalogue-item-country-item-hint-title">' + curCompany.SOURCE[j].NAME + '</span></span>';
						}
					}
					newHTML +=  '</div>';

					newHTML +=  '<div class="lkm-exponent-add-exponent-category"><div class="meet-add-company-title-mobile">Категории</div>';
					if (curCompany.CATEGORIES !== '' ) {
						for (var j = 0; j < curCompany.CATEGORIES.length; j++) {
							newHTML += '<span class="catalogue-item-country-item-hint"><img src="' + curCompany.CATEGORIES[j].ICON_SRC + '" alt="" /><span class="catalogue-item-country-item-hint-title">' + curCompany.CATEGORIES[j].NAME + '</span></span>';
						}
					}
					newHTML +=  '</div>';

					newHTML +=  '</label>';
				}
				$('.lkm-exponent-add-list').append(newHTML);

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
				$('.lkm-exponent-add-wrapper .pager').html(pagerHTML);
				if ($('.meet-card-data-item-exponent input').length > 0 && $('.meet-card-data-item-exponent input').val() != '') {
					$('.lkm-exponent-add-exponent input[value="' + $('.meet-card-data-item-exponent input').val() + '"]').prop('checked', true);
				}
			} else {
				$('.lkm-exponent-add-wrapper').removeClass('loading');
				$('.lkm-exponent-add-wrapper .message').remove();
				$('.lkm-exponent-add-wrapper').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">' + data.message + '</div></div>');
			}
		},
		error: function() {
			$('.lkm-exponent-add-wrapper').removeClass('loading');
			$('.lkm-exponent-add-wrapper .message').remove();
			$('.lkm-exponent-add-wrapper').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">Загрузка данных невозможна</div></div>');
		}
	});
}

function lkmMeetAddFilterUpdateVisitor() {
	$('.lkm-visitor-add-wrapper').addClass('loading');
	$('.lkm-visitor-add-wrapper .message').remove();

    var curForm = $('.lkm-visitor-add-wrapper .manager-table-filter-params-window form');
    var curData = curForm.serialize();
    if ($('.lkm-visitor-add-wrapper .manager-table-head a.active').length > 0) {
        if (curData != '') {
            curData += '&';
        }
        curData += 'sortname=' + $('.lkm-visitor-add-wrapper .manager-table-head a.active').attr('data-sortname') + '&sortdir=' + $('.lkm-visitor-add-wrapper .manager-table-head a.active').attr('data-sortdir');
    }
    if ($('.lkm-visitor-add-wrapper .pager a.active').length > 0) {
        if (curData != '') {
            curData += '&';
        }
        curData += 'pager=' + $('.lkm-visitor-add-wrapper .pager a.active').html();
    }

	$.ajax({
		type: 'POST',
		url: $('.lkm-visitor-add-ctrl').attr('data-url'),
		dataType: 'json',
		data: curData,
		cache: false,
		success: function(data) {
			if (data.status) {
				$('.lkm-visitor-add-visitor').remove();
				$('.lkm-visitor-add-wrapper').removeClass('loading');
				$('.lkm-visitor-add-wrapper .message').remove();
				lkmMeetAddDataVisitor = data;
				var newHTML = '';
				var inputName = $('.lkm-visitor-add-list').attr('data-inputname');
				$('.lkm-visitor-add-company-count-current').html(data.data.countOnPage);
				$('.lkm-visitor-add-company-count-all').html(data.data.countAll);
				for (var i = 0; i < data.data.list.length; i++) {
					var curCompany = data.data.list[i];
					newHTML +=  '<label class="lkm-visitor-add-visitor">';
					newHTML +=  '<input type="radio" name="' + inputName + '" value="' + curCompany.ID + '" />';
					newHTML +=  '<div class="lkm-visitor-add-visitor-radiobox"></div>';
					var linkDetail = '';
                    if ( curCompany.LINK_DETAIL !== '' ) {
                        linkDetail = '<a href="' + curCompany.LINK_DETAIL + '" target="_blank"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.41797 7.04173C5.65059 7.35272 5.94737 7.61004 6.28818 7.79624C6.629 7.98244 7.00587 8.09317 7.39324 8.12091C7.78061 8.14865 8.16941 8.09276 8.53328 7.95703C8.89715 7.82129 9.22757 7.60889 9.50214 7.33423L11.1271 5.70923C11.6205 5.19843 11.8935 4.5143 11.8873 3.80418C11.8811 3.09407 11.5963 2.41478 11.0941 1.91264C10.592 1.41049 9.91271 1.12566 9.2026 1.11949C8.49248 1.11332 7.80835 1.3863 7.29755 1.87965L6.36589 2.8059" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.58271 5.95829C7.35009 5.64731 7.05331 5.38999 6.71249 5.20378C6.37168 5.01758 5.99481 4.90685 5.60744 4.87911C5.22007 4.85137 4.83127 4.90726 4.4674 5.04299C4.10353 5.17873 3.77311 5.39113 3.49854 5.66579L1.87354 7.29079C1.3802 7.80159 1.10721 8.48572 1.11338 9.19584C1.11955 9.90595 1.40439 10.5852 1.90653 11.0874C2.40868 11.5895 3.08796 11.8744 3.79808 11.8805C4.5082 11.8867 5.19233 11.6137 5.70313 11.1204L6.62938 10.1941" stroke-linecap="round" stroke-linejoin="round"/></svg></a>';
                    }
					newHTML +=  '<div class="lkm-visitor-add-visitor-info manager-table-cell-company-type-' + curCompany.TYPE + '">' +
									'<div class="manager-table-company-name"><span>' + curCompany.NAME + '</span>' + linkDetail + '</div>' +
									'<div class="manager-table-company-text">';
					if (curCompany.BRANDS !== '' ) {
						newHTML +=	  '<span>' + curCompany.BRANDS + '</span>';
					}
					newHTML +=	  '</div>' +
								'</div>';

					newHTML +=  '<div class="lkm-visitor-add-visitor-city">' + curCompany.CITY + '</div>';
					newHTML +=  '<div class="lkm-visitor-add-visitor-delegate">' +
									'<div class="manager-table-delegate-name">' + curCompany.DATA.NAME + '</div>' +
									'<div class="manager-table-delegate-phone">' + curCompany.DATA.VALUE + '</div>' +
								'</div>';
					newHTML +=  '<div class="lkm-visitor-add-visitor-delegate">' +
									'<div class="manager-table-delegate-name">' + curCompany.DELEGATE.NAME + '</div>' +
									'<div class="manager-table-delegate-phone">' + curCompany.DELEGATE.PHONE + '</div>' +
								'</div>';

					newHTML +=  '</label>';
				}
				$('.lkm-visitor-add-list').append(newHTML);

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
				$('.lkm-visitor-add-wrapper .pager').html(pagerHTML);
				if ($('.meet-card-data-item-visitor input').length > 0 && $('.meet-card-data-item-visitor input').val() != '') {
					$('.lkm-visitor-add-visitor input[value="' + $('.meet-card-data-item-visitor input').val() + '"]').prop('checked', true);
				}
			} else {
				$('.lkm-visitor-add-wrapper').removeClass('loading');
				$('.lkm-visitor-add-wrapper .message').remove();
				$('.lkm-visitor-add-wrapper').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">' + data.message + '</div></div>');
			}
		},
		error: function() {
			$('.lkm-visitor-add-wrapper').removeClass('loading');
			$('.lkm-visitor-add-wrapper .message').remove();
			$('.lkm-visitor-add-wrapper').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">Загрузка данных невозможна</div></div>');
		}
	});
}

function lkmMeetAddDayUpdate() {
	if ($('.meet-card-data-item-exponent input').val() != '' && $('.meet-card-data-item-visitor input').val() != '') {
		$('.meet-add-step-1').removeClass('meet-add-step-1-empty');
		$('.meet-add-step-2').addClass('visible');
		$('.meet-add-form').addClass('loading');
		var filterData = {};
		filterData['exponentID'] = $('.meet-card-data-item-exponent input').val();
		filterData['visitorID'] = $('.meet-card-data-item-visitor input').val();
		$.ajax({
			type: 'POST',
			url: $('.meet-add-step-2').attr('data-url'),
			dataType: 'html',
			data: filterData,
			cache: false,
			success: function(html) {
				$('.meet-add-form').removeClass('loading');
				$('.meet-add-form .message').remove();
				$('.meet-add-step-2').html(html)
			},
			error: function() {
				$('.meet-add-form').removeClass('loading');
				$('.meet-add-form .message').remove();
				$('.meet-add-form').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">Загрузка данных невозможна</div></div>');
			}
		});
	}
}