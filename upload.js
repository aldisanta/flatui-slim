// remap jQuery to $
(function($){})(window.jQuery);
/* trigger when page is ready */
$(document).ready(function (){
  // fotf-upload on change updates hidden value for jquery
  $('.fotf-upload').change(function(event) {
    $(this).siblings('.hidden-upload-input')
            .val($(this).val())
            .trigger('change');
  });
  // functionality on upload
  $('.view-uploaded-file').click(function(event) {
    event.preventDefault();
    var url = '';
    if ($(this).data('url')) {
      url = $(this).data('url');
    }

    var type = 0;
    if ($(this).data('type')) {
      type = $(this).data('type');
    }

    var a = 0;
    if ($(this).data('a')) {
      a = $(this).data('a');
    }

    var b = 0;
    if ($(this).data('b')) {
      b = $(this).data('b');
    }

    var c = 0;
    if ($(this).data('c')) {
      c = $(this).data('c');
    }

    target = url + '/download.asp?' +
          't=' + type +
          '&a=' + a +
          '&b=' + b +
          '&c=' + c +
          '';
    window.open(target, '_blank');
  });

  $('.remove-uploaded-file').click(function(event) {
    event.preventDefault();
    var self = this;
    var url = "/ajax/ajax_remove_uploaded_file.asp";
    var x = '';
    if ($(this).data('x')) {
      x = $(this).data('x');
    }

    var y = 0;
    if ($(this).data('y')) {
      y = $(this).data('y');
    }

    var z = '';
    if ($(this).data('z')) {
      z = $(this).data('z');
    }

    var r = '';
    if ($(this).data('r')) {
      r = $(this).data('r');
    }

    if (confirm("Are you sure you want to remove this uploaded file?")) {
      $.ajax({
        url: url,
        type: 'POST',
        data: {x: x, y: y, z: z, r: r},
      })
      .done(function() {
        if ($(self).parent('span').prop('id').indexOf('uploadedDoc_') > -1) {
          var row = $(self).parent('span').closest('.passport-group');
          if (row.hasClass('required')) {
            row.find('input[type=file]').addClass('required');
          }
          $(self).parent('span').hide();
          var id = $(self).parent('span').prev('.fotf-upload').prop('id');
          var doc = $(self).parent('span').prop('id') + '_DOC';
          var upl_doc = id + '_DOC';
          var upl_ori = id + '_ORI';
          if ($('#' + doc)) {
            $('#' + doc).val('')
                        .next('input.uploaded-file')
                        .data('toggle', false);
            //remove hidden value for jquery validation
            if ($('#hd_upl' + id)) {
              $('#hd_upl' + id).val('');
            }
            //checks if there's already file uploaded
            var component = $(self).closest('.input').find('.fotf-upload');
            if ($(component).val().length > 0) {
              $(component).trigger('change');
            }
          }
        }
      })
      .fail(function() {
      })
      .always(function() {
      });
    }
  });
});