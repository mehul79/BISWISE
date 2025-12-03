export const scaleFactor = 2.5;
export const scaleFactor2 = 3;
export let activeKey = null; // Tracks the currently active movement key

export const dialogueData = {
  1:`Good day, everyone! Welcome to today's workshop on BIS and standards. We’ll focus on food, beverages, rations, and dairy products, exploring how BIS ensures their safety and quality. Learn about freshness, proper storage, nutritional standards, and labeling to make informed, safe choices.To make it interactive, you’ll use a scanner to check product compliance with BIS standards instantly. Let’s dive in and make learning fun and engaging!`,
  2:`Welcome, everyone! Today, we’ll focus on counterfeit medicines and how BIS ensures their safety. We’ll cover labeling, batch numbers, and licensing to help you verify authenticity and avoid harmful products. Always consult professionals when unsure. Let’s get started!`,
  3:`Welcome, everyone! Today’s topic is standards on loudspeakers, TVs, LED lights, and fridge power ratings. We’ll explore how BIS ensures safety, performance, and energy efficiency. Learn about sound pressure limits, energy ratings, and BEE ratings, and use the scanner to verify product standards. Let’s get started!`,
  4:`Welcome, everyone! Today’s mission covers wood, nails, paints, and tools! Learn to choose the right materials and verify their quality and safety with your scanner. Ready to level up? Let’s dive in!`,
  5:`That’s a wrap for these workshops, everyone! You’ve done an amazing job learning about standards. Before you go, be sure to check out the library for a special surprise. Explore more BIS resources and grab some fun, informative materials. Don’t miss this opportunity to dive deeper!`,
  level_1:`Sweetheart, I need you to stop by the supermarket on your way home. Please pick up some fresh vegetables, paneer, and biscuits. Make sure the vegetables are fresh and check the expiry date on the biscuits. Oh, and don’t forget to check if the paneer is properly sealed. Thanks, love!`,
  level_2:`Dear, something isn't right. I took the medicine, but I'm feeling worse now. Can you please take the prescription and the medicine to the pharmacy to find out what happened? Ask the pharmacist to check if the medicine is correct and if anything could have gone wrong. Please hurry, I’m getting quite concerned`,
  level_3:`Hey, dear! I need you to run an errand for me. Could you head to the electronics store and check out the new fridges they have? Make sure to look for one that’s energy-efficient, preferably with a good BEE rating. I’d also love one that has plenty of space but doesn’t use too much power. Take your time and let me know what you find. Thanks!`,
  level_4:`Sweetheart, the storm did a real number on the dog's house, and it needs repairs. Could you head to the hardware store for me? Please pick up some strong wood, rust-immune nails, and a screwdriver that's sturdy enough for heavy work. Also, get some good outdoor paint to protect the wood. Thanks, I really appreciate it!`,
  level_5:`Hey, I heard there are new books in the library about BIS and standards. It would be great if you could go explore them and learn a bit. You’ll learn all about BIS, various standards, and a lot more. I think they’ll be really useful for both of us. Let me know what you find out!`,
  tv:`Hey there! Did you know you can learn about BIS standards while relaxing? Check out BIS Talks for awesome, informative content about quality, standards, and how they improve our daily lives.<br/>
  Visit:   <a href="https://youtube.com/playlist?list=PLJv3DypDPPx9oI-bV5Pqg2s0EIj8uqmLC&si=qCwAYWuAuuTAQuv3">https://youtube.com/playlist?list=PLJv3DypDPPx9oI-bV5Pqg2s0EIj8uqmLC&si=qCwAYWuAuuTAQuv3</a><br/>
  It’s the perfect way to stay informed and entertained. Happy watching!`,
};


