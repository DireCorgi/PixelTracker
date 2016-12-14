class Api::TasksController < ApplicationController
  before_action :require_logged_in

  def create
    task = Task.new(task_params);
    if task.save
      @pixel = task.pixel
      render 'api/pixels/show'
    else
      render json: task.errors, status: 422
    end
  end

  def update
    task = Task.find_by(id: params[:id])
    if task
      if task.update(task_params)
        @pixel = task.pixel
        render 'api/pixels/show'
      else
        render json: task.errors, status: 422
      end
    else
      render json: { errors: "Cannot Find Task" }, status: 404
    end
  end

  def destroy
    task = Task.find_by(id: params[:id])
    if task
      task.destroy!
      @pixel = task.pixel
      render 'api/pixels/show'
    else
      render json: task.errors, status: 422
    end
  end

  private

  def task_params
    params.require(:task).permit(:body, :pixel_id, :task_ord, :complete)
  end
end
