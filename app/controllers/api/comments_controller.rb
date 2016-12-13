class Api::CommentsController < ApplicationController

  def create
    comment = current_user.comments.new(comment_params);
    if comment.save
      @pixel = comment.pixel
      render 'api/pixels/show'
    else
      render json: comment.errors, status: 422
    end
  end

  def update
    comment = Comment.find(params[:id])
    if comment.update(comment_params)
      @pixel = comment.pixel
      render 'api/pixels/show'
    else
      render json: comment.errors, status: 422
    end
  end

  def destroy
    comment = Comment.find_by(id: params[:id])
    if comment
      comment.destroy!
      @pixel = comment.pixel
      render 'api/pixels/show'
    else
      render json: { errors: "Cannot Find Comment" }, status: 404
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :pixel_id)
  end
end
