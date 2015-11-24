/*extending icontains*/
jQuery.expr[':'].icontains = function(a, i, m) {
	return jQuery(a).text().toUpperCase()
			.indexOf(m[3].toUpperCase()) >= 0;
};

$.widget( "flatui-slim.manage_question", {
	// default options
	options: {
		order : false
		,edit : false
		,disable : false
		,fotf : false
	},

	/**
	 * _create : constructor
	 */
	_create: function() {
		// get the select element
		var self = this,
				$elem = this.element,
				opts = this.options;

		//sortable
		if (opts.order) {
			this.element.find('.sortable').sortable({
				items: '.form-row:not(.sort-disabled, .group-children)'
				, create: function (e, ui) {
					$(this).data('original-stack', $(this).sortable('toArray'));
				}
				, placeholder: 'ui-state-highlight'
				, connectWith: $(this).attr('id')
				, update: function (e,ui) {
					var updated = $(this).sortable('toArray');
					//self._updateOrderNumber(updated);
				}
			});
		}
		//this._refresh();
	},
});