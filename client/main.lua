-- client/main.lua

ESX = exports['es_extended']:getSharedObject()

-- Local variable to store the player's full inventory (slots-based table)
local playerInventory = {}

-- Listen for ox_inventory:updateInventory event to update our local inventory.
AddEventHandler('ox_inventory:updateInventory', function(changes)
    if changes then
        -- Merge changes into playerInventory.
        for slot, value in pairs(changes) do
            if value then
                playerInventory[slot] = value
            else
                playerInventory[slot] = nil
            end
        end
        print("Inventory updated (merged): " .. json.encode(playerInventory))
    else
        print("ox_inventory:updateInventory fired with no data")
    end
end)

-- Add a chat suggestion for the /market command.
Citizen.CreateThread(function()
    TriggerEvent('chat:addSuggestion', '/market', 'Open the market menu')
end)

-- When /market is executed, show the market UI.
RegisterCommand('market', function(source, args, rawCommand)
    SetNuiFocus(true, true)
    SendNUIMessage({ action = "show" })
end, false)

-- NUI callback: Close the market UI.
RegisterNUICallback('closeMarket', function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({ action = "hide" })
    cb('ok')
end)

-- NUI callback: Request the player's inventory for selling.
RegisterNUICallback('requestSellInventory', function(data, cb)
    local sellItems = {}
    for slot, item in pairs(playerInventory) do
        if item and item.count and item.count > 0 then
            table.insert(sellItems, {
                name = item.name,
                label = item.label or item.name,
                count = item.count
            })
        end
    end
    print("Sending sell inventory to NUI: " .. json.encode(sellItems))
    SendNUIMessage({
        action = "populateSellItems",
        items = sellItems
    })
    cb('ok')
end)

-- NUI callback: Handle submission of the sell form.
RegisterNUICallback('submitSellForm', function(data, cb)
    local item = data.item
    local quantity = tonumber(data.quantity)
    local price = tonumber(data.price)
    if item and quantity and price then
        TriggerServerEvent('market:listItem', item, quantity, price)
    else
        print("Invalid sell form data")
    end
    cb('ok')
end)

-- NUI callback: Handle purchase requests.
RegisterNUICallback('buyItem', function(data, cb)
    local item = data.item
    if item then
        TriggerServerEvent('market:buyItem', item)
    else
        print("Invalid item purchase request")
    end
    cb('ok')
end)

-- Listen for market listings refresh event from the server.
RegisterNetEvent('market:refreshListings')
AddEventHandler('market:refreshListings', function(listings)
    SendNUIMessage({
        type = 'updateListings',
        listings = listings
    })
end)
