/* =============================================================
 * flatui-checkbox.js v0.0.2
 * ============================================================ */

!function ($) {

 /* CHECKBOX PUBLIC CLASS DEFINITION
	* ============================== */

	var Checkbox = function (element, options) {
		this.init(element, options);
	}

	Checkbox.prototype = {

		constructor: Checkbox

		, init: function (element, options) {
			var $el = this.$element = $(element)

			this.options = $.extend({}, $.fn.checkbox.defaults, options);
			$el.before(this.options.template);
			this.setState();
		}

		, setState: function () {
			var $el = this.$element
				, $parent = $el.closest('.checkbox');

			var value = $('#hd_chk' + $el.attr('id')).val();
			if (parseInt(value) == 1) {
				$el.prop('checked', true);
				$parent.addClass('checked');
			}

			$el.prop('disabled') && $parent.addClass('disabled');
			$el.prop('checked') && $parent.addClass('checked');
		}

		, toggle: function () {
			var ch = 'checked'
				, $el = this.$element
				, $parent = $el.closest('.checkbox')
				, $input = $parent.prev('input')
				, checked = $el.prop(ch)
				, e = $.Event('toggle');

			if ($el.prop('disabled') == false) {
				$parent.toggleClass(ch) && checked ? $el.removeAttr(ch) : $el.attr(ch, true);
				$el.trigger(e).trigger('change');
			}

			$el.trigger(e).trigger('change');
			var sAttrName = $el.attr('name');
			var sAttrID = $el.attr('id');
			if (sAttrName.substring(0,5) == "chkQ_") {
				if ($parent.attr('class') == "checkbox checked") {
					//$el.attr('checked', 'checked');
					$("#" + sAttrID).prop('checked', true);
				} else {
					//$el.attr(ch, false);
					$("#" + sAttrID).prop('checked', false);
				}
			}

			if ($el.hasClass('multiple-checkbox')) {
				var value = '';
				var array = [];
				$('#hd_chk' + $el.attr('name')).val(value);
				$el.closest('div.input')
					.children('label.checkbox')
					.each(function(index, el) {
					if ($(el).hasClass('checked')) {
						array.push($(el).children('input.multiple-checkbox').val())
					}
				});
				value = array.join('|~~~|');
				$('#hd_chk' + $el.attr('name')).val(value).trigger('change');
			}
			else {
				if ($('#' + $el.attr('id')).parent('label').hasClass('checked')) {
					value = 1;
				} else {
					value = '';
				}
				$('#hd_chk' + $el.attr('id')).val(value).trigger('change');
			}
		}

		, setCheck: function (option) {
			var d = 'disabled'
				, ch = 'checked'
				, $el = this.$element
				, $parent = $el.closest('.checkbox')
				, checkAction = option == 'check' ? true : false
				, e = $.Event(option)

			$parent[checkAction ? 'addClass' : 'removeClass' ](ch) && checkAction ? $el.attr(ch, true) : $el.removeAttr(ch);
			$el.trigger(e).trigger('change');
		}
	}


 /* CHECKBOX PLUGIN DEFINITION
	* ======================== */

	var old = $.fn.checkbox

	$.fn.checkbox = function (option) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('checkbox')
				, options = $.extend({}, $.fn.checkbox.defaults, $this.data(), typeof option == 'object' && option);
			if (!data) $this.data('checkbox', (data = new Checkbox(this, options)));
			if (option == 'toggle') data.toggle()
			if (option == 'check' || option == 'uncheck') data.setCheck(option)
			else if (option) data.setState();
		});
	}

	$.fn.checkbox.defaults = {
		template: '<span class="icons"><span class="first-icon fui-checkbox-unchecked"></span><span class="second-icon fui-checkbox-checked"></span></span>'
	}


 /* CHECKBOX NO CONFLICT
	* ================== */

	$.fn.checkbox.noConflict = function () {
		$.fn.checkbox = old;
		return this;
	}


 /* CHECKBOX DATA-API
	* =============== */

	$(document).on('click.checkbox.data-api', '[data-toggle^=checkbox], .checkbox', function (e) {
		var $checkbox = $(e.target);
		if (e.target.tagName != "A") {
			e && e.preventDefault() && e.stopPropagation();
			if (!$checkbox.hasClass('checkbox')) $checkbox = $checkbox.closest('.checkbox');
			$checkbox.find(':checkbox').checkbox('toggle');
		}
	});

	$(window).on('load', function () {
		$('.flatui-checkbox').each(function () {
			var $checkbox = $(this);
			$checkbox.checkbox();
		});
	});

}(window.jQuery);