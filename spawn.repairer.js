/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn.repairer');
 * mod.thing == 'a thing'; // true
 */

var spawnRepairer = {
	
	run: function() {
		var newName = 'Repairer' + Game.time;
				console.log('Spawning new Repairer: ' + newName);
				Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
					{memory: {role: 'repairer'}});
			
			
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

module.exports = spawnRepairer;