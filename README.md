# MMM-jitsi

A [MagicMirror](https://magicmirror.builders/) module to display a jitsi meet call.
This is a simple wrapper around the [Jitsi IFrame API](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe).

## Installation

Navigate to the `modules` folder and clone the repository:

`git clone https://github.com/nomis6432/MMM-jitsi`

## Configuration

Navigate to the `config/config.js` file and add a new entry in `modules` (see [MagicMirror Module Configuration documentation](https://docs.magicmirror.builders/modules/configuration.html)).

The `config` parameter has 3 optional arguments.
* `domain` which is the domain used to build the conference URL (by default `"meet.jit.si"`)
* `launchOnStart` which can be `true` or `false` and determines wether or not the IFrame should be loaded when MagicMirror is started. Is `true` by default. You can launch/close jitsi with notifications (see notifications).
* `config` which is a object for which the possible properties can be found in the [IFrame API documentation](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe#api).

A possible configuration could be:

```js
{
	module: "MMM-jitsi",
	position: "fullscreen_above",
	config: {
		domain: "meet.jit.si"
		options: {
			roomName: "MMMjitsi",
			configOverwrite: {
				enableWelcomePage: false,
			},
			interfaceConfigOverwrite: {
				MOBILE_APP_PROMO: false,
				DISABLE_VIDEO_BACKGROUND: true,
				DISPLAY_WELCOME_PAGE_CONTENT: false,
				VIDEO_QUALITY_LABEL_DISABLED: true,
			}
		}
	}
}
```

## notifications

You can send notifications to this module to make it execute certain tasks (see [MagicMirror Module documentation](https://docs.magicmirror.builders/development/core-module-file.html) for information about notifications).

### launching/closing Jitsi

This module reponds to 3 notifications which allow you to close/launch Jitsi from within other modules. An example of such a module that allowes you send these notifications is [MMM-flicio](https://www.github.com/nomis6432/MMM-flicio)(Also made by me).

* `JITSI-START` starts a new instance of Jitsi if non is started
* `JITSI-DISPOSE` removes and disposes of the current Jitsi instance (if one is available)
* `JITSI-TOGGLE` toggles between the above 2 states.

### executing Jitsi API commands

*NOTE:* I've encountered some issues while using the API commands were my commands were ignored. I'm not sure if this is an issue on my end or if there is a bug in the API.

You can execute an Jitsi API command by sending a notification with as `notification` `"JITSI-<COMMAND>"` with "\<command\>" the command you want to execute and the `payload` the (optional) parameters. For a full list of possible comamnds check out the [IFrame API documentation](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe#controlling-the-embedded-jitsi-meet-conference).

You can also execute multiple commands with one notification by sending as `notification` `"JITSI-COMMANDS"` and the payload as described in the [IFrame API documentation](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe#controlling-the-embedded-jitsi-meet-conference).

### adding Jitsi API event listeners

*NOTE:* This function has not been well tested an might be buggy.

You can add event listeners by sending a notification with as `notification` `"JITSU-EventListener-<EVENT>"` with "\<EVENT\>" the event you want to listen for and as `payload` the function to execute when the event occures. For a full list of possible event listeners check out the [IFrame API documentation](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe#controlling-the-embedded-jitsi-meet-conference).
