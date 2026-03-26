import { useMemo } from "react";
import RegionPage from "../components/regions/RegionPage";
import { getRegionData } from "../utils/regions";

export const southernVietnamData = {
  title: "Southern Vietnam",
  heroImage: "/img/Nui-ba-den.jpg",
  heroCredit: "Núi Bà Ðen. Photo by Nguyen Minh Vuong.",
  overview: {
    highlight: "Southern Vietnam is a vibrant region of bustling cities, fertile deltas, and tropical islands. From the dynamic energy of Ho Chi Minh City to the tranquil waterways of the Mekong Delta, the south offers diverse experiences.",
    description1: "Ho Chi Minh City, formerly Saigon, is Vietnam's largest city and economic hub, where modern skyscrapers stand alongside historic French colonial buildings. The city pulses with energy, from its bustling markets and street food scenes to its vibrant nightlife and cultural attractions.",
    description2: "The Mekong Delta, known as Vietnam's 'rice bowl,' is a maze of rivers, swamps, and islands where life revolves around the water. Floating markets, fruit orchards, and traditional villages offer a glimpse into rural Vietnamese life. The region also boasts beautiful tropical islands like Phu Quoc and Con Dao, with pristine beaches and luxury resorts.",
    images: [
      {
        src: "/img/HCM-night.jpg",
        alt: "Ho Chi Minh City",
        caption: "Ho Chi Minh City - Vietnam's Economic Hub"
      },
      {
        src: "/img/Ruong-lua.jpg",
        alt: "Mekong Delta",
        caption: "Mekong Delta - Vietnam's Rice Bowl"
      }
    ],
    highlights: [
      {
        icon: '<i class="fa-solid fa-city"></i>',
        title: "Dynamic Cities",
        description: "Ho Chi Minh City's modern skyline, vibrant nightlife, and rich cultural attractions."
      },
      {
        icon: '<i class="fa-solid fa-wheat-awn"></i>',
        title: "Mekong Delta",
        description: "Floating markets, fruit orchards, and traditional river life in Vietnam's agricultural heartland."
      },
      {
        icon: '<i class="fa-solid fa-umbrella-beach"></i>',
        title: "Tropical Islands",
        description: "Phu Quoc and Con Dao offer pristine beaches, luxury resorts, and world-class diving."
      },
      {
        icon: '<i class="fa-solid fa-bowl-food"></i>',
        title: "Street Food Paradise",
        description: "From banh mi to com tam, experience the best of Vietnamese street food culture."
      }
    ]
  },
  destinations: [
    {
      name: "HO CHI MINH CITY",
      description: "Vietnam's largest city, a dynamic metropolis blending French colonial architecture with modern skyscrapers.",
      image: "/img/HCM.jpg",
      content: [
        "Ho Chi Minh City, still commonly called Saigon, is Vietnam's largest city and economic powerhouse. The city is a fascinating blend of old and new, where French colonial buildings stand alongside modern skyscrapers, and traditional markets coexist with shopping malls. The city pulses with energy 24/7, from its bustling street food scenes to its vibrant nightlife.",
        "The city's history is evident in landmarks like the Notre-Dame Cathedral Basilica of Saigon, the Central Post Office designed by Gustave Eiffel, and the Reunification Palace (formerly Independence Palace). District 1, the city center, is where most visitors stay and explore, with its wide boulevards, historic buildings, and numerous restaurants and cafes.",
        "Ho Chi Minh City is a food lover's paradise, with an incredible street food scene that's considered among the best in the world. From banh mi and pho to com tam and hu tieu, the city offers endless culinary delights. The Ben Thanh Market is a must-visit for experiencing local life and trying various foods.",
        "Beyond food and history, the city offers cultural attractions like the War Remnants Museum, the Cu Chi Tunnels (a short drive away), and numerous pagodas and temples. The city's nightlife is vibrant, with rooftop bars, nightclubs, and live music venues. Despite its rapid modernization, Saigon maintains its charm and character, making it one of Southeast Asia's most exciting cities.",
      ],
      images: [
        {
          src: "/img/HCM.jpg",
          alt: "Ho Chi Minh City",
          caption: "Modern Ho Chi Minh City skyline",
        },
        {
          src: "/img/HCM.jpg",
          alt: "Saigon streets",
          caption: "Bustling streets of Ho Chi Minh City",
        },
      ],
      highlights: [
        "Vietnam's largest city and economic hub",
        "French colonial architecture mixed with modern skyscrapers",
        "World-class street food scene",
        "Vibrant nightlife and cultural attractions",
      ],
      tips: [
        "Best time to visit: December to April for dry season",
        "Explore District 1 on foot or by motorbike",
        "Try street food at Ben Thanh Market and local stalls",
        "Visit War Remnants Museum and Cu Chi Tunnels",
        "Experience the nightlife at rooftop bars",
      ],
      location: "Southern Vietnam, approximately 1,760 km south of Hanoi",
    },
    {
      name: "CON DAO",
      description: "Archipelago with pristine beaches, historical significance, and excellent diving opportunities.",
      image: "/img/Con-dao.jpg",
      content: [
        "Con Dao is an archipelago of 16 islands located off Vietnam's southern coast, known for its pristine natural beauty, tragic history, and excellent diving. The main island, Con Son, was once a French and later Vietnamese prison where thousands of political prisoners were held and died. Today, the islands have been transformed into a peaceful destination with luxury resorts and protected national park.",
        "The archipelago is part of Con Dao National Park, which protects both marine and forest ecosystems. The islands are home to diverse wildlife including sea turtles that nest on the beaches, dugongs (sea cows), and various bird species. The waters surrounding the islands are rich in marine life, making it one of Vietnam's best diving destinations.",
        "Con Dao's beaches are among Vietnam's most beautiful, with white sand, clear turquoise water, and a sense of seclusion. The main beaches include Dam Trau Beach, An Hai Beach, and Lo Voi Beach. The islands offer excellent opportunities for snorkeling, diving, hiking, and wildlife watching, particularly sea turtle nesting season from April to November.",
        "The Con Dao Prison complex is a sobering historical site that tells the story of the islands' dark past. The Hang Duong Cemetery is the final resting place of many prisoners, including the famous revolutionary Vo Thi Sau. Despite its history, Con Dao today is a peaceful, beautiful destination that offers both relaxation and reflection.",
      ],
      images: [
        {
          src: "/img/Con-dao.jpg",
          alt: "Con Dao islands",
          caption: "Pristine beaches of Con Dao",
        },
        {
          src: "/img/Con-dao.jpg",
          alt: "Con Dao diving",
          caption: "Excellent diving opportunities in Con Dao",
        },
      ],
      highlights: [
        "16-island archipelago with pristine beaches",
        "Con Dao National Park with diverse wildlife",
        "Excellent diving and snorkeling",
        "Historical significance as former prison",
      ],
      tips: [
        "Best time to visit: December to April for dry season",
        "Book accommodation in advance (limited options)",
        "Take a flight from Ho Chi Minh City (45 minutes)",
        "Visit during sea turtle nesting season (April-November)",
        "Respect the historical sites and natural environment",
      ],
      location: "Ba Ria-Vung Tau Province, approximately 230 km southeast of Ho Chi Minh City",
    },
    {
      name: "BINH THUAN",
      description: "Coastal province known for Mui Ne's sand dunes, kite surfing, and beautiful beaches.",
      image: "/img/Binh-thuan.jpg",
      content: [
        "Binh Thuan Province, particularly the resort town of Mui Ne, is one of Vietnam's premier beach and adventure destinations. The area is famous for its unique combination of beautiful beaches, dramatic sand dunes, and excellent conditions for water sports, especially kite surfing and windsurfing.",
        "Mui Ne's sand dunes are the main attraction, with both red and white sand dunes creating a desert-like landscape that's unique in Vietnam. The red sand dunes are particularly beautiful at sunrise and sunset, when the light creates stunning colors. Visitors can try sandboarding, take jeep tours, or simply enjoy the surreal landscape. The white sand dunes are larger and offer more activities.",
        "The beach in Mui Ne stretches for 15 kilometers along the coast, with calm waters and consistent winds that make it perfect for kite surfing and windsurfing. The area has developed into a resort destination with numerous hotels, restaurants, and water sports operators. The beach is lined with coconut palms and fishing boats, creating a picturesque setting.",
        "Beyond the beach and dunes, Mui Ne offers attractions like the Fairy Stream (Suoi Tien), a shallow stream that cuts through red and white sand, and the fishing village where visitors can see traditional fishing activities. The area is also known for its fresh seafood, particularly fish and squid, which are caught daily by local fishermen.",
      ],
      images: [
        {
          src: "/img/Binh-thuan.jpg",
          alt: "Mui Ne sand dunes",
          caption: "Stunning sand dunes of Mui Ne",
        },
        {
          src: "/img/Binh-thuan.jpg",
          alt: "Mui Ne beach",
          caption: "Mui Ne Beach with kite surfing",
        },
      ],
      highlights: [
        "Unique red and white sand dunes",
        "World-class kite surfing and windsurfing",
        "15 km stretch of beautiful beach",
        "Fairy Stream and fishing village",
      ],
      tips: [
        "Best time to visit: November to April for dry season and wind",
        "Visit sand dunes early morning or late afternoon for best light",
        "Try sandboarding and jeep tours of the dunes",
        "Kite surfing season: November to March",
        "Try fresh seafood at local restaurants",
      ],
      location: "Binh Thuan Province, approximately 200 km northeast of Ho Chi Minh City",
    },
    {
      name: "CAN THO",
      description: "Largest city in the Mekong Delta, famous for floating markets and river life.",
      image: "/img/Can-tho.jpg",
      content: [
        "Can Tho is the largest city in the Mekong Delta and serves as the region's economic and cultural center. The city is famous for its floating markets, which are among the largest and most vibrant in Vietnam. Can Tho offers visitors a chance to experience authentic Mekong Delta life, where the river is central to daily activities.",
        "The Cai Rang Floating Market is the city's main attraction, operating from early morning until around 9 AM. Hundreds of boats gather to sell fruits, vegetables, and other goods, creating a colorful and bustling scene. Visitors can take boat tours to experience the market, see how goods are traded, and sample fresh fruits. The Phong Dien Floating Market is smaller but offers a more authentic, less touristy experience.",
        "Beyond the floating markets, Can Tho offers opportunities to explore the Mekong Delta's intricate network of canals and rivers. Boat trips take visitors through narrow waterways, past fruit orchards, traditional villages, and local workshops. The city itself has a relaxed atmosphere, with riverside cafes, local markets, and cultural sites like the Can Tho Museum.",
        "Can Tho is also a food destination, with excellent local cuisine featuring fresh river fish, tropical fruits, and Mekong Delta specialties. The city's night market offers a chance to try various local dishes. Can Tho serves as an excellent base for exploring the wider Mekong Delta region, with easy access to other delta destinations.",
      ],
      images: [
        {
          src: "/img/Can-tho.jpg",
          alt: "Can Tho floating market",
          caption: "Cai Rang Floating Market in Can Tho",
        },
        {
          src: "/img/Can-tho.jpg",
          alt: "Mekong Delta canals",
          caption: "Exploring Mekong Delta canals from Can Tho",
        },
      ],
      highlights: [
        "Largest city in the Mekong Delta",
        "Cai Rang Floating Market - one of Vietnam's largest",
        "Gateway to Mekong Delta exploration",
        "Authentic river life and culture",
      ],
      tips: [
        "Best time to visit: December to April for dry season",
        "Visit floating markets early morning (5-7 AM)",
        "Take boat tours to explore canals and villages",
        "Try local fruits and Mekong Delta specialties",
        "Stay overnight to experience the markets properly",
      ],
      location: "Can Tho City, Mekong Delta, approximately 170 km southwest of Ho Chi Minh City",
    },
    {
      name: "CHAU DOC",
      description: "Border town on the Mekong River, gateway to Cambodia and home to diverse ethnic communities.",
      image: "/img/Chau-doc.jpg",
      content: [
        "Chau Doc is a border town in An Giang Province, located on the banks of the Hau River (a branch of the Mekong) near the Cambodian border. The town is known for its diverse ethnic communities, including Vietnamese, Khmer, and Cham people, each contributing to the town's unique cultural character. Chau Doc serves as both a gateway to Cambodia and a destination in its own right.",
        "The town is famous for its floating villages, where houses are built on stilts over the water or float on the river. The most notable is the Cham village, where the Cham Muslim community lives in stilt houses over the water. Visitors can take boat tours to see these unique communities and learn about their way of life. The fish farms, where fish are raised in cages under the houses, are particularly interesting.",
        "Chau Doc is also home to several important religious sites, including the Sam Mountain (Nui Sam), which is considered sacred and features numerous pagodas and temples. The mountain offers panoramic views of the surrounding countryside and Cambodia. The town has a vibrant market scene, with the Chau Doc Market being a great place to experience local life and try regional specialties.",
        "The town's location makes it a popular stop for travelers heading to or from Cambodia via the Vinh Xuong border crossing. However, Chau Doc is worth visiting for its own attractions, including the floating villages, religious sites, and the opportunity to experience the multicultural character of the Mekong Delta border region.",
      ],
      images: [
        {
          src: "/img/Chau-doc.jpg",
          alt: "Chau Doc floating village",
          caption: "Floating villages in Chau Doc",
        },
        {
          src: "/img/Chau-doc.jpg",
          alt: "Sam Mountain",
          caption: "Sam Mountain with pagodas and temples",
        },
      ],
      highlights: [
        "Gateway to Cambodia",
        "Floating villages and stilt houses",
        "Diverse ethnic communities (Vietnamese, Khmer, Cham)",
        "Sam Mountain with religious sites",
      ],
      tips: [
        "Best time to visit: December to April for dry season",
        "Take boat tours to see floating villages",
        "Visit Sam Mountain for panoramic views",
        "Try local specialties at Chau Doc Market",
        "Use as base for Mekong Delta exploration or Cambodia border crossing",
      ],
      location: "An Giang Province, Mekong Delta, approximately 250 km southwest of Ho Chi Minh City",
    },
    {
      name: "PHU QUOC",
      description: "Vietnam's largest island, known for white sand beaches, luxury resorts, and pepper plantations.",
      image: "/img/Phu-quoc.jpg",
      content: [
        "Phu Quoc is Vietnam's largest island, located in the Gulf of Thailand off the coast of Cambodia. The island has transformed from a quiet fishing destination into one of Vietnam's premier beach resorts, known for its pristine white sand beaches, luxury resorts, and natural beauty. Despite the development, much of the island remains protected as a national park.",
        "The island's beaches are among Vietnam's most beautiful, with Long Beach (Bai Truong) being the most developed, stretching for 20 kilometers along the west coast. Sao Beach (Bai Sao) is famous for its powdery white sand and clear turquoise water, while Ong Lang Beach offers a more secluded experience. The beaches are perfect for swimming, sunbathing, and water sports.",
        "Phu Quoc is also known for its pepper plantations, fish sauce production (the island produces some of Vietnam's best fish sauce), and pearl farms. Visitors can tour these facilities to learn about local industries. The island's interior is covered by Phu Quoc National Park, which protects tropical forests and offers hiking opportunities. The park is home to diverse wildlife and rare plant species.",
        "The island offers a range of activities from beach relaxation to adventure activities like snorkeling, diving, and island-hopping tours. The night market in Duong Dong town is a great place to try local seafood and specialties. Phu Quoc has developed excellent tourism infrastructure while maintaining its natural charm, making it a perfect destination for both relaxation and exploration.",
      ],
      images: [
        {
          src: "/img/Phu-quoc.jpg",
          alt: "Phu Quoc beaches",
          caption: "Pristine beaches of Phu Quoc Island",
        },
        {
          src: "/img/Phu-quoc.jpg",
          alt: "Phu Quoc resort",
          caption: "Luxury resorts and beautiful coastline",
        },
      ],
      highlights: [
        "Vietnam's largest island",
        "Pristine white sand beaches",
        "Luxury resorts and tourism infrastructure",
        "Phu Quoc National Park with tropical forests",
      ],
      tips: [
        "Best time to visit: November to March for dry season",
        "Fly from Ho Chi Minh City or take ferry from Rach Gia",
        "Rent a motorbike to explore the island",
        "Visit pepper plantations and fish sauce factories",
        "Try fresh seafood at night market",
      ],
      location: "Kien Giang Province, Gulf of Thailand, approximately 45 km west of mainland Vietnam",
    }
  ],
  food: [
    {
      title: "Banh Mi",
      description: "Vietnamese baguette sandwich filled with various meats, pate, vegetables, and herbs, a Saigon specialty.",
      image: "/img/banh-mi.jpg",
      content: [
        "Banh mi is Vietnam's famous fusion sandwich, and Ho Chi Minh City (Saigon) is considered the birthplace and home of the best banh mi. The sandwich combines French colonial influences with Vietnamese flavors, creating something uniquely delicious that has gained international recognition as one of the world's best street foods.",
        "The sandwich starts with a Vietnamese baguette, which is lighter and crispier than its French counterpart due to the addition of rice flour. The bread is typically toasted until golden and crispy on the outside while remaining soft inside. The fillings vary but commonly include Vietnamese pate, various cold cuts (cha lua, thit nguoi), pickled vegetables (carrots and daikon), fresh cilantro, cucumber, and chili.",
        "The magic of banh mi lies in the combination of flavors and textures: the crispy bread, rich pate, savory meats, tangy pickled vegetables, fresh herbs, and spicy chili all come together to create perfect harmony. A drizzle of mayonnaise or special sauce adds creaminess, while the pickled vegetables provide a refreshing contrast to the rich meats.",
        "In Ho Chi Minh City, banh mi is available everywhere from street vendors to dedicated shops, and each place may have its own specialty. Some famous spots include Banh Mi Huynh Hoa (known for its generous fillings), Banh Mi 37 Nguyen Trai, and Banh Mi Phuong (featured in Anthony Bourdain's show). The sandwich is typically eaten for breakfast or as a snack throughout the day.",
      ],
      images: [
        {
          src: "/img/banh-mi.jpg",
          alt: "Banh mi",
          caption: "Vietnamese baguette sandwich - banh mi",
        },
        {
          src: "/img/banh-mi.jpg",
          alt: "Banh mi vendor",
          caption: "Street vendor preparing banh mi in Saigon",
        },
      ],
      highlights: [
        "Saigon's signature street food",
        "Fusion of French and Vietnamese cuisine",
        "Considered one of the world's best street foods",
        "Available throughout the day from street vendors",
      ],
      tips: [
        "Best eaten fresh from street vendors",
        "Try different vendors to find your favorite",
        "Popular spots: Banh Mi Huynh Hoa, Banh Mi 37 Nguyen Trai",
        "Available for breakfast, lunch, or snack",
        "Customize fillings to your preference",
      ],
      location: "Found throughout Ho Chi Minh City, especially at street vendors",
    },
    {
      title: "Com Tam",
      description: "Broken rice served with grilled pork, egg, and pickled vegetables, a Saigon street food favorite.",
      image: "/img/comtam.jpg",
      content: [
        "Com tam, meaning 'broken rice,' is one of Ho Chi Minh City's most beloved dishes and a staple of Southern Vietnamese cuisine. The dish originated from using broken rice grains that couldn't be sold as premium rice, but it has become so popular that broken rice is now specifically produced for this dish. Com tam is typically eaten for breakfast or lunch.",
        "The dish consists of broken rice grains served with various toppings, most commonly grilled pork (suon nuong), shredded pork skin (bi), and a fried egg. It's accompanied by pickled vegetables, fresh cucumber, and a sweet and savory fish sauce dressing. The combination creates a satisfying meal with a perfect balance of flavors and textures.",
        "The grilled pork is marinated in a mixture of fish sauce, sugar, garlic, and lemongrass, then grilled over charcoal until slightly charred and caramelized. The broken rice has a unique texture that's slightly chewier than regular rice, and it absorbs the flavors of the toppings and sauce beautifully. The dish is often served with a small bowl of soup on the side.",
        "Com tam restaurants are ubiquitous in Ho Chi Minh City, from simple street stalls to more established restaurants. The dish is affordable, filling, and delicious, making it a favorite among locals and visitors alike. Each restaurant may have its own variation, with different protein options like chicken, beef, or seafood, but the classic combination with grilled pork remains the most popular.",
      ],
      images: [
        {
          src: "/img/comtam.jpg",
          alt: "Com tam",
          caption: "Com tam with grilled pork and egg",
        },
        {
          src: "/img/comtam.jpg",
          alt: "Com tam preparation",
          caption: "Preparing com tam at a local restaurant",
        },
      ],
      highlights: [
        "Saigon's signature broken rice dish",
        "Served with grilled pork, egg, and pickled vegetables",
        "Affordable and filling street food",
        "Popular for breakfast and lunch",
      ],
      tips: [
        "Best enjoyed for breakfast or lunch",
        "Try the classic combination with grilled pork",
        "Mix everything together with the fish sauce",
        "Popular spots: Com Tam Ba Ghien, Com Tam Cali",
        "Available at street stalls and restaurants throughout Saigon",
      ],
      location: "Found throughout Ho Chi Minh City, especially at street stalls and local restaurants",
    },
    {
      title: "Hu Tieu",
      description: "Clear noodle soup with pork, shrimp, and quail eggs, popular in the Mekong Delta region.",
      image: "/img/hutieu.jpg",
      content: [
        "Hu tieu is a clear noodle soup that's particularly popular in Southern Vietnam, especially in the Mekong Delta region and Ho Chi Minh City. The dish features a light, clear broth made from pork bones, and is served with various toppings including pork slices, shrimp, quail eggs, and sometimes liver or other organ meats. The noodles can be made from rice, tapioca, or a combination of both.",
        "What makes hu tieu special is its clear, light broth that's subtly sweet and aromatic, quite different from the richer, more complex broths of pho or bun bo Hue. The broth is typically seasoned with fish sauce, sugar, and sometimes soy sauce, creating a delicate flavor profile. The dish is garnished with fresh herbs, bean sprouts, and lime, allowing diners to customize the taste.",
        "There are two main styles: hu tieu Nam Vang (Cambodian style), which is the most common in Southern Vietnam, and hu tieu My Tho (from My Tho city in the Mekong Delta). The My Tho version often includes more seafood and has a slightly different flavor profile. Both styles are delicious and reflect the multicultural influences in Southern Vietnamese cuisine.",
        "Hu tieu is typically eaten for breakfast or lunch and is a popular comfort food. The dish is served in many restaurants and street stalls throughout Ho Chi Minh City and the Mekong Delta. It's lighter than other Vietnamese noodle soups, making it a good choice for those who prefer less intense flavors, while still being satisfying and flavorful.",
      ],
      images: [
        {
          src: "/img/hutieu.jpg",
          alt: "Hu tieu",
          caption: "Clear noodle soup - hu tieu",
        },
        {
          src: "/img/hutieu.jpg",
          alt: "Hu tieu preparation",
          caption: "Preparing hu tieu with fresh toppings",
        },
      ],
      highlights: [
        "Clear, light noodle soup from Southern Vietnam",
        "Popular in Mekong Delta and Ho Chi Minh City",
        "Served with pork, shrimp, and quail eggs",
        "Lighter alternative to pho or bun bo Hue",
      ],
      tips: [
        "Best enjoyed for breakfast or lunch",
        "Try both Nam Vang and My Tho styles",
        "Add fresh herbs and lime to taste",
        "Popular spots: Hu Tieu Nam Vang, Hu Tieu My Tho",
        "Lighter broth makes it good for those who prefer subtle flavors",
      ],
      location: "Found throughout Southern Vietnam, especially in Ho Chi Minh City and Mekong Delta",
    },
    {
      title: "Ca Kho To",
      description: "Caramelized fish in clay pot, a signature dish of the Mekong Delta.",
      image: "/img/cakhoto.jpg",
      content: [
        "Ca kho to is a classic Vietnamese dish that's particularly beloved in the Mekong Delta, where fresh fish is abundant. The name means 'fish braised in clay pot,' and this cooking method is essential to creating the dish's rich, concentrated flavors and tender texture. The dish showcases the balance of sweet, salty, and savory flavors that characterize Southern Vietnamese cuisine.",
        "The dish typically uses fish like catfish, snakehead fish, or basa fish, which are cut into steaks and caramelized with sugar before being braised in a mixture of fish sauce, coconut water, and aromatics like shallots, garlic, and chili. The clay pot (to) helps maintain even heat and allows the sauce to reduce slowly, creating a thick, glossy glaze that coats the fish.",
        "The fish is cooked until it becomes tender and the sauce becomes rich and slightly sweet with a deep umami flavor from the fish sauce. The caramelization process gives the fish a beautiful golden-brown color and adds complexity to the flavor. The dish is often garnished with fresh herbs and served sizzling hot, sometimes with hard-boiled eggs that have been braised in the same sauce.",
        "Ca kho to is a staple of Vietnamese home cooking, especially in the Mekong Delta where it's often served with steamed rice and simple vegetables. The dish represents the comfort and warmth of family meals. In restaurants, it's often served in the clay pot it was cooked in, maintaining the heat and allowing the sauce to continue reducing at the table. The dish is a perfect example of how simple ingredients and proper technique create something truly delicious.",
      ],
      images: [
        {
          src: "/img/cakhoto.jpg",
          alt: "Ca kho to",
          caption: "Caramelized fish in clay pot",
        },
        {
          src: "/img/cakhoto.jpg",
          alt: "Cooking ca kho to",
          caption: "Braising fish in clay pot",
        },
      ],
      highlights: [
        "Signature dish of the Mekong Delta",
        "Caramelized fish in clay pot",
        "Rich, glossy sauce with perfect sweet-savory balance",
        "Comfort food representing Southern Vietnamese cuisine",
      ],
      tips: [
        "Best enjoyed with steamed rice",
        "The clay pot cooking is essential for flavor",
        "Try different types of fish for variety",
        "Often served with braised eggs",
        "Perfect comfort food for family meals",
      ],
      location: "Found in homes and restaurants throughout the Mekong Delta and Southern Vietnam",
    }
  ],
  culture: [
    {
      title: "Cu Chi Tunnels",
      description: "Extensive underground tunnel network used during the Vietnam War, now a historical site.",
      image: "/img/cuchi.jpg",
      content: [
        "The Cu Chi Tunnels are an extensive network of underground tunnels located about 70 kilometers northwest of Ho Chi Minh City. The tunnels were used by the Viet Cong (Vietnamese communist forces) during the Vietnam War as hiding spots, communication routes, supply routes, hospitals, food and weapon storage, and living quarters. The tunnel system is a testament to the ingenuity and determination of the Vietnamese people during the war.",
        "The tunnels stretch for over 250 kilometers and were built over 25 years, starting during the French colonial period and expanding during the American War. The tunnels are incredibly narrow, with some passages only 60-70 cm wide and 80-100 cm high. They include multiple levels, with some tunnels reaching depths of 10 meters. The system included living areas, kitchens, hospitals, and even theaters.",
        "Today, visitors can explore a small section of the tunnels that has been widened for tourists. The experience includes crawling through tunnels, seeing booby traps, viewing displays of weapons and equipment, and learning about the harsh conditions the fighters endured. There are two main sites: Ben Dinh (more touristy) and Ben Duoc (more authentic and less crowded).",
        "The Cu Chi Tunnels provide a sobering and educational experience about the Vietnam War from the Vietnamese perspective. The site includes a shooting range where visitors can try firing weapons used during the war (for an additional fee). The tunnels are a powerful reminder of the war's impact and the resilience of the Vietnamese people.",
      ],
      images: [
        {
          src: "/img/cuchi.jpg",
          alt: "Cu Chi Tunnels",
          caption: "Entrance to the Cu Chi Tunnels",
        },
        {
          src: "/img/cuchi.jpg",
          alt: "Tunnel interior",
          caption: "Narrow passages inside the tunnels",
        },
      ],
      highlights: [
        "Over 250 km of underground tunnels",
        "Used during Vietnam War by Viet Cong",
        "Multiple levels and complex network",
        "Educational historical site",
      ],
      tips: [
        "Best visited as a half-day trip from Ho Chi Minh City",
        "Wear comfortable clothes you don't mind getting dirty",
        "Not recommended for those with claustrophobia",
        "Choose Ben Duoc for a more authentic experience",
        "Allow 2-3 hours for the visit",
      ],
      location: "Cu Chi District, approximately 70 km northwest of Ho Chi Minh City",
    },
    {
      title: "War Remnants Museum",
      description: "Museum in Ho Chi Minh City documenting the Vietnam War from a Vietnamese perspective.",
      image: "/img/warmuseum.jpg",
      content: [
        "The War Remnants Museum in Ho Chi Minh City is one of Vietnam's most visited museums, offering a powerful and sobering perspective on the Vietnam War (known in Vietnam as the American War). The museum documents the war from the Vietnamese perspective, focusing on the impact on civilians and the long-term effects of chemical weapons like Agent Orange.",
        "The museum's exhibits include photographs, military equipment, documents, and artifacts from the war period. Some of the most impactful displays show the effects of Agent Orange, with photographs and preserved specimens showing birth defects and health issues that continue to affect generations. The museum also displays weapons, vehicles, and equipment used during the war.",
        "The outdoor area features military aircraft, tanks, and artillery pieces, while the indoor galleries contain extensive photo collections that document the war's brutality and its impact on Vietnamese civilians. The museum's approach is unflinching and emotional, designed to educate visitors about the war's human cost.",
        "Visiting the War Remnants Museum is an emotional experience that provides important historical context. While the perspective is clearly from the Vietnamese side, the museum serves as a powerful reminder of war's consequences. It's an essential visit for anyone wanting to understand modern Vietnam and the war's lasting impact on the country and its people.",
      ],
      images: [
        {
          src: "/img/warmuseum.jpg",
          alt: "War Remnants Museum",
          caption: "War Remnants Museum in Ho Chi Minh City",
        },
        {
          src: "/img/warmuseum.jpg",
          alt: "Museum exhibits",
          caption: "Exhibits documenting the Vietnam War",
        },
      ],
      highlights: [
        "Documents Vietnam War from Vietnamese perspective",
        "Extensive photo collections and artifacts",
        "Focus on civilian impact and Agent Orange effects",
        "One of Ho Chi Minh City's most visited museums",
      ],
      tips: [
        "Allow 2-3 hours for a thorough visit",
        "Be prepared for emotional and graphic content",
        "Visit early morning to avoid crowds",
        "Combine with visit to Cu Chi Tunnels for full context",
        "Important for understanding modern Vietnam",
      ],
      location: "28 Vo Van Tan Street, District 3, Ho Chi Minh City",
    },
    {
      title: "Floating Markets",
      description: "Traditional markets on the Mekong Delta where vendors sell from boats, especially in Can Tho.",
      image: "/img/floatingmarket.jpg",
      content: [
        "Floating markets are one of the Mekong Delta's most iconic cultural experiences, representing a traditional way of life that has existed for centuries. These markets operate on the region's rivers and canals, where vendors sell fruits, vegetables, and other goods directly from their boats. The markets are not just places of commerce but important social gathering places for the river communities.",
        "The Cai Rang Floating Market in Can Tho is the largest and most famous, operating from early morning (around 5 AM) until about 9 AM. Hundreds of boats gather, each displaying what they're selling by hanging samples from tall poles. The market is a colorful, bustling scene with boats of all sizes, from small sampans to larger cargo boats. Visitors can take boat tours to experience the market, see how goods are traded, and sample fresh tropical fruits.",
        "Other notable floating markets include Phong Dien (smaller and more authentic), Cai Be, and Long Xuyen. Each market has its own character, but they all offer a glimpse into traditional Mekong Delta life. The markets are particularly vibrant during the fruit season when boats are loaded with mangoes, durians, rambutans, and other tropical fruits.",
        "Visiting a floating market is a unique cultural experience that shows how life in the Mekong Delta revolves around the water. The markets are best experienced early in the morning when they're most active. Many tours include breakfast on the boat, allowing visitors to enjoy local food while watching the market activity. The floating markets represent a way of life that's increasingly rare but still very much alive in the Mekong Delta.",
      ],
      images: [
        {
          src: "/img/floatingmarket.jpg",
          alt: "Floating market",
          caption: "Cai Rang Floating Market in Can Tho",
        },
        {
          src: "/img/floatingmarket.jpg",
          alt: "Market boats",
          caption: "Vendors selling from boats at floating market",
        },
      ],
      highlights: [
        "Traditional Mekong Delta way of life",
        "Cai Rang is Vietnam's largest floating market",
        "Operate early morning (5-9 AM)",
        "Colorful and vibrant cultural experience",
      ],
      tips: [
        "Visit early morning (5-7 AM) for best experience",
        "Take a boat tour to fully experience the market",
        "Try fresh tropical fruits from vendors",
        "Best time: December to April for fruit season",
        "Combine with Mekong Delta canal tours",
      ],
      location: "Mekong Delta, especially Can Tho (Cai Rang and Phong Dien markets)",
    },
    {
      title: "Cao Dai Temple",
      description: "Colorful temple of the Cao Dai religion in Tay Ninh, combining elements of multiple faiths.",
      image: "/img/caodai.jpg",
      content: [
        "The Cao Dai Temple in Tay Ninh is the main temple of Cao Dai, a unique Vietnamese religion that combines elements of Buddhism, Christianity, Taoism, Confucianism, and Islam. Founded in 1926, Cao Dai (meaning 'High Tower' or 'High Palace') is one of Vietnam's most interesting and colorful religious movements, with the temple being one of the country's most visually striking religious sites.",
        "The temple is an architectural masterpiece, featuring vibrant colors, intricate decorations, and symbolic elements from various religions. The exterior is painted in bright yellow, red, and blue, while the interior is even more elaborate with colorful murals, dragon pillars, and an eye symbol (the Divine Eye) that represents God. The temple's design reflects the religion's syncretic nature, combining architectural elements from different faiths.",
        "Cao Dai followers believe in one God but recognize various religious figures including Buddha, Jesus Christ, Muhammad, Confucius, and others as saints. The religion has its own hierarchy, rituals, and ceremonies. Visitors can observe daily prayer services, which are held four times a day. The most impressive service is at noon, when followers dressed in white, yellow, red, or blue robes (depending on their rank) perform elaborate rituals.",
        "The temple complex includes the main temple, administrative buildings, and living quarters for the religion's leaders. The site is open to visitors, who are welcome to observe the prayer services (though photography may be restricted during services). The temple is a fascinating destination that offers insight into Vietnam's religious diversity and the country's ability to create new spiritual movements that reflect its multicultural history.",
      ],
      images: [
        {
          src: "/img/caodai.jpg",
          alt: "Cao Dai Temple",
          caption: "Colorful Cao Dai Temple in Tay Ninh",
        },
        {
          src: "/img/caodai.jpg",
          alt: "Temple interior",
          caption: "Elaborate interior of the Cao Dai Temple",
        },
      ],
      highlights: [
        "Unique Vietnamese religion combining multiple faiths",
        "Founded in 1926",
        "Colorful and elaborate architecture",
        "Daily prayer services open to visitors",
      ],
      tips: [
        "Best time to visit: Noon prayer service (most impressive)",
        "Dress respectfully (cover shoulders and knees)",
        "Photography may be restricted during services",
        "Allow 1-2 hours for visit",
        "Combine with visit to Ba Den Mountain nearby",
      ],
      location: "Long Hoa Commune, Hoa Thanh District, Tay Ninh Province, approximately 100 km northwest of Ho Chi Minh City",
    }
  ],
  nature: [
    {
      title: "Mekong Delta",
      description: "Vast network of rivers, swamps, and islands, Vietnam's agricultural heartland and 'rice bowl'.",
      image: "/img/mekong-delta.jpg",
      content: [
        "The Mekong Delta is Vietnam's largest and most fertile region, often called the 'rice bowl' of the country. This vast network of rivers, canals, and swamps covers over 40,000 square kilometers and produces more than half of Vietnam's rice, along with most of its fruits, vegetables, and seafood. The delta is formed by the Mekong River as it splits into multiple branches before flowing into the South China Sea.",
        "Life in the Mekong Delta revolves around the water. The region is crisscrossed by thousands of kilometers of canals and rivers, which serve as highways, markets, and sources of livelihood. Floating markets, stilt houses, and boat-based communities are common sights. The delta's intricate network of waterways makes it a fascinating place to explore by boat, offering glimpses into traditional Vietnamese rural life.",
        "The delta is incredibly fertile, supporting diverse agriculture including rice paddies, fruit orchards (mangoes, durians, coconuts, dragon fruit), and fish farms. The region is also home to diverse ecosystems including mangrove forests, wetlands, and bird sanctuaries. The Tra Su Cajuput Forest and Tram Chim National Park are important protected areas that support rich biodiversity.",
        "Visiting the Mekong Delta offers a completely different experience from Vietnam's cities and beaches. Boat trips through narrow canals, visits to fruit orchards, traditional villages, and floating markets provide insight into a way of life that has remained relatively unchanged for centuries. The delta's laid-back atmosphere, friendly people, and unique landscapes make it one of Vietnam's most memorable destinations.",
      ],
      images: [
        {
          src: "/img/mekong-delta.jpg",
          alt: "Mekong Delta",
          caption: "Vast network of rivers and canals in the Mekong Delta",
        },
        {
          src: "/img/mekong-delta.jpg",
          alt: "Delta life",
          caption: "Traditional life on the Mekong Delta waterways",
        },
      ],
      highlights: [
        "Vietnam's 'rice bowl' - produces over half the country's rice",
        "Vast network of rivers, canals, and swamps",
        "Floating markets and water-based communities",
        "Rich biodiversity and protected areas",
      ],
      tips: [
        "Best time to visit: December to April for dry season",
        "Take boat tours to explore canals and villages",
        "Visit floating markets early morning",
        "Try fresh tropical fruits from orchards",
        "Stay overnight in Can Tho or other delta towns",
      ],
      location: "Southern Vietnam, covering 13 provinces southwest of Ho Chi Minh City",
    },
    {
      title: "Mui Ne Sand Dunes",
      description: "Stunning red and white sand dunes perfect for sandboarding and watching sunrises.",
      image: "/img/muine-dunes.jpeg",
      content: [
        "The Mui Ne sand dunes are one of Vietnam's most unique natural attractions, creating a desert-like landscape that's completely unexpected in a tropical country. The area features two main dune systems: the Red Sand Dunes (Doi Cat Do) and the White Sand Dunes (Doi Cat Trang), each offering different experiences and stunning natural beauty.",
        "The Red Sand Dunes are smaller but more accessible, located just a few kilometers from Mui Ne town. These dunes are particularly beautiful at sunrise and sunset, when the light creates dramatic colors and shadows. The red color comes from iron oxide in the sand, and the dunes offer excellent opportunities for photography and sandboarding. The area is less commercialized, offering a more peaceful experience.",
        "The White Sand Dunes are larger and more impressive, located about 25 kilometers from Mui Ne. These dunes stretch for kilometers and can reach heights of up to 50 meters. The white sand creates a stark contrast against the blue sky, and the area offers more activities including sandboarding, quad biking, and jeep tours. There's also a small lake (Lotus Lake) at the base of the dunes that adds to the scenic beauty.",
        "Both dune systems are constantly shifting due to wind, creating ever-changing landscapes. The dunes are particularly popular for sunrise and sunset visits, when the light is most dramatic. Sandboarding is a popular activity, with boards available for rent. The surreal, desert-like landscape makes visitors feel like they're in a different country, creating one of Vietnam's most unique and photogenic natural attractions.",
      ],
      images: [
        {
          src: "/img/muine-dunes.jpeg",
          alt: "Mui Ne sand dunes",
          caption: "Stunning red and white sand dunes of Mui Ne",
        },
        {
          src: "/img/muine-dunes.jpeg",
          alt: "Sandboarding",
          caption: "Sandboarding on the dunes",
        },
      ],
      highlights: [
        "Unique desert-like landscape in tropical Vietnam",
        "Red and white sand dune systems",
        "Perfect for sandboarding and photography",
        "Stunning sunrise and sunset views",
      ],
      tips: [
        "Visit early morning (5-6 AM) or late afternoon (4-6 PM) for best light",
        "Try sandboarding - boards available for rent",
        "Wear appropriate footwear for walking on sand",
        "Bring water and sun protection",
        "Hire a jeep for easier access to white dunes",
      ],
      location: "Mui Ne, Binh Thuan Province, approximately 200 km northeast of Ho Chi Minh City",
    },
    {
      title: "Con Dao National Park",
      description: "Protected marine and forest areas with diverse wildlife, including sea turtles and dugongs.",
      image: "/img/condao-park.jpg",
      content: [
        "Con Dao National Park protects both marine and terrestrial ecosystems across the Con Dao archipelago, covering over 20,000 hectares of land and 20,000 hectares of marine area. The park is recognized for its exceptional biodiversity and is one of Vietnam's most important protected areas. The park protects diverse habitats including tropical forests, coral reefs, seagrass beds, and mangrove forests.",
        "The park is home to numerous rare and endangered species. The marine areas are particularly important for sea turtles, with several beaches serving as nesting sites for green turtles and hawksbill turtles. The nesting season runs from April to November, and visitors can join guided tours to observe turtles laying eggs or hatchlings making their way to the sea. The waters are also home to dugongs (sea cows), which are extremely rare.",
        "The terrestrial areas of the park protect primary tropical forests that are home to various bird species, including the endemic Con Dao black squirrel and various reptiles. The forests are relatively untouched, offering excellent opportunities for hiking and wildlife spotting. The park has several hiking trails that lead through the forests to viewpoints and beaches.",
        "The park's marine areas offer some of Vietnam's best diving and snorkeling, with healthy coral reefs and diverse marine life. The protected status means the reefs are in excellent condition, supporting a wide variety of fish, invertebrates, and other marine creatures. Con Dao National Park represents a successful conservation effort, balancing protection with sustainable tourism that allows visitors to experience the archipelago's natural beauty while supporting conservation efforts.",
      ],
      images: [
        {
          src: "/img/condao-park.jpg",
          alt: "Con Dao National Park",
          caption: "Protected marine and forest areas of Con Dao",
        },
        {
          src: "/img/condao-park.jpg",
          alt: "Sea turtles",
          caption: "Sea turtle nesting on Con Dao beaches",
        },
      ],
      highlights: [
        "Protected marine and terrestrial ecosystems",
        "Important sea turtle nesting sites",
        "Home to rare dugongs",
        "Excellent diving and snorkeling",
      ],
      tips: [
        "Best time to visit: December to April for dry season",
        "Join guided tours for sea turtle watching (April-November)",
        "Book diving trips in advance",
        "Respect park rules and conservation efforts",
        "Bring appropriate gear for hiking and water activities",
      ],
      location: "Con Dao Archipelago, Ba Ria-Vung Tau Province",
    },
    {
      title: "Phu Quoc National Park",
      description: "Tropical forest covering half of Phu Quoc Island with hiking trails and diverse ecosystems.",
      image: "/img/phuquoc-park.jpg",
      content: [
        "Phu Quoc National Park covers approximately 31,000 hectares, protecting about half of Phu Quoc Island's total area. The park protects diverse ecosystems including tropical evergreen forests, mangrove forests, and coastal areas. The park is home to rich biodiversity, including numerous endemic species that are found only on Phu Quoc Island.",
        "The park's forests are primary tropical forests that have remained relatively untouched, providing habitat for various wildlife including the Phu Quoc langur (an endangered primate), civets, squirrels, and numerous bird species. The park is particularly important for bird conservation, with over 200 species recorded, including several rare and endemic species.",
        "The park offers several hiking trails that lead through the forests to viewpoints, waterfalls, and streams. The trails vary in difficulty, from easy walks to more challenging hikes. The highest point on the island, Mount Chua (603 meters), is within the park and offers panoramic views of the island and surrounding sea. The park's streams and waterfalls provide opportunities for swimming and relaxation.",
        "The park's coastal areas include mangrove forests that are important for marine life and provide protection against erosion. The park is managed with a focus on conservation while allowing sustainable tourism. Visitors can explore the park independently or join guided tours that provide information about the flora, fauna, and conservation efforts. The park offers a natural escape from Phu Quoc's developed beach areas, providing opportunities to experience the island's wild side.",
      ],
      images: [
        {
          src: "/img/phuquoc-park.jpg",
          alt: "Phu Quoc National Park",
          caption: "Tropical forest in Phu Quoc National Park",
        },
        {
          src: "/img/phuquoc-park.jpg",
          alt: "Hiking trails",
          caption: "Hiking trails through the national park",
        },
      ],
      highlights: [
        "Covers half of Phu Quoc Island",
        "Primary tropical forests with rich biodiversity",
        "Home to endangered Phu Quoc langur",
        "Hiking trails and natural attractions",
      ],
      tips: [
        "Best time to visit: November to March for dry season",
        "Wear appropriate footwear for hiking",
        "Bring water and insect repellent",
        "Hire a guide for better wildlife spotting",
        "Combine with beach activities for full island experience",
      ],
      location: "Phu Quoc Island, Kien Giang Province",
    }
  ],
  beaches: [
    {
      title: "Phu Quoc Beaches",
      description: "Pristine white sand beaches like Long Beach, Sao Beach, and Ong Lang Beach with crystal-clear waters.",
      image: "/img/phuquoc-beach.jpg",
      content: [
        "Phu Quoc Island is home to some of Vietnam's most beautiful beaches, with pristine white sand, crystal-clear turquoise waters, and a tropical paradise atmosphere. The island's beaches vary from developed resort areas to secluded stretches of sand, offering something for every type of beachgoer.",
        "Long Beach (Bai Truong) is the island's most developed beach, stretching for 20 kilometers along the west coast. The beach is lined with resorts, restaurants, and beach bars, making it convenient and lively. The beach offers excellent sunset views and is perfect for swimming, sunbathing, and water sports. Despite the development, the beach maintains its natural beauty with soft sand and clear water.",
        "Sao Beach (Bai Sao) is often considered Phu Quoc's most beautiful beach, with powdery white sand that's so fine it squeaks underfoot. The beach has clear turquoise water and is backed by coconut palms, creating a picture-perfect tropical setting. The beach is more secluded than Long Beach, offering a quieter experience, though it has become more popular in recent years.",
        "Ong Lang Beach offers a more peaceful, upscale experience with several boutique resorts. The beach is smaller and more intimate, perfect for those seeking tranquility. Other notable beaches include Ganh Dau Beach in the north, Khem Beach (known for its calm waters), and Starfish Beach (Bai Sao) where visitors can see starfish in the shallow water. Phu Quoc's beaches are perfect for relaxation, water sports, and enjoying the island's natural beauty.",
      ],
      images: [
        {
          src: "/img/phuquoc-beach.jpg",
          alt: "Phu Quoc beaches",
          caption: "Pristine beaches of Phu Quoc Island",
        },
        {
          src: "/img/phuquoc-beach.jpg",
          alt: "Sao Beach",
          caption: "Sao Beach with powdery white sand",
        },
      ],
      highlights: [
        "Some of Vietnam's most beautiful beaches",
        "Long Beach - 20 km of developed coastline",
        "Sao Beach - powdery white sand",
        "Crystal-clear turquoise waters",
      ],
      tips: [
        "Best time to visit: November to March for dry season",
        "Long Beach for convenience and amenities",
        "Sao Beach for most beautiful setting",
        "Ong Lang for peace and tranquility",
        "Try water sports and island-hopping tours",
      ],
      location: "Phu Quoc Island, Kien Giang Province",
    },
    {
      title: "Con Dao Beaches",
      description: "Secluded beaches with turquoise waters, perfect for snorkeling and diving.",
      image: "/img/condao-beach.jpg",
      content: [
        "Con Dao's beaches are among Vietnam's most pristine and secluded, offering a sense of untouched natural beauty that's increasingly rare. The archipelago's beaches feature white sand, clear turquoise waters, and a peaceful atmosphere, with many beaches accessible only by boat or hiking trails. The beaches are part of Con Dao National Park, ensuring they remain protected and undeveloped.",
        "Dam Trau Beach is one of the most beautiful, located near the airport with soft sand and clear water. The beach is backed by forest and offers excellent swimming conditions. An Hai Beach is the main beach near Con Son town, offering convenience while still maintaining natural beauty. Lo Voi Beach is known for its calm waters and is popular for families.",
        "Many of Con Dao's best beaches require a bit of effort to reach, adding to their secluded charm. Some beaches are accessible only by boat, while others require hiking through the national park. This inaccessibility means the beaches are often empty, offering a true sense of isolation and natural beauty.",
        "The waters around Con Dao are excellent for snorkeling and diving, with healthy coral reefs and diverse marine life. The beaches are also important nesting sites for sea turtles, particularly green turtles and hawksbill turtles. During nesting season (April to November), visitors can join guided tours to observe turtles laying eggs or hatchlings making their way to the sea. Con Dao's beaches offer a perfect combination of natural beauty, seclusion, and marine life.",
      ],
      images: [
        {
          src: "/img/condao-beach.jpg",
          alt: "Con Dao beaches",
          caption: "Secluded beaches of Con Dao",
        },
        {
          src: "/img/condao-beach.jpg",
          alt: "Con Dao snorkeling",
          caption: "Excellent snorkeling and diving in Con Dao",
        },
      ],
      highlights: [
        "Pristine and secluded beaches",
        "Part of Con Dao National Park",
        "Excellent snorkeling and diving",
        "Sea turtle nesting sites",
      ],
      tips: [
        "Best time to visit: December to April for dry season",
        "Some beaches require boat access or hiking",
        "Book diving and snorkeling trips in advance",
        "Join sea turtle watching tours (April-November)",
        "Respect the protected environment",
      ],
      location: "Con Dao Archipelago, Ba Ria-Vung Tau Province",
    },
    {
      title: "Mui Ne Beach",
      description: "Long stretch of beach popular for water sports, especially kite surfing and windsurfing.",
      image: "/img/muine-beach.jpg",
      content: [
        "Mui Ne Beach stretches for 15 kilometers along the coast of Binh Thuan Province, offering one of Vietnam's best destinations for water sports, particularly kite surfing and windsurfing. The beach features calm waters, consistent winds, and excellent conditions that have made it a world-renowned destination for these sports. The beach is lined with coconut palms and fishing boats, creating a picturesque setting.",
        "The beach's consistent winds, especially from November to March, create perfect conditions for kite surfing and windsurfing. The area has numerous water sports operators offering equipment rental, lessons, and guided sessions. The beach is also suitable for other water activities including swimming, paddleboarding, and jet skiing. The calm waters make it safe for swimming, though there are lifeguards during peak season.",
        "The beach area has developed into a resort destination with numerous hotels, restaurants, and beachfront bars. Despite the development, the beach maintains its natural beauty with soft sand and clear water. The beachfront promenade is perfect for walking, jogging, or cycling while enjoying the sea views and ocean breeze.",
        "Mui Ne Beach is particularly beautiful at sunrise and sunset, when the light creates stunning colors. The beach is also famous for its proximity to the sand dunes, creating a unique combination of beach and desert landscapes. The area offers a range of accommodations from budget guesthouses to luxury resorts, making it accessible to all types of travelers. Mui Ne Beach offers the perfect combination of water sports, relaxation, and natural beauty.",
      ],
      images: [
        {
          src: "/img/muine-beach.jpg",
          alt: "Mui Ne Beach",
          caption: "Mui Ne Beach with kite surfing",
        },
        {
          src: "/img/muine-beach.jpg",
          alt: "Beach activities",
          caption: "Water sports and activities at Mui Ne",
        },
      ],
      highlights: [
        "15 km stretch of beautiful beach",
        "World-class kite surfing and windsurfing",
        "Consistent winds from November to March",
        "Calm waters perfect for swimming",
      ],
      tips: [
        "Best time to visit: November to March for wind sports",
        "Book kite surfing lessons in advance during peak season",
        "Visit sand dunes nearby for unique experience",
        "Enjoy sunrise and sunset views",
        "Try fresh seafood at beachfront restaurants",
      ],
      location: "Mui Ne, Binh Thuan Province, approximately 200 km northeast of Ho Chi Minh City",
    },
    {
      title: "Vung Tau Beach",
      description: "Coastal city near Ho Chi Minh City with several beaches and the famous Jesus Christ statue.",
      image: "/img/vungtau.jpg",
      content: [
        "Vung Tau is a coastal city located just 100 kilometers from Ho Chi Minh City, making it a popular weekend getaway for city residents and tourists. The city has several beaches, with Back Beach (Bai Sau) and Front Beach (Bai Truoc) being the main ones. While not as pristine as Phu Quoc or Con Dao, Vung Tau offers convenience and accessibility, along with several interesting attractions.",
        "Back Beach is the larger and more popular beach, stretching for several kilometers with soft sand and calm waters. The beach is well-developed with hotels, restaurants, and beachfront cafes. The beach is particularly popular on weekends when Ho Chi Minh City residents flock here for a quick escape. The beach offers good conditions for swimming and sunbathing, though it can get crowded.",
        "Front Beach is smaller and located in the city center, offering views of the harbor and fishing boats. The beach is more for strolling and enjoying the atmosphere rather than swimming. The city's most famous landmark is the Jesus Christ statue (Christ of Vung Tau), similar to the one in Rio de Janeiro, which stands on a hill overlooking the city and offers panoramic views.",
        "Vung Tau is also known for its seafood, with numerous restaurants serving fresh fish, crabs, and other seafood caught daily by local fishermen. The city has a relaxed, resort-town atmosphere and offers various activities including visiting pagodas, hiking to viewpoints, and enjoying the beach. Vung Tau serves as an easily accessible beach destination for those based in Ho Chi Minh City who want a quick coastal escape without the need for flights or long drives.",
      ],
      images: [
        {
          src: "/img/vungtau.jpg",
          alt: "Vung Tau Beach",
          caption: "Vung Tau beaches and coastline",
        },
        {
          src: "/img/vungtau.jpg",
          alt: "Jesus Christ statue",
          caption: "Jesus Christ statue overlooking Vung Tau",
        },
      ],
      highlights: [
        "Easily accessible from Ho Chi Minh City (100 km)",
        "Popular weekend getaway destination",
        "Jesus Christ statue with panoramic views",
        "Fresh seafood and relaxed atmosphere",
      ],
      tips: [
        "Best time to visit: December to April for dry season",
        "Can be crowded on weekends",
        "Visit Jesus Christ statue for panoramic views",
        "Try fresh seafood at local restaurants",
        "Perfect for a quick escape from Ho Chi Minh City",
      ],
      location: "Ba Ria-Vung Tau Province, approximately 100 km southeast of Ho Chi Minh City",
    }
  ]
};

export default function SouthernVietnam() {
  // Load from localStorage only
  const storedData = useMemo(() => {
    try {
      const stored = getRegionData("Southern Vietnam");
      // Use stored data and merge with overview/hero data from hardcoded
      return {
        ...southernVietnamData,
        destinations: stored.destinations,
        food: stored.food,
        culture: stored.culture,
        nature: stored.nature,
        beaches: stored.beaches,
      };
    } catch (error) {
      console.error("Error loading Southern Vietnam data:", error);
      // Fallback to hardcoded only if localStorage fails
      return southernVietnamData;
    }
  }, []);

  return <RegionPage regionData={storedData} />;
}

