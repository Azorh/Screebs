var spawnHelper = require('spawn.helper');

var spawnUpgrader = {
	
	run: function() {
		var spawn = spawnHelper.getAvailableSpawn();
		if (!spawn) return;

		var newName = 'Upgrader' + Game.time;
		console.log('Spawning new upgrader: ' + newName);

		spawn.spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
			memory: { role: 'upgrader' }
		});

		spawnHelper.drawSpawningVisual(spawn);
	}
};

module.exports = spawnUpgrader;