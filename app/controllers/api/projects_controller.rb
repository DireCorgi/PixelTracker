class Api::ProjectsController < ApplicationController
  before_action :require_logged_in
  before_action :check_private, only: :show

  def index
    @projects = current_user.projects
    render :index
  end

  def show
    @project = Project.includes(:project_members).includes(:members).find(params[:id])
    render :show
  end

  def create
    
  end

  def destroy

  end

  private

  def project_params
    params.require(:project).permit(:name, :private)
  end

  def check_private
    @project = Project.find(params[:id])
    if @project.private && !@project.members.pluck(:username).include?(current_user.username)
      render json: ["Project is Private"], status: 403
    end
  end

end
