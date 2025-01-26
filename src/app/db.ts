import { sql } from "@vercel/postgres";
import dotenv from "dotenv";

dotenv.config();

export async function checkUserExists(email: string) {
  const user = await sql`
    SELECT * FROM personal_details WHERE email_address = ${email}
  `;
  return user.rows.length > 0;
}

export async function createUser(firstName: string, lastName: string, email: string, password: string, phone: string, countryCode: string) {
    await sql`
          INSERT INTO personal_details (first_name, last_name, email_address, password, phone_number, country_code)
          VALUES (${firstName}, ${lastName}, ${email}, ${password}, ${phone}, ${countryCode})
        `;
}

export async function getUserId(email: string) {
  const user = await sql`
    SELECT id FROM personal_details WHERE email_address = ${email}
  `;
  return user.rows[0].id;
}

export async function insertSurvey(userId: number, formData: any) {
    try {
        await sql`
        UPDATE personal_details
        SET 
          country = ${formData.country},
          street_no = ${formData.streetNo},
          street_name = ${formData.streetName},
          unit_apt = ${formData.unitApt},
          city_town = ${formData.cityTown},
          province_territory = ${formData.provinceTerritory},
          postal_code = ${formData.postalCode},
          date_of_birth = ${formData.dateOfBirth},
          marital_status = ${formData.maritalStatus},
          employment_status = ${formData.employmentStatus},
          main_source_income = ${formData.mainSourceIncome},
          total_income = ${formData.totalIncome},
          is_resident = ${formData.isResident},
          has_sin = ${formData.hasSin},
          sin_expiry_date = ${formData.sinExpiryDate},
          question_1 = ${formData.question1},
          question_2 = ${formData.question2},
          question_3 = ${formData.question3},
          experience = ${formData.experience},
          risk_profile = ${formData.riskProfile}
        WHERE id = ${userId}
      `;
        console.log("Survey data updated successfully.");
    } catch (error) {
        console.error("Error updating survey data:", error);
        throw error; // Re-throw the error after logging
    }
}

export async function login(email: string, password: string) {
    const user = await sql`
        SELECT * FROM personal_details WHERE email_address = ${email} AND password = ${password}
    `;
    return user.rows.length > 0;
}
