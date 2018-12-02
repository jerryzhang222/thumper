Rails.application.routes.draw do
  devise_for :users
  root to: "pages#root"

  get '/users/checkForUser', to: 'users#checkForUser'
  post '/users/:id/createThumpSession', to: 'users#createThumpSession'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

