class Api::AnswersController < ApplicationController
  def create
    @answer = Answer.new(answer_params)
    @answer.user_id = current_user.id

    if @answer.save
      render 'api/answers/show'
    else
      render json: { base: ['somethin wrong'] }
    end
  end

  private
  def answer_params
    params
    .require(:answer)
    .permit(:question_id, :importance, :explanation,
            chosen_ids: [], acceptable_ids: [],
    )
  end
end
