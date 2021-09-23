export const addMessage = (messagePayload) => ({
  type: 'ADD_MESSAGE',
  server: messagePayload.server,
  message: messagePayload.message
});

