import { Socket } from 'phoenix';

export let socket = null;
export let channel = null;

export const connectSocket = (user, setupFunc) => {
	if (!user) return;

	socket = new Socket(`${import.meta.env.VITE_SERVER_WS}/socket`, {
		params: { token: window.localStorage.getItem('t') },
	});
	socket.connect();
	channel = socket.channel('requests:' + user.id);

	channel.onClose(() => console.log('requests channel closed'));

	channel.join().receive('ok', () => console.log('joined requests channel'));

	if (setupFunc) {
		setupFunc(channel);
	}
};

export const maybeConnect = (user, setupFunc) => {
	if (socket) return;

	connectSocket(user, setupFunc);
};

export const disconnectSocket = () => {
	if (channel) channel.leave();
	if (socket) socket.disconnect();

	channel = null;
	socket = null;
};
