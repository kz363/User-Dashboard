class UsersController < ApplicationController
	def login
		user = User.find_by(username: params[:username]).try(:authenticate, params[:password])
		
		if user
			session[:user_id] = user.id
			@weather = weather(location)
			render json: { rows: render_to_string( partial: "pages/rows", layout: false ),
										 user: render_to_string( partial: "pages/user_info", layout: false ) }
		else
			render json: "Invalid login.", status: 422
		end
	end

	def logout
		reset_session
		redirect_to '/'
	end
end
