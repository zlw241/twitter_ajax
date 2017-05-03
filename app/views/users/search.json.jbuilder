

json.array!(@users) do |user|
  json.id user.id
  json.username user.username
  json.created_at user.created_at
  json.followed(current_user.follows?(user))
end
