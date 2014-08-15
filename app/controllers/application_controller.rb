class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def location
  	if Rails.env.test? || Rails.env.development?
  		Geocoder.search("72.229.28.185").first.data["city"]
  	else
  		request.location["city"]
  	end
  end

  def weather(city)
  	client = YahooWeather::Client.new
  	puts client.fetch_by_location(city).inspect
  	response = client.fetch_by_location(city)
  	response.doc["description"] + "<br>" + response.doc["lastBuildDate"] + "<br><br>" + response.doc["item"]["description"]
  end
end
