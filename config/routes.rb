Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :projects, only: [:index, :show, :create] do
      resources :pixels, only: [:index, :show, :create, :update, :destroy]
    end
    resources :project_members, only: [:destroy, :create]
  end
end
