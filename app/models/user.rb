# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  birth_date      :date             not null
#  country         :string           not null
#  zip_code        :integer          not null
#  password_digest :string           not null
#  session_token   :string           not null
#  location        :string           not null
#  gender          :string           not null
#  orientation     :string           not null
#

class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :email, :birth_date,
            :country, :zip_code, :password_digest,
            :session_token, :location, :gender,
            :orientation,
            presence: true

  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  def self.find_by_credentials(name_field, password, type)
    if type == 'username'
      user = User.find_by(username: name_field)
    elsif type == 'email'
      user = User.find_by(email: name_field)
    end

    return nil if user.nil?

    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
  end
end
