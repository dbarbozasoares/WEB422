/********************************************************************************
 * WEB422 – Test 03
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Diego B Soares Student ID: ____145820239____ Date: __feb - 22 - 2025_______
 * Published URL: _________________https://github.com/dbarbozasoares/WEB422__________________________________________
 ********************************************************************************/
import { users } from "../route"; // Import users from users API

// by using folder [id] it automatically handles any request to api/users/[id]... and inside route we can manage the parameters
export async function GET(req, { params }) {
  // waits parameters process so we can use it
  const { id } = await params;
  console.log(`received ${params.id}`);

  // get user ID from url parameter
  const userId = parseInt(id);

  // find if user exists on in memory array
  const user = users.find((user) => user.id === userId);

  if (!user) {
    // return a 404 error if the user is not found
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  // return the found user with a 200 status
  return Response.json(user, { status: 200 });
}
