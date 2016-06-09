class Api::QuestionsController < ApplicationController
  def random
    @question = Question.random_question(current_user.answers)
    render 'api/questions/show'
  end
end
