class Api::ProjectsController < ApplicationController
  before_action :require_logged_in

  def index
    @projects = current_user.projects.includes(:project_members).includes(:members).order(:updated_at)
    render :index
  end

  def show
    @project = Project.includes(:project_members).includes(:members).find_by(id: params[:id])

    if @project && allow_access?(@project)
      render :show
    else
      render json: ["Project Not Found or Private"], status: 404
    end
  end

  def create
    @project = current_user.projects.new(project_params)

    if @project.save
      render :show
    else
      render json: @project.errors.full_messages, status: 422
    end

  end

  private

  def project_params
    params.require(:project).permit(:name, :private)
  end


  def allow_access?(project)
    !project.private || project.members.pluck(:username).include?(current_user.username)
  end

end
