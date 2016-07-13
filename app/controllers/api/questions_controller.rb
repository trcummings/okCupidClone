class Api::QuestionsController < ApplicationController
  def random
    user_answers = current_user.answers.includes(:question)
    @question = Question.random_question(user_answers)
    render 'api/questions/show'
  end
end
