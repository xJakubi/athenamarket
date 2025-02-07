AthenaMarket:
  description: |
    AthenaMarket is a sophisticated, player-driven market system for FiveM, seamlessly integrated with ox_inventory and ESX.
    This resource empowers players to easily list items for sale and purchase items from others within a streamlined, user-friendly interface.


  features:
    - "🌟 Player-Driven Market": Players have full control to list their items for sale and purchase from others directly.
    - "🔹 Inventory Integration": Fully integrates with ox_inventory, enabling efficient management of player inventories.
    - "🔹 Dynamic User Interface": A sleek, modern, and responsive UI designed for seamless market interactions.
    - "🔹 Customizable Settings": Tailor the market's behavior and notifications with easy-to-use configuration options.


  installation:
    steps:
      - description: "🚀 Download the Repository"
        command: |
          git clone https://github.com/xJakubi/athenamarket.git
      - description: "⚙️ Add to `server.cfg`"
        command: |
          start athenamarket
      - description: "🛠️ Database Setup"
        note: "Upon starting, the resource will automatically create the required database table (`market_listings`)."
      - description: "🖼️ Item Images"
        note: "Place images for items in the `images` folder. Ensure that filenames correspond to the item names used in your inventory."


  configuration:
    - "⚙️ Debug Mode": Toggle debug logs on or off for troubleshooting.
    - "🔧 Database Table Name": Modify the database table name if necessary.
    - "🛒 Market Listing Settings": Adjust the limits for item quantities and pricing structures.
    - "🔔 Notification Messages": Tailor the in-game messages shown to players for various market actions.


  usage:
    - "🛍️ Opening the Market Interface": Players can open the market interface using the `/market` command.
    - "💵 Listing Items for Sale": Players can list their items by selecting an item from their inventory, specifying the quantity, and setting a price.
    - "🛒 Purchasing Items": Players can browse available listings and make purchases directly from other players.


  dependencies:
    - "⚙️ ESX": Ensure you have the ESX framework installed for full compatibility.
    - "📦 ox_inventory": This resource requires ox_inventory to manage player inventories.


  contributing:
    description: |
      🤝 We welcome contributions! Feel free to make changes, but please credit the original author if republishing.
      If you have suggestions or improvements, open an issue or submit a pull request.


  author:
    name: "Jakubi"
    network: "AthenaNetwork"
