Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resource :user, only: [ ] do
      get '/', to: 'users#get_user' ####
      post '/', to: 'users#create_user' ####
      patch '/', to: 'users#update_user'
      # delete to: 'user#destroy_user'

      get '/birthdate', to: 'users#get_birthdate'

      get '/about', to: 'users#get_about' ####
      patch '/about', to: 'users#update_about' ####

      get '/photos', to: 'users#all_photos' ####
      post '/photos', to: 'users#add_photo' ####
      patch '/photos', to: 'users#update_photo_description' ####
      # delete '/photos/:id', to: 'user#delete_photo' #not yet

      get '/answers', to: 'users#get_all_answers'
      # delete :answers, to: 'user#delete_all_answers' #not yet
    end

    # all other users
    resources :users, only: [:index], to: 'users#all_other_users'
    get '/users/:username', to: 'users#other_user'
    get '/users/:username/photos', to: 'users#other_user_photos'
    get '/users/:username/about', to: 'users#other_user_about'
    get '/users/:username/is_unique', to: 'users#check_username_uniqueness'
    get '/users/emails/:email', to: 'users#check_email_uniqueness'

    # get :answers, only: [:index], to: 'users#other_user_answers' # not yet

    resource :session, only: [:create, :show, :destroy]

    get '/questions/random', to: 'questions#random' ###
    resources :answers, only: [:create, :update], param: :question_id

    resources :likes, only: [:create]
    resources :likes, only: [:destroy], param: :username

    resources :conversations, only: [:create, :index]
    get '/user/conversations/:username', to: 'users#get_conversation'

    resources :messages, only: [:create]

     get 'auth/:provider/callback', to: 'api/sessions#github_create'

  end
end
