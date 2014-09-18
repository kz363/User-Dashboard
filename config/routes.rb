Rails.application.routes.draw do
	root 'pages#index'
	post '/login' => 'users#login'
	get '/logout' => 'users#logout', as: :logout
	get '/speedtest' => 'pages#speedtest'
end