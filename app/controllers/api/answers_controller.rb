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

  def update
    @answer = Answer.find_by_question_id_and_user_id(
                params[:answer][:question_id].to_i,
                current_user.id
              )

    if @answer.update(answer_params)
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
