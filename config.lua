-- config.lua
Config = {}

--------------------------------------------------
-- General Settings
--------------------------------------------------
-- Enable or disable debug mode (prints extra logs)
Config.Debug = false

--------------------------------------------------
-- Database / Table Settings
--------------------------------------------------
-- Name of the database table to store market listings
Config.TableName = "market_listings"

--------------------------------------------------
-- Market Listing Settings
--------------------------------------------------
-- Maximum number of items a player is allowed to list in one transaction
Config.MaxListingQuantity = 1000
-- Minimum number of items a player can list
Config.MinListingQuantity = 1
-- Minimum allowed price per unit for a listing
Config.MinPricePerUnit = 1
-- Maximum allowed price per unit for a listing
Config.MaxPricePerUnit = 1000000

-- (Optional) Listing Expiration
-- If you wish to automatically remove stale listings, specify the expiration time in minutes.
-- Set to 0 to disable auto-expiration.
Config.ListingExpiration = 0  -- For example, 1440 means listings expire after 1 day

--------------------------------------------------
-- Notification Messages
--------------------------------------------------
-- Customize the messages that are shown to players for various actions
Config.Messages = {
    NotEnoughItems      = "You don't have enough %s to list.",
    ListingCreated      = "You have listed %d x %s for sale at %s%d each.",
    ListingFailed       = "Failed to list item %s.",
    NoListingAvailable  = "No listings available for %s.",
    PurchaseSuccess     = "You bought 1 %s for %s%d.",
    PurchaseFailed      = "Purchase failed. Please try again.",
    InsufficientFunds   = "You don't have enough money to buy %s.",
    SellerNotified      = "Your %s was sold for %s%d.",
    RefundFailed        = "Failed to add the item to your inventory. Refunding money."
}

--------------------------------------------------
-- ox_inventory Integration Settings
--------------------------------------------------
-- These settings let you change the names of the functions (if needed)
Config.Inventory = {
    -- Function names used from ox_inventory to check item count, remove, or add items.
    GetItemCountFunction = "GetItemCount",   -- e.g. exports.ox_inventory:GetItemCount(source, item)
    RemoveItemFunction   = "RemoveItem",      -- e.g. exports.ox_inventory:RemoveItem(source, item, quantity)
    AddItemFunction      = "AddItem"          -- e.g. exports.ox_inventory:AddItem(source, item, quantity)
}

--------------------------------------------------
-- Transaction Settings
--------------------------------------------------
-- Commission percentage to be taken from each sale (set to 0 for no commission)
Config.TransactionCommission = 0

--------------------------------------------------
-- Currency Settings
--------------------------------------------------
-- Currency symbol to display in notifications and UI elements
Config.CurrencySymbol = "$"

--------------------------------------------------
-- Additional Customization
--------------------------------------------------
-- (Add any additional settings here that you might need later,
-- such as UI colors, refresh intervals, etc.)

return Config
