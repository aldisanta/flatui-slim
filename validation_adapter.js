/* =============================================================
 * validation_adapter.js v0.0.2
 * ============================================================ */

!function ($) {

 /* ValidationAdapter PUBLIC CLASS DEFINITION
	* ============================== */

	var ValidationAdapter = function (element, options) {
		this.init(element, options);
	}

	ValidationAdapter.prototype = {

		constructor: ValidationAdapter

		, init: function (element, options) {
			var $el = this.$element = $(element)
			this.options = $.extend({}, options);
			this.adapter();
		}

		, adapter: function () {
			var $el = this.$element;
			//validation adjustment
				//event listener : change on textbox
				$('#' + $el.attr('id') + ' .input-text').change(function(event) {
					if ($(this).valid() && $(this).hasClass('valid') ) {
						$(this).closest('div.form-row')
								.removeClass('required invalid hint');
					}
				});

				//event listener : focusin on textbox
				$('#' + $el.attr('id') + ' .input-text').focus(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('required invalid');
						$(this).closest('div.form-row').addClass('hint');
					}
				});

				$('#' + $el.attr('id') + ' .input-text').blur(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('hint');
					}

					if (!$(this).valid() && !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').addClass('required');
					}
				});

				//event listener : change on textbox
				$('#' + $el.attr('id') + ' .input-phone').change(function(event) {
					if ($(this).valid() && $(this).hasClass('valid') ) {
						$(this).closest('div.form-row')
								.removeClass('required invalid hint');
					}
				});

				//event listener : focusin on textbox
				$('#' + $el.attr('id') + ' .input-phone').focus(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('required invalid');
						$(this).closest('div.form-row').addClass('hint');
					}
				});

				$('#' + $el.attr('id') + ' .input-phone').blur(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('hint');
					}
					if (!$(this).valid() && !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').addClass('required');
					}
				});

				//event listener : change on textbox
				$('#' + $el.attr('id') + ' .input-late-code').change(function(event) {
					if ($(this).valid() && $(this).hasClass('valid') ) {
						$(this).closest('div.form-row')
								.removeClass('required invalid hint');
					}
				});

				//event listener : focusin on late-codebox
				$('#' + $el.attr('id') + ' .input-late-code').focus(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('required invalid');
						$(this).closest('div.form-row').addClass('hint');
					}
				});

				$('#' + $el.attr('id') + ' .input-late-code').blur(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('hint');
					}

					if (!$(this).valid() && !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').addClass('required');
					}
				});

				//event listener : change on textbox email
				$('#' + $el.attr('id') + ' .input-email').change(function(event) {
					if ($(this).valid() && $(this).hasClass('valid')) {
						$(this).closest('div.form-row')
								.removeClass('required invalid hint');
					}
				});

				//event listener : focusin on textbox email
				$('#' + $el.attr('id') + ' .input-email').focus(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('required invalid');
						$(this).closest('div.form-row').addClass('hint');
					}
				});

				$('#' + $el.attr('id') + ' .input-email').blur(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('hint');
					}

					if (!$(this).valid() && !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').addClass('required');
					}
				});

				//event listener : change on textbox email
				$('#' + $el.attr('id') + ' .input-email-reference').change(function(event) {
					if ($(this).valid() && $(this).hasClass('valid')) {
						$(this).closest('div.form-row')
								.removeClass('required invalid hint');
					}
				});

				//event listener : focusin on textbox email
				$('#' + $el.attr('id') + ' .input-email-reference').focus(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('required invalid');
						$(this).closest('div.form-row').addClass('hint');
					}
				});

				$('#' + $el.attr('id') + ' .input-email-reference').blur(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('hint');
					}

					if (!$(this).valid() && !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').addClass('required');
					}
				});

				//event listener : change on textbox email
				$('#' + $el.attr('id') + ' .input-textarea').change(function(event) {
					if ($(this).valid() && $(this).hasClass('valid')) {
						$(this).closest('div.form-row')
								.removeClass('required invalid hint');
						$(this).next('label.error').hide();
					}
				});

				//event listener : focusin on textbox
				$('#' + $el.attr('id') + ' .input-textarea').focus(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('required invalid');
						$(this).closest('div.form-row').addClass('hint');
					}
				});

				$('#' + $el.attr('id') + ' .input-textarea').blur(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('hint');
					}

					if (!$(this).valid() && !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').addClass('required');
					}
				});

				//event listener : change on calendar
				$('#' + $el.attr('id') + ' .input-calendar').change(function(event) {
					if ($(this).valid() && $(this).hasClass('valid')) {
						$(this).closest('div.form-row')
								.removeClass('required invalid hint');
						$(this).next('label.error').hide();
					}
				});

				//event listener : focusin on calendar
				$('#' + $el.attr('id') + ' .input-calendar').focus(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('required invalid');
						$(this).closest('div.form-row').addClass('hint');
					}
				});

				//event listener : focusin on calendar
				$('#' + $el.attr('id') + ' .input-calendar').blur(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('hint');
					}

					if (!$(this).valid() && !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').addClass('required');
					}
				});

				//event listener : change on year
				$('#' + $el.attr('id') + ' .input-year').change(function(event) {
					if ($(this).valid() && $(this).hasClass('valid')) {
						$(this).closest('div.form-row')
								.removeClass('required invalid hint');
						$(this).next('label.error').hide();
					}
				});

				//event listener : focusin on year
				$('#' + $el.attr('id') + ' .input-year').focus(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('required invalid');
						$(this).closest('div.form-row').addClass('hint');
					}
				});

				//event listener : focusin on year
				$('#' + $el.attr('id') + ' .input-year').blur(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('hint');
					}

					if (!$(this).valid() && !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').addClass('required');
					}
				});

				$('#' + $el.attr('id') + ' .hidden-radio-input').change(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('hint');
					} else {
						$(this).closest('div.form-row').removeClass('required');
					}

					if (!$(this).valid() && !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').addClass('required');
					}
				});

				$('#' + $el.attr('id') + ' .hidden-checkbox-input').change(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('hint');
					} else {
						$(this).closest('div.form-row').removeClass('required');
					}

					if (!$(this).valid() && !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').addClass('required');
					}
				});

				$('#' + $el.attr('id') + ' .hidden-upload-input').change(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('hint');
					} else {
						$(this).closest('div.form-row').removeClass('required');
					}

					if (!$(this).valid() && !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').addClass('required');
					}
				});

				$('#' + $el.attr('id') + ' .fotf-upload').change(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('hint');
					} else {
						$(this).closest('div.form-row').removeClass('required');
					}

					if (!$(this).valid() && !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').addClass('required');
					}
				});

				$('#' + $el.attr('id') + ' .hidden-multiple-checkbox-input').change(function(event) {
					if (!$(this).valid() || !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').removeClass('hint');
					} else {
						$(this).closest('div.form-row').removeClass('required');
					}

					if (!$(this).valid() && !$(this).hasClass('valid')) {
						$(this).closest('div.form-row').addClass('required');
					}
				});
			//end of validation adjustment
		}
	}

	var old = $.fn.ValidationAdapter

	$.fn.ValidationAdapter = function (option) {
		return this.each(function () {
			var $this = $(this)
				, options = $.extend({}, option);
			new ValidationAdapter(this, options);
		});
	}

 /* ValidationAdapter NO CONFLICT
	* ================== */

	$.fn.ValidationAdapter.noConflict = function () {
		$.fn.ValidationAdapter = old;
		return this;
	}


 /* ValidationAdapter DATA-API
	* =============== */
	$(window).on('load', function () {
		$('form.validation-adapter').each(function () {
			var $ValidationAdapter = $(this);
			$ValidationAdapter.ValidationAdapter();
		});
	});

}(window.jQuery);

