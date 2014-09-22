class PagesController < ApplicationController
	def index
		@weather = weather(location) if session[:user_id]
		@info = {}
		user_agent = request.env["HTTP_USER_AGENT"]
		puts request.env
		@info["User Agent"] = user_agent
		@info["Browser"] = /(opera|chrome|safari|firefox|msie|trident)\/[^ ]*/i.match(user_agent).to_s.gsub("/", " ")
		@info["Operating System"] = /(Mac|Windows|Linux|Android|CPU|Blackberry) \w[^;)]*/i.match(user_agent).to_s
		@info["Request URI"] = request.env["REQUEST_URI"]
		@info["IP"] = request.remote_ip
	end

	def speedtest
		render :speedtest, layout: false
	end
end
