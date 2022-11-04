import { Socket } from 'phoenix';

export let socket = null;
export let channel = null;

export const connectSocket = (user) => {
  if (!user) return;

	socket = new Socket(`${import.meta.env.VITE_SERVER_WS}/socket`, {
		params: { token: window.localStorage.getItem('t') },
	});
	socket.connect();
	channel = socket.channel('messages:' + user.id);
  channel.onClose(() => console.log("messages channel closed"))
	channel.join().receive('ok', () => console.log('joined messages channel'));
};

export const maybeConnect = user => {
  if (socket) return;

  connectSocket(user);
}

export const disconnectSocket = () => {
  if (channel)
    channel.leave();
  if (socket)
    socket.disconnect();

  channel = null;
  socket = null;
}