export const groceryDialogueData = {
  Paneer_1:`Paneer_1:The scanner beeps: This is analog paneer, which is not natural and may not be safe for consumption. It’s advised to avoid this product and choose natural, certified options instead`,
  Paneer_2:`Paneer_2:The scanner beeps: This is natural A2 paneer—safe, healthy, and rich in nutrients. It's a high-quality product that's great for consumption. Feel confident adding it to your cart!`,
  Curd:`Curd:The scanner beeps: This curd cup is past its expiry date. Consuming expired curd may be unsafe. Please avoid this product and notify the staff to remove it from the shelf.`,
  Milk:`Milk:The player notices the milk bottle is not sealed. The scanner flashes: An unsealed bottle could indicate contamination or tampering. Avoid purchasing this product and notify the staff to address the issue`,

  Milk_powder:`Milk_powder:The scanner beeps: This milk powder is BIS marked, complies with IS 1165, and comes in secure packaging. It's safe to purchase and meets the required quality standards!`,
  Biscuits_1:`Biscuits_1:The scanner flashes: These biscuits contain more than 22.5% sugar, which violates food standards and may be harmful to your health. It’s advised not to purchase this item, as it doesn’t meet the required guidelines.`,
  Biscuits_2:`Biscuits_2:The player notices the seal on the biscuits is open. The scanner flashes: This could compromise the freshness and safety of the product. It’s advisable not to purchase this item and to choose a sealed pack instead.`,
  Biscuits_3:`Biscuits_3:The scanner beeps: These biscuits are safe to consume,They have sugar and saturated fats under limit`,

  juice_1:`Juice 1:The scanner beeps: This juice is past its expiry date. It's unsafe for consumption and should not be purchased. Please inform the staff so they can remove it from the shelf, and feel free to choose a fresh option!`,
  juice_2:`Juice 2:The scanner flashes: This cold drink is not stored at the correct temperature, indicating it hasn’t been properly chilled. It may not be safe to consume. Please notify the staff, and consider choosing another drink from the fridge!`,
  juice_3:`Juice 3:The scanner beeps: This drink is perfectly chilled, FCCI marked, and contains sugar content within the approved limit. It's safe to consume and meets all the necessary standards!`,
  juice_4:`Juice 4:The scanner flashes: This drink is in a plastic bottle that might not be food-grade and does not abide by BIS standard IS 2771. It’s potentially unsafe for long-term storage—best to avoid and choose a safer alternative!`,

  frozen_1:`The scanner beeps: This frozen food does not carry a BIS mark, which raises concerns about its quality and safety. It’s recommended to choose a product that meets certified standards for assurance.`,
  frozen_2:`The player notices the fridge is not turned on. The scanner flashes: This is a serious issue, as the frozen products may have thawed and are unsafe to consume. Please inform the staff immediately and avoid purchasing from this fridge.`,
  frozen_3:`The player notices the frozen mold has a greenish color. The scanner flashes: This indicates spoilage and possible contamination. It’s unsafe to consume. Please notify the staff and select a properly stored, fresh product instead`,
  frozen_4:`The scanner beeps: These frozen vegetables are BIS marked, ensuring quality, but they are past their expiry date. It’s unsafe to consume expired products, so it’s best to choose a fresher, valid option.`,

  fruits:`Fruits:The player notices the fruits are seasonal and fresh, with vibrant colors and a pleasant aroma. They think, 'These look perfect and will be great for my mother's health!`,
  vegetables:`Vegetables:The player notices the vegetables are fresh and vibrant. They smell delightful and have a rich, natural color. These seem like high-quality produce, perfect for purchase!`,
};

