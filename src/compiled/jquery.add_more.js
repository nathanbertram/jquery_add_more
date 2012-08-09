(function() {
  var add_another_mangement, delete_button_check;
  add_another_mangement = function() {
    delete_button_check();
    $(".add_multiples_link").click(function() {
      var attribute_key, attribute_re, data_group, new_elem, new_object_id;
      data_group = $(this).attr("data-group");
      attribute_key = $(this).attr("data-attribute-key");
      new_object_id = new Date().getTime();
      new_elem = $(".add_multiples[data-group=" + data_group + "]:visible").last().clone(true).insertAfter($(".add_multiples[data-group=" + data_group + "]:last"));
      attribute_re = new RegExp("\\[" + attribute_key + "\\]\\[([0-9])+\\]");
      $(".add_multiples[data-group=" + data_group + "]:last textarea").each(function() {
        $(this).text("");
        return $(this).attr("name", $(this).attr("name").replace(attribute_re, "[" + attribute_key + "][" + new_object_id + "]"));
      });
      $(add_multiples_selector + ":last select").each(function() {
        return $(this).attr("name", $(this).attr("name").replace(attribute_re, "[" + attribute_key + "][" + new_object_id + "]"));
      });
      $(".add_multiples[data-group=" + data_group + "]:last input").each(function() {
        if (!$(this).attr("type").match(/radio|check/)) {
          $(this).attr("value", "");
        }
        return $(this).attr("name", $(this).attr("name").replace(attribute_re, "[" + attribute_key + "][" + new_object_id + "]"));
      });
      $(".add_multiples[data-group=" + data_group + "]:last .remove_contents").each(function() {
        return $(this).remove();
      });
      delete_button_check();
      return false;
    });
    return $(".remove_fieldset_link").live("click", function() {
      var destroy_elem;
      destroy_elem = $(this).closest(".add_multiples").find("input[type=checkbox]");
      if (destroy_elem.length === 0) {
        $(this).closest(".add_multiples").remove();
      } else {
        destroy_elem.attr("checked", "checked");
        $(this).closest(".add_multiples").hide();
      }
      delete_button_check();
      return false;
    });
  };
  delete_button_check = function() {
    var data_groups;
    data_groups = [];
    $(".add_multiples").each(function() {
      return data_groups.push($(this).attr("data-group"));
    });
    return $.each($.unique(data_groups), function(index, data_group) {
      var parent;
      parent = $(".add_multiples[data-group=" + data_group + "]");
      if ($(".add_multiples[data-group=" + data_group + "]:visible").size() === 1) {
        return parent.find(".remove_fieldset_link").hide();
      } else {
        return parent.find(".remove_fieldset_link").show();
      }
    });
  };
  window.delete_button_check = delete_button_check;
  window.add_another_mangement = add_another_mangement;
}).call(this);
