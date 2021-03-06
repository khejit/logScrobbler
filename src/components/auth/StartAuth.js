import Auth from './Auth';

export default {
	mixins: [Auth],
	data: function() {
		return {
			token: '',
			loading: true,
		};
	},
	mounted: function() {
		if (this.getTokenIfPresent()) {
			this.setUpLfm();
			this.setNewSession();
		} else {
			this.loading = false;
		}
	},
	methods: {
		getTokenIfPresent: function() {
			// const token = this.$route.query.token; // doesn't work in router hash mode
			const urlParams = new URLSearchParams(window.location.search);
			const token = urlParams.get('token');
			this.token = token || '';
			return !!this.token;
		},
		setNewSession: function() {
			const that = this;
			this.lfm.authenticate(this.token, function(err, session) {
				if (err) {
					that.loading = false;
					throw err;
				}
				let newSession = {};
				({ username: newSession.username, key: newSession.userkey } = session);
				localStorage.setItem('session', JSON.stringify(newSession));
				that.goToLogged();
			});
		},
		goToLogged: function() {
			this.$router.push({ name: 'logged' });
		},
	},
};
