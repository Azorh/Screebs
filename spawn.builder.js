var spawnHelper = require('spawn.helper');

var spawnBuilder = {
	
	run: function() {
		var spawn = spawnHelper.getAvailableSpawn();
		if (!spawn) return;

		var newName = 'Builder' + Game.time;
		console.log('Spawning new builder: ' + newName);

		spawn.spawnCreep([WORK, CARRY, MOVE], newName, {
			memory: { role: 'builder' }
		});
			
		spawnHelper.drawSpawningVisual(spawn);
	}
};

module.exports = spawnBuilder;