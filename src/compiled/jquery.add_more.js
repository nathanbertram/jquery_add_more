var jqueryAddMore, jqueryAddMoreDeleteButtonCheck;

jqueryAddMore = function() {
  jqueryAddMoreDeleteButtonCheck();
  $(".add-multiples-link").click(function() {
    var attribute_key, attribute_re, data_group, new_elem, new_object_id;
    data_group = $(this).attr("data-group");
    attribute_key = $(this).attr("data-attribute-key");
    new_object_id = new Date().getTime();
    new_elem = $(".add-multiples[data-group=" + data_group + "]:visible").last().clone(true).insertAfter($(".add-multiples[data-group=" + data_group + "]:last"));
    attribute_re = new RegExp("\\[" + attribute_key + "\\]\\[([0-9])+\\]");
    $(".add-multiples[data-group=" + data_group + "]:last textarea").each(function() {
      $(this).text("");
      return $(this).attr("name", $(this).attr("name").replace(attribute_re, "[" + attribute_key + "][" + new_object_id + "]"));
    });
    $(add_multiples_selector + ":last select").each(function() {
      return $(this).attr("name", $(this).attr("name").replace(attribute_re, "[" + attribute_key + "][" + new_object_id + "]"));
    });
    $(".add-multiples[data-group=" + data_group + "]:last input").each(function() {
      if (!$(this).attr("type").match(/radio|check/)) {
        $(this).attr("value", "");
      }
      return $(this).attr("name", $(this).attr("name").replace(attribute_re, "[" + attribute_key + "][" + new_object_id + "]"));
    });
    $(".add-multiples[data-group=" + data_group + "]:last .remove_contents").each(function() {
      return $(this).remove();
    });
    jqueryAddMoreDeleteButtonCheck();
    $(this).trigger('add_more:add_multiples_complete');
    return false;
  });
  $(".remove-multiples-link").live("click", function() {
    var destroy_elem;
    destroy_elem = $(this).closest(".add-multiples").find("input[type=checkbox]");
    if (destroy_elem.length === 0) {
      $(this).closest(".add-multiples").remove();
    } else {
      destroy_elem.attr("checked", "checked");
      $(this).closest(".add-multiples").hide();
    }
    jqueryAddMoreDeleteButtonCheck();
    $(this).trigger('add_more:remove_multiples_complete');
    return false;
  });
  return false;
};

jqueryAddMoreDeleteButtonCheck = function() {
  var data_groups;
  data_groups = [];
  $(".add-multiples").each(function() {
    return data_groups.push($(this).attr("data-group"));
  });
  $.each($.unique(data_groups), function(index, data_group) {
    var parent;
    parent = $(".add-multiples[data-group=" + data_group + "]");
    if ($(".add-multiples[data-group=" + data_group + "]:visible").size() === 1) {
      return parent.find(".remove-multiples-link").hide();
    } else {
      return parent.find(".remove-multiples-link").show();
    }
  });
  return false;
};

window.jqueryAddMoreDeleteButtonCheck = jqueryAddMoreDeleteButtonCheck;
window.jqueryAddMore = jqueryAddMore;