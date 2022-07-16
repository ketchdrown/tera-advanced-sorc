
module.exports = function supersorc(mod) {
	
	//Variables
	let cid
	let myPosition
	let myAngle
	let enabled = true
	let distance = 1000
	let dolance = false
	let stacks = 0
	let replaced = false
	let fusion_enabled = false
	let implosion_enabled = false
	let MB_active = false
	let bs = false
	let clientTime
	
	
	//CDs
	let isCD_prime = false
	let isCD_iceberg = false
	let isCD_arcane_fus = false
	let isCD_fusion = false
	let isCD_arcane = false
	let isCD_fb = false
	let isCD_hail = false
	let isCD_void = false
	let isCD_nova = false
	let isCD_frost = false
	let isCD_light = false
	let isCD_barrage = false
	let isCD_mb = false
	let isCD_implosion = false
	let isCD_lances = false
	
	
	
	//TOs
	
	let isCD_prime_To = null
	let isCD_iceberg_To = null
	let isCD_arcane_fus_To = null
	let isCD_fusion_To = null
	let isCD_arcane_To = null
	let isCD_fb_To = null
	let isCD_hail_To = null
	let isCD_void_To = null
	let isCD_nova_To = null
	let isCD_frost_To = null
	let isCD_light_To = null
	let isCD_barrage_To = null
	let isCD_mb_To = null
	let isCD_implosion_To = null
	let isCD_lances_To = null	
	
	
	
	
	//IDs
	let paint_id = 160800
	let mb_abnormality_id = 503061	
	let fire_buff = 502070
	let ice_buff = 502071
	let arcane_buff = 502072
	let fire_enab = false
	let ice_enab = false
	let arcane_enab = false	
	let fusion_category = 5036
	let implosion_category = 5039
	let arcane_grant_id = 41212
	let prime_id = 360200
	let iceberg_id = 360400
	let arcane_fus_id = 360300
	let fusion_id = 360600
	let arcane_press_id = 41200
	let fusion_enab = 502050
	let urgency_id = 9100100
	let lances_id = 350100
	let implosion_id = 390100
	let stun_trap = 30300
	let fb_id = 61000
	let hail_id = 270900
	let void_id = 120900
	let nova_id = 300900
	let frost_id = 21000
	let light_id = 111100
	let barrage_id = 200500
	let mb_id = 340230
	
	let super_arcane = 41213
	
	
	
	//Boss
	let bossid
	let bossloc
	let bossw
	let monsters = []
	let block_hit = false

	
	mod.command.add('sorc', () => {
		enabled = !enabled
		mod.command.message(`Salchy's advanced sorc mod is now ${(enabled) ? 'en' : 'dis'}abled.`)
	})
	
	mod.hook('S_LOGIN', 14, (event) => {
		cid = event.gameId
	})

	mod.hook('S_ABNORMALITY_BEGIN', 4, (event) => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return		
		if(event.target==mod.game.me.gameId && event.id==mb_abnormality_id) {
			MB_active = true
		}
	})
	mod.hook('S_ABNORMALITY_END', 1, (event) => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return		
		if(event.target==mod.game.me.gameId && event.id==mb_abnormality_id) {
			MB_active = false
		}		
	})
	mod.hook('S_ABNORMALITY_REFRESH', 2, (event) => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return		
		if(event.target==mod.game.me.gameId && event.id==mb_abnormality_id) {
			MB_active = true
		}		
	})	
	
	mod.hook('S_SKILL_CATEGORY', 3, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return
		if(event.category==fusion_category) {
			fusion_enabled = event.enabled
		}
		if(event.category==implosion_category) {
			implosion_enabled = event.enabled
		}		
		
	})		
	
	mod.hook('S_START_COOLTIME_SKILL', 3, {order: -999999}, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return
		if(event.skill.id==lances_id) {
			clearTimeout(isCD_lances_To)
			isCD_lances = true
			isCD_lances_To = setTimeout(function () {
				isCD_lances = false
			}, event.cooldown)
		}		
		if(event.skill.id==mb_id) {
			clearTimeout(isCD_mb_To)
			isCD_mb = true
			isCD_mb_To = setTimeout(function () {
				isCD_mb = false
			}, event.cooldown)
		}
		if(event.skill.id==implosion_id) {
			clearTimeout(isCD_implosion_To)
			isCD_implosion = true
			isCD_implosion_To = setTimeout(function () {
				isCD_implosion = false
			}, event.cooldown)
		}		
		if(event.skill.id==prime_id) {
			clearTimeout(isCD_prime_To)
			isCD_prime = true
			isCD_prime_To = setTimeout(function () {
				isCD_prime = false
			}, event.cooldown)
			return false
		}
		if(event.skill.id==iceberg_id) {
			clearTimeout(isCD_iceberg_To)
			isCD_iceberg = true
			isCD_iceberg_To = setTimeout(function () {
				isCD_iceberg = false
			}, event.cooldown)
			return false
		}
		if(event.skill.id==arcane_fus_id) {
			clearTimeout(isCD_arcane_fus_To)
			isCD_arcane_fus = true
			isCD_arcane_fus_To = setTimeout(function () {
				isCD_arcane_fus = false
			}, event.cooldown)
			return false
		}		
		if(event.skill.id==fusion_id) {
			clearTimeout(isCD_fusion_To)
			isCD_fusion = true
			isCD_fusion_To = setTimeout(function () {
				isCD_fusion = false
			}, event.cooldown)
		}
		if(event.skill.id==arcane_press_id) {
			clearTimeout(isCD_arcane_To)
			isCD_arcane = true
			isCD_arcane_To = setTimeout(function () {
				isCD_arcane = false
			}, event.cooldown)
		}		
		if(event.skill.id==fb_id) {
			clearTimeout(isCD_fb_To)
			isCD_fb = true
			isCD_fb_To = setTimeout(function () {
				isCD_fb = false
			}, event.cooldown)
		}
		if(event.skill.id==hail_id) {
			clearTimeout(isCD_hail_To)
			isCD_hail = true
			isCD_hail_To = setTimeout(function () {
				isCD_hail = false
			}, event.cooldown)
		}
		if(event.skill.id==void_id) {
			clearTimeout(isCD_void_To)
			isCD_void = true
			isCD_void_To = setTimeout(function () {
				isCD_void = false
			}, event.cooldown)
		}
		if(event.skill.id==nova_id) {
			clearTimeout(isCD_nova_To)
			isCD_nova = true
			isCD_nova_To = setTimeout(function () {
				isCD_nova = false
			}, event.cooldown)
		}
		if(event.skill.id==frost_id) {
			clearTimeout(isCD_frost_To)
			isCD_frost = true
			isCD_frost_To = setTimeout(function () {
				isCD_frost = false
			}, event.cooldown)
		}
		if(event.skill.id==light_id) {
			clearTimeout(isCD_light_To)
			isCD_light = true
			isCD_light_To = setTimeout(function () {
				isCD_light = false
			}, event.cooldown)
		}
		if(event.skill.id==barrage_id) {
			clearTimeout(isCD_barrage_To)
			isCD_barrage = true
			isCD_barrage_To = setTimeout(function () {
				isCD_barrage = false
			}, event.cooldown)
		}		
	})

	mod.hook('S_SPAWN_NPC', 11, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return		
		monsters.push({ gameId: event.gameId, loc: event.loc, w: event.w })
	})
	mod.hook('S_BOSS_GAGE_INFO', 3, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return
		if(bossid && bossid == event.id) return
		bossid = event.id
		mod.send("S_CUSTOM_STYLE_SYSTEM_MESSAGE", 1, {
			message: "Boss detected",
			style: 54
		})
		mod.send("S_PLAY_SOUND", 1, {
			SoundID: 2023
		})		
		let monster = monsters.find(m => m.gameId === event.id)
		if (monster) { 
			bossloc = monster.loc
			bossw = monster.w
		}
			
				
		
	})

	mod.hook('S_NPC_LOCATION', 3, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return
		let monster = monsters.find(m => m.gameId === event.gameId)
		if (monster) { 
			monster.loc = event.loc
			monster.w = event.w
		}
		if(bossid == event.gameId) { 
			bossloc = event.loc
			bossw = event.w
		}
	})
	mod.hook('S_DESPAWN_NPC', 3, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return
		monsters = monsters.filter(m => m.gameId != event.gameId)
		if(bossid == event.gameId) { 
			bossid = null
			bossloc = null
			bossw = null
		}	
	})
	
	mod.hook('S_START_USER_PROJECTILE', 9, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return
		block_hit = false
		if(!bossid) return
		if(!bs) return
		let targets = []		
			targets.push({
				gameId: bossid
			})			
		
		if(!targets[0]) {
			block_hit = false
			return
		} else {
			block_hit = true
			mod.send('S_START_USER_PROJECTILE', 9, event)
			mod.send('C_HIT_USER_PROJECTILE', 4, {
				id: event.id,
				end: event.end,
				loc: bossloc,
				targets: targets
			})			
			return false	
		}
	})

	mod.hook('C_HIT_USER_PROJECTILE', 4, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return		
		if(block_hit) return false
	})


	mod.hook('S_EACH_SKILL_RESULT', 14, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return
		if(event.source!=mod.game.me.gameId && event.owner!=mod.game.me.gameId) return		
	})

	mod.hook('S_ACTION_STAGE', 9, { order: -999999 }, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return
		if(bossid == event.gameId) { 
			bossloc = event.loc
			bossw = event.w
		}		
		if(event.gameId==mod.game.me.gameId && event.skill.id==arcane_press_id && event.stage==2) {
			mod.send('C_PRESS_SKILL', 4, {
				skill: {
					reserved: 0,
					npc: false,
					type: 1,
					huntingZoneId: 0,
					id: arcane_press_id
				},
				press: false,
				loc: myPosition,
				w: myAngle								
			})
		}
		if(event.gameId==mod.game.me.gameId && ((Math.floor(event.skill.id / 10000))==39) && event.stage==2) {
			mod.send('S_ACTION_END', 5, {
				gameId: event.gameId,
				loc: {
					x: event.loc.x,
					y: event.loc.y,
					z: event.loc.z
				},
				w: event.w,
				templateId: event.templateId,
				skill: event.skill.id,
				type: 999999,
				id: event.id
			})
			return
		}
		if(event.gameId==mod.game.me.gameId && event.stage>0) {
			mod.send('S_ACTION_END', 5, {
				gameId: event.gameId,
				loc: {
					x: event.loc.x,
					y: event.loc.y,
					z: event.loc.z
				},
				w: event.w,
				templateId: event.templateId,
				skill: event.skill.id,
				type: 999999,
				id: event.id
			})
		}			
	})		

	mod.hook('S_ACTION_END', 5, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return
		if(bossid == event.gameId) { 
			bossloc = event.loc
			bossw = event.w
		}
	})
	
	mod.hook('S_CANNOT_START_SKILL', 4, { order: -999999 }, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return
		/*if(event.skill.id==fusion_id || event.skill.id==prime_id) {
			stacks = 0
		}
		return false*/
	})			
	mod.hook('S_PLAYER_STAT_UPDATE', 14, event => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return
		stacks = 0
		if(!event.alive) MB_active = false
		event.fireEdge = 4
		event.iceEdge = 4
		event.lightningEdge = 4
		if(event.fireEdge > 0) stacks++
		if(event.iceEdge > 0) stacks++
		if(event.lightningEdge > 0) stacks++
		return true
	})	

	
	mod.hook('C_PLAYER_LOCATION', 5, (event) => {
		myPosition = event.loc
		myAngle = event.w
		clientTime = event.time
	})
	
	mod.hook('C_START_SKILL', 7, { order: -Infinity }, (event) => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return		
		myPosition = event.loc
		myAngle = event.w
		replaced = false
		bs = false
		if((event.skill.id===stun_trap || event.skill.id===paint_id)) {		
				if(event.skill.id===paint_id) bs = true
				if(event.skill.id===stun_trap) bs = false
				if(bs && !bossloc) return false
				if(!isCD_lances) dolance = true			

				if(!isCD_mb && !replaced && bs) {
					event.skill.id = mb_id
					
					replaced = true
				}
				if(!isCD_implosion && !replaced && implosion_enabled && isCD_arcane && !isCD_fb) {
					event.skill.id = implosion_id
					
					replaced = true
				}
				if(!isCD_prime && (stacks>=2) && !replaced && fusion_enabled) {
					event.skill.id = prime_id
					replaced = true			
					if(bs) event.dest = bossloc
					if(!bs) {
						prime(distance,0)
						return false
					}
				}					
				if(!isCD_fusion && (stacks>=2) && !replaced && fusion_enabled && MB_active) {
					event.skill.id = fusion_id
					replaced = true
					if(bs) event.dest = bossloc	
				}										
			
				if(!isCD_hail && !replaced) {
					event.skill.id = hail_id
					replaced = true
					if(bs) event.dest = bossloc						
				}
				if(!isCD_arcane && !replaced) {
					mod.send('C_PRESS_SKILL', 4, {
						skill: {
							reserved: 0,
							npc: false,
							type: 1,
							huntingZoneId: 0,
							id: arcane_press_id
						},
						press: true,
						loc: myPosition,
						w: myAngle								
					})
					return false
				}
				if(!isCD_fb && !replaced) {
					event.skill.id = fb_id
					replaced = true
					if(bs) event.dest = bossloc						
				}
				if(!isCD_void && !replaced) {
					event.skill.id = void_id
					replaced = true
					if(bs) event.dest = bossloc						
				}					
				if(!isCD_nova && !replaced) {
					event.skill.id = nova_id
					replaced = true
					if(bs) event.dest = bossloc						
				}
				if(!isCD_light && !replaced) {
					event.skill.id = light_id
					replaced = true
					if(bs) event.dest = bossloc						
				}				
				if(!isCD_frost && !replaced) {
					event.skill.id = frost_id
					replaced = true
					if(bs) event.dest = bossloc						
				}
				if(!isCD_barrage && !replaced) {
					event.skill.id = barrage_id
					replaced = true
					if(bs) event.target = bossid						
				}
				if(bs && replaced) {

					/*event.loc.x = (Math.cos(bossw) * -150) + bossloc.x
					event.loc.y = (Math.sin(bossw) * -150) + bossloc.y
					event.loc.z = bossloc.z
					event.w = bossw
					mod.send('S_INSTANT_MOVE', 3, {
						gameId: mod.game.me.gameId,
						loc: event.loc,
						w: event.w
					});*/
					/*mod.send('C_PLAYER_LOCATION', 5, {
						loc: event.loc,
						w: event.w,
						lookDirection: event.w,
						dest: {x:0, y:0, z:0},
						type: 0,
						jumpDistance: 0,
						inShuttle: false,
						time: clientTime + 5
					})*/
				}
				if(dolance) {
					dolance = false
					lances(distance,0)
				}					
				if(replaced) return true
				if(!replaced) return false				
		}
		if((event.skill.id===stun_trap || event.skill.id===paint_id) && !bossloc) {
			return false
		}
		let sInfo = getSkillInfo(event.skill.id)		
		switch(sInfo.group) {
			case 4:
				dolance = true
				break								
			case 30:
				dolance = true
				break
			case 33:
				dolance = true
				break
			default:
				return
				break					
		}
		if(dolance) {
			dolance = false
			lances(distance,0)
		}
		
	})

	mod.hook('C_START_INSTANCE_SKILL', 7, (event) => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return		
		myPosition = event.loc
		myAngle = event.w
	})

	mod.hook('C_PRESS_SKILL', 4, { filter: { fake: false } }, (event) => {
		if(!enabled) return
		if(mod.game.me.class !== 'sorcerer') return		
		myPosition = event.loc
		myAngle = event.w
		if(event.skill.id==arcane_press_id && !event.press) {
			return false
		}
		
	})

    function getSkillInfo(id) {
		let nid = id;
        return {
            id: nid,
            group: Math.floor(nid / 10000),
            level: Math.floor(nid / 100) % 100,
            sub: nid % 100
        };
    }
	
	function prime(d, n) {
		CastPrime((Math.cos(myAngle) * d) + myPosition.x, (Math.sin(myAngle) * d) + myPosition.y, myPosition.z + n, myAngle);
	}
	
	function CastPrime(x, y, z, w = 0) {
		mod.send('C_START_SKILL', 7, {
			skill: {
				reserved: 0,
				npc: false,
				type: 1,
				huntingZoneId: 0,
				id: isCD_prime ? fusion_id : prime_id
			},
			w: bs ? bossw : myAngle,
			loc: {
					x: bs ? (Math.cos(bossw) * -150) + bossloc.x : myPosition.x,
					y: bs ? (Math.sin(bossw) * -150) + bossloc.y : myPosition.y,
					z: bs ? bossloc.z : myPosition.z
			},
			dest: {
				x: x,
				y: y,
				z: z
			},
			unk: true,
			moving: false,
			continue: false,
			target: 0,
			unk2: false						
		})		
	}

	function lances(d, n) {
		CastLances((Math.cos(myAngle) * d) + myPosition.x, (Math.sin(myAngle) * d) + myPosition.y, myPosition.z + n, myAngle);
	}
	
	function CastLances(x, y, z, w = 0) {
		mod.send('C_START_SKILL', 7, {
			skill: {
				reserved: 0,
				npc: false,
				type: 1,
				huntingZoneId: 0,
				id: lances_id
			},
			w: bs ? bossw : myAngle,
			loc: {
					x: bs ? ((Math.cos(bossw) * -150) + bossloc.x) : myPosition.x,
					y: bs ? ((Math.sin(bossw) * -150) + bossloc.y) : myPosition.y,
					z: bs ? bossloc.z : myPosition.z
			},
			dest: {
				x: x,
				y: y,
				z: z
			},
			unk: true,
			moving: false,
			continue: false,
			target: 0,
			unk2: false						
		})		
	}		
	
	
}
