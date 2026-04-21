var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		if (creep.room.find(STRUCTURE_EXTENSION) < 5) {
			creep.say("DUMBASSSSSSSS")
			let spawn = creep.room.find(FIND_MY_SPAWNS)[0].pos
			const constrarea = creep.room.lookAtArea(spawn.y-3, spawn.x-3, spawn.y+3, spawn.x+3)
			for( let x = -2 ; x <= 2 ; x+=4)
				for( let y = -2 ; y <= 2 ; y+=4)
					if(constrarea[spawn.y][spawn.x-2][0].terrain !== 'wall' && constrarea[spawn.y][spawn.x-2][0].type !== 'structure') {
						creep.room.createConstructionSite(spawn.x + x, spawn.y + y, STRUCTURE_EXTENSION)
					}
		} else {
			if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller, {
					visualizePathStyle: {stroke: '#ffffff'},
					ignoreCreeps: true
				});
			}
		}
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() === 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);

            if(targets.length) {
				if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {
						visualizePathStyle: {stroke: '#ffffff'},
						ignoreCreeps: true
					});
				}
			}

	    }
	    else {
	        var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
				creep.moveTo(source, {
					visualizePathStyle: {stroke: '#ffaa00'},
					ignoreCreeps: true
				});
            }
	    }
	}
};

module.exports = roleBuilder;	
