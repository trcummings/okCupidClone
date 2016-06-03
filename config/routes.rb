Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :destroy, :index, :show]
    resource :session, only: [:create, :show, :destroy]
    resources :likes, only: [:create, :destroy]
    resources :user_photos, only: [:create, :index, :show, :destroy]
    resources :messages, only: [:create, :chat_history]
  end
end
