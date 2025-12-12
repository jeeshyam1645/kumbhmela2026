import "dotenv/config";
import { db } from "../server/db";
import { camps, users, pujaServices, bookings } from "@shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${derivedKey.toString("hex")}.${salt}`;
}

async function main() {
  console.log("🌱 Seeding database...");

  try {
    // 1. CLEAR EXISTING DATA (To avoid duplicates)
    console.log("   - Clearing old data...");
    // Order matters due to Foreign Keys (delete bookings first)
    await db.delete(bookings); 
    await db.delete(pujaServices);
    await db.delete(camps);
    // We do NOT delete users to keep your Google Account safe
    
    // 2. CREATE ADMIN USER (If not exists)
    const password = await hashPassword("admin123");
    await db.insert(users).values({
      username: "admin",
      password: password,
      role: "admin",
      name: "System Admin",
      mobile: "+919876543210"
    }).onConflictDoNothing();
    
    console.log("   - Admin user checked/created");

    // 3. INSERT CAMPS
    await db.insert(camps).values([
      {
        nameEn: "Swiss Cottage",
        nameHi: "स्विस कॉटेज",
        descriptionEn: "Premium luxury tents with attached modern bathroom, geyser, and carpeted flooring. Best for families and elderly.",
        descriptionHi: "आधुनिक बाथरूम, गीजर और कालीन फर्श के साथ प्रीमियम लक्जरी टेंट। परिवारों और बुजुर्गों के लिए सर्वोत्तम।",
        price: 5000,
        capacity: "2-3 Persons",
        features: ["1 Double Bed", "Attached Toilet", "Geyser", "Carpeted Floor", "24/7 Security"],
        imageUrl: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7",
        totalInventory: 5
      },
      {
        nameEn: "Deluxe Tent",
        nameHi: "डीलक्स टेंट",
        descriptionEn: "Comfortable tents with twin beds, shared bathroom facilities nearby. Ideal for budget travelers.",
        descriptionHi: "ट्विन बेड के साथ आरामदायक टेंट, पास में साझा बाथरूम सुविधाएं। बजट यात्रियों के लिए आदर्श।",
        price: 3000,
        capacity: "2 Persons",
        features: ["2 Single Beds", "Shared Bathroom", "Heater", "Mattress", "Clean Linens"],
        imageUrl: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d",
        totalInventory: 10
      },
      {
        nameEn: "Dormitory",
        nameHi: "शयनगृह",
        descriptionEn: "Budget-friendly shared accommodation for large groups or solo travelers.",
        descriptionHi: "बड़े समूहों या एकल यात्रियों के लिए बजट-अनुकूल साझा आवास।",
        price: 999,
        capacity: "10 Persons",
        features: ["Single Cot", "Common Locker", "Charging Point", "Shared Washroom"],
        imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
        totalInventory: 50
      }
    ]);

    console.log("   - Camps seeded");

    // 4. INSERT PUJA SERVICES (Original List)
    await db.insert(pujaServices).values([
      {
        nameEn: "Rudrabhishek",
        nameHi: "रुद्राभिषेक",
        descriptionEn: "Sacred worship of Lord Shiva involving bathing the lingam with offerings like milk and honey.",
        descriptionHi: "भगवान शिव की पवित्र पूजा जिसमें लिंगम को दूध और शहद जैसे प्रसाद से स्नान कराया जाता है।",
        price: 2100,
        imageUrl: "https://images.unsplash.com/photo-1605809772656-3c0542363264"
      },
      {
        nameEn: "Pitra Dosh Nivaran",
        nameHi: "पितृ दोष निवारण",
        descriptionEn: "Rituals performed to pacify ancestors and remove obstacles caused by Pitra Dosh.",
        descriptionHi: "पूर्वजों को शांत करने और पितृ दोष के कारण आने वाली बाधाओं को दूर करने के लिए किए जाने वाले अनुष्ठान।",
        price: 5100,
        imageUrl: "https://images.unsplash.com/photo-1621833130239-16a7dc732049"
      },
      {
        nameEn: "Mahamrityunjaya Jaap",
        nameHi: "महामृत्युंजय जाप",
        descriptionEn: "Powerful mantra chanting for health, longevity, and conquering the fear of death.",
        descriptionHi: "स्वास्थ्य, दीर्घायु और मृत्यु के भय पर विजय प्राप्त करने के लिए शक्तिशाली मंत्र जाप।",
        price: 11000,
        imageUrl: "https://images.unsplash.com/photo-1599557297397-69c76839396e"
      },
      {
        nameEn: "Satyanarayan Katha",
        nameHi: "सत्यनारायण कथा",
        descriptionEn: "Worship of Lord Vishnu to bring prosperity, harmony, and truth to the household.",
        descriptionHi: "घर में समृद्धि, सद्भाव और सत्य लाने के लिए भगवान विष्णु की पूजा।",
        price: 1500,
        imageUrl: "https://images.unsplash.com/photo-1608636437943-4dc979261313"
      },
      {
        nameEn: "Vishesh Ganga Pujan",
        nameHi: "विशेष गंगा पूजन",
        descriptionEn: "Special worship and aarti of the holy river Ganga at the Triveni Sangam.",
        descriptionHi: "त्रिवेणी संगम पर पवित्र नदी गंगा की विशेष पूजा और आरती।",
        price: 1100,
        imageUrl: "https://images.unsplash.com/photo-1564998708766-3226db224177"
      }
    ]);

    console.log("   - Puja Services seeded");
    console.log("✅ Seeding complete!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();