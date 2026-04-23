var roleRepairer = {
	/** @param {Creep} creep **/
	run: function(creep) {
	    
	    // Default to transferring energy to the room controller
	    if (creep.room.controller.ticksToDowngrade < 10000 && creep.memory.repairing) {
		    if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
		        creep.moveTo(creep.room.controller, {
    				visualizePathStyle: {stroke: '#ffaa00'}
    			});
		    }
		    
		    if (creep.store[RESOURCE_ENERGY] == 0) {
		        creep.memory.repairing = false;
		    }
		}

		if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.repairing = false;
			creep.say('🔄 harvest');
		}

		if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
			creep.memory.repairing = true;
			creep.say('🔧 repair');
		}

		if(creep.memory.repairing) {
			var targets = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => structure.hits < structure.hitsMax
			});

			targets.sort((a, b) => a.hits - b.hits);

			if (targets.length > 0) {
				if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {
						visualizePathStyle: {stroke: '#ffffff'}
					});
				}
			}
		} else if (creep.getFreeCapacity !== 0) {
			var source = creep.pos.findClosestByPath(FIND_SOURCES);
			if(source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source, {
					visualizePathStyle: {stroke: '#ffaa00'}
				});
			}
		} else {
		    creep.moveTo(Game.flags.Idle);
		}
	}
}

module.exports = roleRepairer; 