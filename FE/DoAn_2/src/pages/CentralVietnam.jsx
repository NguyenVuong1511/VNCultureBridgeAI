import { useMemo } from "react";
import RegionPage from "../components/regions/RegionPage";
import { getRegionData } from "../utils/regions";

export const centralVietnamData = {
  title: "Central Vietnam",
  heroImage: "/img/Co-do-hue.jpg",
  heroCredit: "Cố đô Huế. Photo by Nguyen Minh Vuong.",
  overview: {
    highlight: "Central Vietnam is known for its well-preserved historical sites, smiling locals, and soothing natural beauty. The central coast will beckon you with the promise of enriching experiences and sun-kissed days by the beach.",
    description1: "From the ancient imperial city of Hue to the charming lantern-lit streets of Hoi An, Central Vietnam offers a journey through Vietnam's rich history and culture. The region is home to numerous UNESCO World Heritage Sites, including the Imperial Citadel of Hue, Hoi An Ancient Town, and the My Son Sanctuary.",
    description2: "The central coast boasts some of Vietnam's most beautiful beaches, from the bustling resort town of Nha Trang to the tranquil shores of Da Nang. Inland, the region reveals spectacular natural wonders like Phong Nha-Ke Bang National Park, home to the world's largest caves, and the cool mountain retreat of Da Lat, known as the 'City of Eternal Spring'.",
    images: [
      {
        src: "/img/Hoi-an.jpg",
        alt: "Hoi An Ancient Town",
        caption: "Hoi An - UNESCO World Heritage Ancient Town"
      },
      {
        src: "/img/Co-do-hue.jpg",
        alt: "Hue Imperial Citadel",
        caption: "Hue Imperial Citadel - Former Royal Capital"
      }
    ],
    highlights: [
      {
        icon: '<i class="fa-brands fa-fort-awesome"></i>',
        title: "Imperial Heritage",
        description: "Hue's royal citadel, tombs, and ancient capital showcasing Vietnam's imperial past."
      },
      {
        icon: '<i class="fa-solid fa-landmark"></i>',
        title: "Ancient Towns",
        description: "Hoi An's well-preserved architecture and lantern-lit streets create magical evenings."
      },
      {
        icon: '<i class="fa-solid fa-umbrella-beach"></i>',
        title: "Coastal Beauty",
        description: "Pristine beaches from Da Nang to Nha Trang, perfect for relaxation and water sports."
      },
      {
        icon: '<i class="fa-solid fa-tree"></i>',
        title: "Natural Wonders",
        description: "Son Doong Cave, the world's largest cave, and spectacular karst formations."
      }
    ]
  },
  destinations: [
    {
      name: "DA NANG",
      description: "Modern coastal city with beautiful beaches, the iconic Dragon Bridge, and proximity to ancient sites.",
      image: "/img/Da-nang.jpg",
      content: [
        "Da Nang is Vietnam's third-largest city and a rapidly developing coastal metropolis that perfectly blends modern urban life with natural beauty. Located on the central coast, Da Nang serves as a gateway to the region's UNESCO World Heritage Sites while offering its own array of attractions.",
        "The city is famous for its stunning beaches, particularly My Khe Beach, which was voted one of the world's most attractive beaches by Forbes. The iconic Dragon Bridge, which breathes fire and water on weekend nights, has become a symbol of the city's modernity and innovation.",
        "Da Nang is strategically located between three UNESCO World Heritage Sites: Hoi An Ancient Town (30 km south), Hue Imperial City (100 km north), and My Son Sanctuary (70 km southwest). This makes it an ideal base for exploring Central Vietnam's cultural treasures.",
        "Beyond the beaches, Da Nang offers attractions like the Marble Mountains with their caves and pagodas, Ba Na Hills with its famous Golden Bridge, and the Son Tra Peninsula with its pristine nature and the Linh Ung Pagoda. The city's food scene is also exceptional, with fresh seafood and Central Vietnamese specialties.",
      ],
      images: [
        {
          src: "/img/Cau-rong.jpg",
          alt: "Da Nang city",
          caption: "Modern Da Nang with Dragon Bridge",
        },
        {
          src: "/img/My-khe.png",
          alt: "My Khe Beach",
          caption: "My Khe Beach - one of the world's most attractive beaches",
        },
      ],
      highlights: [
        "My Khe Beach - voted one of the world's most attractive beaches",
        "Iconic Dragon Bridge with fire and water shows",
        "Gateway to three UNESCO World Heritage Sites",
        "Marble Mountains with caves and pagodas",
      ],
      tips: [
        "Best time to visit: February to May for dry weather",
        "Watch the Dragon Bridge fire show on weekends (9 PM)",
        "Use Da Nang as a base to explore Hoi An and Hue",
        "Try local specialties like banh xeo and fresh seafood",
      ],
      location: "Central Vietnam coast, approximately 764 km north of Ho Chi Minh City",
    },
    {
      name: "HOI AN",
      description: "UNESCO World Heritage ancient town with colorful lanterns, Japanese bridges, and tailor shops.",
      image: "/img/Hoi-an.jpg",
      content: [
        "Hoi An is one of Vietnam's most enchanting destinations, a beautifully preserved ancient trading port that has been recognized as a UNESCO World Heritage Site since 1999. The town's architecture reflects its history as a major trading hub, with influences from Chinese, Japanese, French, and Vietnamese cultures.",
        "The Ancient Town is a pedestrian-friendly area filled with narrow streets, historic buildings, and hundreds of colorful silk lanterns that create a magical atmosphere, especially at night. The iconic Japanese Covered Bridge, built in the 16th century, is one of the town's most photographed landmarks.",
        "Hoi An is famous for its tailor shops, where visitors can have custom-made clothing created in just 24 hours. The town is also known for its exceptional cuisine, with signature dishes like cao lau, white rose dumplings, and banh mi that are unique to the area. Cooking classes are popular among visitors who want to learn the secrets of Central Vietnamese cooking.",
        "Beyond the Ancient Town, visitors can explore the surrounding countryside by bicycle, visit nearby beaches like An Bang and Cua Dai, or take a boat trip on the Thu Bon River. The monthly Full Moon Lantern Festival, when the town turns off its electric lights and glows only with lanterns, is a particularly magical experience.",
      ],
      images: [
        {
          src: "/img/LANTERN_HOI_AN.webp",
          alt: "Hoi An Ancient Town",
          caption: "Hoi An's colorful lantern-lit streets",
        },
        {
          src: "/img/Japanese-Bridge-Hoi-An-1_1693810259.jpg",
          alt: "Japanese Covered Bridge",
          caption: "The iconic Japanese Covered Bridge",
        },
      ],
      highlights: [
        "UNESCO World Heritage Site since 1999",
        "Beautifully preserved 15th-19th century architecture",
        "Famous for custom tailoring and cooking classes",
        "Monthly Full Moon Lantern Festival",
      ],
      tips: [
        "Best time to visit: February to April for pleasant weather",
        "Visit during Full Moon Festival for magical experience",
        "Get custom-made clothing - allow 24-48 hours",
        "Take a cooking class to learn local cuisine",
        "Rent a bicycle to explore the countryside",
      ],
      location: "Quang Nam Province, approximately 30 km south of Da Nang",
    },
    {
      name: "NHA TRANG",
      description: "Popular beach resort destination with pristine beaches, water sports, and vibrant nightlife.",
      image: "/img/nha-trang_1.jpg",
      content: [
        "Nha Trang is Vietnam's premier beach resort destination, known for its long stretch of white sand, clear turquoise waters, and vibrant atmosphere. The city has developed into a major tourist hub while maintaining its natural beauty and laid-back coastal charm.",
        "The main beach stretches for 6 kilometers along the city's waterfront, offering excellent conditions for swimming, sunbathing, and water sports. The city is particularly popular for scuba diving and snorkeling, with numerous dive sites featuring coral reefs and diverse marine life. Island-hopping tours to nearby islands like Hon Mun, Hon Tam, and Hon Tre are also popular activities.",
        "Beyond the beach, Nha Trang offers attractions like the Po Nagar Cham Towers, ancient Hindu temples dating back to the 7th-12th centuries, and the Long Son Pagoda with its large white Buddha statue. The city also has a vibrant nightlife scene with beachfront bars, clubs, and restaurants.",
        "Nha Trang's food scene is excellent, with fresh seafood being the highlight. The city is also known for its nem nuong (grilled pork skewers) and banh can (mini pancakes). The Vinpearl amusement park on Hon Tre Island offers entertainment for families, while the mud baths and hot springs provide relaxation options.",
      ],
      images: [
        {
          src: "/img/nha-trang_1.jpg",
          alt: "Nha Trang Beach",
          caption: "Nha Trang's beautiful beach and coastline",
        },
        {
          src: "/img/Nha-trang-city.jpg",
          alt: "Nha Trang city",
          caption: "Vibrant Nha Trang cityscape",
        },
      ],
      highlights: [
        "6 km stretch of beautiful white sand beach",
        "Excellent scuba diving and snorkeling",
        "Po Nagar Cham Towers - ancient Hindu temples",
        "Vibrant nightlife and dining scene",
      ],
      tips: [
        "Best time to visit: January to August for dry season",
        "Try island-hopping tours to nearby islands",
        "Book diving trips in advance during peak season",
        "Visit Po Nagar Cham Towers early morning to avoid crowds",
        "Enjoy fresh seafood at beachfront restaurants",
      ],
      location: "Khanh Hoa Province, approximately 442 km north of Ho Chi Minh City",
    },
    {
      name: "HUE",
      description: "Former imperial capital with royal tombs, the Citadel, and rich cultural heritage.",
      image: "/img/Co-do-hue.jpg",
      content: [
        "Hue served as Vietnam's imperial capital from 1802 to 1945 under the Nguyen Dynasty, and its rich royal heritage is still evident throughout the city. The Imperial Citadel, a UNESCO World Heritage Site, is a vast complex of palaces, temples, and walls that once housed the emperor and his court.",
        "The city is divided by the Perfume River, with the Imperial Citadel on the north bank and the modern city on the south. The citadel complex includes the Forbidden Purple City, where only the emperor, his family, and concubines were allowed. Although much was destroyed during the Vietnam War, ongoing restoration efforts have brought many structures back to life.",
        "Hue is famous for its royal tombs, scattered along the Perfume River. Each tomb reflects the personality of the emperor it honors, from the elaborate Khai Dinh Tomb to the peaceful Tu Duc Tomb. The Thien Mu Pagoda, with its iconic seven-story tower, is one of Vietnam's most famous religious sites.",
        "Hue's cuisine is considered among Vietnam's finest, with royal dishes that were once served only to the emperor. The city is also known for its vegetarian food, influenced by Buddhist traditions. Hue's cultural heritage extends to its traditional music, particularly Nha Nhac (royal court music), which is recognized as UNESCO Intangible Cultural Heritage.",
      ],
      images: [
        {
          src: "/img/Co-do-hue.jpg",
          alt: "Hue Imperial Citadel",
          caption: "The Imperial Citadel of Hue",
        },
        {
          src: "/img/phia-ben-ngoai-chua-thien-mu-hue_1750782073.jpg",
          alt: "Thien Mu Pagoda",
          caption: "Thien Mu Pagoda on the Perfume River",
        },
      ],
      highlights: [
        "UNESCO World Heritage Imperial Citadel",
        "Royal tombs along the Perfume River",
        "Thien Mu Pagoda - iconic seven-story tower",
        "Renowned royal cuisine and vegetarian food",
      ],
      tips: [
        "Best time to visit: January to April for pleasant weather",
        "Allow at least 2-3 days to explore the citadel and tombs",
        "Take a boat trip on the Perfume River to visit tombs",
        "Try royal cuisine and vegetarian dishes",
        "Visit during the Hue Festival (biennial, even years) for cultural performances",
      ],
      location: "Thua Thien Hue Province, approximately 100 km north of Da Nang",
    },
    {
      name: "PHONG NHA",
      description: "Home to the world's largest caves including Son Doong, Paradise Cave, and Phong Nha Cave.",
      image: "/img/du-lich-dong-phong-nha-ke-bang-quang-binh.jpeg",
      content: [
        "Phong Nha is a small town in Quang Binh Province that has gained international fame as the gateway to Phong Nha-Ke Bang National Park, home to some of the world's most spectacular cave systems. The area is a UNESCO World Heritage Site and contains over 300 caves and grottoes.",
        "The most famous cave is Son Doong, discovered in 2009 and recognized as the world's largest cave. This massive underground chamber is so large it has its own ecosystem, including a jungle, river, and even clouds. Access to Son Doong is limited and requires a challenging multi-day expedition, but the experience is truly once-in-a-lifetime.",
        "More accessible caves include Paradise Cave (Thien Duong), which stretches for 31 km and features stunning stalactites and stalagmites, and Phong Nha Cave, which can be explored by boat along an underground river. Dark Cave offers adventure activities like ziplining and mud bathing, while Tu Lan Cave system requires swimming and trekking through jungle.",
        "The national park itself is a biodiversity hotspot with pristine primary forests, karst mountains, and diverse wildlife. The area was heavily bombed during the Vietnam War but has recovered remarkably. Today, Phong Nha town has developed into an adventure tourism hub with accommodations, restaurants, and tour operators catering to cave explorers and nature enthusiasts.",
      ],
      images: [
        {
          src: "/img/cac-dia-diem-du-lich-o-phong-nha-1.jpg",
          alt: "Phong Nha Cave",
          caption: "Exploring Phong Nha Cave by boat",
        },
        {
          src: "/img/paradise-cave-6.jpg",
          alt: "Paradise Cave",
          caption: "Stunning formations in Paradise Cave",
        },
      ],
      highlights: [
        "Son Doong - world's largest cave",
        "UNESCO World Heritage National Park",
        "Over 300 caves and grottoes",
        "Adventure activities and cave exploration",
      ],
      tips: [
        "Best time to visit: February to August (dry season)",
        "Book Son Doong expeditions well in advance (limited permits)",
        "Paradise Cave and Phong Nha Cave are more accessible",
        "Bring appropriate gear for cave exploration",
        "Stay in Phong Nha town for easy access to caves",
      ],
      location: "Quang Binh Province, approximately 500 km north of Ho Chi Minh City",
    },
    {
      name: "DA LAT",
      description: "Mountain resort town known as 'City of Eternal Spring' with French colonial architecture and flower gardens.",
      image: "/img/du-lich-Da-Lat-ivivu.jpg",
      content: [
        "Da Lat, located in the Central Highlands at an elevation of 1,500 meters, is known as the 'City of Eternal Spring' due to its year-round cool climate and beautiful flower gardens. The city was established by the French in the early 20th century as a mountain retreat, and its European architecture and temperate weather make it feel like a different world from the rest of Vietnam.",
        "The city is famous for its flower gardens, particularly the Da Lat Flower Park, which showcases thousands of varieties of flowers including roses, orchids, and hydrangeas. The cool climate is perfect for growing vegetables, flowers, and coffee, making Da Lat a major agricultural center. The surrounding countryside is dotted with greenhouses and flower farms.",
        "Da Lat's architecture reflects its French colonial past, with charming villas, the iconic Crazy House (Hang Nga Guesthouse), and the Dalat Railway Station. The city is also known for its romantic atmosphere, with attractions like Xuan Huong Lake, the Valley of Love, and numerous waterfalls in the surrounding area.",
        "The city offers a range of activities from exploring the French Quarter and visiting coffee plantations to adventure activities like canyoning and mountain biking. Da Lat's food scene is excellent, with fresh produce, strawberries, artichoke tea, and the famous banh mi xiu mai (meatball sandwich) being local specialties.",
      ],
      images: [
        {
          src: "/img/10-best-nightlife-in-Dalat-Best-bars-night-activities-night-market.jpg",
          alt: "Da Lat city",
          caption: "Da Lat - City of Eternal Spring",
        },
        {
          src: "/img/Da-lat-flower.jpg",
          alt: "Da Lat flower gardens",
          caption: "Beautiful flower gardens in Da Lat",
        },
      ],
      highlights: [
        "City of Eternal Spring with year-round cool climate",
        "Beautiful flower gardens and French colonial architecture",
        "Crazy House - unique architectural wonder",
        "Fresh produce, coffee plantations, and strawberries",
      ],
      tips: [
        "Best time to visit: December to March for dry season",
        "Bring warm clothing - it can get chilly, especially at night",
        "Visit flower farms and coffee plantations",
        "Try local specialties like artichoke tea and banh mi xiu mai",
        "Explore the French Quarter and colonial architecture",
      ],
      location: "Lam Dong Province, Central Highlands, approximately 300 km northeast of Ho Chi Minh City",
    },
    {
      name: "PHU YEN",
      description: "Coastal province with stunning beaches, unique rock formations, and authentic local culture.",
      image: "/img/tour-cu-lao-mai-nha-1-ngay-quy-nhon-tourist-7.jpg",
      content: [
        "Phu Yen is a coastal province in Central Vietnam that has remained relatively undiscovered by mass tourism, offering pristine beaches, authentic local culture, and stunning natural landscapes. The province is gaining recognition for its unspoiled beauty and is becoming a favorite destination for travelers seeking a more authentic Vietnamese experience.",
        "The province's coastline features beautiful beaches like Bai Xep, Bai Mon, and Ganh Da Dia (the 'Stone Plate Beach'), which is famous for its unique hexagonal basalt rock formations created by volcanic activity. These natural wonders create a dramatic and photogenic landscape that's unlike anywhere else in Vietnam.",
        "Phu Yen is also known for its fishing culture, with traditional fishing villages where visitors can observe local life and enjoy fresh seafood. The province has several historical sites including the ancient Cham towers and the memorial to the famous Vietnamese poet Han Mac Tu.",
        "The area offers opportunities for outdoor activities like hiking, beach exploration, and water sports. The local cuisine features fresh seafood and Central Vietnamese specialties. Phu Yen's relatively undeveloped tourism infrastructure means fewer crowds and a more authentic experience, though facilities are more basic than in major tourist destinations.",
      ],
      images: [
        {
          src: "/img/2-Mui-Dien-xa-Hoa-Tam-TX-Dong-6646-7108-1653188298.jpg",
          alt: "Phu Yen beaches",
          caption: "Pristine beaches of Phu Yen",
        },
        {
          src: "/img/Phu-yen-ganh-da-dia.webp",
          alt: "Ganh Da Dia",
          caption: "Ganh Da Dia - unique basalt rock formations",
        },
      ],
      highlights: [
        "Pristine, undeveloped beaches",
        "Ganh Da Dia - unique hexagonal basalt formations",
        "Authentic fishing villages and local culture",
        "Less crowded than major tourist destinations",
      ],
      tips: [
        "Best time to visit: January to August for dry weather",
        "Rent a motorbike to explore the coastline",
        "Visit Ganh Da Dia at sunrise or sunset for best photos",
        "Try fresh seafood at local fishing villages",
        "Be prepared for more basic accommodation options",
      ],
      location: "Phu Yen Province, Central Vietnam coast, approximately 560 km north of Ho Chi Minh City",
    }
  ],
  food: [
    {
      title: "Bun Bo Hue",
      description: "Spicy beef noodle soup from Hue, known for its rich, lemongrass-infused broth.",
      image: "/img/bi-quyet-chuan-bi-gia-vi-nau-bun-bo-hue-chuan-vi-01.jpg",
      content: [
        "Bun bo Hue is one of Vietnam's most beloved noodle soups, originating from the imperial city of Hue. This spicy, aromatic soup is known for its complex, rich broth that's infused with lemongrass, shrimp paste, and chili, creating a bold and distinctive flavor that sets it apart from other Vietnamese noodle soups.",
        "The broth is made by simmering beef bones for hours with lemongrass, which gives it its characteristic fragrance. The soup gets its deep red color and spiciness from chili oil and annatto seeds. Shrimp paste (mam ruoc) adds a unique umami depth that's essential to the dish's flavor profile.",
        "The soup is served with round rice noodles (bun), slices of beef shank, and sometimes pork knuckles or pig's blood cubes. It's typically garnished with fresh herbs like banana blossom, mint, and perilla leaves, along with bean sprouts and lime. The dish is often accompanied by a side of pickled vegetables.",
        "Bun bo Hue is traditionally eaten for breakfast in Hue, but it's enjoyed throughout the day. The dish has gained popularity throughout Vietnam and internationally, though the most authentic versions are still found in Hue, where the recipe has been perfected over generations. The spiciness can be adjusted, but the dish is meant to have a noticeable kick.",
      ],
      images: [
        {
          src: "/img/490960221_1146954684109942_3759265434869304688_n.jpg",
          alt: "Bun bo Hue",
          caption: "Spicy bun bo Hue with lemongrass broth",
        },
        {
          src: "/img/bi-quyet-chuan-bi-gia-vi-nau-bun-bo-hue-chuan-vi-01.jpg",
          alt: "Bun bo Hue preparation",
          caption: "Preparing bun bo Hue at a local restaurant",
        },
      ],
      highlights: [
        "Spicy, lemongrass-infused broth",
        "Originated from Hue imperial city",
        "Rich, complex flavors with shrimp paste",
        "Traditionally eaten for breakfast",
      ],
      tips: [
        "Best enjoyed in Hue for authenticity",
        "Try it for breakfast like locals do",
        "Adjust spiciness to your preference",
        "Add fresh herbs and lime to enhance flavor",
        "Popular spots: Bun Bo Hue Ba Tuyet, Bun Bo Hue Ba Do",
      ],
      location: "Found throughout Vietnam, but most authentic in Hue",
    },
    {
      title: "Cao Lau",
      description: "Hoi An's signature dish with thick noodles, pork, and crispy croutons, unique to the ancient town.",
      image: "/img/Buoc-7-Thanh-pham-1-7-9577-1678700377.jpg",
      content: [
        "Cao lau is Hoi An's most famous and unique dish, a noodle bowl that can only be authentically made in the ancient town. The dish features thick, chewy noodles that are said to get their distinctive texture from water drawn from a specific well in Hoi An, making it impossible to replicate elsewhere.",
        "The noodles are made from rice that's been soaked in lye water (made from wood ash), which gives them their characteristic yellow color and firm, chewy texture. The dish is served with slices of barbecued pork, crispy pork skin croutons, fresh herbs, bean sprouts, and a small amount of rich, savory broth.",
        "What makes cao lau special is its unique combination of textures and flavors: the chewy noodles, tender pork, crispy croutons, fresh herbs, and rich broth all come together to create a harmonious dish. Unlike pho or bun bo Hue, cao lau uses very little broth - just enough to moisten the noodles without making it soupy.",
        "The dish reflects Hoi An's history as a trading port, with influences from Chinese, Japanese, and Vietnamese cuisines. Legend has it that the noodles were inspired by Japanese soba noodles, adapted to Vietnamese tastes. Cao lau is typically eaten for lunch or dinner and is a must-try when visiting Hoi An.",
      ],
      images: [
        {
          src: "/img/cao-lau-hoi-an-1.jpg",
          alt: "Cao lau",
          caption: "Hoi An's signature cao lau dish",
        },
        {
          src: "/img/quan-cao-lau-ngon-o-hoi-an-6.jpg",
          alt: "Cao lau noodles",
          caption: "Thick, chewy cao lau noodles",
        },
      ],
      highlights: [
        "Unique to Hoi An - cannot be authentically replicated elsewhere",
        "Thick, chewy noodles with distinctive texture",
        "Crispy pork skin croutons",
        "Reflects Hoi An's multicultural trading history",
      ],
      tips: [
        "Must try when visiting Hoi An",
        "Best enjoyed for lunch or dinner",
        "Mix all ingredients together before eating",
        "Popular spots: Cao Lau Thanh, Cao Lau Ba Le Well",
        "The noodles' texture is what makes it special",
      ],
      location: "Hoi An Ancient Town, Quang Nam Province",
    },
    {
      title: "Banh Xeo",
      description: "Crispy Vietnamese pancakes filled with shrimp, pork, and bean sprouts, served with fresh herbs.",
      image: "/img/cach-lam-banh-xeo-mien-trung.webp",
      content: [
        "Banh xeo, meaning 'sizzling cake' due to the sound it makes when cooking, is a crispy, savory pancake that's particularly popular in Central and Southern Vietnam. The Central Vietnamese version, especially from Quang Nam and Da Nang, is known for being larger and more filling than the Northern version.",
        "The batter is made from rice flour, turmeric (which gives it the characteristic yellow color), and coconut milk, creating a light, crispy crepe when fried in a hot pan. The pancake is filled with shrimp, pork, and bean sprouts, then folded in half like an omelet. The key to perfect banh xeo is achieving the right level of crispiness on the outside while keeping the filling moist.",
        "Banh xeo is typically served with fresh lettuce, herbs like mint and perilla, and a sweet and sour dipping sauce made from fish sauce, sugar, lime, and chili. The proper way to eat it is to cut off a piece, wrap it in lettuce with herbs, and dip it in the sauce. This combination of crispy, savory, fresh, and tangy flavors creates a delightful eating experience.",
        "In Central Vietnam, banh xeo is often larger and more substantial, making it a complete meal rather than just a snack. The dish is popular at street food stalls and local restaurants, where you can often watch it being made fresh. Many places allow you to cook your own banh xeo at the table, adding to the interactive dining experience.",
      ],
      images: [
        {
          src: "/img/bo-tui-11-quan-banh-xeo-ngon-nhat-phu-quoc.jpg",
          alt: "Banh xeo",
          caption: "Crispy banh xeo with shrimp and pork",
        },
        {
          src: "/img/Banh-Xeo-Mien-Tay-Mekong-Delta-Pancakes-Vietnamnomad.jpg",
          alt: "Making banh xeo",
          caption: "Cooking banh xeo in a pan",
        },
      ],
      highlights: [
        "Crispy, savory pancake",
        "Filled with shrimp, pork, and bean sprouts",
        "Served with fresh herbs and dipping sauce",
        "Central Vietnamese version is larger and more filling",
      ],
      tips: [
        "Eat while hot for maximum crispiness",
        "Wrap in lettuce with herbs before dipping",
        "Try it at street food stalls for authenticity",
        "Watch it being made for the full experience",
        "Popular in Da Nang and Hoi An",
      ],
      location: "Found throughout Central Vietnam, especially in Da Nang and Hoi An",
    },
    {
      title: "Mi Quang",
      description: "Turmeric-tinted noodles from Quang Nam, topped with meat, herbs, and a small amount of broth.",
      image: "/img/maxresdefault.jpg",
      content: [
        "Mi Quang is a signature dish of Quang Nam Province, particularly associated with Hoi An and Da Nang. This distinctive noodle dish features wide, flat rice noodles that are tinted yellow with turmeric, giving them their characteristic color and subtle flavor. Unlike other Vietnamese noodle soups, mi Quang uses very little broth - just enough to moisten the noodles.",
        "The dish is topped with various proteins including pork, chicken, shrimp, or quail eggs, along with fresh herbs, lettuce, and sometimes peanuts and sesame rice crackers. The small amount of rich, flavorful broth is made from pork or chicken bones and is seasoned with turmeric, giving it a golden color that matches the noodles.",
        "What makes mi Quang special is its unique presentation and the way all the ingredients come together. The noodles are typically served in a shallow bowl, with the toppings arranged beautifully on top. Diners mix everything together, creating a harmonious blend of textures and flavors - the chewy noodles, tender meat, fresh herbs, and crunchy crackers.",
        "Mi Quang is typically eaten for breakfast or lunch and is a beloved comfort food in Central Vietnam. The dish reflects the region's culinary creativity and is often considered a symbol of Central Vietnamese cuisine. Each restaurant or home may have its own variation, but the essential elements remain the same: turmeric noodles, minimal broth, and fresh toppings.",
      ],
      images: [
        {
          src: "/img/mi-quang-da-nang.jpg",
          alt: "Mi Quang",
          caption: "Mi Quang with turmeric-tinted noodles",
        },
        {
          src: "/img/mi-quang-recipe-03_1689845763.jpg",
          alt: "Mi Quang preparation",
          caption: "Preparing mi Quang with fresh toppings",
        },
      ],
      highlights: [
        "Signature dish of Quang Nam Province",
        "Turmeric-tinted wide rice noodles",
        "Minimal broth - more of a noodle dish than soup",
        "Beautiful presentation with fresh toppings",
      ],
      tips: [
        "Best enjoyed in Quang Nam, Hoi An, or Da Nang",
        "Mix all ingredients together before eating",
        "Try different protein options (pork, chicken, shrimp)",
        "Popular for breakfast or lunch",
        "Popular spots: Mi Quang Ba Mua, Mi Quang Ba Le",
      ],
      location: "Quang Nam Province, especially Hoi An and Da Nang",
    }
  ],
  culture: [
    {
      title: "Hue Imperial Citadel",
      description: "UNESCO World Heritage Site, the former imperial capital with palaces, temples, and royal tombs.",
      image: "/img/Co-do-hue.jpg",
      content: [
        "The Hue Imperial Citadel is a vast complex that served as the political, cultural, and religious center of Vietnam during the Nguyen Dynasty (1802-1945). Recognized as a UNESCO World Heritage Site in 1993, the citadel represents one of Vietnam's most important historical and architectural achievements.",
        "The complex is surrounded by a moat and massive walls, covering an area of 520 hectares. It consists of three main sections: the Imperial City (Hoang Thanh), the Forbidden Purple City (Tu Cam Thanh), and the outer citadel. The architecture reflects traditional Vietnamese design principles combined with Chinese and French influences.",
        "The Forbidden Purple City was the most exclusive area, reserved only for the emperor, his family, and concubines. Much of the complex was destroyed during the Vietnam War, particularly during the Tet Offensive in 1968, but extensive restoration efforts have brought many structures back to life, including the Thai Hoa Palace, the Mieu Temple, and various gates and pavilions.",
        "Visitors can explore the restored buildings, learn about the Nguyen Dynasty's history, and see artifacts from the imperial era. The citadel also hosts cultural performances and festivals, particularly during the biennial Hue Festival. The complex is a testament to Vietnam's royal heritage and the sophistication of Vietnamese imperial architecture.",
      ],
      images: [
        {
          src: "/img/Co-do-hue.jpg",
          alt: "Hue Imperial Citadel",
          caption: "The Imperial Citadel of Hue",
        },
        {
          src: "/img/Codohue.jpg",
          alt: "Forbidden Purple City",
          caption: "Restored buildings in the Imperial Citadel",
        },
      ],
      highlights: [
        "UNESCO World Heritage Site since 1993",
        "Former imperial capital of Vietnam (1802-1945)",
        "Forbidden Purple City - exclusive royal residence",
        "Extensive restoration after Vietnam War damage",
      ],
      tips: [
        "Allow at least 3-4 hours to explore the complex",
        "Visit early morning or late afternoon to avoid heat",
        "Hire a guide to understand the history and significance",
        "Combine with visits to royal tombs along the Perfume River",
        "Visit during Hue Festival for cultural performances",
      ],
      location: "Hue City, Thua Thien Hue Province",
    },
    {
      title: "Hoi An Ancient Town",
      description: "Well-preserved trading port from the 15th-19th centuries with Chinese, Japanese, and Vietnamese architecture.",
      image: "/img/Hoi-an.jpg",
      content: [
        "Hoi An Ancient Town is one of Vietnam's most enchanting destinations, a beautifully preserved trading port that flourished from the 15th to the 19th centuries. Recognized as a UNESCO World Heritage Site in 1999, the town showcases a unique blend of architectural styles reflecting its history as a major international trading hub.",
        "The Ancient Town features over 1,000 timber-framed buildings that combine Chinese, Japanese, French, and Vietnamese architectural elements. The narrow streets are lined with historic houses, assembly halls, temples, and shops, many of which have been preserved in their original state. The iconic Japanese Covered Bridge, built in the 16th century, is one of the town's most photographed landmarks.",
        "The town's architecture reflects the various communities that settled here: Chinese merchants built assembly halls and temples, Japanese traders constructed the covered bridge, and French colonials added their own architectural touches. The result is a harmonious blend that creates Hoi An's unique character.",
        "Today, the Ancient Town is a living museum where visitors can explore historic buildings, visit traditional craft workshops, and experience the town's vibrant culture. The monthly Full Moon Lantern Festival, when the town turns off electric lights and glows only with colorful silk lanterns, creates a magical atmosphere that transports visitors back in time.",
      ],
      images: [
        {
          src: "/img/hoi-an-ancient-town-2_1689872701.jpg",
          alt: "Hoi An Ancient Town",
          caption: "Well-preserved architecture in Hoi An",
        },
        {
          src: "/img/hoi-an-lantern-1_1676896179.jpg",
          alt: "Hoi An lanterns",
          caption: "Colorful lanterns lighting up the ancient town",
        },
      ],
      highlights: [
        "UNESCO World Heritage Site since 1999",
        "Over 1,000 preserved historic buildings",
        "Unique blend of Chinese, Japanese, and Vietnamese architecture",
        "Monthly Full Moon Lantern Festival",
      ],
      tips: [
        "Visit during Full Moon Festival for magical experience",
        "Explore on foot - the Ancient Town is pedestrian-friendly",
        "Visit assembly halls and historic houses",
        "Take a boat trip on the Thu Bon River",
        "Try local specialties like cao lau and white rose dumplings",
      ],
      location: "Hoi An, Quang Nam Province",
    },
    {
      title: "My Son Sanctuary",
      description: "Ancient Hindu temple ruins of the Champa Kingdom, dating back to the 4th century.",
      image: "/img/khu-den-thap-my-son-03.jpg",
      content: [
        "My Son Sanctuary is a cluster of abandoned and partially ruined Hindu temples constructed between the 4th and 14th centuries by the kings of Champa, an ancient kingdom that once ruled Central and Southern Vietnam. Recognized as a UNESCO World Heritage Site in 1999, My Son is considered one of the most important archaeological sites in Southeast Asia.",
        "The sanctuary was the religious and political capital of the Champa Kingdom, dedicated to the worship of the Hindu god Shiva. The temples were built using fired bricks and sandstone, with intricate carvings and architectural details that reflect the influence of Indian Hindu architecture. The complex originally contained over 70 temples, though many were destroyed during the Vietnam War.",
        "The remaining structures showcase the evolution of Cham architecture over a millennium, with different building styles representing different periods. The temples are arranged in groups, with the main temple (kalan) surrounded by smaller structures. The site is set in a beautiful valley surrounded by mountains, creating a mystical atmosphere.",
        "Despite the damage from war and time, My Son remains a powerful testament to the Champa civilization's artistic and architectural achievements. The site is particularly impressive for its brick construction techniques, which remain a mystery - the bricks were fitted together so precisely that no mortar was needed. Visitors can explore the ruins, learn about Cham culture, and see ongoing restoration work.",
      ],
      images: [
        {
          src: "/img/VC-My-Son-Finished-57-new.jpg",
          alt: "My Son Sanctuary",
          caption: "Ancient Cham temple ruins at My Son",
        },
        {
          src: "/img/Po_Nagar_Towers_0.jpg",
          alt: "Cham architecture",
          caption: "Intricate carvings on Cham temples",
        },
      ],
      highlights: [
        "UNESCO World Heritage Site since 1999",
        "Ancient Champa Kingdom temples (4th-14th centuries)",
        "Mysterious brick construction without mortar",
        "Important archaeological site in Southeast Asia",
      ],
      tips: [
        "Best time to visit: Early morning to avoid heat and crowds",
        "Allow 2-3 hours to explore the site",
        "Wear comfortable shoes for walking",
        "Hire a guide to understand the history and significance",
        "Combine with visit to Hoi An (about 40 km away)",
      ],
      location: "Duy Phu Commune, Duy Xuyen District, Quang Nam Province",
    },
    {
      title: "Royal Court Music",
      description: "Nha Nhac, Vietnamese court music, recognized as UNESCO Intangible Cultural Heritage.",
      image: "/img/tu-hao-nha-nhac-cung-dinh-hue-mot-trong-nhung-di-san-van-hoa-phi-vat-the-cua-nhan-loai-7-163825749320231127153647.jpg",
      content: [
        "Nha Nhac, meaning 'elegant music' or 'ceremonial music,' is a form of Vietnamese court music that was performed at the imperial court of Hue during the Nguyen Dynasty (1802-1945). Recognized as a Masterpiece of the Oral and Intangible Heritage of Humanity by UNESCO in 2003, Nha Nhac represents one of Vietnam's most refined cultural traditions.",
        "The music was an essential part of royal ceremonies, including coronations, funerals, religious festivals, and official receptions. It was considered a symbol of the dynasty's power and longevity, and only the most skilled musicians were allowed to perform it. The music combines various elements including singing, instrumental music, and sometimes dance.",
        "Nha Nhac features a unique ensemble of traditional Vietnamese instruments, including the dan bau (monochord), dan tranh (zither), dan nhi (two-stringed fiddle), flutes, drums, and gongs. The music has a formal, ceremonial character, with specific compositions for different types of ceremonies. The lyrics, when present, often praise the emperor and express wishes for peace and prosperity.",
        "After the fall of the Nguyen Dynasty in 1945, Nha Nhac was in danger of being lost forever. However, efforts to preserve and revive this tradition have been successful, and today visitors to Hue can experience Nha Nhac performances at the Royal Theatre (Duyet Thi Duong) within the Imperial Citadel, as well as at cultural shows and during the biennial Hue Festival.",
      ],
      images: [
        {
          src: "/img/nha-nhac-cung-dinh-hue-1_1690182371-edit.jpg",
          alt: "Royal Court Music",
          caption: "Nha Nhac performance at Hue Imperial Citadel",
        },
        {
          src: "/img/vna_potal_ky_niem_30_nam_1993_-_2023_quan_the_di_tich_co_do_hue_va_20_nam_2003_-_2023_nha_nhac_-_am_nhac_cung_dinh_viet_nam_duoc_unesco_vinh_danh_la_d_6783861.jpg",
          alt: "Traditional instruments",
          caption: "Traditional Vietnamese instruments used in Nha Nhac",
        },
      ],
      highlights: [
        "UNESCO Intangible Cultural Heritage since 2003",
        "Imperial court music of the Nguyen Dynasty",
        "Performed at royal ceremonies and official events",
        "Preserved and revived after near-extinction",
      ],
      tips: [
        "Watch performances at the Royal Theatre in Hue Citadel",
        "Attend during Hue Festival for special shows",
        "Learn about the instruments and their significance",
        "Combine with visit to Imperial Citadel",
        "Check performance schedules in advance",
      ],
      location: "Hue Imperial Citadel, Hue City, Thua Thien Hue Province",
    }
  ],
  nature: [
    {
      title: "Phong Nha-Ke Bang National Park",
      description: "UNESCO World Heritage Site with spectacular karst formations and the world's largest caves.",
      image: "/img/142734-phong_nha__ke_bang_national_park_2.jpg",
      content: [
        "Phong Nha-Ke Bang National Park is a UNESCO World Heritage Site recognized for its outstanding geological and biological values. The park covers over 85,000 hectares of pristine primary forest and contains one of the world's most spectacular karst landscapes, with hundreds of caves and grottoes including the world's largest cave, Son Doong.",
        "The park's karst formation is one of the oldest and largest in Asia, estimated to be over 400 million years old. The limestone mountains have been shaped by millions of years of erosion, creating a dramatic landscape of peaks, valleys, and underground river systems. The park is also a biodiversity hotspot, home to numerous endemic species of plants and animals.",
        "The park contains over 300 caves and grottoes, with new ones still being discovered. The most famous include Son Doong (the world's largest), Paradise Cave (Thien Duong), Phong Nha Cave (explored by boat), and Dark Cave (with adventure activities). The underground river systems are extensive, with some caves containing rivers that flow for kilometers.",
        "Beyond caving, the park offers opportunities for trekking, wildlife spotting, and exploring pristine forests. The area was heavily bombed during the Vietnam War but has recovered remarkably, with the forest now home to rare species like the saola, giant muntjac, and various primates. The park is managed with a focus on conservation and sustainable tourism.",
      ],
      images: [
        {
          src: "/img/Phong-nha-ke-bang-national-park.jpg",
          alt: "Phong Nha-Ke Bang National Park",
          caption: "Spectacular karst landscape of Phong Nha-Ke Bang",
        },
        {
          src: "/img/phongnha3_fixt_crps.jpg",
          alt: "Cave exploration",
          caption: "Exploring caves in the national park",
        },
      ],
      highlights: [
        "UNESCO World Heritage Site",
        "Over 300 caves and grottoes",
        "Home to Son Doong - world's largest cave",
        "Biodiversity hotspot with endemic species",
      ],
      tips: [
        "Best time to visit: February to August (dry season)",
        "Book cave tours in advance, especially for Son Doong",
        "Bring appropriate gear for cave exploration",
        "Hire local guides for safety and better experience",
        "Respect the park's conservation rules",
      ],
      location: "Quang Binh Province, approximately 500 km north of Ho Chi Minh City",
    },
    {
      title: "Son Doong Cave",
      description: "World's largest cave, discovered in 2009, with its own ecosystem, jungle, and river.",
      image: "/img/Son-doong.jpg",
      content: [
        "Son Doong Cave, discovered in 2009 by a local farmer and fully explored in 2010, is the world's largest cave by volume. This massive underground chamber is so enormous that it has its own ecosystem, including a jungle (called the Garden of Edam), a river, and even clouds that form inside. The cave is large enough to fit a 40-story skyscraper or an entire city block.",
        "The cave stretches for over 5 kilometers, with some passages reaching 200 meters high and 150 meters wide. Inside, visitors can see enormous stalagmites up to 80 meters tall, ancient fossils, and unique cave pearls. The cave has two large dolines (sinkholes) where the ceiling has collapsed, allowing sunlight to enter and creating the conditions for the internal jungle to grow.",
        "Access to Son Doong is strictly limited and requires a challenging 4-day, 3-night expedition that includes trekking through jungle, crossing rivers, and camping inside the cave. Only a few hundred permits are issued each year, and the tours are operated by a single company, making it one of the world's most exclusive adventure experiences.",
        "The expedition is physically demanding, requiring good fitness and no fear of heights or confined spaces. However, for those who complete it, the experience is truly once-in-a-lifetime, offering the chance to explore a natural wonder that remained hidden for millions of years. The cave's discovery has put Vietnam on the map as a world-class caving destination.",
      ],
      images: [
        {
          src: "/img/Son-doong.jpg",
          alt: "Son Doong Cave",
          caption: "The massive interior of Son Doong Cave",
        },
        {
          src: "/img/Son-doong.jpg",
          alt: "Garden of Edam",
          caption: "The internal jungle inside Son Doong",
        },
      ],
      highlights: [
        "World's largest cave by volume",
        "Discovered in 2009, fully explored in 2010",
        "Has its own ecosystem including jungle and river",
        "Extremely limited access - only a few hundred permits per year",
      ],
      tips: [
        "Book well in advance - permits are very limited",
        "Requires excellent physical fitness",
        "4-day expedition with camping inside the cave",
        "Expensive but truly once-in-a-lifetime experience",
        "Operated by Oxalis Adventure Tours only",
      ],
      location: "Phong Nha-Ke Bang National Park, Quang Binh Province",
    },
    {
      title: "Da Lat Flower Gardens",
      description: "Cool mountain climate perfect for growing flowers, vegetables, and coffee plantations.",
      image: "/img/Da-lat-fl.jpg",
      content: [
        "Da Lat's cool mountain climate, with temperatures averaging 15-24°C year-round, creates perfect conditions for growing flowers, making it Vietnam's flower capital. The city and surrounding area are dotted with flower farms, greenhouses, and gardens that produce millions of flowers annually, supplying markets throughout Vietnam and for export.",
        "The Da Lat Flower Park is the city's main attraction, showcasing thousands of varieties of flowers including roses, orchids, hydrangeas, chrysanthemums, and many others. The park is beautifully landscaped with themed gardens, fountains, and walking paths. Seasonal flower festivals, particularly during Tet (Lunar New Year), transform the city into a colorful floral paradise.",
        "Beyond the flower park, visitors can explore flower farms in the surrounding countryside, where they can see flowers being grown and learn about the cultivation process. The area is also famous for its vegetable farms, strawberry fields, and coffee plantations, all taking advantage of the cool, temperate climate.",
        "Da Lat's flower industry is a major part of the local economy and culture. The city hosts an annual flower festival that attracts visitors from around the world. The flowers grown here are known for their quality and variety, with many species that cannot be grown in Vietnam's tropical lowlands. The sight of endless fields of flowers against the backdrop of mountains and pine forests is one of Da Lat's most beautiful attractions.",
      ],
      images: [
        {
          src: "/img/Da-lat-fl.jpg",
          alt: "Da Lat Flower Gardens",
          caption: "Beautiful flower gardens in Da Lat",
        },
        {
          src: "/img/Da-lat-fl.jpg",
          alt: "Flower farms",
          caption: "Colorful flower farms surrounding Da Lat",
        },
      ],
      highlights: [
        "Vietnam's flower capital",
        "Cool climate perfect for flower cultivation",
        "Thousands of flower varieties",
        "Annual flower festival",
      ],
      tips: [
        "Best time to visit: December to March for flower season",
        "Visit during Tet for spectacular flower displays",
        "Explore flower farms in the countryside",
        "Combine with visits to coffee plantations and strawberry fields",
        "Bring a camera - the gardens are very photogenic",
      ],
      location: "Da Lat, Lam Dong Province, Central Highlands",
    },
    {
      title: "Marble Mountains",
      description: "Five limestone hills in Da Nang with caves, pagodas, and panoramic views of the coast.",
      image: "/img/Marble-Mountains-Da-Nang.png",
      content: [
        "The Marble Mountains (Ngu Hanh Son) are a cluster of five limestone and marble hills located just south of Da Nang, each named after one of the five elements: Kim (Metal), Thuy (Water), Moc (Wood), Hoa (Fire), and Tho (Earth). The mountains are a significant spiritual site, housing numerous Buddhist pagodas, Hindu shrines, and caves that have been used as places of worship for centuries.",
        "Thuy Son (Water Mountain) is the largest and most visited, accessible by stairs or elevator. It contains several caves with Buddhist altars and statues, including Hoa Nghiem Cave, Huyen Khong Cave, and Linh Nham Cave. The caves are beautifully lit and create a mystical atmosphere. The mountain also features pagodas and viewpoints offering panoramic views of Da Nang, the coastline, and the surrounding countryside.",
        "The mountains have a rich history, having been used as a hideout by Vietnamese revolutionaries and as a strategic position during various wars. Today, they are a popular tourist destination where visitors can explore caves, visit pagodas, climb to viewpoints, and see local artisans carving marble statues. The area around the mountains is known for its marble carving workshops.",
        "The Marble Mountains offer a combination of natural beauty, spiritual significance, and cultural interest. The climb to the top of Thuy Son provides excellent views, especially at sunrise or sunset. The caves and pagodas showcase beautiful Buddhist art and architecture, while the marble carving tradition adds a cultural dimension to the visit.",
      ],
      images: [
        {
          src: "/img/Marble-Mountains-Da-Nang.png",
          alt: "Marble Mountains",
          caption: "The five Marble Mountains in Da Nang",
        },
        {
          src: "/img/Marble-Mountains-Da-Nang.png",
          alt: "Caves and pagodas",
          caption: "Buddhist caves and pagodas in the mountains",
        },
      ],
      highlights: [
        "Five limestone hills representing five elements",
        "Numerous Buddhist caves and pagodas",
        "Panoramic views of Da Nang and coastline",
        "Marble carving workshops and tradition",
      ],
      tips: [
        "Best time to visit: Early morning or late afternoon to avoid heat",
        "Wear comfortable shoes for climbing",
        "Take the elevator up and walk down to save energy",
        "Explore the caves - they're beautifully lit",
        "Visit marble carving workshops at the base",
      ],
      location: "Hoa Hai Ward, Ngu Hanh Son District, Da Nang",
    }
  ],
  beaches: [
    {
      title: "My Khe Beach",
      description: "Da Nang's beautiful beach, voted one of the world's most attractive beaches by Forbes.",
      image: "/img/My-Khe-Beach-Da-Nang-guide-Vietnamnomad-1024x682.jpg",
      content: [
        "My Khe Beach, stretching for 9 kilometers along Da Nang's coastline, was voted one of the world's most attractive beaches by Forbes magazine. The beach features soft white sand, clear blue water, and gentle waves, making it perfect for swimming, sunbathing, and water sports. The beach is well-maintained and easily accessible from the city center.",
        "The beach is divided into several sections, with the area near the city center being the most developed with hotels, restaurants, and beachfront cafes. Further south, the beach becomes quieter and more natural. The water is generally calm and safe for swimming, though there are lifeguards on duty during peak season.",
        "My Khe Beach offers excellent conditions for water sports including surfing, paddleboarding, and jet skiing. The beach is also popular for morning exercise, with locals and visitors jogging, doing tai chi, or practicing yoga on the sand. Sunset is particularly beautiful here, with the sun setting over the sea creating stunning colors.",
        "The beachfront area has developed into a vibrant tourist zone with numerous hotels, restaurants serving fresh seafood, and bars. Despite the development, the beach maintains its natural beauty and is kept clean and well-maintained. My Khe Beach is a major reason why Da Nang has become one of Vietnam's most popular beach destinations.",
      ],
      images: [
        {
          src: "/img/My-Khe-Beach-Da-Nang-guide-Vietnamnomad-1024x682.jpg",
          alt: "My Khe Beach",
          caption: "My Khe Beach - one of the world's most attractive beaches",
        },
        {
          src: "/img/My-Khe-Beach-Da-Nang-guide-Vietnamnomad-1024x682.jpg",
          alt: "Beach activities",
          caption: "Water sports and activities at My Khe Beach",
        },
      ],
      highlights: [
        "Voted one of the world's most attractive beaches by Forbes",
        "9 km stretch of white sand beach",
        "Excellent for swimming and water sports",
        "Well-developed with hotels and restaurants",
      ],
      tips: [
        "Best time to visit: February to May for dry weather",
        "Swim in designated areas with lifeguards",
        "Try water sports like surfing and paddleboarding",
        "Enjoy sunset views from beachfront cafes",
        "Visit early morning for peaceful atmosphere",
      ],
      location: "Da Nang City, Central Vietnam coast",
    },
    {
      title: "Nha Trang Beach",
      description: "Long stretch of white sand with clear turquoise waters, perfect for swimming and water sports.",
      image: "/img/nha-trang-bay-banner.jpg",
      content: [
        "Nha Trang Beach is a 6-kilometer stretch of beautiful white sand along the city's waterfront, making it one of Vietnam's most popular beach destinations. The beach features clear turquoise waters, gentle waves, and a vibrant atmosphere with numerous hotels, restaurants, and beachfront bars lining the promenade.",
        "The beach is well-maintained and offers excellent conditions for swimming, sunbathing, and various water sports. The water is generally calm and safe, with lifeguards on duty during peak season. The beachfront promenade (Tran Phu Street) is perfect for walking, jogging, or cycling while enjoying the sea views.",
        "Nha Trang Beach is particularly famous for water activities including scuba diving, snorkeling, parasailing, and jet skiing. The city is a major diving destination, with numerous dive shops offering trips to nearby islands with coral reefs. Island-hopping tours are also popular, taking visitors to nearby islands like Hon Mun, Hon Tam, and Hon Tre.",
        "The beach area has a vibrant atmosphere, especially in the evening when the promenade comes alive with locals and tourists. The beachfront is lined with seafood restaurants, cafes, and bars, making it easy to enjoy fresh seafood while watching the sunset. Despite being a major tourist destination, the beach maintains its natural beauty and is kept clean.",
      ],
      images: [
        {
          src: "/img/nha-trang-bay-banner.jpg",
          alt: "Nha Trang Beach",
          caption: "Nha Trang's beautiful beach and coastline",
        },
        {
          src: "/img/nha-trang-bay-banner.jpg",
          alt: "Beach activities",
          caption: "Water sports and activities at Nha Trang Beach",
        },
      ],
      highlights: [
        "6 km stretch of white sand beach",
        "Excellent for scuba diving and snorkeling",
        "Vibrant beachfront with restaurants and bars",
        "Island-hopping tours to nearby islands",
      ],
      tips: [
        "Best time to visit: January to August for dry season",
        "Book diving trips in advance during peak season",
        "Try island-hopping tours to nearby islands",
        "Enjoy fresh seafood at beachfront restaurants",
        "Visit early morning for peaceful atmosphere",
      ],
      location: "Nha Trang City, Khanh Hoa Province",
    },
    {
      title: "An Bang Beach",
      description: "Hoi An's peaceful beach with palm trees, beach bars, and stunning sunsets.",
      image: "/img/an-bang-beach.jpg",
      content: [
        "An Bang Beach is Hoi An's most popular beach, located just 5 kilometers from the Ancient Town. Unlike the more developed beaches of Da Nang and Nha Trang, An Bang maintains a laid-back, bohemian atmosphere with palm trees, beach bars, and a relaxed vibe that attracts both locals and travelers seeking a more authentic beach experience.",
        "The beach features soft sand and clear water, though the waves can be stronger here than at other Central Vietnamese beaches, making it popular for surfing. The beach is lined with palm trees that provide natural shade, and numerous beach bars and restaurants offer comfortable lounging areas, fresh seafood, and cold drinks.",
        "An Bang has developed a reputation as a foodie destination, with excellent beachfront restaurants serving both Vietnamese and international cuisine. The beach bars are particularly popular at sunset, when visitors gather to watch the sun set over the sea while enjoying cocktails and fresh seafood.",
        "The beach area has grown organically, with a mix of simple beach shacks and more upscale establishments. Despite the development, An Bang maintains its relaxed, unpretentious atmosphere. The beach is perfect for those who want to combine a visit to Hoi An's cultural attractions with some beach time, offering a perfect balance of culture and relaxation.",
      ],
      images: [
        {
          src: "/img/an-bang-beach.jpg",
          alt: "An Bang Beach",
          caption: "Peaceful An Bang Beach near Hoi An",
        },
        {
          src: "/img/an-bang-beach.jpg",
          alt: "Beach bars",
          caption: "Beach bars and restaurants at An Bang",
        },
      ],
      highlights: [
        "Laid-back, bohemian atmosphere",
        "Excellent beachfront restaurants and bars",
        "Popular for surfing",
        "Perfect sunset viewing spot",
      ],
      tips: [
        "Best time to visit: February to April for pleasant weather",
        "Rent a bicycle or motorbike from Hoi An (5 km away)",
        "Stay for sunset at beach bars",
        "Try fresh seafood at beachfront restaurants",
        "Combine with visit to Hoi An Ancient Town",
      ],
      location: "An Bang, Cam An Ward, Hoi An, Quang Nam Province",
    },
    {
      title: "Lang Co Beach",
      description: "Pristine beach between Hue and Da Nang, surrounded by mountains and lagoons.",
      image: "/img/651473741.jpg",
      content: [
        "Lang Co Beach is a pristine, crescent-shaped beach located on a narrow strip of land between the East Sea and a large lagoon, approximately halfway between Hue and Da Nang. The beach is surrounded by mountains on one side and the lagoon on the other, creating a stunning natural setting that feels remote and unspoiled.",
        "The beach features soft white sand and clear, calm water that's perfect for swimming. The area is less developed than other Central Vietnamese beaches, offering a more peaceful and natural experience. The beach is backed by the Truong Son mountain range, creating a dramatic backdrop, while the lagoon side offers opportunities for fishing and boat trips.",
        "Lang Co has been developing as a resort destination, with several upscale resorts taking advantage of the beautiful setting. However, the area still maintains much of its natural charm, with fishing villages, local seafood restaurants, and a relaxed atmosphere. The beach is particularly beautiful at sunrise and sunset, when the light creates stunning colors over the mountains and sea.",
        "The area is also known for its fresh seafood, particularly crabs and fish caught from the lagoon. Visitors can enjoy seafood at local restaurants or take boat trips on the lagoon to see local fishing activities. Lang Co offers a perfect stop for those traveling between Hue and Da Nang, or as a destination in its own right for those seeking a more peaceful beach experience.",
      ],
      images: [
        {
          src: "/img/651473741.jpg",
          alt: "Lang Co Beach",
          caption: "Pristine Lang Co Beach with mountain backdrop",
        },
        {
          src: "/img/651473741.jpg",
          alt: "Lagoon view",
          caption: "Lang Co lagoon and surrounding mountains",
        },
      ],
      highlights: [
        "Pristine, unspoiled beach setting",
        "Surrounded by mountains and lagoon",
        "Less developed than other beaches",
        "Excellent fresh seafood",
      ],
      tips: [
        "Best time to visit: February to May for pleasant weather",
        "Perfect stop between Hue and Da Nang",
        "Try fresh seafood at local restaurants",
        "Take a boat trip on the lagoon",
        "Enjoy sunrise or sunset views",
      ],
      location: "Lang Co Town, Phu Loc District, Thua Thien Hue Province",
    }
  ]
};

export default function CentralVietnam() {
  // Load from localStorage only
  const storedData = useMemo(() => {
    try {
      const stored = getRegionData("Central Vietnam");
      // Use stored data and merge with overview/hero data from hardcoded
      return {
        ...centralVietnamData,
        destinations: stored.destinations,
        food: stored.food,
        culture: stored.culture,
        nature: stored.nature,
        beaches: stored.beaches,
      };
    } catch (error) {
      console.error("Error loading Central Vietnam data:", error);
      // Fallback to hardcoded only if localStorage fails
      return centralVietnamData;
    }
  }, []);

  return <RegionPage regionData={storedData} />;
}

