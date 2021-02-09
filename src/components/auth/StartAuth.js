import Auth from './Auth';

export default {
	mixins: [Auth],
	data: function() {
		return {
			token: '',
			loading: true,
			vsLoading: null,
		};
	},
	mounted() {
		if (this.getTokenIfPresent()) {
			this.setUpLfm();
			this.setNewSession();
		} else {
			this.loading = false;
		}
	},
	watch: {
		loading: function(loading) {
			if(loading) {
				this.vsLoading = this.$vs.loading();
			} else if (this.vsLoading) {
				this.vsLoading.close();
			}
		}
	},
	methods: {
		getTokenIfPresent: function() {
			const token = this.$route.query.token;
			/* const urlParams = new URLSearchParams(window.location.search);
			const token = urlParams.get('token'); */
			this.token = token || '';
			return !!this.token;
		},
		setNewSession() {
			this.lfm.auth.getSession(this.token, (err, session) => {
				if (err) {
					this.loading = false;
					throw err;
				}
				localStorage.setItem('session', JSON.stringify({ username: session.name, key: session.key }));
				this.setSessionCredentials(localStorage.getItem('session'));
				this.goToLogged();
			});
		},
		goToLogged: function() {
			this.$router.push({ name: 'logged' });
		},
	},
};
