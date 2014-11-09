METEOR_LINKEDIN_EXTRA_DATA_FIELDS = ["email-address",

"id",
"first-name",
"last-name",
"maiden-name",
"formatted-name",
"phonetic-first-name",
"phonetic-last-name",
"formatted-phonetic-name",
"headline",
"location:(name)",
//"location:(country:(code))",
"industry",
"distance",
//"relation-to-viewer:(distance)",
//"relation-to-viewer:(related-connections)",
"current-share",
"num-connections",
"num-connections-capped",
"summary",
"specialties",
"picture-url",
"site-standard-profile-request",
"api-standard-profile-request:(url)",
//"api-standard-profile-request:(headers)",
"public-profile-url",

"last-modified-timestamp",
"proposal-comments",
"associations",
"interests",
"publications",
"patents",
"languages",
"skills",
"certifications",
"educations",
"courses",
"volunteer",
"three-current-positions",
"three-past-positions",
"num-recommenders",
"recommendations-received",
"following",
"job-bookmarks",
"suggestions",
"date-of-birth",
"member-url-resources",
//"member-url-resources:(url)",
//"member-url-resources:(name)",
"related-profile-views",
"honors-awards",

"phone-numbers",
"bound-account-types",
"im-accounts",
"main-address",
"twitter-accounts",
"primary-twitter-account"]




Meteor.methods({
	get_linked_in_profile: function() {
		console.log(this.userId);
		var user = Meteor.users.findOne({_id:this.userId});
		console.log(user);
		var accessToken = user["services"]["linkedin"]["accessToken"];
		var data_fields_string = _.reduce(METEOR_LINKEDIN_EXTRA_DATA_FIELDS, function(memo, x) {return memo + ',' + x;});
		var profile = getExtraLinkedinData(accessToken, data_fields_string);
		Meteor.users.update(this.userId, {$set: {profile:profile}});
	}
})

getExtraLinkedinData = function(accessToken, dataFields) {
	var url = 'https://api.linkedin.com/v1/people/~:(' + dataFields + ')';
	var response = Meteor.http.get(url, {
		params: {
			oauth2_access_token: accessToken,
			format: 'json'
		}
	}).data;
	return response;
}