export const estoreDialogueData = {
  tv_1:`TV 1:The scanner displays: This TV has a BEE rating of 4 stars, saving you 20 units of electricity per month. It’s energy-efficient and cost-effective!`,
  tv_2:`TV 2:The scanner displays: This TV has a BEE rating of 5 stars, saving you 40 units of electricity per month. Highly energy-efficient and great for long-term savings!`,
  tv_3:`TV 3:The scanner displays: This TV has a BEE rating of 3 stars, saving you 15 units of electricity per month. It's decent, but consider a higher rating for better savings!`,
  tv_4:`TV 4:The scanner displays: This TV has a BEE rating of 4.5 stars, saving you 25 units of electricity per month. This is the best investment for both energy efficiency and savings!`,

  lamp_1:`Lamp 1:The scanner displays:This is a self-ballasted lamp (IS 16102), with an efficiency of 86 lumens per watt. It has a power of 5W and a lumen value of 470. It complies with BIS standards and is a genuine product.`,
  lamp_2:`Lamp 2:The scanner beeps: This lamp has a high lumen value, but it’s missing the BIS-certified logo. Warning! It’s a fake and not recognized. Proceed with caution!`,
  lamp_3:`Lamp 3:The scanner flashes: This lamp has very low efficiency and reduced lumen output. It’s not advisable to purchase—look for a better option`,
  lamp_4:`Lamp 4:The scanner alerts: This lamp has an unusually high lumen output of 2000, which does not comply with BIS standards for safety. Avoid this product for your own well-being!`,

  speaker_1:`loud speaker one:The scanner displays:This loudspeaker system has a maximum Sound Pressure Limit of 105 decibels over 100 meters, with a peak SPL of 120 dB. It carries the BIS logo and complies with BIS standards IS 10905, IS 9577, and IS 9854`,
  speaker_2:`loud speaker 2:The scanner displays:The scanner displays: This speaker is BIS-verified, efficient, and a genuine product. It meets all required standards, ensuring quality and reliability.`,
  speaker_3:`This is speaker 3 and contains only green food`,
  speaker_4:`This is speaker 4 and contains only yellow food`,
  speaker_5:`This is speaker 5 and contains only yellow food`,

  fridge_1:`Fridge one:The scanner displays: This fridge has a BEE rating of 5 stars, offering excellent energy efficiency. However, it has a lower capacity compared to other models`,
  fridge_2:`Fridge 2:The scanner displays: This fridge has a BEE rating of 4.5 stars, ensuring good energy efficiency. However, it’s made of polycarbonate and lacks no-frost zones, which may require more maintenance.`,
  fridge_3:`Fridge 3:The scanner displays: This fridge has a BEE rating of 3.5 stars, saving you 40 units of electricity per month. It offers good storage capacity, making it a solid choice for everyday use.`,
  fridge_4:`Fridge 4:The scanner displays: This fridge has a BEE rating of 4 stars, offering good storage and solid build quality. A reliable and efficient option for your needs!`,
};

