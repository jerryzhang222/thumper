class UsersController < ApplicationController
	before_action :authenticate_user!
	protect_from_forgery with: :null_session

	def checkForUser
		render json: {id: current_user.try(:id)}
	end

	def createThumpSession
		ThumpSession.create(
			start_time: DateTime.parse(params[:dateTime]),
			duration_minutes: params[:duration],
			pumps_per_minute: params[:ppm],
			rating: params[:rating],
			nickname: params[:nickname],
			notes: params[:notes],
			user_id: current_user.id
		)
	end
end
