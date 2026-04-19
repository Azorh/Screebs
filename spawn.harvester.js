var spawnHelper = require('spawn.helper');

var spawnHarvester = {
	
	run: function() {
		var spawn = spawnHelper.getAvailableSpawn();
		if (!spawn) return;

		var newName = 'Harvester' + Game.time;
		console.log('Spawning new harvester: ' + newName);

		spawn.spawnCreep([WORK, CARRY, MOVE], newName, {
			memory: { role: 'harvester' }
		});

		spawnHelper.drawSpawningVisual(spawn);
	}
};

module.exports = spawnHarvester;