export const manufacturingDialogueData = {
  NAIL1:`NAIL1:The scanner beeps: These are Steel Nails, compliant with BIS standard IS 723. They are prone to rust, and the size is 1 inch. Consider using them in dry, protected environments.`,
  NAIL2:`NAIL2:The scanner beeps: These are Steel Nails, compliant with BIS standard IS 723. They are prone to rust. The size is 1.5 inches. Use them in dry, protected environments for better longevity.`,
  NAIL3:`NAIL3:The scanner clicks: These are Steel Nails, compliant with BIS standard IS 723. They are prone to rust. The size is 0.5 inches. Ensure they’re used in a dry place to avoid rusting.`,
  NAIL4:`NAIL4:The scanner hums: These are Aluminium Nails, compliant with BIS standard IS 8535. They’re lightweight and immune to rust. The size is 1 inch—perfect for corrosion-free use in various projects!`,
  NAIL5:`NAIL5:The scanner beeps: These are Aluminium Nails, compliant with BIS standard IS 8535. They’re lightweight and immune to rust. The size is 0.5 inches—ideal for small, rust-free tasks!`,
  NAIL6:`NAIL6:The scanner clicks: These are Aluminium Nails, compliant with BIS standard IS 8535. They’re lightweight and immune to rust. The size is 1.5 inches—great for versatile, durable use!`,
  NAIL7:`NAIL7:The scanner buzzes: These are Aluminium Nails, compliant with BIS standard IS 8535. They’re lightweight and immune to rust. The size is 2 inches—perfect for stronger, rust-free constructions!`,

  Paint_1:`Paint_1:The scanner beeps: This is matte paint, but it doesn’t carry the BIS mark. It may not meet the quality standards—proceed with caution!`,
  Paint_2:`Paint_2:The scanner clicks: This is glossy paint, and it carries the BIS mark, ensuring quality. However, some paint is spilling—handle with care to avoid waste!`,
  Paint_3:`Paint_3:The scanner hums: This is wood grain paint, suitable for treating untreated wood. It’s BIS marked and eco-marked, ensuring both quality and environmental safety. Perfect for enhancing wood projects!`,
  Paint_4:`Paint_4:The scanner beeps: This is Anti-Corrosion Paint, compliant with BIS standard IS 2074. It's best for your health, providing strong protection without harmful effects. Ideal for rust-resistant applications!`,
  Paint_5:`Paint_5:The scanner clicks: This is lead-free paint, compliant with BIS standard IS 15489. It’s safe for your health and the environment, offering a non-toxic option for your painting needs!`,
  Paint_6:`Paint_6:The scanner clicks: This is anti-corrosion paint, but it lacks both the BIS and eco marks. It may not meet the required quality or environmental standards, so proceed with caution.`,
  Paint_7:`Paint_7:The scanner hums: This is weatherproof exterior paint, compliant with BIS standards. It provides excellent protection against the elements and is perfect for outdoor surfaces. Make sure to apply it on clean, dry areas for the best results!`,

  ScrewDriver1:`ScrewDriver1:The scanner beeps: This is a Flat Head (-) Screwdriver. It has a narrow 3.5mm tip, a short shaft length, and a precise 100mm handle. Ideal for detailed tasks in tight spaces!`,
  ScrewDriver2:`ScrewDriver2:The scanner clicks: This is a Flat Head (-) Screwdriver. It has a wide 7.5mm tip, a long shaft, and a 250mm handle, perfect for heavy-duty and rough work where extra torque is needed!`,
  ScrewDriver3:`ScrewDriver3:The scanner buzzes: This is a Cross-Head (+) Screwdriver with a wide 7.5mm tip, long shaft, and 250mm handle—perfect for tackling heavy-duty, rough tasks that require extra power and control!`,
  ScrewDriver4:`ScrewDriver4:The scanner beeps: This is a Cross-Head (+) Screwdriver with a narrow 3.5mm tip, short shaft, and 90mm handle—perfect for precise work in tight spaces requiring accuracy and control!`,
  ScrewDriver5:`ScrewDriver5:The scanner buzzes: This is a Robertson (Square) Screwdriver with a 7.5mm wide tip, long shaft, and 250mm handle—built for tough, heavy-duty tasks that need extra grip and power!`,
  ScrewDriver6:`ScrewDriver6:The scanner flashes: This is a Robertson (Square) Screwdriver with a 3.5mm narrow tip, short shaft, and 90mm handle—designed for detailed work in tight spaces, offering great precision and control!`,
  ScrewDriver7:`ScrewDriver7:The scanner hums: This is a Pozidriv screwdriver with a narrow tip, 100mm shaft length, and a wooden handle. The added ribs in the cross-head design offer better grip and stability, making it perfect for precise, slip-resistant work!`,

  Wood1:`Wood1:The scanner beeps: This is Teak wood. It's not treated, but treating it will increase its durability. It’s perfect for furniture. BIS standard: IS 1708. Treat it for longer-lasting quality!`,
  Wood2:`Wood2:The scanner buzzes: This is Sal wood. It’s not treated, but treating it will boost its durability. Ideal for heavy-duty furniture. BIS standard: IS 4021. Don’t forget to treat it for enhanced strength!`,
  Wood3:`Wood3:The scanner beeps: This is treated plywood, ideal for outdoor use. It’s resistant to pests, moisture, and weathering. BIS standard: IS 303. Ready for your toughest outdoor projects!`,
  Wood4:`Wood4:The scanner clicks: These are wooden pallets, compliant with BIS standard IS 14616. They're treated and ideal for industrial use, offering durability and reliability for heavy-duty tasks!`,

  reception:`Welcome to the hardware store! We offer a wide variety of hardware supplies, including tools, paints, and everything you might need for your projects. Feel free to browse around—take your time to find what suits you!`,
};

export const pharmacyDialogue={
  reception :`Welcome to the hospital! How can I assist you today?<br/>
              I see you’d like to verify a prescription and consult about medicine. Please head over to the pharmacy section. The pharmacist will be happy to help you with both!`,
  medicines :`The pharmacist takes a look at the medicine and sighs: 'This is not acceptable. Thankfully, I have the correct medicine for you here. When choosing medicine, always check for the batch number, ISI mark, and license number. These details ensure the medicine’s authenticity, safety, and quality.`
}

