class PagesController < ApplicationController
	def index
		@weather = weather(location) if session[:user_id]
	end
end
