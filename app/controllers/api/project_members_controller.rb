class Api::ProjectMembersController < ApplicationController
  before_action :require_logged_in

  def create
    @project = Project.find(params[:project_member][:project_id])
    user = User.find_by(username: params[:project_member][:username])

    if user
      project_member = @project.project_members.new(user_id: user.id)
      if project_member.save
        render 'api/projects/show'
      else
        render json: project_member.errors.full_messages, status: 422
      end
    else
      render json: ["Cannot Find User"], status: 404
    end

  end

  def destroy
    project_member = ProjectMember.find(params[:id])
    if project_member
      @project = project_member.project
      project_member.destroy!
      render 'api/projects/show'
    else
      render json: ["Member Not Found"], status: 404
    end
  end

end
