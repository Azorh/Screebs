var spawnHelper = require('spawn.helper');

var spawnBuilder = {
	
	run: function() {
		var spawn = spawnHelper.getAvailableSpawn();
		if (!spawn) return;

		var newName = 'Builder' + Game.time;
		console.log('Spawning new builder: ' + newName);

		spawn.spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
			memory: { role: 'builder', building: false, targetIndex: 0 }
		});
			
		spawnHelper.drawSpawningVisual(spawn);
	}
};

module.exports = spawnBuilder;