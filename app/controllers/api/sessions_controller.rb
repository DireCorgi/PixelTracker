class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentails(params[:user][:username], params[:user][:password])
    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: ["Invalid Login"], status: 401
    end
  end

  def destroy
    if logged_in?
      logout
      render json: {}
    else
      render json: ["Not Logged In"], status: 404
    end
  end

end
