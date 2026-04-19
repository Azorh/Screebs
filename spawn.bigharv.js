var spawnHelper = require('spawn.helper');

var spawnBigHarvester = {
	
	run: function() {
		var spawn = spawnHelper.getAvailableSpawn();
		if (!spawn) return;

		var newName = 'BigHarvester' + Game.time;
		console.log('Spawning new big harvester: ' + newName);

		spawn.spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName, {
			memory: { role: 'bigharv' }
		});
			
		spawnHelper.drawSpawningVisual(spawn);
	}
};

module.exports = spawnBigHarvester;