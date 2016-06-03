Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :destroy, :index]
    resources :users, only: :show, param: :username
    resource :session, only: [:create, :show, :destroy]
    resources :likes, only: [:create, :destroy]
    resources :user_photos, only: [:create, :index, :destroy]
    resources :user_photos, only: :show, param: :user_id
    resources :messages, only: [:create, :chat_history]
  end
end
