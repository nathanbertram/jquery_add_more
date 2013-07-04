jqueryAddMore = ->
  jqueryAddMoreDeleteButtonCheck()
  $("body").on 'click', '.add-multiples-link', ->
    add_multiples_selector = '.add-multiples'

    data_group = $(this).attr("data-group")
    attribute_key = $(this).attr("data-attribute-key")

    new_object_id = new Date().getTime()
    new_elem = $(add_multiples_selector + "[data-group=" + data_group + "]:visible").last().clone(true).insertAfter($(add_multiples_selector + "[data-group=" + data_group + "]:last"))
    attribute_re = new RegExp("\\[" + attribute_key + "\\]\\[([0-9])+\\]")

    # Clear out textareas & rename
    $(add_multiples_selector + "[data-group=" + data_group + "]:last textarea").each ->
      $(this).text ""
      $(this).attr "name", $(this).attr("name").replace(attribute_re, "[" + attribute_key + "][" + new_object_id + "]")

    # Rename selects
    $(add_multiples_selector + ":last select").each ->
      $(this).attr "name", $(this).attr("name").replace(attribute_re, "[" + attribute_key + "][" + new_object_id + "]")

    # Clear out inputs & rename
    $(add_multiples_selector + "[data-group=" + data_group + "]:last input").each ->
      $(this).attr "value", ""  unless $(this).attr("type").match(/radio|check/)
      $(this).attr "name", $(this).attr("name").replace(attribute_re, "[" + attribute_key + "][" + new_object_id + "]")


    # When you add another row - remove stuff you no want
    $(add_multiples_selector + "[data-group=" + data_group + "]:last .remove_contents").each ->
      $(this).remove()

    jqueryAddMoreDeleteButtonCheck()
    $(this).trigger('add_more:add_multiples_complete')
    false

  $("body").on "click", ".remove-multiples-link", ->
    add_multiples_selector = '.add-multiples'
      
    destroy_elem = $(this).closest(".add-multiples").find("input[type=checkbox]")
    if destroy_elem.length is 0
      $(this).closest(add_multiples_selector).remove()
    else
      destroy_elem.attr "checked", "checked"
      $(this).closest(add_multiples_selector).hide()
    jqueryAddMoreDeleteButtonCheck()
    $(this).trigger('add_more:remove_multiples_complete')

    false

  false

jqueryAddMoreDeleteButtonCheck = ->
  data_groups = []
  $(".add-multiples").each ->
    data_groups.push $(this).attr("data-group")

  $.each $.unique(data_groups), (index, data_group) ->
    parent = $(".add-multiples[data-group=" + data_group + "]")
    if $(".add-multiples[data-group=" + data_group + "]:visible").size() is 1
      parent.find(".remove-multiples-link").hide()
    else
      parent.find(".remove-multiples-link").show()

  false

window.jqueryAddMoreDeleteButtonCheck = jqueryAddMoreDeleteButtonCheck
window.jqueryAddMore = jqueryAddMore