export const tasks={
  1:`level 1 tasks:<br/>
   1.Buy Paneer from supermarket<br/>
   2.Buy Biscuits from supermarket<br/>
   3.Buy vegetables from outside the supermarket<br/>
   4.Give the items to mummy back home`,

  2:`level 2 tasks:<br/>
  1.Buy medicines from pharmacy<br/>
  2.Buy fruits from outside the supermarket<br/>
  3.Give the items to mummy back home`,

  3:`level 3 tasks:<br/>
  1.Buy TV from e-store<br/>
  2.Buy Lamp from e-store<br/>
  3.Buy Speaker from e-store<br/>
  4.Buy Fridge from e-store<br/>
  5:Give the items to mummy back home`,

  4:`level 4 tasks:<br/>
  1.Buy Nails from hardware store<br/>
  2.Buy Paint from hardware store<br/>
  3.Buy Screwdriver from hardware store<br/>
  4.Buy Wood from hardware store<br/>
  5:Give the items to mummy back home`,

  5:`No more tasks. Enjoy the game!`
}

export const libraryDialogue={
  reception: `Welcome to the library! We’ve just received BIS official documents, eBooks, action plans, and even their own comic book series. Don’t miss them—they’re perfect for diving into quality standards in a fun way!`,
  book_shelf_1:`Group 1:BIS books on audio<br/>
                1. Loud Speaker: <a href="https://www.bis.gov.in/loudspeakers">Link<a/><br/>
                2. Headphones:<a href="https://www.bis.gov.in/headphones">Link<a/>/<br/>
                3. Hearing Aid : <a href="https://www.bis.gov.in/hearing-aid/">Link<a/>`,
  book_shelf_2:`Group 2:Household Appliance<br/>
                1. iron: <a href="https://www.bis.gov.in/electric-iron/">Link<a/><br/>
                2. Oven:<a href="https://www.bis.gov.in/oven/">Link<a/>/<br/>
                3. Fridge: <a href="https://www.bis.gov.in/refrigerators/">Link<a/>`,
  book_shelf_3:`Group 3: Utilities<br/>
                1. ballpoint pen: <a href="https://www.bis.gov.in/ballpoint-pen/">Link<a/><br/>
                2. Fire Extinguisher :<a href="https://www.bis.gov.in/fire-extinguisher/">Link<a/><br/>
                3. Bicycle : <a href="https://www.bis.gov.in/bicycle-2/">Link<a/>`,
  book_shelf_4:`Group 4: E-Books<br/>
                1. promoting standards: <a href="https://www.bis.gov.in/bis-success-stories-e-book/">Link<a/><br/>
                2. Down the memory lane:<a href="https://www.bis.gov.in/ebook2024/">Link<a/>/<br/>
                3. testing of metals: <a href="https://www.bis.gov.in/mechanical-testing-of-metals-2/">Link<a/>`,
  book_shelf_5:`Group 5:E-Book<br/>
                1. ebook: <a href="https://www.bis.gov.in/e-book/">Link<a/><br/>`,
  book_shelf_6:`Group 6: Reports and Plans<br/>
                1. Annual Report: <a href="https://www.bis.gov.in/the-bureau/annual-report/">Link<a/><br/>
                2. Action Plan :<a href="https://www.bis.gov.in/wp-content/uploads/2023/05/SNPbookBilingual.pdf">Link<a/><br/>`,
  book_shelf_7:`Group 7:Standards and Roadmaps<br/>
                1. Know Your Standard: <a href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails">Link<a/><br/>
                2. Roadmap:<a href="https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/road_maps/roadmaps/index">Link<a/>/<br/>`,
  book_shelf_8:`Group 8:Comics<br/>
                1. Construction Materials: <a href="https://www.bis.gov.in/construction-materials/">Link<a/><br/>
                2. Sports:<a href="https://www.bis.gov.in/sports/">Link<a/>/<br/>`,
  book_shelf_9:`Group 9:Comics<br/>
                1. Women & Child: <a href="https://www.bis.gov.in/women-and-child-book/">Link<a/><br/>
                2. Stationery:<a href="https://www.bis.gov.in/stationery/">Link<a/><br/>
                3. Electrical Products: <a href="https://www.bis.gov.in/electrical-products/">Link<a/>`,
}


export const correctInventory={
  1:["Paneer_2","Biscuits_3","vegetables",],
  2:["fruits","medicines"],
  3:["tv_4","lamp_1","speaker_2","fridge_4"],
  4:["NAIL6","Wood1","Paint_7","ScrewDriver1"]
}