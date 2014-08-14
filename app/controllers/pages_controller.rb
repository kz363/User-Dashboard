class PagesController < ApplicationController
	def index
		puts request.location.inspect
	end
end
