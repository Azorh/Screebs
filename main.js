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
	
	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
	var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');	
	var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
	var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
	var bigharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'bigharv');
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
