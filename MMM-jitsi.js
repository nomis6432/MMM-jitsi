Module.register("MMM-jitsi",{
	// Default module config.
	defaults: {
		domain: 'meet.jit.si',
		launchOnStart: true,
		options: {}
	},

	// Generates dom object
	getDom: function() {
		this.wrapper = document.createElement("div");
		if (this.config.launchOnStart) {
			this.startJitsi()
		}
		return this.wrapper
	},

	// adds IFrame to wrapper
	startJitsi: function() {
		if (!this.api) {
			this.config.options.parentNode = this.wrapper
			this.api = new JitsiMeetExternalAPI(this.config.domain, this.config.options);
		}
	},

	// disposes of IFrame
	disposeJitsi: function() {
		if (this.api) {
			this.api.dispose()
			this.api = null
		}
	},

	// toggle between launching and disposing jitsi
	toggleJitsi: function() {
		if (this.api) {
			this.disposeJitsi()
		} else {
			this.startJitsi()
		}
	},

	// Load JitsiMeetExternalAPI
  getScripts: function() {
  	return [
  		'https://meet.jit.si/external_api.js',
  	]
  },

	// Wrapper around Jitsi API commands and event listeners.
  notificationReceived: function(notification, payload, _sender) {
		if (notification.startsWith("JITSI-")) {
			let command = notification.substr(6)
			if (command == "START") {
				this.startJitsi()
			} else if (command == "DISPOSE") {
				this.disposeJitsi()
			} else if (command == "TOGGLE") {
				this.toggleJitsi()
			} else if (command.startsWith("EventListener-")) {
				let event = notification.substr(14)
				this.api.addEventListener(event, payload)
			} else if (command == "COMMANDS") {
				this.api.executeCommand(payload)
			} else {
				this.api.executeCommand(command, payload);
			}
		}
  }
});
