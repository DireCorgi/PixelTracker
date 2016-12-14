Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :projects, only: [:index, :show, :create] do
      resources :pixels, only: [:index, :create]
    end
    resources :project_members, only: [:destroy, :create]
    resources :pixels ,only: [:destroy, :update, :show]
    resources :comments, only: [:create, :update, :destroy]
    resources :tasks, only: [:create, :update, :destroy]
    patch '/mass_update_pixels', :to => 'pixels#mass_update'
  end
end
