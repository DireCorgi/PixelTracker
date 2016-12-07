class Api::ProjectsController < ApplicationController
  before_action :require_logged_in

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
    params.require(:project).permit(:name)
  end

end
