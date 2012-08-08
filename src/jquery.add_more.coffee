add_another_mangement = (callback) ->
  delete_button_check()
  $(".add_multiples_link").click ->
    data_group = $(this).attr("data-group")
    attribute_key = $(this).attr("data-attribute-key")
    new_object_id = new Date().getTime()
    new_elem = $(".add_multiples[data-group=" + data_group + "]:visible").last().clone(true).insertAfter($(".add_multiples[data-group=" + data_group + "]:last"))
    attribute_re = new RegExp("\\[" + attribute_key + "\\]\\[([0-9])+\\]")

    # Clear out textareas & rename
    $(".add_multiples[data-group=" + data_group + "]:last textarea").each ->
    $(this).text ""
    $(this).attr "name", $(this).attr("name").replace(attribute_re, "[" + attribute_key + "][" + new_object_id + "]")


    # Rename selects
    $(add_multiples_selector + ":last select").each ->
    $(this).attr "name", $(this).attr("name").replace(attribute_re, "[" + attribute_key + "][" + new_object_id + "]")


    # Clear out inputs & rename
    $(".add_multiples[data-group=" + data_group + "]:last input").each ->
    $(this).attr "value", ""  unless $(this).attr("type").match(/radio|check/)
    $(this).attr "name", $(this).attr("name").replace(attribute_re, "[" + attribute_key + "][" + new_object_id + "]")


    # When you add another row - remove stuff you no want
    $(".add_multiples[data-group=" + data_group + "]:last .remove_contents").each ->
    $(this).remove()

    delete_button_check()
    callback(new_elem) if arguments.length == 1
    false

  $(".remove_fieldset_link").live "click", ->
    destroy_elem = $(this).closest(".add_multiples").find("input[type=checkbox]")
    if destroy_elem.length is 0
      $(this).closest(".add_multiples").remove()
    else
      destroy_elem.attr "checked", "checked"
      $(this).closest(".add_multiples").hide()
    delete_button_check()
    false

delete_button_check = ->
  data_groups = []
  $(".add_multiples").each ->
    data_groups.push $(this).attr("data-group")

  $.each $.unique(data_groups), (index, data_group) ->
    parent = $(".add_multiples[data-group=" + data_group + "]")
    if $(".add_multiples[data-group=" + data_group + "]:visible").size() is 1
      parent.find(".remove_fieldset_link").hide()
    else
      parent.find(".remove_fieldset_link").show()
