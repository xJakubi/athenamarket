document.addEventListener('DOMContentLoaded', function() {
    const sellItemBtn = document.getElementById('sell-item-btn');
    const listingsContainer = document.querySelector('.market-listings');
    const marketContainer = document.getElementById('market-container');
    const closeBtn = document.getElementById('close-market-btn');
    const refreshMarketBtn = document.getElementById('refresh-market-btn'); // Refresh button
    const sellFormContainer = document.getElementById('sell-form-container');
    const sellSubmitBtn = document.getElementById('sell-submit-btn');
    const sellCancelBtn = document.getElementById('sell-cancel-btn');
    const currencySymbol = "$";
    
    // Full mapping from lowercase inventory names to image file names (without extension)
    const imageMapping = {
        "pistol": "weapon_pistol",
        "weapon_pistol": "weapon_pistol",
        "wrench": "weapon_wrench",
        "weed": "weed",
        "ziptie": "ziptie",
        "advancedkit": "advancedkit",
        "ammo-9": "ammo-9",
        "ammo-22": "ammo-22",
        "ammo-38": "ammo-38",
        "ammo-44": "ammo-44",
        "ammo-45": "ammo-45",
        "ammo-50": "ammo-50",
        "ammo-beanbag": "ammo-beanbag",
        "ammo-emp": "ammo-emp",
        "ammo-firework": "ammo-firework",
        "ammo-flare": "ammo-flare",
        "ammo-grenade": "ammo-grenade",
        "ammo-heavysniper": "ammo-heavysniper",
        "ammo-laser": "ammo-laser",
        "ammo-musket": "ammo-musket",
        "ammo-railgun": "ammo-railgun",
        "ammo-rifle": "ammo-rifle",
        "ammo-rifle2": "ammo-rifle2",
        "ammo-rocket": "ammo-rocket",
        "ammo-shotgun": "ammo-shotgun",
        "ammo-sniper": "ammo-sniper",
        "armour": "armour",
        "at_barrel": "at_barrel",
        "at_clip_drum": "at_clip_drum",
        "at_clip_extended": "at_clip_extended",
        "at_clip_extended2": "at_clip_extended2",
        "at_flashlight": "at_flashlight",
        "at_grip": "at_grip",
        "at_muzzle_bell": "at_muzzle_bell",
        "at_muzzle_fat": "at_muzzle_fat",
        "at_muzzle_flat": "at_muzzle_flat",
        "at_muzzle_heavy": "at_muzzle_heavy",
        "at_muzzle_precision": "at_muzzle_precision",
        "at_muzzle_slanted": "at_muzzle_slanted",
        "at_muzzle_split": "at_muzzle_split",
        "at_muzzle_squared": "at_muzzle_squared",
        "at_muzzle_tactical": "at_muzzle_tactical",
        "at_scope_advanced": "at_scope_advanced",
        "at_scope_holo": "at_scope_holo",
        "at_scope_large": "at_scope_large",
        "at_scope_medium": "at_scope_medium",
        "at_scope_nv": "at_scope_nv",
        "at_scope_small": "at_scope_small",
        "at_scope_thermal": "at_scope_thermal",
        "at_suppressor": "at_suppressor",
        "bandage": "bandage",
        "black_money": "black_money",
        "burger": "burger",
        "burger_chicken": "burger_chicken",
        "card_bank": "card_bank",
        "card_id": "card_id",
        "carkey": "carkey",
        "cigarette": "cigarette",
        "cigarettes_redwood": "cigarettes_redwood",
        "cocaine": "cocaine",
        "donut": "donut",
        "fries": "fries",
        "garbage": "garbage",
        "key": "key",
        "lockpick": "lockpick",
        "medikit": "medikit",
        "meth": "meth",
        "money": "money",
        "mustard": "mustard",
        "oldkey": "oldkey",
        "panties": "panties",
        "paperbag": "paperbag",
        "parachute": "parachute",
        "phone": "phone",
        "pizza_ham": "pizza_ham",
        "pizza_ham_box": "pizza_ham_box",
        "pizza_ham_slice": "pizza_ham_slice",
        "radio": "radio",
        "scrapmetal": "scrapmetal",
        "sprunk": "sprunk",
        "trash": "trash",
        "trash_bread": "trash_bread",
        "trash_burger": "trash_burger",
        "trash_can": "trash_can",
        "trash_chips": "trash_chips",
        "usb_black": "usb_black",
        "water": "water",
        // Weapon mappings
        "weapon_acidpackage": "WEAPON_ACIDPACKAGE",
        "weapon_advancedrifle": "WEAPON_ADVANCEDRIFLE",
        "weapon_appistol": "WEAPON_APPISTOL",
        "weapon_assaultrifle": "WEAPON_ASSAULTRIFLE",
        "weapon_assaultrifle_mk2": "WEAPON_ASSAULTRIFLE_MK2",
        "weapon_assaultshotgun": "WEAPON_ASSAULTSHOTGUN",
        "weapon_assaultsmg": "WEAPON_ASSAULTSMG",
        "weapon_autoshotgun": "WEAPON_AUTOSHOTGUN",
        "weapon_ball": "WEAPON_BALL",
        "weapon_bat": "WEAPON_BAT",
        "weapon_battleaxe": "WEAPON_BATTLEAXE",
        "weapon_bottle": "WEAPON_BOTTLE",
        "weapon_bread": "WEAPON_BREAD",
        "weapon_briefcase": "WEAPON_BRIEFCASE",
        "weapon_briefcase_02": "WEAPON_BRIEFCASE_02",
        "weapon_bullpuprifle": "WEAPON_BULLPUPRIFLE",
        "weapon_bullpuprifle_mk2": "WEAPON_BULLPUPRIFLE_MK2",
        "weapon_bullpupshotgun": "WEAPON_BULLPUPSHOTGUN",
        "weapon_bzgas": "WEAPON_BZGAS",
        "weapon_candycane": "WEAPON_CANDYCANE",
        "weapon_carbinerrifle": "WEAPON_CARBINERIFLE",
        "weapon_carbinerrifle_mk2": "WEAPON_CARBINERIFLE_MK2",
        "weapon_ceramicpistol": "WEAPON_CERAMICPISTOL",
        "weapon_combatmg": "WEAPON_COMBATMG",
        "weapon_combatmg_mk2": "WEAPON_COMBATMG_MK2",
        "weapon_combatpdw": "WEAPON_COMBATPDW",
        "weapon_combatpistol": "WEAPON_COMBATPISTOL",
        "weapon_combatshotgun": "WEAPON_COMBATSHOTGUN",
        "weapon_compactlauncher": "WEAPON_COMPACTLAUNCHER",
        "weapon_compactrifle": "WEAPON_COMPACTRIFLE",
        "weapon_crowbar": "WEAPON_CROWBAR",
        "weapon_dagger": "WEAPON_DAGGER",
        "weapon_dbshotgun": "WEAPON_DBSHOTGUN",
        "weapon_digiscanner": "WEAPON_DIGISCANNER",
        "weapon_doubleaction": "WEAPON_DOUBLEACTION",
        "weapon_emplauncher": "WEAPON_EMPLAUNCHER",
        "weapon_fertilizercan": "WEAPON_FERTILIZERCAN",
        "weapon_fireextinguisher": "WEAPON_FIREEXTINGUISHER",
        "weapon_firework": "WEAPON_FIREWORK",
        "weapon_flare": "WEAPON_FLARE",
        "weapon_flaregun": "WEAPON_FLAREGUN",
        "weapon_flashlight": "WEAPON_FLASHLIGHT",
        "weapon_gadgetpistol": "WEAPON_GADGETPISTOL",
        "weapon_garbagebag": "WEAPON_GARBAGEBAG",
        "weapon_gas": "WEAPON_GAS",
        "weapon_golfclub": "WEAPON_GOLFCLUB",
        "weapon_grenade": "WEAPON_GRENADE",
        "weapon_grenadelauncher": "WEAPON_GRENADELAUNCHER",
        "weapon_grenadelauncher_smoke": "WEAPON_GRENADELAUNCHER_SMOKE",
        "weapon_gusenberg": "WEAPON_GUSENBERG",
        "weapon_hammer": "WEAPON_HAMMER",
        "weapon_handcuffs": "WEAPON_HANDCUFFS",
        "weapon_hatchet": "WEAPON_HATCHET",
        "weapon_hazardcan": "WEAPON_HAZARDCAN",
        "weapon_heavypistol": "WEAPON_HEAVYPISTOL",
        "weapon_heavyrifle": "WEAPON_HEAVYRIFLE",
        "weapon_heavyshotgun": "WEAPON_HEAVYSHOTGUN",
        "weapon_heavysniper": "WEAPON_HEAVYSNIPER",
        "weapon_heavysniper_mk2": "WEAPON_HEAVYSNIPER_MK2",
        "weapon_hominglauncher": "WEAPON_HOMINGLAUNCHER",
        "weapon_knife": "WEAPON_KNIFE",
        "weapon_knuckle": "WEAPON_KNUCKLE",
        "weapon_machete": "WEAPON_MACHETE",
        "weapon_machinepistol": "WEAPON_MACHINEPISTOL",
        "weapon_marksmanpistol": "WEAPON_MARKSMANPISTOL",
        "weapon_marksmanrifle": "WEAPON_MARKSMANRIFLE",
        "weapon_marksmanrifle_mk2": "WEAPON_MARKSMANRIFLE_MK2",
        "weapon_metaldetector": "WEAPON_METALDETECTOR",
        "weapon_mg": "WEAPON_MG",
        "weapon_microsmg": "WEAPON_MICROSMG",
        "weapon_militaryrifle": "WEAPON_MILITARYRIFLE",
        "weapon_minigun": "WEAPON_MINIGUN",
        "weapon_minismg": "WEAPON_MINISMG",
        "weapon_molotov": "WEAPON_MOLOTOV",
        "weapon_musket": "WEAPON_MUSKET",
        "weapon_navyrevolver": "WEAPON_NAVYREVOLVER",
        "weapon_nightstick": "WEAPON_NIGHTSTICK",
        "weapon_petrolcan": "WEAPON_PETROLCAN",
        "weapon_pipebomb": "WEAPON_PIPEBOMB",
        "weapon_pistol": "WEAPON_PISTOL",
        "weapon_pistol_mk2": "WEAPON_PISTOL_MK2",
        "weapon_pistol50": "WEAPON_PISTOL50",
        "weapon_pistolxm3": "WEAPON_PISTOLXM3",
        "weapon_poolcue": "WEAPON_POOLCUE",
        "weapon_precisionrifle": "WEAPON_PRECISIONRIFLE",
        "weapon_proxmine": "WEAPON_PROXMINE",
        "weapon_pumpshotgun": "WEAPON_PUMPSHOTGUN",
        "weapon_pumpshotgun_mk2": "WEAPON_PUMPSHOTGUN_MK2",
        "weapon_railgun": "WEAPON_RAILGUN",
        "weapon_railgunxm3": "WEAPON_RAILGUNXM3",
        "weapon_raycarbine": "WEAPON_RAYCARBINE",
        "weapon_rayminigun": "WEAPON_RAYMINIGUN",
        "weapon_raypistol": "WEAPON_RAYPISTOL",
        "weapon_revolver": "WEAPON_REVOLVER",
        "weapon_revolver_mk2": "WEAPON_REVOLVER_MK2",
        "weapon_rpg": "WEAPON_RPG",
        "weapon_sawoffshotgun": "WEAPON_SAWNOFFSHOTGUN",
        "weapon_smg": "WEAPON_SMG",
        "weapon_smg_mk2": "WEAPON_SMG_MK2",
        "weapon_smokegrenade": "WEAPON_SMOKEGRENADE",
        "weapon_sniperrifle": "WEAPON_SNIPERRIFLE",
        "weapon_snowball": "WEAPON_SNOWBALL",
        "weapon_snspistol": "WEAPON_SNSPISTOL",
        "weapon_snspistol_mk2": "WEAPON_SNSPISTOL_MK2",
        "weapon_specialcarbine": "WEAPON_SPECIALCARBINE",
        "weapon_specialcarbine_mk2": "WEAPON_SPECIALCARBINE_MK2",
        "weapon_stickybomb": "WEAPON_STICKYBOMB",
        "weapon_stone_hatchet": "WEAPON_STONE_HATCHET",
        "weapon_stungun": "WEAPON_STUNGUN",
        "weapon_switchblade": "WEAPON_SWITCHBLADE",
        "weapon_tecpistol": "WEAPON_TECPISTOL",
        "weapon_vintagepistol": "WEAPON_VINTAGEPISTOL"
    };

    window.addEventListener('message', function(event) {
        const data = event.data;
        
        if (data.action === 'show') {
            marketContainer.style.display = 'block';
            marketContainer.classList.add('overlay-visible'); // Show the market and overlay
            refreshMarket(); // Refresh the market when it first opens
        } else if (data.action === 'hide') {
            marketContainer.style.display = 'none';
            marketContainer.classList.remove('overlay-visible'); // Hide the market and overlay
            hideSellForm();
        } else if (data.type === 'updateListings') {
            listingsContainer.innerHTML = ''; // Clear existing listings
            let groupedListings = {};
    
            // Group listings by item name and find the cheapest one
            data.listings.forEach(function(listing) {
                if (!groupedListings[listing.item]) {
                    groupedListings[listing.item] = listing;
                } else {
                    if (listing.price < groupedListings[listing.item].price) {
                        groupedListings[listing.item] = listing;
                    }
                }
            });
    
            // Now append only the cheapest listings
            Object.values(groupedListings).forEach(function(listing) {
                const card = createListingCard(listing);
                listingsContainer.appendChild(card);
            });
        } else if (data.action === 'populateSellItems') {
            populateSellSelect(data.items);
        }
    });
    
    // Function to refresh the market
    function refreshMarket() {
        fetch(`https://${GetParentResourceName()}/getMarketListings`, {
            method: 'POST',
            body: JSON.stringify({})
        }).then(response => response.json()).then(data => {
            if (data && data.listings) {
                listingsContainer.innerHTML = ''; // Clear existing listings
                data.listings.forEach(function(listing) {
                    const card = createListingCard(listing);
                    listingsContainer.appendChild(card);
                });
            }
        }).catch(err => {
            console.error('Error refreshing market:', err);
        });
    }
    
    

    sellItemBtn.addEventListener('click', function() {
        fetch(`https://${GetParentResourceName()}/requestSellInventory`, {
            method: 'POST',
            body: JSON.stringify({})
        });
        showSellForm();
    });
    
    closeBtn.addEventListener('click', function() {
        closeMarket();
    });
    
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Escape') {
            closeMarket();
        }
    });
    
    sellSubmitBtn.addEventListener('click', function() {
        const sellSelect = document.getElementById('sell-item-select');
        const item = sellSelect.value;
        const quantity = parseInt(document.getElementById('sell-item-quantity').value);
        const price = parseInt(document.getElementById('sell-item-price').value);
        
        if (!item || isNaN(quantity) || quantity <= 0 || isNaN(price) || price <= 0) {
            alert('Please enter valid values.');
            return;
        }
        
        fetch(`https://${GetParentResourceName()}/submitSellForm`, {
            method: 'POST',
            body: JSON.stringify({ item, quantity, price })
        }).then(() => {
            hideSellForm();
        });
    });
    
    sellCancelBtn.addEventListener('click', function() {
        hideSellForm();
    });
    
    function showSellForm() {
        sellFormContainer.style.display = 'flex';
    }
    
    function hideSellForm() {
        sellFormContainer.style.display = 'none';
        document.getElementById('sell-item-quantity').value = '';
        document.getElementById('sell-item-price').value = '';
    }
    
    function closeMarket() {
        fetch(`https://${GetParentResourceName()}/closeMarket`, {
            method: 'POST',
            body: JSON.stringify({})
        });
    }
    
    function getImageName(item) {
        // Use mapping if exists.
        const lowerItem = item.toLowerCase();
        if (imageMapping.hasOwnProperty(lowerItem)) {
            return imageMapping[lowerItem];
        }
        // If the item doesn't start with "weapon_" and is short, assume it's a weapon.
        if (!lowerItem.startsWith("weapon_") && lowerItem.length <= 12) {
            return "weapon_" + lowerItem;
        }
        return lowerItem;
    }
    
    function createListingCard(listing) {
        const card = document.createElement('div');
        card.classList.add('listing-card');
    
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
    
        const img = document.createElement('img');
        let imageName = getImageName(listing.item);
        if (!imageName.toLowerCase().endsWith('.png')) {
            imageName += '.png';
        }
        // Use the images folder in the athenamarket resource.
        img.src = `https://cfx-nui-athenamarket/images/${imageName}`;
        img.alt = listing.item;
        // Debug log to verify the image source.
        console.log("Loading image from:", img.src);
        imageContainer.appendChild(img);
    
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('listing-details');
    
        const title = document.createElement('h2');
        title.textContent = listing.item;
        detailsDiv.appendChild(title);
    
        const priceP = document.createElement('p');
        priceP.classList.add('price');
        priceP.innerHTML = `Price: <span>${currencySymbol}${listing.price}</span>`;
        detailsDiv.appendChild(priceP);
    
        const quantityP = document.createElement('p');
        quantityP.classList.add('quantity');
        quantityP.innerHTML = `Quantity: <span>${listing.quantity}</span>`;
        detailsDiv.appendChild(quantityP);
    
        const buyButton = document.createElement('button');
        buyButton.classList.add('buy-btn');
        buyButton.textContent = 'Buy Now';
        buyButton.addEventListener('click', function() {
            fetch(`https://${GetParentResourceName()}/buyItem`, {
                method: 'POST',
                body: JSON.stringify({ item: listing.item })
            });
        });
    
        card.appendChild(imageContainer);
        card.appendChild(detailsDiv);
        card.appendChild(buyButton);
    
        return card;
    }
    
    function populateSellSelect(items) {
        const sellSelect = document.getElementById('sell-item-select');
        sellSelect.innerHTML = '<option value="">--Select an Item--</option>';
        items.forEach(function(item) {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = `${item.label} (${item.count})`;
            sellSelect.appendChild(option);
        });
    }
});
