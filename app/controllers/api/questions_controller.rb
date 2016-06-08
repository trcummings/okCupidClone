class Api::QuestionsController < ApplicationController
  def random
    @question = Question.random_question
    render 'api/questions/show'
  end
end
