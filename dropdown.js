/**
 * [safe_tags description]
 */
function safe_tags(str) {
    var str = str.replace(/""/g,'\"');
    return str.replace(/&/g,'&amp;')
              .replace(/</g,'&lt;')
              .replace(/>/g,'&gt;')
              .replace(/"/g, '&quot;')
              .replace(/''/g,'\'');
}

/*extending icontains*/
jQuery.expr[':'].icontains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};

// the widget definition, where "flatui" is the namespace,
// "dropdown" the widget name
$.widget( "flatui.dropdown", {
  // default options
  options: {
    //mode, enable dropdown searchable
    searchable: false,
    //required
    required: 0,
    //identifier
    identifier: 'dropdown',
    //hidden dropdown
    hidden_dropdown: '',
    //tab_index
    tab_index: 0,
    //initial form flag
    pre_init: true,
    //initial Value
    pre_value: '',
    //initial String Value
    pre_label_value: 'Please Select Dropdown',
    //div.input width
    input_width: '',
    //open flag
    isOpen: false,
    // callbacks
    change: null,
  },

  /**
   * _create : constructor
   */
  _create: function() {

    // get the select element
    var $select = this.element,
        opts = this.options;

    // hide select element
    $select.hide();

    // create the dropdown
    var dropdown = this._createDropdown();
    this.dropdown = $( dropdown );

    // cache commonly used elements
    this._cacheElements();

    this.selectLiBehavior = function () {
      return '_selectLi';
    }

    //special class
    if (opts.special) {
      if (opts.special.class_name != '') {
        this.dropdown.addClass(opts.special.class_name);
      }
    }

    // initial toggle type
    $('#' + opts.identifier).trigger('change');

    // bind UI actions
    this._bindUIActions();

    // append the created dropdown to the page
    $select.after( this.dropdown )

    this._refresh();
  },

  // called when created, and later when changing options
  _refresh: function() {
  },

  // events bound via _on are removed automatically
  // revert other modifications here
  _destroy: function() {
    this.dropdown.remove();
    this.element.show();
  },

  /**
   * _createLi : Create li
   * @param  {string} val  : value property of option
   * @param  {string} text : label property of option
   * @return {string}      : li
   */
  _createLi: function( val, text ) {
    //return '\t<li data-value="' + val + '">' + '<span data-value="' + val + '">' + text + '</span>' + '</li>\n';
    var opts = this.options;
    return '\t<li id="' + opts.identifier + '_' + val + '" v="' + val + '" data-value="' + safe_tags(text) + '" data-v="' + val + '">'
            + '<span data-value="' + safe_tags(text) + '" data-v="' + val + '">' + safe_tags(text) + '</span>' + '</li>\n';
  },

  /**
   * _createLis : Create dropdown list
   * @param  {element} : DOM element
   * @return {string} : lis
   */
  _createLis: function( options ) {
    var self = this, lis = [];
    $.each( options, function( key, option ) {
      var $option = $( option ),
        li = self._createLi( $option.val(), $option.text() );
      lis.push( li );
    });
    return lis.join('');
  },

  /**
   * _createDropdown : create dropdown
   * @return {string} : ul lis
   */
  _createDropdown: function() {
    var $select = this.element,
        opts = this.options,
        dropdown = '';

    if (!opts.pre_init) {
      opts.pre_label_value = $select.children(":selected").text();
      opts.pre_value = $select.val();
    }
    var string_value = safe_tags(opts.pre_label_value);
    var value = opts.pre_value;
    //options expanded
    var e = false;
    if (opts.isOpen) {
      e = true;
    }

    dropdown += '<div class="input" style="min-width:200px;width:' + opts.input_width + '">';
    dropdown += '<div id="' + opts.identifier + 'dd" class="styled-select ' + opts.hidden_dropdown +'">';
    dropdown += '<div class="dropdown" tabindex="'+ opts.tab_index +'">\n';
    dropdown += '\t<a id="' + opts.identifier + '-arrow" class="dropdown-button" href="#">\n';
    dropdown += '\t<img width="12" src="/i/bkgd-down-arrow@2x.png">\n';
    dropdown += '\t</a>\n';
    if (opts.searchable) {
      dropdown += '\t<input id="txt' + opts.identifier
                + '" name="txt' + opts.identifier + '"'
                + ' class="dropdown-input" type="text" '
                + 'data-l="false" '
                + 'data-v="' + value + '" value="' + string_value + '" '
                + '>\n';
    } else {
      dropdown += '\t<input id="txt' + opts.identifier
                + '" name="txt' + opts.identifier + '"'
                + ' class="dropdown-input" readonly type="text" '
                + 'data-l="false" '
                + 'data-v="' + value + '" value="' + string_value + '" '
                + '>\n';
    }

    if (opts.required) {
      dropdown += '\t<input id="hd_sel' + opts.identifier + '" class="required" type="hidden" readonly="" name="hd_sel' + opts.identifier + '" value="' + value
                + '">\n';
    } else {
      dropdown += '\t<input id="hd_sel' + opts.identifier + '" type="hidden" readonly="" name="hd_sel' + opts.identifier + '" value="' + value
                + '">\n';
    }
    dropdown += '\t<input id="txt' + opts.identifier + '_top" name="txt' + opts.identifier + '_top" type="hidden" readonly="" value="0" name="txt' + opts.identifier + '_top">\n';
    dropdown += '</div>\n';
    dropdown += '<ul id="' + opts.identifier + '_options" ' +
                'class="dropdown-options" ' +
                'data-e="' + e + '">\n';
    // loop through select element and grab options
    // and make them lis
    dropdown += this._createLis( $select.children( 'option' ) );
    dropdown += '</ul>\n';
    dropdown += '</div>\n';
    dropdown += '</div>\n';

    return dropdown;
  },

  /**
   * _openClose : open close animation
   */
  _openClose: function(e) {
    if (e) {
      e.preventDefault();
    }
    var i = 0;
    var self = this
        ,opts = this.options
        ,cache = this.cached;

    cache['.dropdown-options li'].each(function(index, el) {
      $(this).children('span').show();
      $(this).show();
    });

    //expand flag toggling
    if (cache['.dropdown-options'].data('e')) {
      cache['.dropdown-options'].data('e', false);
    } else {
      cache['.dropdown-options'].data('e', true);
    }

    //hides other dropdown on click
    $(document).find('ul.dropdown-options').each(function(index, el) {
      if (el.id != opts.identifier + '_options'
          && $(el).data('e'))
      {
        $('#' + el.id).hide();
        $('#' + el.id).data('e', false);
      }
    });

    //clears placeholder on click arrow
    /**
    if (!cache['.dropdown-input'].data('l')) {
      cache['.dropdown-input'].val('');
      cache['.dropdown-input'].data('v', '');
    }
    /**/

    cache['.dropdown-input'].data('l', false);
    cache['.dropdown-input'].closest('div.form-row')
                            .removeClass('required invalid');
    //set dropdown content width
    //$('ul.dropdown-options').css('max-width', $('div.dropdown').css('width'));
    cache['.dropdown-options'].slideToggle();
  },

  /**
   * [_openCloseUpdateValue description]
   * @param  {object} e : event object
   * @return {[type]}   [description]
   */
  _openCloseUpdateValue: function(e) {
    var opts = this.options
        , cached = this.cached
        , value = $(e.target).data('v')
        , clicked = '#' + opts.identifier + '_' + value;
    if (!value && this.element.data('required') == 1) {
      cached['.dropdown-input'].closest('div.form-row')
                              .addClass('required');
    }
    $(clicked).trigger('click');
  },

  /**
   * _selectLi : on click select value
   * @param  {object} e : event
   */
  _selectLi: function( e ) {
    var $selectedLi = $( e.target ),
        selectedValue = $selectedLi.data( 'v' )
        selectedStringValue = $selectedLi.data( 'value' );
        opts = this.options;
    this.cached['.dropdown-input'].val( selectedStringValue );
    this.cached['.dropdown-input'].data('v', selectedValue );
    this.cached['.dropdown-input'].next().val(selectedValue );
    this.cached['.dropdown-input'].data('l', true);
    this._openClose();
    this.element.children('option :selected').prop('selected', false);
    this.element.val( selectedValue );
    this._trigger( "change" );
    this.dropdown.find('div.dropdown').focus();
    $('#' + opts.identifier).trigger('change');
  },

  /**
   * _dropdownKeyBehavior : keyboard behavior on input
   * @param  {object} e : event
   */
  _dropdownKeyBehavior: function(e) {
    switch (e.which) {
      case 38: //up
        if (this.count_down > 0) {
          //increase count up
          this.count_up = (this.count_up || 0) + 1
          this.count_down = this.count_down - (this.count_up + 1)
          if (this.count_down >= 0 && this.count_down < Object.keys(this.cached_result_label_value).length) {
            this.cached['.dropdown-input'].val(this.cached_result_label_value[this.count_down]);
          }
        }
        break;
      case 40: //down
        this.count_up = 0
        var term = $.trim(this.cached['.dropdown-input'].val()),
            $results = null;

        if (term !== '' && term !== this.options.pre_label_value) {
          $results = this.cached['.dropdown-options li'].find( 'span:icontains(' + term + ')' );
        } else {
          this.cached['.dropdown-options'].show();
          this.cached['.dropdown-options li'].show();
          this.cached['.dropdown-options li'].children().show();
          $results = this.cached['.dropdown-options li'].find( 'span' );
        }

        if (this.count_down < 1) {
          var self = this;
          $results.each(function(index, el) {
            self.cached_result_label_value[index] = $(el).data('value');
            self.cached_result_value[index] = $(el).data('v');
          });
        }

        if (this.count_down < Object.keys(this.cached_result_label_value).length) {
          var selectedLabelValue = this.cached_result_label_value[this.count_down];
          var selectedValue = this.cached_result_value[this.count_down];
          //text value
          this.cached['.dropdown-input'].val(selectedLabelValue);
          this.cached['.dropdown-input'].data('v', selectedValue);
          this.cached['.dropdown-input'].next().val(selectedValue);
        }
        //increase count down
        this.count_down = (this.count_down || 0) + 1
        break;
      default:
        this.count_up = 0;
        this.count_down = 0;
        this.cached_result = null;
        var term = $.trim(this.cached['.dropdown-input'].val()),
            $results = null;

        if (term !== '') {
          $results = this.cached['.dropdown-options li'].find( 'span:icontains(' + term + ')' );
        }

        if ($results) {
          this.cached['.dropdown-options'].show();
          this.cached['.dropdown-options li'].show();
          this.cached['.dropdown-options li'].children().show();

          var $spans = this.cached['.dropdown-options li'].children().not( $results );
          $spans.parent().hide();
          $spans.hide();
        } else {
          this.cached['.dropdown-options'].hide();
          this.cached['.dropdown-options li'].show();
          this.cached['.dropdown-options li'].children().show();
        }
        break;
    };
  },

  _clearInputCache: function(e) {
    var cached = this.cached;
    cached['.dropdown-input'].data('v', '');
    cached['.dropdown-input'].val('');
    cached['.dropdown-input'].closest('div.form-row')
                            .removeClass('required invalid');
  },

  _selectAll: function() {
    $(this).select();
  },

  /**
   * _bindUIActions : bind UI Event on dropdown
   */
  _bindUIActions: function() {
    var opts = this.options;

    // initial show/hide
    this.cached['.dropdown-options'].hide();
    if (opts.isOpen) {
      this.cached['.dropdown-options'].show();
    }

    // show/hide
    this._on(this.cached['.dropdown-button'], {
      click: '_openClose'
    });

    // item select
    this._on( this.cached['.dropdown-options li'], {
      //click: this.selectLiBehavior()
      click: '_selectLi'
    });

    if (opts.searchable) {
      //count number of up key pressed
      this.count_up = 0;
      //count number of down key pressed
      this.count_down = 0;
      //search terms result cache
      this.cached_result_label_value = this.cached_result_label_value || {};
      this.cached_result_value = this.cached_result_value || {};
      //autocomplete
      this._on( this.cached['.dropdown-input'], {
        click: '_clearInputCache'
        , keyup: '_dropdownKeyBehavior'
        , focus: '_clearInputCache'
        , blur: '_openCloseUpdateValue'
      })
    } else {
      // show/hide on input & remove cursor
      this._on(this.cached['.dropdown-input'], {
        focus: function () {
          $(this.cached['.dropdown-input']).blur();
          return false;
        }
        , click: '_openClose'
      });
    }
  },

  val: function() {
    return this.element.children(":selected").val();
  },

  text: function() {
    return this.element.children(":selected").text();
  },

  // _setOptions is called with a hash of all options that are changing
  // always refresh when changing options
  _setOptions: function() {
    // _super and _superApply handle keeping the right this-context
    this._superApply( arguments );
    this._refresh();
  },

  // _setOption is called for each individual option that is changing
  _setOption: function( key, value ) {
    this._super( key, value );
  },

  /**
   * _cacheElements : cached DOM Elements
   */
  _cacheElements: function() {
    var $dropdown = this.dropdown,
        $txtboxBtn = $dropdown.find('.dropdown-button'),
        $dropdown_input = $dropdown.find('.dropdown-input'),
        $options = $dropdown.find('.dropdown-options'),
        $lis = $options.children()

    this.cached = {
      ".dropdown-button": $txtboxBtn,
      ".dropdown-options": $options,
      ".dropdown-options li": $lis,
      ".dropdown-input": $dropdown_input
    };
  }
});

//initialization on load
$(window).on('load', function () {
  $('.flatui-dropdown').each(function (ix, el) {
    var id = $(el).attr('id');
    if (id.indexOf('sel') > -1 ) {
      id = id.replace('sel', '');
    }
    //option passed upon initialization, using data (attributes)
    var opts = {
      identifier : $(el).attr('id')
      , tab_index : $(el).data('tab-index')
      , pre_init : parseInt($(el).data('pre-init'))
      , pre_label_value : $(el).data('pre-label-value')
      , hidden_dropdown : $(el).data('hidden-dropdown')
      , input_width : $(el).data('input-width')
      , required : parseInt($(el).data('required'))
    }
    $(el).dropdown(opts);
  });
});