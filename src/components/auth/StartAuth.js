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
		async setNewSession() {
			try {
				const response = await this.lfm.auth.getSession({token: this.token}),
				session = response.session;
				localStorage.setItem('session', JSON.stringify({ username: session.name, key: session.key }));
				this.goToLogged();
			} catch (err) {
				this.loading = false;
				throw err;
			}
		},
		goToLogged: function() {
			this.$router.push({ name: 'logged' });
		},
	},
};
