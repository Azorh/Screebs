var spawnHelper = {
    getAvailableSpawn: function() {
        return Object.values(Game.spawns).find(s => !s.spawning);
    },

    drawSpawningVisual: function(spawn) {
        if (!spawn || !spawn.spawning) return;

        var spawningCreep = Game.creeps[spawn.spawning.name];
        if (!spawningCreep) return;

        spawn.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            { align: 'left', opacity: 0.8 }
        );
    }
};

module.exports = spawnHelper;