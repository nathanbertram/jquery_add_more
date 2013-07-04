# TODO

1. Jquery plugin-fy, namespace better and make extendable
2. Enable sortable fields

# Usage

1. Add `jquery.add_more.min.js` to /assets/javascripts/

2. Add this to the appropriate views
```javascript
  $(document).ready(function(){
    jqueryAddMore();
  });
```

3. Setup your model at accept nested attributes:
```ruby
  class Table < ActiveRecord::Base
    has_many :guest_categories

    accepts_nested_attributes_for :guest_categories, reject_if: :all_blank, allow_destroy: true
  end
```

4. In your view:
```ruby
= f.fields_for :guest_categories do |g|
  %li.add_multiples{'data-group' => 'guest_categories'}
    = g.check_box :_destroy, style: 'display: none;' unless g.object.new_record?
    = g.text_field :title
    = link_to 'Remove', '#', class: 'remove_fieldset_link'
%li
  = link_to 'Add Another', '#', class: 'add_multiples_link', 'data-group' => 'guest_categories', 'data-attribute-key' => 'guest_categories_attributes'
  
# Contributors
* [Nathan Bertram (@nathanbertram)](http://github.com/nathanbertram)
* [Will Cosgrove (@willcosgrove)](http://github.com/willcosgrove)
