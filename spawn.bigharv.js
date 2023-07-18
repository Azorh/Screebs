/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn.bigharv');
 * mod.thing == 'a thing'; // true
 */

var spawnBigHarvester = {
	
	run: function() {
		var newName = 'Big Harvester' + Game.time;
				console.log('Spawning new big harvester: ' + newName);
				Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName, 
					{memory: {role: 'bigharv'}});
			
			
			if(Game.spawns['Spawn1'].spawning) { 
				var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
				Game.spawns['Spawn1'].room.visual.text(
					'🛠️' + spawningCreep.memory.role,
					Game.spawns['Spawn1'].pos.x + 1, 
					Game.spawns['Spawn1'].pos.y, 
					{align: 'left', opacity: 0.8});
			}
	}
};

module.exports = spawnBigHarvester;