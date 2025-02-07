# AthenaMarket

Overview
AthenaMarket is a player-driven market system for FiveM, integrated with ox_inventory and ESX. This resource allows players to list items for sale and purchase items from other players in a user-friendly interface.

Features
Player-Driven Market: Players can list their items for sale and buy items from others.
Inventory Integration: Seamlessly integrates with ox_inventory to manage player inventories.
Dynamic UI: A modern and responsive user interface for market interactions.
Configurable Settings: Easily customizable settings for market behavior and notifications.
Installation
Download the Repository: Clone or download this repository to your FiveM resources folder.

bash

Verify
Run
Copy code
git clone https://github.com/xJakubi/athenamarket.git
Add to server.cfg: Ensure you add the resource to your server.cfg file.

plaintext

Verify
Run
Copy code
start athenamarket
Database Setup: The resource will automatically create the necessary database table (market_listings) upon starting.

Images: Place images for items in the images folder. Ensure the filenames match the item names used in your inventory.

Configuration
Open config.lua to customize the following settings:

Debug Mode: Enable or disable debug logs.
Database Table Name: Change the name of the database table if needed.
Market Listing Settings: Set limits for item quantities and prices.
Notification Messages: Customize messages shown to players for various actions.
Usage
Players can open the market interface using the /market command.
Players can list items for sale by selecting an item from their inventory and specifying the quantity and price.
Players can browse available listings and purchase items directly from other players.
Dependencies
ESX: Ensure you have the ESX framework installed.
ox_inventory: This resource requires ox_inventory for inventory management.
Contributing
Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

Feel free to change it, but please credit me if re-published :(

Author
Jakubi - AthenaNetwork
