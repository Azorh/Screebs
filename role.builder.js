var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
		
		// Toggle harvesting on
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
		// Toggle building on
	    if(!creep.memory.building && creep.store.getFreeCapacity() === 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
			// List of Construction Sites in the room the creep exists in
	        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);

			// Move towards next build target and attempt to build
            if(targets.length) {
				if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {
						visualizePathStyle: {stroke: '#ffffff'},
					});
				}
			}
			
			// Assuming nothing remains to build, pour energy into upgrading the room controller
			if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                               creep.moveTo(creep.room.controller, {
                                       visualizePathStyle: {stroke: '#ffffff'},
                               });
                       }
	    }
		// All else fails, harvest energy.
		// Includes logic for changing source if one runs dry while still needing more energy
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
	        var harvest = creep.harvest(sources[creep.memory.targetIndex])
	        
	        if (harvest == ERR_NOT_ENOUGH_RESOURCES) {
	            creep.memory.targetIndex++;
	            if (creep.memory.targetIndex > sources.length) {
	                creep.memory.targetIndex = 0;
	            }
	        }
            if(harvest == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.targetIndex], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;