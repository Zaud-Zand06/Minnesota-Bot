const {
  createAudioPlayer,
  createAudioResource,
  entersState,
  VoiceConnectionStatus,
  StreamType,
  NoSubscriberBehavior,
} = require("@discordjs/voice");
const { AudioPlayerStatus, joinVoiceChannel } = require("@discordjs/voice");
const { SlashCommandBuilder } = require("discord.js");
const { join } = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("miku")
    .setDescription("Invites Miku into your voice channel!"),

  async execute(interaction) {
    await interaction.deferReply();
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return await interaction.followUp({
        content: "Join a voice channel before inviting Miku!!",
        ephemeral: true,
      });
    }
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      selfDeaf: false,
    });
    connection.on("stateChange", (oldState, newState) => {
      console.log(
        `Connection transitioned from ${oldState.status} to ${newState.status}`
      );
    });
    const resource = createAudioResource(join(__dirname, "../../Mikudayo.wav"));

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

    player.on(AudioPlayerStatus.Idle, () => {
      interaction.deleteReply();
      player.stop();
      connection.destroy();
    });
  },
};
