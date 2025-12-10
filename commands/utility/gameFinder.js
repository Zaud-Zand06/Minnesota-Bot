let SteamAPI;
let steam;
const ready = (async () => {
  const mod = await import("steamapi");
  SteamAPI = mod.default;
  steam = new SteamAPI(process.env.STEAM_TOKEN);
})();
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
require("dotenv").config();

const steamProfiles = new Map();
steamProfiles.set(
  "267094035506659338",
  "https://steamcommunity.com/profiles/76561198081258574/", // alex
  "286695254499786753",
  "https://steamcommunity.com/id/fabernathy/", // cole
  "110925753574490112",
  "https://steamcommunity.com/id/BeanKingAidan/", // aidan
  "226529102352482324",
  "https://steamcommunity.com/profiles/76561198131394179/", // dylan
  "699049145318768710",
  "https://steamcommunity.com/profiles/76561198810115119/", // kade
  "510182560232505344",
  "https://steamcommunity.com/profiles/76561198186979293/", // meg
);

async function getUserId(steamProfile) {
  await ready;
  return await steam.resolve(steamProfile);
}

async function getGameDetails(appId) {
  await ready;
  return await steam.getGameDetails(appId);
}

async function getMultiplayerGames(arrayOfGames) {
  await ready;
  let multiplayerGames = [];
  for (let index = 0; index < arrayOfGames.length; index++) {
    try {
      const gameDetails = await getGameDetails(arrayOfGames[index].game.id);
      if (gameDetails && gameDetails.categories) {
        gameDetails.categories.forEach((category) => {
          if (category.id == 1) {
            multiplayerGames.push({
              name: gameDetails.name,
              value:
                "https://store.steampowered.com/app/" + gameDetails.steam_appid,
            });
          }
        });
      } else {
        console.log(
          "Game details not found or missing categories:",
          arrayOfGames[index].game.id,
        );
      }
    } catch (error) {
      console.error("Error getting game details:", error);
    }
  }
  return multiplayerGames;
}

async function compareGames(firstUser, secondUser) {
  await ready;
  console.log("Steam is ready:", !!steam);
  let sharedGames = [];
  let firstUserGames = await steam.getUserOwnedGames(
    await getUserId(firstUser),
  );
  let secondUserGames = await steam.getUserOwnedGames(
    await getUserId(secondUser),
  );
  //TODO: optimize this nested loop
  for (let index = 0; index < firstUserGames.length; index++) {
    for (let jindex = 0; jindex < secondUserGames.length; jindex++) {
      if (firstUserGames[index].game.id == secondUserGames[jindex].game.id) {
        sharedGames.push(firstUserGames[index]);
      }
    }
  }
  // check which gmes are multiplayer after creating a shared list because there is a 200 request limit on this function
  sharedGames = await getMultiplayerGames(sharedGames);
  return sharedGames;
}
// console.log(await compareGames(mySteam, aidanSteam));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("find-us-a-game")
    .setDescription("Finds a game that you and the other person own on steam")
    .addUserOption((option) =>
      option
        .setName("clanmate")
        .setDescription("Check what games you two have in common")
        .setRequired(true),
    ),

  async execute(interaction) {
    const executor = steamProfiles.get(interaction.user.id);
    const toBeChecked = steamProfiles.get(
      interaction.option.getMember("clanmate").id,
    );

    await interaction.deferReply();
    const theGames = await compareGames(executor, toBeChecked);
    console.log(theGames);

    const embed = [
      new EmbedBuilder()
        .setTitle("The Games")
        .setDescription(
          `all the games that ${interaction.user.globalName} and ${
            interaction.options.getMember("clanmate").user.globalName
          } share on steam`,
        ),
    ];

    if (theGames.length > 25) {
      let index = 0;
      while (index < 25) {
        embed[0].addFields({
          name: `${theGames[index].name}`,
          value: `${theGames[index].value}`,
        });
        index++;
      }

      embed.push(
        new EmbedBuilder()
          .setTitle("The Games Pg 2")
          .setDescription("more games"),
      );

      while (index < theGames.length) {
        embed[1].addFields({
          name: `${theGames[index].name}`,
          value: `${theGames[index].value}`,
        });
        index++;
      }
    } else {
      theGames.forEach((game) => {
        embed[0].addFields({ name: game.name, value: game.value });
      });
    }

    await interaction.editReply({ embeds: embed });
  },
};
