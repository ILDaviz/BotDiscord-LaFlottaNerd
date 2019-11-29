'use strict'

import Discord from 'discord.js'
import * as Jsondata from './helpers/json'

const client = new Discord.Client();
const item = new Jsondata.Jsondata();
console.log(item.getSetting('enable_rank'));