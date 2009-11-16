module Themeroller

  # Add required files for ThemeRoller
  #
  def stylesheet_themeroller_tag(theme="ui-lightness")
    url = "http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/#{theme}/jquery-ui.css"
    stylesheet_link_tag(url)
  end

end
