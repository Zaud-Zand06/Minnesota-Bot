const {
  createAudioPlayer,
  createAudioResource,
  entersState,
  VoiceConnectionStatus,
  StreamType,
  NoSubscriberBehavior,
} = require("@discordjs/voice");
const { AudioPlayerStatus } = require("@discordjs/voice");
const fetch = require("node-fetch");

async function minnesotaRadio(connection) {
  const response = await fetch("http://nis.stream.publicradio.org/nis.mp3");
  const resource = createAudioResource(response.body, {
    inputType: StreamType.Arbitrary,
    inlineVolume: true,
  });

  const player = createAudioPlayer({
    behaviors: {
      NoSubscriberBehavior: NoSubscriberBehavior.Pause,
    },
  });
  player.play(resource);

  connection.subscribe(player);

  if (!connection) {
    return;
  }
  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
    connection.subscribe(player);
  } catch (error) {
    console.error(error);
  }
  player.on("stateChange", (oldState, newState) => {
    console.log(
      `Audio player transitioned from ${oldState.status} to ${newState.status}`
    );
  });

  setTimeout(() => {
    player.stop();
    connection.destroy();
  }, 15000);

  player.on(AudioPlayerStatus.Idle, () => {
    player.stop();
    connection.destroy();
  });
}

module.exports = { minnesotaRadio };
