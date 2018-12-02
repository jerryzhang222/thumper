class UsersController < ApplicationController
	before_action :authenticate_user!
	protect_from_forgery with: :null_session

	INCHES_IN_MILE = 63360.freeze

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
			partner_name: params[:partnerName],
			user_id: params[:userId]
		)
	end

	def getThumpSessions
		sessions = current_user.thump_sessions.map do |session|
			penetrativeDistance = (current_user.penetrative_length.to_f * session.pumps_per_minute * session.duration_minutes / INCHES_IN_MILE).round(4)
			{
				startTime: session.start_time,
				partnerName: session.partner_name,
				duration: session.duration_minutes,
				pumpsPerMinute: session.pumps_per_minute,
				rating: session.rating,
				penetrativeDistance: penetrativeDistance
			}
		end

		render json: sessions
	end
end
