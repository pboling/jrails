require File.dirname(__FILE__) + '/spec_helper'

describe Themeroller, :type => :view  do

  include Themeroller
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::FormHelper
  include ActionView::Helpers::JavaScriptHelper
  include ActionView::Helpers::AssetTagHelper

  describe "#stylesheet_themeroller_tag" do

    it "should include the necessary css files for themeroller" do
      stylesheet_themeroller_tag("start").should have_tag("link[href=http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/start/jquery-ui.css][media=screen][type=text/css]")
    end

    it "should return ui-lightness if no parameter theme" do
      stylesheet_themeroller_tag.should have_tag("link[href=http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/ui-lightness/jquery-ui.css][media=screen][type=text/css]")
    end

  end

end