function animate_validation (argument) {
	if ($('.form-row.invalid').first().length > 0) {
		$('html, body').animate({ scrollTop: $('.form-row.invalid').first().offset().top }, 'slow');
	} else if ($('.form-row.required').first().length > 0) {
		$('html, body').animate({ scrollTop: $('.form-row.required').first().offset().top }, 'slow');
	}
}

function toggle_required_class (element_name, mode) {
	if (mode == 'save-for-later') {
		$('#' + element_name + ' input.required').addClass('required-save-for-later');
		$('#' + element_name + ' textarea.required').addClass('required-save-for-later');
		$('#' + element_name + ' select.required').addClass('required-save-for-later');
		$('#' + element_name + ' input.required').removeClass('required');
		$('#' + element_name + ' textarea.required').removeClass('required');
		$('#' + element_name + ' select.required').removeClass('required');
	} else {
		$('#' + element_name + ' input.required-save-for-later').addClass('required');
		$('#' + element_name + ' textarea.required-save-for-later').addClass('required');
		$('#' + element_name + ' select.required-save-for-later').addClass('required');
		$('#' + element_name + ' input.required-save-for-later').removeClass('required-save-for-later');
		$('#' + element_name + ' textarea.required-save-for-later').removeClass('required-save-for-later');
		$('#' + element_name + ' select.required-save-for-later').removeClass('required-save-for-later');
	}
}