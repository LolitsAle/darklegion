const ScriptServer = require('scriptserver');
 
const server = new ScriptServer({
  core: {
    jar: 'server.jar',
    args: ['-Xmx2G'],
    spawnOpts: {
      cwd: 'survival_server',
      stdio: ['pipe', 'pipe', 'inherit'],
    },
    rcon: {
      port: '25575',
      password: 'password'
    }
  }
});

server.givepoints = (account, points) => {
  const player = 'LolitsAle'

  //call command to give account points and call a broadcast message
  // server.send(`give ${player} minecraft:diamond 1`)
  // server.send(`playsound entity.item.pickup master ${player} ~ ~ ~ 10 1 1`)
  // server.send(`say ${player} got a diamond!`)
  server.send('say người chơi ' + account + ' vừa nạp ' + points)
}
 
module.exports = server