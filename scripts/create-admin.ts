import { db } from "@/lib/db";
import { admin } from "@/drizzle/schema";
import * as crypto from "crypto";

async function createAdmin() {
  const password = process.argv[2] || "admin123";
  
  // Hash password using Node's crypto
  const passwordHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  try {
    await db.insert(admin).values({
      passwordHash,
    });
    
    console.log("✅ Admin created successfully!");
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
