class Api::TasksController < ApplicationController
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
    task = Task.find(params[:id])
    if task.update(task_params)
      @pixel = task.pixel
      render 'api/pixels/show'
    else
      render json: task.errors, status: 422
    end
  end

  def destroy
    task = Task.find(params[:id])
    if task.destroy
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
