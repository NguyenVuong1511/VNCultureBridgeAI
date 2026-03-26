import { useMemo } from "react";
import RegionPage from "../components/regions/RegionPage";
import { getRegionData } from "../utils/regions";

export const northernVietnamData = {
  title: "Northern Vietnam",
  heroImage: "/img/northern-vietnam-hero.jpg",
  heroCredit: "Sapa. Photo by Nguyen Minh Vuong",
  overview: {
    highlight:
      "Northern Vietnam is known for its dramatic mountain landscapes, rich cultural heritage, and bustling capital city. The region offers a perfect blend of natural wonders and historical treasures.",
    description1:
      "From the misty peaks of Sapa to the emerald waters of Ha Long Bay, Northern Vietnam captivates visitors with its stunning natural beauty. The region is home to diverse ethnic minority groups, each with their own unique traditions, colorful festivals, and traditional crafts.",
    description2:
      "Hanoi, the capital city, serves as the cultural and political heart of Vietnam, where ancient temples stand alongside French colonial architecture. The region's cuisine is renowned for its bold flavors, with specialties like pho, bun cha, and egg coffee that have gained international recognition.",
    images: [
      {
        src: "/img/Ha-long-bay.jpeg",
        alt: "Ha Long Bay",
        caption: "Ha Long Bay - UNESCO World Heritage Site",
      },
      {
        src: "/img/Sapa-Terraced-rice-fields.jpg",
        alt: "Sapa Terraced Fields",
        caption: "Sapa's stunning terraced rice fields",
      },
    ],
    highlights: [
      {
        icon: '<i class="fa-solid fa-mountain"></i>',
        title: "Mountain Landscapes",
        description:
          "Dramatic peaks, terraced fields, and breathtaking vistas in Sapa, Ha Giang, and Mai Chau.",
      },
      {
        icon: '<i class="fa-solid fa-house"></i>',
        title: "Cultural Heritage",
        description:
          "Ancient temples, French colonial architecture, and UNESCO World Heritage Sites.",
      },
      {
        icon: '<i class="fa-solid fa-mortar-pestle"></i>',
        title: "Culinary Excellence",
        description:
          "World-famous dishes like pho, bun cha, and unique street food culture in Hanoi.",
      },
      {
        icon: '<i class="fa-solid fa-people-group"></i>',
        title: "Ethnic Diversity",
        description:
          "Home to 54 ethnic groups with vibrant markets, traditional crafts, and festivals.",
      },
    ],
  },
  destinations: [
    {
      name: "HA NOI",
      description:
        "Vietnam's capital city, a blend of ancient temples, French colonial architecture, and vibrant street food culture.",
      image: "/img/Ha-noi.jpg",
      content: [
        "Hanoi, the capital of Vietnam, is a city where ancient traditions meet modern life. With over 1,000 years of history, Hanoi offers visitors a unique blend of Vietnamese, Chinese, and French influences.",
        "The Old Quarter, with its 36 ancient streets, is a maze of narrow alleys filled with shops, cafes, and street food vendors. Each street was historically dedicated to a specific trade, and many still maintain their traditional character.",
        "Key attractions include the Temple of Literature (Vietnam's first university), Hoan Kiem Lake with its iconic red bridge, the Ho Chi Minh Mausoleum, and the One Pillar Pagoda. The city's French Quarter features wide boulevards and colonial architecture.",
        "Hanoi's street food scene is legendary, with dishes like pho, bun cha, and egg coffee drawing food lovers from around the world. The city comes alive at night with bustling night markets and vibrant street life.",
      ],
      images: [
        {
          src: "/img/Pho-co-ha-noi.jpg",
          alt: "Hanoi Old Quarter",
          caption: "The historic Old Quarter with its narrow streets",
        },
        {
          src: "/img/Hoan-kiem.jpeg",
          alt: "Hoan Kiem Lake",
          caption: "Hoan Kiem Lake at sunset",
        },
      ],
      highlights: [
        "Explore the 36 ancient streets of the Old Quarter",
        "Visit the Temple of Literature, Vietnam's first university",
        "Experience authentic street food culture",
        "See traditional water puppet shows",
      ],
      tips: [
        "Best time to visit: October to April for cooler weather",
        "Try street food early in the morning for the freshest experience",
        "Rent a motorbike or use Grab for easy transportation",
        "Learn basic Vietnamese phrases for better interactions",
      ],
      location:
        "Northern Vietnam, approximately 1,760 km north of Ho Chi Minh City",
    },
    {
      name: "HA GIANG",
      description:
        "Remote mountainous region with breathtaking landscapes, ethnic minority villages, and the famous Ha Giang Loop.",
      image: "/img/Ha-giang-1.jpg",
      content: [
        "Ha Giang is Vietnam's northernmost province, known for its dramatic mountain ranges, winding passes, and ethnic minority cultures.",
        "The Ha Giang Loop is one of Southeast Asia's most spectacular motorbike routes, featuring deep valleys, limestone peaks, and ancient villages.",
        "Dong Van Karst Plateau Geopark is a UNESCO-recognized site with unique rock formations shaped by millions of years of geological evolution.",
        "Highlights include Ma Pi Leng Pass—often called the 'King of Vietnamese passes'—as well as the Hmong King's Palace and colorful weekly ethnic markets.",
      ],
      images: [
        {
          src: "/img/ha-giang-pass.webp",
          alt: "Ma Pi Leng Pass",
          caption: "The legendary Ma Pi Leng Pass",
        },
        {
          src: "/img/dong-van.jpeg",
          alt: "Dong Van Karst Plateau",
          caption: "Dong Van Karst Plateau Geopark",
        },
      ],
      highlights: [
        "Ride the Ha Giang Loop",
        "Visit Dong Van Old Quarter",
        "Explore Ma Pi Leng Pass",
        "Discover ethnic Hmong, Dao, Tay villages",
      ],
      tips: [
        "Best time to visit: September–November and March–May",
        "Check motorbike brakes before riding the loop",
        "Respect ethnic customs and dress codes",
        "Homestays offer the most authentic experience",
      ],
      location: "Northernmost Vietnam, bordering China",
    },
    {
      name: "HA LONG",
      description:
        "UNESCO World Heritage Site featuring thousands of limestone karsts and islets rising from emerald waters.",
      image: "/img/Ha-long.jpg",
      content: [
        "Ha Long is world-famous for its emerald waters and thousands of limestone islands topped with rainforests.",
        "Cruises are the best way to explore caves, floating villages, and hidden lagoons.",
        "Lan Ha Bay and Bai Tu Long Bay offer quieter alternative routes while maintaining the same stunning scenery.",
        "Visitors can kayak, explore Sung Sot Cave, hike Titop Island, or enjoy seafood on board a traditional junk cruise.",
      ],
      images: [
        {
          src: "/img/ha-long-boat.webp",
          alt: "Ha Long Cruise",
          caption: "Overnight cruise on Ha Long Bay",
        },
        {
          src: "/img/ha-long-cave.jpeg",
          alt: "Sung Sot Cave",
          caption: "Inside Sung Sot (Surprise) Cave",
        },
      ],
      highlights: [
        "UNESCO World Heritage Site",
        "Overnight cruise experience",
        "Kayaking through hidden lagoons",
        "Exploring ancient caves",
      ],
      tips: [
        "Avoid peak seasons (June–July) for less crowded cruises",
        "Choose reputable cruise companies",
        "Bring motion sickness tablets if needed",
        "Photography gear recommended for sunrise",
      ],
      location: "Quang Ninh Province, 170 km east of Hanoi",
    },
    {
      name: "MAI CHAU",
      description:
        "Peaceful valley surrounded by mountains, home to Thai ethnic communities and traditional stilt houses.",
      image: "/img/Mai-chau.png",
      content: [
        "Mai Chau is a serene valley known for its lush rice fields and ethnic White Thai communities.",
        "Visitors can stay in traditional stilt house homestays, enjoy local food, and experience traditional dance performances.",
        "Biking around the valley offers close-up views of rice paddies, bamboo houses, and local daily life.",
        "Nearby attractions include Mo Luong Cave and Chieu Cave, known for their impressive stalactites.",
      ],
      images: [
        {
          src: "/img/mai-chau-rice.jpeg",
          alt: "Mai Chau Rice Fields",
          caption: "Peaceful rice fields of Mai Chau",
        },
        {
          src: "/img/mai-chau-dance.jpeg",
          alt: "Thai Dance",
          caption: "Thai ethnic traditional dance",
        },
      ],
      highlights: [
        "Authentic ethnic village experience",
        "Homestays in traditional stilt houses",
        "Cycling around rice fields",
        "Traditional Thai cuisine and performances",
      ],
      tips: [
        "Best time to visit: September–October or February–April",
        "Bring comfortable shoes for biking",
        "Respect local customs when entering homes",
        "Try local sticky rice dishes and grilled meats",
      ],
      location: "Hoa Binh Province, 140 km southwest of Hanoi",
    },
    {
      name: "NINH BINH",
      description:
        "Known as 'Ha Long Bay on land' with stunning karst formations, ancient temples, and peaceful river scenes.",
      image: "/img/Ninh-binh.jpg",
      content: [
        "Ninh Binh features dramatic limestone karsts rising from rice paddies and winding rivers.",
        "Trang An Scenic Landscape Complex is a UNESCO World Heritage Site offering peaceful boat rides through caves and valleys.",
        "Other key attractions include the ancient capital Hoa Lu, Bai Dinh Pagoda, and Mua Cave viewpoint.",
        "Tam Coc is especially beautiful during rice harvest when fields turn bright yellow.",
      ],
      images: [
        {
          src: "/img/tam-coc.jpeg",
          alt: "Tam Coc Boat Ride",
          caption: "Boat ride through Tam Coc",
        },
        {
          src: "/img/mua-cave.webp",
          alt: "Mua Cave Viewpoint",
          caption: "Stunning panoramic view from Mua Cave",
        },
      ],
      highlights: [
        "Trang An boat tours",
        "Mua Cave viewpoint",
        "Ancient capital Hoa Lu",
        "Bai Dinh Pagoda – Vietnam’s largest pagoda complex",
      ],
      tips: [
        "Avoid midday heat when climbing Mua Cave",
        "Best time: May (green rice fields) or June (golden harvest)",
        "Wear breathable clothes for boat rides",
        "Stay in Tam Coc or Trang An for the best views",
      ],
      location: "Ninh Binh Province, 100 km south of Hanoi",
    },
    {
      name: "SAPA",
      description:
        "Mountainous town famous for terraced rice fields, ethnic markets, and trekking opportunities.",
      image: "/img/Sapa.jpg",
      content: [
        "Sapa is known for its terraced rice fields, cool climate, and ethnic Hmong, Dao, Tay communities.",
        "Fansipan, known as the 'Roof of Indochina', can be reached by cable car or multi-day trekking.",
        "Sapa’s weekly markets showcase traditional textiles, handmade crafts, and local foods.",
        "Popular trekking routes connect villages such as Cat Cat, Ta Van, and Lao Chai.",
      ],
      images: [
        {
          src: "/img/sapa-terrace.webp",
          alt: "Sapa Rice Terraces",
          caption: "Sapa’s iconic terraced fields",
        },
        {
          src: "/img/cat-cat-village.jpeg",
          alt: "Cat Cat Village",
          caption: "Hmong village near Sapa town",
        },
      ],
      highlights: [
        "Fansipan Peak",
        "Trekking through ethnic villages",
        "Colorful weekly markets",
        "Cool mountain climate year-round",
      ],
      tips: [
        "Best time: September (golden harvest)",
        "Wear proper trekking shoes",
        "Support local handmade crafts",
        "Weather can be foggy—plan flexible schedules",
      ],
      location: "Lao Cai Province, 320 km northwest of Hanoi",
    },
  ],
  food: [
    {
      title: "Pho - Vietnam's National Dish",
      description:
        "Aromatic beef or chicken noodle soup with fresh herbs, a breakfast staple in Hanoi.",
      image: "/img/Pho.webp",
      content: [
        "Pho is Vietnam's most famous dish and a source of national pride. This aromatic noodle soup consists of a clear broth, flat rice noodles, herbs, and meat (usually beef or chicken).",
        "The secret to great pho lies in the broth, which is simmered for hours with beef bones, charred onions, ginger, and a blend of spices including star anise, cinnamon, and cardamom. The result is a complex, deeply flavorful soup that's both comforting and invigorating.",
        "In Hanoi, pho is traditionally eaten for breakfast, and locals often start their day at a pho stall. The dish is served with a plate of fresh herbs including Thai basil, bean sprouts, lime, and chili peppers, allowing diners to customize their bowl.",
        "There are two main regional variations: pho bac (Northern style) with a clear, simple broth, and pho nam (Southern style) with a sweeter, more complex broth. Hanoi pho is known for its purity and focus on the quality of the broth.",
      ],
      images: [
        {
          src: "/img/Pho-1.jpg",
          alt: "Pho bowl",
          caption: "Traditional pho with fresh herbs",
        },
        {
          src: "/img/Pho-2.jpg",
          alt: "Pho preparation",
          caption: "Preparing pho at a street stall",
        },
      ],
      highlights: [
        "Best enjoyed for breakfast in Hanoi",
        "Two main styles: pho bac (Northern) and pho nam (Southern)",
        "Served with fresh herbs and lime",
        "Considered Vietnam's national dish",
      ],
      tips: [
        "Try pho early in the morning (6-8 AM) for the freshest broth",
        "Add herbs gradually to find your preferred flavor",
        "Popular spots: Pho Thin, Pho Gia Truyen, Pho Bat Dan",
        "Don't be afraid to slurp - it's part of the experience!",
      ],
      location:
        "Found throughout Vietnam, but best in Hanoi and Ho Chi Minh City",
    },
    {
      title: "Bun Cha",
      description:
        "Grilled pork patties served with rice vermicelli, fresh herbs, and a sweet-sour dipping sauce.",
      image: "/img/Bun-cha.jpg",
      content: [
        "Bun cha is one of Hanoi's most beloved dishes, especially popular for lunch. This iconic meal consists of grilled pork patties (cha) and sometimes grilled pork belly, served with a bowl of rice vermicelli noodles (bun) and a sweet-sour dipping sauce called nuoc cham.",
        "The pork is marinated with fish sauce, sugar, garlic, and shallots, then grilled over charcoal until it's slightly charred on the outside but remains tender and juicy inside. The smoky flavor from the charcoal grilling is what makes bun cha truly special.",
        "The dish is served with a plate of fresh herbs including lettuce, perilla leaves, coriander, and mint, along with pickled vegetables. Diners dip the noodles and herbs into the nuoc cham sauce, which is a perfect balance of sweet, sour, salty, and spicy flavors.",
        "Bun cha gained international fame when former U.S. President Barack Obama tried it with celebrity chef Anthony Bourdain in 2016. The restaurant where they dined, Bun Cha Huong Lien, has since become a popular tourist destination.",
      ],
      images: [
        {
          src: "/img/Bun-cha.jpg",
          alt: "Bun cha dish",
          caption: "Traditional bun cha with grilled pork and fresh herbs",
        },
        {
          src: "/img/Bun-cha.jpg",
          alt: "Grilling bun cha",
          caption: "Grilling pork patties over charcoal",
        },
      ],
      highlights: [
        "Best enjoyed for lunch in Hanoi",
        "Famous after Obama's visit in 2016",
        "Charcoal-grilled pork with smoky flavor",
        "Served with fresh herbs and pickled vegetables",
      ],
      tips: [
        "Best time to eat: 11 AM - 2 PM for lunch",
        "Mix the noodles and herbs in the dipping sauce",
        "Popular spots: Bun Cha Huong Lien, Bun Cha Dac Kim",
        "Try it with nem (fried spring rolls) for the full experience",
      ],
      location: "Found throughout Hanoi, especially in the Old Quarter",
    },
    {
      title: "Egg Coffee",
      description:
        "Hanoi's signature drink made with egg yolks, sugar, condensed milk, and robusta coffee.",
      image: "/img/Coffe-trung.webp",
      content: [
        "Egg coffee (ca phe trung) is Hanoi's unique contribution to the world of coffee. This creamy, rich drink was invented in the 1940s by Nguyen Van Giang, a bartender at the Sofitel Legend Metropole Hotel, during a time when fresh milk was scarce in Vietnam.",
        "The drink is made by whipping egg yolks with sugar and condensed milk until it forms a thick, creamy foam. This is then poured over strong Vietnamese robusta coffee, creating a dessert-like beverage that's both sweet and bitter.",
        "The traditional way to enjoy egg coffee is to let it sit for a moment, allowing the flavors to meld, then stir it gently before drinking. The result is a velvety, custard-like texture that perfectly complements the strong coffee underneath.",
        "While egg coffee can now be found throughout Vietnam, the best and most authentic versions are still in Hanoi, particularly in the Old Quarter. Many cafes serve it both hot and cold, with the cold version being especially refreshing in the summer heat.",
      ],
      images: [
        {
          src: "/img/Coffe-trung.webp",
          alt: "Egg coffee",
          caption: "Traditional Hanoi egg coffee",
        },
        {
          src: "/img/Coffe-trung.webp",
          alt: "Egg coffee preparation",
          caption: "Preparing egg coffee at a Hanoi cafe",
        },
      ],
      highlights: [
        "Invented in Hanoi in the 1940s",
        "Unique creamy texture like custard",
        "Available hot or cold",
        "Best enjoyed in Hanoi's Old Quarter",
      ],
      tips: [
        "Let it sit for a moment before stirring",
        "Best cafes: Giang Cafe, Cafe Dinh, Loading T Cafe",
        "Try both hot and cold versions",
        "Perfect for a mid-afternoon break",
      ],
      location: "Hanoi, especially in the Old Quarter",
    },
    {
      title: "Cha Ca La Vong",
      description:
        "Turmeric-marinated fish grilled tableside, a specialty of Hanoi's Old Quarter.",
      image: "/img/Cha-ca-la-vong.jpg",
      content: [
        "Cha ca La Vong is one of Hanoi's most famous dishes, so iconic that an entire street was named after it. This unique dish features turmeric-marinated fish that's grilled tableside on a small charcoal stove, creating an interactive dining experience.",
        "The dish is traditionally made with snakehead fish (ca loc), which is marinated in turmeric, galangal, and other spices, then grilled until golden and fragrant. The fish is served sizzling hot at your table, where you continue cooking it with dill, spring onions, and other herbs.",
        "The fish is eaten with rice vermicelli noodles, roasted peanuts, fresh herbs, and a special shrimp paste sauce (mam tom). The combination of flavors - the aromatic turmeric, fresh dill, and pungent shrimp paste - creates a complex and unforgettable taste.",
        "Cha Ca La Vong Street (formerly Hang Son Street) is home to the original restaurant that has been serving this dish for over 100 years. The dish is so famous that 'cha ca' has become synonymous with this particular preparation method.",
      ],
      images: [
        {
          src: "/img/Cha-ca-la-vong.jpg",
          alt: "Cha ca La Vong",
          caption: "Turmeric-marinated fish grilled tableside",
        },
        {
          src: "/img/Cha-ca-la-vong.jpg",
          alt: "Cha ca street",
          caption: "Cha Ca La Vong Street in Hanoi's Old Quarter",
        },
      ],
      highlights: [
        "Over 100 years of history",
        "Interactive tableside grilling experience",
        "Named after a street in Hanoi",
        "Unique combination of turmeric and dill",
      ],
      tips: [
        "Best enjoyed for dinner",
        "Original restaurant: Cha Ca La Vong on Cha Ca Street",
        "Be prepared for the strong smell of shrimp paste",
        "Mix everything together for the best flavor",
      ],
      location: "Cha Ca La Vong Street, Old Quarter, Hanoi",
    },
    {
      title: "Bun Rieu",
      description:
        "Crab and tomato noodle soup with a tangy, savory broth, topped with fresh herbs and vegetables.",
      image: "/img/Bun-rieu.jpg",
      content: [
        "Bun rieu is a vibrant, tangy noodle soup that's a favorite among Hanoi locals. The soup features a tomato-based broth that gets its distinctive flavor and color from crab paste and fresh tomatoes, creating a rich, slightly sour, and savory taste.",
        "The 'rieu' refers to the crab meatballs or crab paste that's added to the soup, giving it a unique seafood flavor. The broth is typically made with pork bones, tomatoes, tamarind, and various seasonings, resulting in a complex flavor profile that's both tangy and umami-rich.",
        "The soup is served with rice vermicelli noodles and topped with various ingredients including fried tofu, blood pudding, fresh herbs like perilla and coriander, and sometimes shrimp paste. The combination of textures and flavors makes each bowl a delightful experience.",
        "Bun rieu is especially popular for breakfast and lunch in Hanoi. There are several variations including bun rieu cua (with crab), bun rieu oc (with snails), and bun rieu gio (with pork sausage), each offering a slightly different taste experience.",
      ],
      images: [
        {
          src: "/img/Bun-rieu.jpg",
          alt: "Bun rieu soup",
          caption: "Bun rieu with crab and fresh herbs",
        },
        {
          src: "/img/Bun-rieu.jpg",
          alt: "Bun rieu preparation",
          caption: "Preparing bun rieu at a street stall",
        },
      ],
      highlights: [
        "Tangy tomato-based broth",
        "Made with crab paste or crab meatballs",
        "Popular for breakfast and lunch",
        "Rich in umami flavors",
      ],
      tips: [
        "Best enjoyed in the morning or early afternoon",
        "Add fresh herbs and lime to taste",
        "Try different variations (crab, snail, or pork)",
        "Popular spots: Bun Rieu Cua Hang Buom, Bun Rieu Thanh",
      ],
      location: "Found throughout Hanoi, especially in the Old Quarter",
    },
    {
      title: "Banh Cuon",
      description:
        "Steamed rice rolls filled with minced pork and wood ear mushrooms, served with fish sauce.",
      image: "/img/Banh-cuon-thanh-tri.jpeg",
      content: [
        "Banh cuon is a delicate dish of steamed rice rolls that's a breakfast favorite in Northern Vietnam. These thin, silky rice crepes are filled with a mixture of seasoned minced pork and wood ear mushrooms, then rolled and served with a sweet and savory fish sauce dipping sauce.",
        "The skill in making banh cuon lies in creating the perfect thin, translucent rice sheet. The batter is made from rice flour and water, which is then steamed on a cloth-covered pot. The cook uses a special technique to spread the batter thinly and evenly, creating a delicate wrapper.",
        "The filling is made from ground pork, wood ear mushrooms, shallots, and seasonings. Once the rice sheet is cooked, the filling is placed in the center and the sheet is rolled up. The dish is typically served with fried shallots, fresh herbs like coriander, and a bowl of nuoc cham dipping sauce.",
        "Banh cuon Thanh Tri is a famous variation from the Thanh Tri district of Hanoi, known for being especially thin and delicate. The dish is often enjoyed with cha lua (Vietnamese pork sausage) and a side of fresh vegetables.",
      ],
      images: [
        {
          src: "/img/Banh-cuon-thanh-tri.jpeg",
          alt: "Banh cuon",
          caption: "Delicate steamed rice rolls with pork filling",
        },
        {
          src: "/img/Banh-cuon-thanh-tri.jpeg",
          alt: "Making banh cuon",
          caption: "Steaming rice crepes for banh cuon",
        },
      ],
      highlights: [
        "Delicate, silky rice crepes",
        "Filled with pork and wood ear mushrooms",
        "Best enjoyed for breakfast",
        "Thanh Tri style is particularly famous",
      ],
      tips: [
        "Best time to eat: Early morning (6-9 AM)",
        "Eat while hot for the best texture",
        "Dip in the fish sauce for full flavor",
        "Popular spots: Banh Cuon Ba Hoanh, Banh Cuon Gia Truyen",
      ],
      location: "Found throughout Hanoi, especially in the Old Quarter",
    },
    {
      title: "Bun Thang",
      description:
        "Elegant Hanoi noodle soup with chicken, egg, and ham, known for its delicate, clear broth.",
      image: "/img/Bun-thang-dac-biet.webp",
      content: [
        "Bun thang is considered one of Hanoi's most refined and elegant noodle soups. The name 'thang' refers to the ladder-like arrangement of ingredients in the bowl, creating a beautiful, colorful presentation that's almost too pretty to eat.",
        "The dish features a clear, delicate broth made from chicken bones, dried shrimp, and various aromatics. The broth is light yet flavorful, reflecting the sophisticated taste of Hanoi cuisine. Unlike the bold flavors of pho, bun thang is subtle and refined.",
        "The bowl is artfully arranged with thin rice vermicelli noodles, shredded chicken, thin strips of egg crepe, Vietnamese ham (cha lua), and sometimes shrimp paste. The dish is garnished with fresh herbs, fried shallots, and a squeeze of lime, creating a harmonious balance of flavors and textures.",
        "Bun thang is traditionally eaten for breakfast and is particularly popular during Tet (Lunar New Year) when families prepare elaborate meals. The dish represents the elegance and refinement of Hanoi's culinary culture, where presentation and subtle flavors are as important as taste.",
      ],
      images: [
        {
          src: "/img/Bun-thang-dac-biet.webp",
          alt: "Bun thang",
          caption: "Elegant bun thang with arranged ingredients",
        },
        {
          src: "/img/Bun-thang-dac-biet.webp",
          alt: "Bun thang preparation",
          caption: "Preparing the delicate broth for bun thang",
        },
      ],
      highlights: [
        "Most refined noodle soup in Hanoi",
        "Clear, delicate broth",
        "Beautiful presentation",
        "Popular during Tet holiday",
      ],
      tips: [
        "Best enjoyed for breakfast",
        "Appreciate the delicate flavors",
        "Popular spots: Bun Thang Ba Duc, Bun Thang Hang Hom",
        "Try it during Tet for the most authentic experience",
      ],
      location: "Found in Hanoi, especially in the Old Quarter",
    },
    {
      title: "Banh Goi",
      description:
        "Fried dumplings filled with pork, mushrooms, and glass noodles, crispy on the outside.",
      image: "/img/Banh-goi.jpg",
      content: [
        "Banh goi, also known as 'pillow cakes' due to their shape, are crispy fried dumplings that are a popular street food snack in Hanoi. These golden-brown pastries are filled with a savory mixture of ground pork, wood ear mushrooms, glass noodles, and seasonings.",
        "The dough is made from wheat flour and water, rolled thin, then filled and folded into a half-moon or pillow shape. The dumplings are deep-fried until golden and crispy on the outside, while the filling remains moist and flavorful inside.",
        "Banh goi is typically served with fresh lettuce, herbs like mint and coriander, and a sweet and sour dipping sauce made from fish sauce, sugar, lime, and chili. The combination of the crispy pastry, savory filling, fresh herbs, and tangy sauce creates a perfect balance of textures and flavors.",
        "These dumplings are perfect as a snack or light meal, especially popular in the afternoon or evening. Street vendors often serve them fresh from the wok, ensuring they're hot and crispy. The dish is a favorite among locals and visitors alike for its satisfying crunch and delicious filling.",
      ],
      images: [
        {
          src: "/img/Banh-goi.jpg",
          alt: "Banh goi",
          caption: "Crispy fried banh goi dumplings",
        },
        {
          src: "/img/Banh-goi.jpg",
          alt: "Making banh goi",
          caption: "Frying banh goi at a street stall",
        },
      ],
      highlights: [
        "Crispy fried dumplings",
        "Filled with pork, mushrooms, and glass noodles",
        "Perfect street food snack",
        "Served with fresh herbs and dipping sauce",
      ],
      tips: [
        "Best eaten hot and fresh",
        "Wrap in lettuce with herbs for extra flavor",
        "Dip in the sweet and sour sauce",
        "Popular as an afternoon or evening snack",
      ],
      location: "Found at street food stalls throughout Hanoi",
    },
    {
      title: "Nem Ran (Fried Spring Rolls)",
      description:
        "Crispy fried rolls filled with pork, shrimp, and vegetables, wrapped in rice paper.",
      image: "/img/Nem-ran.jpg",
      content: [
        "Nem ran, also known as cha gio in the South, are crispy fried spring rolls that are a staple of Vietnamese cuisine. These golden-brown rolls are filled with a mixture of ground pork, shrimp, vegetables like carrots and wood ear mushrooms, and glass noodles, all seasoned with fish sauce and spices.",
        "The filling is wrapped in rice paper, which becomes incredibly crispy when deep-fried. The key to perfect nem ran is achieving the right balance of crispiness on the outside while keeping the filling moist and flavorful inside. The rolls are typically fried until golden brown and served hot.",
        "Nem ran is traditionally served with fresh lettuce, herbs like mint and coriander, and nuoc cham dipping sauce. The proper way to eat them is to wrap a roll in lettuce with herbs, then dip it in the sauce. This combination of crispy, savory, fresh, and tangy flavors is what makes nem ran so addictive.",
        "These spring rolls are a common appetizer or side dish, often served with bun cha or other noodle dishes. They're also a popular dish during family gatherings and special occasions. The Northern style tends to be smaller and more delicate compared to the Southern version.",
      ],
      images: [
        {
          src: "/img/Nem-ran.jpg",
          alt: "Nem ran",
          caption: "Crispy fried spring rolls",
        },
        {
          src: "/img/Nem-ran.jpg",
          alt: "Making nem ran",
          caption: "Rolling nem ran before frying",
        },
      ],
      highlights: [
        "Crispy fried rice paper rolls",
        "Filled with pork, shrimp, and vegetables",
        "Served with fresh herbs and dipping sauce",
        "Popular appetizer or side dish",
      ],
      tips: [
        "Eat while hot for maximum crispiness",
        "Wrap in lettuce with herbs before dipping",
        "Perfect accompaniment to bun cha",
        "Try making them at home for a fun cooking experience",
      ],
      location: "Found throughout Vietnam, especially in Hanoi",
    },
    {
      title: "Banh Tom",
      description:
        "Crispy shrimp fritters made with sweet potato and fresh shrimp, served with lettuce and herbs.",
      image: "/img/Banh-tom.webp",
      content: [
        "Banh tom is a crispy, golden fritter that's a specialty of Hanoi, particularly associated with West Lake (Ho Tay). These delicious fritters are made by coating fresh shrimp with a batter containing sweet potato, then deep-frying until golden and crispy.",
        "The dish gets its name from 'banh' (cake) and 'tom' (shrimp). The sweet potato in the batter adds a subtle sweetness and helps create the crispy texture. The shrimp are typically left with their heads and shells on, which adds to the flavor and crunch when fried.",
        "Banh tom is served with fresh lettuce, herbs like mint and perilla, and a sweet and sour dipping sauce. The proper way to enjoy it is to wrap a piece of the fritter in lettuce with herbs, then dip it in the sauce. The combination of the crispy, savory fritter with fresh, cool herbs creates a delightful contrast.",
        "The most famous place to enjoy banh tom is at the restaurants around West Lake, where the dish has been served for generations. Eating banh tom while overlooking the lake is a quintessential Hanoi experience, especially in the evening when the area comes alive with diners.",
      ],
      images: [
        {
          src: "/img/Banh-tom.webp",
          alt: "Banh tom",
          caption: "Crispy shrimp fritters with sweet potato",
        },
        {
          src: "/img/Banh-tom.webp",
          alt: "Banh tom at West Lake",
          caption: "Banh tom served at West Lake restaurants",
        },
      ],
      highlights: [
        "Crispy shrimp and sweet potato fritters",
        "Specialty of West Lake area",
        "Served with fresh herbs and dipping sauce",
        "Best enjoyed with a view of the lake",
      ],
      tips: [
        "Best enjoyed at West Lake restaurants",
        "Eat while hot for maximum crispiness",
        "Wrap in lettuce with herbs before eating",
        "Perfect for an evening snack or light meal",
      ],
      location: "West Lake area, Hanoi",
    },
    {
      title: "Banh Da Cua",
      description:
        "Red rice noodle soup with crab, a specialty of Hai Phong with a rich, flavorful broth.",
      image: "/img/Banh-da-cua.jpg",
      content: [
        "Banh da cua is a specialty of Hai Phong, a port city in Northern Vietnam. This distinctive noodle soup features thick, chewy red rice noodles (banh da) and a rich, flavorful broth made with crab, creating a unique and satisfying dish that's beloved by locals.",
        "The 'banh da' refers to the thick, flat rice noodles that have a reddish-brown color and a chewy texture. These noodles are made from rice flour and are thicker than the typical rice vermicelli used in other Vietnamese noodle soups. The 'cua' means crab, which is the star ingredient of the broth.",
        "The broth is made by simmering crab shells and meat with pork bones, creating a rich, umami-packed soup base. The soup is typically topped with crab meat, pork, fried tofu, and fresh herbs. The combination of the chewy noodles, rich broth, and fresh toppings creates a hearty and satisfying meal.",
        "Banh da cua is a must-try when visiting Hai Phong, where it's considered a local treasure. The dish reflects the city's coastal location and its access to fresh seafood. While it can be found in Hanoi, the most authentic versions are in Hai Phong, where the recipe has been perfected over generations.",
      ],
      images: [
        {
          src: "/img/Banh-da-cua.jpg",
          alt: "Banh da cua",
          caption: "Hai Phong specialty banh da cua with crab",
        },
        {
          src: "/img/Banh-da-cua.jpg",
          alt: "Banh da noodles",
          caption: "Thick red rice noodles in banh da cua",
        },
      ],
      highlights: [
        "Specialty of Hai Phong city",
        "Thick, chewy red rice noodles",
        "Rich crab-based broth",
        "Hearty and satisfying meal",
      ],
      tips: [
        "Best enjoyed in Hai Phong for authenticity",
        "Try it for lunch or dinner",
        "Add fresh herbs and lime to taste",
        "Popular spots: Banh Da Cua Ba Gia, Banh Da Cua Hang Kenh",
      ],
      location: "Hai Phong city, also available in Hanoi",
    },
    {
      title: "Banh Chung",
      description:
        "Traditional square sticky rice cake with pork and mung beans, wrapped in banana leaves.",
      image: "/img/Banh-chung-bac.jpg",
      content: [
        "Banh chung is Vietnam's most important traditional food, deeply rooted in the country's culture and history. This square sticky rice cake is an essential part of Tet (Lunar New Year) celebrations, symbolizing the earth and the importance of agriculture in Vietnamese culture.",
        "The cake is made from glutinous rice, mung beans, and pork belly, all wrapped in dong leaves (a type of arrowroot leaf) or banana leaves, then boiled for many hours. The square shape represents the earth, while the round version (banh giay) represents the sky, together symbolizing the universe.",
        "According to legend, banh chung was created by a prince named Lang Lieu during the reign of the Hung Kings. He created the dish as an offering to his father, and it was chosen as the most meaningful gift, leading to his succession to the throne. The story emphasizes the values of simplicity, respect, and gratitude.",
        "Making banh chung is a family tradition during Tet, with multiple generations gathering to prepare the cakes together. The process is time-consuming but creates a sense of togetherness and preserves cultural heritage. The cakes are typically served sliced, either steamed or pan-fried, and eaten with pickled vegetables.",
      ],
      images: [
        {
          src: "/img/Banh-chung-bac.jpg",
          alt: "Banh chung",
          caption: "Traditional square banh chung for Tet",
        },
        {
          src: "/img/Banh-chung-bac.jpg",
          alt: "Making banh chung",
          caption: "Family making banh chung together",
        },
      ],
      highlights: [
        "Essential Tet (Lunar New Year) food",
        "Symbolizes the earth in Vietnamese culture",
        "Over 2,000 years of history",
        "Made with glutinous rice, mung beans, and pork",
      ],
      tips: [
        "Best during Tet holiday (late January/early February)",
        "Can be eaten steamed or pan-fried",
        "Serve with pickled vegetables",
        "Try making it with a local family for authentic experience",
      ],
      location: "Found throughout Vietnam, especially during Tet",
    },
    {
      title: "Thit Kho Tau",
      description:
        "Caramelized pork belly braised in coconut water, a classic Northern Vietnamese comfort food.",
      image: "/img/Thit-kho-tau.jpg",
      content: [
        "Thit kho tau is a beloved comfort food in Northern Vietnam, especially popular during Tet and family gatherings. This dish features pork belly that's been caramelized and slowly braised in coconut water, fish sauce, and sugar until it becomes incredibly tender and flavorful.",
        "The name 'kho tau' refers to the clay pot (tau) cooking method, which helps distribute heat evenly and creates a rich, concentrated sauce. The pork is first caramelized with sugar to create a beautiful golden color and deep flavor, then braised slowly in coconut water, which adds a subtle sweetness and helps tenderize the meat.",
        "The dish is typically cooked with hard-boiled eggs, which absorb the rich, savory sauce. The pork becomes so tender that it almost melts in your mouth, while the eggs take on a beautiful brown color and rich flavor from the braising liquid. The sauce is thick, slightly sweet, and deeply savory.",
        "Thit kho tau is a staple of home cooking in Northern Vietnam, representing the warmth and comfort of family meals. It's often served with steamed rice and pickled vegetables, creating a perfect balance of flavors. The dish is particularly important during Tet, when families prepare elaborate meals to share together.",
      ],
      images: [
        {
          src: "/img/Thit-kho-tau.jpg",
          alt: "Thit kho tau",
          caption: "Caramelized pork belly with eggs",
        },
        {
          src: "/img/Thit-kho-tau.jpg",
          alt: "Cooking thit kho tau",
          caption: "Braising pork in clay pot",
        },
      ],
      highlights: [
        "Classic Northern Vietnamese comfort food",
        "Caramelized and braised pork belly",
        "Cooked with hard-boiled eggs",
        "Important dish during Tet holiday",
      ],
      tips: [
        "Best enjoyed with steamed rice",
        "Serve with pickled vegetables for balance",
        "The eggs are a must-try part of the dish",
        "Perfect for home-cooked meals",
      ],
      location: "Found in homes and restaurants throughout Northern Vietnam",
    },
    {
      title: "Ca Kho To",
      description:
        "Caramelized fish in clay pot, cooked with fish sauce, sugar, and spices until tender.",
      image: "/img/Ca-kho-to.jpg",
      content: [
        "Ca kho to is a classic Vietnamese dish that showcases the art of caramelization and slow cooking. The name means 'fish braised in clay pot,' and this cooking method is essential to creating the dish's rich, concentrated flavors and tender texture.",
        "The dish typically uses fish like catfish, snakehead fish, or carp, which are cut into steaks and caramelized with sugar before being braised in a mixture of fish sauce, coconut water, and aromatics like shallots, garlic, and chili. The clay pot (to) helps maintain even heat and allows the sauce to reduce slowly, creating a thick, glossy glaze.",
        "The fish is cooked until it becomes tender and the sauce becomes rich and slightly sweet with a deep umami flavor from the fish sauce. The caramelization process gives the fish a beautiful golden-brown color and adds complexity to the flavor. The dish is often garnished with fresh herbs and served sizzling hot.",
        "Ca kho to is a staple of Vietnamese home cooking, representing the balance of sweet, salty, and savory flavors that characterize Vietnamese cuisine. It's a comforting, hearty dish that's perfect for family meals and is often served with steamed rice and simple vegetables.",
      ],
      images: [
        {
          src: "/img/Ca-kho-to.jpg",
          alt: "Ca kho to",
          caption: "Caramelized fish in clay pot",
        },
        {
          src: "/img/Ca-kho-to.jpg",
          alt: "Cooking ca kho to",
          caption: "Braising fish in clay pot",
        },
      ],
      highlights: [
        "Caramelized fish in clay pot",
        "Rich, glossy sauce",
        "Classic Vietnamese home cooking",
        "Perfect balance of sweet and savory",
      ],
      tips: [
        "Best enjoyed with steamed rice",
        "The clay pot cooking is essential for flavor",
        "Try different types of fish for variety",
        "Perfect comfort food for family meals",
      ],
      location: "Found in homes and restaurants throughout Vietnam",
    },
    {
      title: "Bun Oc",
      description:
        "Snail noodle soup with a tangy tomato-based broth, popular street food in Hanoi.",
      image: "/img/Bun-oc.jpg",
      content: [
        "Bun oc is a unique and flavorful noodle soup that's a favorite among adventurous eaters in Hanoi. This tangy, tomato-based soup features freshwater snails (oc) as the main protein, creating a dish that's both unusual and delicious for those willing to try it.",
        "The broth is made with tomatoes, tamarind, and various seasonings, giving it a tangy, slightly sour flavor that's characteristic of Northern Vietnamese cuisine. The snails are cleaned thoroughly and cooked in the broth until tender. The soup is served with rice vermicelli noodles and topped with fried tofu, fresh herbs, and sometimes blood pudding.",
        "The dish has a distinctive flavor profile that combines the tanginess of tomatoes and tamarind with the briny taste of snails. Fresh herbs like perilla, coriander, and mint are added to balance the flavors, while fried shallots add texture and aroma. A squeeze of lime and some chili can be added to customize the taste.",
        "Bun oc is particularly popular as a street food in Hanoi, where vendors serve it from early morning until late at night. It's a dish that requires some adventurousness to try, but those who do are often pleasantly surprised by its unique and satisfying flavors. The dish represents the diversity and creativity of Vietnamese street food culture.",
      ],
      images: [
        {
          src: "/img/Bun-oc.jpg",
          alt: "Bun oc",
          caption: "Snail noodle soup with tomato broth",
        },
        {
          src: "/img/Bun-oc.jpg",
          alt: "Bun oc street food",
          caption: "Bun oc served at a street stall",
        },
      ],
      highlights: [
        "Unique snail-based noodle soup",
        "Tangy tomato and tamarind broth",
        "Popular Hanoi street food",
        "Adventurous and flavorful",
      ],
      tips: [
        "Best for adventurous eaters",
        "Try it at street food stalls for authenticity",
        "Add fresh herbs and lime to taste",
        "Popular spots: Bun Oc Co Nga, Bun Oc Hang Chieu",
      ],
      location: "Found at street food stalls throughout Hanoi",
    },
    {
      title: "Banh Xeo",
      description:
        "Crispy Vietnamese pancakes filled with shrimp, pork, and bean sprouts, served with herbs.",
      image: "/img/Banh-xeo.jpg",
      content: [
        "Banh xeo, meaning 'sizzling cake' due to the sound it makes when cooking, is a crispy, savory pancake that's a favorite throughout Vietnam. While it's more commonly associated with Central and Southern Vietnam, it's also enjoyed in the North with some regional variations.",
        "The batter is made from rice flour, turmeric (which gives it the characteristic yellow color), and coconut milk, creating a light, crispy crepe when fried. The pancake is filled with shrimp, pork, and bean sprouts, then folded in half like an omelet. The key to perfect banh xeo is achieving the right level of crispiness on the outside while keeping the filling moist.",
        "Banh xeo is typically served with fresh lettuce, herbs like mint and perilla, and a sweet and sour dipping sauce. The proper way to eat it is to cut off a piece, wrap it in lettuce with herbs, and dip it in the sauce. This combination of crispy, savory, fresh, and tangy flavors creates a delightful eating experience.",
        "In Northern Vietnam, banh xeo tends to be smaller and thinner compared to the larger, more filling versions in the South. The dish is popular as a snack or light meal, and it's especially enjoyable when shared with friends or family. Many restaurants allow you to watch the cooking process, adding to the dining experience.",
      ],
      images: [
        {
          src: "/img/Banh-xeo.jpg",
          alt: "Banh xeo",
          caption: "Crispy Vietnamese pancake with shrimp and pork",
        },
        {
          src: "/img/Banh-xeo.jpg",
          alt: "Making banh xeo",
          caption: "Cooking banh xeo in a pan",
        },
      ],
      highlights: [
        "Crispy, savory pancake",
        "Filled with shrimp, pork, and bean sprouts",
        "Served with fresh herbs and dipping sauce",
        "Named for the sizzling sound when cooking",
      ],
      tips: [
        "Eat while hot for maximum crispiness",
        "Wrap in lettuce with herbs before dipping",
        "Northern version is typically smaller",
        "Try watching it being made for the full experience",
      ],
      location: "Found throughout Vietnam, with regional variations",
    },
    {
      title: "Mien Xao",
      description:
        "Stir-fried glass noodles with vegetables and meat, a light and flavorful dish.",
      image: "/img/Mien-xao.jpg",
      content: [
        "Mien xao is a light and satisfying stir-fried dish featuring glass noodles (mien), which are made from mung bean starch. These translucent noodles have a unique texture that's slightly chewy and absorbs flavors beautifully, making them perfect for stir-frying.",
        "The dish typically includes a variety of vegetables such as carrots, cabbage, mushrooms, and bean sprouts, along with meat (usually pork, chicken, or shrimp). The ingredients are stir-fried together with garlic, shallots, and seasonings like fish sauce and soy sauce, creating a harmonious blend of flavors and textures.",
        "Mien xao is known for being light yet satisfying, making it a popular choice for lunch or as part of a larger meal. The glass noodles don't feel heavy like rice or wheat noodles, and the combination of vegetables and protein creates a balanced, nutritious dish. The stir-frying technique ensures that all ingredients are cooked quickly, preserving their texture and nutrients.",
        "The dish is often garnished with fresh herbs like coriander and green onions, and sometimes served with a side of pickled vegetables. It's a versatile dish that can be customized with different proteins and vegetables based on preference. Mien xao represents the simplicity and elegance of Vietnamese home cooking, where fresh ingredients and proper technique create delicious results.",
      ],
      images: [
        {
          src: "/img/Mien-xao.jpg",
          alt: "Mien xao",
          caption: "Stir-fried glass noodles with vegetables and meat",
        },
        {
          src: "/img/Mien-xao.jpg",
          alt: "Glass noodles",
          caption: "Translucent glass noodles used in mien xao",
        },
      ],
      highlights: [
        "Light and satisfying stir-fried dish",
        "Made with translucent glass noodles",
        "Versatile with various vegetables and proteins",
        "Popular for lunch or light meals",
      ],
      tips: [
        "Best enjoyed hot and fresh",
        "Customize with your favorite vegetables",
        "Try different protein options",
        "Perfect for a light, healthy meal",
      ],
      location: "Found in restaurants and homes throughout Vietnam",
    },
    {
      title: "Banh Mi",
      description:
        "Vietnamese baguette sandwich with various fillings like pate, cold cuts, and fresh vegetables.",
      image: "/img/Banh-mi.webp",
      content: [
        "Banh mi is Vietnam's famous fusion sandwich, combining French colonial influences with Vietnamese flavors to create something uniquely delicious. While it's more commonly associated with Southern Vietnam (especially Saigon), it's also popular in the North with some regional variations.",
        "The sandwich starts with a Vietnamese baguette, which is lighter and crispier than its French counterpart due to the addition of rice flour. The bread is typically toasted until golden and crispy on the outside while remaining soft inside. The fillings vary but commonly include Vietnamese pate, various cold cuts (cha lua, thit nguoi), pickled vegetables (carrots and daikon), fresh cilantro, cucumber, and chili.",
        "The magic of banh mi lies in the combination of flavors and textures: the crispy bread, rich pate, savory meats, tangy pickled vegetables, fresh herbs, and spicy chili all come together to create a perfect harmony. A drizzle of mayonnaise or special sauce adds creaminess, while the pickled vegetables provide a refreshing contrast to the rich meats.",
        "In Northern Vietnam, banh mi might be slightly different from the Southern version, often with simpler fillings and less sweetness. Street vendors throughout Hanoi serve banh mi from early morning until late at night, making it a convenient and delicious meal option. The sandwich has gained international fame and is now considered one of the world's best street foods.",
      ],
      images: [
        {
          src: "/img/Banh-mi.webp",
          alt: "Banh mi",
          caption: "Vietnamese baguette sandwich with various fillings",
        },
        {
          src: "/img/Banh-mi.webp",
          alt: "Banh mi vendor",
          caption: "Street vendor preparing banh mi",
        },
      ],
      highlights: [
        "Fusion of French and Vietnamese cuisine",
        "Crispy Vietnamese baguette",
        "Combination of pate, meats, and fresh vegetables",
        "Considered one of the world's best street foods",
      ],
      tips: [
        "Best eaten fresh from street vendors",
        "Try different fillings to find your favorite",
        "Available throughout the day",
        "Popular spots: Banh Mi 25, Banh Mi Pho Co",
      ],
      location: "Found throughout Vietnam, especially at street vendors",
    },
    {
      title: "Banh Troi Nuoc",
      description:
        "Floating rice balls filled with mung bean paste, served in sweet ginger syrup.",
      image: "/img/Banh-troi-nuoc.jpg",
      content: [
        "Banh troi nuoc, meaning 'floating cake in water,' is a traditional Vietnamese dessert that's particularly popular in Northern Vietnam. These small, chewy rice balls are filled with sweet mung bean paste and served in a warm, sweet ginger syrup, creating a comforting and satisfying dessert.",
        "The rice balls are made from glutinous rice flour, which gives them their characteristic chewy texture. The filling is made from mung beans that have been cooked, mashed, and sweetened. The balls are boiled until they float to the surface (hence the name), then served in a warm syrup made from ginger, sugar, and water.",
        "The ginger syrup adds warmth and a subtle spiciness that complements the sweetness of the mung bean filling. The dish is often garnished with toasted sesame seeds, which add a nutty flavor and textural contrast. Some versions also include a small piece of rock sugar in the center of each ball for an extra burst of sweetness.",
        "Banh troi nuoc is especially popular during the Cold Food Festival (Tet Han Thuc) on the 3rd day of the 3rd lunar month, but it's enjoyed year-round as a sweet treat. The dish represents the simplicity and elegance of Vietnamese desserts, where a few quality ingredients create something truly special. It's a comforting dessert that's perfect for cool weather, thanks to the warming properties of ginger.",
      ],
      images: [
        {
          src: "/img/Banh-troi-nuoc.jpg",
          alt: "Banh troi nuoc",
          caption: "Floating rice balls in ginger syrup",
        },
        {
          src: "/img/Banh-troi-nuoc.jpg",
          alt: "Making banh troi nuoc",
          caption: "Preparing banh troi nuoc",
        },
      ],
      highlights: [
        "Traditional Vietnamese dessert",
        "Chewy rice balls with mung bean filling",
        "Served in warm ginger syrup",
        "Popular during Cold Food Festival",
      ],
      tips: [
        "Best enjoyed warm",
        "Perfect for cool weather",
        "Try it during Tet Han Thuc",
        "The ginger syrup is warming and comforting",
      ],
      location: "Found throughout Northern Vietnam, especially during festivals",
    },
  ],
  culture: [
    {
      title: "Water Puppetry",
      description:
        "Traditional Vietnamese art form originating from the Red River Delta, performed in water.",
      image: "/img/Mua-roi-nuoc.jpeg",
      content: [
        "Water puppetry (Múa rối nước) is a unique Vietnamese art form that dates back over 1,000 years. Originating in the Red River Delta region, it was created by farmers who entertained themselves during the flooding season.",
        "The puppets are made from wood and lacquered to be waterproof. Performances take place in a pool of water, with puppeteers standing behind a screen in waist-deep water, manipulating the puppets using long bamboo rods and string mechanisms hidden beneath the water's surface.",
        "Traditional shows depict scenes from rural Vietnamese life, including farming, fishing, and folk tales. The performances are accompanied by live traditional music played on instruments like drums, gongs, and bamboo flutes, with singers narrating the stories.",
        "The Thang Long Water Puppet Theatre in Hanoi is the most famous venue, offering daily performances that have become a must-see for visitors. The art form has been recognized as an Intangible Cultural Heritage by UNESCO.",
      ],
      images: [
        {
          src: "/img/waterpuppet-detail-1.jpg",
          alt: "Water puppet show",
          caption: "Traditional water puppet performance",
        },
        {
          src: "/img/waterpuppet-detail-2.jpg",
          alt: "Water puppets",
          caption: "Intricately carved water puppets",
        },
      ],
      highlights: [
        "Over 1,000 years of history",
        "UNESCO Intangible Cultural Heritage",
        "Unique to Vietnam",
        "Best experienced at Thang Long Theatre in Hanoi",
      ],
      tips: [
        "Book tickets in advance, especially during peak season",
        "Shows typically last 50 minutes",
        "Arrive early for better seats",
        "Photography is usually allowed but check with the venue",
      ],
      location:
        "Thang Long Water Puppet Theatre, 57B Dinh Tien Hoang, Hoan Kiem, Hanoi",
    },
    {
      title: "Ethnic Minority Markets",
      description:
        "Vibrant weekly markets where Hmong, Dao, and other ethnic groups trade and socialize.",
      image: "/img/Cho-dan-toc.jpg",
      content: [
        "Ethnic minority markets in Northern Vietnam are vibrant cultural hubs where various ethnic groups gather to trade, socialize, and celebrate their traditions. These weekly markets are not just places of commerce but important social and cultural events that bring together communities from remote mountain villages.",
        "The markets feature a dazzling array of goods including handwoven textiles, traditional clothing, silver jewelry, local produce, livestock, and handicrafts. Each ethnic group brings their unique products: Hmong people are known for their intricate embroidery and indigo-dyed fabrics, while Dao people sell beautiful silver jewelry and traditional medicine.",
        "The markets are also social gathering places where people catch up with friends and family, share news, and maintain community bonds. You'll see people in traditional costumes, hear multiple languages being spoken, and witness age-old trading practices. Food stalls serve local specialties, and the atmosphere is festive and colorful.",
        "Some of the most famous markets include Bac Ha Market (Sunday), Can Cau Market (Saturday), and Dong Van Market (Sunday) in Ha Giang, as well as Sapa Market and Coc Ly Market. Each market has its own character and specialties, making them fascinating destinations for cultural immersion and photography.",
      ],
      images: [
        {
          src: "/img/Cho-dan-toc.jpg",
          alt: "Ethnic minority market",
          caption: "Vibrant ethnic minority market with colorful textiles",
        },
        {
          src: "/img/Cho-dan-toc.jpg",
          alt: "Market vendors",
          caption: "Ethnic vendors selling traditional goods",
        },
      ],
      highlights: [
        "Weekly cultural and social gatherings",
        "Handwoven textiles and traditional crafts",
        "Multiple ethnic groups in one place",
        "Authentic cultural experience",
      ],
      tips: [
        "Visit early in the morning for the best experience",
        "Bring cash as most vendors don't accept cards",
        "Respect local customs and ask before taking photos",
        "Try local food and drinks at the market",
        "Bargain politely when purchasing items",
      ],
      location: "Various locations: Bac Ha, Can Cau, Dong Van, Sapa, and other mountain towns",
    },
    {
      title: "Temple of Literature",
      description:
        "Vietnam's first university, dedicated to Confucius, showcasing traditional Vietnamese architecture.",
      image: "/img/Van-mieu.jpg",
      content: [
        "The Temple of Literature (Van Mieu) is one of Hanoi's most important historical and cultural sites. Built in 1070 during the Ly Dynasty, it was Vietnam's first university and is dedicated to Confucius, sages, and scholars. The temple represents the country's deep respect for education and learning.",
        "The complex consists of five courtyards, each with its own significance. The first courtyard features the Great Portico and the main gate. The second courtyard contains the Constellation of Literature Pavilion, while the third courtyard houses the Well of Heavenly Clarity and the Stelae of Doctors, which honor those who passed the royal examinations.",
        "The 82 stone stelae, mounted on tortoise backs, are particularly impressive. Each stela records the names and achievements of scholars who passed the royal examinations between 1442 and 1779. These stelae are recognized as a UNESCO Memory of the World heritage.",
        "The temple's architecture reflects traditional Vietnamese design with Chinese influences. The buildings feature curved roofs, intricate woodwork, and beautiful gardens. Today, the temple is a peaceful oasis in the heart of Hanoi, where students come to pray for success in their studies, and visitors can learn about Vietnam's educational history.",
      ],
      images: [
        {
          src: "/img/Van-mieu.jpg",
          alt: "Temple of Literature",
          caption: "The historic Temple of Literature in Hanoi",
        },
        {
          src: "/img/Van-mieu.jpg",
          alt: "Stelae of Doctors",
          caption: "Stone stelae honoring successful scholars",
        },
      ],
      highlights: [
        "Vietnam's first university (1070)",
        "UNESCO Memory of the World heritage",
        "82 stone stelae of doctors",
        "Beautiful traditional Vietnamese architecture",
      ],
      tips: [
        "Visit early morning or late afternoon to avoid crowds",
        "Dress respectfully (cover shoulders and knees)",
        "Allow 1-2 hours to explore the complex",
        "Students often visit before exams for good luck",
        "Combine with nearby attractions like One Pillar Pagoda",
      ],
      location: "58 Quoc Tu Giam Street, Dong Da District, Hanoi",
    },
    {
      title: "Traditional Crafts",
      description:
        "Visit craft villages like Bat Trang pottery village and Van Phuc silk village.",
      image: "/img/Lang-gom-bat-trang.jpg",
      content: [
        "Northern Vietnam is home to numerous traditional craft villages that have preserved ancient techniques for centuries. These villages specialize in various crafts including pottery, silk weaving, embroidery, and wood carving, offering visitors a chance to see traditional artisans at work and purchase authentic handmade products.",
        "Bat Trang Pottery Village, located about 13 km from Hanoi, is famous for its ceramic and pottery products. The village has been producing ceramics for over 500 years, and visitors can watch artisans shape clay on traditional potter's wheels, paint intricate designs, and fire pieces in ancient kilns. You can even try making your own pottery.",
        "Van Phuc Silk Village, just 10 km from Hanoi, is renowned for its high-quality silk products. The village has been weaving silk for over 1,000 years, and visitors can see the entire process from silkworm cultivation to weaving beautiful fabrics. The village's silk products are known for their durability and beautiful patterns.",
        "Other notable craft villages include Chuong Hat Village (conical hat making), Quat Dong Village (embroidery), and Dong Ky Village (wood carving). These villages not only preserve traditional skills but also provide livelihoods for local communities. Visiting these villages offers insight into Vietnamese culture and the importance of craftsmanship in daily life.",
      ],
      images: [
        {
          src: "/img/Lang-gom-bat-trang.jpg",
          alt: "Bat Trang pottery village",
          caption: "Traditional pottery making in Bat Trang",
        },
        {
          src: "/img/Lang-gom-bat-trang.jpg",
          alt: "Craft village",
          caption: "Artisan working on traditional craft",
        },
      ],
      highlights: [
        "Centuries-old traditional techniques",
        "Handmade authentic products",
        "Interactive experiences available",
        "Support local artisan communities",
      ],
      tips: [
        "Plan a half-day trip from Hanoi",
        "Bring cash for purchases",
        "Try hands-on activities if available",
        "Respect the artisans' workspace",
        "Bargain politely when buying products",
      ],
      location: "Various villages around Hanoi: Bat Trang (pottery), Van Phuc (silk), and others",
    },
  ],
  nature: [
    {
      title: "Ha Long Bay",
      description:
        "UNESCO World Heritage Site with over 1,600 limestone karsts and islets in emerald waters.",
      image: "/img/Ha-long.jpg",
      content: [
        "Ha Long Bay, meaning 'Descending Dragon Bay', is one of Vietnam's most spectacular natural wonders and a UNESCO World Heritage Site. The bay features over 1,600 limestone karsts and islets rising dramatically from emerald waters, creating a breathtaking seascape.",
        "The bay covers an area of approximately 1,553 square kilometers and is home to numerous caves, grottoes, and floating fishing villages. The limestone formations have been shaped by millions of years of erosion, creating unique shapes that have inspired countless legends.",
        "Popular activities include cruising on traditional junk boats, kayaking through hidden lagoons, exploring caves like Sung Sot (Surprise Cave) and Thien Cung (Heavenly Palace Cave), and visiting floating villages where local communities live on the water.",
        "The best way to experience Ha Long Bay is on an overnight cruise, allowing you to witness the bay at different times of day, including the magical sunrise and sunset. Many cruises also offer activities like cooking classes, squid fishing, and tai chi sessions.",
      ],
      images: [
        {
          src: "/img/Vinh-ha-long-1.jpg",
          alt: "Ha Long Bay karsts",
          caption: "Limestone karsts rising from emerald waters",
        },
        {
          src: "/img/Vinh-ha-long-2.jpg",
          alt: "Ha Long Bay cruise",
          caption: "Traditional junk boat cruise",
        },
      ],
      highlights: [
        "UNESCO World Heritage Site since 1994",
        "Over 1,600 limestone karsts and islets",
        "Home to floating fishing villages",
        "Best experienced on an overnight cruise",
      ],
      tips: [
        "Book a 2-3 day cruise for the best experience",
        "Best time to visit: March to May and September to November",
        "Bring warm clothes for evening cruises",
        "Choose reputable cruise companies for safety and quality",
      ],
      location: "Quang Ninh Province, approximately 170 km east of Hanoi",
    },
    {
      title: "Sapa Terraced Fields",
      description:
        "Stunning rice terraces cascading down mountainsides, especially beautiful during harvest season.",
      image: "/img/Ruong-bac-thang.jpg",
      content: [
        "Sapa's terraced rice fields are among the most spectacular agricultural landscapes in Southeast Asia. These stunning terraces cascade down the mountainsides like giant steps, creating a breathtaking mosaic of green during the growing season and golden during harvest. The terraces have been carved into the mountains over generations by ethnic minority groups.",
        "The terraces are the result of centuries of labor by Hmong, Dao, and other ethnic groups who transformed steep mountain slopes into productive farmland. The engineering is remarkable - the terraces follow the natural contours of the mountains and are supported by stone walls, creating a sustainable agricultural system that prevents soil erosion.",
        "The fields change dramatically with the seasons. In spring (March-May), the terraces are filled with water, reflecting the sky like mirrors. During summer (June-August), they turn vibrant green as the rice grows. The most spectacular time is harvest season (September-October), when the fields turn golden yellow, creating a stunning contrast with the surrounding mountains.",
        "The best viewpoints include the Muong Hoa Valley, which offers panoramic views of the terraces, and the trekking routes to villages like Ta Van, Lao Chai, and Ta Phin. These terraces are not just beautiful landscapes but represent the ingenuity and perseverance of the ethnic communities who have made these mountains their home for generations.",
      ],
      images: [
        {
          src: "/img/Ruong-bac-thang.jpg",
          alt: "Sapa terraced fields",
          caption: "Stunning terraced rice fields in Sapa",
        },
        {
          src: "/img/Ruong-bac-thang.jpg",
          alt: "Harvest season",
          caption: "Golden terraces during harvest season",
        },
      ],
      highlights: [
        "UNESCO-recognized cultural landscape",
        "Most beautiful during harvest (September-October)",
        "Centuries-old agricultural engineering",
        "Best viewed from Muong Hoa Valley",
      ],
      tips: [
        "Best time to visit: September-October for golden fields",
        "March-May for water-filled terraces",
        "Take a trekking tour to see them up close",
        "Visit ethnic villages to learn about farming techniques",
        "Early morning light is best for photography",
      ],
      location: "Sapa District, Lao Cai Province, Northern Vietnam",
    },
    {
      title: "Cuc Phuong National Park",
      description:
        "Vietnam's oldest national park with diverse flora and fauna, including endangered primates.",
      image: "/img/Cuc-phuong.webp",
      content: [
        "Cuc Phuong National Park, established in 1962, is Vietnam's first and largest national park, covering over 22,000 hectares of primary tropical forest. Located in Ninh Binh Province, the park is a biodiversity hotspot home to an incredible variety of plants, animals, and insects, many of which are endemic to Vietnam.",
        "The park is particularly famous for its primate conservation programs. The Endangered Primate Rescue Center houses some of the world's rarest primates, including Delacour's langurs, Cat Ba langurs, and various species of gibbons. Visitors can learn about conservation efforts and see these magnificent animals up close.",
        "Cuc Phuong's ancient forest contains trees over 1,000 years old, including a massive 1,000-year-old tree that requires 20 people to encircle. The park has numerous hiking trails ranging from easy walks to challenging multi-day treks. Popular routes lead to caves, waterfalls, and ancient trees, offering opportunities to spot wildlife and enjoy the peaceful forest atmosphere.",
        "The park is also home to the Cuc Phuong Museum, which displays specimens of the park's flora and fauna, and the Turtle Conservation Center. Bird watching is excellent, with over 300 species recorded. The best time to visit is during the dry season (November to February) when the weather is cooler and wildlife is more active.",
      ],
      images: [
        {
          src: "/img/Cuc-phuong.webp",
          alt: "Cuc Phuong National Park",
          caption: "Ancient forest in Cuc Phuong National Park",
        },
        {
          src: "/img/Cuc-phuong.webp",
          alt: "Primate conservation",
          caption: "Endangered primates at the rescue center",
        },
      ],
      highlights: [
        "Vietnam's first national park (1962)",
        "Endangered Primate Rescue Center",
        "Ancient trees over 1,000 years old",
        "Over 300 bird species",
      ],
      tips: [
        "Best time to visit: November to February (dry season)",
        "Book accommodation in advance",
        "Bring insect repellent and long sleeves",
        "Hire a local guide for better wildlife spotting",
        "Visit the primate rescue center early in the day",
      ],
      location: "Ninh Binh Province, approximately 120 km southwest of Hanoi",
    },
    {
      title: "Fansipan Peak",
      description:
        "Indochina's highest peak at 3,143 meters, offering challenging treks and panoramic views.",
      image: "/img/Fansipan.webp",
      content: [
        "Fansipan, known as the 'Roof of Indochina,' is the highest mountain in Vietnam and all of Indochina, standing at 3,143 meters above sea level. Located in the Hoang Lien Son mountain range near Sapa, Fansipan offers some of the most spectacular mountain views in Southeast Asia and is a challenging destination for trekkers and mountaineers.",
        "The mountain can be reached in two ways: by cable car or by trekking. The Fansipan Legend cable car, opened in 2016, is the longest and highest cable car in the world, taking visitors from Sapa to near the summit in just 20 minutes. This makes the peak accessible to everyone, not just experienced trekkers.",
        "For adventure seekers, multi-day treks to the summit offer an unforgettable experience. The trek typically takes 2-3 days and involves camping overnight. The trail passes through diverse ecosystems including bamboo forests, pine forests, and alpine meadows, with stunning views of the surrounding valleys and mountains. The summit offers panoramic views of the entire region on clear days.",
        "At the summit, visitors will find a Buddhist temple complex, a large bronze bell, and a statue of Amitabha Buddha. The weather at the top can be unpredictable, with temperatures often dropping below freezing and frequent fog. The best time to visit is from October to April when the weather is clearer and more stable.",
      ],
      images: [
        {
          src: "/img/Fansipan.webp",
          alt: "Fansipan Peak",
          caption: "The Roof of Indochina - Fansipan Peak",
        },
        {
          src: "/img/Fansipan.webp",
          alt: "Cable car to Fansipan",
          caption: "Fansipan Legend cable car",
        },
      ],
      highlights: [
        "Highest peak in Indochina (3,143m)",
        "World's longest and highest cable car",
        "Challenging multi-day trekking routes",
        "Buddhist temple complex at the summit",
      ],
      tips: [
        "Best time to visit: October to April",
        "Bring warm clothing - it's cold at the summit",
        "Check weather conditions before visiting",
        "Cable car is easier; trekking requires good fitness",
        "Start early to avoid crowds and catch sunrise",
      ],
      location: "Hoang Lien Son Mountain Range, near Sapa, Lao Cai Province",
    },
  ],
  beaches: [
    {
      title: "Cat Ba Island",
      description:
        "Largest island in Ha Long Bay with beautiful beaches, hiking trails, and national park.",
      image: "/img/Cat-ba.webp",
      content: [
        "Cat Ba Island is the largest of the 367 islands in the Cat Ba Archipelago, located in Ha Long Bay. The island is a perfect combination of natural beauty, adventure activities, and relaxation, making it a popular destination for both Vietnamese and international tourists.",
        "The island is home to Cat Ba National Park, which covers half of the island and is a UNESCO Biosphere Reserve. The park features diverse ecosystems including tropical forests, mangroves, and coral reefs, with over 1,500 species of plants and numerous rare animals.",
        "Cat Ba offers a range of activities including hiking through the national park, rock climbing on the island's limestone cliffs, kayaking in Lan Ha Bay, and relaxing on beautiful beaches like Cat Co 1, 2, and 3. The island also has a vibrant town with restaurants, bars, and hotels.",
        "One of the highlights is the Cannon Fort, which offers panoramic views of the island and surrounding bay. The fort was built during the French colonial period and later used during the Vietnam War. Sunset from here is particularly spectacular.",
      ],
      images: [
        {
          src: "/img/bai-bien-tai-cat-ba.webp",
          alt: "Cat Ba beaches",
          caption: "Beautiful beaches on Cat Ba Island",
        },
        {
          src: "/img/Vuon-quoc-gia-Cat-Ba_6.jpg",
          alt: "Cat Ba National Park",
          caption: "Hiking trails in Cat Ba National Park",
        },
      ],
      highlights: [
        "Largest island in Ha Long Bay",
        "UNESCO Biosphere Reserve",
        "Beautiful beaches and hiking trails",
        "Great for rock climbing and kayaking",
      ],
      tips: [
        "Take a ferry from Hai Phong or join a cruise from Hanoi",
        "Rent a motorbike to explore the island",
        "Visit Cannon Fort for sunset views",
        "Book accommodation in advance during peak season",
      ],
      location: "Cat Ba Archipelago, Ha Long Bay, Quang Ninh Province",
    },
    {
      title: "Co To Island",
      description:
        "Pristine beaches with white sand and clear waters, perfect for a peaceful getaway.",
      image: "/img/Thi-tran-Co-To.jpg",
      content: [
        "Co To Island is a pristine paradise located in Quang Ninh Province, known for its stunning white sand beaches, crystal-clear turquoise waters, and unspoiled natural beauty. Unlike the more developed tourist destinations, Co To maintains a peaceful, authentic atmosphere that makes it perfect for those seeking a quiet beach getaway.",
        "The island features several beautiful beaches including Co To Beach, Hong Van Beach, and Van Chay Beach, each offering soft white sand and clear waters perfect for swimming and sunbathing. The beaches are relatively undeveloped, giving them a natural, untouched feel that's increasingly rare in Vietnam's beach destinations.",
        "Co To is also home to the Co To Lighthouse, which offers panoramic views of the surrounding sea and islands. The lighthouse sits on a hill and is accessible by a scenic walk. The island's interior features rolling hills and forests, perfect for hiking and exploring. Local seafood is fresh and delicious, with many restaurants serving the day's catch.",
        "The island has been developing its tourism infrastructure while trying to maintain its natural charm. Accommodation ranges from simple guesthouses to more comfortable hotels. The best time to visit is from April to October when the weather is warm and the sea is calm. Co To is less crowded than other beach destinations, making it ideal for those seeking tranquility.",
      ],
      images: [
        {
          src: "/img/Thi-tran-Co-To.jpg",
          alt: "Co To Island",
          caption: "Pristine beaches of Co To Island",
        },
        {
          src: "/img/Thi-tran-Co-To.jpg",
          alt: "Co To lighthouse",
          caption: "Co To Lighthouse with panoramic views",
        },
      ],
      highlights: [
        "Pristine white sand beaches",
        "Crystal-clear turquoise waters",
        "Peaceful, undeveloped atmosphere",
        "Co To Lighthouse with stunning views",
      ],
      tips: [
        "Best time to visit: April to October",
        "Take a ferry from Cai Rong Port (Van Don)",
        "Book accommodation in advance during peak season",
        "Try fresh seafood at local restaurants",
        "Rent a motorbike to explore the island",
      ],
      location: "Co To District, Quang Ninh Province, approximately 180 km from Hanoi",
    },
  ],
};

export default function NorthernVietnam() {
  // Load from localStorage only
  const storedData = useMemo(() => {
    try {
      const stored = getRegionData("Northern Vietnam");
      // Use stored data and merge with overview/hero data from hardcoded
      return {
        ...northernVietnamData,
        destinations: stored.destinations,
        food: stored.food,
        culture: stored.culture,
        nature: stored.nature,
        beaches: stored.beaches,
      };
    } catch (error) {
      console.error("Error loading Northern Vietnam data:", error);
      // Fallback to hardcoded only if localStorage fails
      return northernVietnamData;
    }
  }, []);

  return <RegionPage regionData={storedData} />;
}
