class Api::CommentsController < ApplicationController

  def create
    comment = current_user.comments.new(comment_params);
    if comment.save
      @pixel = Pixel.find(params[:comment][:pixel_id])
      render 'api/pixels/show'
    else
      render json: comment.errors
    end
  end

  def update
    comment = Comment.find(params[:id])
    if comment.update(comment_params)
      @pixel = Pixel.find(comment.pixel_id)
      render 'api/pixels/show'
    else
      render json: comment.errors
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy
      render json: {}
    else
      render json: comment.errors
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :pixel_id)
  end
end
