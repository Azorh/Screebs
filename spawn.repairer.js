var spawnHelper = require('spawn.helper');

var spawnRepairer = {
	
	run: function() {
		var spawn = spawnHelper.getAvailableSpawn();
		if (!spawn) return;

		var newName = 'Repairer' + Game.time;
		console.log('Spawning new Repairer: ' + newName);

		spawn.spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
			memory: { role: 'repairer' }
		});
			
		spawnHelper.drawSpawningVisual(spawn);
	}
};

module.exports = spawnRepairer;