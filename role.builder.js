var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {stroke: '#ffffff'},
                        ignoreCreeps: true
                    });
                }
            } else {
				if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.controller, {
						visualizePathStyle: {stroke: '#ffffff'},
						ignoreCreeps: true
					});
				}
			}
	    }
	    else {
	        var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source, {
					visualizePathStyle: {stroke: '#ffaa00'},
					ignoreCreeps: true
				});
            }
	    }
	}
};

module.exports = roleBuilder;	
