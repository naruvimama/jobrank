Template.dashboard_content.events({
	"click #refresh_profile": function(event, template) {
		Meteor.call("get_linked_in_profile")
	}
})

Meteor.subscribe('my_profile');

Template.profile.helpers({
	profile: function() {
		return Meteor.user().profile;
	}
})
