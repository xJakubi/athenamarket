fx_version 'cerulean'
game 'gta5'

author 'Jakubi - AthenaNetwork'
description 'Player-driven market system integrated with ox_inventory and ESX'
version '1.0.0'

dependencies {
    'ox_inventory',
    'es_extended'
}

server_scripts {
    "config.lua",
    "server/main.lua"
}

client_scripts {
    "client/main.lua"
}

ui_page "html/index.html"

files {
    "html/index.html",
    "html/style.css",
    "html/script.js",
    "images/*.png"  
}