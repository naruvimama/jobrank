Meteor.publish('my_profile', function () {
	var my_user_id = this.userId;
	return Meteor.users.find(my_user_id, { profile:1 });
});