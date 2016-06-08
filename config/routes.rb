Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resource :user, only: [ ] do
      get '/', to: 'users#get_user' ####
      post '/', to: 'users#create_user' ####
      # patch :update, to: 'user#update_user' #### #not yet
      # delete to: 'user#destroy_user'

      get '/about', to: 'users#get_about' ####
      patch '/about', to: 'users#update_about' ####

      get '/photos', to: 'users#all_photos' ####
      post '/photos', to: 'users#add_photo' ####
      # delete '/photos/:id', to: 'user#delete_photo' #not yet

      get '/answers', to: 'users#get_all_answers'
      # post '/answers', to: 'user#answer_question' # not yet
      # delete :answers, to: 'user#delete_all_answers' #not yet
      # patch '/answer/:id', to: 'user#update_answer' #not yet
    end

    # all other users
    resources :users, only: [:index], to: 'users#all_other_users'
    get '/users/:username', to: 'users#other_user'
    get '/users/:username/photos', to: 'users#other_user_photos'
    get '/users/:username/about', to: 'users#other_user_about'


    # get :answers, only: [:index], to: 'users#other_user_answers' # not yet
    # end

    resource :session, only: [:create, :show, :destroy]

    get '/questions/random', to: 'questions#random' ###


    # resources :users, only: [:create, :destroy, :index, :update]

    resources :likes, only: [:create]
    resources :likes, only: [:destroy], param: :username

    # resources :user_photos, only: [:create, :index, :destroy]
    # resources :user_photos, only: :show, param: :user_id
    # resources :messages, only: [:create, :chat_history]

    # resources :user_abouts, only: [:show, :update], param: :user_id


    resources :answers, only: [:create, :update]
  end
end
