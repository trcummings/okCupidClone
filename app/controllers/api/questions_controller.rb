class Api::QuestionsController < ApplicationController
  def show
    @question = Question.random_question
    render 'api/questions/show'
  end
end
