var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleBigHarvester = require('role.bigharv');
var spawnHarvester = require('spawn.harvester');
var spawnRepairer = require('spawn.repairer');
var spawnUpgrader = require('spawn.upgrader');
var spawnBuilder = require('spawn.builder');
var spawnBigHarvester = require('spawn.bigharv');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    // Logic for spawning Spawn Extensions
    // Currently based off of hardcoded spawn name "Spawn1" may require modification for use in production
    var initialSpawn = Game.spawns['Spawn1']
    if ((initialSpawn.room.find(FIND_MY_CONSTRUCTION_SITES, { filter: {structureType: STRUCTURE_EXTENSION}}).length + initialSpawn.room.find(FIND_MY_STRUCTURES, { filter:  {structureType: STRUCTURE_EXTENSION}}).length) < 5) {
		let spawn = initialSpawn.room.find(FIND_MY_SPAWNS)[0].pos
		const constrarea = initialSpawn.room.lookAtArea(spawn.y-3, spawn.x-3, spawn.y+3, spawn.x+3)
		for( let x = -2 ; x <= 2 ; x+=4)
			for( let y = -2 ; y <= 2 ; y+=4)
				if(constrarea[spawn.y][spawn.x-2][0].terrain !== 'wall' && constrarea[spawn.y][spawn.x-2][0].type !== 'structure') {
					initialSpawn.room.createConstructionSite(spawn.x + x, spawn.y + y, STRUCTURE_EXTENSION)
				}
	}

	var creepsByRole = _.groupBy(Game.creeps, (creep) => creep.memory.role);

	var harvesters = creepsByRole.harvester || [];
	var repairers = creepsByRole.repairer || [];
	var upgraders = creepsByRole.upgrader || [];
	var builders = creepsByRole.builder || [];
	var bigharvesters = creepsByRole.bigharv || [];

	var creepamount = harvesters.length + repairers.length + upgraders.length + builders.length + bigharvesters.length
	var roomlvl = 1
	if (creepamount < 17 * roomlvl)
	{
		if( harvesters.length < 3 * roomlvl) 
		{
			spawnHarvester.run();
		}
		else
		if(upgraders.length < 4 * roomlvl)
		{
			spawnUpgrader.run();
		}
		else
		if(builders.length < 4 * roomlvl)
		{
			spawnBuilder.run();
		}
		else
		if(repairers.length < 4 * roomlvl)
		{
			spawnRepairer.run();
		}
		else
		if(bigharvesters.length < 2 * roomlvl)
		{
			spawnBigHarvester.run();
		}
	}
	
	
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep)
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep)
        }
		if(creep.memory.role == 'bigharv') {
			roleBigHarvester.run(creep)
		}
    }
}