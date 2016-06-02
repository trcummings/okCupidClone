Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :destroy]
    resource :session, only: [:create, :show, :destroy]
    resources :likes, only: [:create, :destroy]
  end
end
