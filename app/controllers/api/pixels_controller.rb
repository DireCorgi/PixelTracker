class Api::PixelsController < ApplicationController
  before_action :check_member, only: [:create, :update, :destroy]
  before_action :require_logged_in

  def index
    project = Project.find(params[:project_id])
    @pixels = project.pixels.order(:pixel_ord).includes(:requester).includes(:comments).includes(:commenters).includes(:tasks)
    render :index
  end

  def show
    @pixel = Pixel.includes(:comments).includes(:commenters).includes(:tasks).find(params[:id])
    render :show
  end

  def create
    project = Project.find(params[:project_id])
    @pixel = project.pixels.new(pixel_params)
    @pixel.requester_id = current_user.id
    if @pixel.save
      render :show
    else
      render json: @pixel.errors, status: 422
    end
  end

  def update
    @pixel = Pixel.find(params[:id])
    if @pixel.update(pixel_params)
      render :show
    else
      render json: @pixel.errors, status: 422
    end
  end

  def destroy
    @pixel = Pixel.find_by(id: params[:id])
    if @pixel
      @pixel.destroy!
      render json: {}
    else
      render json: { error: "Not Found" }, status: 404
    end
  end

  private

  def pixel_params
    params.require(:pixel).permit(:state, :title, :category, :pixel_ord, :description, :points)
  end

  def check_member()
    project = Project.find_by(id: params[:project_id])
    project ||= Pixel.find(params[:id]).project
    unless project.members.pluck(:username).include?(current_user.username)
      render json: { base:["Cannot Edit Project If You are Not the User"] }, status: 401
    end
  end
end
