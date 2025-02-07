-- server/main.lua

ESX = exports['es_extended']:getSharedObject()

-- Create the market_listings table on resource start.
AddEventHandler('onResourceStart', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        exports.oxmysql:execute([[
            CREATE TABLE IF NOT EXISTS market_listings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                seller VARCHAR(50) NOT NULL,
                item VARCHAR(50) NOT NULL,
                quantity INT NOT NULL,
                price INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ]], {}, function(rowsChanged)
            print("Market table initialized or already exists.")
            refreshMarketListings()  -- Initial refresh on resource start.
        end)
    end
end)

-------------------------------------------------
-- Event: List an Item for Sale
-------------------------------------------------
RegisterNetEvent('market:listItem')
AddEventHandler('market:listItem', function(item, quantity, price)
    local _source = source
    local xPlayer = ESX.GetPlayerFromId(_source)
    if not xPlayer then return end

    -- Check if the player has enough of the item.
    local itemCount = exports.ox_inventory:GetItemCount(_source, item)
    if itemCount < quantity then
        TriggerClientEvent('esx:showNotification', _source, "You don't have enough " .. item)
        return
    end

    -- Remove the items from the player's inventory.
    local removed = exports.ox_inventory:RemoveItem(_source, item, quantity)
    if removed then
        exports.oxmysql:execute([[
            INSERT INTO market_listings (seller, item, quantity, price)
            VALUES (?, ?, ?, ?)
        ]], {xPlayer.identifier, item, quantity, price}, function(insertId)
            TriggerClientEvent('esx:showNotification', _source, "You have listed " .. quantity .. " " .. item .. " for sale at $" .. price .. " each.")
            refreshMarketListings()
        end)
    else
        TriggerClientEvent('esx:showNotification', _source, "Failed to remove item from inventory.")
    end
end)

-------------------------------------------------
-- Event: Purchase an Item from the Market
-------------------------------------------------
RegisterNetEvent('market:buyItem')
AddEventHandler('market:buyItem', function(item)
    local _source = source
    local xBuyer = ESX.GetPlayerFromId(_source)
    if not xBuyer then return end

    -- Query the lowest-priced listing for the specified item.
    exports.oxmysql:query([[
        SELECT * FROM market_listings
        WHERE item = ?
        ORDER BY price ASC
        LIMIT 1
    ]], {item}, function(result)
        if result and #result > 0 then
            local listing = result[1]
            local price = listing.price
            local listingId = listing.id
            local sellerIdentifier = listing.seller

            if xBuyer.getMoney() >= price then
                xBuyer.removeMoney(price)
                local added = exports.ox_inventory:AddItem(_source, item, 1)
                if added then
                    local newQuantity = listing.quantity - 1
                    if newQuantity > 0 then
                        exports.oxmysql:execute([[
                            UPDATE market_listings 
                            SET quantity = ?
                            WHERE id = ?
                        ]], {newQuantity, listingId}, function(updatedRows)
                            -- Updated successfully.
                        end)
                    else
                        exports.oxmysql:execute([[
                            DELETE FROM market_listings 
                            WHERE id = ?
                        ]], {listingId}, function(deletedRows)
                            -- Deleted successfully.
                        end)
                    end

                    -- Credit the seller: if the seller is online, add money directly; otherwise, update the DB.
                    local xSeller = ESX.GetPlayerFromIdentifier(sellerIdentifier)
                    if xSeller then
                        xSeller.addMoney(price)
                        TriggerClientEvent('esx:showNotification', xSeller.source, "Your " .. item .. " was sold for $" .. price)
                    else
                        exports.oxmysql:execute([[
                            UPDATE users 
                            SET bank = bank + ?
                            WHERE identifier = ?
                        ]], {price, sellerIdentifier})
                    end

                    TriggerClientEvent('esx:showNotification', _source, "You bought a " .. item .. " for $" .. price)
                    refreshMarketListings()
                else
                    xBuyer.addMoney(price)
                    TriggerClientEvent('esx:showNotification', _source, "Failed to add item to your inventory.")
                end
            else
                TriggerClientEvent('esx:showNotification', _source, "Not enough money to buy this item.")
            end
        else
            TriggerClientEvent('esx:showNotification', _source, "No listings available for this item.")
        end
    end)
end)

-------------------------------------------------
-- Function: Refresh Market Listings
-------------------------------------------------
function refreshMarketListings()
    exports.oxmysql:query("SELECT * FROM market_listings", {}, function(result)
        -- Broadcast the updated listings to all clients.
        TriggerClientEvent('market:refreshListings', -1, result)
    end)
end
